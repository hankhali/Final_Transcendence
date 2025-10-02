-- Migration to allow NULL user_id for tournament guest player matches
PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

-- 1. Rename the old table
ALTER TABLE game_history RENAME TO game_history_old;

-- 2. Create new table with both user_id and opponent_id nullable
CREATE TABLE game_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,                  -- allow NULL for guest-only matches
    opponent_id INTEGER,              -- allow NULL for guest-only matches
    user_score INTEGER NOT NULL,
    opponent_score INTEGER NOT NULL,
    result TEXT NOT NULL,
    winner_id INTEGER NULL,
    loser_id INTEGER NULL,
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    round TEXT,
    tournament_id INTEGER,
    opponent_name TEXT,               -- for guest players in tournaments
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (opponent_id) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (tournament_id) REFERENCES tournaments (id) ON DELETE SET NULL
);

-- 3. Copy data from old table
INSERT INTO game_history (id, user_id, opponent_id, user_score, opponent_score, result, winner_id, loser_id, played_at, round, tournament_id, opponent_name)
SELECT id, user_id, opponent_id, user_score, opponent_score, result, winner_id, loser_id, played_at, round, tournament_id, opponent_name FROM game_history_old;

-- 4. Drop old table
DROP TABLE game_history_old;

COMMIT;
PRAGMA foreign_keys=on;