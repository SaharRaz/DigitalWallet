import Notification from '../model/notification.model.js';
import logger from '../../../logger.js';

const notificationsController = {
    async createNotification(data) {
        try {
            const notification = new Notification(data);
            const savedNotification = await notification.save();
            logger.info('Notification created successfully', { id: savedNotification._id });
            return savedNotification;
        } catch (err) {
            logger.error('Error creating notification', { error: err.message });
            throw err;
        }
    },

    async getAllNotifications() {
        try {
            const notifications = await Notification.find();
            logger.info('Fetched all notifications');
            return notifications;
        } catch (err) {
            logger.error('Error fetching notifications', { error: err.message });
            throw err;
        }
    },

    async getNotificationById(notificationId) {
        try {
            const notification = await Notification.findById(notificationId);
            if (!notification) {
                logger.warn('Notification not found', { id: notificationId });
                return null;
            }
            logger.info('Fetched notification by ID', { id: notificationId });
            return notification;
        } catch (err) {
            logger.error('Error fetching notification by ID', { error: err.message });
            throw err;
        }
    },

    async updateNotification(notificationId, updateData) {
        try {
            const updatedNotification = await Notification.findByIdAndUpdate(notificationId, updateData, { new: true });
            if (!updatedNotification) {
                logger.warn('Notification not found for update', { id: notificationId });
                return null;
            }
            logger.info('Notification updated successfully', { id: notificationId });
            return updatedNotification;
        } catch (err) {
            logger.error('Error updating notification', { error: err.message });
            throw err;
        }
    },

    async deleteNotification(notificationId) {
        try {
            const deletedNotification = await Notification.findByIdAndDelete(notificationId);
            if (!deletedNotification) {
                logger.warn('Notification not found for deletion', { id: notificationId });
                return null;
            }
            logger.info('Notification deleted successfully', { id: notificationId });
            return deletedNotification;
        } catch (err) {
            logger.error('Error deleting notification', { error: err.message });
            throw err;
        }
    },
};

export default notificationsController;
