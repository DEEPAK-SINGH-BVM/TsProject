import { Request, Response, NextFunction } from "express";

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