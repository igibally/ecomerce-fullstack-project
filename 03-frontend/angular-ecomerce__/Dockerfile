FROM node:11.15.0 as build-step
WORKDIR /app
COPY .  /app/

FROM nginx:1.16.0 as prod-stage

COPY --from=build-step /app/angular-ecomerce/dist /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx","-g","daemon off;"]