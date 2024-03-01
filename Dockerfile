FROM node:21.6.2-alpine as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

ENV NODE_OPTIONS="--openssl-legacy-provider --no-experimental-fetch"
# Generate the build of the application
RUN npm run build:prod

FROM httpd:2.4

COPY --from=build /usr/local/app/dist/prod /usr/local/apache2/htdocs/
COPY .htaccess /usr/local/apache2/htdocs/
COPY httpd.conf /usr/local/apache2/conf/httpd.conf
RUN chmod -R 755 /usr/local/apache2/htdocs/
COPY ./.htpasswd /usr/local/apache2/.htpasswd

COPY ./gensslcert.sh /usr/local/apache2/gensslcert.sh
RUN ./gensslcert.sh
# Copy the build output to replace the default nginx contents.
#COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
#COPY ./default.conf /etc/nginx/conf.d/default.conf