
import dotenv from "dotenv";
dotenv.config();

import { db } from "./server/db";
import { spots, windConditions } from "./shared/schema";
import { count } from "drizzle-orm";

async function verifyMigration() {
  try {
    console.log("Verifying migration...");
    
    // Count spots
    const [spotsCount] = await db.select({ count: count() }).from(spots);
    console.log(`📍 Total spots in database: ${spotsCount.count}`);
    
    // Count wind conditions
    const [windCount] = await db.select({ count: count() }).from(windConditions);
    console.log(`🌬️  Total wind conditions: ${windCount.count}`);
    
    // Show a few sample spots
    const sampleSpots = await db.select({
      name: spots.name,
      country: spots.country,
      latitude: spots.latitude,
      longitude: spots.longitude
    }).from(spots).limit(5);
    
    console.log("\n📋 Sample spots:");
    sampleSpots.forEach(spot => {
      console.log(`  • ${spot.name}, ${spot.country} (${spot.latitude}, ${spot.longitude})`);
    });
    
    console.log("\n✅ Migration verification complete!");
    
  } catch (error) {
    console.error("❌ Verification failed:", error);
  } finally {
    process.exit(0);
  }
}

verifyMigration();
