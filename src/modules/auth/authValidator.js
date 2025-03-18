import Joi from "joi";
export const signupSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.empty": "Name cannot be empty",
            "string.min": "Name must be at least 3 characters",
            "string.max": "Name cannot exceed 50 characters",
            "any.required": "Name is required"
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Invalid email format",
            "any.required": "Email is required"
        }),

    password: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)
    .required()
    .messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password cannot exceed 30 characters",
        "string.pattern.base": "Password must contain at least one uppercase letter and one number",
        "any.required": "Password is required"
    })
    });



    export const loginSchema = Joi.object({
        email: Joi.string().trim().email().required().messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Invalid email format",
            "any.required": "Email is required"
        }),
    
        password: Joi.string().min(6).max(30).required().messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password cannot exceed 30 characters",
            "any.required": "Password is required"
        })
    });



    export const changePasswordSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } }) 
            .required()
            .messages({
                "string.empty": "Email is required",
                "string.email": "Invalid email format"
            }),
    
        resetCode: Joi.string()
            .length(4) 
            .pattern(/^\d{4}$/) 
            .required()
            .messages({
                "string.empty": "Reset code is required",
                "string.length": "Reset code must be exactly 4 digits",
                "string.pattern.base": "Reset code must be a 4-digit number"
            }),
    
        newPassword: Joi.string()
            .min(6) 
            .pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/) 
            .required()
            .messages({
                "string.empty": "New password is required",
                "string.min": "Password must be at least 6 characters long",
                "string.pattern.base": "Password must contain at least one uppercase letter and one number"
            })
    });