import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/products.model";
import mongoose from "mongoose";
import { calculateCartTotals } from "../utils/cartUtils";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET!);
type AuthRequest = Request & {
  user?: { id?: string };
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    console.log("addToCartuserId", userId);
    const { productId } = req.body;
    console.log("addToCartProductId", productId);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const product = await Product.findById(productId);
    console.log("addToCartProduct", product);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    
    const already = await Cart.findOne({
      userId,
      productId,
    });

    console.log("addToCartAlready", already);

    if (already) {
      already.quantity += 1;
      await already.save();
      return res.status(200).json({
        message: "Cart quantity updated",
      });
    }
    await Cart.create({
      userId,
      productId,
      quantity: 1,
    });

    const { cart, subtotal, deliveryFee, total } =
      await calculateCartTotals(userId);

    return res.status(201).json({
      message: "Product added to cart",
      data: cart,
      subtotal,
      deliveryFee,
      total,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Add to cart failed" });
  }
};

export const getCartProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    console.log("getCartProductsId", userId);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { cart, subtotal, deliveryFee, total } =
      await calculateCartTotals(userId);

    return res.status(200).json({
      message: "Cart fetched New",
      data: cart,
      subtotal,
      deliveryFee,
      total,
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message || "Cart fetch failed" });
  }
};
export const updateCartProduct = async (req: AuthRequest, res: Response) => {
  try {
    console.log("step 1");

    const { productId, action } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const cart = await Cart.findOne({
      userId,
      productId,
    });
    console.log("updateCartCart", cart);
    if (!cart) {
      return res.status(404).json({
        message: "Cart Item Not found",
      });
    }

    if (action === "increase") {
      cart.quantity += 1;
    } else if (action === "decrease") {
      if (cart.quantity > 1) {
        cart.quantity -= 1;
      } else {
        await Cart.deleteOne({ _id: cart._id });

        return res.status(200).json({
          message: "Remove Item Successfully",
        });
      }
    }
    await cart.save();

    const {
      cart: updatedCart,
      subtotal,
      deliveryFee,
      total,
    } = await calculateCartTotals(userId);

    return res.status(200).json({
      message: "Cart Update Successfully",
      data: updatedCart,
      subtotal,
      deliveryFee,
      total,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Cart Product Update failed",
    });
  }
};
export const deleteCartProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    console.log("deleteCartProductID", id);

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const cart = await Cart.findOneAndDelete({
      userId: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(id),
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart Item Not found",
      });
    }
    res.status(200).json({
      message: "Item Delete Successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Cart Product Update failed",
    });
  }
};

export const stripePayment = async (req: Request, res: Response) => {
  try {
    const { products } = req.body;
    console.log("stripePaymentProduct", products);

    const lineItems = products.map((product: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: Array.isArray(product.image)
            ? product.image
            : [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));
    console.log("stripePaymentlineItems", lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/my-orders`,
      cancel_url: `${process.env.CLIENT_URL}/fail`,
    });
    console.log("stripePaymentSession", session);
    res.json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
