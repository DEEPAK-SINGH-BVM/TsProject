import mongoose, { Schema, Document } from "mongoose";

interface OrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface IOrder  {
  userId: mongoose.Types.ObjectId;
  items: OrderItem[];
  deliveryAddress: {
    fullName: string;
    phone: string;
    city: string;
    state: string;
    address: string;
  };
  paymentMethod: "COD" | "Online";
  paymentStatus: "Pending" | "Paid";
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
      },
    ],
    deliveryAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      address: { type: String, required: true },
    },
    paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 50 },
    total: { type: Number, required: true },
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order