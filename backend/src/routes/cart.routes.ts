import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

import {
  addToCart,
  deleteCartProduct,
  getCartProducts,
  stripePayment,
  updateCartProduct,
} from "../controllers/cart.controllers";

const cartRoute = express.Router();

cartRoute.post("/add", authMiddleware, addToCart);
cartRoute.get("/my-cart", authMiddleware, getCartProducts);
cartRoute.patch("/update", authMiddleware, updateCartProduct);
cartRoute.delete("/delete/:id", authMiddleware, deleteCartProduct);
cartRoute.post("/create-checkout-session", stripePayment);
export default cartRoute;
