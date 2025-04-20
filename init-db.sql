
-- Create tables
CREATE TABLE IF NOT EXISTS spots (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  description TEXT NOT NULL,
  wave_size TEXT NOT NULL,
  temp_range TEXT NOT NULL,
  best_months TEXT NOT NULL,
  local_attractions TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  windguru_code TEXT,
  kite_schools TEXT[],
  difficulty_level TEXT,
  conditions TEXT[],
  accommodation_options TEXT[],
  food_options TEXT[],
  culture TEXT,
  average_school_cost REAL,
  average_accommodation_cost REAL,
  number_of_schools INTEGER
);

CREATE TABLE IF NOT EXISTS wind_conditions (
  id SERIAL PRIMARY KEY,
  spot_id INTEGER NOT NULL REFERENCES spots(id),
  month INTEGER NOT NULL,
  wind_speed REAL NOT NULL,
  wind_quality TEXT NOT NULL,
  air_temp REAL,
  water_temp REAL,
  seasonal_notes TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  display_name TEXT,
  bio TEXT,
  experience TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  avatar_url TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  spot_id INTEGER NOT NULL REFERENCES spots(id),
  content TEXT NOT NULL,
  visit_date TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, spot_id)
);

CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  spot_id INTEGER NOT NULL REFERENCES spots(id),
  wind_reliability INTEGER NOT NULL,
  beginner_friendly INTEGER NOT NULL,
  scenery INTEGER NOT NULL,
  uncrowded INTEGER NOT NULL,
  local_vibe INTEGER NOT NULL,
  overall INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, spot_id)
);
