// Shop Name *
// Description *
// Category *
// Phone *
// Address *
// City *
// State *
// Logo (optional)

import mongoose, { Document, Schema } from "mongoose";

export interface Ishop extends Document {
  name: string;
  description: string;
  category: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  logo?: string;
  owner: mongoose.Types.ObjectId;
}

const shopSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    logo: { type: String },
    owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

const Shop = mongoose.model<Ishop>("Shop", shopSchema);

export default Shop;
