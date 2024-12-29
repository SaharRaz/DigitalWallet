const express = require('express');
const connectDB = require('./systems/dbConnection');
const transactionRoutes = require('./routes/transaction.routes');
// const { port } = require('./config');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/transactions', transactionRoutes);

// Start server
app.listen(port, () => {
    console.log(`Transactions service running on port ${port}`);
});
