import express from "express";
import userRoutes from "./user.routes";
import shopRoutes from "./shop.routes";
import productRoute from "./product.routes";
const apiRoutes = express.Router();

apiRoutes.use("/auth", userRoutes);
apiRoutes.use("/shop", shopRoutes);
apiRoutes.use("/product",productRoute)
export default apiRoutes;