# MERN Stack Todo App with GraphQL

This repository contains a MERN (MongoDB, Express.js, React.js, Node.js) stack Todo application with a backend implemented using GraphQL. The application allows users to create, read, update, and delete todo items.

## Folder Structure

The repository is organized into the following folders:

- `backend`: Contains the backend server implementation using Express.js and GraphQL.
- `frontend`: Contains the frontend client implementation using React.js.

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js: [Download and install Node.js](https://nodejs.org/en/download/).
- MongoDB: [Download and install MongoDB](https://www.mongodb.com/try/download/community).

## Installation

Follow the steps below to install and set up the application:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/BlueBird6/To-do-App.git
   
2. Go to the project directory:

   ```bash
   cd To-Do-App
  
3. Install the server dependencies:
  
   ```bash
   npm run install-server
  
4. Install the client dependencies:

   ```bash
   npm run install-client

## Usage
To start the application, follow the steps below:

1. Start the server:

   ```bash
   npm run start-server
The server will start running on http://localhost:4000.

2. Start the client:

   Open another terminal and run the following command:
   
   ```bash
   npm run start-client
The client application will open in your default web browser at http://localhost:3000.

# To dockerize the app follow the below instructions

## Prerequisites

Before running the application, ensure that you have the following installed:

- Docker: [Download and install Docker](https://www.docker.com/get-started).

## Update the backend code to use the MongoDB connection URL:

In the backend/index.js file, go to line 32 and replace 'url' with 'urlMongoDocker'.
urlMongoDocker has already been declared in line 8

### Run the Docker containers using Docker Compose
   ```bash
   docker-compose up
   ```
Now the App can be accessed at http://localhost:3000 in your web browser
