import type { Request, Response } from "express";
import Shop from "../models/shop.model";
import User from "../models/user.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

type AuthRequest = Request & { user?: { id?: string } };

export const getAllShops = async (req: Request, res: Response) => {
  try {
    const shops = await Shop.find();
    console.log("AllShops", shops);
    return res.status(200).json({ shops });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching shops", error });
  }
};
export const getShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    console.log('getShopRequest',req.user);
    
    console.log("userId", userId);
    const user = await User.findById(userId).select("-password");
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const shop = await Shop.findOne({ owner: userId });
    console.log("Getshop", shop);

    // if (!shop) {
    // return res.status(404).json({ message: "Shop not found" });
    // }
    return res.status(200).json({ user, shop: shop || null });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching shop", error });
  }
};

export const updateShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const shop = await Shop.findOneAndUpdate({ owner: userId }, req.body, {
      new: true,
    });
    console.log('updateShop',shop);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res.status(200).json({ message: "Shop updated successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Error updating shop", error });
  }
};

export const createShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const shop = await Shop.create({ ...req.body, owner: userId });
    console.log('createShop',shop);

    return res
      .status(201)
      .json({ message: "Shop Registed successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Error creating shop", error });
  }
};

export const uploadShopLogo = async (req: AuthRequest, res: Response) => {
  try{
    const userId = req.user?.id;
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

    const shop = await Shop.findOneAndUpdate({ owner: userId }, { logo: imageUrl }, { new: true });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res.status(200).json({ message: "Shop logo updated successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Error updating shop logo", error });
  }
}