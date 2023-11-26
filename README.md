# HoneyWall

Welcome to the HoneyWall Project.
This project was built as a capstone project for our Cybersecurity Degree. The name, HoneyWall, comes from the fact that this is a low interaction honeypot with a frontend website for viewing data on the attackers connections, kind of like a wall. If you use this application in your own environment:

**DO SO AT YOUR OWN RISK!**
This application requires that you understand what you are setting up, and that you are intentionally allowing a vulnerable application into your network. We tried to secure this application as much as we could. Some recommended tips:

 - Put this in a DMZ
 - Separate VLAN
 - Place on a Raspberry Pi or VM

# Docker Compose 
```
"3.7"
services:
  db_honey:
    container_name: db_honey
    image: devhippo/honeywall-db:latest
    command: --default-authentication-plugin=mysql_native_password
    environment:
      MYSQL_ROOT_PASSWORD: P@ssw0rd123!
    volumes:
      - "./data:/var/lib/mysql"
    ports:
      - "3308:3306"
    networks:
      - web_data
      - honeywall_data
    restart: unless-stopped
    logging:
      driver: none

  web_honey:
    container_name: web_honey
    image: devhippo/honeywall-www:latest
    environment:
      TZ: America/Detroit
    ports:
      - "8442:80"
      - "8443:443"
    networks:
      - web_data
    restart: unless-stopped
    depends_on:
      - db_honey

  application_honey:
    container_name: app_honey
    image: devhippo/honeywall-app:latest
    environment:
      - TZ=America/Detroit
    ports: # List of Open Ports Being Honeypotted by the Application, Comment out those you don't need
      - "2121:21"
      - "2222:22"
      - "2323:23"
      - "8700:80"
      - "4443:443"
      - "3389:3389"
    depends_on:
      - db_honey
    restart: unless-stopped
    networks:
      - honeywall_data
    logging:
      options:
        max-size: "10m"
        max-file: "3"

networks:
  honeywall_data:
    driver: bridge
  web_data:
    driver: bridge
```
```
nano docker-compose.yml
# PASTE THE CONTENTS ABOVE INTO THE FILE
docker-compose up -d
```

## Building From Source

    git clone "https://github.com/DevelopingHippo/HoneyWall"
    cd HoneyWall/Docker
    docker-compose up -d
