# use node alpine as base image
FROM node:14-alpine as base
# install system build dependencies
RUN apk add make
# import work files
WORKDIR /app
COPY . .
# build production files
ARG SWOB_DEV_BE_HOST
ARG SWOB_DEV_SSL_ENABLE
ARG SWOB_DEV_SSL_CRT_FILE
ARG SWOB_DEV_SSL_KEY_FILE

RUN export SWOB_DEV_BE_HOST=${SWOB_BE_HOST} \
    SWOB_DEV_SSL_ENABLE=${SWOB_DEV_SSL_ENABLE} \
    SWOB_DEV_SSL_CRT_FILE=${SWOB_DEV_SSL_CRT_FILE} \
    SWOB_DEV_SSL_KEY_FILE=${SWOB_DEV_SSL_KEY_FILE}

RUN make

# base image for apache
FROM httpd:2.4 as apache
WORKDIR /usr/local/apache2

# production build with ssl
FROM apache as production
# copy custom apache config with ssl enabled
COPY configs/httpd.prod.conf ./conf/httpd.conf
COPY configs/httpd-ssl.conf ./conf/extra/httpd-ssl.conf

# import built files
COPY --from=base /app/build ./htdocs

EXPOSE 443

# dev build without ssl
FROM apache as development
# copy custom apache config
COPY configs/httpd.conf ./conf/httpd.conf
# import built files
COPY --from=base /app/build ./htdocs

EXPOSE 80


