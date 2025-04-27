import { SERVICE_NAME } from '../configs/constants.js';

export default class UsersController {
    constructor({ User, logger, axios, notificationUrl }) {
        this.User = User;
        this.logger = logger;
        this.axios = axios;
        this.notificationUrl = notificationUrl;
    }

    async createUser(data) {
        try {
            console.log('[createUser] req.body:', data);
            this.logger.info(`${SERVICE_NAME}[createUser] Notification URL: ${this.notificationUrl}`);
            const user = new this.User(data);
            console.log('[createUser] User instance:', user);
            const saved = await user.save();

            this.logger.info(`${SERVICE_NAME}[createUser] User created`, { userId: saved.userId });

            // Notify
            await this.axios.post(this.notificationUrl, {
                userId: saved.userId,
                message: `🎉 Welcome ${saved.name}! Your account is active.`,
            });

            return saved;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[createUser] Error:`, { error: err.message });
            throw err;
        }
    }

    async getAllUsers() {
        try {
            const users = await this.User.find().lean();
            this.logger.info(`${SERVICE_NAME}[getAllUsers] Fetched all users`, { count: users.length });
            return users;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[getAllUsers] Error:`, { error: err.message });
            throw err;
        }
    }

    async getUserByUserId(userId) {
        try {
            const user = await this.User.findOne({ userId }).lean();
            if (!user) {
                this.logger.warn(`${SERVICE_NAME}[getUserByUserId] Not found`, { userId });
                return null;
            }
            this.logger.info(`${SERVICE_NAME}[getUserByUserId] Found`, { userId });
            return user;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[getUserByUserId] Error:`, { error: err.message });
            throw err;
        }
    }

    async updateUser(data) {
        try {
            const updated = await this.User.findOneAndUpdate(
                { userId: data.userId },
                { balance: data.balance },
                { new: true }
            ).lean();

            if (!updated) {
                this.logger.warn(`${SERVICE_NAME}[updateUser] Not found`, { userId: data.userId });
                return null;
            }

            this.logger.info(`${SERVICE_NAME}[updateUser] Success`, { userId: data.userId });
            return updated;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[updateUser] Error:`, { error: err.message });
            throw err;
        }
    }

    async deleteUser(mongoId) {
        try {
            const deleted = await this.User.findByIdAndDelete(mongoId).lean();
            if (!deleted) {
                this.logger.warn(`${SERVICE_NAME}[deleteUser] Not found`, { id: mongoId });
                return null;
            }

            this.logger.info(`${SERVICE_NAME}[deleteUser] Success`, { id: mongoId });
            return deleted;
        } catch (err) {
            this.logger.error(`${SERVICE_NAME}[deleteUser] Error:`, { error: err.message });
            throw err;
        }
    }
}
