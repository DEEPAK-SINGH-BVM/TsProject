import express from "express"
import { login, signup, updateAddress, uploadProfileImage } from "../controllers/user.controllers";
import { authMiddleware, loginValidation, signupValidation } from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";

const userRoutes = express.Router();
userRoutes.post("/login",loginValidation, login); 
userRoutes.post("/signup",signupValidation, signup);
userRoutes.put("/address", authMiddleware, updateAddress);
userRoutes.put(
  "/profile-image",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage,
);
export default userRoutes;