# FROM node:alpine
# # Create app directory
# WORKDIR /app
# # COPY package.json and package-lock.json files

# COPY package*.json ./
# RUN npm install


# # generated prisma files
# COPY prisma ./prisma/

# # COPY ENV variable
# COPY .env ./

# # COPY tsconfig.json file
# COPY tsconfig.json ./

# # COPY
# COPY . .
# RUN npx prisma generate
# RUN npm run build

# # Run and expose the server on port 3000
# EXPOSE 3000/tcp
# # A command to start the server
# CMD [ "node", "dist/main.js" ]

FROM node:20 AS builder
# Create app directory
WORKDIR /app

COPY package*.json  ./
# Install application dependencies
RUN npm ci
COPY . .
# Run prisma generate
RUN npx prisma generate
# Copy migration data
COPY prisma ./prisma/
# build the application
RUN npm run build

FROM node:20

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


EXPOSE 3000
CMD [ "npm" , "run" , "start:prod" ]