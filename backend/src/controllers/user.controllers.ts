import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as crypto from "crypto";
import nodemailer from "nodemailer";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { sendEmail } from "../utils/sendEmail";
dotenv.config();

type AuthRequest = Request & { user?: { id?: string } };

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
      { expiresIn: "1d" },
    );

    const userData = user.toObject() as any;
    delete userData.password;

    return res.status(201).json({
      message: "Signup Successful",
      token,
      user: userData,
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
    const userData = user.toObject() as any;
    delete userData.password;

    return res.status(201).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login error",
      error,
    });
  }
};

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Email Not Found " });
    }
    const otp: string = crypto.randomInt(100000, 999999).toString();

    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 2 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
    });

    // await transporter.sendMail({
    //   to: email,
    //   subject: "Password Reset OTP",
    //   text: `Your OTP is ${otp}. It will expire in 2 minutes.`,
    // });
    return res.status(200).json({
      message: "OTP sent successfully",
      user_id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to send OTP",
    });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { user_id, otp, new_password } = req.body;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP !" });
    }

    const otpExpires = user.otpExpires;
    if (!otpExpires || otpExpires < new Date()) {
      return res.status(400).json({ error: "OTP Expired!" });
    }

    return res.status(200).json({
      message: "OTP varified",
    });
  } catch (error) {
    return res.status(500).json({
      message: "OTP Verification Failed",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { user_id, otp, new_password } = req.body;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    user.password = hashedPassword;
    delete user.otp;
    delete user.otpExpires;
    await user.save();

    return res.status(200).json({
      message: "OTP varified",
    });
  } catch (error) {
    return res.status(500).json({
      message: "OTP Verification Failed",
    });
  }
};
export const updateAddress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { address } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { address },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Address updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error updating address", error });
  }
};
export const uploadProfileImage = async (req: any, res: any) => {
  try {
    const userId = req.user?.id;
    console.log("uploadProfileImage", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await uploadToCloudinary(req.file.buffer);
    console.log("result", result);
    
    const imageUrl = result.secure_url;
    console.log("imageUrl", imageUrl);
    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true },
    );
    console.log("updatedUser", user);
    return res
      .status(200)
      .json({ message: "Profile image uploaded successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error uploading profile image", error });
  }
};
