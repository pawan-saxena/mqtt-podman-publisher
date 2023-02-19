FROM node:16

RUN mkdir -p /home/mqtt_podman_publisher

# Create app directory
WORKDIR /home/mqtt_podman_publisher

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm install

#set environment to be used in later stages if needed
ARG MQTT_BROKER_HOST=127.0.0.1
ARG MQTT_BROKER_PORT=1883

ENV MQTT_BROKER_HOST=${MQTT_BROKER_HOST}
ENV MQTT_BROKER_PORT=${MQTT_BROKER_PORT}

# Bundle app source
COPY . .

EXPOSE 8080
EXPOSE 80
EXPOSE 3000
EXPOSE 1883

CMD [ "node", "server.js" ]
