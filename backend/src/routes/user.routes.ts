import express from "express"
import { login, resetPassword, sendOtp, signup, updateAddress, uploadProfileImage, verifyOtp } from "../controllers/user.controllers";
import { authMiddleware, loginValidation, signupValidation } from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, signupSchema } from "../validators/auth.validator";

const userRoutes = express.Router();
userRoutes.post("/login", validate(loginSchema), login); 
userRoutes.post("/signup",validate(signupSchema), signup);
userRoutes.post("/send-otp",sendOtp)
userRoutes.post("/verify-otp",verifyOtp);
userRoutes.post("/reset-password",resetPassword)
userRoutes.put("/address", authMiddleware, updateAddress);
userRoutes.put("/profile-image",authMiddleware,upload.single("image"),uploadProfileImage);
export default userRoutes;