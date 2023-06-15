FROM php:8.0-apache

# Create and work from the /www directory
WORKDIR /var/www/

# Update the Container
RUN apt-get install nodejs npm -y
RUN apt-get update && apt-get upgrade -y

# Setup the Website
RUN a2enmod ssl && a2enmod rewrite && a2enmod proxy
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN mkdir -p /etc/apache2/ssl
COPY ./config/certs/honeywall.key /etc/apache2/ssl/honeywall.key
COPY ./config/certs/honeywall.pem /etc/apache2/ssl/honeywall.pem
COPY ./config/honeywall-apache.conf /etc/apache2/sites-available/000-default.conf

# Setup the NodeJS App
RUN mkdir /var/www/app
COPY package*.json /var/www/app
RUN npm install
COPY ./app /var/www/app

EXPOSE 8081
CMD [ "node", "/var/www/app/server.js" ]

