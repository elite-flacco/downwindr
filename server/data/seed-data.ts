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
      longitude: -5.6068,
      description:
        "Known as the wind capital of Europe, Tarifa offers consistent strong winds and a variety of conditions suitable for all levels. The Levante (easterly) and Poniente (westerly) winds create perfect kiteboarding conditions almost year-round.",
      bestMonths: "Apr-Oct",
      tempRange: "15-22°C",
      waveSize: "Small to medium (1-2m)",
      difficultyLevel: "All levels",
      localAttractions: "Old Town Tarifa, Gibraltar, Tangier (Morocco)",
      tags: ["beach", "consistent", "popular", "tourist"],
      windguruCode: "46",
      kiteSchools: ["Wilderness Tarifa", "Dragon Tarifa", "ION Club Tarifa"],
      conditions: ["Consistent Wind", "Sandy Bottom", "Side-onshore"],
      accommodationOptions: ["Hotels", "Hostels", "Apartments", "Camping"],
      foodOptions: ["Spanish Cuisine", "Seafood", "International Options"],
      culture: "Vibrant beach culture with Spanish and Moroccan influences",
      averageSchoolCost: 70,
      averageAccommodationCost: 90,
      numberOfSchools: 45,
    },
    windConditions: [
      { month: 1, windSpeed: 18, windQuality: WindQuality.Moderate, airTemp: 16, waterTemp: 16 },
      { month: 2, windSpeed: 19, windQuality: WindQuality.Moderate, airTemp: 17, waterTemp: 16 },
      { month: 3, windSpeed: 20, windQuality: WindQuality.Good, airTemp: 18, waterTemp: 17 },
      { month: 4, windSpeed: 22, windQuality: WindQuality.Good, airTemp: 19, waterTemp: 18 },
      { month: 5, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 22, waterTemp: 19 },
      { month: 6, windSpeed: 26, windQuality: WindQuality.Excellent, airTemp: 24, waterTemp: 21 },
      { month: 7, windSpeed: 28, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 22 },
      { month: 8, windSpeed: 28, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 22 },
      { month: 9, windSpeed: 26, windQuality: WindQuality.Excellent, airTemp: 24, waterTemp: 21 },
      { month: 10, windSpeed: 24, windQuality: WindQuality.Good, airTemp: 21, waterTemp: 20 },
      { month: 11, windSpeed: 22, windQuality: WindQuality.Good, airTemp: 18, waterTemp: 18 },
      { month: 12, windSpeed: 20, windQuality: WindQuality.Moderate, airTemp: 16, waterTemp: 17, seasonalNotes: "Winter brings cooler temperatures, wetsuits recommended" },
    ],
  },
  
  // 2. Cabarete, Dominican Republic
  {
    spot: {
      name: "Cabarete, Dominican Republic",
      country: "Dominican Republic",
      latitude: 19.7557,
      longitude: -70.4172,
      description:
        "Cabarete is known as the kiteboarding capital of the Caribbean. With reliable trade winds, warm water, and a vibrant beachfront scene, it's a perfect destination for kitesurfers of all levels. The thermal wind effect creates consistent afternoon conditions.",
      bestMonths: "May-Aug",
      tempRange: "26-30°C",
      waveSize: "Small to medium (1-1.5m)",
      difficultyLevel: "All levels, great for beginners",
      localAttractions: "Waterfalls, canyoning, mountain biking, horseback riding",
      tags: ["beach", "consistent", "thermal", "warm", "tourist"],
      windguruCode: "330",
      kiteSchools: ["Laurel Eastman Kiteboarding", "Kite Club Cabarete", "GoKite Cabarete"],
      conditions: ["Thermal Winds", "Sandy Bottom", "Some Reef Breaks"],
      accommodationOptions: ["Hotels", "Resorts", "Apartments", "Hostels"],
      foodOptions: ["Caribbean Cuisine", "International Options", "Beachfront Dining"],
      culture: "Laid-back Caribbean vibe with international influences",
      averageSchoolCost: 65,
      averageAccommodationCost: 85,
      numberOfSchools: 20,
    },
    windConditions: [
      { month: 1, windSpeed: 16, windQuality: WindQuality.Good, airTemp: 26, waterTemp: 26 },
      { month: 2, windSpeed: 17, windQuality: WindQuality.Good, airTemp: 26, waterTemp: 26 },
      { month: 3, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 27, waterTemp: 26 },
      { month: 4, windSpeed: 19, windQuality: WindQuality.Good, airTemp: 27, waterTemp: 27 },
      { month: 5, windSpeed: 21, windQuality: WindQuality.Excellent, airTemp: 28, waterTemp: 27 },
      { month: 6, windSpeed: 23, windQuality: WindQuality.Excellent, airTemp: 29, waterTemp: 28 },
      { month: 7, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 29, waterTemp: 28 },
      { month: 8, windSpeed: 23, windQuality: WindQuality.Excellent, airTemp: 29, waterTemp: 28 },
      { month: 9, windSpeed: 20, windQuality: WindQuality.Good, airTemp: 29, waterTemp: 28 },
      { month: 10, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 28, waterTemp: 28 },
      { month: 11, windSpeed: 17, windQuality: WindQuality.Good, airTemp: 27, waterTemp: 27 },
      { month: 12, windSpeed: 16, windQuality: WindQuality.Good, airTemp: 26, waterTemp: 27 },
    ],
  },
  
  // 3. Cumbuco, Brazil
  {
    spot: {
      name: "Cumbuco, Brazil",
      country: "Brazil",
      latitude: -3.6519,
      longitude: -38.7452,
      description:
        "Located just outside Fortaleza, Cumbuco is a kiteboarding paradise with consistent trade winds, warm water, and a mix of flat water and wave conditions. The laid-back fishing village atmosphere combined with world-class kiteboarding conditions makes it a top destination.",
      bestMonths: "Jul-Jan",
      tempRange: "26-30°C",
      waveSize: "Small to large (1-3m)",
      difficultyLevel: "All levels",
      localAttractions: "Dune buggy rides, Fortaleza city, lagoons",
      tags: ["beach", "consistent", "warm", "downwinders"],
      windguruCode: "331",
      kiteSchools: ["Club Ventos", "Kite Welt", "Kite Brazil"],
      conditions: ["Trade Winds", "Beach Break", "Flat Water Areas"],
      accommodationOptions: ["Pousadas", "Hotels", "Rental Houses"],
      foodOptions: ["Brazilian Cuisine", "Seafood", "International Options"],
      culture: "Brazilian fishing village turned kite destination",
      averageSchoolCost: 55,
      averageAccommodationCost: 70,
      numberOfSchools: 15,
    },
    windConditions: [
      { month: 1, windSpeed: 20, windQuality: WindQuality.Good, airTemp: 30, waterTemp: 28 },
      { month: 2, windSpeed: 18, windQuality: WindQuality.Moderate, airTemp: 30, waterTemp: 28 },
      { month: 3, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 29, waterTemp: 28 },
      { month: 4, windSpeed: 14, windQuality: WindQuality.Poor, airTemp: 29, waterTemp: 28 },
      { month: 5, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 28, waterTemp: 28 },
      { month: 6, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 28, waterTemp: 27 },
      { month: 7, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 27, waterTemp: 27 },
      { month: 8, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 27, waterTemp: 27 },
      { month: 9, windSpeed: 26, windQuality: WindQuality.Excellent, airTemp: 28, waterTemp: 27 },
      { month: 10, windSpeed: 25, windQuality: WindQuality.Excellent, airTemp: 29, waterTemp: 27 },
      { month: 11, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 29, waterTemp: 28 },
      { month: 12, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 30, waterTemp: 28 },
    ],
  },
  
  // Add more spots as needed...
  
  // 4. Dakhla, Morocco
  {
    spot: {
      name: "Dakhla, Morocco",
      country: "Morocco",
      latitude: 23.7158,
      longitude: -15.9373,
      description:
        "Dakhla is a unique kiteboarding destination located on a 40km lagoon in Western Sahara, Morocco. Its remote setting offers uncrowded conditions despite its world-class status. The flat, shallow lagoon (known as 'Dakhla Attitude') provides perfect freestyle conditions, while the ocean side ('Dakhla Spirit') offers wave riding opportunities.",
      bestMonths: "Mar-Nov",
      tempRange: "17-26°C",
      waveSize: "Flat in lagoon, 1-3m on ocean side",
      difficultyLevel: "All levels (lagoon ideal for beginners)",
      localAttractions: "Desert exploring, fishing, flamingo colony",
      tags: ["lagoon", "flat", "consistent", "remote"],
      windguruCode: "341",
      kiteSchools: ["Dakhla Attitude", "Ocean Vagabond", "Westpoint Dakhla"],
      conditions: ["Trade Winds", "Flat Lagoon", "Wave Breaks on Ocean Side"],
      accommodationOptions: ["Kite Camps", "Basic Hotels"],
      foodOptions: ["Moroccan Cuisine", "Seafood", "Camp Dining"],
      culture: "Berber/Moroccan with growing kiteboard tourism",
      averageSchoolCost: 80,
      averageAccommodationCost: 90,
      numberOfSchools: 6,
    },
    windConditions: [
      { month: 1, windSpeed: 17, windQuality: WindQuality.Moderate, airTemp: 21, waterTemp: 18 },
      { month: 2, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 21, waterTemp: 17 },
      { month: 3, windSpeed: 20, windQuality: WindQuality.Good, airTemp: 22, waterTemp: 17 },
      { month: 4, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 23, waterTemp: 18 },
      { month: 5, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 24, waterTemp: 18 },
      { month: 6, windSpeed: 25, windQuality: WindQuality.Excellent, airTemp: 25, waterTemp: 19 },
      { month: 7, windSpeed: 25, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 20 },
      { month: 8, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 21 },
      { month: 9, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 21 },
      { month: 10, windSpeed: 20, windQuality: WindQuality.Good, airTemp: 25, waterTemp: 21 },
      { month: 11, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 24, waterTemp: 20 },
      { month: 12, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 22, waterTemp: 19 },
    ],
  },
];