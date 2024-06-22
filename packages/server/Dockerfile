# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY tsconfig.json ./

# Install NestJS CLI globally (optional)
RUN npm install -g @nestjs/cli
# Install dependencies
RUN npm install

COPY ./ .

RUN npm run clean

RUN npm run build
# RUN npm run migration:run

# RUN npm run seed:run

# RUN npm run build

# Copy the rest of your application code
# Expose the port on which the app runs
EXPOSE 4000

# Command to run your application
COPY wait-for-it.sh /wait-for-it.sh

CMD ["sh", "-c", "./wait-for-it.sh mysql:3306 -- npm run migration:generate && npm run migration:run && npm run start:prod"]