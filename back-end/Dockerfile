FROM node

WORKDIR /usr/src/app
COPY . .

EXPOSE 3001

RUN npm ci
CMD node src/index.js