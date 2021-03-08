FROM node:8.16.1-alpine
WORKDIR /pp
COPY . /app
RUN npm install
EXPOSE 3005
CMD node src/index.js