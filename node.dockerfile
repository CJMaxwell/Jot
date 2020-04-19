FROM node:latest

WORKDIR /server/app

COPY package*.json ./

RUN npm install

COPY . ./

#VOLUME ["/Documents/PREN"]

EXPOSE 4000

CMD ["npm","run","dev"]