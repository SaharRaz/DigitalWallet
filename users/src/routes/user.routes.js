import express from 'express';
import userController from '../controller/user.controller.js';
import validateSchema from '../systems/middleware/validateSchema.middleware.js';
import { createUserSchema, updateUserSchema } from './user.routes.schema.js';
// import logger from '../../../logger.js';

const router = express.Router();

// Create a new user
router.post('/', validateSchema(createUserSchema), async (req, res) => {
    try {
        const newUser = await userController.createUser(req.body);
        console.info('POST /users - New user created');
        res.status(201).json(newUser);
    } catch (err) {
        console.error('POST /users - Error creating user', { error: err.message });
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
        const user = await userController.getUserById(req.params.id);
        if (!user) {
            console.warn('GET /users/:id - User not found', { id: req.params.id });
            return res.status(404).json({ error: 'User not found' });
        }
        console.info('GET /users/:id - Fetched user by ID', { id: req.params.id });
        res.status(200).json(user);
    } catch (err) {
        console.error('GET /users/:id - Error fetching user', { error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a user by ID
router.put('/:id', validateSchema(updateUserSchema), async (req, res) => {
    try {
        const updatedUser = await userController.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            console.warn('PUT /users/:id - User not found for update', { id: req.params.id });
            return res.status(404).json({ error: 'User not found' });
        }
        console.info('PUT /users/:id - User updated successfully', { id: req.params.id });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('PUT /users/:id - Error updating user', { error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await userController.deleteUser(req.params.id);
        if (!deletedUser) {
            console.warn('DELETE /users/:id - User not found for deletion', { id: req.params.id });
            return res.status(404).json({ error: 'User not found' });
        }
        console.info('DELETE /users/:id - User deleted successfully', { id: req.params.id });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('DELETE /users/:id - Error deleting user', { error: err.message });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
