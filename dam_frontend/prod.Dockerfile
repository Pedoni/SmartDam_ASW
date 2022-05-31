FROM ubuntu:latest

RUN apt update
RUN apt upgrade -y
RUN apt install npm sass make -y

WORKDIR /home/dam_frontend

COPY . .

EXPOSE 8080

RUN npm install
RUN make sass
CMD npm run serve