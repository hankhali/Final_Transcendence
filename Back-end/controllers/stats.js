// Backend controller for user game statistics
const db = require('../queries/database');

// Get stats for a user by userId
async function getUserStats(userId) {
    console.log('[STATS] --- BEGIN DETAILED MATCH ANALYSIS ---');
    let debugWinRows = [];
    let debugLossRows = [];
    let debugStreakRows = db.prepare('SELECT * FROM game_history WHERE user_id = ? ORDER BY played_at DESC').all(userId);
    let debugStreakInfo = [];
    debugStreakRows.forEach((row, idx) => {
        const win = row.user_score > row.opponent_score;
        const loss = row.user_score < row.opponent_score;
        if (win) debugWinRows.push(row);
        if (loss) debugLossRows.push(row);
        debugStreakInfo.push({idx, user_score: row.user_score, opponent_score: row.opponent_score, win, loss, result: row.result});
    });
    console.log('[STATS] debugStreakRows:', debugStreakRows);
    console.log('[STATS] debugWinRows:', debugWinRows);
    console.log('[STATS] debugLossRows:', debugLossRows);
    console.log('[STATS] debugStreakInfo:', debugStreakInfo);
    // Calculate current streak (debug)
    let debugCurrentStreak = 0;
    for (const row of debugStreakRows) {
        if (row.result === 'finished' && row.user_score > row.opponent_score) {
            debugCurrentStreak++;
        } else {
            break;
        }
    }
    console.log('[STATS] debugCurrentStreak:', debugCurrentStreak);
    // Calculate longest streak (debug)
    let debugLongestStreak = 0, debugTempStreak = 0;
    for (const row of debugStreakRows) {
        if (row.result === 'finished' && row.user_score > row.opponent_score) {
            debugTempStreak++;
            if (debugTempStreak > debugLongestStreak) debugLongestStreak = debugTempStreak;
        } else {
            debugTempStreak = 0;
        }
    }
    console.log('[STATS] debugLongestStreak:', debugLongestStreak);
    console.log('[STATS] --- END DETAILED MATCH ANALYSIS ---');
    console.log('[STATS] Calculating stats for userId:', userId);
    // Debug: Fetch all matches for user
    const allMatches = db.prepare('SELECT * FROM game_history WHERE user_id = ?').all(userId);
    console.log('[STATS] All matches:', allMatches);

    // Total games played
    const gamesPlayed = db.prepare('SELECT COUNT(*) as count FROM game_history WHERE user_id = ?').get(userId).count;
    console.log('[STATS] gamesPlayed:', gamesPlayed);
    // Total wins
    const wins = db.prepare('SELECT COUNT(*) as count FROM game_history WHERE user_id = ? AND user_score > opponent_score').get(userId).count;
    console.log('[STATS] wins:', wins);
    // Total losses
    const losses = db.prepare('SELECT COUNT(*) as count FROM game_history WHERE user_id = ? AND user_score < opponent_score').get(userId).count;
    console.log('[STATS] losses:', losses);
    // Win rate
    const winRate = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;
    console.log('[STATS] winRate:', winRate);
    // Current streak (consecutive wins)
    const streakRows = db.prepare('SELECT * FROM game_history WHERE user_id = ? ORDER BY played_at DESC').all(userId);
    console.log('[STATS] streakRows:', streakRows);
    let currentStreak = 0;
    for (const row of streakRows) {
        if (row.result === 'finished' && row.user_score > row.opponent_score) {
            currentStreak++;
        } else {
            break;
        }
    }
    console.log('[STATS] currentStreak:', currentStreak);
    // Longest win streak
    let longestStreak = 0, tempStreak = 0;
    for (const row of streakRows) {
        if (row.result === 'finished' && row.user_score > row.opponent_score) {
            tempStreak++;
            if (tempStreak > longestStreak) longestStreak = tempStreak;
        } else {
            tempStreak = 0;
        }
    }
    console.log('[STATS] longestStreak:', longestStreak);
    // Average score
    const avgScoreRow = db.prepare('SELECT AVG(user_score) as avgScore FROM game_history WHERE user_id = ?').get(userId);
    const averageScore = avgScoreRow.avgScore ? Math.round(avgScoreRow.avgScore * 10) / 10 : 0;
    console.log('[STATS] averageScore:', averageScore);
    // Total play time: use default 5 min per match
    let totalPlayTime = 0;
    let playTimeRows = [];
    try {
        playTimeRows = db.prepare('SELECT user_id FROM game_history WHERE user_id = ?').all(userId);
        totalPlayTime = playTimeRows.length * 5;
        console.log('[STATS] totalPlayTime (default 5 min per match):', totalPlayTime);
    } catch (e) {
        totalPlayTime = gamesPlayed * 5;
        console.log('[STATS] totalPlayTime fallback:', totalPlayTime);
    }
    // Preferred mode (most played round)
    const modeRow = db.prepare('SELECT round, COUNT(*) as count FROM game_history WHERE user_id = ? GROUP BY round ORDER BY count DESC LIMIT 1').get(userId);
    const preferredMode = modeRow ? modeRow.round : '1v1';
    console.log('[STATS] preferredMode:', preferredMode);
    // Achievements (example logic)
    // Perfect Player: win a game 5-0 (update for your game rules)
    const perfectPlayerCount = db.prepare('SELECT COUNT(*) as count FROM game_history WHERE user_id = ? AND user_score = 5 AND opponent_score = 0').get(userId).count;
    const socialButterflyCount = db.prepare('SELECT COUNT(*) as count FROM friends WHERE user_id = ? OR friend_id = ?').get(userId, userId).count;
    console.log('[STATS] perfectPlayerCount:', perfectPlayerCount);
    console.log('[STATS] socialButterflyCount:', socialButterflyCount);
    const achievements = {
        winStreakMaster: currentStreak >= 10,
        centuryClub: gamesPlayed >= 100,
        perfectPlayer: perfectPlayerCount > 0,
        socialButterfly: socialButterflyCount >= 10
    };
    console.log('[STATS] achievements:', achievements);
    return {
        gamesPlayed,
        wins,
        losses,
        winRate,
        currentStreak,
        longestStreak,
        averageScore,
        totalPlayTime,
        preferredMode,
        achievements
    };
}

module.exports = { getUserStats };