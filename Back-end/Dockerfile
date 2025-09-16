FROM node:20-alpine

WORKDIR /app

# Install only production deps with cached layer
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose API port
EXPOSE 5001

# Default command runs Fastify API
CMD ["node", "server.js"]