-- Add opponent_name field to game_history table for tournament guest players
-- This allows us to store the name of guest players who don't have user accounts

ALTER TABLE game_history ADD COLUMN opponent_name TEXT;

-- Update existing records to show they were tournament matches
UPDATE game_history 
SET opponent_name = 'Tournament Player' 
WHERE opponent_id IS NULL AND round IS NOT NULL;
