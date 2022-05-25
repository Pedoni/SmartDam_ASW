FROM ubuntu:latest

RUN apt update
RUN apt upgrade -y
RUN apt install npm sass make -y

WORKDIR /home/dam_frontend

EXPOSE 8080

CMD make