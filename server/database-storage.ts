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
    setTimeout(() => {
      this.checkAndInitializeData();
    }, 0);
  }

  private async checkAndInitializeData() {
    try {
      // Check if we have any spots
      const spotsResult = await db.select().from(spots).limit(1);

      if (spotsResult.length === 0) {
        console.log(
          "No spots found in database. Initializing with sample data...",
        );
        await this.initializeData();
        console.log("Sample data initialization completed successfully");
      }
    } catch (error) {
      console.error("Error checking database for spots:", error);
    }
  }

  private async initializeData() {
    try {
      // 1. Tarifa, Spain
      const tarifa = await this.createSpot({
        name: "Tarifa, Spain",
        country: "Spain",
        latitude: 36.0143,
        longitude: -5.6044,
        description:
          "Known as Europe's wind capital, Tarifa offers consistent Levante and Poniente winds, making it ideal for kitesurfers of all levels.",
        waveSize: "Small to Medium",
        tempRange: "20–30°C",
        bestMonths: "April–October",
        tags: ["Kite Schools", "Equipment Rental", "Beachfront Accommodation"],
        difficultyLevel: "Beginner to Intermediate",
        kiteSchools: [
          "Rebels Tarifa Kiteschool|https://maps.google.com/?q=Rebels+Tarifa+Kiteschool|5.0|687",
          "Addict Kite School Tarifa|https://maps.google.com/?q=Addict+Kite+School+Tarifa|5.0|552",
          "Tarifa Max Kitesurf School|https://maps.google.com/?q=Tarifa+Max+Kitesurf+School|5.0|361",
          "Free your Mind|https://maps.google.com/?q=Free+your+Mind+Tarifa|5.0|325",
          "Freeride Tarifa|https://maps.google.com/?q=Freeride+Tarifa|5.0|212",
          "Wind & Water Experience|https://maps.google.com/?q=Wind+%26+Water+Experience+Tarifa|5.0|170",
          "Wayuu Watersports|https://maps.google.com/?q=Wayuu+Watersports+Tarifa|5.0|136",
          "Tarifa Spin Out|https://maps.google.com/?q=Tarifa+Spin+Out|5.0|145",
          "Lazykite School Tarifa|https://maps.google.com/?q=Lazykite+School+Tarifa|5.0|116",
          "ION Club Tarifa|https://maps.google.com/?q=ION+Club+Tarifa|4.7|95",
        ],
        localAttractions:
          "Historic Old Town, Castillo de Guzmán el Bueno, Whale-watching in the Strait of Gibraltar, Day trips to Tangier",
        windguruCode: "48",
        conditions: ["Flat to Choppy Water", "Consistent Wind", "Sandy Bottom"],
        accommodationOptions: [
          "Beachfront Hotels",
          "Boutique Guesthouses",
          "Vacation Rentals",
        ],
        foodOptions: [
          "Tapas Bars",
          "Seafood Restaurants",
          "Beach Chiringuitos",
          "Vegan Cafés",
        ],
        culture:
          "Spanish coastal culture with strong flamenco influences and Moorish heritage",
        averageSchoolCost: 70,
        averageAccommodationCost: 90,
        numberOfSchools: 45,
      });

      const conditions = [
        {
          spotId: tarifa.id,
          month: 1,
          windQuality: WindQuality.Moderate,
          windSpeed: 18,
          airTemp: 13,
          waterTemp: 16,
          seasonalNotes: "Winter brings consistent Levante winds with fewer crowds. Wetsuits are recommended due to cooler temperatures."
        },
        {
          spotId: tarifa.id,
          month: 2,
          windQuality: WindQuality.Moderate,
          windSpeed: 17,
          airTemp: 13,
          waterTemp: 15,
          seasonalNotes: "Continued strong Levante winds. Ideal for experienced kiters seeking reliable wind conditions."
        },
        {
          spotId: tarifa.id,
          month: 3,
          windQuality: WindQuality.Good,
          windSpeed: 19,
          airTemp: 15,
          waterTemp: 16,
          seasonalNotes: "Transition to spring with increasing temperatures and consistent wind patterns."
        },
        {
          spotId: tarifa.id,
          month: 4,
          windQuality: WindQuality.Good,
          windSpeed: 20,
          airTemp: 17,
          waterTemp: 17,
          seasonalNotes: "Spring offers reliable winds and pleasant temperatures, attracting more kitesurfers."
        },
        {
          spotId: tarifa.id,
          month: 5,
          windQuality: WindQuality.Excellent,
          windSpeed: 22,
          airTemp: 19,
          waterTemp: 18,
          seasonalNotes: "One of the best months for kitesurfing with strong winds and comfortable temperatures."
        },
        {
          spotId: tarifa.id,
          month: 6,
          windQuality: WindQuality.Excellent,
          windSpeed: 24,
          airTemp: 22,
          waterTemp: 19,
          seasonalNotes: "Early summer brings consistent Poniente winds and warmer conditions."
        },
        {
          spotId: tarifa.id,
          month: 7,
          windQuality: WindQuality.Good,
          windSpeed: 23,
          airTemp: 25,
          waterTemp: 21,
          seasonalNotes: "Peak summer with strong winds and warm temperatures. Popular among tourists."
        },
        {
          spotId: tarifa.id,
          month: 8,
          windQuality: WindQuality.Good,
          windSpeed: 22,
          airTemp: 26,
          waterTemp: 22,
          seasonalNotes: "Continued strong winds and warm conditions. Beaches can be crowded."
        },
        {
          spotId: tarifa.id,
          month: 9,
          windQuality: WindQuality.Excellent,
          windSpeed: 21,
          airTemp: 24,
          waterTemp: 21,
          seasonalNotes: "Ideal conditions with consistent winds and fewer tourists."
        },
        {
          spotId: tarifa.id,
          month: 10,
          windQuality: WindQuality.Good,
          windSpeed: 20,
          airTemp: 21,
          waterTemp: 20,
          seasonalNotes: "Autumn offers reliable winds and comfortable temperatures."
        },
        {
          spotId: tarifa.id,
          month: 11,
          windQuality: WindQuality.Moderate,
          windSpeed: 19,
          airTemp: 17,
          waterTemp: 18,
          seasonalNotes: "Winds remain consistent, but temperatures begin to drop. Wetsuits recommended."
        },
        {
          spotId: tarifa.id,
          month: 12,
          windQuality: WindQuality.Moderate,
          windSpeed: 18,
          airTemp: 14,
          waterTemp: 17,
          seasonalNotes: "Winter conditions with strong Levante winds. Ideal for experienced kiters."
        }
      ];
      // Create wind conditions for Tarifa
      await this.setupSpotWindConditions(tarifa.id, conditions);

      // 2. Cabarete, Dominican Republic
      const cabarete = await this.createSpot({
        name: "Cabarete, Dominican Republic",
        country: "Dominican Republic",
        latitude: 19.7644,
        longitude: -70.4168,
        description:
          "Known as the 'Kiteboarding Capital of the World', Cabarete offers consistent trade winds and warm waters year-round.",
        waveSize: "Small to Medium",
        tempRange: "24-30°C",
        bestMonths: "Jun-Aug",
        tags: [
          "Kite Schools",
          "Equipment Rental",
          "Beach Bars",
          "Accommodation",
        ],
        difficultyLevel: "Beginner to Advanced",
        kiteSchools: [
          "Kite Club Cabarete|https://maps.google.com/?q=Kite+Club+Cabarete|4.6|87",
          "Laurel Eastman Kiteboarding School|https://maps.google.com/?q=Laurel+Eastman+Kiteboarding+Cabarete|4.9|132",
          "GoKite Cabarete|https://maps.google.com/?q=GoKite+Cabarete|4.8|95",
        ],
        localAttractions:
          "Vibrant nightlife, beachfront restaurants, nearby waterfalls",
        windguruCode: "227",
        conditions: ["Small to Medium Waves", "Reliable Wind", "Sandy Bottom"],
        accommodationOptions: [
          "Beach Resorts",
          "Budget Hostels",
          "Vacation Rentals",
        ],
        foodOptions: [
          "Local Caribbean Cuisine",
          "International Restaurants",
          "Beach Bars",
        ],
        culture: "Caribbean island vibe with Latin influences",
        averageSchoolCost: 90,
        averageAccommodationCost: 80,
        numberOfSchools: 3,
      });

      // Create wind conditions for Cabarete
      for (let month = 1; month <= 12; month++) {
        let windQuality = WindQuality.Good;
        let windSpeed = 17;
        let airTemp = 26;
        let waterTemp = 25;
        let seasonalNotes = "";

        // Winter (moderate winds)
        if (month >= 1 && month <= 3) {
          windQuality = WindQuality.Good;
          windSpeed = 16;
          airTemp = 25;
          waterTemp = 25;
          seasonalNotes =
            "Reliable trade winds, perfect for beginners and freestyle riders.";
        }
        // Spring (improving winds)
        else if (month >= 4 && month <= 5) {
          windQuality = WindQuality.Good;
          windSpeed = 18;
          airTemp = 27;
          waterTemp = 26;
          seasonalNotes =
            "Consistent afternoon thermal effect, usually picking up around 11am.";
        }
        // Summer (peak wind season)
        else if (month >= 6 && month <= 8) {
          windQuality = WindQuality.Excellent;
          windSpeed = 22;
          airTemp = 30;
          waterTemp = 28;
          seasonalNotes =
            "Peak season with strongest and most consistent trade winds. More crowded.";
        }
        // Fall (hurricane season - more variable)
        else {
          windQuality = month >= 11 ? WindQuality.Good : WindQuality.Moderate;
          windSpeed = month >= 11 ? 17 : 15;
          airTemp = 27;
          waterTemp = 26;
          seasonalNotes =
            month >= 11
              ? "Winds becoming more reliable again after hurricane season."
              : "Wind can be affected by hurricane season. Check forecasts carefully.";
        }

        await this.createWindCondition({
          spotId: cabarete.id,
          month,
          windSpeed,
          windQuality,
          airTemp,
          waterTemp,
          seasonalNotes,
        });
      }

      // 3. Cumbuco, Brazil
      const cumbuco = await this.createSpot({
        name: "Cumbuco, Brazil",
        country: "Brazil",
        latitude: -3.6178,
        longitude: -38.7447,
        description:
          "Offers perfect flat water lagoons and consistent cross-onshore winds. A paradise for freestylers and beginners alike.",
        waveSize: "Small",
        tempRange: "26-32°C",
        bestMonths: "Jul-Dec",
        tags: [
          "Kite Schools",
          "Equipment Rental",
          "Lagoons",
          "Beachfront Accommodation",
        ],
        difficultyLevel: "Beginner to Intermediate",
        kiteSchools: [
          "Club Ventos|https://maps.google.com/?q=Club+Ventos+Cumbuco|4.9|105",
          "Kite Brazil|https://maps.google.com/?q=Kite+Brazil+Cumbuco|4.7|76",
          "Windtown Beach Resort|https://maps.google.com/?q=Windtown+Beach+Resort+Cumbuco|4.8|62",
        ],
        localAttractions:
          "Dune buggy tours, traditional fishing villages, Fortaleza day trips",
        windguruCode: "300",
        conditions: ["Flat Water", "Stable Wind", "Lagoon", "Beach"],
        accommodationOptions: [
          "Pousadas",
          "Beachfront Hotels",
          "Kitesurfing Resorts",
        ],
        foodOptions: [
          "Local Brazilian Cuisine",
          "Seafood",
          "Beach Restaurants",
        ],
        culture: "Brazilian beach culture with samba and local festivals",
        averageSchoolCost: 75,
        averageAccommodationCost: 65,
        numberOfSchools: 3,
      });

      // Create wind conditions for Cumbuco
      for (let month = 1; month <= 12; month++) {
        let windQuality = WindQuality.Moderate;
        let windSpeed = 15;
        let airTemp = 28;
        let waterTemp = 27;
        let seasonalNotes = "";

        // Summer in Brazil (Dec-Feb) - Transition season
        if ((month >= 1 && month <= 2) || month === 12) {
          windQuality = WindQuality.Good;
          windSpeed = 18;
          airTemp = 31;
          waterTemp = 28;
          seasonalNotes =
            "Reliable winds most days, but more variable than peak season.";
        }
        // Fall/Winter in Brazil (Mar-Jun) - Rainy season, less wind
        else if (month >= 3 && month <= 6) {
          windQuality = WindQuality.Moderate;
          windSpeed = 13;
          airTemp = 28;
          waterTemp = 27;
          seasonalNotes =
            "Off-season with occasional rainy days and less reliable winds.";
        }
        // Winter/Spring in Brazil (Jul-Nov) - Peak wind season
        else {
          windQuality = WindQuality.Excellent;
          windSpeed = 25;
          airTemp = 29;
          waterTemp = 27;
          seasonalNotes =
            "Peak wind season with super consistent cross-shore trade winds nearly every day.";
        }

        await this.createWindCondition({
          spotId: cumbuco.id,
          month,
          windSpeed,
          windQuality,
          airTemp,
          waterTemp,
          seasonalNotes,
        });
      }

      // 4. Le Morne, Mauritius
      const leMorne = await this.createSpot({
        name: "Le Morne, Mauritius",
        country: "Mauritius",
        latitude: -20.4574,
        longitude: 57.3089,
        description:
          "World-class spot with clear lagoon and wave conditions. Protected by coral reef with stunning backdrop of Le Morne mountain.",
        waveSize: "Medium to Large (Outside reef)",
        tempRange: "22-30°C",
        bestMonths: "May-Oct",
        tags: ["Premium Resorts", "Kite Schools", "Equipment Rental"],
        difficultyLevel: "Intermediate to Advanced",
        kiteSchools: [
          "ION Club Le Morne|https://maps.google.com/?q=ION+Club+Le+Morne|4.8|102",
          "KiteGlobing|https://maps.google.com/?q=KiteGlobing+Le+Morne+Mauritius|4.9|85",
          "Yoaneye Kite Centre|https://maps.google.com/?q=Yoaneye+Kite+Centre+Le+Morne|4.7|53",
        ],
        localAttractions:
          "UNESCO World Heritage site, Le Morne mountain hikes, Black River Gorges National Park",
        windguruCode: "176",
        conditions: ["Lagoon", "Reef Break", "Wave Riding", "Bump and Jump"],
        accommodationOptions: [
          "Luxury Resorts",
          "Beach Villas",
          "Boutique Hotels",
        ],
        foodOptions: ["Creole Cuisine", "Seafood", "International Restaurants"],
        culture:
          "Mix of French, African, Indian and Chinese influences in a tropical paradise",
        averageSchoolCost: 100,
        averageAccommodationCost: 150,
        numberOfSchools: 3,
      });

      // Create wind conditions for Le Morne
      for (let month = 1; month <= 12; month++) {
        let windQuality = WindQuality.Good;
        let windSpeed = 18;
        let airTemp = 25;
        let waterTemp = 24;
        let seasonalNotes = "";

        // Summer (Dec-Apr) - Warmer, cyclone season
        if ((month >= 1 && month <= 4) || month === 12) {
          windQuality = WindQuality.Moderate;
          windSpeed = 15;
          airTemp = 29;
          waterTemp = 28;
          seasonalNotes =
            "Warmer but less reliable winds. Cyclone season - monitor weather forecasts.";
        }
        // Winter (May-Nov) - Peak wind season
        else {
          windQuality =
            month >= 6 && month <= 9 ? WindQuality.Excellent : WindQuality.Good;
          windSpeed = month >= 6 && month <= 9 ? 22 : 18;
          airTemp = 23;
          waterTemp = 23;
          seasonalNotes =
            "Trade winds most consistent. Perfect conditions with fewer crowds than summer.";
        }

        await this.createWindCondition({
          spotId: leMorne.id,
          month,
          windSpeed,
          windQuality,
          airTemp,
          waterTemp,
          seasonalNotes,
        });
      }

      // 5. Dakhla, Morocco
      const dakhla = await this.createSpot({
        name: "Dakhla, Morocco",
        country: "Morocco",
        latitude: 23.7115,
        longitude: -15.937,
        description:
          "Incredible flat water lagoon with consistent wind. Remote location offers uncrowded conditions and unique desert landscape.",
        waveSize: "Flat (Lagoon) to Medium (Ocean side)",
        tempRange: "18-26°C",
        bestMonths: "Apr-Sep",
        tags: ["Kite Camps", "Equipment Rental", "Accommodation"],
        difficultyLevel: "All Levels",
        kiteSchools: [
          "Dakhla Attitude|https://maps.google.com/?q=Dakhla+Attitude+Morocco|4.8|114",
          "Ocean Vagabond|https://maps.google.com/?q=Ocean+Vagabond+Dakhla|4.7|92",
          "West Point Dakhla|https://maps.google.com/?q=West+Point+Dakhla|4.9|73",
        ],
        localAttractions:
          "Sahara Desert tours, traditional Berber villages, Dragon Island",
        windguruCode: "379",
        conditions: ["Flat Water", "Lagoon", "Ocean Side", "Steady Wind"],
        accommodationOptions: ["Kite Camps", "Eco Lodges", "Desert Resorts"],
        foodOptions: ["Moroccan Cuisine", "Fresh Seafood", "Camp Dining"],
        culture: "Blend of Berber, Arab and nomadic desert traditions",
        averageSchoolCost: 70,
        averageAccommodationCost: 60,
        numberOfSchools: 3,
      });

      // Create wind conditions for Dakhla
      for (let month = 1; month <= 12; month++) {
        let windQuality = WindQuality.Good;
        let windSpeed = 18;
        let airTemp = 22;
        let waterTemp = 19;
        let seasonalNotes = "";

        // Winter (Jan-Mar) - Cooler, windier
        if (month >= 1 && month <= 3) {
          windQuality = WindQuality.Good;
          windSpeed = 20;
          airTemp = 18;
          waterTemp = 17;
          seasonalNotes =
            "Strong winds but cooler temperatures. 4/3 wetsuit recommended.";
        }
        // Spring/Summer (Apr-Sep) - Peak season
        else if (month >= 4 && month <= 9) {
          windQuality = WindQuality.Excellent;
          windSpeed = 22;
          airTemp = 24;
          waterTemp = 20;
          seasonalNotes =
            "Perfect conditions with thermal winds virtually every day. Short wetsuit sufficient.";
        }
        // Fall (Oct-Dec) - Transitional
        else {
          windQuality = WindQuality.Good;
          windSpeed = 17;
          airTemp = 20;
          waterTemp = 18;
          seasonalNotes =
            "Less reliable winds but still good conditions most days.";
        }

        await this.createWindCondition({
          spotId: dakhla.id,
          month,
          windSpeed,
          windQuality,
          airTemp,
          waterTemp,
          seasonalNotes,
        });
      }

      console.log("Sample data initialization complete!");
    } catch (error) {
      console.error("Error initializing sample data:", error);
    }
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
    try {
      // Get all spot IDs with good or excellent wind conditions for the month
      const goodSpotIds = await db
        .select({ spotId: windConditions.spotId })
        .from(windConditions)
        .where(
          and(
            eq(windConditions.month, month),
            or(
              eq(windConditions.windQuality, WindQuality.Good),
              eq(windConditions.windQuality, WindQuality.Excellent),
            ),
          ),
        );

      // No spots found with good conditions
      if (goodSpotIds.length === 0) {
        return [];
      }

      // Extract spot IDs from the result array
      const spotIdArray = goodSpotIds.map((s) => s.spotId);

      // Get the spots with good conditions
      if (spotIdArray.length === 0) {
        return [];
      }

      // Convert the array to a string of comma-separated IDs
      const spotIdsString = spotIdArray.join(",");

      // Use SQL template literal to safely create the IN clause
      return await db
        .select()
        .from(spots)
        .where(sql`${spots.id} IN (${sql.raw(spotIdsString)})`);
    } catch (error) {
      console.error("Error in getSpotsByMonth:", error);
      // Return all spots as a fallback if there's an issue with filtering by month
      return this.getAllSpots();
    }
  }

  async getSpotWithWindConditions(
    id: number,
  ): Promise<{ spot: Spot; windConditions: WindCondition[] } | undefined> {
    const spot = await this.getSpotById(id);
    if (!spot) return undefined;

    const conditions = await this.getWindConditionsForSpot(id);
    return { spot, windConditions: conditions };
  }

  async searchSpots(query: string): Promise<Spot[]> {
    const searchPattern = `%${query}%`;
    return await db
      .select()
      .from(spots)
      .where(
        or(like(spots.name, searchPattern), like(spots.country, searchPattern)),
      );
  }

  async createSpot(spot: InsertSpot): Promise<Spot> {
    const [newSpot] = await db.insert(spots).values(spot).returning();
    return newSpot;
  }

  // Wind condition operations
  async getWindConditionsForSpot(spotId: number): Promise<WindCondition[]> {
    return await db
      .select()
      .from(windConditions)
      .where(eq(windConditions.spotId, spotId));
  }

  async getWindConditionBySpotAndMonth(
    spotId: number,
    month: number,
  ): Promise<WindCondition | undefined> {
    const results = await db
      .select()
      .from(windConditions)
      .where(
        and(eq(windConditions.spotId, spotId), eq(windConditions.month, month)),
      );

    return results.length ? results[0] : undefined;
  }

  async createWindCondition(
    condition: InsertWindCondition,
  ): Promise<WindCondition> {
    const [newCondition] = await db
      .insert(windConditions)
      .values(condition)
      .returning();
    return newCondition;
  }

  async setupSpotWindConditions(
    spotId: number,
    conditions: InsertWindCondition[],
  ) {
    try {
      for (const condition of conditions) {
        await this.createWindCondition({
          spotId: spotId,
          month: condition.month,
          windQuality: condition.windQuality,
          windSpeed: condition.windSpeed,
          airTemp: condition.airTemp,
          waterTemp: condition.waterTemp,
          seasonalNotes: condition.seasonalNotes,
        });
      }
      console.log(`Wind conditions for ${spotId} created successfully.`);
    } catch (error) {
      console.error(`Error creating wind conditions for ${spotId}:`, error);
      throw error;
    }
  }
  // User operations
  async getUserById(id: number): Promise<User | undefined> {
    const results = await db.select().from(users).where(eq(users.id, id));
    return results.length ? results[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const results = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
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
    const reviewResults = await db
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

    return reviewResults.map((r) => ({
      ...r.review,
      user: r.user,
    }));
  }

  async getReviewByUserAndSpot(
    userId: number,
    spotId: number,
  ): Promise<Review | undefined> {
    const results = await db
      .select()
      .from(reviews)
      .where(and(eq(reviews.userId, userId), eq(reviews.spotId, spotId)));

    return results.length ? results[0] : undefined;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db
      .insert(reviews)
      .values({
        ...review,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newReview;
  }

  async updateReview(id: number, content: string): Promise<Review | undefined> {
    const [updatedReview] = await db
      .update(reviews)
      .set({
        content,
        updatedAt: new Date(),
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
      console.error("Error deleting review:", error);
      return false;
    }
  }

  // Rating operations
  async getRatingsForSpot(spotId: number): Promise<Rating[]> {
    return await db.select().from(ratings).where(eq(ratings.spotId, spotId));
  }

  async getRatingByUserAndSpot(
    userId: number,
    spotId: number,
  ): Promise<Rating | undefined> {
    const results = await db
      .select()
      .from(ratings)
      .where(and(eq(ratings.userId, userId), eq(ratings.spotId, spotId)));

    return results.length ? results[0] : undefined;
  }

  async createRating(rating: InsertRating): Promise<Rating> {
    const [newRating] = await db
      .insert(ratings)
      .values({
        ...rating,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newRating;
  }

  async updateRating(
    id: number,
    ratingUpdate: Partial<InsertRating>,
  ): Promise<Rating | undefined> {
    const [updatedRating] = await db
      .update(ratings)
      .set({
        ...ratingUpdate,
        updatedAt: new Date(),
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
      console.error("Error deleting rating:", error);
      return false;
    }
  }

  // Combined operations
  async getSpotWithReviewsAndRatings(spotId: number): Promise<
    | {
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
      }
    | undefined
  > {
    const spot = await this.getSpotById(spotId);
    if (!spot) return undefined;

    const windConditions = await this.getWindConditionsForSpot(spotId);
    const reviews = await this.getReviewsForSpot(spotId);

    // Calculate rating statistics
    const ratingStats = await db
      .select({
        avg_wind: avg(ratings.windReliability),
        avg_beginner: avg(ratings.beginnerFriendly),
        avg_scenery: avg(ratings.scenery),
        avg_uncrowded: avg(ratings.uncrowded),
        avg_vibe: avg(ratings.localVibe),
        avg_overall: avg(ratings.overall),
        total: count(),
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
      },
    };
  }

  // Recommendation operation - same algorithm as MemStorage
  async getRecommendedSpots(
    preferences: UserPreferences,
  ): Promise<SpotWithMatchScore[]> {
    const allSpots = await this.getAllSpots();
    const month = preferences.month;
    const results: SpotWithMatchScore[] = [];

    for (const spot of allSpots) {
      const windCondition = await this.getWindConditionBySpotAndMonth(
        spot.id,
        month,
      );
      if (!windCondition) continue;

      let score = 0;
      const reasons: string[] = [];

      // Wind speed match
      const windSpeed = windCondition.windSpeed;
      if (
        windSpeed >= preferences.windSpeedMin &&
        windSpeed <= preferences.windSpeedMax
      ) {
        score += 0.25;
        reasons.push(
          `Wind speed (${windSpeed} knots) is within your preferred range`,
        );
      } else {
        const minDistance = Math.min(
          Math.abs(windSpeed - preferences.windSpeedMin),
          Math.abs(windSpeed - preferences.windSpeedMax),
        );

        if (minDistance <= 5) {
          score += 0.15;
          reasons.push(
            `Wind speed (${windSpeed} knots) is close to your preferred range`,
          );
        }
      }

      // Wind quality
      if (windCondition.windQuality === WindQuality.Excellent) {
        score += 0.15;
        reasons.push("Excellent wind quality for this month");
      } else if (windCondition.windQuality === WindQuality.Good) {
        score += 0.1;
        reasons.push("Good wind quality for this month");
      }

      // Temperature preferences
      if (windCondition.airTemp) {
        const temp = windCondition.airTemp;
        let tempMatch = false;

        switch (preferences.temperature) {
          case "cold":
            if (temp < 20) {
              tempMatch = true;
              reasons.push(
                `Cool temperatures (${temp}°C) match your preference`,
              );
            }
            break;
          case "moderate":
            if (temp >= 20 && temp < 25) {
              tempMatch = true;
              reasons.push(
                `Moderate temperatures (${temp}°C) match your preference`,
              );
            }
            break;
          case "warm":
            if (temp >= 25 && temp < 30) {
              tempMatch = true;
              reasons.push(
                `Warm temperatures (${temp}°C) match your preference`,
              );
            }
            break;
          case "hot":
            if (temp >= 30) {
              tempMatch = true;
              reasons.push(
                `Hot temperatures (${temp}°C) match your preference`,
              );
            }
            break;
        }

        if (tempMatch) {
          score += 0.1;
        }
      }

      // Difficulty level match
      if (spot.difficultyLevel) {
        if (
          preferences.difficulty === "all" ||
          spot.difficultyLevel
            .toLowerCase()
            .includes(preferences.difficulty.toLowerCase())
        ) {
          score += 0.1;
          reasons.push(
            `Difficulty level (${spot.difficultyLevel}) matches your skill level`,
          );
        }
      }

      // Budget preferences
      if (spot.averageSchoolCost && spot.averageAccommodationCost) {
        const totalCostPerDay =
          spot.averageSchoolCost + spot.averageAccommodationCost;

        let budgetMatch = false;
        if (preferences.budget === "budget" && totalCostPerDay < 120) {
          budgetMatch = true;
          reasons.push("Budget-friendly pricing fits your preference");
        } else if (
          preferences.budget === "moderate" &&
          totalCostPerDay >= 120 &&
          totalCostPerDay <= 200
        ) {
          budgetMatch = true;
          reasons.push("Moderate pricing fits your preference");
        } else if (preferences.budget === "luxury" && totalCostPerDay > 200) {
          budgetMatch = true;
          reasons.push("Luxury amenities and pricing match your preference");
        }

        if (budgetMatch) {
          score += 0.1;
        }
      }

      // Region preference
      if (preferences.preferredRegion !== "any") {
        const regionCountries =
          this.regions.get(preferences.preferredRegion) || [];
        if (regionCountries.includes(spot.country)) {
          score += 0.1;
          reasons.push(
            `Located in your preferred ${preferences.preferredRegion} region`,
          );
        }
      }

      // Kite schools availability
      if (
        preferences.hasKiteSchools &&
        spot.kiteSchools &&
        spot.kiteSchools.length > 0
      ) {
        score += 0.05;
        reasons.push(
          `Has ${spot.numberOfSchools || spot.kiteSchools.length} kite schools available`,
        );
      }

      // Wave preference
      if (
        preferences.preferWaves &&
        spot.waveSize &&
        (spot.waveSize.toLowerCase().includes("strong") ||
          spot.waveSize.toLowerCase().includes("medium"))
      ) {
        score += 0.05;
        reasons.push(`Offers ${spot.waveSize} waves for riding`);
      } else if (
        !preferences.preferWaves &&
        spot.waveSize &&
        spot.waveSize.toLowerCase().includes("flat")
      ) {
        score += 0.05;
        reasons.push("Offers flat water conditions as preferred");
      }

      // Food options importance
      if (
        preferences.foodOptions &&
        spot.foodOptions &&
        spot.foodOptions.length > 0
      ) {
        score += 0.05;
        reasons.push("Variety of food options are available");
      }

      // Culture/activities importance
      if (preferences.culture && spot.culture) {
        score += 0.05;
        reasons.push("Rich cultural experiences and activities available");
      }

      // Add to results if the score is above minimum threshold
      if (score > 0.3) {
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

    // Return top matches (limited to 8)
    return results.slice(0, 8);
  }
}
