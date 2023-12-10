FROM docker.arvancloud.ir/node:20.8.0
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:20.8.0

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000
# CMD [ "npm", "run", "start:dev" ]
CMD [ "node", "./dist/src/main.js"]
