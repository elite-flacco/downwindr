import { pgTable, text, serial, integer, boolean, real, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Main spots table
export const spots = pgTable("spots", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  description: text("description").notNull(),
  waveSize: text("wave_size").notNull(), // Small, Medium, Strong, Varied
  tempRange: text("temp_range").notNull(), // Temperature range in Celsius
  bestMonths: text("best_months").notNull(), // e.g. "Dec-Mar"
  localAttractions: text("local_attractions").notNull(),
  tags: text("tags").array().notNull(), // Array of tags
  windguruCode: text("windguru_code"), // Windguru spot code for direct linking
  kiteSchools: text("kite_schools").array(), // Array of kite school names and their Google Maps links
  difficultyLevel: text("difficulty_level"), // Beginner, Intermediate, Advanced, All Levels
  conditions: text("conditions").array(), // Array of conditions like "Gusty", "Sandy Bottom", "Reef", etc.
  accommodationOptions: text("accommodation_options").array(), // Array of accommodation types
  foodOptions: text("food_options").array(), // Array of food options
  culture: text("culture"), // Description of local culture
  averageSchoolCost: real("average_school_cost"), // Average cost in USD
  averageAccommodationCost: real("average_accommodation_cost"), // Average cost in USD per night
  numberOfSchools: integer("number_of_schools"), // Number of kite schools in the area
});

// Monthly wind conditions for each spot
export const windConditions = pgTable("wind_conditions", {
  id: serial("id").primaryKey(),
  spotId: integer("spot_id").notNull().references(() => spots.id),
  month: integer("month").notNull(), // 1-12 for Jan-Dec
  windSpeed: real("wind_speed").notNull(), // Average wind speed in knots
  windQuality: text("wind_quality").notNull(), // "Poor", "Moderate", "Good", "Excellent"
  airTemp: real("air_temp"), // Average air temperature in Celsius
  waterTemp: real("water_temp"), // Average water temperature in Celsius
  seasonalNotes: text("seasonal_notes"), // Any seasonal specific notes
});

// Insert schemas
export const insertSpotSchema = createInsertSchema(spots).pick({
  name: true,
  country: true,
  latitude: true,
  longitude: true,
  description: true,
  waveSize: true,
  tempRange: true,
  bestMonths: true,
  localAttractions: true,
  tags: true,
  windguruCode: true,
  kiteSchools: true,
  difficultyLevel: true,
  conditions: true,
  accommodationOptions: true,
  foodOptions: true,
  culture: true,
  averageSchoolCost: true,
  averageAccommodationCost: true,
  numberOfSchools: true,
});

export const insertWindConditionSchema = createInsertSchema(windConditions).pick({
  spotId: true,
  month: true,
  windSpeed: true,
  windQuality: true,
  airTemp: true,
  waterTemp: true,
  seasonalNotes: true,
});

// Types
export type Spot = typeof spots.$inferSelect;
export type InsertSpot = z.infer<typeof insertSpotSchema>;
export type WindCondition = typeof windConditions.$inferSelect;
export type InsertWindCondition = z.infer<typeof insertWindConditionSchema>;

// Enum for wind quality
export enum WindQuality {
  Poor = "Poor",
  Moderate = "Moderate",
  Good = "Good",
  Excellent = "Excellent",
}

// MonthNames for easy reference
export const MonthNames = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", 
  "September", "October", "November", "December"
];

// Extended types for frontend
export type SpotWithWindConditions = Spot & {
  windConditions: WindCondition[];
};
