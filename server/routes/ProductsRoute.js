import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategoryId,
  getSingleProduct,
  search,
  softDeleteProduct,
  updateProduct,
} from "../controllers/ProductController.js";
import { authorizeRoles, verifyToken } from "../middleware/authMiddleware.js";

const ProductRoute = express.Router();
ProductRoute.post("/", verifyToken, authorizeRoles("admin"), addProduct);
ProductRoute.delete("/", verifyToken, authorizeRoles("admin"), deleteProduct);
ProductRoute.get("/", getAllProducts);
ProductRoute.get("/search", search);
ProductRoute.get("/:id", getSingleProduct);
ProductRoute.put("/:id", verifyToken, authorizeRoles("admin"), updateProduct);
ProductRoute.put(
  "/soft-delete/:id",
  verifyToken,
  authorizeRoles("admin"),
  softDeleteProduct
);
ProductRoute.get("/category/:categoryId", getProductsByCategoryId);

export default ProductRoute;
