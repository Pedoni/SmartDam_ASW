FROM node:18.3.0-alpine3.15

EXPOSE 3000

WORKDIR /home/dam_backend

COPY . .

RUN npm install
CMD npm start