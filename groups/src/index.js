import express from 'express';
import connectDB from './systems/dbConnection.js';
import groupsRoutes from './routes/group.routes.js';
import logger from './systems/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/groups', groupsRoutes);

// Start the server
app.listen(PORT, () => {
    logger.info(`Groups service running on port ${PORT}`);
});
