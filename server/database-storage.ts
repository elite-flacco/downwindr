import {
  spots,
  windConditions,
  users,
  reviews,
  ratings,
  type Spot,
  type InsertSpot,
  type WindCondition,
  type InsertWindCondition,
  type User,
  type InsertUser,
  type Review,
  type InsertReview,
  type ReviewWithUser,
  type Rating,
  type InsertRating,
  type SpotWithRatings,
  WindQuality,
  MonthNames,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, avg, count, sql, like, or, inArray } from "drizzle-orm";
import { pool } from "./db";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { IStorage, UserPreferences, SpotWithMatchScore } from "./storage";
import { kiteSpotsData } from "./data/seed-data";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: any; // Using any for SessionStore type to avoid import complexities
  private regions: Map<string, string[]>;

  // Static property to ensure we only initialize the database once across all instances
  private static initializationPromise: Promise<void> | null = null;
  
  constructor() {
    // Set up session store for user authentication
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });

    // Define regions for filtering (same as MemStorage)
    this.regions = new Map([
      [
        "caribbean",
        ["Dominican Republic", "Cuba", "Aruba", "Jamaica", "Puerto Rico"],
      ],
      ["north-america", ["USA", "Canada", "Mexico"]],
      [
        "south-america",
        ["Brazil", "Venezuela", "Colombia", "Peru", "Chile", "Argentina"],
      ],
      [
        "europe",
        [
          "Spain",
          "Portugal",
          "France",
          "Italy",
          "Greece",
          "Croatia",
          "Netherlands",
          "Germany",
          "United Kingdom",
          "Ireland",
        ],
      ],
      [
        "africa",
        ["South Africa", "Morocco", "Egypt", "Tanzania", "Kenya", "Cape Verde"],
      ],
      [
        "asia",
        [
          "Thailand",
          "Philippines",
          "Vietnam",
          "Indonesia",
          "Sri Lanka",
          "Japan",
          "South Korea",
        ],
      ],
      ["oceania", ["Australia", "New Zealand", "Fiji", "French Polynesia"]],
    ]);

    // Initialize data if needed, but ensure it only happens once class-wide
    if (DatabaseStorage.initializationPromise === null) {
      DatabaseStorage.initializationPromise = this.checkAndInitializeData();
    }
  }

  private initializationInProgress = false;
  private initialized = false;

  private async checkAndInitializeData(): Promise<void> {
    if (this.initialized || this.initializationInProgress) return;
    
    try {
      this.initializationInProgress = true;
      
      // Use a database transaction to ensure atomicity
      await db.transaction(async (tx) => {
        // Check if we have any spots
        const spotsResult = await tx.select().from(spots).limit(1);

        if (spotsResult.length === 0) {
          console.log(
            "No spots found in database. Initializing with sample data...",
          );
          
          // Insert spots and their wind conditions
          for (const data of kiteSpotsData) {
            // Insert the spot
            const [spot] = await tx.insert(spots).values(data.spot).returning();
            
            // Insert wind conditions for this spot
            const windConditionsWithSpotId = data.windConditions.map(wc => ({
              ...wc,
              spotId: spot.id
            }));
            await tx.insert(windConditions).values(windConditionsWithSpotId);
          }
          
          console.log("Sample data initialization completed successfully");
        }
      });
      
      this.initialized = true;
    } catch (error) {
      console.error("Error initializing database with seed data:", error);
    } finally {
      this.initializationInProgress = false;
    }
  }

  // Implement recommendation algorithm
  async getRecommendedSpots(
    preferences: UserPreferences,
  ): Promise<SpotWithMatchScore[]> {
    const allSpots = await this.getAllSpots();
    const results: SpotWithMatchScore[] = [];

    // Helper function to determine if a country is in a region
    const isInRegion = (country: string, regionName: string): boolean => {
      const region = this.regions.get(regionName.toLowerCase());
      return region ? region.includes(country) : false;
    };

    for (const spot of allSpots) {
      let score = 0;
      const reasons: string[] = [];

      // Get wind conditions for the selected month
      const windCondition = await this.getWindConditionBySpotAndMonth(
        spot.id,
        preferences.month,
      );

      if (!windCondition) continue; // Skip spots with no wind data for this month

      // Match wind speed preferences with more granularity
      const idealWindRange = preferences.windSpeedMax - preferences.windSpeedMin;
      const midPoint = (preferences.windSpeedMin + preferences.windSpeedMax) / 2;
      
      if (
        windCondition.windSpeed >= preferences.windSpeedMin &&
        windCondition.windSpeed <= preferences.windSpeedMax
      ) {
        // Perfect match - within range
        // Calculate how close to the middle of the preferred range
        const distanceFromMid = Math.abs(windCondition.windSpeed - midPoint);
        const percentFromCenter = distanceFromMid / (idealWindRange / 2);
        
        // Score highest (20) if exactly at midpoint, down to 15 at the edges of the range
        const windMatchScore = 20 - (5 * percentFromCenter);
        score += windMatchScore;
        
        reasons.push(
          `Wind speed of ${windCondition.windSpeed} knots is ideal for your preferences`,
        );
      } else {
        // Outside preferred range - partial points based on how far outside
        const distanceOutside = Math.min(
          Math.abs(windCondition.windSpeed - preferences.windSpeedMin),
          Math.abs(windCondition.windSpeed - preferences.windSpeedMax)
        );
        
        // Give partial points for being close (max 10 points if just outside range)
        if (distanceOutside <= 5) {
          const partialScore = 10 * (1 - (distanceOutside / 5));
          score += partialScore;
          reasons.push(
            `Wind speed of ${windCondition.windSpeed} knots is close to your preferred range`,
          );
        }
      }

      // Match wind quality with more granularity
      if (windCondition.windQuality === WindQuality.Excellent) {
        score += 15;
        reasons.push(`Excellent wind quality - consistent and ideal`);
      } else if (windCondition.windQuality === WindQuality.Good) {
        score += 10;
        reasons.push(`Good wind quality - reliable for most sessions`);
      } else if (windCondition.windQuality === WindQuality.Moderate) {
        score += 5;
        reasons.push(`Moderate wind quality - may have some variability`);
      } else {
        // Poor wind quality - no points
        reasons.push(`Wind quality is below your preferences`);
      }

      // Match air temperature preferences with more granularity
      if (windCondition.airTemp) {
        let tempMatchScore = 0;
        let tempReason = "";
        
        // Define ideal temperature ranges for each preference
        const airTempRanges = {
          cold: { min: 5, ideal: 15, max: 20 },
          moderate: { min: 18, ideal: 22, max: 25 },
          warm: { min: 23, ideal: 27, max: 30 },
          hot: { min: 28, ideal: 33, max: 40 }
        };
        
        const preferredAirRange = airTempRanges[preferences.temperature];
        
        if (preferredAirRange) {
          const airTemp = windCondition.airTemp;
          
          // Perfect match - within ideal range +/- 2 degrees
          if (Math.abs(airTemp - preferredAirRange.ideal) <= 2) {
            tempMatchScore = 8; // Reduced from 15 to account for water temp
            tempReason = `${airTemp}°C air temperature is ideal for your '${preferences.temperature}' preference`;
          } 
          // Good match - within the range
          else if (airTemp >= preferredAirRange.min && airTemp <= preferredAirRange.max) {
            tempMatchScore = 5; // Reduced from 10 to account for water temp
            tempReason = `${airTemp}°C air temperature is good for your '${preferences.temperature}' preference`;
          }
          // Close match - within 3 degrees outside the range
          else if (
            airTemp >= preferredAirRange.min - 3 && airTemp <= preferredAirRange.max + 3
          ) {
            tempMatchScore = 3; // Reduced from 5 to account for water temp
            tempReason = `${airTemp}°C air temperature is close to your '${preferences.temperature}' preference`;
          }
          
          if (tempMatchScore > 0) {
            score += tempMatchScore;
            reasons.push(tempReason);
          }
        }
      }
      
      // Match water temperature preferences
      if (windCondition.waterTemp && preferences.waterTemperature) {
        let waterTempMatchScore = 0;
        let waterTempReason = "";
        
        // Define ideal water temperature ranges for each preference
        const waterTempRanges = {
          cold: { min: 10, ideal: 16, max: 20 },
          moderate: { min: 19, ideal: 22, max: 25 },
          warm: { min: 24, ideal: 26, max: 28 },
          hot: { min: 27, ideal: 29, max: 32 }
        };
        
        const preferredWaterRange = waterTempRanges[preferences.waterTemperature];
        
        if (preferredWaterRange) {
          const waterTemp = windCondition.waterTemp;
          
          // Perfect match - within ideal range +/- 1 degrees
          if (Math.abs(waterTemp - preferredWaterRange.ideal) <= 1) {
            waterTempMatchScore = 7;
            waterTempReason = `${waterTemp}°C water temperature is ideal for your '${preferences.waterTemperature}' preference`;
          } 
          // Good match - within the range
          else if (waterTemp >= preferredWaterRange.min && waterTemp <= preferredWaterRange.max) {
            waterTempMatchScore = 5;
            waterTempReason = `${waterTemp}°C water temperature is good for your '${preferences.waterTemperature}' preference`;
          }
          // Close match - within 2 degrees outside the range
          else if (
            waterTemp >= preferredWaterRange.min - 2 && waterTemp <= preferredWaterRange.max + 2
          ) {
            waterTempMatchScore = 2;
            waterTempReason = `${waterTemp}°C water temperature is close to your '${preferences.waterTemperature}' preference`;
          }
          
          if (waterTempMatchScore > 0) {
            score += waterTempMatchScore;
            reasons.push(waterTempReason);
          }
        }
      }

      // Match difficulty level
      if (
        spot.difficultyLevel &&
        spot.difficultyLevel.toLowerCase().includes(preferences.difficulty.toLowerCase())
      ) {
        score += 10;
        reasons.push(`Difficulty level matches your preference`);
      }

      // Match budget with more granularity
      if (spot.averageAccommodationCost) {
        const cost = spot.averageAccommodationCost;
        let budgetMatchScore = 0;
        let budgetReason = "";
        
        // Budget ranges
        const budgetRanges: {
          budget: { ideal: number, max: number, min?: number },
          moderate: { ideal: number, max: number, min: number },
          luxury: { ideal: number, max: number, min: number }
        } = {
          budget: { ideal: 50, max: 70, min: 0 }, // Add min to fix type error
          moderate: { min: 70, ideal: 95, max: 120 },
          luxury: { min: 120, ideal: 180, max: 300 }
        };
        
        const preferredBudget = budgetRanges[preferences.budget];
        
        if (preferredBudget) {
          // Perfect budget match
          if (preferences.budget === "budget" && cost <= preferredBudget.ideal) {
            budgetMatchScore = 10;
            budgetReason = `Very affordable accommodation at $${cost}/night`;
          } 
          else if (preferences.budget === "budget" && cost <= preferredBudget.max) {
            budgetMatchScore = 7;
            budgetReason = `Affordable accommodation at $${cost}/night`;
          }
          else if (preferences.budget === "moderate" && 
                  cost >= preferredBudget.min && 
                  cost <= preferredBudget.max) {
            // Closer to ideal is better for moderate
            const distFromIdeal = Math.abs(cost - preferredBudget.ideal);
            if (distFromIdeal <= 10) {
              budgetMatchScore = 10;
              budgetReason = `Ideal mid-range accommodation at $${cost}/night`;
            } else {
              budgetMatchScore = 8;
              budgetReason = `Good value accommodation at $${cost}/night`;
            }
          }
          else if (preferences.budget === "luxury" && cost >= preferredBudget.min) {
            if (cost <= preferredBudget.max) {
              budgetMatchScore = 10;
              budgetReason = `Premium accommodation options at $${cost}/night`;
            } else {
              budgetMatchScore = 7;
              budgetReason = `Ultra-luxury accommodation at $${cost}/night`;
            }
          }
          // Small partial match for close-but-not-quite budget match
          else if (preferences.budget === "budget" && cost <= 90) {
            budgetMatchScore = 3;
            budgetReason = `Slightly above budget but still reasonable at $${cost}/night`;
          }
          else if (preferences.budget === "moderate" && 
                  (cost >= preferredBudget.min - 15 || cost <= preferredBudget.max + 20)) {
            budgetMatchScore = 3;
            budgetReason = `Close to your preferred price range at $${cost}/night`;
          }
          else if (preferences.budget === "luxury" && cost >= 100) {
            budgetMatchScore = 3;
            budgetReason = `Upscale but below luxury level at $${cost}/night`;
          }
          
          if (budgetMatchScore > 0) {
            score += budgetMatchScore;
            reasons.push(budgetReason);
          }
        }
      }

      // Match region preference
      if (
        preferences.preferredRegion !== "any" &&
        isInRegion(spot.country, preferences.preferredRegion)
      ) {
        score += 10;
        reasons.push(`Located in your preferred region (${preferences.preferredRegion})`);
      }

      // Match kite schools preference
      if (
        preferences.hasKiteSchools &&
        spot.numberOfSchools &&
        spot.numberOfSchools > 0
      ) {
        score += 7;
        reasons.push(`Has ${spot.numberOfSchools} kite schools`);
      }

      // Match wave preference
      if (preferences.preferWaves && spot.waveSize && !spot.waveSize.includes("Flat")) {
        score += 7;
        reasons.push("Offers wave riding conditions");
      }

      // Match food options preference
      if (preferences.foodOptions && spot.foodOptions && spot.foodOptions.length > 0) {
        score += 5;
        reasons.push("Good food options available");
      }

      // Match cultural experience preference
      if (preferences.culture && spot.culture && spot.culture.length > 10) {
        score += 5;
        reasons.push("Rich cultural experience");
      }

      // Add to results if score is above threshold
      if (score >= 30) {
        results.push({
          ...spot,
          matchScore: score,
          reasons,
          windCondition,
        });
      }
    }

    // Sort by match score descending
    results.sort((a, b) => b.matchScore - a.matchScore);

    // No score normalization - we want the raw scores exactly as calculated
    // Log scores for debugging
    console.log("Recommended spots with scores:");
    results.forEach(spot => {
      // Log the pure scores without any conversion - these will match exactly what the user sees
      console.log(`${spot.name}: Score ${spot.matchScore} (raw score)`);
    });
    
    // Return top matches (limited to 8)
    return results.slice(0, 8);
  }

  // CRUD operations for spots
  async getAllSpots(): Promise<Spot[]> {
    return await db.select().from(spots);
  }

  async getSpotById(id: number): Promise<Spot | undefined> {
    const [spot] = await db.select().from(spots).where(eq(spots.id, id));
    return spot;
  }

  async getSpotsByMonth(month: number, windQualityFilter?: WindQuality[]): Promise<(Spot & { windCondition?: { windQuality: WindQuality }})[]> {
    console.log(`Getting spots for month: ${month}, filter: ${windQualityFilter ? windQualityFilter.join(',') : 'none'}`);
    
    // First, get all spots to ensure we don't lose any due to our filtering
    const allSpots = await this.getAllSpots();
    console.log(`Total spots in database: ${allSpots.length}`);
    
    // Get all spots first
    const allWindConditions = await db
      .select()
      .from(windConditions)
      .where(eq(windConditions.month, month));
      
    // Create a map for all wind conditions for this month
    const allSpotWindConditions = new Map<number, {
      windQuality: WindQuality;
      windSpeed: number;
      airTemp: number;
      waterTemp: number;
      seasonalNotes?: string;
    }>();
    allWindConditions.forEach(condition => {
      allSpotWindConditions.set(condition.spotId, { 
        windQuality: condition.windQuality as WindQuality,
        windSpeed: condition.windSpeed,
        airTemp: condition.airTemp || 0,
        waterTemp: condition.waterTemp || 0,
        seasonalNotes: condition.seasonalNotes || undefined
      });
    });
    
    // Get spots for this month based on their best months text
    const spotsForThisMonth = allSpots.filter(spot => {
      // Parse best months from the spot data
      const bestMonthsString = spot.bestMonths || "";
      const monthRanges = bestMonthsString.split(",").map(range => range.trim());
      
      // Current month abbreviation (3 letters)
      const currentMonthAbbr = MonthNames[month - 1].substring(0, 3);
      
      // Make the filter more lenient for testing
      return monthRanges.some(range => {
        // Handle ranges with any type of dash or hyphen (including en dash, em dash, etc.)
        const normalizedRange = range.replace(/[‐‑‒–—―]/g, "-"); // Replace all types of dashes with standard hyphen
        
        if (normalizedRange.includes("-")) {
          const [startMonth, endMonth] = normalizedRange.split("-").map(m => m.trim());
          
          // Convert month abbreviations to month numbers (1-12)
          const startIdx = MonthNames.findIndex(m => m.substring(0, 3).toLowerCase() === startMonth.toLowerCase());
          const endIdx = MonthNames.findIndex(m => m.substring(0, 3).toLowerCase() === endMonth.toLowerCase());
          
          if (startIdx !== -1 && endIdx !== -1) {
            // Handle wrapping around the year (e.g., "Nov-Feb")
            if (startIdx > endIdx) {
              return month - 1 >= startIdx || month - 1 <= endIdx;
            } else {
              return month - 1 >= startIdx && month - 1 <= endIdx;
            }
          }
        }
        // Handle single months - more lenient matching (includes instead of exact match)
        else {
          return normalizedRange.toLowerCase().includes(currentMonthAbbr.toLowerCase());
        }
        return false;
      });
    });
    
    // Attach wind condition data to all eligible spots for this month
    const spotsWithMonthConditions = spotsForThisMonth.map(spot => {
      const windCondition = allSpotWindConditions.get(spot.id);
      return {
        ...spot,
        windCondition
      };
    });
    
    // If wind quality filter is provided, apply it to the spots that have wind conditions
    let filteredSpots = spotsWithMonthConditions;
    if (windQualityFilter && windQualityFilter.length > 0) {
      filteredSpots = spotsWithMonthConditions.filter(spot => 
        spot.windCondition && 
        windQualityFilter.includes(spot.windCondition.windQuality)
      );
      console.log(`After applying wind quality filter: ${filteredSpots.length} spots remaining`);
    }
    
    console.log(`Found ${filteredSpots.length} spots for month ${month}`);
    
    return filteredSpots;
  }

  async getSpotWithWindConditions(
    id: number
  ): Promise<{ spot: Spot; windConditions: WindCondition[] } | undefined> {
    const [spot] = await db.select().from(spots).where(eq(spots.id, id));
    if (!spot) return undefined;

    const windConditionsList = await this.getWindConditionsForSpot(id);
    return {
      spot,
      windConditions: windConditionsList,
    };
  }

  async searchSpots(query: string): Promise<Spot[]> {
    if (!query || query.trim() === "") {
      return this.getAllSpots();
    }

    const searchQuery = `%${query.toLowerCase()}%`;
    return await db
      .select()
      .from(spots)
      .where(
        or(
          like(sql`LOWER(${spots.name})`, searchQuery),
          like(sql`LOWER(${spots.country})`, searchQuery),
          like(sql`LOWER(${spots.description})`, searchQuery)
        )
      );
  }

  async createSpot(spot: InsertSpot): Promise<Spot> {
    const [newSpot] = await db.insert(spots).values(spot).returning();
    return newSpot;
  }

  // Wind conditions operations
  async getWindConditionsForSpot(spotId: number): Promise<WindCondition[]> {
    return await db
      .select()
      .from(windConditions)
      .where(eq(windConditions.spotId, spotId))
      .orderBy(windConditions.month);
  }

  async getWindConditionBySpotAndMonth(
    spotId: number,
    month: number
  ): Promise<WindCondition | undefined> {
    const [condition] = await db
      .select()
      .from(windConditions)
      .where(
        and(
          eq(windConditions.spotId, spotId),
          eq(windConditions.month, month)
        )
      );
    return condition;
  }

  async createWindCondition(condition: InsertWindCondition): Promise<WindCondition> {
    const [newCondition] = await db
      .insert(windConditions)
      .values(condition)
      .returning();
    return newCondition;
  }

  // Helper method to set up wind conditions for a spot
  async setupSpotWindConditions(
    spotId: number,
    conditions: InsertWindCondition[]
  ): Promise<void> {
    for (const condition of conditions) {
      await this.createWindCondition({ ...condition, spotId });
    }
  }

  // User operations
  async getUserById(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user;
  }

  // Remove getUserByEmail since Supabase Auth handles email lookups

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  
  async updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
    // Create a new object without the updatedAt property to avoid SQL errors
    const { updatedAt, ...userDataWithoutTimestamp } = userData;
    
    const [updatedUser] = await db
      .update(users)
      .set({
        ...userDataWithoutTimestamp,
        // Set updatedAt explicitly as a new Date
        updatedAt: new Date()
      })
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }

  // Review operations
  async getReviewsForSpot(spotId: number): Promise<ReviewWithUser[]> {
    const reviewsWithUsers = await db
      .select({
        review: reviews,
        user: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatarUrl: users.avatarUrl,
          experience: users.experience,
        },
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.spotId, spotId))
      .orderBy(desc(reviews.createdAt));

    return reviewsWithUsers.map(({ review, user }) => ({
      ...review,
      user,
    }));
  }
  
  async getReviewsByUserId(userId: string): Promise<ReviewWithUser[]> {
    const reviewsWithDetails = await db
      .select({
        review: reviews,
        user: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatarUrl: users.avatarUrl,
          experience: users.experience,
        },
        spot: spots,
      })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .innerJoin(spots, eq(reviews.spotId, spots.id))
      .where(eq(reviews.userId, userId))
      .orderBy(desc(reviews.createdAt));

    return reviewsWithDetails.map(({ review, user, spot }) => ({
      ...review,
      user,
      spot,
    }));
  }

  async getReviewByUserAndSpot(
    userId: string,
    spotId: number
  ): Promise<Review | undefined> {
    const [review] = await db
      .select()
      .from(reviews)
      .where(and(eq(reviews.userId, userId), eq(reviews.spotId, spotId)));
    return review;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  async updateReview(id: number, content: string): Promise<Review | undefined> {
    const [updatedReview] = await db
      .update(reviews)
      .set({ content, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();
    return updatedReview;
  }

  async deleteReview(id: number): Promise<boolean> {
    await db.delete(reviews).where(eq(reviews.id, id));
    return true;
  }

  // Rating operations
  async getRatingsForSpot(spotId: number): Promise<Rating[]> {
    return await db
      .select()
      .from(ratings)
      .where(eq(ratings.spotId, spotId));
  }

  async getRatingByUserAndSpot(
    userId: string,
    spotId: number
  ): Promise<Rating | undefined> {
    const [rating] = await db
      .select()
      .from(ratings)
      .where(and(eq(ratings.userId, userId), eq(ratings.spotId, spotId)));
    return rating;
  }

  async createRating(rating: InsertRating): Promise<Rating> {
    const [newRating] = await db.insert(ratings).values(rating).returning();
    return newRating;
  }

  async updateRating(
    id: number,
    ratingUpdate: Partial<InsertRating>
  ): Promise<Rating | undefined> {
    const [updatedRating] = await db
      .update(ratings)
      .set(ratingUpdate)
      .where(eq(ratings.id, id))
      .returning();
    return updatedRating;
  }

  async deleteRating(id: number): Promise<boolean> {
    await db.delete(ratings).where(eq(ratings.id, id));
    return true;
  }

  // Combined operations
  async getSpotWithReviewsAndRatings(
    spotId: number
  ): Promise<{
    spot: Spot;
    windConditions: WindCondition[];
    reviews: ReviewWithUser[];
    averageRating: number;
    totalRatings: number;
    ratingBreakdown: {
      windReliability: number;
      beginnerFriendly: number;
      scenery: number;
      uncrowded: number;
      localVibe: number;
      overall: number;
    };
  } | undefined> {
    const spot = await this.getSpotById(spotId);
    if (!spot) return undefined;

    const windConditionsList = await this.getWindConditionsForSpot(spotId);
    const reviewsList = await this.getReviewsForSpot(spotId);
    const ratingsList = await this.getRatingsForSpot(spotId);

    // Calculate average ratings
    const totalRatings = ratingsList.length;
    
    const calcAverage = (field: keyof Rating) => {
      if (totalRatings === 0) return 0;
      const sum = ratingsList.reduce((acc, rating) => acc + (rating[field] as number || 0), 0);
      return Math.round((sum / totalRatings) * 10) / 10; // Round to 1 decimal place
    };

    const ratingBreakdown = {
      windReliability: calcAverage("windReliability"),
      beginnerFriendly: calcAverage("beginnerFriendly"),
      scenery: calcAverage("scenery"),
      uncrowded: calcAverage("uncrowded"),
      localVibe: calcAverage("localVibe"),
      overall: calcAverage("overall"),
    };

    const averageRating = ratingBreakdown.overall;

    return {
      spot,
      windConditions: windConditionsList,
      reviews: reviewsList,
      averageRating,
      totalRatings,
      ratingBreakdown,
    };
  }
}

export const storage = new DatabaseStorage();