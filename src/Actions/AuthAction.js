const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Function to handle login API call
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to response data or throws an error
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Directly passing email and password here
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    return await response.json(); // Parse and return response JSON
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Propagate the error to the caller
  }
};

/**
 * Function to handle registration API call
 * @param {string} name - The user's name
 * @param {string} userName - The user's useName
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} - Resolves to response data or throws an error
 */
export const register = async (name, userName, email, password) => {
  try {
    console.log(API_BASE_URL); // Ensure API_BASE_URL is defined properly
    const response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This is valid for including cookies
      body: JSON.stringify({ name, userName, email, password }), // Passing params directly
    });

    if (!response.ok) {
      throw new Error(`Registration failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};
