FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm install --save

CMD ["npm","start"]
