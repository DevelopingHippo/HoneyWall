FROM python:3.12.0a5-bullseye

RUN mkdir -p /app
WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt autoremove -y

RUN git clone "https://github.com/DevelopingHippo/HoneyWall.git"
RUN pip install -r requirements.txt

RUN mv /app/Honeywall/Application/src /app
RUN del -r /app/Honeywall

CMD ["python3", "/app/src/honeywall.py"]