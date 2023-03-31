FROM node:lts-alpine
WORKDIR /app
COPY . /app
RUN npm install
ENV API_URL=simple-tracker-api:8081
CMD [ "npm", "start"]
