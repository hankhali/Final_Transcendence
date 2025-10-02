/*
a tournament is not just one game → it’s a set of games between multiple players.
# create a tournament
- fields: name, maxPlayers, createdBy (authUserId).
- add default status = "pending".

# join tournament
- checks: not already full, not already joined.


#make user write a unique nickname when joining the tournament > done
#make sure same nickname cant exist per tournament (handle inside the code) > done
*/
const db = require('../queries/database');


/*Changes Made: 
1. creator will automatically join the tournament upon creation (they are a logged in account).
whereas the rest of the players are not logged in accounts (guests) and will join as guests with a tournament_alias.

2. will change endpoints + api calls accordingly
*/

//creator will create a tournament and automatically join it
async function createTournament(name, created_by, creator_alias, min_players, max_players){
    //check logged in user who is creating the tournaments
    const creator = db.prepare('SELECT * FROM users WHERE id = ?').get(created_by);
    if(!creator){
        throw new Error('User not found');
    }

    const MIN_NAME_LENGTH = 3;
    if(!name){
        throw new Error('Tournament name is required');
    }
    if(typeof name !== 'string' || name.length < MIN_NAME_LENGTH){
        throw new Error(`Tournament name must be a string with at least ${MIN_NAME_LENGTH} characters`);
    }
    if(min_players < 2){
        throw new Error('Minimum players must be at least 2');
    }
    if(max_players < min_players){
        throw new Error('Maximum players must be greater than or equal to minimum players');
    }
    //insert into tournaments table
    const insert = db.prepare(`INSERT INTO tournaments (name, created_by, creator_alias, min_players, max_players, status) VALUES (?, ?, ?, ?, ?, 'pending')`).run(name, created_by, creator_alias, min_players, max_players);
    console.log('Tournament Created Successfully! ID:', insert.lastInsertRowid);

    //automatically join the creator to the tournament
    const join = db.prepare(`INSERT INTO tournament_players (tournament_id, tournament_alias, status) VALUES (?, ?, 'joined')`).run(insert.lastInsertRowid, creator_alias);
    if(join.changes === 1){
        console.log('Creator joined the tournament successfully');
    }
    else{
        console.log('Error: Creator could not join the tournament');
    }
    return { id: insert.lastInsertRowid };  
}


//only guest players will join now, with only an alias
async function joinTournament(tournamentId, tournamentAlias){
    //check if tournament exists
    const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!tournament){
        throw new Error('Tournament not found');
    }
    const count = db.prepare('SELECT COUNT(*) as total FROM tournament_players WHERE tournament_id = ?').get(tournamentId).total;
    if(count >= tournament.max_players){
        throw new Error('This tournament is full');
    }
    if(!tournamentAlias || tournamentAlias.trim().length === 0){
        throw new Error('Nickname is required for this tournament');
    }
    //check if alias is unique for this tournament
    const isAliasExists = db.prepare('SELECT * FROM tournament_players WHERE tournament_id = ? AND tournament_alias = ?').get(tournamentId, tournamentAlias);
    if(isAliasExists){
        throw new Error('This nickname is already taken in this tournament. Please choose another one.');
    }
    //insert into tournament_players table
    const insert = db.prepare('INSERT INTO tournament_players (tournament_id, tournament_alias, status) VALUES (?, ?, \'joined\')').run(tournamentId, tournamentAlias);
    if(insert.changes === 1){
        console.log('Player joined the tournament successfully');
        return { message: 'Joined tournament successfully', tournamentAlias };
    }
    else{
        throw new Error('Could not join the tournament');
    }
}

async function leaveTournament(tournamentId, tournamentAlias){
    const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!tournament){
        throw new Error('Tournament not found');
    }
    
    
    const player = db.prepare('SELECT * FROM tournament_players WHERE tournament_id = ? AND tournament_alias = ?').get(tournamentId, tournamentAlias);
    if (!player) {
        throw new Error('This alias is not part of the tournament');
    }
    
    //players cant leave tournament if it already started (i will leave it for now)
   if (tournament.status === 'started') {
       throw new Error('Cannot leave a tournament that has already started');
   }
    //if the tournament is pending, allow anyone (including creator) to leave before starting the tournament
    const playerLeave = db.prepare('DELETE FROM tournament_players WHERE tournament_id = ? AND tournament_alias = ?').run(tournamentId, tournamentAlias);
    if (playerLeave.changes === 1) {
        console.log(`Player ${tournamentAlias} left the tournament successfully`);
        return { message: 'Left tournament successfully' };
    } else {
        throw new Error('Could not leave the tournament');
    }
}

async function insertMatch(tournamentId, players, round){
    // Use the provided players (don't query database again)
    if (!players || players.length < 2) {
        throw new Error('Not enough players to create a match');
    }

    // Shuffle players with Fisher–Yates algorithm
    for (let i = players.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [players[i], players[random]] = [players[random], players[i]];
    }

    const matchMaking = [];

    for (let i = 0; i < players.length; i += 2) {
        const player1 = players[i];
        const player2 = players[i + 1];

        // Insert match into game_history as "pending"
        db.prepare(`INSERT INTO game_history (user_id, opponent_id, user_score, opponent_score, result, round, tournament_id, opponent_name) VALUES (NULL, NULL, 0, 0, 'pending', ?, ?, ?)`).run(round, tournamentId,`${player1.tournament_alias} vs ${player2.tournament_alias}`);

        const matchId = db.prepare("SELECT last_insert_rowid() as id").get().id;

        matchMaking.push({ player1, player2, matchId });
    }
    return { matchMaking };
}


async function createMatch(tournamentId){
    const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!tournament){
        throw new Error('Tournament not found');
    }

    // Fetch players for this tournament (winners for final, joined for initial)
    const playersJoined = db.prepare(`
        SELECT tournament_alias 
        FROM tournament_players 
        WHERE tournament_id = ? AND status = 'joined'
    `).all(tournamentId);
    
    const playersWinners = db.prepare(`
        SELECT tournament_alias 
        FROM tournament_players 
        WHERE tournament_id = ? AND status = 'winner'
    `).all(tournamentId);

    // Use winners if available (for final match), otherwise use joined players (for semifinals)
    const players = playersWinners.length >= 2 ? playersWinners : playersJoined;

    if (players.length < 2) {
        throw new Error('Not enough players to create matches');
    }

    const allMatches = [];
    if (players.length === 4) {
        // two matches for semifinal
        const match1 = await insertMatch(tournamentId, players.slice(0, 2), 'semifinal');
        const match2 = await insertMatch(tournamentId, players.slice(2, 4), 'semifinal');
        allMatches.push(...match1.matchMaking, ...match2.matchMaking);
    } 
    else if (players.length === 2) {
        // final round
        const finalMatch = await insertMatch(tournamentId, players, 'final');
        allMatches.push(...finalMatch.matchMaking);
    } 
    else if (players.length === 1) {
        // announce champion
        await declareChampion(tournamentId, players[0]);
    }
    return allMatches;
}

async function startTournament(tournamentId){
    const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!tournament){
        throw new Error('Tournament not found');
    }
    db.prepare(`UPDATE tournaments SET status = 'started' WHERE id = ?`).run(tournamentId);
  
    //start the match depending on the number of players (4 = semifinal / 2 = final)
    const matches = await createMatch(tournamentId);
    console.log('[DEBUG] Matches created and returned to frontend:', matches);
    return{ message: `Tournament ${tournament.name} has started!`, matches};
}

async function updateMatchResults(matchId, userScore, opponentScore){
    const match = db.prepare('SELECT * FROM game_history WHERE id = ?').get(matchId);
    if(!match){
        throw new Error('Match not found');
    }
    //check results of players and decide winner/loser/draw
    const [alias1, alias2] = match.opponent_name.split(" vs ");

    let winnerAlias = null, loserAlias = null;
    let result = 'DRAW';
    if(userScore > opponentScore){
        winnerAlias = alias1;
        loserAlias = alias2;
        result = 'FINISHED';
    }
    else if(userScore < opponentScore){
        winnerAlias = alias2;
        loserAlias = alias1;
        result = 'FINISHED';
    }

    const updateMatch = db.prepare(`UPDATE game_history SET user_score = ?, opponent_score = ?, result = ?, played_at = CURRENT_TIMESTAMP, opponent_name = ? WHERE id = ?
        `).run(userScore, opponentScore, result, `${alias1} vs ${alias2}${winnerAlias ? " | Winner: " + winnerAlias : ""}`, matchId);

    if(updateMatch.changes === 0){
        throw new Error('Could not update match results');
    }
    
    const tournamentId = match.tournament_id;
    //check what round are we in to either advance players or announce champion
    if(match.round === 'semifinal' && winnerAlias){
        db.prepare(`
            UPDATE tournament_players 
            SET status = 'winner' 
            WHERE tournament_id = ? AND tournament_alias = ?
        `).run(tournamentId, winnerAlias);
        
        const semiFinalWinners = db.prepare(`
            SELECT tournament_alias 
            FROM tournament_players 
            WHERE tournament_id = ? AND status = 'winner'
        `).all(tournamentId);

        if (semiFinalWinners.length === 2) {
            await createMatch(tournamentId); // creates final
        }
    }
    else if (match.round === 'final' && winnerAlias) {
        const champion = db.prepare(`
            SELECT tournament_alias 
            FROM tournament_players 
            WHERE tournament_id = ? AND tournament_alias = ?
        `).get(tournamentId, winnerAlias);

        if (champion) {
            await declareChampion(tournamentId, champion);
        }
    }
    return { winnerAlias, loserAlias }; 
}

async function declareChampion(tournamentId, winner){
    if (!winner || !winner.tournament_alias) {
        throw new Error('Winner alias is required');
    }

    // mark the tournament as finished and record winner
    db.prepare(`
        UPDATE tournaments
        SET status = 'finished', finished_at = CURRENT_TIMESTAMP, creator_alias = ?
        WHERE id = ?
    `).run(winner.tournament_alias, tournamentId);

    return { tournamentId, champion: winner.tournament_alias };
}
module.exports = {
    createTournament,
    joinTournament,
    leaveTournament,
    insertMatch,
    createMatch,
    startTournament,
    updateMatchResults,
    declareChampion
};