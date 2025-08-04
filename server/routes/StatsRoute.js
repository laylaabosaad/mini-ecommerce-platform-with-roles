import express from "express";
import { getDashboardStats } from "../controllers/ProductController.js";

const StatsRoute = express.Router();
StatsRoute.get("/", getDashboardStats);
export default StatsRoute;
