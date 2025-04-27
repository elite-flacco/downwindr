import { InsertSpot, InsertWindCondition, WindQuality } from "@shared/schema";

/**
 * Seed data for kitesurfing spots
 * Contains all the necessary information to initialize the database with sample spots
 */

export interface SpotSeedData {
  spot: InsertSpot;
  windConditions: InsertWindCondition[];
}

export const kiteSpotsData: SpotSeedData[] = [
  // 1. Tarifa, Spain
  {
    spot: {
      name: "Tarifa, Spain",
      country: "Spain",
      latitude: 36.0143,
      longitude: -5.6044,
      description:
        "Known as Europe's wind capital, Tarifa offers consistent Levante and Poniente winds, making it ideal for kitesurfers of all levels. Its mix of flat and choppy water, combined with stunning coastal scenery and a vibrant town, make it a year-round destination for kiteboarding.",
      bestMonths: "Apr–Oct",
      tempRange: "20–30°C",
      waveSize: "Small to Medium",
      difficultyLevel: "Beginner to Intermediate",
      localAttractions:
        "Historic Old Town, Castillo de Guzmán el Bueno, Whale-watching in the Strait of Gibraltar, Day trips to Tangier",
      tags: ["Kite Schools", "Equipment Rental", "Beachfront Accommodation"],
      windguruCode: "48772",
      kiteSchools: [
        "Rebels Tarifa Kiteschool|https://maps.google.com/?q=Rebels+Tarifa+Kiteschool|5.0|687",
        "Addict Kite School Tarifa|https://maps.google.com/?q=Addict+Kite+School+Tarifa|5.0|552",
        "Tarifa Max Kitesurf School|https://maps.google.com/?q=Tarifa+Max+Kitesurf+School|5.0|361",
        "Free your Mind|https://maps.google.com/?q=Free+your+Mind+Tarifa|5.0|325",
        "Freeride Tarifa|https://maps.google.com/?q=Freeride+Tarifa|5.0|212",
      ],
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
      averageSchoolCost: 60,
      averageAccommodationCost: 90,
      numberOfSchools: 40,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 18,
        windQuality: WindQuality.Moderate,
        airTemp: 13,
        waterTemp: 16,
        seasonalNotes:
          "Winter brings consistent Levante winds with fewer crowds. Wetsuits are recommended due to cooler temperatures.",
      },
      {
        month: 2,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 13,
        waterTemp: 15,
        seasonalNotes:
          "Continued strong Levante winds. Ideal for experienced kiters seeking reliable wind conditions.",
      },
      {
        month: 3,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 15,
        waterTemp: 16,
        seasonalNotes:
          "Transition to spring with increasing temperatures and consistent wind patterns.",
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 17,
        waterTemp: 17,
        seasonalNotes:
          "Spring offers reliable winds and pleasant temperatures, attracting more kitesurfers.",
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 19,
        waterTemp: 18,
        seasonalNotes:
          "One of the best months for kitesurfing with strong winds and comfortable temperatures.",
      },
      {
        month: 6,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 22,
        waterTemp: 19,
        seasonalNotes:
          "Early summer brings consistent Poniente winds and warmer conditions.",
      },
      {
        month: 7,
        windSpeed: 23,
        windQuality: WindQuality.Good,
        airTemp: 25,
        waterTemp: 21,
        seasonalNotes:
          "Peak summer with strong winds and warm temperatures. Popular among tourists.",
      },
      {
        month: 8,
        windSpeed: 22,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 22,
        seasonalNotes:
          "Continued strong winds and warm conditions. Beaches can be crowded.",
      },
      {
        month: 9,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 21,
        seasonalNotes:
          "Ideal conditions with consistent winds and fewer tourists.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 21,
        waterTemp: 20,
        seasonalNotes:
          "Autumn offers reliable winds and comfortable temperatures.",
      },
      {
        month: 11,
        windSpeed: 19,
        windQuality: WindQuality.Moderate,
        airTemp: 17,
        waterTemp: 18,
        seasonalNotes:
          "Winds remain consistent, but temperatures begin to drop. Wetsuits recommended.",
      },
      {
        month: 12,
        windSpeed: 18,
        windQuality: WindQuality.Moderate,
        airTemp: 14,
        waterTemp: 17,
        seasonalNotes:
          "Winter conditions with strong Levante winds. Ideal for experienced kiters.",
      },
    ],
  },

  // 2. Cabarete, Dominican Republic
  {
    spot: {
      name: "Cabarete, Dominican Republic",
      country: "Dominican Republic",
      latitude: 19.7498, // :contentReference[oaicite:0]{index=0}
      longitude: -70.4083, // :contentReference[oaicite:1]{index=1}
      description:
        "Cabarete is a vibrant beach town on the north coast of the Dominican Republic, renowned as a kiteboarding mecca with consistent trade winds, warm Caribbean waters, and a dynamic watersports culture. Kite Beach, Bozo Beach, and the nearby La Boca lagoon offer varied conditions for all skill levels. The town’s beachfront accommodations, lively nightlife, and mix of Dominican and international cuisine make Cabarete a year-round destination for adventure travelers.",
      bestMonths: "Dec–Aug",
      tempRange: "24–30°C",
      waveSize: "Flat to Medium",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Laguna de Cabarete and La Boca, El Choco National Park Caves, Sosúa Beach, Day trips to Puerto Plata",
      tags: [
        "Kite Schools",
        "Equipment Rental",
        "Beachfront Bars",
        "Nightlife",
      ],
      windguruCode: "139", // :contentReference[oaicite:2]{index=2}
      kiteSchools: [
        "Champion Kite School Cabarete|https://maps.google.com/?q=Champion+Kite+School+Cabarete|4.9|281", // :contentReference[oaicite:3]{index=3}
        "GoKite Cabarete Kiteboarding School|https://maps.google.com/?q=GoKite+Cabarete+Kiteboarding+School|4.9|95", // :contentReference[oaicite:4]{index=4}
        "Laurel Eastman Kiteboarding (LEK)|https://maps.google.com/?q=Laurel+Eastman+Kiteboarding+LEK|5.0|369", // :contentReference[oaicite:5]{index=5}
        "Pro Kite Cabarete|https://maps.google.com/?q=Pro+Kite+Cabarete|5.0|133", // :contentReference[oaicite:6]{index=6}
        "Kite Club Cabarete|https://maps.google.com/?q=Kite+Club+Cabarete|4.7|494", // :contentReference[oaicite:7]{index=7}
      ],
      conditions: [
        "Flat Water Lagoon",
        "Beach Break",
        "Choppy Water",
        "Consistent Trade Winds",
      ],
      accommodationOptions: ["Beachfront Resorts", "Guesthouses", "Apartments"],
      foodOptions: [
        "Seafood Restaurants",
        "Beach Bars",
        "Local Dominican Cuisine",
      ],
      culture:
        "Dominican Caribbean culture with merengue and bachata influences and a vibrant watersports community",
      averageSchoolCost: 63, // :contentReference[oaicite:8]{index=8}
      averageAccommodationCost: 100,
      numberOfSchools: 10, // :contentReference[oaicite:9]{index=9}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 24,
        waterTemp: 26,
        seasonalNotes:
          "Cooler winter months with steady trade winds. Less crowded beaches.",
      },
      {
        month: 2,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 26,
        seasonalNotes:
          "Steady trade winds and comfortable conditions for all levels.",
      },
      {
        month: 3,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 25,
        waterTemp: 26,
        seasonalNotes:
          "Winds build, marking the start of high season. Warm waters.",
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 27,
        seasonalNotes: "Peak wind season starts. Ideal for wind sports.",
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 28,
        seasonalNotes:
          "Superb wind strength with thermal breezes and warm air.",
      },
      {
        month: 6,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "Consistent thermal winds providing excellent kitesurf conditions.",
      },
      {
        month: 7,
        windSpeed: 19,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes: "Strong winds and high-season crowds. Warm and sunny.",
      },
      {
        month: 8,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 29,
        seasonalNotes:
          "Thermal winds with occasional rain showers. Warm waters.",
      },
      {
        month: 9,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 29,
        seasonalNotes:
          "Winds taper slightly, still good conditions. Warm water.",
      },
      {
        month: 10,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 27,
        waterTemp: 29,
        seasonalNotes:
          "Moderate winds and fewer crowds. Pleasant temperatures.",
      },
      {
        month: 11,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 26,
        waterTemp: 28,
        seasonalNotes: "Winds steady but cooling air. Suitable for all levels.",
      },
      {
        month: 12,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 25,
        waterTemp: 27,
        seasonalNotes:
          "Winds consistent, slightly cooler air and water. Festive season.",
      },
    ],
  },

  // 3. Cumbuco, Brazil
  {
    spot: {
      name: "Cumbuco, Brazil",
      country: "Brazil",
      latitude: -3.62778, // :contentReference[oaicite:0]{index=0}
      longitude: -38.72778, // :contentReference[oaicite:1]{index=1}
      description:
        "Cumbuco is a small fishing village on the northeast coast of Brazil, famed as an international kitesurfing mecca thanks to its steady southeast trade winds, golden sand dunes, and nearby flat-water lagoons. The vibrant beach town atmosphere, with beach bars and dune-buggy excursions, makes it perfect for riders of all levels.",
      bestMonths: "June–January",
      tempRange: "26–30°C",
      waveSize: "Flat to Medium",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Cauípe Lagoon, Tabuba Lagoon, Dune Buggy Tours, Fortaleza day-trips",
      tags: [
        "Kite Schools",
        "Equipment Rental",
        "Beach Bars",
        "Dune Buggy Tours",
      ],
      windguruCode: "68535", // :contentReference[oaicite:2]{index=2}
      kiteSchools: [
        "KSM Kite School Cumbuco|https://maps.google.com/?q=KSM+Kite+School+Cumbuco|5.0|642", // :contentReference[oaicite:3]{index=3}
        "Cumbuco Kite Center|https://maps.google.com/?q=Cumbuco+Kite+Center|4.9|523", // :contentReference[oaicite:4]{index=4}
        "Kite School Windtown Cumbuco|https://maps.google.com/?q=Kite+School+Windtown+Cumbuco|4.8|328", // :contentReference[oaicite:5]{index=5}
        "Kiteline Cumbuco|https://maps.google.com/?q=Kiteline+Cumbuco|4.7|214", // :contentReference[oaicite:6]{index=6}
        "Kitepoeira|https://maps.google.com/?q=Kitepoeira+Cumbuco|4.6|153", // :contentReference[oaicite:7]{index=7}
      ],
      conditions: [
        "Flat Water Lagoon",
        "Beach Break",
        "Side-on Shore Wind",
        "Dune Launch Areas",
      ],
      accommodationOptions: ["Beachfront Pousadas", "Hostels", "Apartments"],
      foodOptions: [
        "Beach Bars",
        "Local Brazilian Cuisine",
        "International Cafés",
      ],
      culture:
        "Warm Brazilian hospitality with a laid-back beach-town vibe and vibrant nightlife",
      averageSchoolCost: 40, // USD per hour :contentReference[oaicite:8]{index=8}
      averageAccommodationCost: 35, // USD per night :contentReference[oaicite:9]{index=9}
      numberOfSchools: 12, // :contentReference[oaicite:10]{index=10}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "High wind season with consistent thermal breezes and warm temperatures.",
      },
      {
        month: 2,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes: "Warm, steady winds ideal for all skill levels.",
      },
      {
        month: 3,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes:
          "Winds taper slightly but remain reliable, with very warm water.",
      },
      {
        month: 4,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes:
          "Transition into rainy season; winds are less consistent.",
      },
      {
        month: 5,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 26,
        seasonalNotes: "Lower wind reliability as the rainy season approaches.",
      },
      {
        month: 6,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 26,
        seasonalNotes:
          "Start of peak season with strong, consistent trade winds.", // :contentReference[oaicite:11]{index=11}
      },
      {
        month: 7,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 25,
        seasonalNotes:
          "Peak wind strength and prime conditions for kitesurfing.", // :contentReference[oaicite:12]{index=12}
      },
      {
        month: 8,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 26,
        seasonalNotes:
          "Warm air and water, with the strongest thermal winds of the year.", // :contentReference[oaicite:13]{index=13}
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "High wind season continues, crowds build around the lagoons.", // :contentReference[oaicite:14]{index=14}
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes: "Consistent trade winds and very warm conditions.", // :contentReference[oaicite:15]{index=15}
      },
      {
        month: 11,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes: "Ideal late-season winds with warm, sunny weather.", // :contentReference[oaicite:16]{index=16}
      },
      {
        month: 12,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "Start of peak international season; expect strong breezes and lively beaches.", // :contentReference[oaicite:17]{index=17}
      },
    ],
  },

  // 4. Dakhla, Morocco
  {
    spot: {
      name: "Dakhla, Morocco",
      country: "Morocco",
      latitude: 23.717,
      longitude: -15.95,
      description:
        "Known for its 45-kilometer shallow lagoon and year-round trade winds averaging 15–25 knots, Dakhla is a flatwater paradise for kiteboarders of all levels, framed by desert dunes and the Atlantic Ocean. :contentReference[oaicite:0]{index=0}",
      bestMonths: "Apr–Sep",
      tempRange: "20–30°C",
      waveSize: "Flat",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Duna Blanca, Lassarga wave spot, Porto Rico, El Argoub, Desert camel treks",
      tags: ["Kite Schools", "Equipment Rental", "Lagoon Accommodation"],
      windguruCode: "49318",
      kiteSchools: [
        "KBC Dakhla Kiteschool|https://maps.google.com/?q=KBC+Dakhla+Kiteschool|4.8|168",
        "Pro Kite Morocco|https://maps.google.com/?q=Pro+Kite+Morocco|5.0|126",
      ],
      conditions: ["Flat Water", "Consistent Trade Winds", "Shallow Lagoon"],
      accommodationOptions: [
        "Lagoon-front Bungalows",
        "Desert Camps",
        "Boutique Hotels",
      ],
      foodOptions: ["Moroccan Tagines", "Fresh Seafood", "International Café"],
      culture:
        "Sahrawi and Moroccan heritage with desert-ocean blend, camel festivals and local handicrafts",
      averageSchoolCost: 60,
      averageAccommodationCost: 100,
      numberOfSchools: 12,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 20,
        waterTemp: 21,
        seasonalNotes: "Milder winds and cooler water; wetsuit recommended.",
      },
      {
        month: 2,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 21,
        seasonalNotes: "Winds begin to pick up as spring approaches.",
      },
      {
        month: 3,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 22,
        seasonalNotes: "Reliable trade winds and warming temperatures.",
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 23,
        seasonalNotes: "Start of peak season with strong, steady winds.",
      },
      {
        month: 5,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 24,
        seasonalNotes: "Very strong winds and warm water; ideal conditions.",
      },
      {
        month: 6,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 24,
        seasonalNotes: "Peak wind season with hot temperatures.",
      },
      {
        month: 7,
        windSpeed: 26,
        windQuality: WindQuality.Good,
        airTemp: 32,
        waterTemp: 24,
        seasonalNotes: "Warmest month with slightly gustier winds.",
      },
      {
        month: 8,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 32,
        waterTemp: 25,
        seasonalNotes: "Consistent strong winds and very warm water.",
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 25,
        seasonalNotes: "End of peak season; winds remain strong.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 24,
        seasonalNotes: "Moderating winds and temperatures.",
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Moderate,
        airTemp: 23,
        waterTemp: 23,
        seasonalNotes: "Winds taper off; water still pleasant.",
      },
      {
        month: 12,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 20,
        waterTemp: 22,
        seasonalNotes: "Quieter season with mild conditions.",
      },
    ],
  },

  // 5. El Gouna, Egypt
  {
    spot: {
      name: "El Gouna, Egypt",
      country: "Egypt",
      latitude: 27.39417, // :contentReference[oaicite:0]{index=0}
      longitude: 33.67825, // :contentReference[oaicite:1]{index=1}
      description:
        "A purpose-built Red Sea resort town, El Gouna offers reliable thermal trade winds, warm flat waters and lagoon setups ideal for learners and freestylers alike. Its network of in-town islands, marina bars, and desert adventures makes it a favorite year-round kitesurfing destination.",
      bestMonths: "Apr–Oct",
      tempRange: "20–33°C",
      waveSize: "Flat to Small Chop",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Lagoon flat-water zones, Mangroovy Island, Marina Boulevard, desert buggy tours, scuba diving",
      tags: ["Kite Schools", "Equipment Rental", "Lagoon Beach", "Marina Bars"],
      windguruCode: "25164", // :contentReference[oaicite:2]{index=2}
      kiteSchools: [
        "KBC El Gouna Kitesurf & Wingfoil|https://maps.google.com/?q=KBC+El+Gouna+Kitesurf+%26+Wingfoil|5.0|375", // :contentReference[oaicite:3]{index=3}
        "Kite Family El Gouna|https://maps.google.com/?q=Kite+Family+El+Gouna|5.0|342", // :contentReference[oaicite:4]{index=4}
        "Discovery Kite|https://maps.google.com/?q=Discovery+Kite+El+Gouna|5.0|285", // :contentReference[oaicite:5]{index=5}
        "Momo Kiteboarding|https://maps.google.com/?q=Momo+Kiteboarding+El+Gouna|5.0|98", // :contentReference[oaicite:6]{index=6}
        "Kite El Gouna|https://maps.google.com/?q=Kite+El+Gouna|4.8|120", // :contentReference[oaicite:7]{index=7}
      ],
      conditions: [
        "Flat Water Lagoon",
        "Side-On Shore Wind",
        "Warm Water",
        "Mangroove Channels",
      ],
      accommodationOptions: [
        "Lagoon-Front Hotels",
        "Marina Apartments",
        "Desert Campsite Glamping",
      ],
      foodOptions: [
        "Red Sea Seafood",
        "International Marina Cafés",
        "Egyptian Mezze Bars",
      ],
      culture:
        "Modern Egyptian resort life with Bedouin desert excursions and laid-back Mediterranean vibes",
      averageSchoolCost: 75, // USD per hour (approx. €75/hr) :contentReference[oaicite:8]{index=8}
      averageAccommodationCost: 100,
      numberOfSchools: 8, // based on TripAdvisor’s top 15 list of kitesurfing activities :contentReference[oaicite:9]{index=9}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 23,
        seasonalNotes:
          "Cool winter winds steady at 15–20 knots; quieter beaches.",
      },
      {
        month: 2,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 21,
        waterTemp: 23,
        seasonalNotes:
          "Thermal breezes pick up into the high teens; great for progression.",
      },
      {
        month: 3,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 23,
        waterTemp: 24,
        seasonalNotes:
          "Winds strengthen to 18–22 knots; warming air and water.",
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 25,
        seasonalNotes:
          "Start of peak season—reliable 20+ knots and sunny skies.",
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 26,
        seasonalNotes:
          "Thermal winds of 22–28 knots; perfect flat-water conditions.",
      },
      {
        month: 6,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 32,
        waterTemp: 27,
        seasonalNotes:
          "Hottest month with strong 25+ knot gusts—ideal for freeride.",
      },
      {
        month: 7,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 33,
        waterTemp: 28,
        seasonalNotes:
          "Continued high winds; best conditions for advanced riders.",
      },
      {
        month: 8,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 33,
        waterTemp: 28,
        seasonalNotes:
          "Thermal regime persists; slightly choppier with afternoon gusts.",
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 27,
        seasonalNotes:
          "End of peak—still reliable 20+ knot winds and warm waters.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 26,
        seasonalNotes:
          "Winds ease into the teens; less crowded and still pleasant.",
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 25,
        seasonalNotes:
          "Moderate thermal breezes return; comfortable temperatures.",
      },
      {
        month: 12,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 23,
        waterTemp: 24,
        seasonalNotes:
          "Milder winter winds; great for learners in flat lagoon spots.",
      },
    ],
  },

  // 6. Boracay, Philippines
  {
    spot: {
      name: "Boracay, Philippines",
      country: "Philippines",
      latitude: 11.9674, //
      longitude: 121.9245, //
      description:
        "A world-class kitesurfing destination on the island’s east coast, Boracay’s Bulabog Beach offers shallow turquoise flats, steady Amihan trade winds, and a lively beach-bar scene. With a compact lagoon perfectly suited for learners and freestylers, plus vibrant island nightlife just steps away, Boracay combines perfect wind conditions with tropical resort comforts.",
      bestMonths: "Oct–Apr",
      tempRange: "24–32°C",
      waveSize: "Flat to Small Chop",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "White Beach sunset strolls, Puka Shell Beach, Mount Luho viewpoint, island-hopping boat tours",
      tags: ["Kite Schools", "Equipment Rental", "Beach Bars", "Island Dining"],
      windguruCode: "576", // :contentReference[oaicite:0]{index=0}
      kiteSchools: [
        "Isla Kitesurfing|https://maps.google.com/?q=Isla+Kitesurfing|5.0|340", //
        "Freestyle Academy Kitesurfing|https://maps.google.com/?q=Freestyle+Academy+Kitesurfing|5.0|79", //
        "Boracay Kite Center|https://maps.google.com/?q=Boracay+Kite+Center|4.9|127", //
        "Padayon Kite Center Boracay|https://maps.google.com/?q=Padayon+Kite+Center+Boracay|5.0|240", //
        "Funboard Center Boracay|https://maps.google.com/?q=Funboard+Center+Boracay|4.7|58", //
      ],
      conditions: [
        "Flat Water Lagoon",
        "Side-On Shore Wind",
        "Warm Water",
        "Protected Reef",
      ],
      accommodationOptions: [
        "Beachfront Resorts",
        "Boutique Villas",
        "Guesthouses",
      ],
      foodOptions: [
        "Seafood Shacks",
        "International Cafés",
        "Filipino Diner Stalls",
      ],
      culture:
        "Warm Filipino island hospitality with a mix of local and international influences in music, food, and nightlife",
      averageSchoolCost: 47, // USD per hour (approx. from $94 for 2 h)
      averageAccommodationCost: 100,
      numberOfSchools: 10,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 27,
        seasonalNotes:
          "Peak Amihan season with reliable 15–20 kt northeast winds and clear skies.",
      },
      {
        month: 2,
        windSpeed: 19,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 27,
        seasonalNotes:
          "Strong, steady trade winds offer ideal flat-water conditions for all levels.",
      },
      {
        month: 3,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 28,
        seasonalNotes:
          "Consistent 18–22 kt winds; great for progression and freestyle.",
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "Winds taper slightly but remain suitable; water stays warm.",
      },
      {
        month: 5,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 29,
        seasonalNotes:
          "Transition toward Habagat; winds still reliable for early season.",
      },
      {
        month: 6,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 31,
        waterTemp: 29,
        seasonalNotes:
          "Swing toward southwest monsoon; wind consistency starts to drop.",
      },
      {
        month: 7,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 31,
        waterTemp: 29,
        seasonalNotes:
          "Lower wind reliability; still rideable, but plan around morning lulls.",
      },
      {
        month: 8,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Often light; suited for learners and freestyle in flat lagoons.",
      },
      {
        month: 9,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "Gradual wind increase as Amihan returns; prepare for mid-month shift.",
      },
      {
        month: 10,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "First strong northeast winds of the season kick in—excellent conditions.",
      },
      {
        month: 11,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "Solid early Amihan winds; comfortable air and water temperatures.",
      },
      {
        month: 12,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Peak season approaches; reliable winds and festive island vibe.",
      },
    ],
  },

  // 7. Jericoacoara, Brazil
  {
    spot: {
      name: "Jericoacoara, Brazil",
      country: "Brazil",
      latitude: -2.796403, // :contentReference[oaicite:0]{index=0}
      longitude: -40.514378, // :contentReference[oaicite:1]{index=1}
      description:
        "Jericoacoara, often called Jeri, is a remote fishing village set amid dunes on Brazil’s northeast coast, famed for its consistent trade winds, shallow bays, and world-class downwind runs. Surrounded by the Jericoacoara National Park and dotted with vibrant beach barracas, it offers ideal conditions for learners in the lagoons and thrilling wave spots farther downwind.", // :contentReference[oaicite:2]{index=2}
      bestMonths: "June–January", // :contentReference[oaicite:3]{index=3}
      tempRange: "26–32°C",
      waveSize: "Flat to Medium",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Jericoacoara National Park, Pedra Furada arch, Sunset Dune, Lagoa do Paraíso, Tatajuba downwind",
      tags: [
        "Kite Schools",
        "Equipment Rental",
        "Sand Dunes",
        "Downwind Trips",
      ],
      windguruCode: "743", // :contentReference[oaicite:4]{index=4}
      kiteSchools: [
        "Info Kitesurfschool|https://maps.google.com/?q=Info+Kitesurfschool+Jeri|5.0|1021", // :contentReference[oaicite:5]{index=5}
        "Jerisports Kiteboarding School|https://maps.google.com/?q=Jerisports+Kiteboarding+School|5.0|206", // :contentReference[oaicite:6]{index=6}
        "MH Kiteschool|https://maps.google.com/?q=MH+Kiteschool+Jericoacoara|5.0|289", // :contentReference[oaicite:7]{index=7}
        "Blu Kitesurfing Jericoacoara|https://maps.google.com/?q=Blu+Kitesurfing+Jericoacoara|5.0|155", // :contentReference[oaicite:8]{index=8}
        "Sunset Kiteboarding Jericoacoara|https://maps.google.com/?q=Sunset+Kiteboarding+Jericoacoara|5.0|116", // :contentReference[oaicite:9]{index=9}
      ],
      conditions: ["Flat Water Bay", "Lagoon Kitespots", "Side-Shore Wind"],
      accommodationOptions: [
        "Dune-Backed Pousadas",
        "Beachfront Hostels",
        "Eco Lodges",
      ],
      foodOptions: ["Beach Barracas", "Local Desserts", "Brazilian Seafood"],
      culture:
        "Bohemian beach village ambiance blending local Cearense hospitality with international traveler vibes",
      averageSchoolCost: 50,
      averageAccommodationCost: 80,
      numberOfSchools: 54, // :contentReference[oaicite:10]{index=10}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 9,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "Light winds; great for beginner lessons in the lagoons.",
      },
      {
        month: 2,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes: "Moderate winds picking up; ideal for progression.",
      },
      {
        month: 3,
        windSpeed: 15,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 27,
        seasonalNotes: "Steady trade winds build; warm conditions.",
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 31,
        waterTemp: 28,
        seasonalNotes:
          "Winds strengthen ahead of peak season; perfect for all levels.",
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 32,
        waterTemp: 28,
        seasonalNotes: "Reliable thermal breezes; ideal flat-water kiting.",
      },
      {
        month: 6,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 28,
        seasonalNotes: "Start of wind guarantee season—strong and consistent.", // :contentReference[oaicite:11]{index=11}
      },
      {
        month: 7,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 27,
        seasonalNotes: "Peak wind season with reliable 25+ knot afternoons.", // :contentReference[oaicite:12]{index=12}
      },
      {
        month: 8,
        windSpeed: 28,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes: "Strong thermal winds; perfect for downwinds and waves.", // :contentReference[oaicite:13]{index=13}
      },
      {
        month: 9,
        windSpeed: 30,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes:
          "Highest wind reliability; world-class kiting conditions.", // :contentReference[oaicite:14]{index=14}
      },
      {
        month: 10,
        windSpeed: 28,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes: "Still strong winds; fewer crowds as high season wanes.", // :contentReference[oaicite:15]{index=15}
      },
      {
        month: 11,
        windSpeed: 23,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes: "Winds taper slightly but remain very reliable.", // :contentReference[oaicite:16]{index=16}
      },
      {
        month: 12,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "End of wind season; great conditions before quieter months.", // :contentReference[oaicite:17]{index=17}
      },
    ],
  },

  // 8. Cape Town, South Africa
  {
    spot: {
      name: "Cape Town, South Africa",
      country: "South Africa",
      latitude: -33.92528, // :contentReference[oaicite:6]{index=6}
      longitude: 18.42389, // :contentReference[oaicite:7]{index=7}
      description:
        "Framed by Table Mountain and the iconic Cape Doctor southeaster, Cape Town offers world-class kiting at spots like Kite Beach and Bloubergstrand. The combination of consistent thermal winds, flat and wave-ridden water, plus vibrant city culture makes it a year-round kiteboarding hub.",
      bestMonths: "Nov–Feb",
      tempRange: "13–27.3°C", // :contentReference[oaicite:8]{index=8}
      waveSize: "Flat to Medium",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Table Mountain cableway, V&A Waterfront, Robben Island tours, Cape Point scenic drives",
      tags: ["Kite Schools", "Equipment Rental", "City & Mountain Views"],
      windguruCode: "91", // :contentReference[oaicite:9]{index=9}
      kiteSchools: [
        "Kitesurfschool Capetown|https://maps.google.com/?q=Kitesurfschool+capetown|5.0|652", // :contentReference[oaicite:10]{index=10}
        "SA Kitesurf|https://maps.google.com/?q=SA+Kitesurf|5.0|374", // :contentReference[oaicite:11]{index=11}
        "Board and Kite Africa|https://maps.google.com/?q=Board+and+Kite+Africa|5.0|246", // :contentReference[oaicite:12]{index=12}
        "Kite Lab|https://maps.google.com/?q=Kite+Lab|4.9|128", // :contentReference[oaicite:13]{index=13}
        "High Five Kite Surf School|https://maps.google.com/?q=High+Five+Kite+Surf+School|4.9|164", // :contentReference[oaicite:14]{index=14}
      ],
      conditions: ["Thermal Trade Winds", "Flat Water Lagoon", "Beach Break"],
      accommodationOptions: [
        "Waterfront Hotels",
        "Bloubergstrand Guesthouses",
        "City Apartments",
      ],
      foodOptions: [
        "Seafood at the Waterfront",
        "Cape Malay Cuisine",
        "Craft Breweries",
      ],
      culture:
        "Dynamic mix of modern South African urban life, historic Table Mountain heritage, and vibrant beach-town community",
      averageSchoolCost: 60, // :contentReference[oaicite:15]{index=15}
      averageAccommodationCost: 120,
      numberOfSchools: 12, // :contentReference[oaicite:16]{index=16}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 22,
        seasonalNotes:
          "Peak summer winds often reach 20–25 kt; ideal for freestylers.",
      },
      {
        month: 2,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 22,
        seasonalNotes:
          "Strong Cape Doctor winds in the afternoons; perfect flat-water sessions.",
      },
      {
        month: 3,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 21,
        seasonalNotes: "Late-season warmth with reliable 18–22 kt winds.",
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 19,
        seasonalNotes:
          "Autumn transition sees winds around 15–18 kt; less crowded.",
      },
      {
        month: 5,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 16,
        waterTemp: 17,
        seasonalNotes: "Cooling temperatures; occasional strong southeaster.",
      },
      {
        month: 6,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 13.5,
        waterTemp: 16,
        seasonalNotes:
          "Winter lows with lighter winds; best for sheltered lagoons.",
      },
      {
        month: 7,
        windSpeed: 10,
        windQuality: WindQuality.Moderate,
        airTemp: 13,
        waterTemp: 16,
        seasonalNotes: "Coolest month; wind around 10–12 kt, quieter beaches.",
      },
      {
        month: 8,
        windSpeed: 12,
        windQuality: WindQuality.Good,
        airTemp: 13.4,
        waterTemp: 16,
        seasonalNotes:
          "Late-winter sees thermal winds pick back up to mid-teens.",
      },
      {
        month: 9,
        windSpeed: 15,
        windQuality: WindQuality.Good,
        airTemp: 14.9,
        waterTemp: 17,
        seasonalNotes: "Spring warming; reliable 15–18 kt winds builds.",
      },
      {
        month: 10,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 17.3,
        waterTemp: 18,
        seasonalNotes:
          "October breezes pick up to 18–22 kt; scenic downwind runs.",
      },
      {
        month: 11,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 19,
        waterTemp: 19,
        seasonalNotes: "Pre-summer surge; consistent 20+ kt Cape Doctor.",
      },
      {
        month: 12,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 21.1,
        waterTemp: 20,
        seasonalNotes: "Early summer peak; wind daily from SSE at 22–28 kt.",
      },
    ],
  },

  // 9. Kalpitiya, Sri Lanka
  {
    spot: {
      name: "Kalpitiya, Sri Lanka",
      country: "Sri Lanka",
      latitude: 8.2295281, // :contentReference[oaicite:0]{index=0}
      longitude: 79.7596142, // :contentReference[oaicite:1]{index=1}
      description:
        "A world-class kitesurfing destination on Sri Lanka’s northwest coast, Kalpitiya features a vast shallow lagoon, reliable seasonal winds, and rich coastal wildlife including dolphins and turtles. Its mix of flat-water lagoons and nearby ocean waves, plus eco-lodges and cultural tours into mangroves and Dutch-era forts, make it ideal for kiters of all levels.", // :contentReference[oaicite:2]{index=2}
      bestMonths: "May–Oct (SW monsoon) & Dec–Feb (NE monsoon)", // :contentReference[oaicite:3]{index=3}
      tempRange: "25.5–28.1°C", // :contentReference[oaicite:4]{index=4}
      waveSize: "Flat to Small Chop",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Kalpitiya Lagoon, Dutch Bay, Alankuda dolphin-watching, Wilpattu National Park, mangrove tours",
      tags: [
        "Kite Schools",
        "Eco-Lodges",
        "Wildlife Tours",
        "Lagoon Flatwater",
      ],
      windguruCode: "115722", // :contentReference[oaicite:5]{index=5}
      kiteSchools: [
        "Kite Center Sri Lanka|https://maps.google.com/?q=Kite+Center+Sri+Lanka|5.0|150", // :contentReference[oaicite:6]{index=6}
        "Margarita Kite School Sri Lanka|https://maps.google.com/?q=Margarita+Kite+School+Sri+Lanka|5.0|89", // :contentReference[oaicite:7]{index=7}
        "Surfpoint Srilanka Kite Village|https://maps.google.com/?q=Surfpoint+Srilanka+Kite+Village|5.0|75", // :contentReference[oaicite:8]{index=8}
        "De Silva Kite School|https://maps.google.com/?q=De+Silva+Kite+School+Kalpitiya|5.0|80", // :contentReference[oaicite:9]{index=9}
        "Kitesurfing Lanka Resort|https://maps.google.com/?q=Kitesurfing+Lanka+Resort|5.0|98", // :contentReference[oaicite:10]{index=10}
      ],
      conditions: ["Flat Lagoon", "Side-On Shore Wind", "Warm Water"],
      accommodationOptions: [
        "Eco-Lodges",
        "Beachfront Camps",
        "Boutique Guesthouses",
      ],
      foodOptions: ["Sri Lankan Seafood", "Local Spices", "International Café"],
      culture:
        "Blend of coastal Sinhala heritage, fishing-village life, and eco-tourism initiatives",
      averageSchoolCost: 40, // USD per hour (~€38/hr private lessons) :contentReference[oaicite:11]{index=11}
      averageAccommodationCost: 20, // USD per night (~€15–20) :contentReference[oaicite:12]{index=12}
      numberOfSchools: 25, // approx. 25 kite-focused venues listed online :contentReference[oaicite:13]{index=13}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 25.5,
        waterTemp: 27.5,
        seasonalNotes:
          "Winter NE-monsoon phase brings 15–20 kt winds; warm air and flat lagoon spots.", // :contentReference[oaicite:14]{index=14}
      },
      {
        month: 2,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 26.5,
        waterTemp: 27.8,
        seasonalNotes:
          "Steady NE winds and rising temperatures; ideal for learners.", // :contentReference[oaicite:15]{index=15}
      },
      {
        month: 3,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 27.8,
        waterTemp: 29.0,
        seasonalNotes:
          "Transition to SW monsoon; afternoon breezes pick up around 18 kt.", // :contentReference[oaicite:16]{index=16}
      },
      {
        month: 4,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 28.0,
        waterTemp: 30.1,
        seasonalNotes:
          "Early SW monsoon brings reliable 18–20 kt winds; fewer crowds.", // :contentReference[oaicite:17]{index=17}
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28.1,
        waterTemp: 29.4,
        seasonalNotes:
          "Peak SW monsoon strength 20–25 kt; perfect flatwater conditions.", // :contentReference[oaicite:18]{index=18}
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 27.6,
        waterTemp: 28.3,
        seasonalNotes:
          "Strong thermal breezes of 20–25 kt; kite sizes 7–10 m common.", // :contentReference[oaicite:19]{index=19}
      },
      {
        month: 7,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 27.4,
        waterTemp: 27.5,
        seasonalNotes: "Mid-season peak with 22–27 kt winds; very consistent.", // :contentReference[oaicite:20]{index=20}
      },
      {
        month: 8,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 27.3,
        waterTemp: 27.3,
        seasonalNotes:
          "Lagoons flush with steady SW trade winds; great for all levels.", // :contentReference[oaicite:21]{index=21}
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 27.3,
        waterTemp: 27.7,
        seasonalNotes: "Late SW season winds taper to 20–25 kt; fewer crowds.", // :contentReference[oaicite:22]{index=22}
      },
      {
        month: 10,
        windSpeed: 21,
        windQuality: WindQuality.Good,
        airTemp: 26.7,
        waterTemp: 28.3,
        seasonalNotes:
          "End of SW monsoon; winds around 18–22 kt still reliable.", // :contentReference[oaicite:23]{index=23}
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 26.1,
        waterTemp: 28.6,
        seasonalNotes:
          "Transition month; 15–20 kt breezes return from NE monsoon.", // :contentReference[oaicite:24]{index=24}
      },
      {
        month: 12,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 25.7,
        waterTemp: 28.0,
        seasonalNotes: "Early NE monsoon phase with moderate 15–18 kt winds.", // :contentReference[oaicite:25]{index=25}
      },
    ],
  },

  // 10. Punta San Carlos, Mexico"
  {
    spot: {
      name: "Punta San Carlos, Mexico",
      country: "Mexico",
      latitude: 29.61944,
      longitude: -115.50333,
      description:
        "A remote Baja outpost famous for a world-class long left point wave and steady thermal winds, perfect for wave riding and kitesurfing in an off-grid desert setting.",
      bestMonths: "Mar–May & Sep–Nov",
      tempRange: "17–33°C",
      waveSize: "Medium to Large",
      difficultyLevel: "Intermediate to Advanced",
      localAttractions:
        "Desert dunes, Isla San Pedro Nolasco marine reserve, remote camping & surf camp",
      tags: ["Wave Riding", "Kitesurfing", "Camping", "Off-grid Adventures"],
      windguruCode: "208958",
      kiteSchools: [
        "SoloSports Adventure Holidays|https://maps.google.com/?q=SoloSports+Adventure+Holidays|5.0|29",
      ],
      conditions: [
        "Point Break",
        "Consistent Thermal Winds",
        "Desert Dunes Launch",
      ],
      accommodationOptions: ["Surf Camp Tents", "Basic Cabins"],
      foodOptions: ["Camp Mess Hall", "Self-catered BBQ"],
      culture:
        "Laid-back surf-camp community with an adventurous, off-grid vibe",
      averageSchoolCost: 65,
      averageAccommodationCost: 80,
      numberOfSchools: 1,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 15,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 16,
        seasonalNotes: "Cool winter breezes; quieter camps",
      },
      {
        month: 2,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 15,
        seasonalNotes: "Increasing winds; still cool water",
      },
      {
        month: 3,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 17,
        seasonalNotes: "Start of peak wave & wind season",
      },
      {
        month: 4,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 18,
        seasonalNotes: "Strong south swells; warm air",
      },
      {
        month: 5,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 19,
        seasonalNotes: "Prime conditions; long waves & steady wind",
      },
      {
        month: 6,
        windSpeed: 23,
        windQuality: WindQuality.Good,
        airTemp: 31,
        waterTemp: 20,
        seasonalNotes: "Slight taper but still very reliable",
      },
      {
        month: 7,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 33,
        waterTemp: 21,
        seasonalNotes: "Hot summer months; afternoon onshores",
      },
      {
        month: 8,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 32,
        waterTemp: 23,
        seasonalNotes: "Warm water; occasional calm mornings",
      },
      {
        month: 9,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 23,
        seasonalNotes: "Renewed south swell season; excellent waves",
      },
      {
        month: 10,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 21,
        seasonalNotes: "Steady wind & waves; ideal tie-ins",
      },
      {
        month: 11,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 19,
        seasonalNotes: "End of season; fewer crowds",
      },
      {
        month: 12,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 21,
        waterTemp: 17,
        seasonalNotes: "Cooler temps; quieter vibe",
      },
    ],
  },

  // 11. Guincho, Portugal
  {
    spot: {
      name: "Praia do Guincho, Portugal",
      country: "Portugal",
      latitude: 38.733056,
      longitude: -9.472778,
      description:
        "Praia do Guincho is one of Europe’s premier kitesurfing destinations, famed for its powerful Atlantic swells, consistent north (‘Nortada’) winds in summer and dramatic dunes. Located within the Sintra-Cascais Natural Park, it offers both wave riding and flat-water spots for intermediate to advanced kiters.",
      bestMonths: "May–September",
      tempRange: "14–27°C",
      waveSize: "Medium to Large",
      difficultyLevel: "Intermediate to Advanced",
      localAttractions:
        "Sintra-Cascais Natural Park, Cabo da Roca, Cascais historic center, Boca do Inferno",
      tags: ["Wave Riding", "Nortada Winds", "Protected Park", "Beach Break"],
      windguruCode: "31",
      kiteSchools: [
        // Only schools with more than 25 reviews
        "Kitesurf Adventures|https://maps.google.com/?q=Kitesurf+Adventures|4.5|237",
      ],
      conditions: [
        "Powerful Beach Break",
        "Consistent Nortada",
        "Strong Offshore Currents",
      ],
      accommodationOptions: [
        "Beachside Guesthouses",
        "Cascais Hotels",
        "Sintra Countryside Villas",
      ],
      foodOptions: [
        "Beach Bars (Chiringuitos)",
        "Seafood Restaurants in Cascais",
        "International Cafés",
      ],
      culture:
        "Blend of Portuguese coastal heritage, surf culture, and protected-park ecotourism",
      averageSchoolCost: 80,
      averageAccommodationCost: 120,
      // Total number of kite schools in the Guincho/Cascais area, regardless of review counts
      numberOfSchools: 6,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 25,
        windQuality: WindQuality.Moderate,
        airTemp: 15,
        waterTemp: 15,
        seasonalNotes:
          "Winter south-westerlies; cooler water and less consistent nortada winds.",
      },
      {
        month: 2,
        windSpeed: 26,
        windQuality: WindQuality.Good,
        airTemp: 16,
        waterTemp: 14,
        seasonalNotes:
          "Still cool but with occasional strong nortada gusts in late afternoons.",
      },
      {
        month: 3,
        windSpeed: 27,
        windQuality: WindQuality.Good,
        airTemp: 18,
        waterTemp: 15,
        seasonalNotes:
          "Spring transition; winds build steadily—good for intermediate riders.",
      },
      {
        month: 4,
        windSpeed: 27,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 15,
        seasonalNotes:
          "Winds pick up; wave size moderate—ideal for wave-riding progression.",
      },
      {
        month: 5,
        windSpeed: 29,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 16,
        seasonalNotes:
          "Start of peak nortada season; strong, reliable winds by early afternoon.",
      },
      {
        month: 6,
        windSpeed: 30,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 17,
        seasonalNotes:
          "Midsummer north winds strengthen; kite sizes 7–9 m common.",
      },
      {
        month: 7,
        windSpeed: 34,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 18,
        seasonalNotes:
          "Peak season—daily 20–30 kt nortada; intense waves for experienced riders.",
      },
      {
        month: 8,
        windSpeed: 31,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 19,
        seasonalNotes:
          "Consistent strong winds; popular but still plenty of space on the 800 m beach.",
      },
      {
        month: 9,
        windSpeed: 26,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 19,
        seasonalNotes:
          "Late-season nortada; waves mellow slightly with weaker currents.",
      },
      {
        month: 10,
        windSpeed: 24,
        windQuality: WindQuality.Moderate,
        airTemp: 22,
        waterTemp: 18,
        seasonalNotes:
          "Autumn transition; winds taper off but remain dependable.",
      },
      {
        month: 11,
        windSpeed: 23,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 17,
        seasonalNotes:
          "Increasing swells from Atlantic storms; choppier conditions.",
      },
      {
        month: 12,
        windSpeed: 23,
        windQuality: WindQuality.Moderate,
        airTemp: 15,
        waterTemp: 15,
        seasonalNotes:
          "Cooler temps; occasional nortada days but overall less consistent.",
      },
    ],
  },

  // 12. Lefkada, Greece
  {
    spot: {
      name: "Lefkada, Greece",
      country: "Greece",
      latitude: 38.717, // :contentReference[oaicite:3]{index=3}
      longitude: 20.65, // :contentReference[oaicite:4]{index=4}
      description:
        "Lefkada features a trio of kitesurf spots—Milos Beach, Cleopatra (Wooden Bridge), and Agios Nikolaos—set against dramatic cliffs and turquoise waters. Reliable afternoon thermal winds (‘Maistro’) blow daily in summer, offering flat-water lagoons for learners and long downwind runs for advanced riders.", // :contentReference[oaicite:5]{index=5}
      bestMonths: "May–Sep", // :contentReference[oaicite:6]{index=6}
      tempRange: "20–30°C",
      waveSize: "Flat to Small Chop",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Lefkada Town Old Harbour, Milos Beach Cliffs, Agios Ioannis Castle, Downwind run to Kathisma Beach",
      tags: ["Kite Schools", "Lagoon Flatwater", "Downwind Runs"],
      windguruCode: "35", // :contentReference[oaicite:7]{index=7}
      kiteSchools: [
        "Kite Club IDAS|https://maps.google.com/?q=Kite+Club+IDAS+Lefkada|4.8|136",
        "Kite Club Lefkada|https://maps.google.com/?q=Kite+Club+Lefkada|4.7|89",
        "Cleopatra Kite Resort|https://maps.google.com/?q=Cleopatra+Beach+Kite+Resort|4.9|113",
        "Agios Ioannis Kite Center|https://maps.google.com/?q=Agios+Ioannis+Kitesurf+Center|4.6|58",
        "Vassiliki Kite Club|https://maps.google.com/?q=Vassiliki+Kite+Club|4.5|47",
      ],
      conditions: ["Flat Lagoon", "Side-On Shore Wind", "Choppy Wave Sections"],
      accommodationOptions: [
        "Lagoon-Front Villas",
        "Beach Bungalows",
        "Town Apartments",
      ],
      foodOptions: ["Greek Taverna", "Seafood Mezes", "Beach Bars"],
      culture:
        "Ionian island hospitality, local wine taverns, and lively summer festivals",
      averageSchoolCost: 55, // USD per hour (approx.)
      averageAccommodationCost: 90, // USD per night (approx.)
      numberOfSchools: 8, // All kitesurf schools in the Lefkada area
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 6,
        windQuality: WindQuality.Moderate,
        airTemp: 15,
        waterTemp: 16,
        seasonalNotes:
          "Off-season with sporadic thermal breezes; quieter beaches.",
      },
      {
        month: 2,
        windSpeed: 8,
        windQuality: WindQuality.Moderate,
        airTemp: 15,
        waterTemp: 15,
        seasonalNotes:
          "Building spring thermals; good for early-season sessions.",
      },
      {
        month: 3,
        windSpeed: 12,
        windQuality: WindQuality.Good,
        airTemp: 17,
        waterTemp: 15,
        seasonalNotes:
          "Temperatures rise; more consistent Maistro kicks in by midday.",
      },
      {
        month: 4,
        windSpeed: 15,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 16,
        seasonalNotes:
          "Pre-season wind ramps up; ideal conditions for progression.",
      },
      {
        month: 5,
        windSpeed: 18,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 18,
        seasonalNotes:
          "Start of peak season—daily 15–20 kt winds and warm water.",
      },
      {
        month: 6,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 20,
        seasonalNotes:
          "Strong thermals and flat lagoons; prime kitesurfing conditions.",
      },
      {
        month: 7,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 22,
        seasonalNotes:
          "Hot summer days; reliable 18–22 kt breezes for all levels.",
      },
      {
        month: 8,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 23,
        seasonalNotes:
          "Consistent thermals; slight afternoon chop in wave areas.",
      },
      {
        month: 9,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 22,
        seasonalNotes:
          "Late-season winds taper; still excellent flat-water rides.",
      },
      {
        month: 10,
        windSpeed: 15,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 20,
        seasonalNotes: "Autumn transition; reliable breezes and fewer crowds.",
      },
      {
        month: 11,
        windSpeed: 10,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 18,
        seasonalNotes: "Milder thermals; occasional offshore winds.",
      },
      {
        month: 12,
        windSpeed: 8,
        windQuality: WindQuality.Moderate,
        airTemp: 16,
        waterTemp: 17,
        seasonalNotes: "Quieter season with light afternoon breezes.",
      },
    ],
  },

  // 13. Le Morne, Mauritius
  {
    spot: {
      name: "Le Morne, Mauritius",
      country: "Mauritius",
      latitude: -20.45194, // from Wikipedia :contentReference[oaicite:4]{index=4}
      longitude: 57.32833, // from Wikipedia :contentReference[oaicite:5]{index=5}
      description:
        "The Le Morne peninsula is a UNESCO World Heritage site, featuring a dramatic 556 m basalt monolith and a vast lagoon. Side-on south-east trade winds create perfect flat-water freeride conditions on the lagoon and powerful wave-riding on the reef, attracting kiters of all levels.", // :contentReference[oaicite:6]{index=6}
      bestMonths: "May–October", // peak trade wind season :contentReference[oaicite:7]{index=7}
      tempRange: "22–28°C", // average high temp range :contentReference[oaicite:8]{index=8}
      waveSize: "Flat Lagoon to Reef Breaks",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Le Morne Brabant Mountain, Underwater Waterfall illusion, Kite Lagoon, UNESCO Cultural Landscape",
      tags: [
        "Kite Schools",
        "Heritage Site",
        "Lagoon Flatwater",
        "Wave Riding",
      ],
      windguruCode: "118", // Le Morne spot on Windguru :contentReference[oaicite:9]{index=9}
      kiteSchools: [
        "Airswitch Kitesurfing Mauritius|https://maps.google.com/?q=Airswitch+Kitesurfing+Mauritius|5.0|267", // :contentReference[oaicite:10]{index=10}
        "Le Morne Kite School|https://maps.google.com/?q=Le+Morne+Kite+School|4.9|221", // :contentReference[oaicite:11]{index=11}
        "Ion Club Mauritius|https://maps.google.com/?q=Ion+Club+Mauritius|4.3|49", // :contentReference[oaicite:12]{index=12}
        "Pryde Club Mauritius|https://maps.google.com/?q=Pryde+Club+Mauritius|4.9|75", // :contentReference[oaicite:13]{index=13} :contentReference[oaicite:14]{index=14}
        "Hang Loose Tours|https://maps.google.com/?q=Hang+Loose+Tours+Le+Morne|5.0|32", // :contentReference[oaicite:15]{index=15}
      ],
      conditions: ["Flat Lagoon", "Side-On Shore Wind", "Reef Waves"],
      accommodationOptions: [
        "Beachfront Resorts",
        "Eco-Lodges",
        "Mountain-View Villas",
      ],
      foodOptions: ["Mauritian Creole Cuisine", "Beach Bars", "Fresh Seafood"],
      culture:
        "Mauritian Creole heritage, French colonial influences, onboard cage diving excursions in turquoise lagoons",
      averageSchoolCost: 65, // USD per hour (IKO average) :contentReference[oaicite:16]{index=16}
      averageAccommodationCost: 259, // USD per night (mid-range average) :contentReference[oaicite:17]{index=17}
      numberOfSchools: 15, // total kiting centers in Le Morne area :contentReference[oaicite:18]{index=18}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "Summer with lighter trade winds; warm water; occasional thermal breezes.", // :contentReference[oaicite:19]{index=19}
      },
      {
        month: 2,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes: "Hot and humid; sporadic strong winds for wave riding.", // :contentReference[oaicite:20]{index=20}
      },
      {
        month: 3,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes: "Transition month; winds begin to steady by midday.", // :contentReference[oaicite:21]{index=21}
      },
      {
        month: 4,
        windSpeed: 15,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Start of trade wind season; reliable winds by afternoon.", // :contentReference[oaicite:22]{index=22}
      },
      {
        month: 5,
        windSpeed: 18,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 26,
        seasonalNotes:
          "Peak trade winds; perfect for flat-water freeride sessions.", // :contentReference[oaicite:23]{index=23}
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 25,
        seasonalNotes:
          "Strong consistent winds; wetsuit recommended for early morning rides.", // :contentReference[oaicite:24]{index=24}
      },
      {
        month: 7,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 22,
        waterTemp: 24,
        seasonalNotes:
          "Wind peaks; ideal for experienced riders and wave-riding off the reef.", // :contentReference[oaicite:25]{index=25}
      },
      {
        month: 8,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 22,
        waterTemp: 23,
        seasonalNotes: "Consistent strong breeze; fewer crowds in the lagoon.", // :contentReference[oaicite:26]{index=26}
      },
      {
        month: 9,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 23,
        seasonalNotes:
          "Late-season trade winds taper slightly; still excellent conditions.", // :contentReference[oaicite:27]{index=27}
      },
      {
        month: 10,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 24,
        seasonalNotes:
          "Winds ease but remain dependable; great flatwater blasts.", // :contentReference[oaicite:28]{index=28}
      },
      {
        month: 11,
        windSpeed: 15,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 25,
        seasonalNotes:
          "Pre-summer transition; a mix of thermals and residual trade winds.", // :contentReference[oaicite:29]{index=29}
      },
      {
        month: 12,
        windSpeed: 14,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Warm with lighter winds; ideal for wave-riding and lagoon cruising.", // :contentReference[oaicite:30]{index=30}
      },
    ],
  },

  // 14. Mui Ne, Vietnam
  {
    spot: {
      name: "Mui Ne, Vietnam",
      country: "Vietnam",
      latitude: 10.933, // :contentReference[oaicite:8]{index=8}
      longitude: 108.283, // :contentReference[oaicite:9]{index=9}
      description:
        "A former fishing village turned Asia’s kiteboarding capital, Mui Ne features a long sandy bay, reliable northeast monsoon winds from November to April, and warm tropical waters ideal for learners and freestylers.",
      bestMonths: "Nov–Apr",
      tempRange: "25–29°C", // :contentReference[oaicite:10]{index=10}
      waveSize: "Flat to Medium Chop",
      difficultyLevel: "Beginner to Intermediate",
      localAttractions:
        "Red & White Sand Dunes, Fairy Stream (Suoi Tien), Tà Cú Mountain",
      tags: ["Kite Schools", "Equipment Rental", "Beach Camps", "Sand Dunes"],
      windguruCode: "206923", // :contentReference[oaicite:11]{index=11}
      kiteSchools: [
        "C2Sky Kitesurfing Vietnam|https://maps.google.com/?q=C2Sky+Kitesurfing+Vietnam|5.0|310", // :contentReference[oaicite:12]{index=12}
        "Vietnam Kiteboarding School|https://maps.google.com/?q=Vietnam+Kiteboarding+School|5.0|129", // :contentReference[oaicite:13]{index=13}
        "MANTA Sail Training Centre|https://maps.google.com/?q=MANTA+Sail+Training+Centre|5.0|60", // :contentReference[oaicite:14]{index=14}
        "Jibe's Beach Club|https://maps.google.com/?q=Jibes+Beach+Club|5.0|176", // :contentReference[oaicite:15]{index=15}
        "Africa Surf & Kite Test Center|https://maps.google.com/?q=Africa+Surf+%26+Kite+Test+Center|5.0|57", // :contentReference[oaicite:16]{index=16}
      ],
      conditions: [
        "Flat to Choppy Water",
        "Onshore Cross Winds",
        "Sandy Bottom",
      ],
      accommodationOptions: [
        "Beachfront Resorts",
        "Budget Guesthouses",
        "Homestays",
      ],
      foodOptions: [
        "Seafood Restaurants",
        "Vietnamese Street Food",
        "Beach BBQ",
      ],
      culture:
        "Vietnamese coastal fishing-village charm blended with modern resort development and Cham heritage",
      averageSchoolCost: 50, // :contentReference[oaicite:17]{index=17}
      averageAccommodationCost: 40, // :contentReference[oaicite:18]{index=18}
      numberOfSchools: 15, // :contentReference[oaicite:19]{index=19}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 24.8,
        waterTemp: 26,
        seasonalNotes: "Winter NE winds; warm water and clear skies.",
      },
      {
        month: 2,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 25.4,
        waterTemp: 26,
        seasonalNotes: "Strong, steady thermals; peak season.",
      },
      {
        month: 3,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 26.6,
        waterTemp: 27,
        seasonalNotes: "Consistent high winds; ideal for freestylers.",
      },
      {
        month: 4,
        windSpeed: 22,
        windQuality: WindQuality.Good,
        airTemp: 28.1,
        waterTemp: 28,
        seasonalNotes: "Trade winds easing slightly; still excellent.",
      },
      {
        month: 5,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 28.6,
        waterTemp: 29,
        seasonalNotes: "Start of SW season; lighter breezes for beginners.",
      },
      {
        month: 6,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 27.8,
        waterTemp: 29,
        seasonalNotes: "Gentle southwest winds; occasional gusts.",
      },
      {
        month: 7,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 27.1,
        waterTemp: 29,
        seasonalNotes: "Light winds; best for flat-water kits.",
      },
      {
        month: 8,
        windSpeed: 10,
        windQuality: WindQuality.Moderate,
        airTemp: 27.0,
        waterTemp: 29,
        seasonalNotes: "Quiet month; some afternoon thermals.",
      },
      {
        month: 9,
        windSpeed: 12,
        windQuality: WindQuality.Good,
        airTemp: 27.0,
        waterTemp: 29,
        seasonalNotes: "Transition to NE season; wind picking up.",
      },
      {
        month: 10,
        windSpeed: 14,
        windQuality: WindQuality.Good,
        airTemp: 26.9,
        waterTemp: 28,
        seasonalNotes: "First strong NE winds arrive.",
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Moderate,
        airTemp: 26.4,
        waterTemp: 27,
        seasonalNotes: "NE monsoon strengthening; fewer crowds.",
      },
      {
        month: 12,
        windSpeed: 20,
        windQuality: WindQuality.Moderate,
        airTemp: 25.5,
        waterTemp: 26,
        seasonalNotes: "Peak season returns; reliable winds.",
      },
    ],
  },

  // 15. Lo Stagnone, Sicily
  {
    spot: {
      name: "Lo Stagnone, Sicily",
      country: "Italy",
      latitude: 37.86,
      longitude: 12.47,
      description:
        "Lo Stagnone Lagoon, near Marsala on Sicily’s west coast, is one of Europe's premier kitesurfing destinations. The expansive, shallow lagoon offers flat waters ideal for beginners and freestylers alike. Protected by surrounding islands, it ensures safe and consistent conditions.",
      bestMonths: "April–October",
      tempRange: "18–30°C",
      waveSize: "Flat",
      difficultyLevel: "Beginner to Intermediate",
      localAttractions:
        "Salt pans of Marsala, Mozia Island archaeological site, Egadi Islands, Erice hilltop town",
      tags: ["Kite Schools", "Flatwater", "Thermal Winds", "Shallow Lagoon"],
      windguruCode: "206923",
      kiteSchools: [
        "Kite Lab Sicily|https://maps.google.com/?q=Kite+Lab+Sicily|5.0|310",
        "Flow Kite School|https://maps.google.com/?q=Flow+Kite+School|4.9|129",
        "No Limits Kitesurfing|https://maps.google.com/?q=No+Limits+Kitesurfing|5.0|60",
        "Duotone Pro Center Sicily|https://maps.google.com/?q=Duotone+Pro+Center+Sicily|4.9|176",
        "KBC Sicily|https://maps.google.com/?q=KBC+Sicily|5.0|57",
      ],
      conditions: ["Flatwater", "Thermal Winds", "Shallow Lagoon"],
      accommodationOptions: [
        "Beachfront Resorts",
        "Guesthouses",
        "Agriturismos",
      ],
      foodOptions: [
        "Sicilian Cuisine",
        "Seafood Restaurants",
        "Local Wineries",
      ],
      culture:
        "Rich in history with nearby archaeological sites, traditional Sicilian villages, and renowned local wines.",
      averageSchoolCost: 50,
      averageAccommodationCost: 80,
      numberOfSchools: 15,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 12,
        windQuality: "Moderate",
        airTemp: 15,
        waterTemp: 14,
        seasonalNotes: "Off-season with variable winds; cooler temperatures.",
      },
      {
        month: 2,
        windSpeed: 13,
        windQuality: "Moderate",
        airTemp: 16,
        waterTemp: 14,
        seasonalNotes: "Increasing wind consistency; still cool conditions.",
      },
      {
        month: 3,
        windSpeed: 15,
        windQuality: "Good",
        airTemp: 18,
        waterTemp: 15,
        seasonalNotes:
          "Start of thermal winds; suitable for early-season riders.",
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: "Good",
        airTemp: 20,
        waterTemp: 17,
        seasonalNotes: "Reliable thermals begin; comfortable temperatures.",
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: "Excellent",
        airTemp: 24,
        waterTemp: 20,
        seasonalNotes:
          "Peak season starts; consistent winds and warm conditions.",
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: "Excellent",
        airTemp: 28,
        waterTemp: 23,
        seasonalNotes: "Strong thermals; ideal for all skill levels.",
      },
      {
        month: 7,
        windSpeed: 20,
        windQuality: "Excellent",
        airTemp: 30,
        waterTemp: 25,
        seasonalNotes: "Warmest month; steady winds and vibrant atmosphere.",
      },
      {
        month: 8,
        windSpeed: 18,
        windQuality: "Good",
        airTemp: 30,
        waterTemp: 26,
        seasonalNotes: "High temperatures; slightly lighter winds.",
      },
      {
        month: 9,
        windSpeed: 17,
        windQuality: "Good",
        airTemp: 27,
        waterTemp: 24,
        seasonalNotes: "Thermals persist; fewer crowds.",
      },
      {
        month: 10,
        windSpeed: 15,
        windQuality: "Moderate",
        airTemp: 23,
        waterTemp: 22,
        seasonalNotes: "Season winds down; pleasant conditions.",
      },
      {
        month: 11,
        windSpeed: 13,
        windQuality: "Moderate",
        airTemp: 18,
        waterTemp: 18,
        seasonalNotes: "Off-season begins; variable winds.",
      },
      {
        month: 12,
        windSpeed: 12,
        windQuality: "Moderate",
        airTemp: 16,
        waterTemp: 15,
        seasonalNotes: "Cooler temperatures; less consistent winds.",
      },
    ],
  },

  // 16. Leucate, France
  {
    spot: {
      name: "Leucate, France",
      country: "France",
      latitude: 42.9105, // :contentReference[oaicite:0]{index=0}
      longitude: 3.0294, // :contentReference[oaicite:1]{index=1}
      description:
        "Leucate is one of France’s premier kitesurfing destinations, famed for its 300+ days of Tramontane wind, flat-water lagoon of the Étang de Leucate, and powerful beach break on the Mediterranean coast.", // :contentReference[oaicite:2]{index=2}
      bestMonths: "April–October", // :contentReference[oaicite:3]{index=3}
      tempRange: "7–29°C", // :contentReference[oaicite:4]{index=4}
      waveSize: "Flat to Medium Breaks",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Mondial du Vent international kitesurf competition, Étang de Leucate lagoon, Cap Leucate cliffs & lighthouse, Salses‐Leucate salt pans", // :contentReference[oaicite:5]{index=5}
      tags: ["Tramontane Winds", "Flatwater", "Lagoon", "Wave Riding"],
      windguruCode: "258", // :contentReference[oaicite:6]{index=6}
      kiteSchools: [
        "Unikite Leucate|https://maps.google.com/?q=Unikite+Leucate|4.5|2627", // :contentReference[oaicite:7]{index=7}
        "Chinook École de Kitesurf|https://maps.google.com/?q=Chinook+École+de+Kitesurf+Leucate|4.8|60", // :contentReference[oaicite:8]{index=8}
        "Kite Surf Leucate KSL|https://maps.google.com/?q=Kite+Surf+Leucate+KSL|4.5|237", // :contentReference[oaicite:9]{index=9}
        "Adrenaline Direct Wind|https://maps.google.com/?q=Adrenaline+Direct+Wind+Leucate|4.6|87", // :contentReference[oaicite:10]{index=10}
        "Skyclub|https://maps.google.com/?q=Skyclub+Leucate|4.4|53", // :contentReference[oaicite:11]{index=11}
      ],
      conditions: ["Flatwater Lagoon", "Consistent Tramontane", "Beach Break"],
      accommodationOptions: [
        "Beachfront Hotels",
        "Lagoon-side Campgrounds",
        "Country Guesthouses",
      ],
      foodOptions: ["Seafood Restaurants", "Beach Bars", "Local Wineries"],
      culture:
        "French Mediterranean coastal lifestyle with wind-sport heritage and UNESCO-listed salt-marsh landscapes",
      averageSchoolCost: 30, // USD per hour (approx. €105/4 hr) :contentReference[oaicite:12]{index=12}
      averageAccommodationCost: 72, // USD per night (weeknight average) :contentReference[oaicite:13]{index=13}
      numberOfSchools: 8, // total kitesurf operators in the area :contentReference[oaicite:14]{index=14}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 16, // knots (18.9 mph →16 kt) :contentReference[oaicite:15]{index=15}
        windQuality: WindQuality.Moderate,
        airTemp: 8, // avg high/low 11/5 °C →8 °C :contentReference[oaicite:16]{index=16}
        waterTemp: 13, // avg water 13 °C :contentReference[oaicite:17]{index=17}
        seasonalNotes:
          "Cool winter Tramontane; safer flat-water sessions in the lagoon.",
      },
      {
        month: 2,
        windSpeed: 17, // knots (19.4 mph →17 kt) :contentReference[oaicite:18]{index=18}
        windQuality: WindQuality.Good,
        airTemp: 9, // (13+5)/2 °C :contentReference[oaicite:19]{index=19}
        waterTemp: 11.5, // average 11.5 °C :contentReference[oaicite:20]{index=20}
        seasonalNotes: "Building thermals; lagoon runs ideal for beginners.",
      },
      {
        month: 3,
        windSpeed: 18, // average Tramontane build :contentReference[oaicite:21]{index=21}
        windQuality: WindQuality.Good,
        airTemp: 11, // (15+7)/2 °C :contentReference[oaicite:22]{index=22}
        waterTemp: 12.5, // average 12.5 °C :contentReference[oaicite:23]{index=23}
        seasonalNotes:
          "Spring thermals begin by mid-day; perfect for progression.",
      },
      {
        month: 4,
        windSpeed: 20, // Tramontane 15–25 kt peak season :contentReference[oaicite:24]{index=24}
        windQuality: WindQuality.Excellent,
        airTemp: 13.5, // (18+9)/2 °C :contentReference[oaicite:25]{index=25}
        waterTemp: 14.5, // average 14.5 °C :contentReference[oaicite:26]{index=26}
        seasonalNotes:
          "Reliable winds from early afternoon; warm spring conditions.",
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 17, // (21+13)/2 °C :contentReference[oaicite:27]{index=27}
        waterTemp: 17, // average 17 °C :contentReference[oaicite:28]{index=28}
        seasonalNotes:
          "Peak season begins—long lagoon runs and gentle wave riding.",
      },
      {
        month: 6,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 21.5, // (26+17)/2 °C :contentReference[oaicite:29]{index=29}
        waterTemp: 20, // average 20 °C :contentReference[oaicite:30]{index=30}
        seasonalNotes:
          "Strong midsummer Tramontane; reef-break conditions for advanced riders.",
      },
      {
        month: 7,
        windSpeed: 26,
        windQuality: WindQuality.Excellent,
        airTemp: 24, // (29+19)/2 °C :contentReference[oaicite:31]{index=31}
        waterTemp: 23, // average 23 °C :contentReference[oaicite:32]{index=32}
        seasonalNotes:
          "Hottest month; consistent 20–30 kt winds off the beach.",
      },
      {
        month: 8,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 24.5, // (29+20)/2 °C :contentReference[oaicite:33]{index=33}
        waterTemp: 22.5, // average 22.5 °C :contentReference[oaicite:34]{index=34}
        seasonalNotes:
          "Busy but spacious 800 m beach; afternoon onshore winds.",
      },
      {
        month: 9,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 21, // (25+17)/2 °C :contentReference[oaicite:35]{index=35}
        waterTemp: 21.5, // average 21.5 °C :contentReference[oaicite:36]{index=36}
        seasonalNotes:
          "Late-season thermals; slightly calmer lagoon conditions.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 17, // (21+13)/2 °C :contentReference[oaicite:37]{index=37}
        waterTemp: 20.5, // average 20.5 °C :contentReference[oaicite:38]{index=38}
        seasonalNotes:
          "Autumn transition; dependable winds and mild temperatures.",
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 12.5, // (16+9)/2 °C :contentReference[oaicite:39]{index=39}
        waterTemp: 17.5, // average 17.5 °C :contentReference[oaicite:40]{index=40}
        seasonalNotes: "Tramontane eases; good for wave-riding off the reef.",
      },
      {
        month: 12,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 9.5, // (13+6)/2 °C :contentReference[oaicite:41]{index=41}
        waterTemp: 13.5, // average 13.5 °C :contentReference[oaicite:42]{index=42}
        seasonalNotes:
          "Cooler winter days; lagoon still protected for safe learning.",
      },
    ],
  },

  // 17. Porto Pollo, Sardinia
  {
    spot: {
      name: "Porto Pollo, Italy",
      country: "Italy",
      latitude: 41.18444, // :contentReference[oaicite:2]{index=2}
      longitude: 9.32417, // :contentReference[oaicite:3]{index=3}
      description:
        "A wind-surfing and kitesurfing mecca on Sardinia’s northern shore, Porto Pollo offers flat-water bays, strong Mistral winds, and a sheltered lagoon ideal for all levels.", // :contentReference[oaicite:4]{index=4}
      bestMonths: "Apr–Oct",
      tempRange: "14–28°C", // :contentReference[oaicite:5]{index=5}
      waveSize: "Flat to Small Chop",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Isola dei Gabbiani (L’Isuledda), Baia di Levante & Ponente, Palau historic center", // :contentReference[oaicite:6]{index=6}
      tags: ["Kite Schools", "Flatwater Bays", "Mistral Winds"],
      windguruCode: "49162", // :contentReference[oaicite:7]{index=7}
      kiteSchools: [
        "FH Academy|https://maps.google.com/?q=FH+Academy+Porto+Pollo|5.0|165", // :contentReference[oaicite:8]{index=8}
        "Wind Windsurf Porto Pollo|https://maps.google.com/?q=Wind+Windsurf+Porto+Pollo|3.5|58", // :contentReference[oaicite:9]{index=9}
        "Pollo Diving ASD|https://maps.google.com/?q=Pollo+Diving+ASD|4.8|38", // :contentReference[oaicite:10]{index=10}
        "PKS Sardegna|https://maps.google.com/?q=PKS+Sardegna|5.0|30", // :contentReference[oaicite:11]{index=11}
        "MB Pro Center|https://maps.google.com/?q=MB+Pro+Center+Porto+Pollo|4.7|45", // :contentReference[oaicite:12]{index=12}
      ],
      conditions: [
        "Side-On Shore Wind",
        "Flat Lagoon Bays",
        "Choppy Outer Bay",
      ],
      accommodationOptions: [
        "Beachfront Guesthouses",
        "Barrabisa Villas",
        "Palau B&Bs",
      ],
      foodOptions: ["Seafood Trattorie", "Beach Bars", "Italian Gelaterie"],
      culture:
        "Laid-back Sardinian fishing-village vibe with strong wind-sports heritage",
      averageSchoolCost: 65, // USD per hour :contentReference[oaicite:13]{index=13}
      averageAccommodationCost: 100, // USD per night (approx.)
      numberOfSchools: 6, // all local water-sports centers
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 14,
        waterTemp: 14,
        seasonalNotes: "Cool winter Mistral winds; lagoon sessions safest.",
      },
      {
        month: 2,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 15,
        waterTemp: 13,
        seasonalNotes: "Building spring thermals; flat-water bays favored.",
      },
      {
        month: 3,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 17,
        waterTemp: 14,
        seasonalNotes: "Reliable 18–22 kt winds by midday.",
      },
      {
        month: 4,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 20,
        waterTemp: 15,
        seasonalNotes: "Start of peak season—daily 20+ kt Mistral.",
      },
      {
        month: 5,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 17,
        seasonalNotes: "Strong thermals; prime flat-water freeride.",
      },
      {
        month: 6,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 19,
        seasonalNotes: "Summer breezes ease slightly; plenty of space.",
      },
      {
        month: 7,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 22,
        seasonalNotes: "Warmer air & water; afternoon sea breezes.",
      },
      {
        month: 8,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 24,
        seasonalNotes: "Gentler winds; ideal for beginners.",
      },
      {
        month: 9,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 23,
        seasonalNotes: "End of season thermals return.",
      },
      {
        month: 10,
        windSpeed: 21,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 21,
        seasonalNotes: "Autumn Mistral picks up; fewer crowds.",
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 18,
        seasonalNotes: "Cooling temperatures; intermittent winds.",
      },
      {
        month: 12,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 15,
        waterTemp: 16,
        seasonalNotes: "Quieter winter lagoon conditions.",
      },
    ],
  },

  // Maui, Hawaii, USA
  {
    spot: {
      name: "Maui, USA",
      country: "United States",
      latitude: 20.8, // :contentReference[oaicite:0]{index=0}
      longitude: -156.3333, // :contentReference[oaicite:1]{index=1}
      description:
        "Famed for its reliable tradewinds funneling through the West Maui Mountains, Maui offers world-class kitesurfing at Kanaha Beach Park and beyond, with flat to choppy water suited to all levels.", // :contentReference[oaicite:2]{index=2}
      bestMonths: "Apr–Oct",
      tempRange: "24–31°C", // :contentReference[oaicite:3]{index=3}
      waveSize: "Flat to Small Chop",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Road to Hana, Haleakalā National Park, Lahaina Historic District, Molokini Crater snorkel trips", // :contentReference[oaicite:4]{index=4}
      tags: ["Kite Schools", "Tradewinds", "Kanaha Beach"],
      windguruCode: "92740", // :contentReference[oaicite:5]{index=5}
      kiteSchools: [
        "Kiteboarding School of Maui|https://maps.google.com/?q=Kiteboarding+School+of+Maui|5.0|148", // :contentReference[oaicite:6]{index=6}
        "Maui Kiteboarding Lessons by Aqua Sports Maui|https://maps.google.com/?q=Maui+Kiteboarding+Lessons+by+Aqua+Sports+Maui|5.0|85", // :contentReference[oaicite:7]{index=7}
      ],
      conditions: [
        "Side-On Shore Wind",
        "Flat Lagoon Bays",
        "Choppy Outer Channels",
      ],
      accommodationOptions: [
        "3-star Hotels ($300–600/night)",
        "Vacation Rentals",
        "Beachfront Resorts",
      ], // :contentReference[oaicite:8]{index=8}
      foodOptions: [
        "Poke Bowls",
        "Farm-to-Table Hawaiian Cuisine",
        "Beach Bars",
      ],
      culture:
        "A blend of Native Hawaiian, Polynesian, and surfer town vibes, with lu‘au feasts and hula shows", // :contentReference[oaicite:9]{index=9}
      averageSchoolCost: 115, // USD per hour :contentReference[oaicite:10]{index=10}
      averageAccommodationCost: 450, // USD per night :contentReference[oaicite:11]{index=11}
      numberOfSchools: 15, // :contentReference[oaicite:12]{index=12}
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 10, // 11.7 mph ≈10 kt :contentReference[oaicite:13]{index=13}
        windQuality: WindQuality.Moderate,
        airTemp: 26, // 79°F :contentReference[oaicite:14]{index=14}
        waterTemp: 24.6, // :contentReference[oaicite:15]{index=15}
        seasonalNotes: "Cool winter tradewinds; fewer crowds.", // :contentReference[oaicite:16]{index=16}
      },
      {
        month: 2,
        windSpeed: 11, // 12.5 mph ≈11 kt :contentReference[oaicite:17]{index=17}
        windQuality: WindQuality.Moderate,
        airTemp: 26, // 79°F :contentReference[oaicite:18]{index=18}
        waterTemp: 24.2, // :contentReference[oaicite:19]{index=19}
        seasonalNotes: "Late winter winds remain steady; water still cool.", // :contentReference[oaicite:20]{index=20}
      },
      {
        month: 3,
        windSpeed: 12, // 14.0 mph ≈12 kt :contentReference[oaicite:21]{index=21}
        windQuality: WindQuality.Good,
        airTemp: 26, // 79°F :contentReference[oaicite:22]{index=22}
        waterTemp: 24.1, // :contentReference[oaicite:23]{index=23}
        seasonalNotes: "Spring trade winds strengthen; warming water.", // :contentReference[oaicite:24]{index=24}
      },
      {
        month: 4,
        windSpeed: 13, // 15.0 mph ≈13 kt :contentReference[oaicite:25]{index=25}
        windQuality: WindQuality.Good,
        airTemp: 28, // 82°F :contentReference[oaicite:26]{index=26}
        waterTemp: 24.4, // :contentReference[oaicite:27]{index=27}
        seasonalNotes: "Start of peak season—consistent spring breezes.", // :contentReference[oaicite:28]{index=28}
      },
      {
        month: 5,
        windSpeed: 12, // 14.0 mph ≈12 kt :contentReference[oaicite:29]{index=29}
        windQuality: WindQuality.Good,
        airTemp: 29, // 84°F :contentReference[oaicite:30]{index=30}
        waterTemp: 24.9, // :contentReference[oaicite:31]{index=31}
        seasonalNotes: "Warm air & water; ideal freeride conditions.", // :contentReference[oaicite:32]{index=32}
      },
      {
        month: 6,
        windSpeed: 14, // 15.5 mph ≈14 kt :contentReference[oaicite:33]{index=33}
        windQuality: WindQuality.Excellent,
        airTemp: 30, // 86°F :contentReference[oaicite:34]{index=34}
        waterTemp: 25.4, // :contentReference[oaicite:35]{index=35}
        seasonalNotes: "Early summer thermals; strong midday winds.", // :contentReference[oaicite:36]{index=36}
      },
      {
        month: 7,
        windSpeed: 14, // 15.9 mph ≈14 kt :contentReference[oaicite:37]{index=37}
        windQuality: WindQuality.Excellent,
        airTemp: 31, // 88°F :contentReference[oaicite:38]{index=38}
        waterTemp: 25.9, // :contentReference[oaicite:39]{index=39}
        seasonalNotes: "Peak summer winds; warmest conditions.", // :contentReference[oaicite:40]{index=40}
      },
      {
        month: 8,
        windSpeed: 13, // 15.2 mph ≈13 kt :contentReference[oaicite:41]{index=41}
        windQuality: WindQuality.Good,
        airTemp: 31, // 88°F :contentReference[oaicite:42]{index=42}
        waterTemp: 26.3, // :contentReference[oaicite:43]{index=43}
        seasonalNotes: "Warm seas; slightly lighter trade winds.", // :contentReference[oaicite:44]{index=44}
      },
      {
        month: 9,
        windSpeed: 12, // 13.7 mph ≈12 kt :contentReference[oaicite:45]{index=45}
        windQuality: WindQuality.Good,
        airTemp: 30, // 85°F :contentReference[oaicite:46]{index=46}
        waterTemp: 26.7, // :contentReference[oaicite:47]{index=47}
        seasonalNotes: "Late summer thermals return; fewer crowds.", // :contentReference[oaicite:48]{index=48}
      },
      {
        month: 10,
        windSpeed: 12, // 13.3 mph ≈12 kt :contentReference[oaicite:49]{index=49}
        windQuality: WindQuality.Good,
        airTemp: 29, // 84°F :contentReference[oaicite:50]{index=50}
        waterTemp: 26.7, // :contentReference[oaicite:51]{index=51}
        seasonalNotes: "Autumn winds steady; pleasant temperatures.", // :contentReference[oaicite:52]{index=52}
      },
      {
        month: 11,
        windSpeed: 12, // 14.1 mph ≈12 kt :contentReference[oaicite:53]{index=53}
        windQuality: WindQuality.Good,
        airTemp: 28, // 82°F :contentReference[oaicite:54]{index=54}
        waterTemp: 26.1, // :contentReference[oaicite:55]{index=55}
        seasonalNotes: "Early winter trade winds; mild crowds.", // :contentReference[oaicite:56]{index=56}
      },
      {
        month: 12,
        windSpeed: 11, // 13.2 mph ≈11 kt :contentReference[oaicite:57]{index=57}
        windQuality: WindQuality.Moderate,
        airTemp: 26, // 79°F :contentReference[oaicite:58]{index=58}
        waterTemp: 25.1, // :contentReference[oaicite:59]{index=59}
        seasonalNotes: "Quiet winter lagoon sessions; moderate winds.", // :contentReference[oaicite:60]{index=60}
      },
    ],
  },
];
