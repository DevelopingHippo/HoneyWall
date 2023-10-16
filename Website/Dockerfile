FROM php:8.2-apache

# Update the Container
RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y
RUN apt-get install nodejs npm -y
RUN apt-get update && apt-get upgrade -y

# Setup the Website
WORKDIR /var/www/apache
RUN a2enmod ssl && a2enmod rewrite && a2enmod proxy && a2enmod proxy_http && a2enmod proxy_balancer
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN mkdir -p /etc/apache2/ssl
COPY ./config/certs/honeywall.key /etc/apache2/ssl/honeywall.key
COPY ./config/certs/honeywall.pem /etc/apache2/ssl/honeywall.pem
COPY ./config/honeywall-apache.conf /etc/apache2/sites-available/honeywall-apache.conf
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2dissite 000-default && a2ensite honeywall-apache
RUN service apache2 restart
# Setup the NodeJS App
WORKDIR /var/www/node
COPY package*.json /var/www/node
RUN npm install

# Move Web Page Files into their Directories
COPY ./node /var/www/node
COPY ./apache /var/www/apache

RUN chown -R www-data:www-data /var/www/apache
RUN chown -R www-data:www-data /var/www/node/api

EXPOSE 443

CMD service apache2 start && node /var/www/node/server.js