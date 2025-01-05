import express from 'express';
import connectDB from './db/dbConnection.js';
import userRoutes from './users/src/routes/user.routes.js';
import transactionsRoutes from './transactions/src/routes/transaction.routes.js';
import groupsRoutes from './groups/src/routes/group.routes.js';
import notificationsRoutes from './notifications/src/routes/notification.routes.js';
import logger from './logger.js';

// Initialize MongoDB Connection
const initializeDatabase = async () => {
    try {
        await connectDB();
        logger.info('Database connection established successfully.');
    } catch (error) {
        logger.error('Failed to initialize database connection:', { error: error.message });
        process.exit(1); // Exit the process if database connection fails
    }
};

const startServices = async () => {
    const app = express();
    app.use(express.json());

    // Register all routes for each service
    app.use('/users', userRoutes);
    app.use('/transactions', transactionsRoutes);
    app.use('/groups', groupsRoutes);
    app.use('/notifications', notificationsRoutes);

    // Define ports for each service
    const PORTS = [5001, 5002, 5003, 5004];

    // Start an instance of the app for each service
    PORTS.forEach((port, index) => {
        app.listen(port, () => {
            logger.info(`Service ${index + 1} running on port ${port}`);
            console.log(`Service ${index + 1} running on http://localhost:${port}`);
        });
    });
};

// Initialize Database Connection and Start Services
initializeDatabase().then(() => {
    startServices().then(r => {});
});
