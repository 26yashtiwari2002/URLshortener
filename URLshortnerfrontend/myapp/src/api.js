
import axios from 'axios';

const API_BASE_URL = "http://localhost:8081";

// POST request to shorten a URL
export const shortenUrl = async (originalUrl) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/shorten`, {
      originalUrl,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
