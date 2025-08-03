import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const url = process.env.URL;

const db = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url);
    console.log("MongoDB is Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default db;
