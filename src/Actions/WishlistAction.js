import axios from "axios";
import { getTokenFromCookies } from "./AuthAction"; // Import token function
import { baseIp } from "../Server"; // Base API URL
// **Add to Wishlist**
export const addToWishlist = async (productId, userId) => {
  try {
    console.log("Chaa", productId, userId);
    const token = getTokenFromCookies(); // Get token from cookies

    // Send data as query parameters
    const response = await axios.post(
      `${baseIp}/api/v1/wishlist/add`, // Wishlist add endpoint
      {}, // No body since we're using params
      {
        params: { productId, userId }, // Set query parameters
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the header
        },
      }
    );

    // console.log("Item added to wishlist:", response.data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error(
      "Error adding to wishlist:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for further handling
  }
};

// **Remove from Wishlist**
export const removeFromWishlist = async (productId, userId) => {
  try {
    console.log(productId, userId);
    const token = getTokenFromCookies(); // Get token from cookies

    const response = await axios.post(
      `${baseIp}/api/v1/wishlist/remove`, // Wishlist remove endpoint
      {}, // No body since we're using params
      {
        params: { productId, userId }, // Set query parameters
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the header
        },
      }
    );

    console.log("Item removed from wishlist:", response.data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error(
      "Error removing from wishlist:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for further handling
  }
};

// **Get Wishlist Items**
export const getWishlistItems = async (userId) => {
  try {
    const token = getTokenFromCookies(); // Get token from cookies
    console.log(userId);
    const response = await axios.get(`${baseIp}/api/v1/wishlist`, {
      params: { userId }, // Query parameter
      headers: {
        Authorization: `Bearer ${token}`, // Add token in the header
      },
    });

    console.log("Wishlist items retrieved:", response.data);
    return response.data; // Return response if needed
  } catch (error) {
    console.error(
      "Error fetching wishlist items:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error for further handling
  }
};
