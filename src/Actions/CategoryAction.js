import axios from "axios";
import { baseIp } from "../Server";

export const getCategories = async () => {
    try {
      const response = await axios.get(`${baseIp}/api/v1/category`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };