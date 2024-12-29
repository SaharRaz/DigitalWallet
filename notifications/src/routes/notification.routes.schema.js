import Joi from 'joi';

export const createNotificationSchema = Joi.object({
    userId: Joi.string().required(),
    message: Joi.string().min(3).max(255).required(),
    status: Joi.string().valid('UNREAD', 'READ'),
});

export const updateNotificationSchema = Joi.object({
    message: Joi.string().min(3).max(255),
    status: Joi.string().valid('UNREAD', 'READ'),
});
