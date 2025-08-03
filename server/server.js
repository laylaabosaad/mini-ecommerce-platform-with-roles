import dotenv from "dotenv";
import db from "./config/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

const port = process.env.PORT || 2000;
await db();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/auth", UserRoute)

app.listen(port, () => {
  console.log(`API IS RUNNING ON PORT: ${port}`);
});
