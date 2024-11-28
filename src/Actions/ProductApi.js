import axios from "axios";
import { baseIp } from "../Server";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseIp}/api/v1/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
