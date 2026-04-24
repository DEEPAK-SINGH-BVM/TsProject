import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const signupValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400).json({
      success: false,
      message: "All fields are required",
    });
    return;
  }

  if (name.length < 3) {
    res.status(400).json({
      success: false,
      message: "Name must be at least 3 characters",
    });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
    return;
  }

  next();
};

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email and password required",
    });
    return;
  }

  next();
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token){
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    console.log("authMiddlewareDecode", decoded);
    
   (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}