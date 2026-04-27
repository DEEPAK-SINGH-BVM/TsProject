import type { Request, Response } from "express";
import Shop from "../models/shop.model";

type AuthRequest = Request & { user?: { id?: string } };

export const createShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const shop = await Shop.create({ ...req.body, owner: userId });
    return res
      .status(201)
      .json({ message: "Shop Registed successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Error creating shop", error });
  }
};
