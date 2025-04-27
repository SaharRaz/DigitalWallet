import dotenv from 'dotenv';
import { env } from '../configs/config.js';
import logger from '../middleware/logger.js';
import mongoose from 'mongoose';
import { SERVICE_NAME } from '../configs/constants.js';

dotenv.config();

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI || 'mongodb://root:root@mongodb-user:27017/userDb?authSource=admin';

    logger.debug(`${SERVICE_NAME}[dbConnection] 🔌 Mongo URI: ${mongoURI}`);
    logger.debug(`${SERVICE_NAME}[dbConnection] 🔌 Mongo URI: ${env.MONGO_URI}`);

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        logger.info(`${SERVICE_NAME}[dbConnection] MongoDB connected`);
    } catch (err) {
        logger.error(`${SERVICE_NAME}[dbConnection] MongoDB connection failed:`, { error: err.message });
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
