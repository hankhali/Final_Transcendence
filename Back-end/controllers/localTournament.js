// hanieh added: Local tournament controller for guest player matches
const db = require('../queries/database');

// Create a match for local tournament where logged-in user plays against guest players
async function createLocalMatch(userId, player1Name, player2Name, round) {
    try {
        // For local tournaments, the logged-in user plays all matches
        // opponent_id = NULL since guest players don't have accounts, but store opponent_name
        const insertResult = db.prepare(`
            INSERT INTO game_history (user_id, opponent_id, user_score, opponent_score, result, round, tournament_id, opponent_name) 
            VALUES (?, NULL, 0, 0, 'pending', ?, NULL, ?)
        `).run(userId, round, player2Name);
        
        return { matchId: insertResult.lastInsertRowid };
    } catch (error) {
        console.error('Error creating local match:', error);
        throw new Error('Failed to create local match');
    }
}

// Update local tournament match result
async function finishLocalMatch(matchId, player1Score, player2Score, winnerName) {
    try {
        const match = db.prepare('SELECT id, user_id FROM game_history WHERE id = ?').get(matchId);
        if (!match) {
            throw new Error('No match found');
        }
        
        // For local tournaments, winner_id is always the logged-in user (or NULL if they lose)
        // loser_id is always NULL since opponent is a guest
        let winnerId = null;
        if (player1Score > player2Score) {
            winnerId = match.user_id; // Logged-in user wins
        }
        // If player2Score > player1Score, winnerId stays NULL (guest wins, but we can't store guest as winner)
        
        db.prepare(`
            UPDATE game_history 
            SET user_score = ?, opponent_score = ?, winner_id = ?, loser_id = NULL, played_at = CURRENT_TIMESTAMP, result = 'finished' 
            WHERE id = ?
        `).run(player1Score, player2Score, winnerId, matchId);
        
        return { success: true, winnerName };
    } catch (error) {
        console.error('Error finishing local match:', error);
        throw new Error('Failed to update match result');
    }
}

module.exports = {
    createLocalMatch,
    finishLocalMatch
};
