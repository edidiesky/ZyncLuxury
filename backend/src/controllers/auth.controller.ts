import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/User";
import {
  SERVER_ERROR_STATUS_CODE,
  SUCCESSFULLY_FETCHED_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
} from "../constant";
import logger from "../utils/logger";
import { generateToken } from "../utils/generateToken";
import { IToken } from "../types";
import dotenv from "dotenv";
dotenv.config();
// @description  Register a new client
// @route  POST /auth/register
// @access  Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!process.env.JWT_CODE) {
    logger.warn("No JWT_CODE was provided in the .env file");
    res.status(SERVER_ERROR_STATUS_CODE).json({
      message: "A server error occurred. Please try again!",
      success: false,
      data: null,
    });
    return;
  }
  // check if the user exists
  const userExist = await User.findOne({
    email,
  });

  if (userExist) {
    logger.warn(
      "You have a record with us. You can proceed further by signing rather creating a new account",
      {
        userExist,
      }
    );
    res.status(UNAUTHORIZED_STATUS_CODE).json({
      message:
        "You have a record with us. You can proceed further by signing rather creating a new account",
      success: false,
      data: null,
    });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  const Tempuser = {
    email,
    password: hashedpassword,
    name,
  };
  const user = await User.create(Tempuser);
  const tokenPayload: IToken = {
    userId: user._id,
    name,
    role,
  };
  const { refreshToken, accessToken } = await generateToken(res, tokenPayload);

  res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json({
    data: {
      user: tokenPayload,
      token: refreshToken,
      accessToken,
    },
    success: true,
    message:
      "Your Zync Agent has been created succesfully!. You can proceed to your dashboard to track your sales.",
  });
});

// @description  Login a new User
// @route  POST /auth/login
// @access  Public
const LoginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Find the user in the database

  const userExist = await User.findOne({
    email,
  });
  if (!userExist) {
    res.status(UNAUTHORIZED_STATUS_CODE).json({
      message:
        "You have no record with us. You can proceed further by createing an account rather sign a new account",
      success: false,
      data: null,
    });
    return;
  }
  const verifyPassword = await bcrypt.compare(password, userExist.password!);
  if (!verifyPassword) {
    res.status(UNAUTHORIZED_STATUS_CODE).json({
      message:
        "Please try to provide a vaild password. Or you can reach out to the support team for more help!",
      success: false,
      data: null,
    });
    return;
  }
  const tokenPayload: IToken = {
    userId: userExist._id,
    name: userExist.name,
    role: userExist.role,
  };
  const { refreshToken, accessToken } = await generateToken(res, tokenPayload);
  const { password: userPassword, email: userEmail, name, role } = userExist;
  res.status(SUCCESSFULLY_FETCHED_STATUS_CODE).json({
    data: {
      user: {
        email: userEmail,
        name,
        role,
      },
      token: refreshToken,
      accessToken,
    },
    success: true,
    message:
      "Welcome, you have login succesfully!. You can proceed to your dashboard to track your sales.",
  });
});

export { registerUser, LoginUser };
