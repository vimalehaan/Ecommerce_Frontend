import axios from "axios";
import { baseIp } from "../Server";

export const getProducts = async () => {
  try {
    const token = getTokenFromCookies();

    const response = await axios.get(`${baseIp}/api/v1/products`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token in the header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Function to get the token from cookies
const getTokenFromCookies = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  return cookies["authToken"]; // Replace 'token' with your actual cookie name
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const token = getTokenFromCookies();
    // console.log("token CHECk", token);
    const response = await axios.get(`${baseIp}/api/v1/products/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
