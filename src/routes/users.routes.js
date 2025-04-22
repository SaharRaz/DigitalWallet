import express from 'express';
import validateSchema from '../validations/users.validateSchema.middleware.js';
import { createUserSchema, updateUserSchema } from '../schema/users.schema.js';

export default function (controller) {
    const router = express.Router();


    router.post('/createUser', validateSchema(createUserSchema), async (req, res) => {
        try {
            const user = await controller.createUser(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    router.get('/getAllUsers', async (req, res) => {
        try {
            const users = await controller.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    router.get('/getUserByUserId/:userId', async (req, res) => {
        try {
            const user = await controller.getUserByUserId(req.params.userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    router.put('/updateUser', validateSchema(updateUserSchema), async (req, res) => {
        try {
            const updated = await controller.updateUser(req.body);
            if (!updated) return res.status(404).json({ error: 'User not found' });
            res.status(200).json(updated);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    router.delete('/deleteUser/:id', async (req, res) => {
        try {
            const deleted = await controller.deleteUser(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}
