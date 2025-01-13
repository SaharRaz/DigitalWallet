import Joi from 'joi';

export const createGroupSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    balance: Joi.number().min(0).required(),
    members: Joi.array().items(Joi.string()), // Array of user IDs
});

export const updateGroupSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    balance: Joi.number().min(0),
    members: Joi.array().items(Joi.string()),
});
