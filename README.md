Users Service

A standalone microservice in the Digital Wallet system responsible for handling user-related data and operations.

Features

Create, retrieve, update, and delete users

MongoDB integration using Mongoose

Request validation using Joi

Logging with Winston

Technologies

Node.js

Express.js

MongoDB

Mongoose

Docker

Winston

Joi

Getting Started

Prerequisites

Docker

Node.js (for local development)

Running with Docker

docker-compose up --build

Running Locally (Without Docker)

npm install
npm run dev

Note: Make sure MongoDB is running locally if not using Docker.

Environment Variables

Set in docker-compose.yml or via .env file:

PORT=5001
MONGO_URI=mongodb://root:root@mongodb-user:27017/userDb?authSource=admin

API Endpoints

Base URL: http://localhost:5001/users

Create User

POST /

Body:

{
  "name": "John Doe",
  "balance": 100,
  "userId": "123"
}

Get All Users

GET /

Get User by ID

GET /:id

Update User

PUT /:id

Body:

{
  "balance": 200
}

Delete User

DELETE /:id

Project Structure

users-service/
|-- src/
|   |-- controller/
|   |-- db/
|   |-- model/
|   |-- routes/
|   |-- systems/
|   `-- index.js
|-- Dockerfile
|-- docker-compose.yml
|-- package.json

Logging

All application logs are handled by Winston and saved to the logs/ directory.
