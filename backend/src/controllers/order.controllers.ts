import { Request, Response } from "express";
import Order from "../models/order.model";
import mongoose from "mongoose";

type AuthRequest = Request & { user?: { id?: string } };

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) res.status(400).json({ message: "Unauthorize" });
    const {
      items,
      deliveryAddress,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    } = req.body;

    let paymentStatus = "Pending";

    if (paymentMethod === "Online") {
      paymentStatus = "Paid";
    }

    const order = await Order.create({
      userId: new mongoose.Types.ObjectId(userId),
      items,
      deliveryAddress,
      paymentMethod,
      paymentStatus,
      subtotal,
      deliveryFee,
      total,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
