import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
  subCategory: string;
  unit: string;
  description: string;
  image: string[];
  shopId: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    unit: { type: String },
    description: { type: String },
    image: { type: [String], required: true },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
  },
  { timestamps: true },
);
const Product = mongoose.model<IProduct>("Product",productSchema)
export default Product