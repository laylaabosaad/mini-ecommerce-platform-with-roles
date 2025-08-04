import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function register(prevState, formData) {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    role: formData.get("role"),
  };
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);
    if (res.status !== 200 && res.status !== 201) {
      return { error: res.data?.message || "Registration failed." };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.error;

    return { error: message, fieldData: data };
  }
}

export async function login(prevState, formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, data, {
      withCredentials: true,
    });
    if (res.status !== 200 && res.status !== 201) {
      return { error: res.data?.message || "logging in failed" };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    const message = error.response?.data?.error;
    return { error: message, fieldData: data };
  }
}
export async function logout() {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, null, {
      withCredentials: true,
    });
    return { success: true };
  } catch (err) {
    console.error("Logout failed:", err);
    return { success: false };
  }
}
