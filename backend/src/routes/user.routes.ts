import express from "express"
import { login, signup } from "../controllers/user.controllers";

const userRoutes = express.Router();
userRoutes.post("/login", login); 
userRoutes.post("/signup", signup);

export default userRoutes;