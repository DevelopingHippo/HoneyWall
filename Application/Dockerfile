FROM python:3.11.4-slim-bullseye

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt autoremove -y && apt install libpq-dev -y

# THIS IS FOR LATER
#WORKDIR /opt
#RUN git clone "https://github.com/DevelopingHippo/HoneyWall.git"
#RUN cd ./HoneyWall/Application/
#RUN mkdir -p /api
#RUN mv /opt/HoneyWall/Application/src /api
#RUN rm -r /opt/HoneyWall/

COPY ./src ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["python3", "/app/honeywall.py"]