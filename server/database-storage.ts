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

    // Initialize data if spots table is empty
    // Using setTimeout to ensure this runs asynchronously after constructor completes
    // Only check once during construction
    this.checkAndInitializeData();
  }

  private initializationInProgress = false;
  private initialized = false;

  private async checkAndInitializeData() {
    if (this.initialized || this.initializationInProgress) return;
    
    try {
      this.initializationInProgress = true;
      
      // Check if we have any spots
      const spotsResult = await db.select().from(spots).limit(1);

      if (spotsResult.length === 0) {
        console.log(
          "No spots found in database. Initializing with sample data...",
        );
        
        // Insert spots and their wind conditions
        for (const data of kiteSpotsData) {
          // Insert the spot
          const [spot] = await db.insert(spots).values(data.spot).returning();
          
          // Insert wind conditions for this spot
          const windConditionsWithSpotId = data.windConditions.map(wc => ({
            ...wc,
            spotId: spot.id
          }));
          await db.insert(windConditions).values(windConditionsWithSpotId);
        }
        
        console.log("Sample data initialization completed successfully");
      }
      
      this.initialized = true;
    } catch (error) {
      console.error("Error checking database for spots:", error);
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

      // Match wind speed preferences
      if (
        windCondition.windSpeed >= preferences.windSpeedMin &&
        windCondition.windSpeed <= preferences.windSpeedMax
      ) {
        score += 20;
        reasons.push(
          `Wind speed of ${windCondition.windSpeed} knots matches your preferences`,
        );
      }

      // Match wind quality
      if (
        windCondition.windQuality === WindQuality.Excellent ||
        windCondition.windQuality === WindQuality.Good
      ) {
        score += 15;
        reasons.push(`${windCondition.windQuality} wind quality`);
      }

      // Match temperature preferences
      if (windCondition.airTemp) {
        let tempMatch = false;

        switch (preferences.temperature) {
          case "cold":
            tempMatch = windCondition.airTemp < 20;
            break;
          case "moderate":
            tempMatch = windCondition.airTemp >= 20 && windCondition.airTemp < 25;
            break;
          case "warm":
            tempMatch = windCondition.airTemp >= 25 && windCondition.airTemp < 30;
            break;
          case "hot":
            tempMatch = windCondition.airTemp >= 30;
            break;
        }

        if (tempMatch) {
          score += 15;
          reasons.push(
            `${windCondition.airTemp}°C air temperature matches your '${preferences.temperature}' preference`,
          );
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

      // Match budget
      if (preferences.budget === "budget") {
        if (spot.averageAccommodationCost && spot.averageAccommodationCost < 70) {
          score += 10;
          reasons.push("Affordable accommodation options");
        }
      } else if (preferences.budget === "moderate") {
        if (
          spot.averageAccommodationCost &&
          spot.averageAccommodationCost >= 70 &&
          spot.averageAccommodationCost <= 120
        ) {
          score += 10;
          reasons.push("Moderately priced accommodation options");
        }
      } else if (preferences.budget === "luxury") {
        if (spot.averageAccommodationCost && spot.averageAccommodationCost > 120) {
          score += 10;
          reasons.push("Luxury accommodation options");
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

    // Log scores for debugging
    console.log("Recommended spots with scores:");
    results.forEach(spot => {
      console.log(`${spot.name}: Score ${spot.matchScore} (${Math.round((spot.matchScore / 94) * 100)}%)`);
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

  async getSpotsByMonth(month: number, windQualityFilter?: WindQuality[]): Promise<Spot[]> {
    console.log(`Getting spots for month: ${month}, filter: ${windQualityFilter ? windQualityFilter.join(',') : 'none'}`);
    
    // First, get all spots to ensure we don't lose any due to our filtering
    const allSpots = await this.getAllSpots();
    console.log(`Total spots in database: ${allSpots.length}`);
    
    // Get all wind conditions for this month
    let query = db
      .select()
      .from(windConditions)
      .where(eq(windConditions.month, month));
    
    // If wind quality filter is provided, apply it
    if (windQualityFilter && windQualityFilter.length > 0) {
      const qualityValues = windQualityFilter.map(quality => quality.toString());
      console.log(`Applying wind quality filter: ${qualityValues.join(',')}`);
      query = query.where(inArray(windConditions.windQuality, qualityValues));
    }
    
    // Execute the query to get matching wind conditions
    const matchingConditions = await query;
    console.log(`Found ${matchingConditions.length} wind conditions matching criteria`);
    
    if (matchingConditions.length === 0) {
      return []; // No matching conditions, return empty array
    }
    
    // Get unique spot IDs from matching conditions
    const spotIds = new Set(matchingConditions.map(condition => condition.spotId));
    console.log(`Found ${spotIds.size} distinct spots with matching conditions`);
    
    // Get the full spot info for these IDs
    const spotsWithConditions = allSpots.filter(spot => spotIds.has(spot.id));
    
    // Additional filter to check if the selected month is in the best months
    const filteredByBestMonths = spotsWithConditions.filter(spot => {
      // Parse best months from the spot data
      const bestMonthsString = spot.bestMonths || "";
      const monthRanges = bestMonthsString.split(",").map(range => range.trim());
      
      // Current month abbreviation (3 letters)
      const currentMonthAbbr = MonthNames[month - 1].substring(0, 3);
      
      // Make the filter more lenient for testing
      return monthRanges.some(range => {
        // Handle ranges like "Apr-Oct"
        if (range.includes("-")) {
          const [startMonth, endMonth] = range.split("-").map(m => m.trim());
          
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
          return range.toLowerCase().includes(currentMonthAbbr.toLowerCase());
        }
        return false;
      });
    });
    
    console.log(`After filtering by best months: ${filteredByBestMonths.length} spots`);
    
    return filteredByBestMonths;
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
  async getUserById(id: number): Promise<User | undefined> {
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

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
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
  
  async getReviewsByUserId(userId: number): Promise<ReviewWithUser[]> {
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
    userId: number,
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
    userId: number,
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