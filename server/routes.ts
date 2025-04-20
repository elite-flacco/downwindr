import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage, UserPreferences } from "./storage";
import { z } from "zod";
import { MonthNames, insertReviewSchema, insertRatingSchema } from "@shared/schema";
import { setupAuth } from "./auth";

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

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
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
      
      console.log(`Getting spots for month: ${monthNumber}`);
      const spots = await storage.getSpotsByMonth(monthNumber);
      console.log(`Found ${spots.length} spots for month ${monthNumber}`);
      
      return res.json(spots);
    } catch (error) {
      console.error("Error in /api/spots/month/:month route:", error);
      
      // If no spots are found, return an empty array rather than an error
      if (error instanceof Error) {
        return res.status(500).json({ 
          message: "Error fetching spots by month",
          error: error.message
        });
      }
      
      return res.status(500).json({ message: "Error fetching spots by month" });
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

  // Get spot with reviews and ratings
  app.get("/api/spots/:id/details", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid spot ID" });
      }
      
      const spotDetails = await storage.getSpotWithReviewsAndRatings(id);
      if (!spotDetails) {
        return res.status(404).json({ message: "Spot not found" });
      }
      
      res.json(spotDetails);
    } catch (error) {
      res.status(500).json({ message: "Error fetching spot details with reviews and ratings" });
    }
  });

  // Get reviews for a spot
  app.get("/api/spots/:id/reviews", async (req, res) => {
    try {
      const spotId = parseInt(req.params.id, 10);
      if (isNaN(spotId)) {
        return res.status(400).json({ message: "Invalid spot ID" });
      }
      
      const reviews = await storage.getReviewsForSpot(spotId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reviews" });
    }
  });

  // Create a review (requires authentication)
  app.post("/api/reviews", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as Express.User).id;
      
      // Create review schema with required userId
      const reviewSchema = insertReviewSchema.extend({
        spotId: z.number()
      });
      
      // Parse request body
      const parseResult = reviewSchema.safeParse({
        ...req.body,
        userId
      });
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid review data", 
          errors: parseResult.error.errors 
        });
      }
      
      // Check if user already has a review for this spot
      const existingReview = await storage.getReviewByUserAndSpot(userId, parseResult.data.spotId);
      if (existingReview) {
        return res.status(400).json({ 
          message: "You already reviewed this spot. Try updating your existing review." 
        });
      }
      
      const review = await storage.createReview(parseResult.data);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Error creating review" });
    }
  });

  // Update a review (requires authentication)
  app.put("/api/reviews/:id", isAuthenticated, async (req, res) => {
    try {
      const reviewId = parseInt(req.params.id, 10);
      if (isNaN(reviewId)) {
        return res.status(400).json({ message: "Invalid review ID" });
      }
      
      // Validate content
      const { content } = req.body;
      if (typeof content !== 'string' || content.trim().length === 0) {
        return res.status(400).json({ message: "Review content is required" });
      }
      
      const updatedReview = await storage.updateReview(reviewId, content);
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.json(updatedReview);
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ message: "Error updating review" });
    }
  });

  // Delete a review (requires authentication)
  app.delete("/api/reviews/:id", isAuthenticated, async (req, res) => {
    try {
      const reviewId = parseInt(req.params.id, 10);
      if (isNaN(reviewId)) {
        return res.status(400).json({ message: "Invalid review ID" });
      }
      
      const success = await storage.deleteReview(reviewId);
      if (!success) {
        return res.status(404).json({ message: "Review not found or already deleted" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Error deleting review" });
    }
  });

  // Get user's rating for a specific spot
  app.get("/api/spots/:id/ratings/user", isAuthenticated, async (req, res) => {
    try {
      const spotId = parseInt(req.params.id, 10);
      if (isNaN(spotId)) {
        return res.status(400).json({ message: "Invalid spot ID" });
      }
      
      const userId = (req.user as Express.User).id;
      const rating = await storage.getRatingByUserAndSpot(userId, spotId);
      
      if (!rating) {
        return res.status(404).json({ message: "Rating not found" });
      }
      
      res.json(rating);
    } catch (error) {
      console.error("Error fetching user rating:", error);
      res.status(500).json({ message: "Error fetching user rating" });
    }
  });
  
  // Create or update a rating (requires authentication)
  app.post("/api/ratings", isAuthenticated, async (req, res) => {
    try {
      const userId = (req.user as Express.User).id;
      
      // Rating schema with required userId
      const ratingSchema = insertRatingSchema.extend({
        spotId: z.number(),
        windReliability: z.number().min(1).max(5),
        beginnerFriendly: z.number().min(1).max(5),
        scenery: z.number().min(1).max(5),
        uncrowded: z.number().min(1).max(5),
        localVibe: z.number().min(1).max(5),
        overall: z.number().min(1).max(5)
      });
      
      // Parse request body
      const parseResult = ratingSchema.safeParse({
        ...req.body,
        userId
      });
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: "Invalid rating data", 
          errors: parseResult.error.errors 
        });
      }
      
      // Check if user already has a rating for this spot
      const existingRating = await storage.getRatingByUserAndSpot(userId, parseResult.data.spotId);
      
      let rating;
      if (existingRating) {
        // Update existing rating
        rating = await storage.updateRating(existingRating.id, parseResult.data);
        res.json(rating);
      } else {
        // Create new rating
        rating = await storage.createRating(parseResult.data);
        res.status(201).json(rating);
      }
    } catch (error) {
      console.error("Error creating/updating rating:", error);
      res.status(500).json({ message: "Error saving rating" });
    }
  });

  // Delete a rating (requires authentication)
  app.delete("/api/ratings/:id", isAuthenticated, async (req, res) => {
    try {
      const ratingId = parseInt(req.params.id, 10);
      if (isNaN(ratingId)) {
        return res.status(400).json({ message: "Invalid rating ID" });
      }
      
      const success = await storage.deleteRating(ratingId);
      if (!success) {
        return res.status(404).json({ message: "Rating not found or already deleted" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting rating:", error);
      res.status(500).json({ message: "Error deleting rating" });
    }
  });

  return httpServer;
}
