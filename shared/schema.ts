import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
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
});

// Monthly wind conditions for each spot
export const windConditions = pgTable("wind_conditions", {
  id: serial("id").primaryKey(),
  spotId: integer("spot_id").notNull().references(() => spots.id),
  month: integer("month").notNull(), // 1-12 for Jan-Dec
  windSpeed: real("wind_speed").notNull(), // Average wind speed in knots
  windQuality: text("wind_quality").notNull(), // "Poor", "Moderate", "Good", "Excellent"
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
});

export const insertWindConditionSchema = createInsertSchema(windConditions).pick({
  spotId: true,
  month: true,
  windSpeed: true,
  windQuality: true,
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
