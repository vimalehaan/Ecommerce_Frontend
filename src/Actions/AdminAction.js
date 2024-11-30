import axios from "axios";
import { getTokenFromCookies } from "./AuthAction";
import {getProducts} from './ProductApi';
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

//product
export const updateProduct = async (payload) => {
  try {
    const token = getTokenFromCookies(); // Ensure this method retrieves the token correctly

    // Construct FormData
    const formData = new FormData();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        formData.append(key, payload[key]);
      }
    }

    const response = await axios.put(
      `${baseIp}/api/v1/products`,
      formData, // Send the FormData in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the header
          "Content-Type": "multipart/form-data", // Specify the correct content type
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response?.data || error.message);
    throw error;
  }
};


export const handleAlert = async () => {
  try {
    const response = await getProducts(); 
    const lowStockProducts = response.content.filter(product => product.availableQuantity < 10);
  return lowStockProducts;
    
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};