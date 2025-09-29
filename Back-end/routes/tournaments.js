// #list all tournaments
// #fetch one tournament and display the players inside this tournament

const db = require('../queries/database');
const { createTournament} = require('../controllers/tournaments');
const { joinTournament } = require('../controllers/tournaments');
const { getTournamentDetails } = require('../controllers/tournaments');
const { leaveTournament } = require('../controllers/tournaments');
const { startTournament } = require('../controllers/tournaments');
const { updateMatchResults } = require('../controllers/tournaments');



async function tournamentRoutes(fastify, options){
    //create a tournament
    fastify.post('/tournaments', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            const { name, min_players, max_players } = request.body;
            const created_by = request.user.id;
            const tournament = await createTournament(name, created_by, min_players, max_players);
            //use the message in createTournament and check
            return reply.code(200).send({message: 'Tournament created successfully', tournamentId: tournament.id});
        }
        catch(error){
            return reply.code(400).send({error: error.message});
        }
    });


    //delete tournaments (for debug)
    fastify.delete('/tournament-delete', async (request, reply) => {
        db.prepare('DELETE FROM tournaments').run();
        return { message: 'All tournaments deleted' };
    });

    //join a tournament
    fastify.post('/tournaments/:id/join', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            const tournament_id = Number(request.params.id);
            const player_id = request.user.id;
            const { tournament_alias } = request.body;
            const join = await joinTournament(tournament_id, player_id, tournament_alias);
            return reply.code(200).send(join);
        }
        catch(error){
            return reply.code(400).send({error: error.message}); //debug
        }
    });

    //join tournament for guest players
    fastify.post('/tournaments/:id/join-guest', async (request, reply) => {
        try{
            const tournament_id = Number(request.params.id);
            const { tournament_alias } = request.body;
            const joinGuest = await joinTournament(tournament_id, null, tournament_alias);
            return reply.code(200).send(joinGuest);
        }
        catch(error){
            return reply.code(400).send({error: error.message});
        }
    });

    //list all tournament
    fastify.get('/tournaments', async (request, reply) => {
        try{
            const tournamentsList = db.prepare('SELECT * FROM tournaments').all();
            if (!tournamentsList.length) {
                return reply.code(404).send({ message: "No tournaments found" });
            }
            return reply.code(200).send(tournamentsList);
        }
        catch(error){
            return reply.code(500).send({ error: error.message });
        }
    });


    //get a specific tournament and display all players who joined
    fastify.get('/tournaments/:id', async (request, reply) => {
        try{
            const id = Number(request.params.id);
            const displayDetails = await getTournamentDetails(id);
            if (!displayDetails) {
                return reply.code(404).send({ error: 'Tournament not found' });
            }
            return reply.code(200).send(displayDetails);
        }
        catch(error){
            return reply.code(404).send({ error: error.message });
        }
    });


    //leave a tournament
    fastify.delete('/tournaments/:id/leave', async (request, reply) => {
        try{
            //get tournament id
            //get the user from jwt who wants to leave
            const tournamentId = Number(request.params.id);
            const { player_id } = request.body;

            const leaveTrnmt = await leaveTournament(tournamentId, player_id);
            if(!leaveTrnmt){
                return reply.code(404).send({error});
            }
            return reply.code(200).send(leaveTrnmt);
        }
        catch(error){
            return reply.code(404).send({ error: error.message });
        }
    });


    //start the tournament
    fastify.post('/tournaments/:id/start', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            const tournamentId = Number(request.params.id);
            const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
            if(!tournament){
                return reply.code(404).send({error: 'Tournament not found'});
            }
            if(tournament.created_by !== request.user.id){
                return reply.code(403).send({error: 'Forbidden: only the creator can start this tournament' });
            }
            const result = await startTournament(tournamentId);
            return reply.code(200).send(result);
        }
        catch(error){
            return reply.code(400).send({ error: error.message });
        }
    });


    //when the game ends, the results are submitted here via the fronted (sending an API)
    fastify.post('/tournaments/:id/finish', async (request, reply) => {
        try{
            const tournamentId = Number(request.params.id);
            const { matchId, userScore, opponentScore } = request.body;

            const result = await updateMatchResults(matchId, userScore, opponentScore);
            return reply.code(200).send(result);
        }
        catch(error){
            return reply.code(400).send({ error: error.message });
        }
    });
}

module.exports = tournamentRoutes;