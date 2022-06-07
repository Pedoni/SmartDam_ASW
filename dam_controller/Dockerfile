FROM python:3.10.4-alpine3.16

RUN pip install requests

WORKDIR /home

COPY sensor.py .

CMD python ./sensor.py