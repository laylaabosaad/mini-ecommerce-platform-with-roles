import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/CategoryController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";
const CategoryRoute = express.Router();
CategoryRoute.get("/", getAllCategories);
CategoryRoute.delete("/:categoryId",deleteCategory);
CategoryRoute.post("/", verifyToken, authorizeRoles("admin"), addCategory);
export default CategoryRoute;
