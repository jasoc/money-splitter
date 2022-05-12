FROM node:18-alpine3.14
WORKDIR /app
COPY . /app
RUN npm cache clean --force
RUN npm install
RUN npm run build:prod
FROM nginx:1.21.6-alpine
COPY --from=0 /app/dist/ /usr/share/nginx/html
