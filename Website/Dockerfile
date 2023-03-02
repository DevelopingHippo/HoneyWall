FROM php:8.0-apache

# Update the image
RUN apt-get update && apt-get upgrade -y


# Add MySQLi extension to PHP
RUN a2enmod mysqli
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli



# Create SSL Cert Directory and Import Certificates
RUN mkdir -p /etc/apache2/ssl
COPY ./config/certs/honeywall.key /etc/apache2/ssl/honeywall.key
COPY ./config/certs/honeywall.pem /etc/apache2/ssl/honeywall.pem
COPY ./config/honeywall-apache.conf /etc/apache2/sites-available/000-default.conf


RUN a2enmod ssl
RUN a2enmod rewrite
RUN a2enmod