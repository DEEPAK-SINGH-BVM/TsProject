import express from "express";
import { createShop } from "../controllers/shop.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { shopMiddleware } from "../middlewares/shop.middleware";
import { getShop } from "../controllers/user.controllers";
const shopRoutes = express.Router();
shopRoutes.get("/my-shop", authMiddleware, getShop);
shopRoutes.post("/create", authMiddleware, shopMiddleware, createShop);
export default shopRoutes;
