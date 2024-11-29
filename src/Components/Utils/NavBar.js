import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountDropdown from "./AccountDropDown"; // Import the dropdown menu component

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Get userId from Redux

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "95%",
          backgroundColor: "primary.darker",
          borderRadius: "80px",
          mt: "25px",
          height: "7vh",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          <Box sx={{ ml: "5%" }}>
            <Link
              to="/" // Base URL
              style={{ textDecoration: "none", display: "inline-block" }} // Remove underline and keep layout intact
            >
              <Typography
                variant="h6"
                sx={{
                  textTransform: "uppercase",
                  fontFamily: "Space Grotesk",
                  flexGrow: 1,
                  fontWeight: "bold",
                  color: "secondary.main",
                  "&:hover": { cursor: "pointer" }, // Add hover effects
                }}
              >
                Glam
                <span style={{ textTransform: "lowercase", color: "#fff" }}>
                  mod
                </span>
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Typography
              variant="body1"
              sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
            >
              ABOUT US
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
            >
              SERVICES
            </Typography>
            <Link
              to="/productlist" // Base URL
              style={{ textDecoration: "none", display: "inline-block" }} // Remove underline and keep layout intact
            >
              <Typography
                variant="body1"
                sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
              >
                PRODUCT
              </Typography>
            </Link>
            <Typography
              variant="body1"
              sx={{ color: "#fff", cursor: "pointer", fontSize: "0.9rem" }}
            >
              TESTIMONIALS
            </Typography>
          </Box>

          {isAuthenticated ? (
            <Box
              sx={{
                ml: 3,
                mr: 3,
                position: "relative",
                display: "flex",
                gap: 0.5,
              }}
            >
              {/* Cart Icon */}
              <IconButton
                sx={{
                  color: "#fff",
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
                onClick={() => handleNavigation("/cart")}
              >
                <ShoppingCartIcon sx={{ fontSize: "20px" }} />
              </IconButton>

              {/* Wishlist Icon */}
              <IconButton
                sx={{
                  // fontSize: "10px",
                  color: "#fff",
                  "&:hover": {
                    color: "secondary.main",
                  },
                }}
                onClick={() => handleNavigation("/wishlist")}
              >
                <FavoriteIcon sx={{ fontSize: "18px" }} />
              </IconButton>

              {/* Account Dropdown */}
              <AccountDropdown />
            </Box>
          ) : (
            <Box sx={{ ml: 3, position: "relative", display: "flex", gap: 2 }}>
              <Button
                sx={{ color: "#fff", textTransform: "none" }}
                onClick={() => handleNavigation("/login")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "#fff",
                  borderRadius: "30px",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "secondary.main",
                    color: "secondary.main",
                  },
                }}
                onClick={() => handleNavigation("/signup")}
              >
                SignUp
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
