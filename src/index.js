import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/dbConnection.js';
import userRoutes from './routes/users.routes.js';
import UsersController from './controller/users.controller.js';

import User from './model/users.model.js';
import logger from './middleware/logger.js';
import axiosClient from './systems/axiosClient.js';

dotenv.config();

const start = async () => {
    await connectDB();

    // ✅ Construct controller once here
    const usersController = new UsersController(
        User,
        logger,
        axiosClient,
        process.env.NOTIFICATION_SERVICE_URL
    );

    const app = express();
    app.use(express.json());

    // ✅ Inject controller into route registration
    app.use('/users', userRoutes(usersController));

    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        logger.info(`[user-service][index] Service running at http://localhost:${PORT}`);
    });
};

start();
