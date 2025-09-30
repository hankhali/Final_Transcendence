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

//fix null when you have authorized user
async function createTournament(name, created_by = null, min_players = 2, max_players = 4){
    //name the tournament
    const MIN_NAME_LENGTH = 3;
   
    if(!name){
        throw new Error('Tournament name is required');
    }
    if(typeof name !== 'string' || name.length < MIN_NAME_LENGTH){
        throw new Error(`Tournament name must be a string with at least ${MIN_NAME_LENGTH} characters`);
    }
    if(!created_by){
        throw new Error('Creator ID is required');
    }
    if(min_players > max_players){
        throw new Error('Minimun players cannot exceed maximum players');
    }


    try{
        const stmt = db.prepare(`INSERT INTO tournaments (name, min_players, max_players, status, created_by)
            VALUES (?, ?, ?, 'pending', ?)`);

        const result = stmt.run(name, min_players, max_players, created_by);
        console.log('Tournament Created Successfully! ID:', result.lastInsertRowid);
        return { id: result.lastInsertRowid };
    }
    catch(error){
        console.error('SQL Error:', error); //debug
        throw error;
    }
}

//player join a specific tournament
async function joinTournament(tournamentId, playerId, alias){
    //make sure the tournament exists
    const checkTournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!checkTournament){
        throw new Error('Tournament not found');
    }
    
    //make sure the tournament didnt exceed the limits of max players
    //count how many players have already joined the tournament
    const count = db.prepare('SELECT COUNT(*) as total FROM tournament_players WHERE tournament_id = ?').get(tournamentId).total;
    if(count >= checkTournament.max_players){
        throw new Error('This tournament is full');
    }
    
    //make sure player input a nickname
    if(!alias || alias.trim().length === 0){
        throw new Error('Nickname is required for this tournament');
    }
    //check if the nickname entered is already used/exists
    //select 1: because we dont want the database to return the entire row, we just want to check if the specfied data exists, if it does a 1 will be returned and if not the result will be null (nothing is returned)
    const isAliasExists = db.prepare('SELECT 1 FROM tournament_players WHERE tournament_id = ? AND tournament_alias = ?').get(tournamentId, alias);
    if(isAliasExists){
        throw new Error('This nickname is already taken in this tournament');
    }

    //make sure this player isnt joining the tournament for the second time, why not? players could rejoin if they accdietnly left the tournament
    const checkPlayer = db.prepare('SELECT * FROM tournament_players WHERE tournament_id = ? AND player_id = ?').get(tournamentId, playerId);
    if(checkPlayer){
        if(checkPlayer.status === 'joined'){
            throw new Error('Player already joined this tournament');
        }

        //allow the players to rejoin of they left the tournament by mistake
        db.prepare('UPDATE tournament_players SET tournament_alias = ?, status = ?, joined_at = CURRENT_TIMESTAMP WHERE tournament_id = ? AND player_id = ?').run(alias,'joined',  tournamentId, playerId);
        return { message: `Player ${playerId} has re-joined the Tournament as ${alias}`};
    }
    else{
        //player is freshly joined
        db.prepare('INSERT INTO tournament_players (tournament_id, player_id, tournament_alias, status) VALUES (?, ?, ?, ?)').run(tournamentId, playerId, alias, 'joined');
        return ({message: `Player ${playerId} has joined Tournament ${tournamentId} as ${alias}`});
    }
}



//show players in a specific (id) tournament
//add score
async function getTournamentDetails(tournamentId){
    //check if tournament exist
    const checkTournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!checkTournament){
        throw new Error('Tournament not found');
    }
    
    //display players who joined this tournament
    const displayPlayers = db.prepare(`
        SELECT tournament_players.player_id, tournament_players.tournament_alias, users.username, users.avatar
        FROM tournament_players
        JOIN users ON tournament_players.player_id = users.id
        WHERE tournament_players.tournament_id = ?
        AND tournament_players.status = 'joined'`).all(tournamentId);
    return { checkTournament, displayPlayers };
}




async function leaveTournament(tournamentId, playerId){
    //check if tournament exist
    const checkTournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!checkTournament){
        throw new Error('Tournament not found');
    }

    //before leaving, you should check if the player who wants to leave is in the tournament or not
    const isPlayerExists = db.prepare('SELECT * FROM tournament_players WHERE tournament_id = ? AND player_id = ?').get(tournamentId, playerId);
    if(!isPlayerExists){
        throw new Error('Player not found in this tournament');
    }

    //players cant leave tournament if it already started (i will leave it for now)
    if (checkTournament.status === 'started') {
        throw new Error('Cannot leave a tournament that has already started');
    }

    //decide whether you want to delete the player and their history permanently or what (soft deletion for now)
    //mark player as left
    db.prepare(`UPDATE tournament_players SET status = 'left' WHERE tournament_id = ? AND player_id = ?`).run(tournamentId, playerId);
    return { message: `Player ${playerId} has left Tournament ${tournamentId}` };
}









//insert matches and call them in createMatches
//saving the matches into database
//without knowing which round we are in, it just create and insert matches
async function insertMatch(tournamentId, players, round){
    //take players who joined the match and shuffle
    //shuffle players for matchmaking
    //shuffle = randomize the list. matchmaking = take that list and create pairs (or groups)
    //if we dont shuffle, players will be matched in the order the joined
    
    if(!players || players.length < 2){
        throw new Error('Not enough players to create a match');
    }

    //shuffle here maybe*
    const matchMaking = [];
    for(let i = 0; i < players.length; i += 2){
        const player1 = players[i];
        const player2 = players[i + 1];
    
        //insert match into game_history as pending
        //check result - support guest players with opponent_name
        // For guest tournaments, we need a valid user_id, so we'll use the tournament creator
        const tournament = db.prepare('SELECT created_by FROM tournaments WHERE id = ?').get(tournamentId);
        const userId = tournament.created_by; // Use tournament creator as user_id
        
        const insertResult = db.prepare(`INSERT INTO game_history (user_id, opponent_id, user_score, opponent_score, result, round, tournament_id, opponent_name) VALUES (?, NULL, 0, 0, 'pending', ?, ?, ?)`).run(
            userId, // Use tournament creator as user_id
            round, 
            tournamentId,
            `${player1.tournament_alias} vs ${player2.tournament_alias}`  // Store both player names
        );

        matchMaking.push({ player1, player2, matchId: insertResult.lastInsertRowid });
    }

    //return matchmaking so the fronted can show the players and who plays with who
    return{ matchMaking };
}



//consider creating maybe a class or object to detect which round are we currently in
//if 4 players are playing then it is a semi final
//if only 2 players are playing then it is a final match
//check how many active players are left in the tournament and decide what round i am in

async function createMatch(tournamentId, playersList = null){
    //tournament exist
    const tournament = db.prepare('SELECT * FROM tournaments WHERE id = ?').get(tournamentId);
    if(!tournament){
        throw new Error('Tournament not found');
    }

    //check for active players the shuffle them, call insertMatch to matchmake the players then create the match

    const players = playersList || db.prepare(`SELECT player_id, tournament_alias FROM tournament_players WHERE tournament_id = ? AND status = 'joined' ORDER BY RANDOM()`).all(tournamentId);

    const allMatches = [];
    if(players.length === 4){
        //create two matches for 4 players (semi-final)
        const match1 = await insertMatch(tournamentId, players.slice(0,2), 'semifinal');
        const match2 = await insertMatch(tournamentId, players.slice(2,4), 'semifinal');
        allMatches.push(...match1.matchMaking, ...match2.matchMaking);
    }
    //use spread opeartor to expand the array
    else if(players.length === 2){
        //insert final round in this tournament
        const finalMatch = await insertMatch(tournamentId, players, 'final');
        allMatches.push(...finalMatch.matchMaking);
    }

    else if(players.length === 1){
        //announce winner
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

    // Log all matchIds in game_history for this tournament
    const allMatches = db.prepare('SELECT id, user_id, opponent_id, round, tournament_id FROM game_history WHERE tournament_id = ?').all(tournamentId);
    console.log('[DEBUG] All matches in DB for tournament', tournamentId, allMatches);
    allMatches.forEach((m, idx) => {
        console.log(`[DEBUG] DB match[${idx}] id:`, m.id);
    });

    //start the match depending on the number of players (4 = semifinal / 2 = final)
    const matches = await createMatch(tournamentId);
    if (matches && matches.length) {
        matches.forEach((m, idx) => {
            console.log(`[DEBUG] Backend matches[${idx}] matchId:`, m.matchId);
        });
    }
    console.log('[DEBUG] Matches created and returned to frontend:', matches);
    return{ message: `Tournament ${tournament.name} has started!`, matches};
}

//check winners of the semi-final and update result
//create final match
//fetch final winner and declare tournament champion
//function to update match resutls and insert them into game history
async function updateMatchResults(matchId, userScore, opponentScore){
    // Log all matchIds in game_history before updating
    const allMatches = db.prepare('SELECT id, user_id, opponent_id, round, tournament_id FROM game_history').all();
    console.log('[DEBUG] All matches in DB before updateMatchResults:', allMatches);
    allMatches.forEach((m, idx) => {
        console.log(`[DEBUG] DB match[${idx}] id:`, m.id);
    });

    const match = db.prepare('SELECT id, user_id, opponent_id, round, tournament_id FROM game_history WHERE id = ?').get(matchId);
    if(!match){
        console.error('[DEBUG] No match found for matchId:', matchId);
        throw new Error('No match found');
    }

    //check results of players, decide winner and loser
    let winner, loser;
    if(userScore > opponentScore){
        winner = match.user_id;
        loser = match.opponent_id;
    }
    else if(userScore < opponentScore){
        winner = match.opponent_id;
        loser = match.user_id;
    }

    console.log('[DEBUG] updateMatchResults called:', { matchId, userScore, opponentScore, winner, loser });

    //update game history with match results
    const updateMatch = db.prepare(`UPDATE game_history
        SET user_score = ?, opponent_score = ?, winner_id = ?, loser_id = ?, played_at = CURRENT_TIMESTAMP
        WHERE id = ?`).run(userScore, opponentScore, winner, loser, matchId);

    console.log('[DEBUG] updateMatchResults DB update:', updateMatch);

    if(updateMatch.changes === 0){
        throw new Error('Failed to update the game history');
    }


    const tournamentId = match.tournament_id;
    //check what round are we in to either advance players or announce champion
    if(match.round === 'semifinal'){
        
        //fetch winners and advance them to the final round
        const semiFinalWinners = db.prepare(`SELECT tp.player_id, tp.tournament_alias
            FROM game_history gh
            JOIN tournament_players tp ON tp.player_id = gh.winner_id
            WHERE gh.tournament_id = ? AND gh.round = 'semifinal'`).all(tournamentId);
        //when we have 2 winners we can advance 
        if(semiFinalWinners.length === 2){
            await createMatch(tournamentId, semiFinalWinners);
        }
    }
    else if(match.round === 'final'){
        //tournament is finished, declare winner 
        const champion = db.prepare('SELECT tp.player_id, tp.tournament_alias FROM tournament_players tp WHERE tp.tournament_id = ? AND tp.player_id = ?').get(tournamentId, winner);
        await declareChampion(tournamentId, champion);
    }
    return {winner, loser}; 
}






async function declareChampion(tournamentId, winner){
    if(!winner || !winner.player_id){
        throw new Error('Winner information is required');
    }

    //mark the tournament as finished
    db.prepare(`UPDATE tournaments
        SET winner_id = ?, status = 'finished', finished_at = CURRENT_TIMESTAMP
        WHERE id = ?`).run(winner.player_id, tournamentId);

    //return the winner
    return {tournamentId, winner: winner.player_id, nickname: winner.tournament_alias};
}


module.exports = {
    createTournament,
    joinTournament,
    getTournamentDetails,
    leaveTournament,
    startTournament,
    insertMatch,
    createMatch,
    updateMatchResults,
    declareChampion
};