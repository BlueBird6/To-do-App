# Use the official Node.js runtime as the base image
FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install server dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port that the server will listen on
EXPOSE 4000

# Set the command to start the server
CMD ["node", "index.js"]
