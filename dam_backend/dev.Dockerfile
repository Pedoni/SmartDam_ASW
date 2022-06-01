FROM mongo

RUN apt update
RUN apt upgrade -y
RUN apt install curl gnupg2 -y

ARG DEBIAN_FRONTEND=noninteractive

# Installing latest LTS version of nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install nodejs -y

EXPOSE 27017
EXPOSE 3000

WORKDIR /home/dam_backend

RUN mongod &

CMD npm install && npm start