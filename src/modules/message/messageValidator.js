import Joi from "joi"
export const creataMessageSchema = Joi.object({
    content: Joi.string()
        .trim()
        .min(1)
        .max(150)
        .required()
        .messages({
            "string.empty": "Message content cannot be empty",
            "string.min": "Message content must have at least 1 character",
            "string.max": "Message content cannot exceed 150 characters",
            "any.required": "Message content is required"
        })
});

