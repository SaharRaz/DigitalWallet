import express from 'express';
import userController from '../controller/user.controller.js';
import validateSchema from '../systems/middleware/validateSchema.middleware.js';
import { createUserSchema, updateUserSchema } from './user.routes.schema.js';
import logger from '../systems/logger.js';

const router = express.Router();

// Create a new user
router.post('/', validateSchema(createUserSchema), async (req, res) => {
    try {
        const newUser = await userController.createUser(req.body);
        logger.info('POST /users - New user created', { data: newUser });
        res.status(201).json(newUser);
    } catch (err) {
        logger.error('POST /users - Error creating user', { error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await userController.getAllUsers();
        console.info('GET /users - Fetched all users');
        res.status(200).json(users);
    } catch (err) {
        console.error('GET /users - Error fetching users', { error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await userController.getUserById(req.params.id); // Fetch user by ID
        if (!user) {
            logger.warn('GET /users/:id - User not found', { id: req.params.id });
            return res.status(404).json({ error: 'User not found' });
        }
        logger.info('GET /users/:id - Fetched user by ID', { id: req.params.id });
        res.status(200).json(user);
    } catch (err) {
        logger.error('GET /users/:id - Error fetching user', { id: req.params.id, error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// Update a user by ID
router.put('/:id', validateSchema(updateUserSchema), async (req, res) => {
    try {
        const updatedUser = await userController.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            logger.warn('PUT /users/:id - User not found for update', { id: req.params.id });
            return res.status(404).json({ error: 'User not found' });
        }
        logger.info('PUT /users/:id - User updated successfully', { id: req.params.id });
        res.status(200).json(updatedUser);
    } catch (err) {
        logger.error('PUT /users/:id - Error updating user', { id: req.params.id, error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await userController.deleteUser(req.params.id);
        if (!deletedUser) {
            logger.warn('DELETE /users/:id - User not found for deletion', { id: req.params.id });
            return res.status(404).json({ error: 'User not found' });
        }
        logger.info('DELETE /users/:id - User deleted successfully', { id: req.params.id });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        logger.error('DELETE /users/:id - Error deleting user', { id: req.params.id, error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
