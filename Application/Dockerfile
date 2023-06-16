FROM python:3.12.0a5-bullseye

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt autoremove -y

# THIS IS FOR LATER
#WORKDIR /opt
#RUN git clone "https://github.com/DevelopingHippo/HoneyWall.git"
#RUN cd ./HoneyWall/Application/
#RUN mkdir -p /app
#RUN mv /opt/HoneyWall/Application/src /app
#RUN rm -r /opt/HoneyWall/

COPY ./requirements.txt ./opt
RUN pip install -r /opt/requirements.txt
COPY ./src /app
CMD ["python3", "/app/src/honeywall.py"]