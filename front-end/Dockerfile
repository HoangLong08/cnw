FROM node:14.17.1-alpine
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . .
CMD ["npm", "start"]