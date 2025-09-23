// hanieh added: Register onevone route for standalone 1v1 matches
// This is for frontend 1v1 games, not tournaments
// I am responsible for frontend, so I added this route registration
const fastify = require('fastify')({logger: true});
// Serve static files from uploads directory
fastify.register(require('@fastify/static'), {
    root: require('path').join(__dirname, 'uploads'),
    prefix: '/uploads/',
});
// hanieh fixed: Enable CORS for all frontend requests (any origin)
fastify.register(require('@fastify/cors'), { 
    origin: true, // Allows requests from any origin
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

fastify.register(require('@fastify/multipart'));

const db = require('./queries/database');

fastify.register(require('./routes/users'));
fastify.register(require('./routes/tournaments'));
fastify.register(require('./routes/onevone')); // hanieh added
fastify.register(require('./routes/ai')); // hanieh added: AI match route
require('dotenv').config();
fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET
});



//a reusable preHandler that verifies tokens and attaches the user to request.user
fastify.decorate('authenticate', async (request, reply) => {
    try{
        await request.jwtVerify();

        //fetch user from db, ensure user still exists
        const user = db.prepare('SELECT id, username, alias, avatar FROM users WHERE id = ?').get(request.user.id);
        if(!user){
            return reply.code(401).send({error: 'Invalid token (user not found)'});
        }
        request.user = user;
    }
    catch(error){
        return reply.code(401).send({error: 'Not authenticated: ' + error.message});
    }
});


const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5001;
const start = async () => {
    try {
        await fastify.listen({port: PORT, host: '0.0.0.0'})
    }
    catch(error){
        fastify.log.error(error);
        process.exit(1);
    }
};

start();