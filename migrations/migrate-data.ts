
import dotenv from "dotenv";
dotenv.config();

import { db } from "../server/db";
import { spots, windConditions } from "../shared/schema";
import { kiteSpotsData } from "../server/data/seed-data";

async function migrateData() {
  try {
    console.log("Starting data migration to Supabase...");
    
    // Clear existing data
    console.log("Clearing existing data...");
    await db.delete(windConditions);
    await db.delete(spots);
    
    // Insert spots and wind conditions
    for (const spotData of kiteSpotsData) {
      console.log(`Migrating spot: ${spotData.spot.name}`);
      
      // Insert spot
      const [insertedSpot] = await db.insert(spots).values(spotData.spot).returning();
      
      // Insert wind conditions for this spot
      const windConditionsWithSpotId = spotData.windConditions.map(condition => ({
        ...condition,
        spotId: insertedSpot.id
      }));
      
      await db.insert(windConditions).values(windConditionsWithSpotId);
      
      console.log(`✓ Migrated ${spotData.spot.name} with ${spotData.windConditions.length} wind conditions`);
    }
    
    console.log(`\n✅ Migration complete! Migrated ${kiteSpotsData.length} spots.`);
    
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

migrateData();
