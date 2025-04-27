-- Create spots table
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

-- Create wind_conditions table
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