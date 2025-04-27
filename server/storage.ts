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
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

export interface UserPreferences {
  windSpeedMin: number;
  windSpeedMax: number;
  temperature: "cold" | "moderate" | "warm" | "hot"; // air temperature
  waterTemperature: "cold" | "moderate" | "warm" | "hot"; // water temperature
  difficulty: string;
  budget: "budget" | "moderate" | "luxury";
  preferredRegion: string;
  hasKiteSchools: boolean;
  preferWaves: boolean;
  foodOptions: boolean;
  culture: boolean;
  month: number;
}

export interface SpotWithMatchScore extends Spot {
  matchScore: number;
  reasons: string[];
  windCondition?: WindCondition;
}

export interface IStorage {
  // Session store for authentication
  sessionStore: any; // Using any for SessionStore type to avoid import complexities
  
  // Spot operations
  getAllSpots(): Promise<Spot[]>;
  getSpotById(id: number): Promise<Spot | undefined>;
  getSpotsByMonth(month: number, windQualityFilter?: WindQuality[]): Promise<(Spot & { windCondition?: { windQuality: WindQuality }})[]>;
  getSpotWithWindConditions(id: number): Promise<{spot: Spot, windConditions: WindCondition[]} | undefined>;
  searchSpots(query: string): Promise<Spot[]>;
  createSpot(spot: InsertSpot): Promise<Spot>;
  
  // Wind conditions operations
  getWindConditionsForSpot(spotId: number): Promise<WindCondition[]>;
  getWindConditionBySpotAndMonth(spotId: number, month: number): Promise<WindCondition | undefined>;
  createWindCondition(windCondition: InsertWindCondition): Promise<WindCondition>;
  
  // Recommendation operation
  getRecommendedSpots(preferences: UserPreferences): Promise<SpotWithMatchScore[]>;
  
  // User operations
  getUserById(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Review operations
  getReviewsForSpot(spotId: number): Promise<ReviewWithUser[]>;
  getReviewsByUserId(userId: number): Promise<ReviewWithUser[]>;
  getReviewByUserAndSpot(userId: number, spotId: number): Promise<Review | undefined>;
  createReview(review: InsertReview): Promise<Review>;
  updateReview(id: number, content: string): Promise<Review | undefined>;
  deleteReview(id: number): Promise<boolean>;
  
  // Rating operations
  getRatingsForSpot(spotId: number): Promise<Rating[]>;
  getRatingByUserAndSpot(userId: number, spotId: number): Promise<Rating | undefined>;
  createRating(rating: InsertRating): Promise<Rating>;
  updateRating(id: number, rating: Partial<InsertRating>): Promise<Rating | undefined>;
  deleteRating(id: number): Promise<boolean>;
  
  // Combined operations
  getSpotWithReviewsAndRatings(spotId: number): Promise<{
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
  } | undefined>;
}

export class MemStorage implements IStorage {
  sessionStore: any; // Using any for SessionStore type to avoid import complexities
  private spots: Map<number, Spot>;
  private windConditions: Map<number, WindCondition>;
  private users: Map<number, User>;
  private reviews: Map<number, Review>;
  private ratings: Map<number, Rating>;
  private currentSpotId: number;
  private currentWindConditionId: number;
  private currentUserId: number;
  private currentReviewId: number;
  private currentRatingId: number;
  private regions: Map<string, string[]>;

  constructor() {
    // Set up in-memory session store for development only
    const MemoryStore = require('memorystore')(require('express-session'));
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    this.spots = new Map();
    this.windConditions = new Map();
    this.users = new Map();
    this.reviews = new Map();
    this.ratings = new Map();
    this.currentSpotId = 1;
    this.currentWindConditionId = 1;
    this.currentUserId = 1;
    this.currentReviewId = 1;
    this.currentRatingId = 1;
    
    // Define regions for filtering
    this.regions = new Map([
      ['caribbean', ['Dominican Republic', 'Cuba', 'Aruba', 'Jamaica', 'Puerto Rico']],
      ['north-america', ['USA', 'Canada', 'Mexico']],
      ['south-america', ['Brazil', 'Venezuela', 'Colombia', 'Peru', 'Chile', 'Argentina']],
      ['europe', ['Spain', 'Portugal', 'France', 'Italy', 'Greece', 'Croatia', 'Netherlands', 'Germany', 'United Kingdom', 'Ireland']],
      ['africa', ['South Africa', 'Morocco', 'Egypt', 'Tanzania', 'Kenya', 'Cape Verde']],
      ['asia', ['Thailand', 'Philippines', 'Vietnam', 'Indonesia', 'Sri Lanka', 'Japan', 'South Korea']],
      ['oceania', ['Australia', 'New Zealand', 'Fiji', 'French Polynesia']]
    ]);
    
    // Initialize with sample data
    this.initializeData();
  }
  
  // Recommendation algorithm
  async getRecommendedSpots(preferences: UserPreferences): Promise<SpotWithMatchScore[]> {
    // Get all spots
    const allSpots = await this.getAllSpots();
    const month = preferences.month;
    const results: SpotWithMatchScore[] = [];
    
    for (const spot of allSpots) {
      // Get wind condition for the selected month
      const windCondition = await this.getWindConditionBySpotAndMonth(spot.id, month);
      if (!windCondition) continue; // Skip spots without wind data for the selected month
      
      let score = 0;
      const reasons: string[] = [];
      
      // Calculate match score based on preferences
      
      // 1. Wind speed match (most important factor)
      const windSpeed = windCondition.windSpeed;
      if (windSpeed >= preferences.windSpeedMin && windSpeed <= preferences.windSpeedMax) {
        score += 0.25; // 25% of total score
        reasons.push(`Wind speed (${windSpeed} knots) is within your preferred range`);
      } else {
        // Still give partial points for being close
        const minDistance = Math.min(
          Math.abs(windSpeed - preferences.windSpeedMin),
          Math.abs(windSpeed - preferences.windSpeedMax)
        );
        
        if (minDistance <= 5) {
          score += 0.15;
          reasons.push(`Wind speed (${windSpeed} knots) is close to your preferred range`);
        }
      }
      
      // 2. Wind quality
      if (windCondition.windQuality === WindQuality.Excellent) {
        score += 0.15;
        reasons.push('Excellent wind quality for this month');
      } else if (windCondition.windQuality === WindQuality.Good) {
        score += 0.1;
        reasons.push('Good wind quality for this month');
      }
      
      // 3. Temperature preferences
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
      
      // 4. Difficulty level match
      if (spot.difficultyLevel) {
        if (preferences.difficulty === 'all' || 
            spot.difficultyLevel.toLowerCase().includes(preferences.difficulty.toLowerCase())) {
          score += 0.1;
          reasons.push(`Difficulty level (${spot.difficultyLevel}) matches your skill level`);
        }
      }
      
      // 5. Budget preferences
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
      
      // 6. Region preference
      if (preferences.preferredRegion !== 'any') {
        const regionCountries = this.regions.get(preferences.preferredRegion) || [];
        if (regionCountries.includes(spot.country)) {
          score += 0.1;
          reasons.push(`Located in your preferred ${preferences.preferredRegion} region`);
        }
      }
      
      // 7. Kite schools availability
      if (preferences.hasKiteSchools && spot.kiteSchools && spot.kiteSchools.length > 0) {
        score += 0.05;
        reasons.push(`Has ${spot.numberOfSchools || spot.kiteSchools.length} kite schools available`);
      }
      
      // 8. Wave preference
      if (preferences.preferWaves && spot.waveSize && 
          (spot.waveSize.toLowerCase().includes('strong') || spot.waveSize.toLowerCase().includes('medium'))) {
        score += 0.05;
        reasons.push(`Offers ${spot.waveSize} waves for riding`);
      } else if (!preferences.preferWaves && spot.waveSize && 
                spot.waveSize.toLowerCase().includes('flat')) {
        score += 0.05;
        reasons.push('Offers flat water conditions as preferred');
      }
      
      // 9. Food options importance
      if (preferences.foodOptions && spot.foodOptions && spot.foodOptions.length > 0) {
        score += 0.05;
        reasons.push('Variety of food options are available');
      }
      
      // 10. Culture/activities importance
      if (preferences.culture && spot.culture) {
        score += 0.05;
        reasons.push('Rich cultural experiences and activities available');
      }
      
      // Add to results if the score is above minimum threshold
      if (score > 0.3) { // At least 30% match
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

  // Spot operations
  async getAllSpots(): Promise<Spot[]> {
    return Array.from(this.spots.values());
  }

  async getSpotById(id: number): Promise<Spot | undefined> {
    return this.spots.get(id);
  }

  async getSpotsByMonth(month: number, windQualityFilter?: WindQuality[]): Promise<Spot[]> {
    const eligibleSpotIds = new Set<number>();
    
    // Get all wind conditions for the specified month
    const conditions = Array.from(this.windConditions.values()).filter(
      condition => condition.month === month
    );
    
    // Filter by wind quality if specified
    if (windQualityFilter && windQualityFilter.length > 0) {
      // Only include spots with wind quality matching the filter
      conditions.forEach(condition => {
        if (windQualityFilter.includes(condition.windQuality as WindQuality)) {
          eligibleSpotIds.add(condition.spotId);
        }
      });
    } else {
      // Default: filter for good or excellent wind conditions
      conditions.forEach(condition => {
        if (
          condition.windQuality === WindQuality.Good ||
          condition.windQuality === WindQuality.Excellent
        ) {
          eligibleSpotIds.add(condition.spotId);
        }
      });
    }
    
    // Get the spots with matching conditions
    return Array.from(this.spots.values()).filter(
      spot => eligibleSpotIds.has(spot.id)
    );
  }

  async getSpotWithWindConditions(id: number): Promise<{spot: Spot, windConditions: WindCondition[]} | undefined> {
    const spot = await this.getSpotById(id);
    if (!spot) return undefined;
    
    const conditions = await this.getWindConditionsForSpot(id);
    return { spot, windConditions: conditions };
  }

  async searchSpots(query: string): Promise<Spot[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.spots.values()).filter(
      spot => 
        spot.name.toLowerCase().includes(lowerQuery) || 
        spot.country.toLowerCase().includes(lowerQuery)
    );
  }

  async createSpot(insertSpot: InsertSpot): Promise<Spot> {
    const id = this.currentSpotId++;
    const spot: Spot = { 
      ...insertSpot, 
      id,
      windguruCode: insertSpot.windguruCode || null,
      kiteSchools: insertSpot.kiteSchools || null,
      difficultyLevel: insertSpot.difficultyLevel || null,
      conditions: insertSpot.conditions || null,
      accommodationOptions: insertSpot.accommodationOptions || null,
      foodOptions: insertSpot.foodOptions || null,
      culture: insertSpot.culture || null,
      averageSchoolCost: insertSpot.averageSchoolCost || null,
      averageAccommodationCost: insertSpot.averageAccommodationCost || null,
      numberOfSchools: insertSpot.numberOfSchools || null
    };
    this.spots.set(id, spot);
    return spot;
  }
  
  // Wind condition operations
  async getWindConditionsForSpot(spotId: number): Promise<WindCondition[]> {
    return Array.from(this.windConditions.values()).filter(
      condition => condition.spotId === spotId
    );
  }

  async getWindConditionBySpotAndMonth(spotId: number, month: number): Promise<WindCondition | undefined> {
    return Array.from(this.windConditions.values()).find(
      condition => condition.spotId === spotId && condition.month === month
    );
  }

  async createWindCondition(insertCondition: InsertWindCondition): Promise<WindCondition> {
    const id = this.currentWindConditionId++;
    const windCondition: WindCondition = { 
      ...insertCondition, 
      id,
      airTemp: insertCondition.airTemp || null,
      waterTemp: insertCondition.waterTemp || null,
      seasonalNotes: insertCondition.seasonalNotes || null
    };
    this.windConditions.set(id, windCondition);
    return windCondition;
  }
  
  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.username === username
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      user => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      createdAt: now,
      displayName: insertUser.displayName || null,
      bio: insertUser.bio || null,
      experience: insertUser.experience || null,
      avatarUrl: insertUser.avatarUrl || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = {
      ...user,
      ...userData,
      updatedAt: new Date()
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Review operations
  async getReviewsForSpot(spotId: number): Promise<ReviewWithUser[]> {
    const spotReviews = Array.from(this.reviews.values())
      .filter(review => review.spotId === spotId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return spotReviews.map(review => {
      const user = this.users.get(review.userId);
      if (!user) throw new Error(`User not found for review: ${review.id}`);
      
      return {
        ...review,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
          experience: user.experience
        }
      };
    });
  }
  
  async getReviewsByUserId(userId: number): Promise<ReviewWithUser[]> {
    const userReviews = Array.from(this.reviews.values())
      .filter(review => review.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return userReviews.map(review => {
      const user = this.users.get(review.userId);
      if (!user) throw new Error(`User not found for review: ${review.id}`);
      
      // Add spot information for context
      const spot = this.spots.get(review.spotId);
      
      return {
        ...review,
        user: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
          experience: user.experience
        },
        spot // Add spot information to the review
      };
    });
  }

  async getReviewByUserAndSpot(userId: number, spotId: number): Promise<Review | undefined> {
    return Array.from(this.reviews.values()).find(
      review => review.userId === userId && review.spotId === spotId
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const now = new Date();
    const review: Review = {
      ...insertReview,
      id,
      createdAt: now,
      updatedAt: now,
      visitDate: insertReview.visitDate || null
    };
    this.reviews.set(id, review);
    return review;
  }

  async updateReview(id: number, content: string): Promise<Review | undefined> {
    const review = this.reviews.get(id);
    if (!review) return undefined;
    
    const updatedReview: Review = {
      ...review,
      content,
      updatedAt: new Date()
    };
    this.reviews.set(id, updatedReview);
    return updatedReview;
  }

  async deleteReview(id: number): Promise<boolean> {
    return this.reviews.delete(id);
  }

  // Rating operations
  async getRatingsForSpot(spotId: number): Promise<Rating[]> {
    return Array.from(this.ratings.values()).filter(
      rating => rating.spotId === spotId
    );
  }

  async getRatingByUserAndSpot(userId: number, spotId: number): Promise<Rating | undefined> {
    return Array.from(this.ratings.values()).find(
      rating => rating.userId === userId && rating.spotId === spotId
    );
  }

  async createRating(insertRating: InsertRating): Promise<Rating> {
    const id = this.currentRatingId++;
    const now = new Date();
    const rating: Rating = {
      ...insertRating,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.ratings.set(id, rating);
    return rating;
  }

  async updateRating(id: number, ratingUpdate: Partial<InsertRating>): Promise<Rating | undefined> {
    const rating = this.ratings.get(id);
    if (!rating) return undefined;
    
    const updatedRating: Rating = {
      ...rating,
      ...ratingUpdate,
      updatedAt: new Date()
    };
    this.ratings.set(id, updatedRating);
    return updatedRating;
  }

  async deleteRating(id: number): Promise<boolean> {
    return this.ratings.delete(id);
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
    const ratings = await this.getRatingsForSpot(spotId);
    
    // Calculate average ratings
    const totalRatings = ratings.length;
    const calcAvg = (field: keyof Rating) => {
      const sum = ratings.reduce((acc, rating) => acc + (rating[field] as number), 0);
      return totalRatings > 0 ? sum / totalRatings : 0;
    };
    
    return {
      spot,
      windConditions,
      reviews,
      averageRating: calcAvg('overall'),
      totalRatings,
      ratingBreakdown: {
        windReliability: calcAvg('windReliability'),
        beginnerFriendly: calcAvg('beginnerFriendly'),
        scenery: calcAvg('scenery'),
        uncrowded: calcAvg('uncrowded'),
        localVibe: calcAvg('localVibe'),
        overall: calcAvg('overall')
      }
    };
  }

  // Initialize with sample data
  private initializeData() {
    // 1. Tarifa, Spain
    const tarifa = this.createInitialSpot({
      name: "Tarifa, Spain",
      country: "Spain",
      latitude: 36.0143,
      longitude: -5.6044,
      description: "Famous for consistent Levante and Poniente winds, this spot offers perfect conditions for kiters of all levels.",
      waveSize: "Medium",
      tempRange: "16-20°C",
      bestMonths: "Dec-Mar",
      localAttractions: "Beyond kitesurfing, Tarifa offers a charming old town with narrow streets and Moorish architecture. Don't miss the Castle of Guzmán el Bueno. The area is known for its vibrant nightlife with beach bars, restaurants serving fresh seafood, and clubs that stay open late. Nearby day trips include Gibraltar, Tangier in Morocco (accessible by ferry), and the beautiful white villages of Andalusia.",
      tags: ["Beginner Friendly", "Sandy Beach", "Rentals Available"],
      windguruCode: "49",
      kiteSchools: [
        "Dragon Tarifa Kite School|https://maps.google.com/maps?cid=13866010850051988642|4.8|127",
        "ION Club Tarifa|https://maps.google.com/maps?cid=14806290270589082059|4.7|94",
        "Rebel Tarifa|https://maps.google.com/maps?cid=9870977445894907991|4.9|68"
      ],
      difficultyLevel: "All Levels",
      conditions: ["Sandy Beach", "Occasional Chop", "Some Gusty Days"],
      accommodationOptions: ["Hotels", "Apartments", "Hostels", "Camping"],
      foodOptions: ["Seafood Restaurants", "Spanish Tapas", "International Cuisine", "Beach Bars"],
      culture: "Vibrant mix of Spanish and Moorish influences with laid-back beach culture",
      averageSchoolCost: 65,
      averageAccommodationCost: 80,
      numberOfSchools: 12
    });

    // 2. Cape Town, South Africa
    const capeTown = this.createInitialSpot({
      name: "Cape Town, South Africa",
      country: "South Africa",
      latitude: -33.9249,
      longitude: 18.4241,
      description: "Legendary spot with reliable summer southeast winds and incredible Table Mountain views.",
      waveSize: "Strong",
      tempRange: "22-28°C",
      bestMonths: "Nov-Feb",
      localAttractions: "Cape Town offers world-class restaurants, vibrant nightlife, and cultural attractions. Visit the iconic Table Mountain by cable car, explore the historic Robben Island where Nelson Mandela was imprisoned, or take a drive to the Cape of Good Hope. The city is also surrounded by renowned wine regions like Stellenbosch and Franschhoek, perfect for day trips.",
      tags: ["Advanced", "Waves", "Scenic Views"],
      windguruCode: "78",
      kiteSchools: [
        "High Five Kitesurfing School|https://maps.google.com/maps?cid=17825071904597267949|4.9|103",
        "Cabrinha Kiteboarding|https://maps.google.com/maps?cid=5959338275045810135|4.8|85",
        "Best Kiteboarding South Africa|https://maps.google.com/maps?cid=8782497832221212255|4.7|77"
      ],
      difficultyLevel: "Advanced",
      conditions: ["Waves", "Strong Currents", "Open Ocean", "Rocky Sections"],
      accommodationOptions: ["Luxury Hotels", "Vacation Rentals", "Boutique Guesthouses", "Surf Hostels"],
      foodOptions: ["Fine Dining", "Seafood", "Farm-to-Table", "Wine Estates", "Food Markets"],
      culture: "Diverse cosmopolitan city with rich history and strong European influences",
      averageSchoolCost: 85,
      averageAccommodationCost: 120,
      numberOfSchools: 15
    });

    // 3. Cabarete, Dominican Republic
    const cabarete = this.createInitialSpot({
      name: "Cabarete, Dominican Republic",
      country: "Dominican Republic",
      latitude: 19.7507,
      longitude: -70.4145,
      description: "Caribbean paradise with thermal winds and flat water inside the reef, waves outside.",
      waveSize: "Varied",
      tempRange: "24-30°C",
      bestMonths: "Dec-Aug",
      localAttractions: "Cabarete is known for its laid-back Caribbean vibe and excellent nightlife. Enjoy fresh seafood at beachfront restaurants, explore nearby waterfalls like Damajagua's 27 Charcos, or take a day trip to Puerto Plata. Adventure seekers can also explore caves, go mountain biking, or try canyoning in the lush surroundings.",
      tags: ["Caribbean", "Nightlife", "All Levels"],
      windguruCode: "389",
      kiteSchools: [
        "Kite Club Cabarete|https://maps.google.com/maps?cid=10726341777331495804|4.8|156",
        "Cabarete Kite School|https://maps.google.com/maps?cid=8345246767243116914|4.9|93",
        "Laurel Eastman Kiteboarding|https://maps.google.com/maps?cid=11000888324115506309|4.7|134"
      ],
      difficultyLevel: "Beginner to Intermediate",
      conditions: ["Flat Inside Reef", "Waves Outside", "Warm Water", "Sandy Bottom"],
      accommodationOptions: ["Beach Resorts", "Budget Hotels", "Hostels", "Apartments"],
      foodOptions: ["Caribbean Cuisine", "Beachfront Restaurants", "International Options", "Street Food"],
      culture: "Vibrant mix of Dominican, Haitian and international influences with relaxed beach lifestyle",
      averageSchoolCost: 60,
      averageAccommodationCost: 70,
      numberOfSchools: 14
    });

    // 4. Maui, Hawaii
    const maui = this.createInitialSpot({
      name: "Maui, Hawaii",
      country: "USA",
      latitude: 20.7984,
      longitude: -156.3319,
      description: "World-class conditions with tradewinds and stunning scenery, perfect for advanced riders.",
      waveSize: "Strong",
      tempRange: "21-27°C",
      bestMonths: "Apr-Oct",
      localAttractions: "Maui offers incredible natural beauty with the Road to Hana, Haleakala National Park for sunrise views, and the famous Seven Sacred Pools. Experience authentic Hawaiian culture through luaus, visit the historic whaling town of Lahaina, or go snorkeling in Molokini Crater, a partially submerged volcanic crater home to vibrant marine life.",
      tags: ["Advanced", "Waves", "Scenic Views"],
      windguruCode: "226",
      kiteSchools: [
        "HST Windsurfing & Kitesurfing School|https://maps.google.com/maps?cid=7018811138901521443|4.9|112",
        "Action Sports Maui|https://maps.google.com/maps?cid=14999410322423969558|4.8|89",
        "Kiteboarding School of Maui|https://maps.google.com/maps?cid=4390272951247276118|4.7|143"
      ],
      difficultyLevel: "Intermediate to Advanced",
      conditions: ["Waves", "Reef Breaks", "Strong Currents", "Clean Water"],
      accommodationOptions: ["Luxury Resorts", "Vacation Rentals", "B&Bs", "Hostels"],
      foodOptions: ["Hawaiian Cuisine", "Seafood", "Fine Dining", "Food Trucks"],
      culture: "Hawaiian culture with strong surfing heritage and respect for ocean traditions",
      averageSchoolCost: 110,
      averageAccommodationCost: 180,
      numberOfSchools: 8
    });

    // 5. Zanzibar, Tanzania
    const zanzibar = this.createInitialSpot({
      name: "Zanzibar, Tanzania",
      country: "Tanzania", 
      latitude: -6.1659,
      longitude: 39.1994,
      description: "Consistent trade winds and warm waters along beautiful white sand beaches make this an ideal destination.",
      waveSize: "Small",
      tempRange: "25-32°C",
      bestMonths: "Dec-Mar, Jun-Sep",
      localAttractions: "Zanzibar's Stone Town is a UNESCO World Heritage site with a rich history of Swahili, Arab, Persian, and European influences. Explore spice plantations, visit the former slave market, or take a boat trip to see dolphins. The island also offers pristine beaches, excellent snorkeling in coral reefs, and a chance to visit Jozani Forest to see the rare Red Colobus monkeys.",
      tags: ["Warm Water", "Cultural Experience", "Beginner Friendly"],
      windguruCode: "1133",
      kiteSchools: [
        "Zanzibar Kite Paradise|https://maps.google.com/maps?cid=10046944852400555969|4.9|87",
        "Kite Centre Paje|https://maps.google.com/maps?cid=14557586088856125633|4.7|105",
        "Aquaholics Zanzibar|https://maps.google.com/maps?cid=9450883969741128811|4.8|74"
      ],
      difficultyLevel: "Beginner Friendly",
      conditions: ["Flat Water", "Shallow Lagoon", "Sandy Bottom", "Warm Water"],
      accommodationOptions: ["Beach Bungalows", "Boutique Hotels", "Backpacker Lodges", "Local Guesthouses"],
      foodOptions: ["Swahili Cuisine", "Seafood", "International Options", "Beach Restaurants"],
      culture: "Swahili culture with strong Arabic influences and friendly locals",
      averageSchoolCost: 50,
      averageAccommodationCost: 45,
      numberOfSchools: 10
    });

    // 6. Essaouira, Morocco
    const essaouira = this.createInitialSpot({
      name: "Essaouira, Morocco",
      country: "Morocco",
      latitude: 31.5085,
      longitude: -9.7698,
      description: "Consistent strong winds and a rich cultural experience in this historic fortified city.",
      waveSize: "Medium",
      tempRange: "18-25°C",
      bestMonths: "Apr-Sep",
      localAttractions: "Essaouira's medina (old town) is a UNESCO World Heritage site with blue and white buildings, narrow streets, and vibrant markets. The city has a laid-back artistic vibe with many galleries and workshops. Visit the ramparts for ocean views, explore the busy fishing port, or experience traditional Gnawa music. Day trips to nearby argan oil cooperatives or the Atlas Mountains are also popular.",
      tags: ["Cultural Experience", "Historic City", "Consistent Winds"],
      windguruCode: "269",
      kiteSchools: [
        "Essaouira Kitesurfing|https://maps.google.com/maps?cid=3583446324805989002|4.8|97",
        "Explora Morocco|https://maps.google.com/maps?cid=16231288534362533599|4.9|82",
        "Kite Paradise Morocco|https://maps.google.com/maps?cid=6624767784441822246|4.7|65"
      ],
      difficultyLevel: "Intermediate",
      conditions: ["Bay Setting", "Chop", "Medium Waves", "Strong Wind"],
      accommodationOptions: ["Riads", "Medina Hotels", "Beachfront Apartments", "Budget Hostels"],
      foodOptions: ["Moroccan Cuisine", "Fresh Seafood", "French Influence", "Street Food"],
      culture: "Traditional Moroccan with Berber, Arabic and French influences in a historic setting",
      averageSchoolCost: 55,
      averageAccommodationCost: 40,
      numberOfSchools: 6
    });

    // Add wind conditions for all spots
    this.addWindConditionsForSpot(tarifa.id);
    this.addWindConditionsForSpot(capeTown.id);
    this.addWindConditionsForSpot(cabarete.id);
    this.addWindConditionsForSpot(maui.id);
    this.addWindConditionsForSpot(zanzibar.id);
    this.addWindConditionsForSpot(essaouira.id);
  }

  // Helper to create initial spots
  private createInitialSpot(data: InsertSpot): Spot {
    const id = this.currentSpotId++;
    const spot: Spot = { 
      ...data, 
      id,
      windguruCode: data.windguruCode || null,
      kiteSchools: data.kiteSchools || null,
      difficultyLevel: data.difficultyLevel || null,
      conditions: data.conditions || null,
      accommodationOptions: data.accommodationOptions || null,
      foodOptions: data.foodOptions || null,
      culture: data.culture || null,
      averageSchoolCost: data.averageSchoolCost || null,
      averageAccommodationCost: data.averageAccommodationCost || null,
      numberOfSchools: data.numberOfSchools || null
    };
    this.spots.set(id, spot);
    return spot;
  }

  // Helper to add monthly wind conditions for a spot
  private addWindConditionsForSpot(spotId: number) {
    // Pattern depends on the spot
    let windPatterns: { speed: number, quality: WindQuality, airTemp: number, waterTemp: number, seasonalNotes?: string }[] = [];
    
    switch(spotId) {
      case 1: // Tarifa
        windPatterns = [
          { speed: 22, quality: WindQuality.Excellent, airTemp: 16, waterTemp: 15, seasonalNotes: "Winter season, strongest winds, bring wetsuit" }, // Jan
          { speed: 20, quality: WindQuality.Excellent, airTemp: 17, waterTemp: 15, seasonalNotes: "Still cool, excellent wind consistency" }, // Feb
          { speed: 18, quality: WindQuality.Good, airTemp: 19, waterTemp: 16 }, // Mar
          { speed: 15, quality: WindQuality.Moderate, airTemp: 21, waterTemp: 17 }, // Apr
          { speed: 14, quality: WindQuality.Moderate, airTemp: 24, waterTemp: 19 }, // May
          { speed: 12, quality: WindQuality.Poor, airTemp: 28, waterTemp: 21, seasonalNotes: "Tourist season begins, less wind" }, // Jun
          { speed: 10, quality: WindQuality.Poor, airTemp: 30, waterTemp: 23, seasonalNotes: "Peak tourist season, most crowded" }, // Jul
          { speed: 11, quality: WindQuality.Poor, airTemp: 30, waterTemp: 23 }, // Aug
          { speed: 13, quality: WindQuality.Moderate, airTemp: 27, waterTemp: 22 }, // Sep
          { speed: 15, quality: WindQuality.Moderate, airTemp: 23, waterTemp: 20 }, // Oct
          { speed: 18, quality: WindQuality.Good, airTemp: 19, waterTemp: 18 }, // Nov
          { speed: 21, quality: WindQuality.Excellent, airTemp: 17, waterTemp: 16, seasonalNotes: "Beginning of winter season, strong winds return" }, // Dec
        ];
        break;
      case 2: // Cape Town
        windPatterns = [
          { speed: 25, quality: WindQuality.Excellent, airTemp: 26, waterTemp: 18, seasonalNotes: "Peak summer season, most consistent wind" }, // Jan
          { speed: 23, quality: WindQuality.Excellent, airTemp: 26, waterTemp: 19, seasonalNotes: "Excellent conditions continue" }, // Feb
          { speed: 18, quality: WindQuality.Good, airTemp: 24, waterTemp: 19 }, // Mar
          { speed: 15, quality: WindQuality.Moderate, airTemp: 22, waterTemp: 18 }, // Apr
          { speed: 12, quality: WindQuality.Poor, airTemp: 19, waterTemp: 17, seasonalNotes: "Winter approaching, conditions deteriorating" }, // May
          { speed: 10, quality: WindQuality.Poor, airTemp: 18, waterTemp: 16, seasonalNotes: "Winter season, cold water, wetsuit essential" }, // Jun
          { speed: 10, quality: WindQuality.Poor, airTemp: 17, waterTemp: 15 }, // Jul
          { speed: 12, quality: WindQuality.Poor, airTemp: 18, waterTemp: 15 }, // Aug
          { speed: 14, quality: WindQuality.Moderate, airTemp: 19, waterTemp: 16 }, // Sep
          { speed: 18, quality: WindQuality.Good, airTemp: 21, waterTemp: 16 }, // Oct
          { speed: 22, quality: WindQuality.Excellent, airTemp: 23, waterTemp: 17, seasonalNotes: "Wind season begins, excellent conditions" }, // Nov
          { speed: 24, quality: WindQuality.Excellent, airTemp: 25, waterTemp: 18, seasonalNotes: "Perfect summer conditions" }, // Dec
        ];
        break;
      case 3: // Cabarete
        windPatterns = [
          { speed: 18, quality: WindQuality.Good, airTemp: 27, waterTemp: 26 }, // Jan
          { speed: 18, quality: WindQuality.Good, airTemp: 27, waterTemp: 26 }, // Feb
          { speed: 16, quality: WindQuality.Moderate, airTemp: 28, waterTemp: 26 }, // Mar
          { speed: 17, quality: WindQuality.Good, airTemp: 29, waterTemp: 27 }, // Apr
          { speed: 18, quality: WindQuality.Good, airTemp: 30, waterTemp: 28 }, // May
          { speed: 20, quality: WindQuality.Excellent, airTemp: 31, waterTemp: 28, seasonalNotes: "Perfect summer conditions, thermal winds strongest" }, // Jun
          { speed: 20, quality: WindQuality.Excellent, airTemp: 31, waterTemp: 29, seasonalNotes: "Peak season, ideal conditions" }, // Jul
          { speed: 18, quality: WindQuality.Good, airTemp: 31, waterTemp: 29 }, // Aug
          { speed: 16, quality: WindQuality.Moderate, airTemp: 30, waterTemp: 29, seasonalNotes: "Hurricane season possible" }, // Sep
          { speed: 15, quality: WindQuality.Moderate, airTemp: 29, waterTemp: 28, seasonalNotes: "Hurricane season possible" }, // Oct
          { speed: 16, quality: WindQuality.Moderate, airTemp: 28, waterTemp: 27 }, // Nov
          { speed: 17, quality: WindQuality.Good, airTemp: 27, waterTemp: 26 }, // Dec
        ];
        break;
      case 4: // Maui
        windPatterns = [
          { speed: 15, quality: WindQuality.Moderate, airTemp: 25, waterTemp: 23 }, // Jan
          { speed: 16, quality: WindQuality.Moderate, airTemp: 25, waterTemp: 23 }, // Feb
          { speed: 18, quality: WindQuality.Good, airTemp: 25, waterTemp: 24 }, // Mar
          { speed: 20, quality: WindQuality.Excellent, airTemp: 26, waterTemp: 24, seasonalNotes: "Start of prime season" }, // Apr
          { speed: 22, quality: WindQuality.Excellent, airTemp: 27, waterTemp: 25, seasonalNotes: "Perfect wind conditions" }, // May
          { speed: 22, quality: WindQuality.Excellent, airTemp: 28, waterTemp: 25, seasonalNotes: "Peak season, can be crowded" }, // Jun
          { speed: 21, quality: WindQuality.Excellent, airTemp: 29, waterTemp: 26, seasonalNotes: "Consistent thermal winds" }, // Jul
          { speed: 20, quality: WindQuality.Excellent, airTemp: 29, waterTemp: 26 }, // Aug
          { speed: 18, quality: WindQuality.Good, airTemp: 29, waterTemp: 26 }, // Sep
          { speed: 17, quality: WindQuality.Good, airTemp: 28, waterTemp: 25 }, // Oct
          { speed: 15, quality: WindQuality.Moderate, airTemp: 27, waterTemp: 24 }, // Nov
          { speed: 14, quality: WindQuality.Moderate, airTemp: 26, waterTemp: 24 }, // Dec
        ];
        break;
      case 5: // Zanzibar
        windPatterns = [
          { speed: 20, quality: WindQuality.Excellent, airTemp: 31, waterTemp: 29, seasonalNotes: "Peak of north monsoon (Kaskazi)" }, // Jan
          { speed: 19, quality: WindQuality.Good, airTemp: 31, waterTemp: 29 }, // Feb
          { speed: 18, quality: WindQuality.Good, airTemp: 30, waterTemp: 29, seasonalNotes: "End of north monsoon" }, // Mar
          { speed: 14, quality: WindQuality.Moderate, airTemp: 29, waterTemp: 28 }, // Apr
          { speed: 12, quality: WindQuality.Poor, airTemp: 28, waterTemp: 27, seasonalNotes: "Transition month, unpredictable" }, // May
          { speed: 17, quality: WindQuality.Good, airTemp: 27, waterTemp: 26, seasonalNotes: "Start of south monsoon (Kuzi)" }, // Jun
          { speed: 19, quality: WindQuality.Good, airTemp: 26, waterTemp: 25, seasonalNotes: "Consistent south winds" }, // Jul
          { speed: 18, quality: WindQuality.Good, airTemp: 26, waterTemp: 25 }, // Aug
          { speed: 16, quality: WindQuality.Moderate, airTemp: 27, waterTemp: 25, seasonalNotes: "End of south monsoon" }, // Sep
          { speed: 14, quality: WindQuality.Moderate, airTemp: 28, waterTemp: 26 }, // Oct
          { speed: 16, quality: WindQuality.Moderate, airTemp: 29, waterTemp: 27 }, // Nov
          { speed: 19, quality: WindQuality.Good, airTemp: 30, waterTemp: 28, seasonalNotes: "North monsoon begins again" }, // Dec
        ];
        break;
      case 6: // Essaouira
        windPatterns = [
          { speed: 14, quality: WindQuality.Moderate, airTemp: 18, waterTemp: 16 }, // Jan
          { speed: 15, quality: WindQuality.Moderate, airTemp: 19, waterTemp: 16 }, // Feb
          { speed: 17, quality: WindQuality.Good, airTemp: 21, waterTemp: 17 }, // Mar
          { speed: 19, quality: WindQuality.Good, airTemp: 22, waterTemp: 17, seasonalNotes: "Spring conditions, trade winds building" }, // Apr
          { speed: 22, quality: WindQuality.Excellent, airTemp: 23, waterTemp: 18, seasonalNotes: "Trade winds well established" }, // May
          { speed: 24, quality: WindQuality.Excellent, airTemp: 24, waterTemp: 19, seasonalNotes: "Peak season begins" }, // Jun
          { speed: 25, quality: WindQuality.Excellent, airTemp: 25, waterTemp: 21, seasonalNotes: "Strongest winds, ideal conditions" }, // Jul
          { speed: 25, quality: WindQuality.Excellent, airTemp: 25, waterTemp: 21, seasonalNotes: "Peak season, most crowded" }, // Aug
          { speed: 21, quality: WindQuality.Excellent, airTemp: 24, waterTemp: 20 }, // Sep
          { speed: 17, quality: WindQuality.Good, airTemp: 22, waterTemp: 19 }, // Oct
          { speed: 15, quality: WindQuality.Moderate, airTemp: 20, waterTemp: 18 }, // Nov
          { speed: 14, quality: WindQuality.Moderate, airTemp: 19, waterTemp: 17 }, // Dec
        ];
        break;
      default:
        // Default random pattern with temperature data
        windPatterns = Array(12).fill(0).map((_, i) => {
          const speed = 10 + Math.floor(Math.random() * 15);
          let quality = WindQuality.Poor;
          if (speed > 20) quality = WindQuality.Excellent;
          else if (speed > 17) quality = WindQuality.Good;
          else if (speed > 14) quality = WindQuality.Moderate;
          return { 
            speed, 
            quality, 
            airTemp: 20 + Math.floor(Math.random() * 10),
            waterTemp: 18 + Math.floor(Math.random() * 8)
          };
        });
    }
    
    // Create wind conditions for each month
    for (let month = 1; month <= 12; month++) {
      const pattern = windPatterns[month - 1];
      this.createWindCondition({
        spotId,
        month,
        windSpeed: pattern.speed,
        windQuality: pattern.quality,
        airTemp: pattern.airTemp,
        waterTemp: pattern.waterTemp,
        seasonalNotes: pattern.seasonalNotes
      });
    }
  }
}

import { DatabaseStorage } from "./database-storage";

// Use the database-backed storage instead of in-memory storage
export const storage = new DatabaseStorage();
