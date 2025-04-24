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
      windguruCode: "48",
      kiteSchools: [
        "Rebels Tarifa Kiteschool|https://maps.google.com/?q=Rebels+Tarifa+Kiteschool|4.8|173",
        "Addict Kite School Tarifa|https://maps.google.com/?q=Addict+Kite+School+Tarifa|4.9|158",
        "Tarifa Max Kitesurf School|https://maps.google.com/?q=Tarifa+Max+Kitesurf+School|4.7|147",
        "Free your Mind|https://maps.google.com/?q=Free+your+Mind+Tarifa|4.8|132",
        "Freeride Tarifa|https://maps.google.com/?q=Freeride+Tarifa|4.6|124",
        "Wind & Water Experience|https://maps.google.com/?q=Wind+%26+Water+Experience+Tarifa|4.5|98",
        "Wayuu Watersports|https://maps.google.com/?q=Wayuu+Watersports+Tarifa|4.4|87",
        "Tarifa Spin Out|https://maps.google.com/?q=Tarifa+Spin+Out|4.3|76",
        "Lazykite School Tarifa|https://maps.google.com/?q=Lazykite+School+Tarifa|4.2|62",
        "ION Club Tarifa|https://maps.google.com/?q=ION+Club+Tarifa|4.1|54",
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
        "Cabarete Kiteboarding School|https://maps.google.com/?q=Cabarete+Kiteboarding+School|4.9|161",
        "Kite Club Cabarete|https://maps.google.com/?q=Kite+Club+Cabarete|4.7|145",
        "Nautical Club|https://maps.google.com/?q=Nautical+Club+Cabarete|4.6|127",
        "Extreme Control|https://maps.google.com/?q=Extreme+Control+Cabarete|4.5|96",
        "Cabarete Kite School|https://maps.google.com/?q=Cabarete+Kite+School|4.3|82",
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
      numberOfSchools: 12,
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
        "Dakhla Attitude|https://maps.google.com/?q=Dakhla+Attitude|4.8|139",
        "Ocean Vagabond|https://maps.google.com/?q=Ocean+Vagabond+Dakhla|4.7|112",
        "Westpoint Dakhla|https://maps.google.com/?q=Westpoint+Dakhla|4.6|94",
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
      bestMonths: "May–Oct",
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
        "Kitesurfing Boracay|https://maps.google.com/?q=Kitesurfing+Boracay|4.8|136",
        "Willy's Rock Kite School|https://maps.google.com/?q=Willy's+Rock+Kite+School|4.7|124",
        "Bulabog Beach Kitesurfing School|https://maps.google.com/?q=Bulabog+Beach+Kitesurfing+School|4.9|112",
        "Kiteboarding Philippines|https://maps.google.com/?q=Kiteboarding+Philippines|4.6|96",
        "Aquafree Kitesurfing|https://maps.google.com/?q=Aquafree+Kitesurfing|4.5|82",
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

  // 7. Jericoacoara, Brazil
  {
    spot: {
      name: "Jericoacoara, Brazil",
      country: "Brazil",
      latitude: -2.7966,
      longitude: -40.5127,
      description:
        "Jericoacoara (aka Jeri) is a legendary kitesurfing and windsurfing destination in Brazil. Known for its incredibly consistent wind, wide sandy beaches, and laid-back village vibes, it attracts kiters from all over the world from July to January.",
      bestMonths: "Jul-Jan",
      tempRange: "26–33°C",
      waveSize: "Flat to Small Waves",
      difficultyLevel: "All levels",
      localAttractions:
        "Sand dune sunsets, Pedra Furada, Capoeira shows, ATV tours, vibrant nightlife",
      tags: ["consistent wind", "wide beach", "Brazil", "flat", "small waves"],
      windguruCode: "231",
      kiteSchools: [
        "Rancho do Kite|https://maps.google.com/?q=Rancho+do+Kite",
        "ClubVentos Jeri|https://maps.google.com/?q=ClubVentos+Jericoacoara",
        "Jeri250 Kite School|https://maps.google.com/?q=Jeri250+Kite+School",
        "Bloco do Kite|https://maps.google.com/?q=Bloco+do+Kite",
        "Kiteiscool|https://maps.google.com/?q=Kiteiscool+Jericoacoara"
      ],
      conditions: ["Trade Winds", "Tide-dependent spots", "Flat and Small Wave sections"],
      accommodationOptions: [
        "Pousadas",
        "Boutique Hotels",
        "Kite Hostels",
        "Vacation Rentals"
      ],
      foodOptions: [
        "Brazilian BBQ",
        "Seafood",
        "Vegan Cafes",
        "Beachfront Bars"
      ],
      culture:
        "Mix of traditional fishing village with strong kite and windsurf tourism culture. Known for its music, art, and laid-back vibe.",
      averageSchoolCost: 60,
      averageAccommodationCost: 70,
      numberOfSchools: 5
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Peak season with strong consistent trade winds and warm water. One of the best months to visit."
      },
      {
        month: 2,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Wind starts to taper off but still rideable. Less crowded. Some risk of light wind days."
      },
      {
        month: 3,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Off-season. Generally not reliable for kiting. Good for relaxing and exploring."
      },
      {
        month: 4,
        windSpeed: 13,
        windQuality: WindQuality.Poor,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Low wind season. Not recommended for kiting."
      },
      {
        month: 5,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 27,
        seasonalNotes:
          "Wind beginning to return. Still early for kiting but decent off-season conditions."
      },
      {
        month: 6,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 27,
        seasonalNotes:
          "Wind picks up, especially late in the month. Pre-season is good for fewer crowds."
      },
      {
        month: 7,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 27,
        seasonalNotes:
          "Start of the high season with strong daily winds. Great time to kite and explore."
      },
      {
        month: 8,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 32,
        waterTemp: 27,
        seasonalNotes:
          "One of the best months in Jeri with consistent wind and sunny skies."
      },
      {
        month: 9,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 33,
        waterTemp: 27,
        seasonalNotes:
          "Peak wind season. Expect reliable wind every day. Perfect for advanced tricks."
      },
      {
        month: 10,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 33,
        waterTemp: 27,
        seasonalNotes:
          "Still very strong wind. October is prime season for all levels."
      },
      {
        month: 11,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 32,
        waterTemp: 27,
        seasonalNotes:
          "Reliable wind continues, great vibe in the town. One of the most popular months."
      },
      {
        month: 12,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 28,
        seasonalNotes:
          "End of peak season but still strong wind. Holiday vibe adds extra energy to the village."
      }
    ]
  },

  // 8. Cape Town, South Africa
  {
    spot: {
      name: "Cape Town, South Africa",
      country: "South Africa",
      latitude: -33.918861,
      longitude: 18.4233,
      description:
        "Cape Town is a world-renowned kitesurfing destination, particularly known for its strong and consistent summer winds. The city offers a variety of spots suitable for all levels, from flat water lagoons to challenging wave spots.",
      bestMonths: "Nov-Mar",
      tempRange: "20–30°C",
      waveSize: "Flat to Large Waves",
      difficultyLevel: "Intermediate to Advanced",
      localAttractions:
        "Table Mountain, Robben Island, Cape Point, Wine Tours, Vibrant Nightlife",
      tags: ["Strong Winds", "Wave Riding", "Scenic Views", "Diverse Spots"],
      windguruCode: "91",
      kiteSchools: [
        "Kiteboarding Cape Town|https://maps.google.com/?q=Kiteboarding+Cape+Town",
        "High Five Kitesurf School|https://maps.google.com/?q=High+Five+Kitesurf+School",
        "Cape Town Kite Club|https://maps.google.com/?q=Cape+Town+Kite+Club",
        "KiteWorldWide Cape Town|https://maps.google.com/?q=KiteWorldWide+Cape+Town",
        "Kitekahunas|https://maps.google.com/?q=Kitekahunas"
      ],
      conditions: ["Strong SE Trade Winds", "Wave Spots", "Flat Water Lagoons"],
      accommodationOptions: [
        "Beachfront Hotels",
        "Guesthouses",
        "Kite Lodges",
        "Vacation Rentals"
      ],
      foodOptions: [
        "Seafood Restaurants",
        "International Cuisine",
        "Local South African Dishes",
        "Beachfront Cafes"
      ],
      culture:
        "A melting pot of cultures with a rich history, Cape Town offers a vibrant arts scene, diverse culinary experiences, and a laid-back coastal lifestyle.",
      averageSchoolCost: 70,
      averageAccommodationCost: 90,
      numberOfSchools: 5
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 18,
        seasonalNotes:
          "Peak summer season with strong and consistent southeasterly winds, ideal for kitesurfing."
      },
      {
        month: 2,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 18,
        seasonalNotes:
          "Continued strong winds with warm temperatures, perfect for both wave and flat water riding."
      },
      {
        month: 3,
        windSpeed: 22,
        windQuality: WindQuality.Good,
        airTemp: 25,
        waterTemp: 17,
        seasonalNotes:
          "Winds start to decrease slightly but still offer good kiting conditions with fewer crowds."
      },
      {
        month: 4,
        windSpeed: 18,
        windQuality: WindQuality.Moderate,
        airTemp: 23,
        waterTemp: 17,
        seasonalNotes:
          "Transition month with variable wind conditions; some good days for kiting."
      },
      {
        month: 5,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 20,
        waterTemp: 16,
        seasonalNotes:
          "Off-season begins; wind becomes less reliable, but occasional kiting days are possible."
      },
      {
        month: 6,
        windSpeed: 12,
        windQuality: WindQuality.Poor,
        airTemp: 18,
        waterTemp: 15,
        seasonalNotes:
          "Winter season with minimal wind; not ideal for kitesurfing."
      },
      {
        month: 7,
        windSpeed: 12,
        windQuality: WindQuality.Poor,
        airTemp: 17,
        waterTemp: 14,
        seasonalNotes:
          "Continued winter conditions with low wind activity."
      },
      {
        month: 8,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 14,
        seasonalNotes:
          "Wind starts to pick up towards the end of the month; early season kiting possible."
      },
      {
        month: 9,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 20,
        waterTemp: 15,
        seasonalNotes:
          "Spring season with increasing wind reliability; good for early kiting sessions."
      },
      {
        month: 10,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 16,
        seasonalNotes:
          "Pre-summer conditions with strong winds returning; great time to visit before peak season."
      },
      {
        month: 11,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 25,
        waterTemp: 17,
        seasonalNotes:
          "Start of the peak kiting season with consistent strong winds and warm weather."
      },
      {
        month: 12,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 18,
        seasonalNotes:
          "High season continues with excellent wind conditions and festive atmosphere."
      }
    ]
  }
,

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
      localAttractions: "Dolphin watching, Wilpattu National Park safaris, temple visits",
      tags: ["Flatwater", "Remote", "Consistent Wind", "Warm Water"],
      windguruCode: "190458",
      kiteSchools: [
        "KiteCenter Sri Lanka|https://maps.google.com/?q=KiteCenter+Sri+Lanka",
        "Kite Surfing Lanka|https://maps.google.com/?q=Kite+Surfing+Lanka",
        "Ruuk Village Kite School|https://maps.google.com/?q=Ruuk+Village+Kalpitiya",
        "Sri Lanka Kite|https://maps.google.com/?q=Sri+Lanka+Kite",
        "Sun Wind Beach Kite School|https://maps.google.com/?q=Sun+Wind+Beach+Kalpitiya"
      ],
      conditions: [
        "Flatwater Lagoons",
        "Side-onshore Trade Winds",
        "Ocean Swells (optional)"
      ],
      accommodationOptions: [
        "Eco-lodges",
        "Beach Cabins",
        "Kite Camps",
        "Local Guesthouses"
      ],
      foodOptions: [
        "Sri Lankan Curry",
        "Seafood BBQs",
        "Vegetarian Cafes",
        "Kite Camp Dining"
      ],
      culture:
        "Kalpitiya has a small fishing village vibe mixed with growing eco-tourism. Expect a relaxed pace, warm hospitality, and a tight-knit kite community.",
      averageSchoolCost: 55,
      averageAccommodationCost: 60,
      numberOfSchools: 5
    },
    windConditions: [
      {
        month: 1,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Start of the winter season with lighter winds, good for beginners and foiling."
      },
      {
        month: 2,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Consistent thermal winds. One of the most relaxed months to kite with few crowds."
      },
      {
        month: 3,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 31,
        waterTemp: 29,
        seasonalNotes:
          "End of the winter season with fading winds. Still kitable most days."
      },
      {
        month: 4,
        windSpeed: 12,
        windQuality: WindQuality.Poor,
        airTemp: 32,
        waterTemp: 30,
        seasonalNotes:
          "Hot and humid with low wind. Not a great month for kiting in Kalpitiya."
      },
      {
        month: 5,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 31,
        waterTemp: 29,
        seasonalNotes:
          "Kickoff of the main season. Strong side-onshore winds blow daily through the month."
      },
      {
        month: 6,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Prime month with strong, reliable winds and consistent flatwater conditions."
      },
      {
        month: 7,
        windSpeed: 25,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "High season in full force. Ideal for advanced tricks and island downwinders."
      },
      {
        month: 8,
        windSpeed: 24,
        windQuality: WindQuality.Excellent,
        airTemp: 29,
        waterTemp: 28,
        seasonalNotes:
          "Still epic wind and relatively few crowds. Vella Island is often at its best."
      },
      {
        month: 9,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Late-season conditions still strong and reliable. Good time to visit before the monsoon."
      },
      {
        month: 10,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Winds begin to taper. Sessions still possible but not daily."
      },
      {
        month: 11,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Low wind transition month. Some foiling and occasional thermal wind days."
      },
      {
        month: 12,
        windSpeed: 16,
        windQuality: WindQuality.Good,
        airTemp: 30,
        waterTemp: 28,
        seasonalNotes:
          "Start of the winter season with light to moderate winds. Great for beginners and relaxed vibes."
      }
    ]
  }
,

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
        "SoloSports Adventure Holidays|https://maps.google.com/?q=SoloSports+Adventure+Holidays+Punta+San+Carlos|4.9|56"
      ],
      conditions: ["Pacific Swell", "Side-Offshore Winds", "Rocky Shoreline"],
      accommodationOptions: ["On-site camps (SoloSports)", "Van camping"],
      foodOptions: ["Camp kitchens", "BYO supplies"],
      culture: "Off-grid adventure culture with a tight-knit kite and surf community",
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
        seasonalNotes: "Cooler temps and lighter winds make this month less reliable, though swell still rolls in."
      },
      {
        month: 2,
        windSpeed: 15,
        windQuality: WindQuality.Moderate,
        airTemp: 18,
        waterTemp: 15,
        seasonalNotes: "Early springtime brings longer days and building swell, but wind remains hit or miss."
      },
      {
        month: 3,
        windSpeed: 17,
        windQuality: WindQuality.Good,
        airTemp: 19,
        waterTemp: 16,
        seasonalNotes: "Winds start turning on more consistently, with excellent surf potential."
      },
      {
        month: 4,
        windSpeed: 20,
        windQuality: WindQuality.Excellent,
        airTemp: 21,
        waterTemp: 17,
        seasonalNotes: "Kicking off the prime season — strong winds and excellent down-the-line wave conditions."
      },
      {
        month: 5,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 23,
        waterTemp: 18,
        seasonalNotes: "Consistent wind, warm days, and classic Baja swell setups. Camps fill up fast."
      },
      {
        month: 6,
        windSpeed: 23,
        windQuality: WindQuality.Excellent,
        airTemp: 24,
        waterTemp: 19,
        seasonalNotes: "Peak season continues with daily rides and epic waves. Bring your wave kite."
      },
      {
        month: 7,
        windSpeed: 22,
        windQuality: WindQuality.Excellent,
        airTemp: 26,
        waterTemp: 20,
        seasonalNotes: "Strong thermals and solid SSW swell keep sessions reliable and long-lasting."
      },
      {
        month: 8,
        windSpeed: 21,
        windQuality: WindQuality.Excellent,
        airTemp: 27,
        waterTemp: 21,
        seasonalNotes: "Endless rides continue with lighter crowds and warm water. Sunset sessions are gold."
      },
      {
        month: 9,
        windSpeed: 20,
        windQuality: WindQuality.Good,
        airTemp: 26,
        waterTemp: 21,
        seasonalNotes: "Conditions still solid, though wind begins to taper later in the month."
      },
      {
        month: 10,
        windSpeed: 18,
        windQuality: WindQuality.Good,
        airTemp: 24,
        waterTemp: 20,
        seasonalNotes: "End of the prime season with occasional sessions and leftover south swells."
      },
      {
        month: 11,
        windSpeed: 16,
        windQuality: WindQuality.Moderate,
        airTemp: 21,
        waterTemp: 18,
        seasonalNotes: "Shoulder season with mixed results. Good for surf trips with a kite on standby."
      },
      {
        month: 12,
        windSpeed: 14,
        windQuality: WindQuality.Moderate,
        airTemp: 19,
        waterTemp: 17,
        seasonalNotes: "Calm winds and cooler temps make this off-season, though still stunning for adventure camping."
      }
    ]
  }
,

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
      localAttractions: "Cascais old town, Sintra castles and palaces, Lisbon nightlife, Sintra-Cascais Natural Park hiking trails",
      tags: ["wave", "strong wind", "Atlantic", "thermal winds", "shore break"],
      windguruCode: "116",
      kiteSchools: [
        "Gustykite|https://maps.google.com/?q=Gustykite+Guincho|4.9|89",
        "Kite Adventures|https://maps.google.com/?q=Kite+Adventures+Guincho|4.8|76",
        "SBKiteboarding School|https://maps.google.com/?q=SBKiteboarding+School+Guincho|5.0|5",
        "Nortada Aventura|https://maps.google.com/?q=Nortada+Aventura+Kitesurf+Guincho|4.7|62",
        "Ocean Adventure|https://maps.google.com/?q=Ocean+Adventure+Guincho|4.8|54"
      ],
      conditions: ["Atlantic Swell", "Sandy Beach with Rocks", "Cross-shore Wind", "Shore Break", "Strong Thermal Effects"],
      accommodationOptions: ["Beach Hotels", "Surf Hostels", "Boutique Guesthouses", "Vacation Rentals in Cascais"],
      foodOptions: ["Portuguese Seafood", "Tapas Bars", "Local Bakeries", "Beach Restaurants"],
      culture: "Portuguese coastal culture with rich history and laid-back surf vibes",
      averageSchoolCost: 85,
      averageAccommodationCost: 100,
      numberOfSchools: 7,
    },
    windConditions: [
      { month: 1, windSpeed: 14, windQuality: WindQuality.Moderate, airTemp: 15, waterTemp: 15, seasonalNotes: "Off-season. Wind is less reliable but still rideable on good days." },
      { month: 2, windSpeed: 15, windQuality: WindQuality.Moderate, airTemp: 16, waterTemp: 15, seasonalNotes: "Cool temps with chance of Atlantic storms bringing strong gusts." },
      { month: 3, windSpeed: 17, windQuality: WindQuality.Good, airTemp: 17, waterTemp: 16, seasonalNotes: "Spring begins with gradually improving wind consistency." },
      { month: 4, windSpeed: 19, windQuality: WindQuality.Good, airTemp: 19, waterTemp: 17, seasonalNotes: "Reliable winds start kicking in. Conditions improve steadily." },
      { month: 5, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 21, waterTemp: 18, seasonalNotes: "Beginning of peak season with thermal winds and waves." },
      { month: 6, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 24, waterTemp: 19, seasonalNotes: "Strongest and most consistent winds of the year." },
      { month: 7, windSpeed: 25, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 20, seasonalNotes: "Peak kitesurfing season with strong northerlies and clean waves." },
      { month: 8, windSpeed: 23, windQuality: WindQuality.Excellent, airTemp: 27, waterTemp: 20, seasonalNotes: "Continued strong winds with warm water. Busy season." },
      { month: 9, windSpeed: 21, windQuality: WindQuality.Good, airTemp: 25, waterTemp: 20, seasonalNotes: "Season starts winding down but still great conditions." },
      { month: 10, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 22, waterTemp: 19, seasonalNotes: "Mellow vibes, still ridable winds and fewer crowds." },
      { month: 11, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 18, waterTemp: 17, seasonalNotes: "Wind becomes less predictable. Wetsuits needed." },
      { month: 12, windSpeed: 14, windQuality: WindQuality.Moderate, airTemp: 16, waterTemp: 16, seasonalNotes: "Off-season but possible sessions when storms roll in." }
    ]
  }
,

  // 12. Lefkada, Greece
  {
    spot: {
      name: "Lefkada, Greece",
      country: "Greece",
      latitude: 38.7069,
      longitude: 20.6400,
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
        "Surf Club Lefkada|https://maps.google.com/?q=Surf+Club+Lefkada|4.8|101"
      ],
      conditions: ["Thermal Winds", "Flat Water", "Chop"],
      accommodationOptions: ["Beach Villas", "Apartments", "Kite Hotels"],
      foodOptions: ["Greek Taverns", "Beach Bars", "Seafood Restaurants"],
      culture: "Greek island lifestyle with relaxed vibes and strong hospitality",
      averageSchoolCost: 70,
      averageAccommodationCost: 95,
      numberOfSchools: 4,
    },
    windConditions: [
      { month: 1, windSpeed: 13, windQuality: WindQuality.Moderate, airTemp: 13, waterTemp: 15, seasonalNotes: "Winter with weak wind and cooler temps. Not recommended." },
      { month: 2, windSpeed: 14, windQuality: WindQuality.Moderate, airTemp: 14, waterTemp: 15, seasonalNotes: "Light winds continue. Early season kiters may find some days." },
      { month: 3, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 16, waterTemp: 16, seasonalNotes: "Season slowly begins with occasional thermals." },
      { month: 4, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 18, waterTemp: 17, seasonalNotes: "Thermal winds becoming more consistent. Great for early season trips." },
      { month: 5, windSpeed: 20, windQuality: WindQuality.Excellent, airTemp: 21, waterTemp: 19, seasonalNotes: "Reliable thermal winds, warm weather, and flat water. Peak season starts." },
      { month: 6, windSpeed: 21, windQuality: WindQuality.Excellent, airTemp: 25, waterTemp: 22, seasonalNotes: "Ideal kiting with strong thermals and lively beach scene." },
      { month: 7, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 28, waterTemp: 24, seasonalNotes: "Prime conditions for all levels. Consistent thermal winds daily." },
      { month: 8, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 29, waterTemp: 25, seasonalNotes: "Still excellent conditions. Slightly more crowded beaches." },
      { month: 9, windSpeed: 20, windQuality: WindQuality.Excellent, airTemp: 27, waterTemp: 24, seasonalNotes: "Great winds and fewer crowds. Excellent time to visit." },
      { month: 10, windSpeed: 17, windQuality: WindQuality.Good, airTemp: 22, waterTemp: 22, seasonalNotes: "Thermals begin fading. Still kitable with good planning." },
      { month: 11, windSpeed: 15, windQuality: WindQuality.Moderate, airTemp: 18, waterTemp: 20, seasonalNotes: "Unpredictable wind. Off-season for most kiters." },
      { month: 12, windSpeed: 13, windQuality: WindQuality.Moderate, airTemp: 14, waterTemp: 17, seasonalNotes: "Low wind and chilly. Not ideal for kiting." }
    ]
  }
,

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
      localAttractions: "Le Morne Brabant mountain hiking, dolphin watching, Black River Gorges National Park, Seven Colored Earths of Chamarel",
      tags: ["flat water", "world-class waves", "reliable wind", "shallow lagoon", "tropical"],
      windguruCode: "48",
      kiteSchools: [
        "Le Morne Kite School|https://maps.google.com/?q=Le+Morne+Kite+School|4.9|128",
        "Airswitch Kitesurfing Mauritius|https://maps.google.com/?q=Airswitch+Kitesurfing+Mauritius|4.8|242",
        "ION Club Le Morne|https://maps.google.com/?q=ION+Club+Le+Morne|4.7|165",
        "Kite Camp Mauritius|https://maps.google.com/?q=Kite+Camp+Mauritius|4.8|95",
        "Hang Loose Tours|https://maps.google.com/?q=Hang+Loose+Tours+Mauritius|4.7|82"
      ],
      conditions: ["Shallow Lagoon", "Flat Water", "World-Class Waves", "Coral Reef"],
      accommodationOptions: ["Luxury Beachfront Resorts", "Guesthouses in La Gaulette", "Vacation Rentals", "Kite Camps"],
      foodOptions: ["Mauritian Creole Cuisine", "Seafood Restaurants", "Indian Food", "Beach Bars", "Resort Dining"],
      culture: "Vibrant multicultural blend of Creole, French, Indian and Chinese influences with multiple languages spoken throughout the island",
      averageSchoolCost: 70,
      averageAccommodationCost: 95,
      numberOfSchools: 10,
    },
    windConditions: [
      { month: 1, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 30, waterTemp: 28, seasonalNotes: "Summer season with lighter but consistent thermal winds. Less crowded beaches." },
      { month: 2, windSpeed: 15, windQuality: WindQuality.Poor, airTemp: 30, waterTemp: 29, seasonalNotes: "Hottest month with inconsistent winds. Occasional rain and potential cyclone risk." },
      { month: 3, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 29, waterTemp: 28, seasonalNotes: "End of summer with improving conditions. Light thermal winds beginning to establish." },
      { month: 4, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 27, waterTemp: 27, seasonalNotes: "Start of winter season with trade winds beginning. Conditions improving steadily." },
      { month: 5, windSpeed: 20, windQuality: WindQuality.Good, airTemp: 25, waterTemp: 26, seasonalNotes: "Trade winds becoming more reliable with comfortable temperatures." },
      { month: 6, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 23, waterTemp: 24, seasonalNotes: "Consistent strong southeast trade winds. Perfect conditions with fewer tourists." },
      { month: 7, windSpeed: 25, windQuality: WindQuality.Excellent, airTemp: 22, waterTemp: 23, seasonalNotes: "Peak wind season with strongest and most reliable winds. Can reach 35 knots on some days." },
      { month: 8, windSpeed: 24, windQuality: WindQuality.Excellent, airTemp: 22, waterTemp: 23, seasonalNotes: "Continued excellent conditions with strong trade winds. Good wave conditions." },
      { month: 9, windSpeed: 21, windQuality: WindQuality.Excellent, airTemp: 23, waterTemp: 23, seasonalNotes: "Strong reliable winds continue with best wave conditions. Great for wave riders." },
      { month: 10, windSpeed: 20, windQuality: WindQuality.Good, airTemp: 25, waterTemp: 24, seasonalNotes: "End of peak season but still reliable winds and good conditions." },
      { month: 11, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 27, waterTemp: 25, seasonalNotes: "Transition to summer with gradually decreasing wind reliability but still good sessions possible." },
      { month: 12, windSpeed: 16, windQuality: WindQuality.Moderate, airTemp: 29, waterTemp: 27, seasonalNotes: "Beginning of summer with lighter thermal winds. Less consistent but still rideable on good days." }
    ]
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
      localAttractions: "Red Sand Dunes, White Sand Dunes, Fairy Stream, Mui Ne Fishing Village, Ta Cu Mountain, Poshanu Cham Towers",
      tags: ["budget friendly", "consistent wind", "thermal winds", "beach break", "warm water"],
      windguruCode: "523",
      kiteSchools: [
        "C2Sky Kitecenter|https://maps.google.com/?q=C2Sky+Kitecenter+Mui+Ne|4.9|256",
        "Vietnam Kiteboarding School (VKS)|https://maps.google.com/?q=Vietnam+Kiteboarding+School+Mui+Ne|4.8|210",
        "Mui Ne Kitesurf School|https://maps.google.com/?q=Mui+Ne+Kitesurf+School|4.8|175",
        "Surfpoint Vietnam|https://maps.google.com/?q=Surfpoint+Vietnam+Mui+Ne|4.7|124",
        "KiteVietnam School|https://maps.google.com/?q=KiteVietnam+School+Mui+Ne|4.7|95"
      ],
      conditions: ["Side-shore Winds", "Morning Flat Water", "Afternoon Chop", "Shore Break", "Sandy Bottom"],
      accommodationOptions: ["Beachfront Resorts", "Budget Guesthouses", "Boutique Hotels", "Hostels"],
      foodOptions: ["Vietnamese Cuisine", "Seafood Restaurants", "International Dining", "Street Food", "Beach Bars"],
      culture: "Blend of traditional Vietnamese fishing culture and growing international tourism scene with Russian and European influences",
      averageSchoolCost: 45,
      averageAccommodationCost: 40,
      numberOfSchools: 8,
    },
    windConditions: [
      { month: 1, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 25, waterTemp: 25, seasonalNotes: "Peak season with strong, reliable Northeast monsoon winds. Perfect conditions for all levels." },
      { month: 2, windSpeed: 23, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 25, seasonalNotes: "One of the best months with consistent strong winds (18-25 knots) and comfortable temperatures." },
      { month: 3, windSpeed: 20, windQuality: WindQuality.Excellent, airTemp: 28, waterTemp: 26, seasonalNotes: "End of high season with still reliable winds. Less crowded beaches and excellent conditions." },
      { month: 4, windSpeed: 16, windQuality: WindQuality.Good, airTemp: 29, waterTemp: 27, seasonalNotes: "Transition month with decreasing winds. Morning sessions best before afternoon thermal winds." },
      { month: 5, windSpeed: 13, windQuality: WindQuality.Moderate, airTemp: 30, waterTemp: 28, seasonalNotes: "Beginning of summer season with lighter southerly winds. Good for beginners and foiling." },
      { month: 6, windSpeed: 12, windQuality: WindQuality.Moderate, airTemp: 30, waterTemp: 28, seasonalNotes: "Summer season with consistent but lighter winds (10-14 knots). Afternoon thermal winds provide good sessions." },
      { month: 7, windSpeed: 12, windQuality: WindQuality.Moderate, airTemp: 29, waterTemp: 28, seasonalNotes: "Summer season continues with reliable afternoon thermal winds. Good for larger kites and beginners." },
      { month: 8, windSpeed: 13, windQuality: WindQuality.Moderate, airTemp: 29, waterTemp: 28, seasonalNotes: "Similar conditions to July with afternoon thermal winds. Less crowded than winter months." },
      { month: 9, windSpeed: 14, windQuality: WindQuality.Moderate, airTemp: 28, waterTemp: 28, seasonalNotes: "Last month of summer season with gradually improving wind conditions." },
      { month: 10, windSpeed: 17, windQuality: WindQuality.Good, airTemp: 27, waterTemp: 27, seasonalNotes: "Transition to winter season with increasing Northeast winds. Good conditions with fewer tourists." },
      { month: 11, windSpeed: 20, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 26, seasonalNotes: "Start of high season with strong Northeast monsoon winds. Excellent kitesurfing conditions beginning." },
      { month: 12, windSpeed: 21, windQuality: WindQuality.Excellent, airTemp: 25, waterTemp: 25, seasonalNotes: "High season with strong, consistent winds. Perfect conditions but beaches can be crowded." }
    ]
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
      localAttractions: "Marsala historic center, Trapani, Egadi Islands, Salt pans, Sicilian wine tasting, Erice medieval town, Segesta archaeological site",
      tags: ["shallow water", "flat water", "thermal winds", "lagoon", "beginner friendly"],
      windguruCode: "257",
      kiteSchools: [
        "Follow The Wind Kitesurf Sicily|https://maps.google.com/?q=Follow+The+Wind+Kitesurf+Sicily|4.9|187",
        "Flow Kite School Sicily|https://maps.google.com/?q=Flow+Kite+School+Sicily|4.8|164",
        "Sicily Kite School|https://maps.google.com/?q=Sicily+Kite+School+Lo+Stagnone|4.8|152",
        "KiteLab Sicily|https://maps.google.com/?q=KiteLab+Sicily|4.9|143",
        "Kite Me Up|https://maps.google.com/?q=Kite+Me+Up+Sicily|4.7|137"
      ],
      conditions: ["Flat Water", "Shallow Lagoon", "Thermal Winds", "Standing Depth", "No Obstacles"],
      accommodationOptions: ["Beachfront Resorts", "B&Bs", "Vacation Rentals", "Kitesurfing Camps", "Hotels in Marsala"],
      foodOptions: ["Sicilian Cuisine", "Fresh Seafood", "Local Wines", "Beach Bars", "Traditional Trattorias"],
      culture: "Traditional Sicilian with a mix of Arab, Norman, and Mediterranean influences. Famous for wine production, salt pans, and relaxed Mediterranean lifestyle",
      averageSchoolCost: 60,
      averageAccommodationCost: 70,
      numberOfSchools: 15,
    },
    windConditions: [
      { month: 1, windSpeed: 10, windQuality: WindQuality.Poor, airTemp: 14, waterTemp: 15, seasonalNotes: "Off-season with inconsistent winds. Some schools closed. Can get occasional good days." },
      { month: 2, windSpeed: 12, windQuality: WindQuality.Poor, airTemp: 15, waterTemp: 15, seasonalNotes: "Still off-season with improving conditions toward the end of month. Most schools still closed." },
      { month: 3, windSpeed: 14, windQuality: WindQuality.Moderate, airTemp: 17, waterTemp: 16, seasonalNotes: "Start of the kitesurfing season. Most schools open. Wind becoming more reliable." },
      { month: 4, windSpeed: 16, windQuality: WindQuality.Good, airTemp: 19, waterTemp: 18, seasonalNotes: "Good conditions with reliable winds. Not crowded yet. Pleasant temperatures." },
      { month: 5, windSpeed: 18, windQuality: WindQuality.Good, airTemp: 22, waterTemp: 20, seasonalNotes: "Excellent wind conditions with warm temperatures. Season in full swing." },
      { month: 6, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 26, waterTemp: 23, seasonalNotes: "Peak season begins. Thermal winds very reliable. Perfect flat water conditions." },
      { month: 7, windSpeed: 23, windQuality: WindQuality.Excellent, airTemp: 29, waterTemp: 25, seasonalNotes: "Strong, reliable thermal winds. Peak season with warm water. Can get crowded." },
      { month: 8, windSpeed: 22, windQuality: WindQuality.Excellent, airTemp: 30, waterTemp: 26, seasonalNotes: "Busiest month with strongest thermal winds. Consistent 15-25 knots almost daily." },
      { month: 9, windSpeed: 19, windQuality: WindQuality.Good, airTemp: 27, waterTemp: 25, seasonalNotes: "Still excellent conditions with fewer crowds as peak season winds down." },
      { month: 10, windSpeed: 16, windQuality: WindQuality.Good, airTemp: 23, waterTemp: 22, seasonalNotes: "Good wind conditions continue. Pleasant temperatures and fewer tourists." },
      { month: 11, windSpeed: 13, windQuality: WindQuality.Moderate, airTemp: 19, waterTemp: 19, seasonalNotes: "End of the regular season. Wind becoming less reliable but still kiteable days." },
      { month: 12, windSpeed: 11, windQuality: WindQuality.Poor, airTemp: 15, waterTemp: 16, seasonalNotes: "Off-season. Many schools closed. Occasional good days possible." }
    ]
  },
];
