FROM node:12-slim

WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update
RUN apt-get install python -y
RUN apt-get install make -y
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
