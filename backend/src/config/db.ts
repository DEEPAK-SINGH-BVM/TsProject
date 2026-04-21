import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("connect to server");
  } catch (error) {
    console.log("Not Connect to server", error);
  }
};
export default db;
