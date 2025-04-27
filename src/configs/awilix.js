import { createContainer, asClass, asValue } from 'awilix';
import axios from 'axios';
import logger from '../middleware/logger.js';
import UsersController from '../controller/users.controller.js';
import User from '../model/users.model.js';
import { env } from './config.js';

const axiosClient = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' }
});

const container = createContainer();

container.register({
    axios: asValue(axiosClient),
    logger: asValue(logger),
    UserModel: asValue(User),
    notificationUrl: asValue(env.NOTIFICATION_SERVICE_URL),
    usersController: asClass(UsersController)
        .inject(() => ({
            User: container.resolve('UserModel'),
            logger: container.resolve('logger'),
            axios: container.resolve('axios'),
            notificationUrl: container.resolve('notificationUrl'),
        }))
        .singleton()
});

export default container;
