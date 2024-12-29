import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // Wait 10 seconds for MongoDB to respond
        });
        logger.info('MongoDB connected successfully (Transactions Service)');
    } catch (err) {
        logger.error('Error connecting to MongoDB:', { error: err.message });
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
