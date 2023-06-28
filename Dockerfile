FROM node:latest

WORKDIR /app

COPY . .

RUN npm install --save

CMD ["npm","start"]
