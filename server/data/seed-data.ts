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
      bestMonths: "April–October",
      tempRange: "20–30°C",
      waveSize: "Small to Medium",
      difficultyLevel: "Beginner to Intermediate",
      localAttractions:
        "Historic Old Town, Castillo de Guzmán el Bueno, Whale-watching in the Strait of Gibraltar, Day trips to Tangier",
      tags: ["Kite Schools", "Equipment Rental", "Beachfront Accommodation"],
      windguruCode: "48",
      kiteSchools: [
        "Rebels Tarifa Kiteschool|https://maps.google.com/?q=Rebels+Tarifa+Kiteschool",
        "Addict Kite School Tarifa|https://maps.google.com/?q=Addict+Kite+School+Tarifa",
        "Tarifa Max Kitesurf School|https://maps.google.com/?q=Tarifa+Max+Kitesurf+School",
        "Free your Mind|https://maps.google.com/?q=Free+your+Mind+Tarifa",
        "Freeride Tarifa|https://maps.google.com/?q=Freeride+Tarifa",
        "Wind & Water Experience|https://maps.google.com/?q=Wind+%26+Water+Experience+Tarifa",
        "Wayuu Watersports|https://maps.google.com/?q=Wayuu+Watersports+Tarifa",
        "Tarifa Spin Out|https://maps.google.com/?q=Tarifa+Spin+Out",
        "Lazykite School Tarifa|https://maps.google.com/?q=Lazykite+School+Tarifa",
        "ION Club Tarifa|https://maps.google.com/?q=ION+Club+Tarifa",
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
      averageSchoolCost: 70,
      averageAccommodationCost: 90,
      numberOfSchools: 45,
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
      latitude: 19.7355,
      longitude: -69.7415,
      description:
        "Cabarete is one of the most famous kiteboarding destinations in the Caribbean, offering consistent trade winds, flat water in the bay, and wave riding conditions on the reef. With its vibrant nightlife, friendly atmosphere, and world-class conditions, Cabarete attracts kiters from all over the world.",
      bestMonths: "Dec-Apr",
      tempRange: "24–30°C",
      waveSize: "Flat to Small on Bay, 1-3m on Reef",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "El Choco National Park, Sosua Beach, Ocean World Adventure Park, Waterfalls",
      tags: ["Kite Schools", "Flat Water", "Wave Riding", "Caribbean"],
      windguruCode: "714",
      kiteSchools: [
        "Cabarete Kiteboarding School|https://maps.google.com/?q=Cabarete+Kiteboarding+School",
        "Kite Club Cabarete|https://maps.google.com/?q=Kite+Club+Cabarete",
        "Nautical Club|https://maps.google.com/?q=Nautical+Club+Cabarete",
        "Extreme Control|https://maps.google.com/?q=Extreme+Control+Cabarete",
        "Cabarete Kite School|https://maps.google.com/?q=Cabarete+Kite+School",
      ],
      conditions: ["Trade Winds", "Flat Water in Bay", "Wave Riding on Reef"],
      accommodationOptions: [
        "Beachfront Hotels",
        "Guesthouses",
        "All-Inclusive Resorts",
      ],
      foodOptions: [
        "Seafood Restaurants",
        "Caribbean Cuisine",
        "International Bars",
        "Vegetarian-Friendly Cafés",
      ],
      culture:
        "Caribbean laid-back culture with a mix of European and local influences, famous for its lively kiteboarding community.",
      averageSchoolCost: 75,
      averageAccommodationCost: 80,
      numberOfSchools: 5,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 25,
        seasonalNotes:
          "Peak season with strong trade winds and warm waters. Ideal conditions for all skill levels.",
      },
      {
        month: 2,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 25,
        seasonalNotes:
          "Continued strong trade winds. Great conditions for advanced kiters, with less crowded beaches.",
      },
      {
        month: 3,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 26,
        seasonalNotes:
          "Spring brings ideal wind conditions with warm air and water temperatures. Popular month for kiteboarding.",
      },
      {
        month: 4,
        windSpeed: 21,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Slightly less consistent winds as the season transitions, but still good conditions for kiteboarding.",
      },
      {
        month: 5,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "Wind decreases in May, but warm temperatures and calm waters make for an enjoyable time for beginners.",
      },
      {
        month: 6,
        windSpeed: 18,
        windQuality: WindQuality.Moderate,
        airTemp: 29,
        waterTemp: 29,
        seasonalNotes:
          "Summer starts with lighter winds and warmer temperatures. Best suited for relaxed sessions and beginners.",
      },
      {
        month: 7,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "Continued lighter winds, but warm waters and quieter beaches make it a nice time to visit.",
      },
      {
        month: 8,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "Wind conditions remain moderate, ideal for beginner to intermediate kiters. Enjoy the tropical climate.",
      },
      {
        month: 9,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 29,
        seasonalNotes:
          "Wind picks up again, but the beaches start to become less crowded. Ideal for a peaceful kiteboarding experience.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "October brings consistent trade winds, perfect for kitesurfers seeking steady conditions.",
      },
      {
        month: 11,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Great winds continue with comfortable temperatures, making November a top month for kiteboarding.",
      },
      {
        month: 12,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 26,
        seasonalNotes:
          "December kicks off the peak wind season with strong trade winds and warm temperatures.",
      },
    ],
  },

  // 3. Cumbuco, Brazil
  {
    spot: {
      name: "Cumbuco, Brazil",
      country: "Brazil",
      latitude: -3.6258,
      longitude: -38.6211,
      description:
        "Cumbuco is a renowned kiteboarding destination located just 30 km west of Fortaleza. This former fishing village has transformed into a vibrant kite hub, attracting riders worldwide. The area offers a mix of conditions: ocean waves, choppy waters, and nearby flatwater lagoons like Cauipe and Taíba, making it ideal for all skill levels.",
      bestMonths: "Jul-Jan",
      tempRange: "26-28°C",
      waveSize:
        "Choppy ocean with small beach breaks; flatwater lagoons nearby",
      difficultyLevel: "All levels (flatwater lagoons ideal for beginners)",
      localAttractions: "Dune buggy rides, Fortaleza nightlife, local markets",
      tags: ["flatwater", "waves", "consistent wind", "vibrant nightlife"],
      windguruCode: "293204",
      kiteSchools: [
        "KSM Kite School Cumbuco|https://maps.google.com/?q=KSM+Kite+School+Cumbuco",
        "Windtown Kite School|https://maps.google.com/?q=Windtown+Kite+School+Cumbuco",
        "Vila Coqueiros Kite Center|https://maps.google.com/?q=Vila+Coqueiros+Kite+Center+Cumbuco",
      ],
      conditions: ["Trade Winds", "Flatwater Lagoons", "Ocean Waves"],
      accommodationOptions: ["Kite Camps", "Beachfront Hotels", "Hostels"],
      foodOptions: [
        "Brazilian Cuisine",
        "Seafood",
        "International Restaurants",
      ],
      culture:
        "Blend of traditional Brazilian village life with a growing international kiteboarding community",
      averageSchoolCost: 85,
      averageAccommodationCost: 95,
      numberOfSchools: 8,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "End of peak season; still good wind but slightly less consistent.",
      },
      {
        month: 2,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes: "Off-season begins; wind becomes less reliable.",
      },
      {
        month: 3,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "Calmer conditions; suitable for beginners seeking gentle winds.",
      },
      {
        month: 4,
        windSpeed: 12,
        windQuality: WindQuality.Moderate,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes: "Light winds; not ideal for advanced riders.",
      },
      {
        month: 5,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes: "Winds start to pick up towards the end of the month.",
      },
      {
        month: 6,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 26,
        seasonalNotes: "Season starts; increasing wind consistency.",
      },
      {
        month: 7,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 26,
        seasonalNotes:
          "Peak season begins; strong and steady winds ideal for all riders.",
      },
      {
        month: 8,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 26,
        seasonalNotes:
          "Consistent trade winds; popular month for kiteboarding.",
      },
      {
        month: 9,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes:
          "Strongest winds of the year; perfect for advanced tricks.",
      },
      {
        month: 10,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 27,
        seasonalNotes: "Continued strong winds; slightly fewer crowds.",
      },
      {
        month: 11,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes: "Reliable winds; great conditions for all skill levels.",
      },
      {
        month: 12,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 28,
        waterTemp: 27,
        seasonalNotes:
          "Winds begin to taper off; still suitable for kiteboarding.",
      },
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
      kiteSchools: [
        "Dakhla Attitude|https://maps.google.com/?q=Dakhla+Attitude",
        "Ocean Vagabond|https://maps.google.com/?q=Ocean+Vagabond+Dakhla",
        "Westpoint Dakhla|https://maps.google.com/?q=Westpoint+Dakhla",
      ],
      conditions: ["Trade Winds", "Flat Lagoon", "Wave Breaks on Ocean Side"],
      accommodationOptions: ["Kite Camps", "Basic Hotels"],
      foodOptions: ["Moroccan Cuisine", "Seafood", "Camp Dining"],
      culture: "Berber/Moroccan with growing kiteboard tourism",
      averageSchoolCost: 80,
      averageAccommodationCost: 90,
      numberOfSchools: 6,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 21,
        waterTemp: 18,
        seasonalNotes:
          "January is quiet and cool with steady winds. Ideal for riders seeking space and solitude.",
      },
      {
        month: 2,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 21,
        waterTemp: 17,
        seasonalNotes:
          "Winds gain consistency. Cooler temps require a wetsuit.",
      },
      {
        month: 3,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 22,
        waterTemp: 17,
        seasonalNotes: "Season kicks off with strong winds and moderate temps.",
      },
      {
        month: 4,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 18,
        seasonalNotes:
          "Peak conditions begin. Strong winds and warm weather draw more kiters.",
      },
      {
        month: 5,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 18,
        seasonalNotes:
          "Prime time for freestyle riders in the lagoon with perfect flat water.",
      },
      {
        month: 6,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 19,
        seasonalNotes:
          "Consistent wind every day. Great for both beginners and pros.",
      },
      {
        month: 7,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 20,
        seasonalNotes:
          "Hot and windy. Expect ideal training conditions and vibrant kite camps.",
      },
      {
        month: 8,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 21,
        seasonalNotes:
          "Similar to July with slightly warmer water and consistent wind.",
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 21,
        seasonalNotes:
          "September offers quieter vibes and reliable daily wind.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 25,
        waterTemp: 21,
        seasonalNotes:
          "Conditions remain great. A transition month with fewer crowds.",
      },
      {
        month: 11,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 20,
        seasonalNotes: "Winds are still consistent but cooler evenings set in.",
      },
      {
        month: 12,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 22,
        waterTemp: 19,
        seasonalNotes:
          "Chill season begins. Still rideable days with a relaxed atmosphere.",
      },
    ],
  },

  // 5. El Gouna, Egypt
  {
    spot: {
      name: "El Gouna, Egypt",
      country: "Egypt",
      latitude: 27.394,
      longitude: 33.6786,
      description:
        "El Gouna is a premier kitesurfing destination on the Red Sea, offering year-round wind, warm waters, and a variety of conditions suitable for all levels. The spot features expansive shallow lagoons and consistent thermal winds.",
      bestMonths: "May–October",
      tempRange: "20–35°C",
      waveSize: "Flat to Choppy",
      difficultyLevel: "Beginner to Intermediate",
      localAttractions:
        "Abu Tig Marina, Downtown El Gouna, Desert Safari Tours, Snorkeling and Diving Excursions",
      tags: ["shallow", "flat", "thermal", "resort"],
      windguruCode: "123456",
      kiteSchools: [
        "Duotone Pro Center El Gouna|https://maps.google.com/?q=Duotone+Pro+Center+El+Gouna",
        "KitePeople El Gouna|https://maps.google.com/?q=KitePeople+El+Gouna",
        "RedSeaZone|https://maps.google.com/?q=RedSeaZone+El+Gouna",
        "Nomad Kite Events|https://maps.google.com/?q=Nomad+Kite+Events+El+Gouna",
        "Osmosis Kiteboarding|https://maps.google.com/?q=Osmosis+Kiteboarding+El+Gouna",
      ],
      conditions: ["Shallow Lagoons", "Consistent Wind", "Sandy Bottom"],
      accommodationOptions: [
        "Beachfront Resorts",
        "Boutique Hotels",
        "Vacation Rentals",
      ],
      foodOptions: [
        "Seafood Restaurants",
        "Egyptian Cuisine",
        "International Dining",
        "Beach Cafés",
      ],
      culture:
        "A blend of modern resort living with traditional Egyptian hospitality, offering a relaxed and friendly atmosphere",
      averageSchoolCost: 70,
      averageAccommodationCost: 100,
      numberOfSchools: 25,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 21,
        waterTemp: 22,
        seasonalNotes:
          "January brings cooler temps and lighter winds. Ideal for beginners and those looking for fewer crowds.",
      },
      {
        month: 2,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 22,
        waterTemp: 22,
        seasonalNotes:
          "February offers mild conditions with steady but moderate winds. Wetsuits recommended.",
      },
      {
        month: 3,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 23,
        seasonalNotes:
          "Spring begins to show in March with improving wind conditions and warming temps.",
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 27,
        waterTemp: 24,
        seasonalNotes:
          "April offers more consistent thermals, great for intermediate riders preparing for peak season.",
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 25,
        seasonalNotes:
          "May marks the start of the prime season with solid wind, warm water, and lively beach vibes.",
      },
      {
        month: 6,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 33,
        waterTemp: 27,
        seasonalNotes:
          "June is hot and windy—perfect for long kite sessions in boardshorts or bikinis.",
      },
      {
        month: 7,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 35,
        waterTemp: 28,
        seasonalNotes:
          "July is peak summer. Thermals fire almost daily—expect crowded lagoons and party vibes.",
      },
      {
        month: 8,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 34,
        waterTemp: 28,
        seasonalNotes:
          "August continues the summer blast. High wind reliability and perfect water temps.",
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 32,
        waterTemp: 27,
        seasonalNotes:
          "September offers excellent wind and slightly less crowd. Great time for both progression and chill.",
      },
      {
        month: 10,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 29,
        waterTemp: 26,
        seasonalNotes:
          "October wraps up the season with solid wind and warm conditions—ideal for relaxed sessions.",
      },
      {
        month: 11,
        windSpeed: 17,
        windQuality: WindQuality.Moderate,
        airTemp: 26,
        waterTemp: 24,
        seasonalNotes:
          "November cools off slightly but still offers rideable days, especially in the afternoons.",
      },
      {
        month: 12,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 23,
        waterTemp: 23,
        seasonalNotes:
          "December brings a quieter atmosphere with moderate wind and cooler temperatures.",
      },
    ],
  },

  // 6. Boracay, Philippines
  {
    spot: {
      name: "Boracay, Philippines",
      country: "Philippines",
      latitude: 11.9674,
      longitude: 121.927,
      description:
        "Boracay is a tropical paradise renowned for its powdery white sand beaches and consistent wind conditions, making it a top kitesurfing destination in Southeast Asia. The island offers flat water in the lagoon and small to medium waves on the ocean side, making it suitable for all levels of kitesurfers.",
      bestMonths: "Nov-May",
      tempRange: "25–32°C",
      waveSize: "Flat in Lagoon, Small to Medium on Ocean Side",
      difficultyLevel: "Beginner to Advanced",
      localAttractions:
        "White Beach, Puka Beach, Mount Luho, Island Hopping, Vibrant Nightlife",
      tags: ["Kite Schools", "Flat Water", "Waves", "Tropical Paradise"],
      windguruCode: "552",
      kiteSchools: [
        "Kitesurfing Boracay|https://maps.google.com/?q=Kitesurfing+Boracay",
        "Willy's Rock Kite School|https://maps.google.com/?q=Willy's+Rock+Kite+School",
        "Bulabog Beach Kitesurfing School|https://maps.google.com/?q=Bulabog+Beach+Kitesurfing+School",
        "Kiteboarding Philippines|https://maps.google.com/?q=Kiteboarding+Philippines",
        "Aquafree Kitesurfing|https://maps.google.com/?q=Aquafree+Kitesurfing",
      ],
      conditions: [
        "Trade Winds",
        "Flat Water in Lagoon",
        "Small to Medium Waves on Ocean Side",
      ],
      accommodationOptions: [
        "Beachfront Hotels",
        "Resorts",
        "Boutique Guesthouses",
        "Vacation Rentals",
      ],
      foodOptions: [
        "Seafood Restaurants",
        "International Cuisine",
        "Beachfront Bars",
        "Local Filipino Cuisine",
      ],
      culture:
        "A mix of Filipino coastal life with strong influences from tourists, famous for its laid-back atmosphere and vibrant nightlife.",
      averageSchoolCost: 50,
      averageAccommodationCost: 80,
      numberOfSchools: 5,
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "Ideal conditions for kitesurfing with steady trade winds and warm water temperatures.",
      },
      {
        month: 2,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "Strong and consistent winds with good conditions for both beginners and advanced kiters.",
      },
      {
        month: 3,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 29,
        seasonalNotes:
          "March brings steady winds and comfortable temperatures, perfect for kitesurfing.",
      },
      {
        month: 4,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "High season with optimal wind conditions and warm water temperatures. Expect good crowd but great conditions.",
      },
      {
        month: 5,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "End of the dry season with stable winds and warm temperatures, making for excellent kiteboarding conditions.",
      },
      {
        month: 6,
        windSpeed: 21,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "The start of the rainy season brings slightly weaker winds, but conditions are still great for beginners and intermediates.",
      },
      {
        month: 7,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "Wind remains moderate but still great for kitesurfing. Expect fewer tourists in the off-peak season.",
      },
      {
        month: 8,
        windSpeed: 19,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "Moderate winds with warm waters make it an ideal time for intermediate to advanced riders.",
      },
      {
        month: 9,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 30,
        seasonalNotes:
          "Wind starts to pick up again as the rainy season winds down. Ideal for a quieter kitesurfing experience.",
      },
      {
        month: 10,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 29,
        seasonalNotes:
          "Excellent conditions with stable winds and warm temperatures. Great for both beginners and experienced kiters.",
      },
      {
        month: 11,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "One of the best months for kitesurfing in Boracay with perfect conditions.",
      },
      {
        month: 12,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 28,
        waterTemp: 28,
        seasonalNotes:
          "December marks the start of the peak season with strong winds and warm, consistent water conditions.",
      },
    ],
  },
];
