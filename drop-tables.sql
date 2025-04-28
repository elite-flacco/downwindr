-- Drop wind_conditions table (must be dropped first due to foreign key constraints)
DROP TABLE IF EXISTS wind_conditions CASCADE;

-- Drop the wind_conditions_id_seq sequence
DROP SEQUENCE IF EXISTS wind_conditions_id_seq CASCADE;

-- Drop spots table
DROP TABLE IF EXISTS spots CASCADE;

-- Drop the spots_id_seq sequence
DROP SEQUENCE IF EXISTS spots_id_seq CASCADE;