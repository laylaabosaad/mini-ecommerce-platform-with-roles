import CategoryModel from "../models/Categories.js";

export async function addCategory(req, res) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const existing = await CategoryModel.findOne({ title });
    if (existing) {
      return res.status(409).json({ error: "Category already exists" });
    }

    const newCategory = new CategoryModel({ title });
    const savedCategory = await newCategory.save();

    return res.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to add category",
      details: error.message,
    });
  }
}

export async function deleteCategory(req, res) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ success: false, message: "Category ID is required" });
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
}


export async function getAllCategories(req, res) {
  try {
    const categories = await CategoryModel.find().lean();

    return res.status(200).json({
      message: categories.length
        ? "Categories fetched successfully"
        : "No categories found",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to get categories",
      details: error.message,
    });
  }
}
