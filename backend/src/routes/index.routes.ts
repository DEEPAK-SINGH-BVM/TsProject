import express from "express";
import userRoutes from "./user.routes";
import shopRoutes from "./shop.routes";
const apiRoutes = express.Router();

apiRoutes.use("/auth", userRoutes);
apiRoutes.use("/shop", shopRoutes);
export default apiRoutes;