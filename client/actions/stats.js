import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchStats() {
  try {
    const res = await axios.get(`${BASE_URL}/stats`);

    if (res.status !== 200) {
      return { error: res.data?.message || "Failed to fetch stats." };
    }

    return { success: true, stats: res.data };
  } catch (error) {
    return { error: error.message || "Network error" };
  }
}
