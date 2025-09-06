import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const NotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  logger.warn("Not found request error", {
    ip: req.ip,
    "user-agent": req.headers["user-agent"],
  });
  res.status(404);
  next(error);
};

const errorHandler = (error: Error, req: Request, res: Response): void => {
  if (res.headersSent) {
    logger.warn("Headers already sent, skipping error response", {
      error: error.message,
    });
    return;
  }

  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
  logger.error("Unhandled error", {
    error: error.message,
    stack: error.stack,
    ip: req.ip,
    "user-agent": req.headers["user-agent"],
  });
  res
    .status(statuscode)
    .json({ message: error.message, success: false, data: null });
};
export { errorHandler, NotFound };
