FROM php:8.2-apache

ENV TZ=America/Detroit
ENV DB_PASSWORD=DSqFO9Cr3ZNzBLJIpz3G2AlC9gN9HtR

# Update the Container
RUN apt-get update
RUN apt-get install nodejs npm python3 python3-pip  -y
RUN apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y

# Install Setup Scripts
COPY ./startup /etc/init.d/
RUN chmod +x /etc/init.d/api && chmod +x /etc/init.d/raven
RUN update-rc.d raven defaults && update-rc.d api defaults


# Setup Raven Websocket Server
WORKDIR /app
COPY ./raven /app

RUN python3 -m pip install --no-cache-dir --break-system-packages -r requirements.txt


# Setup Apache
WORKDIR /var/www/apache
RUN a2enmod ssl && a2enmod rewrite && a2enmod proxy && a2enmod proxy_http && a2enmod proxy_balancer && a2enmod proxy && a2enmod proxy_http && a2enmod proxy_wstunnel
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN mkdir -p /etc/apache2/ssl



COPY ./config/honeywall-apache.conf /etc/apache2/sites-available/honeywall-apache.conf
COPY ./apache /var/www/apache

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
RUN a2dissite 000-default && a2ensite honeywall-apache
RUN service apache2 restart

# Setup the NodeJS App
WORKDIR /var/www/node
COPY ./node /var/www/node
COPY package*.json /var/www/node/
RUN npm install

RUN chown -R www-data:www-data /var/www/apache
RUN chown -R www-data:www-data /var/www/node

EXPOSE 443

CMD service apache2 start && service raven start && node /var/www/node/server.js
