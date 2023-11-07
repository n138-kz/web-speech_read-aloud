FROM php:8.0-apache

RUN set -x && \
	apt-get -y update

RUN set -x && \
	apt-get -y upgrade

RUN set -x && \
	apt-get -y install iputils-ping

RUN set -x && \
	apt-get -y install postgresql

RUN set -x && \
	apt-get -y install postgresql-contrib

RUN set -x && \
	apt-get -y install libpq-dev
	
RUN set -x && \
	docker-php-ext-install pdo_pgsql

RUN set -x && \
	apt-get -y install certbot

RUN set -x && \
