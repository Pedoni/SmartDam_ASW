FROM node:18.3.0-alpine3.15

RUN apk update
RUN apk upgrade
RUN apk add make

WORKDIR /home/dam_frontend

COPY . .

EXPOSE 8080

RUN npm install
CMD npm run serve