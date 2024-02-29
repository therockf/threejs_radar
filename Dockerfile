FROM node:21.6.2-alpine as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

ENV NODE_OPTIONS="--openssl-legacy-provider --no-experimental-fetch"
# Generate the build of the application
RUN npm run build:prod

FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/prod /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./.htpasswd /etc/nginx/.htpasswd