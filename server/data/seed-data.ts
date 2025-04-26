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
      numberOfSchools: 15,
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
      latitude: 8.2375,
      longitude: 79.7564,
      description:
        "Kalpitiya is a quiet peninsula on Sri Lanka’s northwest coast that has become a kitesurfing hotspot thanks to its reliable winds, warm waters, and diverse conditions. The main lagoon offers flat water ideal for beginners and freestylers, while nearby spots like Vella Island provide pristine conditions for advanced riders.",
      bestMonths: "May-Sep, Dec-Mar",
      tempRange: "26–32°C",
      waveSize: "Flat in lagoons, small chop on ocean side",
      difficultyLevel: "All levels",
      localAttractions:
        "Dolphin watching, Wilpattu National Park safaris, temple visits",
      tags: ["Flatwater", "Remote", "Consistent Wind", "Warm Water"],
      windguruCode: "190458",
      kiteSchools: [
        "KiteCenter Sri Lanka|https://maps.google.com/?q=KiteCenter+Sri+Lanka",
        "Kite Surfing Lanka|https://maps.google.com/?q=Kite+Surfing+Lanka",
        "Ruuk Village Kite School|https://maps.google.com/?q=Ruuk+Village+Kalpitiya",
        "Sri Lanka Kite|https://maps.google.com/?q=Sri+Lanka+Kite",
        "Sun Wind Beach Kite School|https://maps.google.com/?q=Sun+Wind+Beach+Kalpitiya",
      ],
      conditions: [
        "Flatwater Lagoons",
        "Side-onshore Trade Winds",
        "Ocean Swells (optional)",
      ],
      accommodationOptions: [
        "Eco-lodges",
        "Beach Cabins",
        "Kite Camps",
        "Local Guesthouses",
      ],
      foodOptions: [
        "Sri Lankan Curry",
        "Seafood BBQs",
        "Vegetarian Cafes",
        "Kite Camp Dining",
      ],
      culture:
        "Kalpitiya has a small fishing village vibe mixed with growing eco-tourism. Expect a relaxed pace, warm hospitality, and a tight-knit kite community.",
      averageSchoolCost: 55,
      averageAccommodationCost: 60,
      numberOfSchools: 5,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Start of the winter season with lighter winds, good for beginners and foiling.",
      },
      {
        month: 2,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Consistent thermal winds. One of the most relaxed months to kite with few crowds.",
      },
      {
        month: 3,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 31,
        waterTemp: 29,
        seasonalNotes:
          "End of the winter season with fading winds. Still kitable most days.",
      },
      {
        month: 4,
        windSpeed: 12,
        windQuality: WindQuality.Poor,
        airTemp: 32,
        waterTemp: 30,
        seasonalNotes:
          "Hot and humid with low wind. Not a great month for kiting in Kalpitiya.",
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 29,
        seasonalNotes:
          "Kickoff of the main season. Strong side-onshore winds blow daily through the month.",
      },
      {
        month: 6,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Prime month with strong, reliable winds and consistent flatwater conditions.",
      },
      {
        month: 7,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "High season in full force. Ideal for advanced tricks and island downwinders.",
      },
      {
        month: 8,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "Still epic wind and relatively few crowds. Vella Island is often at its best.",
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Late-season conditions still strong and reliable. Good time to visit before the monsoon.",
      },
      {
        month: 10,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Winds begin to taper. Sessions still possible but not daily.",
      },
      {
        month: 11,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Low wind transition month. Some foiling and occasional thermal wind days.",
      },
      {
        month: 12,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Start of the winter season with light to moderate winds. Great for beginners and relaxed vibes.",
      },
    ],
  },

  // 10. Punta San Carlos, Mexico"
  {
    spot: {
      name: "Punta San Carlos, Mexico",
      country: "Mexico",
      latitude: 29.6983,
      longitude: -115.5274,
      description:
        "A remote Baja California gem, Punta San Carlos is world-renowned for its powerful Pacific swells and steady wind, drawing advanced wave riders and wind junkies alike. This rugged and off-grid destination offers epic down-the-line riding in a breathtaking desert-meets-ocean setting.",
      bestMonths: "Apr–Sep",
      tempRange: "17–28°C",
      waveSize: "1–3m (can exceed 4m during big swell)",
      difficultyLevel: "Intermediate to Advanced",
      localAttractions: "Surfing, mountain biking, desert camping, star gazing",
      tags: ["wave riding", "remote", "advanced", "camping"],
      windguruCode: "157",
      kiteSchools: [
        "SoloSports Adventure Holidays|https://maps.google.com/?q=SoloSports+Adventure+Holidays+Punta+San+Carlos|4.9|56",
      ],
      conditions: ["Pacific Swell", "Side-Offshore Winds", "Rocky Shoreline"],
      accommodationOptions: ["On-site camps (SoloSports)", "Van camping"],
      foodOptions: ["Camp kitchens", "BYO supplies"],
      culture:
        "Off-grid adventure culture with a tight-knit kite and surf community",
      averageSchoolCost: 110,
      averageAccommodationCost: 120,
      numberOfSchools: 1,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 16,
        seasonalNotes:
          "Cooler temps and lighter winds make this month less reliable, though swell still rolls in.",
      },
      {
        month: 2,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 15,
        seasonalNotes:
          "Early springtime brings longer days and building swell, but wind remains hit or miss.",
      },
      {
        month: 3,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 19,
        waterTemp: 16,
        seasonalNotes:
          "Winds start turning on more consistently, with excellent surf potential.",
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 21,
        waterTemp: 17,
        seasonalNotes:
          "Kicking off the prime season — strong winds and excellent down-the-line wave conditions.",
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 18,
        seasonalNotes:
          "Consistent wind, warm days, and classic Baja swell setups. Camps fill up fast.",
      },
      {
        month: 6,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 19,
        seasonalNotes:
          "Peak season continues with daily rides and epic waves. Bring your wave kite.",
      },
      {
        month: 7,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 20,
        seasonalNotes:
          "Strong thermals and solid SSW swell keep sessions reliable and long-lasting.",
      },
      {
        month: 8,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 21,
        seasonalNotes:
          "Endless rides continue with lighter crowds and warm water. Sunset sessions are gold.",
      },
      {
        month: 9,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 21,
        seasonalNotes:
          "Conditions still solid, though wind begins to taper later in the month.",
      },
      {
        month: 10,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 20,
        seasonalNotes:
          "End of the prime season with occasional sessions and leftover south swells.",
      },
      {
        month: 11,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 21,
        waterTemp: 18,
        seasonalNotes:
          "Shoulder season with mixed results. Good for surf trips with a kite on standby.",
      },
      {
        month: 12,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 19,
        waterTemp: 17,
        seasonalNotes:
          "Calm winds and cooler temps make this off-season, though still stunning for adventure camping.",
      },
    ],
  },

  // 11. Guincho, Portugal
  {
    spot: {
      name: "Guincho, Portugal",
      country: "Portugal",
      latitude: 38.7312,
      longitude: -9.4722,
      description:
        "Located near Lisbon, Guincho is a world-renowned spot for strong Atlantic winds and waves. Nestled in the Estoril coast within the Sintra-Cascais Natural Park (a UNESCO World Heritage Site), it features a beautiful wide beach with powerful shore break. Popular among advanced riders and wave lovers, the spot is known for its thermal 'Nortada' winds that can reach extreme intensities in the afternoons.",
      bestMonths: "May–September",
      tempRange: "17–28°C",
      waveSize: "1–3m",
      difficultyLevel: "Intermediate to Advanced",
      localAttractions:
        "Cascais old town, Sintra castles and palaces, Lisbon nightlife, Sintra-Cascais Natural Park hiking trails",
      tags: ["wave", "strong wind", "Atlantic", "thermal winds", "shore break"],
      windguruCode: "116",
      kiteSchools: [
        "Gustykite|https://maps.google.com/?q=Gustykite+Guincho|4.9|89",
        "Kite Adventures|https://maps.google.com/?q=Kite+Adventures+Guincho|4.8|76",
        "SBKiteboarding School|https://maps.google.com/?q=SBKiteboarding+School+Guincho|5.0|5",
        "Nortada Aventura|https://maps.google.com/?q=Nortada+Aventura+Kitesurf+Guincho|4.7|62",
        "Ocean Adventure|https://maps.google.com/?q=Ocean+Adventure+Guincho|4.8|54",
      ],
      conditions: [
        "Atlantic Swell",
        "Sandy Beach with Rocks",
        "Cross-shore Wind",
        "Shore Break",
        "Strong Thermal Effects",
      ],
      accommodationOptions: [
        "Beach Hotels",
        "Surf Hostels",
        "Boutique Guesthouses",
        "Vacation Rentals in Cascais",
      ],
      foodOptions: [
        "Portuguese Seafood",
        "Tapas Bars",
        "Local Bakeries",
        "Beach Restaurants",
      ],
      culture:
        "Portuguese coastal culture with rich history and laid-back surf vibes",
      averageSchoolCost: 85,
      averageAccommodationCost: 100,
      numberOfSchools: 7,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 15,
        waterTemp: 15,
        seasonalNotes:
          "Off-season. Wind is less reliable but still rideable on good days.",
      },
      {
        month: 2,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 16,
        waterTemp: 15,
        seasonalNotes:
          "Cool temps with chance of Atlantic storms bringing strong gusts.",
      },
      {
        month: 3,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 17,
        waterTemp: 16,
        seasonalNotes:
          "Spring begins with gradually improving wind consistency.",
      },
      {
        month: 4,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 19,
        waterTemp: 17,
        seasonalNotes:
          "Reliable winds start kicking in. Conditions improve steadily.",
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 21,
        waterTemp: 18,
        seasonalNotes: "Beginning of peak season with thermal winds and waves.",
      },
      {
        month: 6,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 19,
        seasonalNotes: "Strongest and most consistent winds of the year.",
      },
      {
        month: 7,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 20,
        seasonalNotes:
          "Peak kitesurfing season with strong northerlies and clean waves.",
      },
      {
        month: 8,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 20,
        seasonalNotes: "Continued strong winds with warm water. Busy season.",
      },
      {
        month: 9,
        windSpeed: 21,
        windQuality: WindQuality.Good,
        airTemp: 25,
        waterTemp: 20,
        seasonalNotes: "Season starts winding down but still great conditions.",
      },
      {
        month: 10,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 19,
        seasonalNotes: "Mellow vibes, still ridable winds and fewer crowds.",
      },
      {
        month: 11,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 17,
        seasonalNotes: "Wind becomes less predictable. Wetsuits needed.",
      },
      {
        month: 12,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 16,
        waterTemp: 16,
        seasonalNotes: "Off-season but possible sessions when storms roll in.",
      },
    ],
  },

  // 12. Lefkada, Greece
  {
    spot: {
      name: "Lefkada, Greece",
      country: "Greece",
      latitude: 38.7069,
      longitude: 20.64,
      description:
        "Lefkada is a stunning Ionian island with several kite beaches like Agios Nikolaos and Milos Beach, offering flat to choppy conditions and thermal winds. Ideal for summer sessions.",
      bestMonths: "May–September",
      tempRange: "22–32°C",
      waveSize: "Flat to Choppy",
      difficultyLevel: "All levels",
      localAttractions: "Lefkada Town, Porto Katsiki Beach, island hopping",
      tags: ["thermal winds", "crystal water", "scenic"],
      windguruCode: "498",
      kiteSchools: [
        "Lefkada Kite Center|https://maps.google.com/?q=Lefkada+Kite+Center|4.9|136",
        "Surf Club Lefkada|https://maps.google.com/?q=Surf+Club+Lefkada|4.8|101",
      ],
      conditions: ["Thermal Winds", "Flat Water", "Chop"],
      accommodationOptions: ["Beach Villas", "Apartments", "Kite Hotels"],
      foodOptions: ["Greek Taverns", "Beach Bars", "Seafood Restaurants"],
      culture:
        "Greek island lifestyle with relaxed vibes and strong hospitality",
      averageSchoolCost: 70,
      averageAccommodationCost: 95,
      numberOfSchools: 4,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 13,
        waterTemp: 15,
        seasonalNotes:
          "Winter with weak wind and cooler temps. Not recommended.",
      },
      {
        month: 2,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 14,
        waterTemp: 15,
        seasonalNotes:
          "Light winds continue. Early season kiters may find some days.",
      },
      {
        month: 3,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 16,
        waterTemp: 16,
        seasonalNotes: "Season slowly begins with occasional thermals.",
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 18,
        waterTemp: 17,
        seasonalNotes:
          "Thermal winds becoming more consistent. Great for early season trips.",
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 21,
        waterTemp: 19,
        seasonalNotes:
          "Reliable thermal winds, warm weather, and flat water. Peak season starts.",
      },
      {
        month: 6,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 22,
        seasonalNotes:
          "Ideal kiting with strong thermals and lively beach scene.",
      },
      {
        month: 7,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 24,
        seasonalNotes:
          "Prime conditions for all levels. Consistent thermal winds daily.",
      },
      {
        month: 8,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 25,
        seasonalNotes:
          "Still excellent conditions. Slightly more crowded beaches.",
      },
      {
        month: 9,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 24,
        seasonalNotes: "Great winds and fewer crowds. Excellent time to visit.",
      },
      {
        month: 10,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 22,
        seasonalNotes:
          "Thermals begin fading. Still kitable with good planning.",
      },
      {
        month: 11,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 20,
        seasonalNotes: "Unpredictable wind. Off-season for most kiters.",
      },
      {
        month: 12,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 14,
        waterTemp: 17,
        seasonalNotes: "Low wind and chilly. Not ideal for kiting.",
      },
    ],
  },

  // 13. Le Morne, Mauritius
  {
    spot: {
      name: "Le Morne, Mauritius",
      country: "Mauritius",
      latitude: -20.4562,
      longitude: 57.3082,
      description:
        "Located on the southwest peninsula of Mauritius, Le Morne offers world-class kitesurfing with a massive shallow lagoon, flat water areas, and access to legendary wave spots including the famous One Eye wave. Protected by coral reefs and backed by the majestic Le Morne Brabant mountain (UNESCO World Heritage Site).",
      bestMonths: "May-October",
      tempRange: "20-32°C",
      waveSize: "Flat to Large",
      difficultyLevel: "All Levels",
      localAttractions:
        "Le Morne Brabant mountain hiking, dolphin watching, Black River Gorges National Park, Seven Colored Earths of Chamarel",
      tags: [
        "flat water",
        "world-class waves",
        "reliable wind",
        "shallow lagoon",
        "tropical",
      ],
      windguruCode: "48",
      kiteSchools: [
        "Le Morne Kite School|https://maps.google.com/?q=Le+Morne+Kite+School|4.9|128",
        "Airswitch Kitesurfing Mauritius|https://maps.google.com/?q=Airswitch+Kitesurfing+Mauritius|4.8|242",
        "ION Club Le Morne|https://maps.google.com/?q=ION+Club+Le+Morne|4.7|165",
        "Kite Camp Mauritius|https://maps.google.com/?q=Kite+Camp+Mauritius|4.8|95",
        "Hang Loose Tours|https://maps.google.com/?q=Hang+Loose+Tours+Mauritius|4.7|82",
      ],
      conditions: [
        "Shallow Lagoon",
        "Flat Water",
        "World-Class Waves",
        "Coral Reef",
      ],
      accommodationOptions: [
        "Luxury Beachfront Resorts",
        "Guesthouses in La Gaulette",
        "Vacation Rentals",
        "Kite Camps",
      ],
      foodOptions: [
        "Mauritian Creole Cuisine",
        "Seafood Restaurants",
        "Indian Food",
        "Beach Bars",
        "Resort Dining",
      ],
      culture:
        "Vibrant multicultural blend of Creole, French, Indian and Chinese influences with multiple languages spoken throughout the island",
      averageSchoolCost: 70,
      averageAccommodationCost: 95,
      numberOfSchools: 10,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Summer season with lighter but consistent thermal winds. Less crowded beaches.",
      },
      {
        month: 2,
        windSpeed: 15,
        windQuality: WindQuality.Poor,
        airTemp: 30,
        waterTemp: 29,
        seasonalNotes:
          "Hottest month with inconsistent winds. Occasional rain and potential cyclone risk.",
      },
      {
        month: 3,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "End of summer with improving conditions. Light thermal winds beginning to establish.",
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Start of winter season with trade winds beginning. Conditions improving steadily.",
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 25,
        waterTemp: 26,
        seasonalNotes:
          "Trade winds becoming more reliable with comfortable temperatures.",
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 24,
        seasonalNotes:
          "Consistent strong southeast trade winds. Perfect conditions with fewer tourists.",
      },
      {
        month: 7,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 22,
        waterTemp: 23,
        seasonalNotes:
          "Peak wind season with strongest and most reliable winds. Can reach 35 knots on some days.",
      },
      {
        month: 8,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 22,
        waterTemp: 23,
        seasonalNotes:
          "Continued excellent conditions with strong trade winds. Good wave conditions.",
      },
      {
        month: 9,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 23,
        seasonalNotes:
          "Strong reliable winds continue with best wave conditions. Great for wave riders.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 25,
        waterTemp: 24,
        seasonalNotes:
          "End of peak season but still reliable winds and good conditions.",
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 25,
        seasonalNotes:
          "Transition to summer with gradually decreasing wind reliability but still good sessions possible.",
      },
      {
        month: 12,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes:
          "Beginning of summer with lighter thermal winds. Less consistent but still rideable on good days.",
      },
    ],
  },

  // 14. Mui Ne, Vietnam
  {
    spot: {
      name: "Mui Ne, Vietnam",
      country: "Vietnam",
      latitude: 10.9326,
      longitude: 108.2893,
      description:
        "Once a small fishing village, Mui Ne has become one of Southeast Asia's premier kitesurfing destinations with an average of 230 windy days per year. The area features a mix of flat water conditions in the mornings and chop/small waves in the afternoons, perfect for riders of all levels. The nearby red and white sand dunes create thermal effects that amplify wind conditions.",
      bestMonths: "Nov-Mar",
      tempRange: "22-30°C",
      waveSize: "Small to Medium",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "Red Sand Dunes, White Sand Dunes, Fairy Stream, Mui Ne Fishing Village, Ta Cu Mountain, Poshanu Cham Towers",
      tags: [
        "budget friendly",
        "consistent wind",
        "thermal winds",
        "beach break",
        "warm water",
      ],
      windguruCode: "523",
      kiteSchools: [
        "C2Sky Kitecenter|https://maps.google.com/?q=C2Sky+Kitecenter+Mui+Ne|4.9|256",
        "Vietnam Kiteboarding School (VKS)|https://maps.google.com/?q=Vietnam+Kiteboarding+School+Mui+Ne|4.8|210",
        "Mui Ne Kitesurf School|https://maps.google.com/?q=Mui+Ne+Kitesurf+School|4.8|175",
        "Surfpoint Vietnam|https://maps.google.com/?q=Surfpoint+Vietnam+Mui+Ne|4.7|124",
        "KiteVietnam School|https://maps.google.com/?q=KiteVietnam+School+Mui+Ne|4.7|95",
      ],
      conditions: [
        "Side-shore Winds",
        "Morning Flat Water",
        "Afternoon Chop",
        "Shore Break",
        "Sandy Bottom",
      ],
      accommodationOptions: [
        "Beachfront Resorts",
        "Budget Guesthouses",
        "Boutique Hotels",
        "Hostels",
      ],
      foodOptions: [
        "Vietnamese Cuisine",
        "Seafood Restaurants",
        "International Dining",
        "Street Food",
        "Beach Bars",
      ],
      culture:
        "Blend of traditional Vietnamese fishing culture and growing international tourism scene with Russian and European influences",
      averageSchoolCost: 45,
      averageAccommodationCost: 40,
      numberOfSchools: 8,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 25,
        seasonalNotes:
          "Peak season with strong, reliable Northeast monsoon winds. Perfect conditions for all levels.",
      },
      {
        month: 2,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 25,
        seasonalNotes:
          "One of the best months with consistent strong winds (18-25 knots) and comfortable temperatures.",
      },
      {
        month: 3,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 26,
        seasonalNotes:
          "End of high season with still reliable winds. Less crowded beaches and excellent conditions.",
      },
      {
        month: 4,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 27,
        seasonalNotes:
          "Transition month with decreasing winds. Morning sessions best before afternoon thermal winds.",
      },
      {
        month: 5,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Beginning of summer season with lighter southerly winds. Good for beginners and foiling.",
      },
      {
        month: 6,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Summer season with consistent but lighter winds (10-14 knots). Afternoon thermal winds provide good sessions.",
      },
      {
        month: 7,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "Summer season continues with reliable afternoon thermal winds. Good for larger kites and beginners.",
      },
      {
        month: 8,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "Similar conditions to July with afternoon thermal winds. Less crowded than winter months.",
      },
      {
        month: 9,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "Last month of summer season with gradually improving wind conditions.",
      },
      {
        month: 10,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Transition to winter season with increasing Northeast winds. Good conditions with fewer tourists.",
      },
      {
        month: 11,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 26,
        seasonalNotes:
          "Start of high season with strong Northeast monsoon winds. Excellent kitesurfing conditions beginning.",
      },
      {
        month: 12,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 25,
        seasonalNotes:
          "High season with strong, consistent winds. Perfect conditions but beaches can be crowded.",
      },
    ],
  },

  // 15. Lo Stagnone, Sicily
  {
    spot: {
      name: "Lo Stagnone, Sicily",
      country: "Italy",
      latitude: 37.8033,
      longitude: 12.4389,
      description:
        "Lo Stagnone in Marsala, Sicily is widely considered one of Europe's premier kitesurfing destinations. This vast, shallow lagoon offers perfect flat water conditions with consistent thermal winds, making it ideal for both beginners and advanced riders. The knee to waist-deep water allows for easy learning and practicing of freestyle tricks in a safe environment. Located just minutes from Trapani-Birgi Airport, this nature reserve combines perfect kitesurfing conditions with stunning Sicilian landscapes, historic sites, and Mediterranean culture.",
      bestMonths: "Mar-Nov",
      tempRange: "18-30°C",
      waveSize: "Flat",
      difficultyLevel: "All Levels (Perfect for Beginners)",
      localAttractions:
        "Marsala historic center, Trapani, Egadi Islands, Salt pans, Sicilian wine tasting, Erice medieval town, Segesta archaeological site",
      tags: [
        "shallow water",
        "flat water",
        "thermal winds",
        "lagoon",
        "beginner friendly",
      ],
      windguruCode: "257",
      kiteSchools: [
        "Follow The Wind Kitesurf Sicily|https://maps.google.com/?q=Follow+The+Wind+Kitesurf+Sicily|4.9|187",
        "Flow Kite School Sicily|https://maps.google.com/?q=Flow+Kite+School+Sicily|4.8|164",
        "Sicily Kite School|https://maps.google.com/?q=Sicily+Kite+School+Lo+Stagnone|4.8|152",
        "KiteLab Sicily|https://maps.google.com/?q=KiteLab+Sicily|4.9|143",
        "Kite Me Up|https://maps.google.com/?q=Kite+Me+Up+Sicily|4.7|137",
      ],
      conditions: [
        "Flat Water",
        "Shallow Lagoon",
        "Thermal Winds",
        "Standing Depth",
        "No Obstacles",
      ],
      accommodationOptions: [
        "Beachfront Resorts",
        "B&Bs",
        "Vacation Rentals",
        "Kitesurfing Camps",
        "Hotels in Marsala",
      ],
      foodOptions: [
        "Sicilian Cuisine",
        "Fresh Seafood",
        "Local Wines",
        "Beach Bars",
        "Traditional Trattorias",
      ],
      culture:
        "Traditional Sicilian with a mix of Arab, Norman, and Mediterranean influences. Famous for wine production, salt pans, and relaxed Mediterranean lifestyle",
      averageSchoolCost: 60,
      averageAccommodationCost: 70,
      numberOfSchools: 15,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 10,
        windQuality: WindQuality.Poor,
        airTemp: 14,
        waterTemp: 15,
        seasonalNotes:
          "Off-season with inconsistent winds. Some schools closed. Can get occasional good days.",
      },
      {
        month: 2,
        windSpeed: 12,
        windQuality: WindQuality.Poor,
        airTemp: 15,
        waterTemp: 15,
        seasonalNotes:
          "Still off-season with improving conditions toward the end of month. Most schools still closed.",
      },
      {
        month: 3,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 17,
        waterTemp: 16,
        seasonalNotes:
          "Start of the kitesurfing season. Most schools open. Wind becoming more reliable.",
      },
      {
        month: 4,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 19,
        waterTemp: 18,
        seasonalNotes:
          "Good conditions with reliable winds. Not crowded yet. Pleasant temperatures.",
      },
      {
        month: 5,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 20,
        seasonalNotes:
          "Excellent wind conditions with warm temperatures. Season in full swing.",
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 23,
        seasonalNotes:
          "Peak season begins. Thermal winds very reliable. Perfect flat water conditions.",
      },
      {
        month: 7,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 25,
        seasonalNotes:
          "Strong, reliable thermal winds. Peak season with warm water. Can get crowded.",
      },
      {
        month: 8,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 26,
        seasonalNotes:
          "Busiest month with strongest thermal winds. Consistent 15-25 knots almost daily.",
      },
      {
        month: 9,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 25,
        seasonalNotes:
          "Still excellent conditions with fewer crowds as peak season winds down.",
      },
      {
        month: 10,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 23,
        waterTemp: 22,
        seasonalNotes:
          "Good wind conditions continue. Pleasant temperatures and fewer tourists.",
      },
      {
        month: 11,
        windSpeed: 13,
        windQuality: WindQuality.Moderate,
        airTemp: 19,
        waterTemp: 19,
        seasonalNotes:
          "End of the regular season. Wind becoming less reliable but still kiteable days.",
      },
      {
        month: 12,
        windSpeed: 11,
        windQuality: WindQuality.Poor,
        airTemp: 15,
        waterTemp: 16,
        seasonalNotes:
          "Off-season. Many schools closed. Occasional good days possible.",
      },
    ],
  },

  // 16. Leucate, France
  {
    spot: {
      name: "Leucate, France",
      country: "France",
      latitude: 42.9056,
      longitude: 3.0333,
      description:
        "Located on the French Mediterranean coast, Leucate is one of Europe's leading kitesurfing spots. Benefiting from steady winds and mild weather conditions, Leucate is a favorite spot for kitesurfers of all levels.",
      bestMonths: "March–October",
      tempRange: "15–28°C",
      waveSize: "Flat to 1m",
      difficultyLevel: "All levels",
      localAttractions: "Wine tasting, local markets, Mediterranean beaches",
      tags: ["steady wind", "flat water", "lagoons"],
      windguruCode: "234",
      kiteSchools: [
        "Leucate Kite Center|https://maps.google.com/?q=Leucate+Kite+Center|4.8|95",
        "KSL Leucate|https://maps.google.com/?q=KSL+Leucate|4.7|88",
        "Sky Fly Kiteschool|https://maps.google.com/?q=Sky+Fly+Kiteschool+Leucate|4.6|76",
      ],
      conditions: [
        "Tramontane Wind",
        "Flat Water Lagoons",
        "Chop and Small Waves",
      ],
      accommodationOptions: ["Beach Resorts", "Camping Sites", "Guesthouses"],
      foodOptions: ["French Cuisine", "Seafood Restaurants", "Local Bistros"],
      culture:
        "Mediterranean charm with a mix of French culture and kitesurfing community",
      averageSchoolCost: 75,
      averageAccommodationCost: 85,
      numberOfSchools: 3,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 10,
        waterTemp: 12,
        seasonalNotes: "Off-season with occasional Tramontane winds.",
      },
      {
        month: 2,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 12,
        waterTemp: 12,
        seasonalNotes: "Cold water but rideable when Tramontane picks up.",
      },
      {
        month: 3,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 15,
        waterTemp: 13,
        seasonalNotes:
          "Start of kiting season; frequent Tramontane makes for good sessions.",
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 18,
        waterTemp: 15,
        seasonalNotes:
          "Reliable wind and pleasant temperatures; ideal for all levels.",
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 21,
        waterTemp: 17,
        seasonalNotes:
          "One of the best months with steady winds and warm days.",
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 19,
        seasonalNotes:
          "Strong Tramontane continues; perfect for flat water freestyle.",
      },
      {
        month: 7,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 22,
        seasonalNotes:
          "Peak season with lighter winds but still many rideable days.",
      },
      {
        month: 8,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 24,
        seasonalNotes:
          "Crowded beaches but consistent sessions in the mornings.",
      },
      {
        month: 9,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 22,
        seasonalNotes:
          "Reliable wind returns; excellent for kiting with fewer tourists.",
      },
      {
        month: 10,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 20,
        seasonalNotes:
          "End of season with crisp air and good Tramontane spells.",
      },
      {
        month: 11,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 14,
        waterTemp: 17,
        seasonalNotes: "Fewer rideable days; wetsuit essential.",
      },
      {
        month: 12,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 11,
        waterTemp: 13,
        seasonalNotes:
          "Cold but still kiteable during strong Tramontane episodes.",
      },
    ],
  },

  // 17. Porto Pollo, Sardinia
  {
    spot: {
      name: "Porto Pollo, Sardinia",
      country: "Italy",
      latitude: 41.1861,
      longitude: 9.335,
      description:
        "Porto Pollo, located in northern Sardinia, is one of the most popular kitesurfing destinations in Italy. With two natural bays separated by a sandy isthmus, it offers both flat water and wave conditions ideal for all skill levels.",
      bestMonths: "May–October",
      tempRange: "18–30°C",
      waveSize: "Flat to 1.5m",
      difficultyLevel: "Beginner to Advanced",
      localAttractions: "Maddalena Islands, Sardinian cuisine, mountain biking",
      tags: ["flat water", "waves", "island vibes", "beginner friendly"],
      windguruCode: "517",
      kiteSchools: [
        "Porto Pollo Kite Center|https://maps.google.com/?q=Porto+Pollo+Kite+Center|4.9|102",
        "Sporting Club Sardinia|https://maps.google.com/?q=Sporting+Club+Sardinia|4.8|87",
        "MB Pro Center|https://maps.google.com/?q=MB+Pro+Center+Porto+Pollo|4.7|66",
      ],
      conditions: ["Thermal Winds", "Flat and Wave Areas", "Sandy Beach"],
      accommodationOptions: ["Beach Resorts", "Camping", "Agriturismos"],
      foodOptions: ["Sardinian Cuisine", "Seafood Trattorias", "Pizza Places"],
      culture:
        "Mediterranean island culture with rustic charm and watersport passion",
      averageSchoolCost: 80,
      averageAccommodationCost: 95,
      numberOfSchools: 3,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 12,
        waterTemp: 14,
        seasonalNotes: "Off-season with colder temps; occasional strong winds.",
      },
      {
        month: 2,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 13,
        waterTemp: 13,
        seasonalNotes:
          "Some windy days for experienced riders in full wetsuits.",
      },
      {
        month: 3,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 16,
        waterTemp: 14,
        seasonalNotes:
          "Spring awakens the wind season; early birds get uncrowded conditions.",
      },
      {
        month: 4,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 19,
        waterTemp: 16,
        seasonalNotes:
          "Consistent winds and warming temps—season starts strong.",
      },
      {
        month: 5,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 18,
        seasonalNotes: "Thermal winds kick in; ideal month to visit.",
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 21,
        seasonalNotes: "Summer thermal winds dominate, perfect for all levels.",
      },
      {
        month: 7,
        windSpeed: 21,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 23,
        seasonalNotes:
          "Crowds increase, but thermal wind is reliable by afternoon.",
      },
      {
        month: 8,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 25,
        seasonalNotes:
          "Hot and busy, with afternoon thermals keeping sessions alive.",
      },
      {
        month: 9,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 24,
        seasonalNotes:
          "Sweet spot: warm, less crowded, and very consistent wind.",
      },
      {
        month: 10,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 21,
        seasonalNotes: "Mellow fall days and rideable wind continue.",
      },
      {
        month: 11,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 17,
        waterTemp: 18,
        seasonalNotes: "Wind becomes sporadic; off-season starts.",
      },
      {
        month: 12,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 14,
        waterTemp: 15,
        seasonalNotes:
          "Quiet season with occasional stormy sessions for die-hards.",
      },
    ],
  },

  // Maui, Hawaii, USA
  {
    spot: {
      name: "Maui, Hawaii, USA",
      country: "United States",
      latitude: 20.7984,
      longitude: -156.3319,
      description:
        "The ultimate destination for advanced kitesurfers, Maui's North Shore offers legendary wave riding conditions with powerful swells and strong trade winds. Home to 'Kite Beach' and regular professional competitions.",
      bestMonths: "May–Oct",
      tempRange: "26–31°C",
      waveSize: "Large (2-4m+)",
      difficultyLevel: "Advanced",
      localAttractions:
        "Road to Hana, Haleakalā National Park, Surfing at Jaws, Luau cultural shows",
      tags: ["Wave Riding", "Pro Spot", "Tropical Paradise"],
      windguruCode: "150",
      kiteSchools: [
        "Maui Kitesurfing School|https://maps.google.com/?q=Maui+Kitesurfing+School|4.9|214",
        "Kiteboarding School Maui|https://maps.google.com/?q=Kiteboarding+School+Maui|4.8|192",
        "Action Sports Maui|https://maps.google.com/?q=Action+Sports+Maui|4.7|165",
        "Hawaii Kiteboarding Academy|https://maps.google.com/?q=Hawaii+Kiteboarding+Academy|4.6|137",
        "Pacific Kite Co.|https://maps.google.com/?q=Pacific+Kite+Co.+Maui|4.5|112",
      ],
      conditions: ["Powerful Waves", "Strong Trade Winds", "Reef Breaks"],
      accommodationOptions: [
        "Luxury Resorts",
        "Vacation Rentals",
        "Beachfront Condos",
      ],
      foodOptions: [
        "Hawaiian BBQ",
        "Fresh Seafood",
        "Farm-to-Table Restaurants",
        "Food Trucks",
      ],
      culture:
        "Aloha spirit blended with Polynesian traditions and modern surf culture",
      averageSchoolCost: 120,
      averageAccommodationCost: 250,
      numberOfSchools: 8,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 26,
        waterTemp: 24,
        seasonalNotes:
          "Winter swells dominate; wind less consistent. Wetsuit recommended for cooler water.",
      },
      {
        month: 2,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 26,
        waterTemp: 23,
        seasonalNotes: "Transition period with occasional strong trade winds.",
      },
      {
        month: 3,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 23,
        seasonalNotes:
          "Trade winds strengthen; early spring offers reliable wave riding.",
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 24,
        seasonalNotes:
          "Peak wind season begins; powerful waves attract advanced riders.",
      },
      {
        month: 5,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 25,
        seasonalNotes:
          "Consistent 20-30kt trade winds; ideal for pro competitions.",
      },
      {
        month: 6,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 26,
        seasonalNotes:
          "Summer peak with strong, steady winds and massive swells.",
      },
      {
        month: 7,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 27,
        seasonalNotes:
          "Prime conditions continue; crowded during July 4th holiday.",
      },
      {
        month: 8,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 27,
        seasonalNotes:
          "Slightly warmer water; wind remains strong through August.",
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 27,
        seasonalNotes: "Early autumn still delivers reliable winds and waves.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 26,
        seasonalNotes:
          "Transition to winter swells; wind quality declines gradually.",
      },
      {
        month: 11,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 25,
        seasonalNotes:
          "Unpredictable winds; focus shifts to surfing larger swells.",
      },
      {
        month: 12,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 27,
        waterTemp: 24,
        seasonalNotes:
          "Winter storms create big wave conditions; kiting less consistent.",
      },
    ],
  },
];
