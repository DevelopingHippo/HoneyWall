FROM python:3.11.4-slim-bullseye


RUN apt-get update && apt-get install -y tzdata
ENV TZ=America/Detroit
ENV DB_PASSWORD=DSqFO9Cr3ZNzBLJIpz3G2AlC9gN9HtR
#RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y && apt autoremove -y && apt install libpq-dev python3-dev gcc -y

COPY ./src ./
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python3", "/app/honeywall.py"]