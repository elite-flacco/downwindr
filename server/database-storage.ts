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
        latitude: 19.7496,
        longitude: -70.4125,
        description:
          "Cabarete is a Caribbean hotspot renowned for its consistent trade winds, warm waters, and vibrant kitesurfing community, suitable for all skill levels.",
        waveSize: "Small to Medium",
        tempRange: "25–30°C",
        bestMonths: "June–August",
        tags: ["Kite Schools", "Equipment Rental", "Beachfront Accommodation"],
        difficultyLevel: "Beginner to Intermediate",
        kiteSchools: [
          "Kite Club Cabarete|https://maps.google.com/?q=Kite+Club+Cabarete|4.8|200",
          "Laurel Eastman Kiteboarding|https://maps.google.com/?q=Laurel+Eastman+Kiteboarding|4.9|180",
          "Cabarete Kite Point|https://maps.google.com/?q=Cabarete+Kite+Point|4.7|150",
          "Vela Cabarete|https://maps.google.com/?q=Vela+Cabarete|4.6|120",
          "Gokite Cabarete|https://maps.google.com/?q=Gokite+Cabarete|4.8|100"
        ],
        localAttractions:
          "El Choco National Park, Caves of Cabarete, Nightlife in downtown Cabarete",
        windguruCode: "123456",
        conditions: ["Flat to Choppy Water", "Consistent Trade Winds", "Sandy Bottom"],
        accommodationOptions: [
          "Beachfront Resorts",
          "Boutique Hotels",
          "Vacation Rentals"
        ],
        foodOptions: [
          "Local Dominican Cuisine",
          "Seafood Restaurants",
          "International Dining Options"
        ],
        culture:
          "A blend of Dominican and international cultures with a laid-back beach vibe",
        averageSchoolCost: 65,
        averageAccommodationCost: 85,
        numberOfSchools: 20
      });

      const cabarete_conditions = [
        {
          spotId: cabarete.id,
          month: 1,
          windQuality: WindQuality.Moderate,
          windSpeed: 15,
          airTemp: 27,
          waterTemp: 26,
          seasonalNotes:
            "Winter season with moderate trade winds; suitable for beginners."
        },
        {
          spotId: cabarete.id,
          month: 2,
          windQuality: WindQuality.Moderate,
          windSpeed: 16,
          airTemp: 27,
          waterTemp: 26,
          seasonalNotes:
            "Consistent winds continue; pleasant temperatures for kiting."
        },
        {
          spotId: cabarete.id,
          month: 3,
          windQuality: WindQuality.Good,
          windSpeed: 18,
          airTemp: 28,
          waterTemp: 26,
          seasonalNotes:
            "Spring brings stronger winds; ideal for intermediate kiters."
        },
        {
          spotId: cabarete.id,
          month: 4,
          windQuality: WindQuality.Good,
          windSpeed: 20,
          airTemp: 29,
          waterTemp: 27,
          seasonalNotes:
            "Increasing wind strength; popular time for kitesurfing events."
        },
        {
          spotId: cabarete.id,
          month: 5,
          windQuality: WindQuality.Excellent,
          windSpeed: 22,
          airTemp: 30,
          waterTemp: 28,
          seasonalNotes:
            "Peak kitesurfing season begins; consistent strong trade winds."
        },
        {
          spotId: cabarete.id,
          month: 6,
          windQuality: WindQuality.Excellent,
          windSpeed: 24,
          airTemp: 31,
          waterTemp: 28,
          seasonalNotes:
            "Optimal conditions with steady winds and warm temperatures."
        },
        {
          spotId: cabarete.id,
          month: 7,
          windQuality: WindQuality.Excellent,
          windSpeed: 25,
          airTemp: 31,
          waterTemp: 29,
          seasonalNotes:
            "Strongest winds of the year; ideal for advanced kitesurfers."
        },
        {
          spotId: cabarete.id,
          month: 8,
          windQuality: WindQuality.Excellent,
          windSpeed: 24,
          airTemp: 31,
          waterTemp: 29,
          seasonalNotes:
            "Continued strong winds; vibrant kitesurfing community activities."
        },
        {
          spotId: cabarete.id,
          month: 9,
          windQuality: WindQuality.Good,
          windSpeed: 22,
          airTemp: 30,
          waterTemp: 28,
          seasonalNotes:
            "Winds begin to taper; still favorable conditions for kiting."
        },
        {
          spotId: cabarete.id,
          month: 10,
          windQuality: WindQuality.Good,
          windSpeed: 20,
          airTemp: 29,
          waterTemp: 28,
          seasonalNotes:
            "Autumn season with moderate winds; fewer crowds on the beach."
        },
        {
          spotId: cabarete.id,
          month: 11,
          windQuality: WindQuality.Moderate,
          windSpeed: 18,
          airTemp: 28,
          waterTemp: 27,
          seasonalNotes:
            "Transition period; suitable for beginners and intermediates."
        },
        {
          spotId: cabarete.id,
          month: 12,
          windQuality: WindQuality.Moderate,
          windSpeed: 16,
          airTemp: 27,
          waterTemp: 26,
          seasonalNotes:
            "Mild winds and pleasant temperatures; ideal for learning."
        }
      ];

      // Create wind conditions for Cabarete
      await this.setupSpotWindConditions(cabarete.id, cabarete_conditions);

      // 3. Cumbuco, Brazil
      const cumbuco = await this.createSpot({
        name: "Cumbuco, Brazil",
        country: "Brazil",
        latitude: -3.6186,
        longitude: -38.6936,
        description:
          "Cumbuco is a kitesurfing paradise with consistent trade winds, warm waters, and a variety of conditions suitable for all levels. The nearby Cauipe Lagoon offers flat water ideal for freestyle and beginners.",
        waveSize: "Flat to Medium",
        tempRange: "25–32°C",
        bestMonths: "July–December",
        tags: ["Kite Schools", "Equipment Rental", "Beachfront Accommodation"],
        difficultyLevel: "Beginner to Expert",
        kiteSchools: [
          "Windtown Kite School|https://maps.google.com/?q=Windtown+Kite+School+Cumbuco|4.9|120",
          "Cumbuco Kite Center|https://maps.google.com/?q=Cumbuco+Kite+Center|4.8|110",
          "Vila Coqueiros Kite Center|https://maps.google.com/?q=Vila+Coqueiros+Kite+Center|4.7|95",
          "KSM Kite School Cumbuco|https://maps.google.com/?q=KSM+Kite+School+Cumbuco|4.6|85",
          "Kitepoeira|https://maps.google.com/?q=Kitepoeira+Cumbuco|4.5|70",
        ],
        localAttractions:
          "Cauipe Lagoon, Dune buggy tours, Fortaleza city excursions, Local markets",
        windguruCode: "123456",
        conditions: ["Flat Water Lagoon", "Ocean Waves", "Sandy Bottom"],
        accommodationOptions: [
          "Beachfront Resorts",
          "Boutique Guesthouses",
          "Vacation Rentals",
        ],
        foodOptions: [
          "Seafood Restaurants",
          "Brazilian Steakhouses",
          "Beach Bars",
          "International Cuisine",
        ],
        culture:
          "A vibrant mix of Brazilian culture with local festivals, music, and cuisine",
        averageSchoolCost: 75,
        averageAccommodationCost: 100,
        numberOfSchools: 25,
      });

      // Create wind conditions for Cumbuco
      const cumbuco_conditions = [
        {
          spotId: cumbuco.id,
          month: 1,
          windQuality: WindQuality.Moderate,
          windSpeed: 15,
          airTemp: 30,
          waterTemp: 28,
          seasonalNotes:
            "January offers warm temperatures with moderate winds. Suitable for beginners and those looking for relaxed sessions.",
        },
        {
          spotId: cumbuco.id,
          month: 2,
          windQuality: WindQuality.Moderate,
          windSpeed: 14,
          airTemp: 30,
          waterTemp: 28,
          seasonalNotes:
            "February continues with warm conditions and moderate winds. Occasional rain showers are possible.",
        },
        {
          spotId: cumbuco.id,
          month: 3,
          windQuality: WindQuality.Moderate,
          windSpeed: 13,
          airTemp: 29,
          waterTemp: 27,
          seasonalNotes:
            "March sees slightly stronger winds, making it suitable for intermediate riders.",
        },
        {
          spotId: cumbuco.id,
          month: 4,
          windQuality: WindQuality.Moderate,
          windSpeed: 14,
          airTemp: 28,
          waterTemp: 27,
          seasonalNotes:
            "April marks the beginning of the windier season, with consistent trade winds starting to pick up.",
        },
        {
          spotId: cumbuco.id,
          month: 5,
          windQuality: WindQuality.Good,
          windSpeed: 16,
          airTemp: 27,
          waterTemp: 26,
          seasonalNotes:
            "May offers stronger and steadier trade winds, ideal for all levels of kitesurfers.",
        },
        {
          spotId: cumbuco.id,
          month: 6,
          windQuality: WindQuality.Good,
          windSpeed: 18,
          airTemp: 26,
          waterTemp: 25,
          seasonalNotes:
            "June provides peak wind conditions with slightly cooler temperatures. A wetsuit is optional.",
        },
        {
          spotId: cumbuco.id,
          month: 7,
          windQuality: WindQuality.Excellent,
          windSpeed: 20,
          airTemp: 25,
          waterTemp: 25,
          seasonalNotes:
            "July continues with strong winds and is popular among advanced riders seeking challenging conditions.",
        },
        {
          spotId: cumbuco.id,
          month: 8,
          windQuality: WindQuality.Excellent,
          windSpeed: 22,
          airTemp: 26,
          waterTemp: 26,
          seasonalNotes:
            "August maintains excellent wind conditions, suitable for all skill levels.",
        },
        {
          spotId: cumbuco.id,
          month: 9,
          windQuality: WindQuality.Excellent,
          windSpeed: 24,
          airTemp: 27,
          waterTemp: 27,
          seasonalNotes:
            "September offers consistent winds with slightly warmer temperatures.",
        },
        {
          spotId: cumbuco.id,
          month: 10,
          windQuality: WindQuality.Excellent,
          windSpeed: 23,
          airTemp: 28,
          waterTemp: 28,
          seasonalNotes:
            "October sees a gradual decrease in wind strength but remains favorable for kitesurfing.",
        },
        {
          spotId: cumbuco.id,
          month: 11,
          windQuality: WindQuality.Good,
          windSpeed: 20,
          airTemp: 29,
          waterTemp: 28,
          seasonalNotes:
            "November offers good winds and warmer temperatures, attracting beginners and casual riders.",
        },
        {
          spotId: cumbuco.id,
          month: 12,
          windQuality: WindQuality.Good,
          windSpeed: 18,
          airTemp: 30,
          waterTemp: 28,
          seasonalNotes:
            "December brings warm weather with good winds, suitable for relaxed kitesurfing sessions.",
        },
      ];

      // Create wind conditions for Cumbuco
      await this.setupSpotWindConditions(cumbuco.id, cumbuco_conditions);


      // 4. Le Morne, Mauritius
      const leMorne = await this.createSpot({
        name: "Le Morne, Mauritius",
        country: "Mauritius",
        latitude: -20.4452,
        longitude: 57.3170,
        description:
          "A UNESCO World Heritage site, Le Morne offers world-class kitesurfing with consistent trade winds, warm waters, and a variety of conditions suitable for all levels.",
        waveSize: "Flat to Large",
        tempRange: "22–30°C",
        bestMonths: "May–October",
        tags: ["Kite Schools", "Equipment Rental", "Beachfront Accommodation"],
        difficultyLevel: "Beginner to Expert",
        kiteSchools: [
          "Le Morne Kite School|https://maps.google.com/?q=Le+Morne+Kite+School|5.0|112",
          "ION Club Le Morne|https://maps.google.com/?q=ION+Club+Le+Morne|4.9|98",
          "Son of Kite|https://maps.google.com/?q=Son+of+Kite+Le+Morne|4.8|85",
          "KiteGlobing Mauritius|https://maps.google.com/?q=KiteGlobing+Mauritius|4.7|76",
          "Yoaneye Kite Centre|https://maps.google.com/?q=Yoaneye+Kite+Centre|4.6|65",
        ],
        localAttractions:
          "Le Morne Brabant Mountain, Black River Gorges National Park, Chamarel Waterfall, Seven Coloured Earths",
        windguruCode: "123456",
        conditions: ["Flat Water Lagoon", "Reef Breaks", "Sandy and Coral Bottom"],
        accommodationOptions: [
          "Beachfront Resorts",
          "Boutique Guesthouses",
          "Vacation Rentals",
        ],
        foodOptions: [
          "Seafood Restaurants",
          "Creole Cuisine",
          "Beach Cafés",
          "International Dining",
        ],
        culture:
          "A rich blend of African, French, and Indian influences, reflected in local music, dance, and cuisine",
        averageSchoolCost: 80,
        averageAccommodationCost: 120,
        numberOfSchools: 30,
      });

      // Create wind conditions for Le Morne
      const leMorne_conditions = [
        {
          spotId: leMorne.id,
          month: 1,
          windQuality: WindQuality.Moderate,
          windSpeed: 12,
          airTemp: 28,
          waterTemp: 27,
          seasonalNotes:
            "January offers warm temperatures with lighter winds. Suitable for beginners and those looking for relaxed sessions.",
        },
        {
          spotId: leMorne.id,
          month: 2,
          windQuality: WindQuality.Moderate,
          windSpeed: 13,
          airTemp: 28,
          waterTemp: 27,
          seasonalNotes:
            "February continues with warm conditions and moderate winds. Occasional rain showers are possible.",
        },
        {
          spotId: leMorne.id,
          month: 3,
          windQuality: WindQuality.Moderate,
          windSpeed: 14,
          airTemp: 27,
          waterTemp: 26,
          seasonalNotes:
            "March sees slightly stronger winds, making it suitable for intermediate riders.",
        },
        {
          spotId: leMorne.id,
          month: 4,
          windQuality: WindQuality.Good,
          windSpeed: 16,
          airTemp: 26,
          waterTemp: 25,
          seasonalNotes:
            "April marks the beginning of the windier season, with consistent trade winds starting to pick up.",
        },
        {
          spotId: leMorne.id,
          month: 5,
          windQuality: WindQuality.Excellent,
          windSpeed: 18,
          airTemp: 25,
          waterTemp: 24,
          seasonalNotes:
            "May offers strong and steady trade winds, ideal for all levels of kitesurfers.",
        },
        {
          spotId: leMorne.id,
          month: 6,
          windQuality: WindQuality.Excellent,
          windSpeed: 20,
          airTemp: 24,
          waterTemp: 23,
          seasonalNotes:
            "June provides peak wind conditions with cooler temperatures. A wetsuit is recommended.",
        },
        {
          spotId: leMorne.id,
          month: 7,
          windQuality: WindQuality.Excellent,
          windSpeed: 22,
          airTemp: 23,
          waterTemp: 22,
          seasonalNotes:
            "July continues with strong winds and is popular among advanced riders seeking challenging conditions.",
        },
        {
          spotId: leMorne.id,
          month: 8,
          windQuality: WindQuality.Excellent,
          windSpeed: 21,
          airTemp: 23,
          waterTemp: 22,
          seasonalNotes:
            "August maintains excellent wind conditions, suitable for all skill levels.",
        },
        {
          spotId: leMorne.id,
          month: 9,
          windQuality: WindQuality.Excellent,
          windSpeed: 20,
          airTemp: 24,
          waterTemp: 23,
          seasonalNotes:
            "September offers consistent winds with slightly warmer temperatures.",
        },
        {
          spotId: leMorne.id,
          month: 10,
          windQuality: WindQuality.Good,
          windSpeed: 18,
          airTemp: 25,
          waterTemp: 24,
          seasonalNotes:
            "October sees a gradual decrease in wind strength but remains favorable for kitesurfing.",
        },
        {
          spotId: leMorne.id,
          month: 11,
          windQuality: WindQuality.Moderate,
          windSpeed: 15,
          airTemp: 26,
          waterTemp: 25,
          seasonalNotes:
            "November offers moderate winds and warmer temperatures, attracting beginners and casual riders.",
        },
        {
          spotId: leMorne.id,
          month: 12,
          windQuality: WindQuality.Moderate,
          windSpeed: 13,
          airTemp: 27,
          waterTemp: 26,
          seasonalNotes:
            "December brings warm weather with lighter winds, suitable for relaxed kitesurfing sessions.",
        },
      ];

      // Create wind conditions for Le Morne
      await this.setupSpotWindConditions(leMorne.id, leMorne_conditions);

      // 5. Dakhla, Morocco
      const dakhla = await this.createSpot({
        name: "Dakhla, Morocco",
        country: "Morocco",
        latitude: 23.684,
        longitude: -15.937,
        description:
          "Located in the heart of the Western Sahara, Dakhla offers year-round kitesurfing with consistent winds and flatwater lagoons, making it a paradise for both beginners and advanced riders.",
        waveSize: "Flat to Small",
        tempRange: "18–28°C",
        bestMonths: "April–September",
        tags: ["Kite Schools", "Equipment Rental", "Beachfront Accommodation"],
        difficultyLevel: "Beginner to Advanced",
        kiteSchools: [
          "KBC Dakhla East Lagoon|https://www.kiteboarding-club.com/en/|5.0|150",
          "Ocean Vagabond Dakhla|https://www.oceanvagabond.com/dakhla/|4.9|120",
          "PK25 Dakhla|https://dakhlakitesurfhotels.com/pk25-center/|4.8|110",
          "New Spirit Dakhla|https://kiteboarding-club.com/en/|4.7|95",
          "Kite Club Dakhla|https://kiteboarding-club.com/en/|4.7|90",
          "Dakhla Attitude|https://www.dakhla-attitude.com/|4.6|85",
          "Our Kite House|https://www.ourhabitas.com/caravan-dakhla/our-kite-school/|4.6|80",
          "Dakhla Club & Spa|https://www.dakhla-club.com/|4.5|75",
          "Dakhla Kitesurf World|https://dakhlakiteworld.com/kitesurfing/|4.5|70",
          "Pro Kite Morocco|https://www.prokitemorocco.com/|4.4|65",
        ],
        localAttractions:
          "Dakhla's stunning lagoons, desert landscapes, and vibrant local culture offer a unique experience for visitors. Explore the town's markets, enjoy fresh seafood, and immerse yourself in the serene environment.",
        windguruCode: "165677",
        conditions: ["Flat to Shallow Water", "Consistent Wind", "Sandy Bottom"],
        accommodationOptions: [
          "Beachfront Hotels",
          "Boutique Guesthouses",
          "Kitesurfing Resorts",
          "Vacation Rentals",
        ],
        foodOptions: [
          "Moroccan Cuisine",
          "Seafood Restaurants",
          "Cafés",
          "International Dining",
        ],
        culture:
          "Dakhla blends traditional Sahrawi culture with modern influences, offering a unique fusion of hospitality, music, and cuisine.",
        averageSchoolCost: 60,
        averageAccommodationCost: 80,
        numberOfSchools: 10,
      });

      // Create wind conditions for Dakhla
      const dakhla_conditions = [
        {
          spotId: dakhla.id,
          month: 1,
          windQuality: WindQuality.Moderate,
          windSpeed: 18,
          airTemp: 20,
          waterTemp: 20,
          seasonalNotes:
            "January offers moderate winds with pleasant temperatures, suitable for all levels. Wetsuits are recommended.",
        },
        {
          spotId: dakhla.id,
          month: 2,
          windQuality: WindQuality.Moderate,
          windSpeed: 18,
          airTemp: 20,
          waterTemp: 20,
          seasonalNotes:
            "February continues with moderate winds and comfortable temperatures, ideal for intermediate riders.",
        },
        {
          spotId: dakhla.id,
          month: 3,
          windQuality: WindQuality.Good,
          windSpeed: 20,
          airTemp: 21,
          waterTemp: 21,
          seasonalNotes:
            "March brings consistent winds and warming temperatures, attracting more kitesurfers.",
        },
        {
          spotId: dakhla.id,
          month: 4,
          windQuality: WindQuality.Good,
          windSpeed: 22,
          airTemp: 22,
          waterTemp: 22,
          seasonalNotes:
            "April offers strong winds and warm temperatures, marking the beginning of the peak season.",
        },
        {
          spotId: dakhla.id,
          month: 5,
          windQuality: WindQuality.Excellent,
          windSpeed: 24,
          airTemp: 23,
          waterTemp: 23,
          seasonalNotes:
            "May is one of the best months for kitesurfing with consistent winds and warm waters.",
        },
        {
          spotId: dakhla.id,
          month: 6,
          windQuality: WindQuality.Excellent,
          windSpeed: 25,
          airTemp: 24,
          waterTemp: 24,
          seasonalNotes:
            "June offers ideal conditions with strong winds and warm temperatures, perfect for all levels.",
        },
        {
          spotId: dakhla.id,
          month: 7,
          windQuality: WindQuality.Excellent,
          windSpeed: 26,
          airTemp: 25,
          waterTemp: 25,
          seasonalNotes:
            "July brings consistent strong winds and warm waters, attracting kitesurfers from around the world.",
        },
        {
          spotId: dakhla.id,
          month: 8,
          windQuality: WindQuality.Excellent,
          windSpeed: 27,
          airTemp: 26,
          waterTemp: 26,
          seasonalNotes:
            "August continues with excellent wind conditions and warm temperatures, ideal for kitesurfing.",
        },
        {
          spotId: dakhla.id,
          month: 9,
          windQuality: WindQuality.Good,
          windSpeed: 23,
          airTemp: 24,
          waterTemp: 24,
          seasonalNotes:
            "September offers good wind conditions with comfortable temperatures, suitable for all levels.",
        },
        {
          spotId: dakhla.id,
          month: 10,
          windQuality: WindQuality.Good,
          windSpeed: 21,
          airTemp: 23,
          waterTemp: 23,
          seasonalNotes:
            "October brings moderate winds and warm temperatures, attracting fewer crowds.",
        },
        {
          spotId: dakhla.id,
          month: 11,
          windQuality: WindQuality.Moderate,
          windSpeed: 19,
          airTemp: 21,
          waterTemp: 21,
          seasonalNotes:
            "November offers moderate winds with pleasant temperatures, suitable for all levels.",
        },
        {
          spotId: dakhla.id,
          month: 12,
          windQuality: WindQuality.Moderate,
          windSpeed: 18,
          airTemp: 20,
          waterTemp: 20,
          seasonalNotes:
            "December sees steady winds and mild temperatures, making it a pleasant winter escape for kitesurfers. Ideal for intermediate and advanced riders.",
        },
        ];

      // Create wind conditions for Cabarete
      await this.setupSpotWindConditions(cabarete.id, dakhla_conditions);


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
