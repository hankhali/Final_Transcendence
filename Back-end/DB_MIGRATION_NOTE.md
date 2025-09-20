# Database Migration Note

<!-- hanieh: To fix the 'no such column: played_at' error, you must add the column to your database from the backend. This cannot be fixed from the frontend. -->

**SQL to run in SQLite:**
```sql
ALTER TABLE game_history ADD COLUMN played_at DATETIME;
```

After running this, restart your backend server.
