Users Service - Confluence Documentation
Overview
The Users Service is a standalone microservice responsible for managing user-related data in the Digital Wallet system. It handles creation, retrieval, updating, and deletion of user information.

Technologies Used
Node.js (v18+)
Express.js
Mongoose (MongoDB ODM)
Docker / Docker Compose
Winston (Logging)

Folder Structure
users-service/
|-- src/
|   |-- controller/
|   |   `-- user.controller.js
|   |-- db/
|   |   `-- dbConnection.js
|   |-- model/
|   |   `-- user.model.js
|   |-- routes/
|   |   |-- user.routes.js
|   |   `-- user.routes.schema.js
|   |-- systems/
|   |   |-- logger.js
|   |   `-- middleware/
|   |       `-- validateSchema.middleware.js
|   `-- index.js
|-- Dockerfile
|-- package.json
|-- docker-compose.yml

API Endpoints
Base URL
http://localhost:5001/users
Create a User
POST /
Body
{
  "name": "John Doe",
  "balance": 100,
  "userId": "123"
}
Get All Users
GET /
Get a User by ID
GET /:id
Update a User
PUT /:id
Body
{
  "balance": 150
}
Delete a User
DELETE /:id

Environment Variables
Defined via docker-compose.yml or .env (optional)
PORT=5001
MONGO_URI=mongodb://root:root@mongodb-user:27017/userDb?authSource=admin

MongoDB Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  userId: { type: String, required: true, unique: true }
});

Run the Service
Docker
docker-compose up --build
Local (without Docker)
npm install
npm run dev

Logging
All requests and errors are logged using Winston in logs/ folder.

Notes
MongoDB must be running (either locally or via Docker).
Ensure the correct port and credentials are configured.

TODOs
Add unit testing
Add Swagger documentation
Add integration with notification-service

