import Joi from 'joi';

export const updateUserValidationSchema = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
  });