import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { MonthNames } from "@shared/schema";

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

  // Get Mapbox access token
  app.get("/api/mapbox-token", (req, res) => {
    if (!process.env.MAPBOX_ACCESS_TOKEN) {
      return res.status(500).json({ message: 'Mapbox token not configured' });
    }
    res.json({ token: process.env.MAPBOX_ACCESS_TOKEN });
  });

  return httpServer;
}
