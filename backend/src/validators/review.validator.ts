import Joi from "joi";

export const reviewSchema = Joi.object({
  roomId: Joi.string().required().messages({
    "any.required": "Room ID is required",
    "string.base": "Room ID must be a string",
  }),
  review: Joi.number().min(1).max(5).required().messages({
    "any.required": "Review rating is required",
    "number.base": "Review rating must be a number",
    "number.min": "Review rating must be at least 1",
    "number.max": "Review rating must not exceed 5",
  }),
  description: Joi.string().required().messages({
    "any.required": "Review description is required",
    "string.base": "Review description must be a string",
  }),
});

export const updateReviewSchema = Joi.object({
  review: Joi.number().min(1).max(5).optional().messages({
    "number.base": "Review rating must be a number",
    "number.min": "Review rating must be at least 1",
    "number.max": "Review rating must not exceed 5",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Review description must be a string",
  }),
});