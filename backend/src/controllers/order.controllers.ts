import { Request, Response } from "express";
import Order from "../models/order.model";
import mongoose from "mongoose";
import Cart from "../models/cart.model";
import Shop from "../models/shop.model";
import Product from "../models/products.model";
import { io } from "..";
type AuthRequest = Request & { user?: { id?: string } };
type OrderItem = {
  productId: string;
  sellerId: string;
  quantity: number;
};
export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(400).json({ message: "Unauthorize" });
    const {
      items,
      deliveryAddress,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    } = req.body;
    console.log("placeOrderItems", items);

    let paymentStatus = "Pending";
    if (paymentMethod === "Online") {
      paymentStatus = "Paid";
    }

    for (const item of items) {
      console.log("itemPlaceOrder", item);

      const product = await Product.findById(item.productId);
      console.log("ProductPlaceOrder", product);

      if (!product) {
        return res.status(404).json({ message: "Product Id was not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product ${product.name}`,
        });
      }
      product.stock -= item.quantity;
      await product.save();
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

    await Cart.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });

    console.log("itemsItems", items);

    // items.forEach((item: OrderItem) => {
    //   io.to(item.sellerId.toString()).emit("orderPlaced", order);
    // });
    items.forEach((item: OrderItem) => {

      console.log("Emit To Seller", item.sellerId);
    
      io.to(item.sellerId.toString()).emit(
        "orderPlaced",
        order
      );
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ message: "Orders fetched", orders });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const sellerOrders = async (req: AuthRequest, res: Response) => {
  try {
    const sellerId = req.user?.id;
    console.log("SellerData", sellerId);

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const shop = await Shop.findOne({ owner: sellerId });
    console.log("sellerOrder", shop);

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    const products = await Product.find({ shopId: shop._id });
    // console.log("products", products);

    const productIds = products.map((item) => item._id);
    // console.log("productIdsProductIds", productIds);

    const orders = await Order.find({
      "items.productId": { $in: productIds },
    }).sort({ createdAt: -1 });

    // console.log("ordersPlaceOrder", orders);

    // null → don’t filter any properties.
    // 2 → pretty-print with 2 spaces of indentation.
    // console.log("Order items:", JSON.stringify(orders, null, 2));

    const filterOrders = orders.map((order) => {
      // console.log("filterOrdersOrder", order);
      const sellerItems = order.items.filter((item) =>
        productIds.some((id) => id.equals(item.productId)),
      );
      // console.log("sellerItems", sellerItems);

      const sellerTotal = sellerItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      return {
        ...order.toObject(),
        items: sellerItems,
        sellerTotal,
      };
    });

    return res.status(200).json({
      orders: filterOrders,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "order not Found" });
    }

    io.to(order?.userId.toString()).emit("orderStatusUpdated", order);
    res
      .status(201)
      .json({ message: "Order Status Updated Successfully !!", order });
  } catch (error: any) {
    res.status(500).json({ message: "Error in update Status" });
  }
};
