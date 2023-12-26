FROM node:20 AS builder
# Create app directory
WORKDIR /app

COPY package*.json  ./
# Install application dependencies
RUN npm ci
COPY . .
# Copy migration data

# build the application
RUN npx prisma migrate deploy
RUN npx prisma generate

RUN npm run build
FROM node:20

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD [ "npm" , "run" , "start:migrate:prod" ]

