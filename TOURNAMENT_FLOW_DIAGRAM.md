# Tournament Winner Storage Flow

## Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER STARTS TOURNAMENT                        │
│  (Clicks "Create Tournament" → Enters 4 player names)           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              BRACKET DISPLAYED (showBracket)                     │
│  • Match 1: Player1 vs Player2                                  │
│  • Match 2: Player3 vs Player4 (DISABLED)                       │
│  • Final: TBD vs TBD                                            │
│  • globalMatchResults = {} (empty)                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              USER CLICKS "START MATCH 1"                         │
│  startGame(Player1, Player2, "1")                               │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   GAME STARTS (Pong)                            │
│  • Game canvas rendered                                         │
│  • Players play until someone reaches winning score            │
│  • matchId and tournamentId set on game object                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GAME ENDS                                    │
│  • Winner determined: Player1 (score: 5-3)                     │
│  • onNavigateBack callback triggered                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              SUBMIT RESULT TO BACKEND                           │
│  apiService.tournaments.submitMatchResult(                      │
│    tournamentId: 1,                                             │
│    matchId: 123,                                                │
│    player1Score: 5,                                             │
│    player2Score: 3                                              │
│  )                                                              │
│  ↓                                                              │
│  POST /tournaments/1/finish                                     │
│  • Backend updates game_history table                           │
│  • Sets winner_id and loser_id                                  │
│  • Advances tournament if needed                                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│           SHOW GAME OVER MODAL                                  │
│  showGameOverModal("1", "Player1", 5, 3)                       │
│  • Store in globalMatchResults["1"] = {                         │
│      winner: "Player1",                                         │
│      player1Score: 5,                                           │
│      player2Score: 3                                            │
│    }                                                            │
│  • Display modal with winner and scores                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         USER CLICKS "BACK TO BRACKET"                           │
│  • Remove game over modal                                       │
│  • Clear app container                                          │
│  • Call showBracket(players) again                              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              BRACKET RE-RENDERED                                │
│  • Match 1: Player1 vs Player2                                  │
│  • Match 2: Player3 vs Player4                                  │
│  • Final: TBD vs TBD                                            │
│  • globalMatchResults still contains Match 1 result             │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         AUTO-RESTORE WINNERS (setTimeout 100ms)                 │
│  For each match in globalMatchResults:                          │
│    • Find match element: .match[data-match="1"]                 │
│    • Find player element with data-player="Player1"             │
│    • Call selectWinner(playerElement, "1")                      │
│      ↓                                                          │
│      • Add 'winner' class (green highlight + checkmark)         │
│      • Store in matchWinners[1] = "Player1"                     │
│      • Enable Match 2 button                                    │
│      • Update final match placeholder                           │
│      • Activate connection line                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              BRACKET NOW SHOWS:                                 │
│  • Match 1: Player1 ✓ (GREEN) vs Player2                       │
│  • Match 2: Player3 vs Player4 (NOW ENABLED)                   │
│  • Final: Player1 vs TBD                                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              USER PLAYS MATCH 2                                 │
│  (Same flow as Match 1)                                         │
│  • Winner stored in globalMatchResults["2"]                     │
│  • Both winners restored when returning to bracket              │
│  • Final match now shows both winners                           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              USER PLAYS FINAL MATCH                             │
│  • Tournament champion determined                               │
│  • All results saved to database                                │
│  • Champion alert displayed                                     │
└─────────────────────────────────────────────────────────────────┘
```

## Key Data Structures

### globalMatchResults
```typescript
{
  "1": {
    winner: "Player1",
    player1Score: 5,
    player2Score: 3
  },
  "2": {
    winner: "Player3",
    player1Score: 5,
    player2Score: 2
  },
  "final": {
    winner: "Player1",
    player1Score: 5,
    player2Score: 4
  }
}
```

### matchWinners (local to showBracket)
```typescript
{
  1: "Player1",
  2: "Player3",
  "final": "Player1"
}
```

## API Call Details

### Request
```http
POST /tournaments/1/finish
Content-Type: application/json
Authorization: Bearer <token>

{
  "matchId": 123,
  "userScore": 5,
  "opponentScore": 3
}
```

### Response
```json
{
  "winner": 1,
  "loser": 2
}
```

## Visual States

### Before Match
```
┌─────────────────────┐
│  Match 1 - Semifinal │
├─────────────────────┤
│  Player1            │
│  VS                 │
│  Player2            │
├─────────────────────┤
│  [Start Match]      │
└─────────────────────┘
```

### After Match (Winner Highlighted)
```
┌─────────────────────┐
│  Match 1 - Semifinal │
├─────────────────────┤
│  Player1 ✓ (GREEN)  │ ← Winner
│  VS                 │
│  Player2            │
├─────────────────────┤
│  [Match Complete]   │
└─────────────────────┘
```

## CSS Classes Applied

### Winner Element
```css
.player.winner {
  background: rgba(34,197,94,0.2);
  border-color: rgba(34,197,94,0.7);
  color: #10b981;
  transform: translateX(8px);
}

.player.winner::after {
  content: '✓';
  position: absolute;
  right: 15px;
  font-size: 20px;
  color: #10b981;
}
```

## Persistence Behavior

| Action | globalMatchResults | matchWinners | Bracket Display |
|--------|-------------------|--------------|-----------------|
| Start Tournament | {} (reset) | {} | Fresh bracket |
| Complete Match 1 | {"1": {...}} | {1: "Player1"} | Winner highlighted |
| Return to Bracket | {"1": {...}} (persists) | {1: "Player1"} (restored) | Winner still highlighted |
| Complete Match 2 | {"1": {...}, "2": {...}} | {1: "...", 2: "..."} | Both winners highlighted |
| Page Refresh | Lost (in-memory) | Lost | State reset |
| New Tournament | {} (reset) | {} | Fresh bracket |

## Error Handling

1. **Backend submission fails**: Match result still stored locally, bracket updates
2. **Winner element not found**: Console warning, no visual update
3. **Match 2 clicked before Match 1**: Alert shown, action blocked
4. **Invalid scores**: Backend validation, error returned

## Performance Notes

- Winner restoration uses 100ms setTimeout to ensure DOM is ready
- All match results restored in single pass (O(n) where n = completed matches)
- No unnecessary re-renders or API calls
- Efficient DOM queries using data attributes
