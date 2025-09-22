import { z } from "zod";

export const createRoomSchema = z.object({
  images: z.array(z.string()).min(1, "At least one images is required"),
  country: z.string().min(1, "At least one country is required"),
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  listingType: z.string().min(1, "listing Type is required"),
  latitude: z.string().min(1, "latitude is required"),
  longitude: z.string().min(1, "longitude is required"),
  type: z.string().min(1, "Type is required"),
  features: z.array(z.string()).min(1, "At least one features is required"),
  price: z
    .string()
    .regex(/^\d{1,12}(\.\d{1,2})?$/, "Guests must be a valid amount"),
  guests: z
    .string()
    .regex(/^\d{1,12}(\.\d{1,2})?$/, "Guests must be a valid amount")
    .optional(),
  cautionfee: z
    .string()
    .regex(/^\d{1,12}(\.\d{1,2})?$/, "cautionfee must be a valid amount")
    .optional(),
  bedroom: z
    .string()
    .regex(/^\d{1,12}(\.\d{1,2})?$/, "bedroom must be a valid amount")
    .optional(),
  bathroom: z
    .string()
    .regex(/^\d{1,12}(\.\d{1,2})?$/, "bathroom must be a valid amount")
    .optional(),
});

