import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import { bulkUploadProducts, buyProduct, deleteShopProduct, getMyProducts, getShopProducts, updateShopProduct } from "../controllers/product.controllers";

const productRoute = express.Router();
productRoute.get("/my-products",authMiddleware,getMyProducts)
productRoute.get("/shops/:shopId/products", getShopProducts);
productRoute.post("/buyProduct", authMiddleware, buyProduct);
productRoute.post("/bulk-upload",authMiddleware,upload.single("file"),bulkUploadProducts,);
productRoute.put("/update/:id", authMiddleware, updateShopProduct);
productRoute.delete("/delete/:id", authMiddleware, deleteShopProduct);
export default productRoute;
