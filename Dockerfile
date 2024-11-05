# Use the official Node.js image from the Docker Hub
FROM node:22-alpine

# Install PostgreSQL client in order to run pg_dump command
#Alpine Linux uses apk as its package manager instead of apt-get.
RUN apk update && apk add postgresql-client

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Command to Compile TypeScript to JavaScript in watch mode and (run the compiled JavaScript file) 
CMD ["/bin/sh", "-c", "tsc -w & npm start"]

