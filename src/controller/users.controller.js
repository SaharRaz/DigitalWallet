

export default class UsersController {
    constructor(UserModel, logger, axiosClient, notificationUrl) {
        this.User = UserModel;
        this.logger = logger;
        this.axios = axiosClient;
        this.notificationUrl = notificationUrl;
    }

    async createUser(data) {
        try {
            console.log('🔗 Notification URL:', this.notificationUrl);
            const user = new this.User(data);
            const saved = await user.save();

            this.logger.info('[user-service][createUser] User created', { userId: saved.userId });

            // Notify
            await this.axios.post(this.notificationUrl, {
                userId: saved.userId,
                message: `🎉 Welcome ${saved.name}! Your account is active.`,
            });

            return saved;
        } catch (err) {
            this.logger.error('[user-service][createUser] Error:', { error: err.message });
            throw err;
        }
    }

    async getAllUsers() {
        try {
            const users = await this.User.find().lean();
            this.logger.info('[user-service][getAllUsers] Fetched all users', { count: users.length });
            return users;
        } catch (err) {
            this.logger.error('[user-service][getAllUsers] Error:', { error: err.message });
            throw err;
        }
    }

    async getUserByUserId(userId) {
        try {
            const user = await this.User.findOne({ userId }).lean();
            if (!user) {
                this.logger.warn('[user-service][getUserByUserId] Not found', { userId });
                return null;
            }
            this.logger.info('[user-service][getUserByUserId] Found', { userId });
            return user;
        } catch (err) {
            this.logger.error('[user-service][getUserByUserId] Error:', { error: err.message });
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
                this.logger.warn('[user-service][updateUser] Not found', { userId: data.userId });
                return null;
            }

            this.logger.info('[user-service][updateUser] Success', { userId: data.userId });
            return updated;
        } catch (err) {
            this.logger.error('[user-service][updateUser] Error:', { error: err.message });
            throw err;
        }
    }

    async deleteUser(mongoId) {
        try {
            const deleted = await this.User.findByIdAndDelete(mongoId).lean();
            if (!deleted) {
                this.logger.warn('[user-service][deleteUser] Not found', { id: mongoId });
                return null;
            }

            this.logger.info('[user-service][deleteUser] Success', { id: mongoId });
            return deleted;
        } catch (err) {
            this.logger.error('[user-service][deleteUser] Error:', { error: err.message });
            throw err;
        }
    }
}
