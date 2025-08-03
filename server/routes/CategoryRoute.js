import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/CategoryController.js";
const CategoryRoute = express.Router();
CategoryRoute.get("/", getAllCategories);
CategoryRoute.delete("/:id", deleteCategory);
CategoryRoute.post("/", addCategory);
export default CategoryRoute;
