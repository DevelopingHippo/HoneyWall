FROM php:8.0-apache

# Create and work from the /apache directory
WORKDIR /var/www/apache

# Update the Container
RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y
RUN apt-get install nodejs npm -y
RUN apt-get update && apt-get upgrade -y

# Setup the Website
RUN a2enmod ssl && a2enmod rewrite && a2enmod proxy
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN mkdir -p /etc/apache2/ssl
COPY ./apache /var/www/apache
COPY ./config/certs/honeywall.key /etc/apache2/ssl/honeywall.key
COPY ./config/certs/honeywall.pem /etc/apache2/ssl/honeywall.pem
COPY ./config/honeywall-apache.conf /etc/apache2/sites-available/honeywall-apache.conf
RUN a2dissite 000-default && a2ensite honeywall-apache && service apache2 restart

# Setup the NodeJS App
RUN mkdir /var/www/node
COPY package*.json /var/www/node
WORKDIR /var/www/node
RUN npm install
COPY ./node /var/www/node

EXPOSE 8080
EXPOSE 3000
EXPOSE 80
CMD [ "node", "/var/www/node/server.js" ]

