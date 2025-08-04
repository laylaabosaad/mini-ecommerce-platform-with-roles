import CategoryModel from "../models/Categories.js";
import ProductModel from "../models/Products.js";

export async function addProduct(req, res) {
  try {
    const {
      name,
      author,
      description,
      price,
      inventoryQuantity,
      category,
      imageUrl,
    } = req.body;

    if (
      !name ||
      !price ||
      !author ||
      !inventoryQuantity ||
      !category ||
      !imageUrl
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new ProductModel({
      name,
      author,
      price,
      description,
      inventoryQuantity,
      category,
      imageUrl,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      data: savedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to add product",
      details: error.message,
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const productId = req.body.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const selectedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!selectedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete Product",
      details: error.message,
    });
  }
}

export async function softDeleteProduct(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { isDeleted: true },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res
      .status(200)
      .json({ message: "Product soft deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to delete Product",
      details: error.message,
    });
  }
}

export async function getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const filter = { isDeleted: false };

    const [products, totalProducts] = await Promise.all([
      ProductModel.find(filter).skip(skip).limit(limit).lean(),
      ProductModel.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      message: products.length
        ? "Products fetched successfully"
        : "No products found",
      data: products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to get products",
      details: error.message,
    });
  }
}

export async function getSingleProduct(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const product = await ProductModel.findById(productId).lean();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to get product",
      details: error.message,
    });
  }
}

export async function updateProduct(req, res) {
  const productId = req.params.id;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
}

export async function getProductsByCategoryId(req, res) {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }

    const filter = { category: categoryId, isDeleted: false };

    const [products, totalProducts, category] = await Promise.all([
      ProductModel.find(filter)
        .skip(skip)
        .limit(limit)
        .lean(),
      ProductModel.countDocuments(filter),
      CategoryModel.findById(categoryId).lean(),
    ]);

    const totalPages = Math.ceil(totalProducts / limit);
    const categoryName = category ? category.title : null;

    return res.status(200).json({
      message: products.length
        ? "Products fetched successfully"
        : "No products found for this category",
      data: products,
      categoryName,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch products",
      details: error.message,
    });
  }
}


export async function getDashboardStats(req, res) {
  try {
    const totalProducts = await ProductModel.countDocuments({
      isDeleted: false,
    });
    const totalCategories = await CategoryModel.countDocuments();
    const inventoryStats = await ProductModel.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: null,
          totalInventory: { $sum: "$inventoryQuantity" },
        },
      },
    ]);
    const totalInventory =
      inventoryStats.length > 0 ? inventoryStats[0].totalInventory : 0;
    return res.status(200).json({
      totalProducts,
      totalCategories,
      totalInventory,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to retrieve dashboard stats",
      details: error.message,
    });
  }
}
