import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getMyOrders, placeOrder, sellerOrders, updateOrderStatus } from "../controllers/order.controllers";

const orderRoute = express.Router();

orderRoute.post("/create", authMiddleware, placeOrder);
orderRoute.get("/my-orders", authMiddleware, getMyOrders);
orderRoute.get(
  "/seller-orders",
  authMiddleware,
  sellerOrders
);
orderRoute.patch(
  "/update-status/:orderId",
  authMiddleware,
  updateOrderStatus
);
export default orderRoute;
