import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductsByCategoryId,
  getSingleProduct,
  softDeleteProduct,
  updateProduct,
} from "../controllers/ProductController.js";

const ProductRoute = express.Router();
ProductRoute.post("/", addProduct);
ProductRoute.delete("/", deleteProduct);
ProductRoute.get("/", getAllProducts);
ProductRoute.get("/:id", getSingleProduct);
ProductRoute.put("/:id", updateProduct);
ProductRoute.put("/:id", softDeleteProduct);
ProductRoute.get("/category/:categoryId", getProductsByCategoryId);
export default ProductRoute;
