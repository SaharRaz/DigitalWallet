import User from '../model/user.model.js';
import logger from '../systems/logger.js';
// import mongoose from "mongoose";

const userController = {
    // Create a new user

    async createUser(data) {
        try {
            const savedUser = await User.create(data); // ✅ Corrected here
            logger.info('User created successfully', { id: savedUser.userId }); // ✅ Corrected here
            return savedUser;
        } catch (err) {
            logger.error('Error creating user', { error: err.message });
            throw err;
        }
    },


    // Retrieve all users
    async getAllUsers() {
        try {
            const users = await User.find({},{},{});
            logger.info('Fetched all users', { count: users.length });
            return users;
        } catch (err) {
            logger.error('Error fetching users', { error: err.message });
            throw err;
        }
    },

    // Find a user by ID
    // async getUserById(userId) {
    //     try {
    //         const objectId = new mongoose.Types.ObjectId(userId);
    //         // Query by the userId field in your schema
    //         const user = await User.findOne( objectId );
    //         if (!user) {
    //             logger.warn('User not found', { userId }); // Log the custom userId
    //             return null;
    //         }
    //         logger.info('Fetched user by userId', { userId });
    //         return user;
    //     } catch (err) {
    //         logger.error('Error fetching user by userId', { error: err.message });
    //         throw err;
    //     }
    // },
    async getUserByUserId(userId) {
        try {
            // Query by the custom userId field
            const user = await User.findOne({ userId: userId }); // Find by custom userId
            if (!user) {
                logger.warn('User not found', { userId }); // Log if user not found
                return null;
            }
            logger.info('Fetched user by userId', { userId });
            return user;
        } catch (err) {
            logger.error('Error fetching user by userId', { error: err.message });
            throw err;
        }
    },

    // Update a user by ID
    async updateUser(data) {
        try {
            const {userId,balance} = data
            const updatedUser = await User.findOneAndUpdate({userId}, {balance},{});
            if (!updatedUser) {
                logger.warn('User not found for update', { id: userId });
                return null;
            }
            logger.info('User updated successfully', { id: userId });
            return updatedUser;
        } catch (err) {
            logger.error('Error updating user', { error: err.message });
            throw err;
        }
    },

    // Delete a user by ID
    async deleteUser(userId) {
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            if (!deletedUser) {
                logger.warn('User not found for deletion', { id: userId });
                return null;
            }
            logger.info('User deleted successfully', { id: userId });
            return deletedUser;
        } catch (err) {
            logger.error('Error deleting user', { error: err.message });
            throw err;
        }
    },
};

export default userController;
