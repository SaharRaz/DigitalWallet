// const mongoose = require('mongoose');
// const { mongoURI } = require('../config');
//
// const connectDB = async () => {
//     try {
//         await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//         console.log('MongoDB connected for Notifications service');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error.message);
//         process.exit(1);
//     }
// };
//
// module.exports = connectDB;


import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
        });
        logger.info('MongoDB connected successfully (Notifications Service)');
    } catch (err) {
        logger.error('Error connecting to MongoDB:', { error: err.message });
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
