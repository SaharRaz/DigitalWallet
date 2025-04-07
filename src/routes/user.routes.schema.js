import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    balance: Joi.number().min(0).required(),
    userId: Joi.string().min(1).required(),
});

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(100),
    balance: Joi.number().min(0),
    userId: Joi.string().min(1).required(),
});

