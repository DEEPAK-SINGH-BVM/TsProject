import express from "express";
import userRoutes from "./user.routes";
import shopRoutes from "./shop.routes";
import productRoute from "./product.routes";
import cartRoute from "./cart.routes";
import orderRoute from "./order.routes";
const apiRoutes = express.Router();

apiRoutes.use("/cart", cartRoute);
apiRoutes.use("/auth", userRoutes);
apiRoutes.use("/shop", shopRoutes);
apiRoutes.use("/product",productRoute)
apiRoutes.use("/order",orderRoute)
export default apiRoutes;