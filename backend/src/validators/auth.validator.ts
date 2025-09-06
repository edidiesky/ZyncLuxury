import { RoleStatus } from "../models/User";
import Joi from "joi";
export const signinSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
});

export const passwordResetSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(5).required(),
});
export const requestPasswordResetSchema = Joi.object({
  tin: Joi.string().min(5).required(),
});

export const signupSchema = Joi.object({
  role: Joi.string()
    .valid(...Object.values(RoleStatus))
    .required()
    .messages({
      "any.only": `Role must be one of ${Object.values(RoleStatus).join(", ")}`,
      "any.required": "Role type is required",
    }),
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .lowercase()
    .trim()
    .messages({
      "string.email": "Must be a valid email address",
      "any.required": "Email is required",
    }),
}).options({ abortEarly: false });
