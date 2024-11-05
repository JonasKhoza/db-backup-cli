#Microsoft does not provide a pre-built version of mssql-tools for Alpine Linux.
# Stage 1: Install mssql-tools and dependencies
FROM mcr.microsoft.com/mssql-tools:latest AS mssql-tools

# Stage 2: Use the official Node.js image from the Docker Hub
FROM node:22-alpine

# Copy sqlcmd and related tools from the mssql-tools stage
COPY --from=mssql-tools /opt/mssql-tools/bin/sqlcmd /usr/local/bin/
COPY --from=mssql-tools /opt/mssql-tools/bin/bcp /usr/local/bin/
COPY --from=mssql-tools /opt/mssql-tools/bin/* /usr/local/bin/

# Installing PostgreSQL client in order to run pg_dump command
#Alpine Linux uses apk as its package manager instead of apt-get.
RUN apk update && apk add postgresql-client

# Installing mysql client in order to run pg_dump command
RUN apk update && apt-get install -y mysql-client

#Installing gzip for compression in some of my DBMS's bakup compression
RUN apk update && apk install -y gzip

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

