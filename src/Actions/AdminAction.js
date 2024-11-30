import axios from "axios";
import { getTokenFromCookies } from "./AuthAction"; // Ensure this function is correctly implemented and imported
import { baseIp } from "../Server";
// Fetch all customers
export const fetchAllCustomers = async () => { 
  try {
    const token = getTokenFromCookies();
    const response = await axios.get(
    `${baseIp}/api/v1/customer/getAllCustomers`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

// Remove a user
export const removeUser = async (userId) => {
  try {
    const token = getTokenFromCookies();
    await axios.delete(
        `${baseIp}/api/v1/customer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        }
      );
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error; 
  }
};

// product

export const deleteProduct = async (productId) => {
  try {
    const token = getTokenFromCookies();
    await axios.delete(
        `${baseIp}/api/v1/customer/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token
          },
        }
      );
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error; 
  }
};

// orders
export const getOrders = async () => {
  try {
    const token = getTokenFromCookies();
    const response = await axios.get(`${baseIp}/api/v1/orders`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

//
export const updateProduct = async (payload) => {
  try {
    const token = getTokenFromCookies(); // Ensure this method retrieves the token correctly
    const response = await axios.put(
      "http://localhost:8222/api/v1/products",
      payload, // Send the payload in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    throw error;
  }
};
