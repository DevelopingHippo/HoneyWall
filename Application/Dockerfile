FROM python:3.12.0a5-bullseye

WORKDIR /opt

RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt autoremove -y

RUN git clone "https://github.com/DevelopingHippo/HoneyWall.git"
RUN cd ./HoneyWall/Application/
RUN pip install -r requirements.txt

RUN mkdir -p /app
RUN mv /opt/HoneyWall/Application/src /app
RUN rm -r /opt/HoneyWall/

CMD ["python3", "/app/src/honeywall.py"]