import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage, UserPreferences } from "./storage";
import { z } from "zod";
import { MonthNames } from "@shared/schema";

// Define user preferences schema for validation
const userPreferencesSchema = z.object({
  windSpeedMin: z.number().min(5).max(35),
  windSpeedMax: z.number().min(5).max(35),
  temperature: z.enum(["cold", "moderate", "warm", "hot"]),
  difficulty: z.string(),
  budget: z.enum(["budget", "moderate", "luxury"]),
  preferredRegion: z.string(),
  hasKiteSchools: z.boolean(),
  preferWaves: z.boolean(),
  foodOptions: z.boolean(),
  culture: z.boolean(),
  month: z.number().min(1).max(12)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // HTTP server
  const httpServer = createServer(app);

  // Get all spots
  app.get("/api/spots", async (req, res) => {
    try {
      const spots = await storage.getAllSpots();
      res.json(spots);
    } catch (error) {
      res.status(500).json({ message: "Error fetching spots" });
    }
  });

  // Get spots by month
  app.get("/api/spots/month/:month", async (req, res) => {
    try {
      const monthParam = req.params.month;
      
      // Parse month parameter
      let monthNumber: number;
      
      // Handle both numeric and string month names
      if (/^\d+$/.test(monthParam)) {
        monthNumber = parseInt(monthParam, 10);
      } else {
        const monthIndex = MonthNames.findIndex(
          (name) => name.toLowerCase() === monthParam.toLowerCase()
        );
        if (monthIndex === -1) {
          return res.status(400).json({ message: "Invalid month name" });
        }
        monthNumber = monthIndex + 1; // Month numbers are 1-based
      }
      
      // Validate month number
      if (monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ message: "Month must be between 1 and 12" });
      }
      
      const spots = await storage.getSpotsByMonth(monthNumber);
      res.json(spots);
    } catch (error) {
      res.status(500).json({ message: "Error fetching spots by month" });
    }
  });

  // Get spot by ID with wind conditions
  app.get("/api/spots/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid spot ID" });
      }
      
      const spotData = await storage.getSpotWithWindConditions(id);
      if (!spotData) {
        return res.status(404).json({ message: "Spot not found" });
      }
      
      res.json(spotData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching spot details" });
    }
  });

  // Search spots by name or country
  app.get("/api/spots/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const spots = await storage.searchSpots(query);
      res.json(spots);
    } catch (error) {
      res.status(500).json({ message: "Error searching spots" });
    }
  });

  // Get wind conditions for a spot
  app.get("/api/spots/:id/wind-conditions", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid spot ID" });
      }
      
      const spot = await storage.getSpotById(id);
      if (!spot) {
        return res.status(404).json({ message: "Spot not found" });
      }
      
      const windConditions = await storage.getWindConditionsForSpot(id);
      res.json(windConditions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching wind conditions" });
    }
  });

  // Get multiple spots by IDs for comparison
  app.post("/api/spots/details", async (req, res) => {
    try {
      const schema = z.object({
        ids: z.array(z.number())
      });
      
      const parseResult = schema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid request body", 
          errors: parseResult.error.errors 
        });
      }
      
      const { ids } = parseResult.data;
      if (!ids.length) {
        return res.status(400).json({ message: "At least one spot ID is required" });
      }
      
      const promises = ids.map(id => storage.getSpotWithWindConditions(id));
      const results = await Promise.all(promises);
      
      // Filter out any null results (spots not found)
      const validResults = results.filter(result => result !== undefined);
      
      res.json(validResults);
    } catch (error) {
      res.status(500).json({ message: "Error fetching multiple spots" });
    }
  });
  
  // Get Mapbox access token
  app.get("/api/mapbox-token", (req, res) => {
    if (!process.env.MAPBOX_ACCESS_TOKEN) {
      return res.status(500).json({ message: 'Mapbox token not configured' });
    }
    res.json({ token: process.env.MAPBOX_ACCESS_TOKEN });
  });
  
  // Get recommended spots based on user preferences
  app.post("/api/spots/recommendations", async (req, res) => {
    try {
      const parseResult = userPreferencesSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid preferences data", 
          errors: parseResult.error.errors 
        });
      }
      
      const preferences: UserPreferences = parseResult.data;
      
      // Validate that min wind speed is less than max wind speed
      if (preferences.windSpeedMin > preferences.windSpeedMax) {
        return res.status(400).json({ 
          message: "Invalid wind speed range: minimum must be less than maximum" 
        });
      }
      
      const recommendedSpots = await storage.getRecommendedSpots(preferences);
      res.json(recommendedSpots);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({ message: "Error fetching spot recommendations" });
    }
  });

  return httpServer;
}
