FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm run setup-production

CMD ["npm","start"]