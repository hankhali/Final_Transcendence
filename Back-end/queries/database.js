const Database = require('better-sqlite3');
const db = new Database('database.db');

async function createTables() {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alias TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT,
        email TEXT UNIQUE,
        avatar TEXT,
        current_status TEXT DEFAULT 'offline',
        player_matches INTEGER DEFAULT 0,
        player_wins INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS game_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        opponent_id INTEGER NOT NULL,
        user_score INTEGER NOT NULL,
        opponent_score INTEGER NOT NULL,
        result TEXT NOT NULL, /* 'WIN', 'LOSS', 'DRAW' */
        winner_id INTEGER NULL,
        loser_id INTEGER NULL,
        played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        round TEXT,
        tournament_id INTEGER,        /* NEW: link match to a tournament */
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
        FOREIGN KEY (opponent_id) REFERENCES users (id) ON DELETE SET NULL,
        FOREIGN KEY (tournament_id) REFERENCES tournaments (id) ON DELETE SET NULL
      );

      CREATE TABLE IF NOT EXISTS tournaments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        min_players INTEGER DEFAULT 2,
        max_players INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        winner_id INTEGER NULL,
        finished_at TIMESTAMP NULL,
        created_by INTEGER NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users (id),
        FOREIGN KEY (winner_id) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS tournament_players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tournament_id INTEGER NOT NULL,
        player_id INTEGER NOT NULL,
        tournament_alias TEXT NOT NULL,
        status TEXT DEFAULT 'joined',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tournament_id) REFERENCES tournaments (id) ON DELETE SET NULL,
        FOREIGN KEY (player_id) REFERENCES users (id) ON DELETE SET NULL,
        UNIQUE (tournament_id, player_id)
      );

      CREATE TABLE IF NOT EXISTS friends (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        friend_id INTEGER NOT NULL,
        friend_request TEXT DEFAULT 'pending', /*'pending', 'accepted', 'rejected'*/
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (friend_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
    //ON DELETE SET NULL: it will automatically remove all game history when a user is deleted
    console.log('Tables ensured');
  } catch (error) {
    console.error('Table setup failed:', error.message);
    process.exit(1);
  }
}

// Create tables immediately
createTables();

// Export db so other files can use it
module.exports = db;





