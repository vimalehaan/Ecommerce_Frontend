import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ArrowDropDownCircleOutlined, Logout } from "@mui/icons-material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { handleAlert } from "../../../Actions/AdminAction";

const Dashboard_Nav_Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [stockAlert, setStockAlert] = useState(false);

  const handleStockAlert = async () => {
    try {
      const res = await handleAlert();
      if (res.length > 0) {
        setStockAlert(true);
      } else {
        setStockAlert(false);
      }
    } catch (error) {
      console.error("Error fetching stock alert:", error.message);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // Add logout functionality here
  };

  useEffect(() => {
    handleStockAlert();
  }, []);

  return (
    <div>
      <Container>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            width: "98%",
            backgroundColor: "#31363F",
            borderRadius: "20px",
            mt: "25px",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textTransform: "uppercase",
                fontFamily: "Space Grotesk",
                fontWeight: "bold",
                color: "secondary.main",
              }}
            >
              Glam
              <span style={{ textTransform: "lowercase", color: "#fff" }}>
                mod
              </span>
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: "5px 20px",
                borderRadius: "10px",
              }}
              gap={2}
            >
              {stockAlert ? (
                <NotificationsActiveIcon sx={{ color: "red" }} />
              ) : (
                <NotificationsIcon sx={{ color: "gray" }} />
              )}
              <Box sx={{ display: "flex", alignItems: "center", padding: "0 5px" }}>
                <Avatar />
                <Typography sx={{ ml: 1 }}>Admin</Typography>
                <IconButton onClick={handleMenuOpen}>
                  <ArrowDropDownCircleOutlined />
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </AppBar>
      </Container>
    </div>
  );
};

export default Dashboard_Nav_Header;
