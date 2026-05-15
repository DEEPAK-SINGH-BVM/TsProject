import mongoose, { Schema, Document } from "mongoose";

export interface ICart  {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
