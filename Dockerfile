FROM node:lts-alpine as build-stage
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install
COPY --chown=node . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /home/node/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
