import axios from "axios";
import { getTokenFromCookies } from "./AuthAction"; // Import token function
import { baseIp } from "../Server"; // Base API URL
// **Add to Cart**
export const addToCart = async (productId, quantity, userId) => {
  try {
    // console.log(productId, quantity, userId);
    const token = getTokenFromCookies(); // Get token from cookies
    console.log("Token:", token);

    // Send data as query parameters
    const response = await axios.post(
      `${baseIp}/api/v1/cart`, // Endpoint
      {}, // No body since we're using params
      {
        params: { productId, quantity, userId }, // Set query parameters
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the header
        },
      }
    );

    console.log("Item added to cart:", response.data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error(
      "Error adding to cart:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for further handling
  }
};

// **Get Cart Items**
export const getCartItems = async (userId) => {
  try {
    const token = getTokenFromCookies(); // Get token from cookies

    const response = await axios.get(`${baseIp}/api/v1/cart`, {
      params: { userId }, // Query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Add token in the header
      },
    });

    console.log("Cart items retrieved:", response.data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error(
      "Error fetching cart items:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for further handling
  }
};

// **Delete Cart Item**
export const deleteCartItem = async (userId, productId) => {
  try {
    const token = getTokenFromCookies(); // Get token from cookies

    const response = await axios.delete(`${baseIp}/api/v1/cart`, {
      params: { userId, productId }, // Query parameters
      headers: {
        Authorization: `Bearer ${token}`, // Add token in the header
      },
    });

    console.log("Item deleted from cart:", response.data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error(
      "Error deleting cart item:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for further handling
  }
};