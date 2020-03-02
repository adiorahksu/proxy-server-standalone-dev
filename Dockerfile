FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

EXPOSE 7777

# You can change this
CMD [ "npm", "run" ]
