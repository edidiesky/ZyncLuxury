import { IToken } from "../types";
import jwt from "jsonwebtoken";
import logger from "./logger";
import { Response } from "express";
import redisClient from "../config/redisClient";
import dotenv from "dotenv";
const { v4: uuidv4 } = require("uuid");

dotenv.config();

export const signJWT = (payload: IToken) => {
  if (!process.env.JWT_CODE) {
    logger.warn("No JWT secret key was being provided!");
    throw new Error("No JWT secret key was being provided!");
  }
  return jwt.sign(payload, process.env.JWT_CODE, {
    expiresIn: "3d",
  });
};

export const generateToken = async (
  res: Response,
  payload: IToken
): Promise<{ refreshToken: string; accessToken: string }> => {
  try {
    const accessToken = signJWT(payload);
    const refreshToken = uuidv4();
    await redisClient.set(
      `refresh:token:${refreshToken}`,
      JSON.stringify(payload),
      "EX",
      3 * 60 * 60 * 24
    );
    await res.cookie("jwt", payload, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      path: "/",
    });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    logger.warn("Failed to generate token:", {
      stack: error.stack,
      message: error.message,
      details: error.details,
    });
    throw error;
  }
};