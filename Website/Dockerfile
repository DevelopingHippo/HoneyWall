FROM php:8.0-apache

# Create and work from the /www directory
WORKDIR /var/www/

# Setup the NodeJS Application

RUN apt-get update && apt-get upgrade -y
RUN a2enmod ssl && a2enmod rewrite && a2enmod proxy
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

RUN mkdir -p /etc/apache2/ssl

RUN apt-get install nodejs npm
RUN mkdir /var/www/app
COPY ./app /var/www/app
COPY package*.json /var/www/app

COPY ./config/certs/store.key /etc/apache2/ssl/store.key
COPY ./config/certs/store.pem /etc/apache2/ssl/store.pem
COPY ./config/honeywall-apache.conf /etc/apache2/sites-available/000-default.conf

