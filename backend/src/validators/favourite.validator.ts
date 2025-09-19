import Joi from "joi";

export const favouriteSchema = Joi.object({
  roomId: Joi.string().required().messages({
    "any.required": "Room ID is required",
    "string.base": "Room ID must be a string",
  }),
});