// hanieh added: Routes for local tournament matches
const { createLocalMatch, finishLocalMatch } = require('../controllers/localTournament');

module.exports = async function (fastify, options) {
    // Create a local tournament match (requires authentication - logged-in user plays all matches)
    fastify.post('/tournaments/local-match', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try {
            const { player1Name, player2Name, round } = request.body;
            const userId = request.user.id;
            console.log('[DEBUG] Creating local match:', { userId, player1Name, player2Name, round });
            
            const result = await createLocalMatch(userId, player1Name, player2Name, round);
            console.log('[DEBUG] Local match created:', result);
            return reply.code(200).send(result);
        } catch (error) {
            console.error('[DEBUG] Error creating local match:', error.message);
            return reply.code(400).send({ error: error.message });
        }
    });

    // Finish a local tournament match (requires authentication)
    fastify.post('/tournaments/local-match/finish', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try {
            const { matchId, player1Score, player2Score, winnerName } = request.body;
            console.log('[DEBUG] Finishing local match:', { matchId, player1Score, player2Score, winnerName });
            
            await finishLocalMatch(matchId, player1Score, player2Score, winnerName);
            return reply.code(200).send({ success: true });
        } catch (error) {
            console.error('[DEBUG] Error finishing local match:', error.message);
            return reply.code(400).send({ error: error.message });
        }
    });
};
