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
    const spot: Spot = { ...insertSpot, id };
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
    const windCondition: WindCondition = { ...insertCondition, id };
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
      tags: ["Beginner Friendly", "Sandy Beach", "Rentals Available"]
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
      tags: ["Advanced", "Waves", "Scenic Views"]
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
      tags: ["Caribbean", "Nightlife", "All Levels"]
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
      tags: ["Advanced", "Waves", "Scenic Views"]
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
      tags: ["Warm Water", "Cultural Experience", "Beginner Friendly"]
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
      tags: ["Cultural Experience", "Historic City", "Consistent Winds"]
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
    const spot: Spot = { ...data, id };
    this.spots.set(id, spot);
    return spot;
  }

  // Helper to add monthly wind conditions for a spot
  private addWindConditionsForSpot(spotId: number) {
    // Pattern depends on the spot
    let windPattern: { speed: number, quality: WindQuality }[] = [];
    
    switch(spotId) {
      case 1: // Tarifa
        windPattern = [
          { speed: 22, quality: WindQuality.Excellent }, // Jan
          { speed: 20, quality: WindQuality.Excellent }, // Feb
          { speed: 18, quality: WindQuality.Good }, // Mar
          { speed: 15, quality: WindQuality.Moderate }, // Apr
          { speed: 14, quality: WindQuality.Moderate }, // May
          { speed: 12, quality: WindQuality.Poor }, // Jun
          { speed: 10, quality: WindQuality.Poor }, // Jul
          { speed: 11, quality: WindQuality.Poor }, // Aug
          { speed: 13, quality: WindQuality.Moderate }, // Sep
          { speed: 15, quality: WindQuality.Moderate }, // Oct
          { speed: 18, quality: WindQuality.Good }, // Nov
          { speed: 21, quality: WindQuality.Excellent }, // Dec
        ];
        break;
      case 2: // Cape Town
        windPattern = [
          { speed: 25, quality: WindQuality.Excellent }, // Jan
          { speed: 23, quality: WindQuality.Excellent }, // Feb
          { speed: 18, quality: WindQuality.Good }, // Mar
          { speed: 15, quality: WindQuality.Moderate }, // Apr
          { speed: 12, quality: WindQuality.Poor }, // May
          { speed: 10, quality: WindQuality.Poor }, // Jun
          { speed: 10, quality: WindQuality.Poor }, // Jul
          { speed: 12, quality: WindQuality.Poor }, // Aug
          { speed: 14, quality: WindQuality.Moderate }, // Sep
          { speed: 18, quality: WindQuality.Good }, // Oct
          { speed: 22, quality: WindQuality.Excellent }, // Nov
          { speed: 24, quality: WindQuality.Excellent }, // Dec
        ];
        break;
      case 3: // Cabarete
        windPattern = [
          { speed: 18, quality: WindQuality.Good }, // Jan
          { speed: 18, quality: WindQuality.Good }, // Feb
          { speed: 16, quality: WindQuality.Moderate }, // Mar
          { speed: 17, quality: WindQuality.Good }, // Apr
          { speed: 18, quality: WindQuality.Good }, // May
          { speed: 20, quality: WindQuality.Excellent }, // Jun
          { speed: 20, quality: WindQuality.Excellent }, // Jul
          { speed: 18, quality: WindQuality.Good }, // Aug
          { speed: 16, quality: WindQuality.Moderate }, // Sep
          { speed: 15, quality: WindQuality.Moderate }, // Oct
          { speed: 16, quality: WindQuality.Moderate }, // Nov
          { speed: 17, quality: WindQuality.Good }, // Dec
        ];
        break;
      case 4: // Maui
        windPattern = [
          { speed: 15, quality: WindQuality.Moderate }, // Jan
          { speed: 16, quality: WindQuality.Moderate }, // Feb
          { speed: 18, quality: WindQuality.Good }, // Mar
          { speed: 20, quality: WindQuality.Excellent }, // Apr
          { speed: 22, quality: WindQuality.Excellent }, // May
          { speed: 22, quality: WindQuality.Excellent }, // Jun
          { speed: 21, quality: WindQuality.Excellent }, // Jul
          { speed: 20, quality: WindQuality.Excellent }, // Aug
          { speed: 18, quality: WindQuality.Good }, // Sep
          { speed: 17, quality: WindQuality.Good }, // Oct
          { speed: 15, quality: WindQuality.Moderate }, // Nov
          { speed: 14, quality: WindQuality.Moderate }, // Dec
        ];
        break;
      case 5: // Zanzibar
        windPattern = [
          { speed: 20, quality: WindQuality.Excellent }, // Jan
          { speed: 19, quality: WindQuality.Good }, // Feb
          { speed: 18, quality: WindQuality.Good }, // Mar
          { speed: 14, quality: WindQuality.Moderate }, // Apr
          { speed: 12, quality: WindQuality.Poor }, // May
          { speed: 17, quality: WindQuality.Good }, // Jun
          { speed: 19, quality: WindQuality.Good }, // Jul
          { speed: 18, quality: WindQuality.Good }, // Aug
          { speed: 16, quality: WindQuality.Moderate }, // Sep
          { speed: 14, quality: WindQuality.Moderate }, // Oct
          { speed: 16, quality: WindQuality.Moderate }, // Nov
          { speed: 19, quality: WindQuality.Good }, // Dec
        ];
        break;
      case 6: // Essaouira
        windPattern = [
          { speed: 14, quality: WindQuality.Moderate }, // Jan
          { speed: 15, quality: WindQuality.Moderate }, // Feb
          { speed: 17, quality: WindQuality.Good }, // Mar
          { speed: 19, quality: WindQuality.Good }, // Apr
          { speed: 22, quality: WindQuality.Excellent }, // May
          { speed: 24, quality: WindQuality.Excellent }, // Jun
          { speed: 25, quality: WindQuality.Excellent }, // Jul
          { speed: 25, quality: WindQuality.Excellent }, // Aug
          { speed: 21, quality: WindQuality.Excellent }, // Sep
          { speed: 17, quality: WindQuality.Good }, // Oct
          { speed: 15, quality: WindQuality.Moderate }, // Nov
          { speed: 14, quality: WindQuality.Moderate }, // Dec
        ];
        break;
      default:
        // Default random pattern
        windPattern = Array(12).fill(0).map((_, i) => {
          const speed = 10 + Math.floor(Math.random() * 15);
          let quality = WindQuality.Poor;
          if (speed > 20) quality = WindQuality.Excellent;
          else if (speed > 17) quality = WindQuality.Good;
          else if (speed > 14) quality = WindQuality.Moderate;
          return { speed, quality };
        });
    }
    
    // Create wind conditions for each month
    for (let month = 1; month <= 12; month++) {
      const pattern = windPattern[month - 1];
      this.createWindCondition({
        spotId,
        month,
        windSpeed: pattern.speed,
        windQuality: pattern.quality
      });
    }
  }
}

export const storage = new MemStorage();
