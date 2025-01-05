// const express = require('express');
// const connectDB = require('../../db/dbConnection');
// const userRoutes = require('./routes/user.routes');
import express from "express";
import connectDB from "./db/dbConnection.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Start server
connectDB().then(() => {
    app.listen(5001,  '0.0.0.0',() => {
        console.log(`Users service running on port ${5001}`);
    });
})

