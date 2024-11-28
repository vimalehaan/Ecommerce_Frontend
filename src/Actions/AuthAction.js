import axios from "axios";
import { baseIp } from "../Server";
import {
  authStart,
  authSuccess,
  authFailure,
  setUser,
} from "../Reducers/authSlice";

/**
 * Function to handle login API call
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 */
export const login = (email, password) => async (dispatch) => {
  dispatch(authStart()); // Set loading state
  try {
    const response = await axios.post(`${baseIp}/api/v1/auth/login`, {
      email,
      password,
    });
    console.log(response.data);

    // Store token in cookies
    const token = response.data.accessToken;
    document.cookie = `authToken=${token}; path=/; max-age=604800; secure`;

    // Dispatch success action with user data
    dispatch(authSuccess({ user: response.data.user }));
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    dispatch(authFailure(error.response?.data?.message || "Login failed"));
    throw error.response?.data || error;
  }
};

/**
 * Function to handle registration API call
 * @param {Object} userDetails - The user's details
 */
export const register = (userDetails) => async (dispatch) => {
  dispatch(authStart());
  try {
    console.log(userDetails);
    const response = await axios.post(
      `${baseIp}/api/v1/auth/register`,
      userDetails
    );
    console.log(response.data);

    // Store token in cookies
    const token = response.data.accessToken;
    document.cookie = `authToken=${token}; path=/; max-age=604800; secure`;

    dispatch(authSuccess({ user: response.data.user }));
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    dispatch(
      authFailure(error.response?.data?.message || "Registration failed")
    );
    throw error.response?.data || error;
  }
};

// Function to get the token from cookies
const getTokenFromCookies = () => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = value;
    return acc;
  }, {});

  return cookies["authToken"]; // Replace 'token' with your actual cookie name
};

export const fetchUserId = () => async (dispatch) => {
  try {
    const AccessToken = getTokenFromCookies(); // Assuming token is stored in localStorage
    console.log("Tokkkkennn", AccessToken);
    const response = await axios.get(
      "http://localhost:8222/api/v1/auth/getUserIdFromToken",
      {
        token: AccessToken,
      }
    );
    console.log(response);
    // Assuming the response contains user data with userId
    const user = { userId: response.data.userId };

    dispatch(setUser(user));
  } catch (error) {
    dispatch(authFailure(error.response?.data || "Failed to fetch user data"));
  }
};
