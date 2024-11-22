import { Box, Grid2, Typography, TextField, Button, Link } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../Components/Utils/NavBar";
import loginImage from "../Assets/Login/LoginImg.jpg";

const LoginPage = () => {
  // State for managing form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation check
    if (!email || !password) {
      setError("Please fill in both fields.");
    } else {
      setError(""); // Clear error on valid input
      // Handle login logic here (e.g., call an API)
      console.log("Login Successful", { email, password });
    }
  };

  return (
    <div>
      <Box
        sx={{
          height: "calc(100vh - 40px)", // Adjust for the padding
          p: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "bgSoft.main",
            height: "100%",
            borderRadius: "32px",
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px), /* Horizontal lines */
              repeating-linear-gradient(90deg, transparent, transparent 148px, rgba(255, 255, 255, 1) 150px) /* Vertical lines */
            `,
            backgroundSize: "100% 100%", // Ensure lines span the whole box
          }}
        >
          <NavBar />
          <Grid2
            container
            px={"20px"}
            sx={{
              height: "calc(100vh - 120px)", // Full viewport height minus padding/other elements
            }}
          >
            {/* Left Grid (2 parts) */}
            <Grid2
              item
              lg={4} // 4/12 = 2/5 of the total width
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
                  //   alignItems: "center",
                  padding: "30px",
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  {/* Login Title */}
                  <Typography
                    variant="title"
                    sx={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    Sign In
                  </Typography>

                  {/* Subtitle */}
                  <Typography variant="subtitle2" sx={{ marginBottom: "20px" }}>
                    Please fill your detail to access your account.{" "}
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
                  //   fullWidth
                  sx={{
                    borderRadius: "20px",
                    padding: "10px 0",
                    backgroundColor: "primary.main", // Custom color for the button
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
            </Grid2>

            {/* Right Grid (3 parts) */}
            <Grid2
              item
              lg={8} // 8/12 = 3/5 of the total width
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
                  justifyContent: "center", // Center the image horizontally
                  alignItems: "center", // Center the image vertically
                }}
              >
                <img
                  src={loginImage}
                  alt="Login"
                  style={{
                    height: "100%",
                    width: "100%", // This allows width to adjust proportionally
                    objectFit: "cover", // Maintains aspect ratio while fitting in the box
                    borderRadius: "100px 5px 100px 5px", // Custom border radius
                  }}
                />
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
