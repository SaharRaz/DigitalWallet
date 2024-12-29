import User from '../model/user.model.js';
// import logger from '../../../logger.js';

const userController = {
    // Create a new user
    async createUser(data) {
        try {
            const user = new User(data);
            const savedUser = await user.save();
            console.info('User created successfully', { id: savedUser._id });
            return savedUser;
        } catch (err) {
            console.error('Error creating user', { error: err.message });
            throw err;
        }
    },

    // Retrieve all users
    async getAllUsers() {
        try {
            const users = await User.find();
            console.info('Fetched all users');
            return users;
        } catch (err) {
            console.error('Error fetching users', { error: err.message });
            throw err;
        }
    },

    // Find a user by ID
    async getUserById(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                console.warn('User not found', { id: userId });
                return null;
            }
            console.info('Fetched user by ID', { id: userId });
            return user;
        } catch (err) {
            console.error('Error fetching user by ID', { error: err.message });
            throw err;
        }
    },

    // Update a user by ID
    async updateUser(userId, updateData) {
        try {
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
            if (!updatedUser) {
                console.warn('User not found for update', { id: userId });
                return null;
            }
            console.info('User updated successfully', { id: userId });
            return updatedUser;
        } catch (err) {
            console.error('Error updating user', { error: err.message });
            throw err;
        }
    },

    // Delete a user by ID
    async deleteUser(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                console.warn('User not found for deletion', { id: userId });
                return null;
            }
            console.info('User deleted successfully', { id: userId });
            return deletedUser;
        } catch (err) {
            console.error('Error deleting user', { error: err.message });
            throw err;
        }
    },
};

export default userController;
