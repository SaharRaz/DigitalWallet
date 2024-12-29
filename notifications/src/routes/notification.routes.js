import express from 'express';
import notificationsController from '../controller/notifications.controller.js';
import validateSchema from '../systems/middleware/validateSchema.middleware.js';
import { createNotificationSchema, updateNotificationSchema } from './notifications.routes.schema.js';

const router = express.Router();

// Create a new notification
router.post('/', validateSchema(createNotificationSchema), async (req, res) => {
    try {
        const notification = await notificationsController.createNotification(req.body);
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all notifications
router.get('/', async (req, res) => {
    try {
        const notifications = await notificationsController.getAllNotifications();
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get notification by ID
router.get('/:id', async (req, res) => {
    try {
        const notification = await notificationsController.getNotificationById(req.params.id);
        if (!notification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a notification by ID
router.put('/:id', validateSchema(updateNotificationSchema), async (req, res) => {
    try {
        const updatedNotification = await notificationsController.updateNotification(req.params.id, req.body);
        if (!updatedNotification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json(updatedNotification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedNotification = await notificationsController.deleteNotification(req.params.id);
        if (!deletedNotification) return res.status(404).json({ error: 'Notification not found' });
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
