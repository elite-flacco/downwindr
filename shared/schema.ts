import { pgTable, text, serial, integer, boolean, real, json, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

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
  // spotId: true,
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

// User profiles table (extends Supabase auth.users)
export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // References auth.users.id
  username: text("username").unique(),
  displayName: text("display_name"),
  bio: text("bio"),
  experience: text("experience"), // Beginner, Intermediate, Advanced
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  avatarUrl: text("avatar_url"),
});

// Reviews table for community spot reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  spotId: integer("spot_id").notNull().references(() => spots.id),
  content: text("content").notNull(),
  visitDate: timestamp("visit_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    // Ensure one review per user per spot
    uniqUserSpot: unique().on(table.userId, table.spotId),
  }
});

// Ratings table for community spot ratings
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  spotId: integer("spot_id").notNull().references(() => spots.id),
  windReliability: integer("wind_reliability").notNull(), // 1-5 stars
  beginnerFriendly: integer("beginner_friendly").notNull(), // 1-5 stars
  scenery: integer("scenery").notNull(), // 1-5 stars
  uncrowded: integer("uncrowded").notNull(), // 1-5 stars
  localVibe: integer("local_vibe").notNull(), // 1-5 stars
  overall: integer("overall").notNull(), // 1-5 stars
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => {
  return {
    // Ensure one rating per user per spot
    uniqUserSpot: unique().on(table.userId, table.spotId),
  }
});

// Define relations
export const spotsRelations = relations(spots, ({ many }) => ({
  windConditions: many(windConditions),
  reviews: many(reviews),
  ratings: many(ratings),
}));

export const windConditionsRelations = relations(windConditions, ({ one }) => ({
  spot: one(spots, {
    fields: [windConditions.spotId],
    references: [spots.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  reviews: many(reviews),
  ratings: many(ratings),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  spot: one(spots, {
    fields: [reviews.spotId],
    references: [spots.id],
  }),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
  spot: one(spots, {
    fields: [ratings.spotId],
    references: [spots.id],
  }),
}));

// Extended types for frontend
export type SpotWithWindConditions = Spot & {
  windConditions: WindCondition[];
};

// Define insert schemas for new tables
export const insertUserSchema = createInsertSchema(users).pick({
  id: true,
  username: true,
  displayName: true,
  bio: true,
  experience: true,
  avatarUrl: true,
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  userId: true,
  spotId: true,
  content: true,
  visitDate: true,
});

export const insertRatingSchema = createInsertSchema(ratings).pick({
  userId: true,
  spotId: true,
  windReliability: true,
  beginnerFriendly: true,
  scenery: true,
  uncrowded: true,
  localVibe: true,
  overall: true,
});

// Define types for the new tables
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Rating = typeof ratings.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;

// Extended type for reviews with user data
export type ReviewWithUser = Review & {
  user: Pick<User, 'id' | 'username' | 'displayName' | 'avatarUrl' | 'experience'>;
};

// Extended type for spots with ratings summary
export type SpotWithRatings = Spot & {
  averageRating: number;
  totalRatings: number;
  ratingBreakdown: {
    windReliability: number;
    beginnerFriendly: number;
    scenery: number;
    uncrowded: number;
    localVibe: number;
    overall: number;
  };
};
