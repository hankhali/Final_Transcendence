//ask the user to register with their information
//give the user previlidge to choose avatar/delete avatar
//check user input
//user can change username/change password
//here we are fetching the data
//fetch users from database
//get user by id will fetch the specific user's data depending on its id
// const getUserById = (userId, ())
//sql or query
//note (if(!username || !email || !password)) (if they are not provided) console.log(all fields required)
//authenticate users is a MUST for security
// In better-sqlite3, when you run a modifying query (like INSERT, UPDATE, or DELETE) using .run(), it returns an object with information about what happened. One of the properties is changes.

const db = require('../queries/database');
const bcrypt = require('bcrypt');
// const multer = require('multer');

//insert a new user into the database
async function createUser(username, password, email){

    //validate username input
    const MAX_USERNAME_LENGTH = 15;
    const MIN_PASSWORD_LENGTH = 6;
    //regular expression: It checks for something like name@example.com but doesn’t allow spaces, multiple @, or missing dots.
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(username.length > MAX_USERNAME_LENGTH){
        throw new Error(`Username cannot exceed ${MAX_USERNAME_LENGTH} characters`);
    }
    //validate password input and password is not empty
    if(password.length < MIN_PASSWORD_LENGTH){
        throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
    }

    if(email && !EMAIL_REGEX.test(email)){
        throw new Error('Invalid email format');
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    
    const stmt = db.prepare(`INSERT INTO users (username, password, email, alias) VALUES (?, ?, ?, ?)`);
    try{
        // Use username as default alias
        const sql = stmt.run(username, hashedPassword, email, username);
        console.log('User Created Successfully!');
        console.log(sql); //debug
        return { id: sql.lastInsertRowid }; //returns the ID of the newly created user from sqlite
    }
    catch(error){
        console.error('SQL Error:', error); //debug
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.code === 'SQLITE_CONSTRAINT'){
            throw new Error('Username or email already exists');
        }
        throw error;
    }
};


async function setAlias(userId, alias){
    //is user who wants to set an alias exist
    const user = db.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    if(!user){
        throw new Error('User not found');
    }

    const MAX_NAME_LENGTH = 15;
    if(!alias || alias.length > MAX_NAME_LENGTH){
        throw new Error(`Alias is required and max ${MAX_NAME_LENGTH} character are allowed`);
    }
    const exists = db.prepare('SELECT id FROM users WHERE alias = ?').get(alias);
    if (exists) {
        throw new Error('Alias already taken');
    }
    db.prepare('UPDATE users SET alias = ? WHERE id = ?').run(alias, userId);
    return { message: 'Alias updated successfully', alias};

}


async function userLogIn(username, password){
    //validate input
    if(!username || !password){
        throw new Error('All fields are required');
    }

    //search for user in database
    const stmt = db.prepare(`SELECT id, username, password FROM users WHERE username = ?`);
    const user = stmt.get(username); //for a single row
    if(!user){
        throw new Error('Invalid username or password');
    }

    //compare hashed password with the entered password
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
        throw new Error('invalid username or password');
    }
    //return user info
    return {userId: user.id, username: user.username};
}


//A logged-in player opening their own dashboard would call getUserdata().
//this is for authentcated users (who logged in and their token/session ID matches the requested profile ID)
//The userId should not come from the client. You should take it from the JWT/session of the logged-in user (so they can only see their own data).
//userId = authenticatedUserId, ID from auth (their own profile). / ID from session/JWT (your own profile).
async function getUserdata(userId){
    const fetchData = db.prepare('SELECT id, alias, username, email, avatar, player_matches, player_wins, created_at FROM users WHERE id = ?').get(userId);
    if(!fetchData){
        throw new Error(`User with ID ${userId} not found`);
    }

    const getGameHistory = db.prepare(`SELECT * FROM game_history WHERE user_id = ? ORDER BY played_at DESC`).all(userId);
    console.log('[DEBUG] getUserdata for userId:', userId);
    console.log('[DEBUG] Fetched user:', fetchData);
    console.log('[DEBUG] Fetched gameHistory:', getGameHistory);
    if(!getGameHistory){
        throw new Error('Error fetching game history');
    }
    //return an object that contains user data and their game history
    return {user: fetchData, gameHistory: getGameHistory};
}



//Viewing another player’s profile in a match lobby or leaderboard would call getPublicProfile().
//this is for when users view other people's profiles: they will be allowed to view specific info excluding sensitive data
//ID from request (any profile). / ID from URL/request param (someone else’s profile).
async function getPublicProfile(targetUserId){ //or username
    const fetchData = db.prepare('SELECT username, alias, avatar, player_matches, player_wins, created_at FROM users WHERE id = ?').get(targetUserId);
    if(!fetchData){
        throw new Error(`User with ID ${targetUserId} not found`);
    }

    const getGameHistory = db.prepare(`SELECT * FROM game_history WHERE user_id = ? ORDER BY played_at DESC`).all(targetUserId);
    //db.prepare().all() always returns an array (even if empty). So this if will never trigger, unless there’s a DB error.
    if(!getGameHistory){
        throw new Error('Error fetching game history');
    }
    //return an object that contains user data and their game history
    return {user: fetchData, gameHistory: getGameHistory};
}





async function deleteMyAccount(userId){
    //check user exists
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (!user){
        throw new Error('User not found');
    }

    //delete user id
    db.prepare('DELETE FROM users WHERE id = ?').run(userId);
    
    //run a function to test that the stats are still there
    //from game_history table
    const matchHistory = db.prepare(`SELECT * FROM game_history
        WHERE user_id IS NULL OR opponent_id IS NULL`).all();
        
        const tournaments = db.prepare(`SELECT * FROM tournaments WHERE winner_id IS NULL OR created_by IS NULL`).all();
        
        //print the results
        console.log('matches with null users: ', matchHistory);
        console.log('tournaments with null users: ', tournaments);

        return { message: "Account deleted successfully" };
}
/*
Validate file types.
Limit file sizes.
Sanitize filenames.
Store the image path in DB, not the image itself (unless small).
Handle uploads securely.
*/




//update user information (nickname/username/password/avatar) using one function
async function updateUserProfile(userId, updates){
    //fetch user
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if(!user){
        throw new Error('Error fetching user');
    }

    const MAX_USERNAME_LENGTH = 15;
    const MAX_NAME_LENGTH = 10;
    const MIN_PASSWORD_LENGTH = 6;
    // 1. Username
    if(updates.username){
        const usernameExists = db.prepare('SELECT 1 FROM users WHERE username = ?').get(updates.username);
        if(usernameExists){
            throw new Error('Username already taken, choose another one');
        }
        if(updates.username.length > MAX_USERNAME_LENGTH){
            throw new Error(`Username cannot exceed ${MAX_USERNAME_LENGTH} characters`);
        }
        db.prepare('UPDATE users SET username = ? WHERE id = ?').run(updates.username, userId);
    }

    // 2. Alias
    if(updates.alias){
        const aliasExists = db.prepare('SELECT 1 FROM users WHERE alias = ?').get(updates.alias);
        if(aliasExists){
            throw new Error('alias already taken, choose another one');
        }
        if(updates.alias.length > MAX_NAME_LENGTH){
            throw new Error(`alias cannot exceed ${MAX_NAME_LENGTH} characters`);
        }
        db.prepare('UPDATE users SET alias = ? WHERE id = ?').run(updates.alias, userId);
    }

    // 3. Password
    if(updates.password){
        if(!updates.oldPassword){
            throw new Error('old password is required');
        }
        const validPassword = await bcrypt.compare(updates.oldPassword, user.password);
        if(!validPassword){
            throw new Error('old password is incorrect!');
        }
        const hashedPassword = await bcrypt.hash(updates.password, 10);
        db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hashedPassword, userId);
    }

    // 4. Avatar (file upload handled separately via /uploads endpoint)
    // if(updates.avatar){
    //     // For simplicity, store base64 string directly (in production, save file and store path)
    //     db.prepare('UPDATE users SET avatar = ? WHERE id = ?').run(updates.avatar, userId);
    // }

    // 5. Bio
    if(updates.bio){
        db.prepare('UPDATE users SET bio = ? WHERE id = ?').run(updates.bio, userId);
    }

    // 6. Skill Level
    if(updates.skillLevel){
        db.prepare('UPDATE users SET skillLevel = ? WHERE id = ?').run(updates.skillLevel, userId);
    }

    return { message: 'Profile updated successfully!' };
    
}

module.exports = {
    createUser,
    userLogIn,
    deleteMyAccount,
    getUserdata,
    getPublicProfile,
    setAlias,
    updateUserProfile //include updating avatar
    // uploadAvatar

};



