FROM python:3.11.4-slim-bullseye


RUN apt-get update && apt-get install -y tzdata
ENV TZ=America/Detroit
ENV DB_PASSWORD=P@ssw0rd
#RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt autoremove -y && apt install libpq-dev python3-dev gcc -y

# THIS IS FOR LATER
#WORKDIR /opt
#RUN git clone "https://github.com/DevelopingHippo/HoneyWall.git"
#RUN cd ./HoneyWall/Application/
#RUN mkdir -p /app
#RUN mv /opt/HoneyWall/Application/src /app
#RUN rm -r /opt/HoneyWall/

COPY ./src ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python3", "/app/honeywall.py"]