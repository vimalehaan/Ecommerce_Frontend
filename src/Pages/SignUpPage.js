import { Box, Grid2, Typography, TextField, Button, Link } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../Components/Utils/NavBar";
import signUpImage from "../Assets/Login/SignupImg.jpg"; // Make sure to use the right image for signup
import { register } from "../Actions/AuthAction"; // Import register function
import Footer from "../Components/Utils/Footer";

const SignUpPage = () => {
  // State for managing form inputs
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Simple validation check
    if (!name || !userName || !email || !password || !confirmedPassword) {
      setError("Please fill in all fields.");
    } else if (password !== confirmedPassword) {
      setError("Passwords do not match.");
    } else {
      setError(""); // Clear error on valid input

      try {
        console.log("use", userName);
        // Call the register function with user data
        await register({ name, userName, email, password });
        console.log("Sign Up Successful");
        // Optionally, redirect or show a success message
      } catch (err) {
        console.error("Sign Up Failed", err);
        setError("An error occurred during registration.");
      }
    }
  };

  return (
    <div>
      <Box
        sx={{
          // height: "calc(100vh - 40px)", // Adjust for the padding
          p: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "bgSoft.main",
            // height: "100%",
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
            sx={
              {
                // height: "calc(100vh - 120px)", // Full viewport height minus padding/other elements
              }
            }
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
                  padding: "30px",
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  {/* Sign Up Title */}
                  <Typography
                    variant="title"
                    sx={{ fontWeight: "bold", marginBottom: "10px" }}
                  >
                    Create Account
                  </Typography>

                  {/* Subtitle */}
                  <Typography variant="subtitle2" sx={{ marginBottom: "20px" }}>
                    Please fill in your details to create an account.
                  </Typography>
                </Box>
                <Box>
                  {/* Name Input */}
                  <TextField
                    label="Name"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                  />

                  {/* Username Input */}
                  <TextField
                    label="Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                  />

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

                  {/* Confirm Password Input */}
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    sx={{ marginBottom: "20px" }}
                  />
                </Box>

                {/* Error Message */}
                {error && (
                  <Typography color="error" sx={{ marginBottom: "20px" }}>
                    {error}
                  </Typography>
                )}

                {/* Create Account Button */}
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    padding: "10px 0",
                    backgroundColor: "primary.main", // Custom color for the button
                  }}
                  onClick={handleSignUp}
                >
                  Create Account
                </Button>

                {/* Already have an account Link */}
                <Typography sx={{ marginTop: "20px" }}>
                  Already have an account?{" "}
                  <Link href="#" sx={{ textDecoration: "none", color: "blue" }}>
                    Sign In
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
                // height: "120%",
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
                  src={signUpImage}
                  alt="Sign Up"
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
      <Footer />
    </div>
  );
};

export default SignUpPage;
