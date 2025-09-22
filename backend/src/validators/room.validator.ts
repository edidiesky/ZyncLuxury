import Joi from "joi";
import { RoomType, ListingType } from "../models/Rooms";

export const createRoomSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  price: Joi.string().trim().optional().allow(null).messages({
    "string.empty": "Price must be a valid string if provided",
  }),
  city: Joi.string().trim().optional().allow(null),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required",
    "any.required": "Country is required",
  }),
  state: Joi.string().trim().optional().allow(null),
  type: Joi.string()
    .valid(...Object.values(RoomType))
    .default(RoomType.STAY)
    .messages({
      "any.only": "Type must be one of: VILLA, HOTEL, APARTMENT, STAY",
    }),
  listingType: Joi.string()
    .valid(...Object.values(ListingType))
    .default(ListingType.RENT)
    .messages({
      "any.only": "Listing type must be one of: SALE, RENT, LEASE",
    }),
  cautionfee: Joi.string().trim().optional().allow(null).messages({
    "string.empty": "Caution fee must be a valid string if provided",
  }),
  guests: Joi.number().integer().min(1).optional().allow(null).messages({
    "number.base": "Guests must be a number",
    "number.min": "Guests must be at least 1",
  }),
  latitude: Joi.string().trim().optional().allow(null),
  longitude: Joi.string().trim().optional().allow(null),
  bedroom: Joi.number().integer().min(1).required().messages({
    "number.base": "Bedroom must be a number",
    "number.min": "Bedroom must be at least 1",
    "any.required": "Bedroom is required",
  }),
  bathroom: Joi.number().integer().min(1).required().messages({
    "number.base": "Bathroom must be a number",
    "number.min": "Bathroom must be at least 1",
    "any.required": "Bathroom is required",
  }),
  images: Joi.array()
    .items(Joi.string().trim())
    .optional()
    .allow(null)
    .messages({
      "array.base": "Images must be an array of strings",
    }),
  features: Joi.object().optional().allow(null).messages({
    "object.base": "Features must be an object if provided",
  }),
  amenities: Joi.object().optional().allow(null).messages({
    "object.base": "Amenities must be an object if provided",
  }),
}).options({ abortEarly: false }); // Return all validation errors, not just the first
