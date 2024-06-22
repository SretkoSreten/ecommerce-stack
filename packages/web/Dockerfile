# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]