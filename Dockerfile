FROM node:20.8.0
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
# Install app dependencies
RUN npm install
# RUN npx prisma migrate dev --name="init"
COPY . .

# RUN npm run start:prod

# FROM node:20.8.0

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ] 
# CMD [ "npm", "run","start:prod"]
