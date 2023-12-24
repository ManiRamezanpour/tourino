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

