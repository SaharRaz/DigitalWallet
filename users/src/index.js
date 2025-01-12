import express from "express";
import connectDB from "./db/dbConnection.js";
import userRoutes from "./routes/user.routes.js";
import logger from "./systems/logger.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Start server
connectDB().then(() => {
    app.listen(5001, '0.0.0.0', () => {
        logger.info(`Users service running on port ${5001}`);
    });
}).catch((err) => {
    logger.error('Failed to connect to MongoDB', { error: err.message });
});
