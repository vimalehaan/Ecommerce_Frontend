import axios from "axios";
import { baseIp } from "../Server";

/**
 * Function to handle login API call
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to response data or throws an error
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseIp}/api/v1/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error.response?.data || error;
  }
};

/**
 * Function to handle registration API call
 * @param {string} name - The user's name
 * @param {string} userName - The user's username
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to response data or throws an error
 */
export const register = async ({ name, userName, email, password }) => {
  try {
    console.log("IP", { baseIp });
    console.log(name, userName, email, password);
    const response = await axios.post(`${baseIp}/api/v1/auth/register`, {
      name,
      userName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error.response?.data || error;
  }
};
