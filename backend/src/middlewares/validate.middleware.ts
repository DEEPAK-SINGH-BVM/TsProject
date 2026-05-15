import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    // validate incoming data with Zod
    console.log("validateReq.body", req.body);
    // Check if data is valid WITHOUT crashing the app
    const result = schema.safeParse(req.body);
    console.log("validatorResult", result);

    if (!result.success) {
      return res.status(400).json({
        message: "Validation failed",
        // Zod error convert in simple readable format
        errors: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
