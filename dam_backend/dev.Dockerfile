FROM ubuntu:20.04

RUN apt update
RUN apt upgrade -y
RUN apt install curl gnupg2 -y

RUN curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -

RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list

ARG DEBIAN_FRONTEND=noninteractive

RUN apt update
RUN apt install mongodb-org -y

# Installing latest LTS version of nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt install nodejs -y

EXPOSE 27017
EXPOSE 3000

WORKDIR /home/dam_backend

CMD npm install && npm start