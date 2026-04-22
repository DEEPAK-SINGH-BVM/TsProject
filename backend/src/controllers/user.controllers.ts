import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const userExisting = await User.findOne({ email });

    if (userExisting) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Signup Successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Signup Error",
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password Not Match" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );
    return res.status(201).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login error",
      error,
    });
  }
};
