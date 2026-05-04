import type { Request, Response, NextFunction } from "express";
export const shopMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { name, description , category, phone, address, city, state} = req.body;
    if (!name || !description || !category || !phone || !address || !city || !state) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next()
}
