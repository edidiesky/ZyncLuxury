import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/User";
import {
  SERVER_ERROR_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
} from "../constant";

// @description  Register a new client
// @route  POST /auth/register
// @access  Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, hashedPassword, username } = req.body;

  if (!process.env.JWT_CODE) {
    res.status(SERVER_ERROR_STATUS_CODE).json({
      message: "A server error occurred. Please try again!",
      success: false,
      data: null,
    });
  }
  // check if the user exists
  const userExist = await User.findOne({
    email,
  });

  if (userExist) {
    res.status(UNAUTHORIZED_STATUS_CODE).json({
      message:
        "You have a record with us. You can proceed further by signing rather creating a new account",
      success: false,
      data: null,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(hashedPassword, salt);
  const Tempuser = {
    email,
    hashedPassword: hashedpassword,
    name,
    username,
  };
  const user = await User.create(Tempuser);
  const token = jwt.sign(
    {
      userId: user?.id,
    },
    process.env.JWT_CODE!,
    { expiresIn: "12d" }
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  });

  res.status(200).json({ user, token });
});

// @description  Login a new User
// @route  POST /auth/login
// @access  Public
const LoginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, hashedPassword } = req.body;
  // Find the user in the database

  const userExist = await User.findOne({
    email,
  });
  if (!userExist) {
    res.status(UNAUTHORIZED_STATUS_CODE);
    throw new Error("You do not have any record with us!!!");
  }
  const verifyPassword = await bcrypt.compare(
    hashedPassword,
    userExist.hashedPassword!
  );
  if (!verifyPassword) {
    res.status(UNAUTHORIZED_STATUS_CODE);
    throw new Error("Please provide a valid Password!!");
  }

  //
  const token = jwt.sign(
    {
      userId: userExist.id,
    },
    process.env.JWT_CODE!,
    { expiresIn: "12d" }
  );

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.cookie("accessToken", token, {
    httpOnly: true,

    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    path: "/",
    secure: false,
  });
  res.status(200).json({ user: userExist, token });
});

export { registerUser, LoginUser };
