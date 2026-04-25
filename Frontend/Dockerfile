# Dockerfile for Frontend (static files + Nginx)
FROM nginx:1.25-alpine as prod
COPY ./*.html /usr/share/nginx/html/
COPY ./*.js /usr/share/nginx/html/
COPY ./*.css /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
