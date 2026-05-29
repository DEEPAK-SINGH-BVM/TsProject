import type { Request, Response } from "express";
import Shop from "../models/shop.model";
import User from "../models/user.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import db from "../config/sqldb";
type AuthRequest = Request & { user?: { id?: string } };

// export const getAllShops = async (req: Request, res: Response) => {
//   try {
//     const shops = await Shop.find();
//     return res.status(200).json({ shops });
//   } catch (error) {
//     return res.status(500).json({ message: "Error fetching shops", error });
//   }
// };

export const getAllShops = async (req: Request, res: Response) => {
  try {
    // const shops = await Shop.find();
    const [shops] = await db.query("SELECT * FROM shops");
    console.log("sqlGetAllShops", shops);
    return res.status(200).json({ shops });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching shops", error });
  }
};

// export const getShop = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?.id;

//     const user = await User.findById(userId).select("-password");
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     const shop = await Shop.findOne({ owner: userId });

//     if (!shop) {
//     return res.status(404).json({ message: "Shop not found" });
//     }

//     return res.status(200).json({ user, shop: shop });
//   } catch (error) {
//     return res.status(500).json({ message: "Error fetching shop", error });
//   }
// };

export const getShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const [usersRow]: any = await db.query(
      "SELECT id , name , email ,role FROM users WHERE id = ?",
      [userId],
    );
    console.log("sqlGetShopUser", usersRow);
    const user = usersRow[0];
    console.log("sqlGetShopUserResult", user);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // const shop = await Shop.findOne({ owner: userId });
    const [shopRows]: any = await db.query(
      "SELECT * FROM shops WHERE owner = ?",
      [userId],
    );
    const shop = shopRows[0];
    console.log("sqlGetShopShop", shop);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json({ user, shop: shop });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching shop", error });
  }
};

// export const updateShop = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     const shop = await Shop.findOneAndUpdate({ owner: userId }, req.body, {
//       new: true,
//     });
//     console.log("updateShop", shop);

//     if (!shop) {
//       return res.status(404).json({ message: "Shop not found" });
//     }
//     return res.status(200).json({ message: "Shop updated successfully", shop });
//   } catch (error) {
//     return res.status(500).json({ message: "Error updating shop", error });
//   }
// };

export const updateShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // const shop = await Shop.findOneAndUpdate({ owner: userId }, req.body, {
    //   new: true,
    // });
    // console.log("updateShop", shop);
    const { name, description, category, phone, address, city, state } =
      req.body;
    await db.query(
      "UPDATE shops SET name = ? , description = ? ,category = ? , phone = ? , address = ? , city = ? , state = ? WHERE owner = ?",
      [name, description, category, phone, address, city, state, userId],
    );

    const [shopRows]: any = await db.query(
      "SELECT * FROM shops WHERE owner = ?",
      [userId],
    );
    const shop = shopRows[0];

    console.log("sqlUpdateShop", shop);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res.status(200).json({ message: "Shop updated successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Error updating shop", error });
  }
};

// export const createShop = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?.id;
//     const shop = await Shop.create({ ...req.body, owner: userId });
//     console.log("createShop", shop);

//     return res
//       .status(201)
//       .json({ message: "Shop Registed successfully", shop });
//   } catch (error) {
//     return res.status(500).json({ message: "Error creating shop", error });
//   }
// };

export const createShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, description, category, phone, address, city, state, logo } =
      req.body;
    const [result]: any = await db.query(
      "INSERT INTO shops (name, description, category, phone, address, city, state, logo, owner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, description, category, phone, address, city, state, logo, userId],
    );
    const shop = {
      id: result.insertId,
      name,
      description,
      category,
      phone,
      address,
      city,
      state,
      logo,
      owner: userId,
    };
    console.log("sqlCreateShop", shop);
    return res
      .status(201)
      .json({ message: "Shop Registered successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Error creating shop", error });
  }
};

export const uploadShopLogo = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const result = await uploadToCloudinary(req.file.buffer);

    const imageUrl = result.secure_url;

    // const shop = await Shop.findOneAndUpdate(
    //   { owner: userId },
    //   { logo: imageUrl },
    //   { new: true },
    // );
    await db.query("UPDATE shops SET logo = ? WHERE owner = ?", [
      imageUrl,
      userId,
    ]);
    const [shopRows]: any = await db.query(
      "SELECT * FROM shops WHERE owner = ?",
      [userId],
    );
    const shop = shopRows[0];
    console.log("sqlUploadShopLogo", shop);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    return res
      .status(200)
      .json({ message: "Shop logo updated successfully", shop });
  } catch (error) {
    return res.status(500).json({ message: "Error updating shop logo", error });
  }
};
