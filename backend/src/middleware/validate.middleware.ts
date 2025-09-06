import { BAD_REQUEST_STATUS_CODE } from "../constant";
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

// Validation Middleware: It validates the request parameters
export const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res
        .status(BAD_REQUEST_STATUS_CODE)
        .json({
          message: error.details[0].message,
          status: "error",
          data: null,
        });
      return;
    }
    next();
  };
};
