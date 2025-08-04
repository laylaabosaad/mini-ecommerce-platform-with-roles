import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCategories(setCategories) {
  try {
    const res = await axios.get(`${BASE_URL}/categories`);
    const categories = res.data?.data || [];
    if (setCategories) {
      setCategories(categories);
    }
    return {
      success: true,
      message: res.data?.message || "Categories fetched successfully",
      data: categories,
    };
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch categories",
      data: [],
    };
  }
}

export async function addCategory(prevState, formData) {
  const title = formData.get("title");

  if (!title) {
    return { error: "Category title is required." };
  }

  try {
    const res = await axios.post(
      `${BASE_URL}/categories`,
      { title },
      {
        withCredentials: true,
      }
    );

    if (res.status !== 201 && res.status !== 200) {
      return { error: res.data?.message || "Failed to add category." };
    }
    return { success: true, category: res.data.data };
  } catch (error) {
    const message = error.response?.data?.error || "Something went wrong.";
    return { error: message };
  }
}

export async function deleteCategory(id) {
  try {
    const res = await axios.delete(`${BASE_URL}/categories/${id}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: res.data?.message || "Failed" };
    }
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Error deleting category",
    };
  }
}
