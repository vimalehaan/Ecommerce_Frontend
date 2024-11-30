import axios from "axios";
import { baseIp } from "../Server";
import {
  authStart,
  authSuccess,
  authFailure,
  setUser,
  logout,
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
    dispatch(fetchUserId());
    return response;
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
export const getTokenFromCookies = () => {
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
    const response = await axios.post(
      `${baseIp}/api/v1/auth/getUserIdFromToken`,
      {
        token: AccessToken,
      }
    );
    // Assuming the response contains user data with userId
    const user = response.data.userId;
    console.log(user);
    console.log(response);

    dispatch(setUser(user));
  } catch (error) {
    dispatch(authFailure(error.response?.data || "Failed to fetch user data"));
  }
};

// Function to send forgot password request
export const sendForgotPasswordRequest = async (email) => {
  // Correcting the endpoint as per the new structure
  const response = await axios.post(
    `${baseIp}/forgotPassword/verifyMail/${email}`
  );
  return response.data;
};

// Function to verify OTP
export const verifyOTP = async (otp, email) => {
  // Correcting the endpoint as per the new structure
  const response = await axios.post(
    `${baseIp}/forgotPassword/verifyOtp/${otp}/${email}`
  );
  return response.data;
};

/**
 * Function to change the user's password.
 * @param {string} email - The user's email address.
 * @param {string} password - The new password.
 * @param {string} confirmPassword - Confirmation of the new password.
 * @returns {Promise} - Resolves if the password is updated successfully.
 */
export const changePassword = async (email, password, confirmPassword) => {
  try {
    const response = await axios.post(
      `${baseIp}/forgotPassword/changePassword/${email}`,
      {
        password,
        repeatPassword: confirmPassword,
      }
    );
    console.log(response);
    return response; // Return any success message or data from the response
  } catch (error) {
    // Handle and throw errors to the calling component
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error changing password."
      );
    } else {
      throw new Error("Network error. Please try again.");
    }
  }
};

export const logoutAction = () => (dispatch) => {
  // Remove token from cookies
  document.cookie = `authToken=; path=/; max-age=0; secure`;

  // Dispatch logout action to update state
  dispatch(logout());
};
