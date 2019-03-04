FROM node:dubnium-alpine as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --verbose
COPY . ./
RUN npm run build --verbose

FROM nginx:1.15.4-alpine
COPY --from=build-stage /usr/src/app/public /var/www
COPY --from=build-stage /usr/src/app/server/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]