import express from "express";
import userRoutes from "./user.routes";
const apiRoutes = express.Router();

apiRoutes.use("/auth",userRoutes );

export default apiRoutes;
