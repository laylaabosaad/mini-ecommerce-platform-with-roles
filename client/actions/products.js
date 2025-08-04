import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function addProduct(prevState, formData){
  const data = {
    name: formData.get("name"),
    author: formData.get("author"),
    price: parseFloat(formData.get("price")),
    description: formData.get("description"),
    category: formData.get("category"),
    imageUrl: formData.get("imageUrl"),
    inventoryQuantity: parseInt(formData.get("inventoryQuantity")),
  };
  try {
    const res = await axios.post(`${BASE_URL}/products`, data, {
      withCredentials: true,
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error) {
    console.log("error?.response?.data?.message", error?.response.data.message);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to add product",
      fieldData: data,
    };
  }
};

export async function fetchAllProducts (page = 1, limit = 10){
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { page, limit },
    });

    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch products",
    };
  }
};

export async function fetchSingleProduct(id){
  try {
    const { data } = await axios.get(`${BASE_URL}/products/${id}`);

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error) {
    console.error("Error fetching single product:", error);
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch product",
    };
  }
};

export async function editProduct(prevState, formData, id){
  const data = {
    name: formData.get("name"),
    author: formData.get("author"),
    price: parseFloat(formData.get("price")),
    description: formData.get("description"),
    category: formData.get("category"),
    imageUrl: formData.get("imageUrl"),
    inventoryQuantity: parseInt(formData.get("inventoryQuantity")),
  };

  try {
    const res = await axios.put(`${BASE_URL}/products/${id}`, data, {
      withCredentials: true,
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.response?.data?.message ||
        "Failed to update product",
      fieldData: data,
    };
  }
};

export async function fetchProductsByCategory(
  categoryId,
  page = 1,
  limit = 10
){
  try {
    const response = await axios.get(
      `${BASE_URL}/products/category/${categoryId}`,
      {
        params: { page, limit },
      }
    );
    console.log("response.data", response.data.categoryName);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data,
      pagination: response.data.pagination,
      categoryName: response.data.categoryName,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to fetch products by category",
    };
  }
};
