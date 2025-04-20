import { 
  spots, windConditions, 
  type Spot, type InsertSpot, 
  type WindCondition, type InsertWindCondition,
  WindQuality, MonthNames
} from "@shared/schema";

export interface IStorage {
  // Spot operations
  getAllSpots(): Promise<Spot[]>;
  getSpotById(id: number): Promise<Spot | undefined>;
  getSpotsByMonth(month: number): Promise<Spot[]>;
  getSpotWithWindConditions(id: number): Promise<{spot: Spot, windConditions: WindCondition[]} | undefined>;
  searchSpots(query: string): Promise<Spot[]>;
  createSpot(spot: InsertSpot): Promise<Spot>;
  
  // Wind conditions operations
  getWindConditionsForSpot(spotId: number): Promise<WindCondition[]>;
  getWindConditionBySpotAndMonth(spotId: number, month: number): Promise<WindCondition | undefined>;
  createWindCondition(windCondition: InsertWindCondition): Promise<WindCondition>;
}

export class MemStorage implements IStorage {
  private spots: Map<number, Spot>;
  private windConditions: Map<number, WindCondition>;
  private currentSpotId: number;
  private currentWindConditionId: number;

  constructor() {
    this.spots = new Map();
    this.windConditions = new Map();
    this.currentSpotId = 1;
    this.currentWindConditionId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // Spot operations
  async getAllSpots(): Promise<Spot[]> {
    return Array.from(this.spots.values());
  }

  async getSpotById(id: number): Promise<Spot | undefined> {
    return this.spots.get(id);
  }

  async getSpotsByMonth(month: number): Promise<Spot[]> {
    const goodSpotIds = new Set<number>();
    
    // Get all wind conditions for the specified month
    const conditions = Array.from(this.windConditions.values()).filter(
      condition => condition.month === month
    );
    
    // Filter for good or excellent wind conditions
    conditions.forEach(condition => {
      if (
        condition.windQuality === WindQuality.Good ||
        condition.windQuality === WindQuality.Excellent
      ) {
        goodSpotIds.add(condition.spotId);
      }
    });
    
    // Get the spots with good conditions
    return Array.from(this.spots.values()).filter(
      spot => goodSpotIds.has(spot.id)
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

export const storage = new MemStorage();
