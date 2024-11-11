FROM node:20-alpine
LABEL authors="jhonattan"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3027

CMD ["npm", "run", "start:dev"]