const fastify = require('fastify')({logger: true});
// Enable CORS for frontend requests
fastify.register(require('@fastify/cors'), { 
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
});
// ...existing code...
const db = require('./queries/database');

fastify.register(require('./routes/users'));
fastify.register(require('./routes/tournaments'));
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