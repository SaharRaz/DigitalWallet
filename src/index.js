import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/dbConnection.js';
import container from './configs/awilix.js';
import { env } from './configs/config.js';
import createRoutes from './routes/users.routes.js';
import { SERVICE_NAME } from './configs/constants.js';
import logger from './middleware/logger.js';

dotenv.config();

await connectDB();

const app = express();


app.use(express.json());

const usersController = container.resolve('usersController');
const usersRouter = createRoutes(usersController);

app.use('/users', usersRouter);

app.listen(env.PORT, () => {
    logger.info(`${SERVICE_NAME}[index] Service running at http://localhost:${env.PORT}`);
});
