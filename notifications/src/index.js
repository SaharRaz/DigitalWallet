import express from 'express';
import connectDB from './systems/dbConnection.js';
import notificationsRoutes from './routes/notifications.routes.js';
import logger from './systems/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/notifications', notificationsRoutes);

// Start the server
app.listen(PORT, () => {
    logger.info(`Notifications service running on port ${PORT}`);
});
