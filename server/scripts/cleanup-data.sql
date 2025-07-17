-- Delete all data from wind_conditions
DELETE FROM wind_conditions;

-- Delete all data from spots
DELETE FROM spots;

-- Reset the sequence for spots
ALTER SEQUENCE spots_id_seq RESTART WITH 1;

-- Reset the sequence for wind_conditions
ALTER SEQUENCE wind_conditions_id_seq RESTART WITH 1;