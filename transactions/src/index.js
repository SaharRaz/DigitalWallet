import express from "express";
import connectDB from "./db/dbConnection.js";
import transactionRoutes from  './routes/transaction.routes.js'

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);

// Start server

connectDB().then(() => {
    app.listen(5002, '0.0.0.0',() => {
        console.log(`Transactions service running on port ${5002}`);
    });
})