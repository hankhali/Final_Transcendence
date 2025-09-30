# Tournament Bracket Winner Storage - Testing Guide

## Overview
This guide will help you test the new tournament bracket winner storage functionality.

## What Was Implemented

### 1. Backend Integration
- Added `submitMatchResult()` function in `api.js` that calls `/tournaments/:id/finish`
- Sends match results (matchId, player1Score, player2Score) to the backend
- Backend updates the `game_history` table with winner information

### 2. Frontend Winner Storage
- Match results are stored in `globalMatchResults` object
- Results persist across bracket re-renders
- Winners are automatically highlighted when returning to bracket
- Match results include: winner name, player1Score, player2Score

### 3. UI Improvements
- Enhanced "Match Complete" modal showing winner and scores
- Automatic winner selection in bracket after match
- Match 2 button unlocks only after Match 1 is completed
- Visual feedback with green highlight and checkmark for winners

## Testing Steps

### Test 1: Basic Tournament Flow
1. **Start Tournament**
   - Navigate to Games page
   - Click "Create Tournament" button
   - Enter 4 player names (e.g., Alice, Bob, Charlie, Diana)
   - Click "Generate Bracket"

2. **Play Match 1**
   - Click "Start Match" on Match 1 (Alice vs Bob)
   - Play the game until someone wins
   - Verify the "Match Complete" modal appears showing:
     - Winner name
     - Final scores
     - "Back to Bracket" button

3. **Return to Bracket**
   - Click "Back to Bracket"
   - **VERIFY**: The real winner is automatically highlighted in Match 1
   - **VERIFY**: Winner has green background and checkmark (✓)
   - **VERIFY**: Match 2 button is now enabled

### Test 2: Multiple Matches
1. **Play Match 2**
   - Click "Start Match" on Match 2 (Charlie vs Diana)
   - Play until someone wins
   - Click "Back to Bracket"
   - **VERIFY**: Both Match 1 and Match 2 winners are highlighted
   - **VERIFY**: Final match shows both winners

2. **Play Final Match**
   - Click "Start Match" on the Final
   - Play until tournament champion is determined
   - **VERIFY**: Champion is highlighted
   - **VERIFY**: Tournament completion message appears

### Test 3: Backend Verification
1. **Check Database**
   - Open `database.db`
   - Query: `SELECT * FROM game_history WHERE tournament_id = 1;`
   - **VERIFY**: Match results are stored with correct scores
   - **VERIFY**: `winner_id` and `loser_id` are populated

2. **Check Console Logs**
   - Open browser DevTools (F12)
   - Look for these debug messages:
     ```
     [DEBUG] Game ended. Winner: [name] Scores: [score1] [score2]
     [DEBUG] Match result submitted successfully
     [DEBUG] Match result stored: {matchNum, winner, scores}
     [DEBUG] Auto-selecting winner: [name] for match [num]
     ```

### Test 4: Edge Cases
1. **Refresh During Tournament**
   - Start a tournament
   - Play Match 1
   - Refresh the page
   - **EXPECTED**: Tournament state is lost (this is normal for local tournaments)

2. **Multiple Tournaments**
   - Complete a full tournament
   - Start a new tournament
   - **VERIFY**: Previous match results are cleared
   - **VERIFY**: New tournament starts fresh

3. **Match 2 Before Match 1**
   - Try clicking Match 2 before completing Match 1
   - **VERIFY**: Alert appears: "You must finish Match 1 before starting Match 2!"
   - **VERIFY**: Match 2 button is disabled

## Expected Behavior

### Visual Indicators
- ✅ Winner has green background (`rgba(34,197,94,0.2)`)
- ✅ Winner has green border (`rgba(34,197,94,0.7)`)
- ✅ Winner has checkmark icon (✓)
- ✅ Winner text is green (`#10b981`)
- ✅ Connection lines turn blue when match is complete

### Backend Updates
- ✅ Match results saved to `game_history` table
- ✅ Winner and loser IDs are recorded
- ✅ Scores are stored correctly
- ✅ Tournament progresses to next round automatically

### User Experience
- ✅ Clear visual feedback on match completion
- ✅ Winner information displayed in modal
- ✅ Smooth transition back to bracket
- ✅ All completed matches remain highlighted
- ✅ Progressive unlocking of matches (1 → 2 → Final)

## Troubleshooting

### Issue: Winner not highlighted after returning to bracket
**Solution**: Check browser console for errors. Verify `selectWinner()` is being called.

### Issue: Match results not saved to database
**Solution**: 
- Verify backend is running on `http://localhost:5001`
- Check network tab for API call to `/tournaments/1/finish`
- Verify `matchId` is being passed correctly

### Issue: Match 2 button not enabling
**Solution**: Ensure Match 1 winner is selected. Check `matchWinners[1]` in console.

### Issue: Scores not displaying correctly
**Solution**: Verify `game.getPlayers()` returns correct score values.

## Code References

### Key Files Modified
1. **`/Front-end/src/services/api.js`** (Line 243-253)
   - Added `submitMatchResult()` function

2. **`/Front-end/src/components/TournamentModal.ts`** (Lines 340-600)
   - Added `globalMatchResults` storage
   - Enhanced `showGameOverModal()` with winner display
   - Automatic winner restoration logic

### Key Functions
- `submitMatchResult(tournamentId, matchId, player1Score, player2Score)` - Submits to backend
- `showGameOverModal(matchNum, winner, player1Score, player2Score)` - Displays results
- `selectWinner(playerElement, matchNumber)` - Highlights winner in bracket
- `updateMatchResults(matchId, userScore, opponentScore)` - Backend controller

## Success Criteria
✅ Winners are automatically stored after each match
✅ Winners are displayed correctly when returning to bracket
✅ Match results are saved to database
✅ Tournament progresses smoothly through all rounds
✅ Visual feedback is clear and consistent
✅ No console errors during normal operation

## Notes
- Match results are stored in memory (`globalMatchResults`)
- Results persist across bracket re-renders within same session
- Starting a new tournament clears previous results
- Backend handles tournament progression automatically
