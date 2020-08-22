FROM node:11.15.0 as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM nginx:1.16.0 as prod-stage

COPY --from=build-step /app/dist/dockerangular /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx","-g","daemon off;"]