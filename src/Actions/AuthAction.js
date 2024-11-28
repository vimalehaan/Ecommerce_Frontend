import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Function to handle login API call
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to response data or throws an error
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/v1/auth/login`,
      { email, password }, // Passing email and password in the request body
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Return response data
  } catch (error) {
    console.error("Error during login:", error);
    throw error.response?.data || error; // Throw detailed API error or general error
  }
};

/**
 * Function to handle registration API call
 * @param {string} name - The user's name
 * @param {string} userName - The user's userName
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to response data or throws an error
 */
export const register = async (name, userName, email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/v1/auth/register`,
      { name, userName, email, password }, // Passing parameters in the request body
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Includes cookies in the request
      }
    );

    return response.data; // Return response data
  } catch (error) {
    console.error("Error during registration:", error);
    throw error.response?.data || error; // Throw detailed API error or general error
  }
};
