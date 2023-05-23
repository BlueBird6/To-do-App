# Use the official Node.js runtime as the base image
FROM node:18.12.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install client dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend code
COPY . .

# Expose the port that the client will run on
EXPOSE 3000

# Set the command to start the client
CMD ["npm", "start"]
