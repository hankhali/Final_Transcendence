//schema input validations
//all fiels are required (username, password, nickname)
//passowrd length > 5
//check email input

// /register is where the user will input their information
const { createUser } = require('../controllers/users');
const { userLogIn } = require('../controllers/users');
const { deleteMyAccount } = require('../controllers/users');
const { getUserdata } = require('../controllers/users');
const { getPublicProfile } = require('../controllers/users');
const { updateUserProfile } = require('../controllers/users');
const { setAlias } = require('../controllers/users');
const db = require('../queries/database');
const fs = require('fs'); //filesystem
const path = require('path'); //nodejs
const pump = require('pump'); //pump


async function userRoutes(fastify, options){
    fastify.post('/register', async (request, reply) => {
        try{
            const { username, password, email} = request.body;
            if(!username || !password || !email){
                return reply.code(400).send({error: 'All fields are required!'});
            }
            const newUser = await createUser(username, password, email);
            return reply.code(200).send({message: 'User registered successfully', userId: newUser.id});
        }
        catch(error){
            fastify.log.error("Registeration error:", error);
            return reply.code(500).send({error: error.message}); //debug
        }
    });


    //set alias for user
    fastify.post('/set-alias', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            const { alias } = request.body;
            const userId = request.user.id;
            const result = await setAlias(userId, alias);
            return reply.send(result);
        }
        catch(error){
            console.error("Error setting alias:", error);
            return reply.code(400).send({error: error.message});
        }
    });

    //log in authentication
    fastify.post('/login', async (request, reply) => {
        try{
            //check the username/password
            const { username, password } = request.body;
            const userData = await userLogIn(username, password);


            //if valid, sign a token
            const token = fastify.jwt.sign({
                id: userData.userId, username: userData.username}, {
                    // expiresIn: '2h'
                });
            //return token
            reply.send({message: 'Login successful', token, userId: userData.userId}); //...userData
        }
        catch(error){
            return reply.code(400).send({error: error.message});
        }
    });

    //log out
    fastify.post('/logout', { preHandler: [fastify.authenticate] }, async (req, reply) => {
        return { message: "Logged out successfully" };
    });


    // //upload avatar
    // fastify.post('/upload', async (request, reply) => {
    //     reply.send('Successfully uploaded Avatar');
    // })


    //show registered users (maybe unnecessary)
    fastify.get('/users', async (request, reply) => {
        try{
            const users = db.prepare(`
                SELECT alias, username, avatar, player_matches, player_wins, created_at FROM users
                `).all();
            if(!users || users.length === 0){
                reply.code(404).send({error: 'No users found'});
            }
            return users;
        }
        catch(error){
            return reply.code(500).send({error: error.message});
        }
    });

    //fetch user own profile
    fastify.get('/me', {preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            //If you haven’t set up authentication yet, then request.user won’t exist. You’d need to first implement auth middleware to populate it.
            const id = request.user.id;
            const userData = await getUserdata(id);
            return reply.send(userData); //whichi is better using return or reply and what is the difference?
        }
        catch(error){
            return reply.code(500).send({error: error.message});    
        }
    });


    //update user profile (username, nickname, password, avatar)
    fastify.patch('/me', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            const authUserId = request.user.id;
            const updates = request.body;
            const updateProfile = await updateUserProfile(authUserId, updates);
            return reply.code(200).send(updateProfile);
        }
        catch(error){
            return reply.code(400).send({error: error.message});
        }
    });


    //fetch user public profile
    fastify.get('/users/:id', async (request, reply) => {
        try{
            const { id } = request.params;
            const data = await getPublicProfile(id);
            if(!data){
                return reply.code(404).send({ error: 'User not found' });
            }
            return reply.send(data);

        }
        catch(error){
            return reply.code(500).send({error: error.message});
        }
    });



    //delete user's own profile
    fastify.delete('/me', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            const authUserId  = request.user.id; //get from auth
            const deletion = await deleteMyAccount(authUserId );
            return reply.code(200).send(deletion);
        }
        catch(error){
            return reply.code(500).send({ error: error.message});
        }
    });


    // //delete user by id (maybe unnecessary)
    // fastify.delete('/users/:id', async (request, reply) => {
    //     try{
    //         const { id } = request.params;
    //         const userIdDeleted = await deleteUserById(id);
    //         reply.send(userIdDeleted);
    //     }
    //     catch(error){
    //         return reply.code(400).send({error: error.message});
    //     }
    // });




    //let user upload files using multi-part
    fastify.get('/', async (_, reply) => {
        reply.type('text/html').send(fs.readFileSync("./index.html", 'utf-8'));
    });


    fastify.post('/uploads', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        try{
            const data = await request.file(); //single file
            if(!data){
                return reply.status(400).send({error: 'No file uploaded'});
            }
            
            // const uploadDir = path.join(__dirname, 'uploads');
            // if(!fs.existsSync(uploadDir)) {
            //     fs.mkdirSync(uploadDir);
            // }

            // const saveTo = path.join(uploadDir, data.filename);

            const saveTo = path.join(__dirname, 'uploads', data.filename);
            await pump(data.file, fs.createWriteStream(saveTo));

            reply.send({message: 'Uploaded!', file: data.filename});
        }
        catch(error){
            return reply.code(400).send({error: error.message});
        }
    });



    
}

module.exports = userRoutes;
