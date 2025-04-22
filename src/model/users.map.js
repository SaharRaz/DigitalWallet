import express from 'express';
import userController from '../controller/users.controller.js';
import validateSchema from '../validations/users.validateSchema.middleware.js';
import { createUserSchema, updateUserSchema } from '../schema/users.schema.js';

const router = express.Router();

router.post('/', validateSchema(createUserSchema), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/userId/:userId', userController.getUserByUserId);
router.put('/updateUser', validateSchema(updateUserSchema), userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;
