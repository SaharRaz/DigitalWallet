import Joi from 'joi';

export const createUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    balance: Joi.number().min(0).required(),
    userId: Joi.string().required()
});

export const updateUserSchema = Joi.object({
    userId: Joi.string().required(),
    balance: Joi.number().min(0).required()
});
