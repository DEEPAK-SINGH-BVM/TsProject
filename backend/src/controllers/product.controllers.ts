import { Request, Response } from "express";
import * as XLSX from "xlsx";
import Product from "../models/products.model";
import mongoose from "mongoose";

type AuthRequest = Request & { user?: { id?: string } };

export const bulkUploadProducts = async (req: AuthRequest, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Excel file is required" });
    }
    //   Read Excel file from buffer
    const workBook = XLSX.read(file.buffer, { type: "buffer" });
    //   take a sheet name
    const sheetName = workBook.SheetNames?.[0];
    if (!sheetName) {
      return res.status(400).json({ message: "No sheet found in Excel file" });
    }
    //   base on  sheetName take data
    const sheet = workBook.Sheets[sheetName];
    if (!sheet) {
      return res.status(400).json({ message: "Invalid sheet data" });
    }
    // Convert Excel → JSON
    const data: any[] = XLSX.utils.sheet_to_json(sheet);
    if (!data.length) {
      return res.status(400).json({ message: "Empty Excel file" });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "Shop id not found " });
    }

    const shopId = new mongoose.Types.ObjectId(userId);
    
    const bulkOps = data.map((item) => ({
      updateOne: {
        filter: {
          name: item.name,
          shopId: shopId,
        },

        update: {
          $set: {
            name: item.name,
            price: item.price,
            stock: item.stock,
            category: item.category,
            subCategory: item.subCategory,
            unit: item.unit,
            description: item.description,
            image: item.image ? [item.image] : [],
            shopId: shopId,
          },
        },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(bulkOps);
    return res.status(200).json({
      message: "Product Upload SuccessFully",
      inserted: result.upsertedCount,
      updated: result.modifiedCount,
      total: data.length,
    });
  } catch (error:any) {
         return res.status(500).json({
           message: error.message || "Bulk upload failed",
         });
  }
};
