-- Migration to update user table for Supabase Auth
-- This migration changes user IDs from serial integers to UUIDs

-- First, drop foreign key constraints
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_user_id_users_id_fk;
ALTER TABLE ratings DROP CONSTRAINT IF EXISTS ratings_user_id_users_id_fk;

-- Drop the old users table
DROP TABLE IF EXISTS users CASCADE;

-- Create new users table with UUID primary key
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  experience TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  avatar_url TEXT
);

-- Update reviews table to use UUID for user_id
ALTER TABLE reviews 
  DROP COLUMN user_id,
  ADD COLUMN user_id UUID NOT NULL;

-- Update ratings table to use UUID for user_id  
ALTER TABLE ratings 
  DROP COLUMN user_id,
  ADD COLUMN user_id UUID NOT NULL;

-- Add foreign key constraints back
ALTER TABLE reviews ADD CONSTRAINT reviews_user_id_users_id_fk 
  FOREIGN KEY (user_id) REFERENCES users(id);
  
ALTER TABLE ratings ADD CONSTRAINT ratings_user_id_users_id_fk 
  FOREIGN KEY (user_id) REFERENCES users(id);

-- Add unique constraints for reviews and ratings
ALTER TABLE reviews ADD CONSTRAINT reviews_user_spot_unique 
  UNIQUE (user_id, spot_id);
  
ALTER TABLE ratings ADD CONSTRAINT ratings_user_spot_unique 
  UNIQUE (user_id, spot_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);