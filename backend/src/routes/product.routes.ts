import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { bulkUploadProducts } from "../controllers/product.controllers";

const productRoute = express.Router();

productRoute.post(
  "/bulk-upload",
  authMiddleware,
  upload.single("file"),
  bulkUploadProducts,
);
export default productRoute;
