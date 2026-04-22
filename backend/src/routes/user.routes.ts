import express from "express"
import { login, signup } from "../controllers/user.controllers";
import { loginValidation, signupValidation } from "../middlewares/auth.middleware";

const userRoutes = express.Router();
userRoutes.post("/login",loginValidation, login); 
userRoutes.post("/signup",signupValidation, signup);

export default userRoutes;