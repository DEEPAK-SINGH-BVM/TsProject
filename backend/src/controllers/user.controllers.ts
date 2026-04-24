import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
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
      { expiresIn: "1d" }
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
      { new: true }
    );  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Address updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error updating address", error });
  }

}
export const uploadProfileImage = async(req:any,res:any)=>{
  try{
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
    
    const user = await User.findByIdAndUpdate(userId,{profileImage: imageUrl },{new:true});
    console.log("updatedUser", user);
    return res
      .status(200)
      .json({ message: "Profile image uploaded successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading profile image", error });
  }
}
