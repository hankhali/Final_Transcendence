// hanieh added: Standalone 1v1 match controller
const db = require('../queries/database');

async function createOneVOneMatch(player1Id, player2Input) {
    // hanieh added: If input is a string, treat as username and look up user ID
    let player2Id = player2Input;
    if (typeof player2Input === 'string') {
        const user = db.prepare('SELECT id FROM users WHERE username = ?').get(player2Input);
        if (!user) {
            throw new Error('Opponent username not found');
        }
        player2Id = user.id;
    }
    // hanieh added: Prevent playing against self
    if (player1Id === player2Id) {
        throw new Error('You cannot play against yourself in a 1v1 match.');
    }
    // hanieh added: Insert a new 1v1 match into game_history, not tied to a tournament
    const insertResult = db.prepare(`INSERT INTO game_history (user_id, opponent_id, user_score, opponent_score, result, round, tournament_id) VALUES (?, ?, 0, 0, 'pending', '1v1', NULL)`).run(player1Id, player2Id);
    return { matchId: insertResult.lastInsertRowid };
}

async function updateOneVOneMatchResult(matchId, player1Score, player2Score) {
    const match = db.prepare('SELECT id, user_id, opponent_id FROM game_history WHERE id = ?').get(matchId);
    if (!match) {
        throw new Error('No match found');
    }
    let winner, loser;
    if (player1Score > player2Score) {
        winner = match.user_id;
        loser = match.opponent_id;
    } else if (player2Score > player1Score) {
        winner = match.opponent_id;
        loser = match.user_id;
    }
    db.prepare(`UPDATE game_history SET user_score = ?, opponent_score = ?, winner_id = ?, loser_id = ?, played_at = CURRENT_TIMESTAMP, result = 'finished' WHERE id = ?`).run(player1Score, player2Score, winner, loser, matchId);
    return { success: true };
}

module.exports = { createOneVOneMatch, updateOneVOneMatchResult };