import axios from "axios";
import { getTokenFromCookies } from "./AuthAction";
import { baseIp } from "../Server";

export const fetchAllCategories = async () => {
  try {
    const token = getTokenFromCookies();
    const response = await axios.get(`${baseIp}/api/v1/category`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add token in the header
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const addCategory = async (name, description) => {
  try {
    const token = getTokenFromCookies();

    const response = await axios.post(
      `${baseIp}/api/v1/category`,
      { name, description },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the header
        },
      }
    );
    //   console.log("Category added:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to add category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(
      `${baseIp}/api/v1/category/${categoryId}`
      // { headers: { Authorization: `Bearer ${token}` } }
    );
    //   console.log("Category deleted");
    //   console.log(response);
    return response;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw error;
  }
};

export const editCategory = async (id, name, description) => {
  try {
    const response = await axios.put(`${baseIp}/api/v1/category`, {
      id,
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to edit category:", error);
    throw error;
  }
};
