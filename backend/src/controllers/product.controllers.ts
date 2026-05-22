import { Request, Response } from "express";
import * as XLSX from "xlsx";
import Product from "../models/products.model";
import mongoose from "mongoose";
import Shop from "../models/shop.model";
import { calculateCartTotals } from "../utils/cartUtils";

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

    const user = req.user;

    if (!userId) {
      return res.status(400).json({ message: "Shop id not found " });
    }

    const shop = await Shop.findOne({ owner: userId });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    const bulkOps = data.map((item) => ({
      updateOne: {
        filter: {
          name: item.name,
          shopId: shop._id,
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
            shopId: shop._id,
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
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Bulk upload failed",
    });
  }
};

export const getMyProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "userId Not Found !!" });
    }
    const shopId = await Shop.findOne({ owner: userId });

    if (!shopId) {
      return res.status(400).json({ message: "shopId Not Found !" });
    }

    const products = await Product.find({ shopId: shopId._id });

    if (!products) {
      return res.status(400).json({ message: "Product Not Found !!" });
    }

    return res.status(200).json({
      message: "My products fetched successfully",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "error products fetched ",
    });
  }
};

export const getShopProducts = async (req: AuthRequest, res: Response) => {
  try {
    const { shopId } = req.params;

    if (!shopId) {
      return res.status(400).json({ message: "shopId Not Found !!" });
    }
    const products = await Product.find({ shopId }).populate("shopId");

    return res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "error products fetched ",
    });
  }
};

export const updateShopProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "shopId Not Found !" });
    }
    const products = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("updateShopProductProduct", products);
    
    return res.status(200).json({
      message: "Product Update Successfully",
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "error products update",
    });
  }
};

export const buyProduct = async (req: AuthRequest, res: Response) => {
  try {

    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ message: "Unauthorize" });
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) return res.status(400).json({ message: "Product Not Found" });

    const { subtotal, deliveryFee, total } = await calculateCartTotals(userId);
    return res.status(200).json({
      message: "Product found successfully",
      product,
      subtotal,
      deliveryFee,
      total,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "error products update",
    });
  }
};

export const deleteShopProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "shopId Not Found !" });
    }
    const products = await Product.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Product Delete Successfully",
      // data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "error products Delete",
    });
  }
};
