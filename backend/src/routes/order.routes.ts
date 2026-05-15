import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { placeOrder } from "../controllers/order.controllers";

const orderRoute = express.Router();

orderRoute.post("/create", authMiddleware, placeOrder);
export default orderRoute;
