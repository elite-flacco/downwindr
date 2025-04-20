import { 
  spots, windConditions, users, reviews, ratings,
  type Spot, type InsertSpot, 
  type WindCondition, type InsertWindCondition,
  type User, type InsertUser,
  type Review, type InsertReview, type ReviewWithUser,
  type Rating, type InsertRating, type SpotWithRatings,
  WindQuality, MonthNames
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, avg, count, sql, like, or } from "drizzle-orm";
import { pool } from "./db";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { IStorage, UserPreferences, SpotWithMatchScore } from "./storage";

const PostgresSessionStore = connectPg(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;
  private regions: Map<string, string[]>;

  constructor() {
    // Set up session store for user authentication
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
    
    // Define regions for filtering (same as MemStorage)
    this.regions = new Map([
      ['caribbean', ['Dominican Republic', 'Cuba', 'Aruba', 'Jamaica', 'Puerto Rico']],
      ['north-america', ['USA', 'Canada', 'Mexico']],
      ['south-america', ['Brazil', 'Venezuela', 'Colombia', 'Peru', 'Chile', 'Argentina']],
      ['europe', ['Spain', 'Portugal', 'France', 'Italy', 'Greece', 'Croatia', 'Netherlands', 'Germany', 'United Kingdom', 'Ireland']],
      ['africa', ['South Africa', 'Morocco', 'Egypt', 'Tanzania', 'Kenya', 'Cape Verde']],
      ['asia', ['Thailand', 'Philippines', 'Vietnam', 'Indonesia', 'Sri Lanka', 'Japan', 'South Korea']],
      ['oceania', ['Australia', 'New Zealand', 'Fiji', 'French Polynesia']]
    ]);
  }

  // Spot operations
  async getAllSpots(): Promise<Spot[]> {
    return await db.select().from(spots);
  }

  async getSpotById(id: number): Promise<Spot | undefined> {
    const results = await db.select().from(spots).where(eq(spots.id, id));
    return results.length ? results[0] : undefined;
  }

  async getSpotsByMonth(month: number): Promise<Spot[]> {
    // Get all spot IDs with good or excellent wind conditions for the month
    const goodSpotIds = await db.select({ spotId: windConditions.spotId })
      .from(windConditions)
      .where(and(
        eq(windConditions.month, month),
        or(
          eq(windConditions.windQuality, WindQuality.Good),
          eq(windConditions.windQuality, WindQuality.Excellent)
        )
      ));
    
    // No spots found with good conditions
    if (goodSpotIds.length === 0) {
      return [];
    }
    
    // Get the spots with good conditions
    return await db.select()
      .from(spots)
      .where(sql`${spots.id} IN (${goodSpotIds.map(s => s.spotId).join(',')})`);
  }

  async getSpotWithWindConditions(id: number): Promise<{spot: Spot, windConditions: WindCondition[]} | undefined> {
    const spot = await this.getSpotById(id);
    if (!spot) return undefined;
    
    const conditions = await this.getWindConditionsForSpot(id);
    return { spot, windConditions: conditions };
  }

  async searchSpots(query: string): Promise<Spot[]> {
    const searchPattern = `%${query}%`;
    return await db.select()
      .from(spots)
      .where(
        or(
          like(spots.name, searchPattern),
          like(spots.country, searchPattern)
        )
      );
  }

  async createSpot(spot: InsertSpot): Promise<Spot> {
    const [newSpot] = await db.insert(spots).values(spot).returning();
    return newSpot;
  }

  // Wind condition operations
  async getWindConditionsForSpot(spotId: number): Promise<WindCondition[]> {
    return await db.select()
      .from(windConditions)
      .where(eq(windConditions.spotId, spotId));
  }

  async getWindConditionBySpotAndMonth(spotId: number, month: number): Promise<WindCondition | undefined> {
    const results = await db.select()
      .from(windConditions)
      .where(and(
        eq(windConditions.spotId, spotId),
        eq(windConditions.month, month)
      ));
    
    return results.length ? results[0] : undefined;
  }

  async createWindCondition(condition: InsertWindCondition): Promise<WindCondition> {
    const [newCondition] = await db.insert(windConditions).values(condition).returning();
    return newCondition;
  }

  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results.length ? results[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.username, username));
    return results.length ? results[0] : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.email, email));
    return results.length ? results[0] : undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  // Review operations
  async getReviewsForSpot(spotId: number): Promise<ReviewWithUser[]> {
    const reviewResults = await db.select({
      review: reviews,
      user: {
        id: users.id,
        username: users.username,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
        experience: users.experience
      }
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.spotId, spotId))
    .orderBy(desc(reviews.createdAt));

    return reviewResults.map(r => ({
      ...r.review,
      user: r.user
    }));
  }

  async getReviewByUserAndSpot(userId: number, spotId: number): Promise<Review | undefined> {
    const results = await db.select()
      .from(reviews)
      .where(and(
        eq(reviews.userId, userId),
        eq(reviews.spotId, spotId)
      ));
    
    return results.length ? results[0] : undefined;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values({
      ...review,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    
    return newReview;
  }

  async updateReview(id: number, content: string): Promise<Review | undefined> {
    const [updatedReview] = await db.update(reviews)
      .set({ 
        content, 
        updatedAt: new Date() 
      })
      .where(eq(reviews.id, id))
      .returning();
    
    return updatedReview;
  }

  async deleteReview(id: number): Promise<boolean> {
    try {
      await db.delete(reviews).where(eq(reviews.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  }

  // Rating operations
  async getRatingsForSpot(spotId: number): Promise<Rating[]> {
    return await db.select()
      .from(ratings)
      .where(eq(ratings.spotId, spotId));
  }

  async getRatingByUserAndSpot(userId: number, spotId: number): Promise<Rating | undefined> {
    const results = await db.select()
      .from(ratings)
      .where(and(
        eq(ratings.userId, userId),
        eq(ratings.spotId, spotId)
      ));
    
    return results.length ? results[0] : undefined;
  }

  async createRating(rating: InsertRating): Promise<Rating> {
    const [newRating] = await db.insert(ratings).values({
      ...rating,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    
    return newRating;
  }

  async updateRating(id: number, ratingUpdate: Partial<InsertRating>): Promise<Rating | undefined> {
    const [updatedRating] = await db.update(ratings)
      .set({ 
        ...ratingUpdate, 
        updatedAt: new Date() 
      })
      .where(eq(ratings.id, id))
      .returning();
    
    return updatedRating;
  }

  async deleteRating(id: number): Promise<boolean> {
    try {
      await db.delete(ratings).where(eq(ratings.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting rating:', error);
      return false;
    }
  }

  // Combined operations
  async getSpotWithReviewsAndRatings(spotId: number): Promise<{
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

    const windConditions = await this.getWindConditionsForSpot(spotId);
    const reviews = await this.getReviewsForSpot(spotId);
    
    // Calculate rating statistics
    const ratingStats = await db.select({
      avg_wind: avg(ratings.windReliability),
      avg_beginner: avg(ratings.beginnerFriendly),
      avg_scenery: avg(ratings.scenery),
      avg_uncrowded: avg(ratings.uncrowded),
      avg_vibe: avg(ratings.localVibe),
      avg_overall: avg(ratings.overall),
      total: count()
    })
    .from(ratings)
    .where(eq(ratings.spotId, spotId));
    
    const stat = ratingStats[0];
    
    return {
      spot,
      windConditions,
      reviews,
      averageRating: Number(stat.avg_overall || 0),
      totalRatings: Number(stat.total || 0),
      ratingBreakdown: {
        windReliability: Number(stat.avg_wind || 0),
        beginnerFriendly: Number(stat.avg_beginner || 0),
        scenery: Number(stat.avg_scenery || 0),
        uncrowded: Number(stat.avg_uncrowded || 0),
        localVibe: Number(stat.avg_vibe || 0),
        overall: Number(stat.avg_overall || 0),
      }
    };
  }

  // Recommendation operation - same algorithm as MemStorage
  async getRecommendedSpots(preferences: UserPreferences): Promise<SpotWithMatchScore[]> {
    const allSpots = await this.getAllSpots();
    const month = preferences.month;
    const results: SpotWithMatchScore[] = [];
    
    for (const spot of allSpots) {
      const windCondition = await this.getWindConditionBySpotAndMonth(spot.id, month);
      if (!windCondition) continue;
      
      let score = 0;
      const reasons: string[] = [];
      
      // Wind speed match
      const windSpeed = windCondition.windSpeed;
      if (windSpeed >= preferences.windSpeedMin && windSpeed <= preferences.windSpeedMax) {
        score += 0.25;
        reasons.push(`Wind speed (${windSpeed} knots) is within your preferred range`);
      } else {
        const minDistance = Math.min(
          Math.abs(windSpeed - preferences.windSpeedMin),
          Math.abs(windSpeed - preferences.windSpeedMax)
        );
        
        if (minDistance <= 5) {
          score += 0.15;
          reasons.push(`Wind speed (${windSpeed} knots) is close to your preferred range`);
        }
      }
      
      // Wind quality
      if (windCondition.windQuality === WindQuality.Excellent) {
        score += 0.15;
        reasons.push('Excellent wind quality for this month');
      } else if (windCondition.windQuality === WindQuality.Good) {
        score += 0.1;
        reasons.push('Good wind quality for this month');
      }
      
      // Temperature preferences
      if (windCondition.airTemp) {
        const temp = windCondition.airTemp;
        let tempMatch = false;
        
        switch (preferences.temperature) {
          case 'cold':
            if (temp < 20) {
              tempMatch = true;
              reasons.push(`Cool temperatures (${temp}°C) match your preference`);
            }
            break;
          case 'moderate':
            if (temp >= 20 && temp < 25) {
              tempMatch = true;
              reasons.push(`Moderate temperatures (${temp}°C) match your preference`);
            }
            break;
          case 'warm':
            if (temp >= 25 && temp < 30) {
              tempMatch = true;
              reasons.push(`Warm temperatures (${temp}°C) match your preference`);
            }
            break;
          case 'hot':
            if (temp >= 30) {
              tempMatch = true;
              reasons.push(`Hot temperatures (${temp}°C) match your preference`);
            }
            break;
        }
        
        if (tempMatch) {
          score += 0.1;
        }
      }
      
      // Difficulty level match
      if (spot.difficultyLevel) {
        if (preferences.difficulty === 'all' || 
            spot.difficultyLevel.toLowerCase().includes(preferences.difficulty.toLowerCase())) {
          score += 0.1;
          reasons.push(`Difficulty level (${spot.difficultyLevel}) matches your skill level`);
        }
      }
      
      // Budget preferences
      if (spot.averageSchoolCost && spot.averageAccommodationCost) {
        const totalCostPerDay = spot.averageSchoolCost + spot.averageAccommodationCost;
        
        let budgetMatch = false;
        if (preferences.budget === 'budget' && totalCostPerDay < 120) {
          budgetMatch = true;
          reasons.push('Budget-friendly pricing fits your preference');
        } else if (preferences.budget === 'moderate' && totalCostPerDay >= 120 && totalCostPerDay <= 200) {
          budgetMatch = true;
          reasons.push('Moderate pricing fits your preference');
        } else if (preferences.budget === 'luxury' && totalCostPerDay > 200) {
          budgetMatch = true;
          reasons.push('Luxury amenities and pricing match your preference');
        }
        
        if (budgetMatch) {
          score += 0.1;
        }
      }
      
      // Region preference
      if (preferences.preferredRegion !== 'any') {
        const regionCountries = this.regions.get(preferences.preferredRegion) || [];
        if (regionCountries.includes(spot.country)) {
          score += 0.1;
          reasons.push(`Located in your preferred ${preferences.preferredRegion} region`);
        }
      }
      
      // Kite schools availability
      if (preferences.hasKiteSchools && spot.kiteSchools && spot.kiteSchools.length > 0) {
        score += 0.05;
        reasons.push(`Has ${spot.numberOfSchools || spot.kiteSchools.length} kite schools available`);
      }
      
      // Wave preference
      if (preferences.preferWaves && spot.waveSize && 
          (spot.waveSize.toLowerCase().includes('strong') || spot.waveSize.toLowerCase().includes('medium'))) {
        score += 0.05;
        reasons.push(`Offers ${spot.waveSize} waves for riding`);
      } else if (!preferences.preferWaves && spot.waveSize && 
                spot.waveSize.toLowerCase().includes('flat')) {
        score += 0.05;
        reasons.push('Offers flat water conditions as preferred');
      }
      
      // Food options importance
      if (preferences.foodOptions && spot.foodOptions && spot.foodOptions.length > 0) {
        score += 0.05;
        reasons.push('Variety of food options are available');
      }
      
      // Culture/activities importance
      if (preferences.culture && spot.culture) {
        score += 0.05;
        reasons.push('Rich cultural experiences and activities available');
      }
      
      // Add to results if the score is above minimum threshold
      if (score > 0.3) {
        results.push({
          ...spot,
          matchScore: score,
          reasons,
          windCondition
        });
      }
    }
    
    // Sort by match score descending
    results.sort((a, b) => b.matchScore - a.matchScore);
    
    // Return top matches (limited to 8)
    return results.slice(0, 8);
  }
}