import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import NavBar from "../Components/Utils/NavBar";
import loginImage from "../Assets/Login/LoginImg.jpg";
import { login } from "../Actions/AuthAction"; // Ensure correct import path
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();

  // State for managing form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigation hook

  /**
   * Handles the login form submission
   * @param {Event} event - The form submission event
   */
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Clear previous errors (if any)
    setError(null);

    try {
      // Dispatch login action via Redux
      await dispatch(login(email, password)); // The Redux thunk for login handles state updates

      // Store token in localStorage for persistent authentication
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        navigate("/dashboard"); // Redirect to dashboard or desired route after successful login
      } else {
        setError("Authentication token is missing."); // Handle unexpected scenarios
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Provide a user-friendly error message
      setError(
        error?.message ||
          "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <div>
      <Box
        sx={{
          height: "calc(100vh - 40px)", // Adjust for padding
          p: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "bgSoft.main",
            height: "100%",
            borderRadius: "32px",
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px),
              repeating-linear-gradient(90deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px)
            `,
            backgroundSize: "100% 100%", // Ensure lines span the whole box
          }}
        >
          <NavBar />
          <Grid
            container
            px={"20px"}
            sx={{
              height: "calc(100vh - 120px)", // Full viewport height minus padding/other elements
            }}
          >
            {/* Left Grid (2 parts) */}
            <Grid
              item
              lg={4}
              md={4}
              sm={12} // Full width on small screens for better responsiveness
              sx={{
                p: "30px",
                height: "100%",
                width: "40%",
              }}
            >
              <Box
                sx={{
                  bgcolor: "white",
                  borderRadius: "32px",
                  height: "calc(100% - 60px)",
                  maxWidth: "100%",
                  display: "flex",
                  flexDirection: "column", // Stack items vertically
                  justifyContent: "space-around",
                  padding: "30px",
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  {/* Login Title */}
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    Sign In
                  </Typography>

                  {/* Subtitle */}
                  <Typography variant="subtitle2" sx={{ marginBottom: "20px" }}>
                    Please fill in your details to access your account.
                  </Typography>
                </Box>
                <Box>
                  {/* Email Input */}
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                  />

                  {/* Password Input */}
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                  />
                </Box>

                {/* Error Message */}
                {error && (
                  <Typography color="error" sx={{ marginBottom: "20px" }}>
                    {error}
                  </Typography>
                )}

                {/* Sign In Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    borderRadius: "20px",
                    padding: "10px 0",
                    backgroundColor: "primary.main",
                  }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>

                {/* Forgot Password Link */}
                <Link
                  href="#"
                  sx={{
                    marginTop: "10px",
                    textDecoration: "none",
                    color: "blue",
                  }}
                >
                  Forgot Password?
                </Link>

                {/* Sign Up Link */}
                <Typography sx={{ marginTop: "20px" }}>
                  Don’t have an account?{" "}
                  <Link href="#" sx={{ textDecoration: "none", color: "blue" }}>
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Grid>

            {/* Right Grid (3 parts) */}
            <Grid
              item
              lg={8}
              md={8}
              sm={12} // Full width on small screens for better responsiveness
              sx={{
                py: "30px",
                px: "20px",
                height: "100%",
                width: "60%",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={loginImage}
                  alt="Login"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "100px 5px 100px 5px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
