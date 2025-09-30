-- Fix tournament_players table to allow multiple guest players (player_id = NULL)
-- The UNIQUE constraint (tournament_id, player_id) prevents multiple NULL player_ids

-- Step 1: Create new table without the problematic UNIQUE constraint
CREATE TABLE IF NOT EXISTS tournament_players_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tournament_id INTEGER NOT NULL,
  player_id INTEGER,
  tournament_alias TEXT NOT NULL,
  status TEXT DEFAULT 'joined',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tournament_id) REFERENCES tournaments (id) ON DELETE SET NULL,
  FOREIGN KEY (player_id) REFERENCES users (id) ON DELETE SET NULL,
  -- Add UNIQUE constraint only for registered players (when player_id is NOT NULL)
  UNIQUE (tournament_id, tournament_alias)
);

-- Step 2: Copy existing data
INSERT INTO tournament_players_new (id, tournament_id, player_id, tournament_alias, status, joined_at)
SELECT id, tournament_id, player_id, tournament_alias, status, joined_at 
FROM tournament_players;

-- Step 3: Drop old table
DROP TABLE tournament_players;

-- Step 4: Rename new table
ALTER TABLE tournament_players_new RENAME TO tournament_players;
