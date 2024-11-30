import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import { AccountBox, Settings, Logout } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { logoutAction } from "../../Actions/AuthAction";
import { useDispatch } from "react-redux";

const AccountDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Handle opening the menu
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Action for each menu item
  const handleAccount = () => {
    // alert("Navigate to Account page");
    navigate(`/profile`);
    handleCloseMenu();
  };

  const handleSettings = () => {
    alert("Navigate to Settings page");
    handleCloseMenu();
  };

  const handleLogout = () => {
    // alert("Logout action");
    dispatch(logoutAction());
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpenMenu}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          color: "white",
          "&:hover": {
            color: "secondary.main",
          },
        }}
      >
        <AccountCircle sx={{ fontSize: "26px" }} />
      </IconButton>

      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            minWidth: 200,
            padding: 1,
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Menu Items */}
        <MenuItem onClick={handleAccount} sx={{ padding: "10px 20px" }}>
          <ListItemIcon>
            <AccountBox fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Account</Typography>
        </MenuItem>
        <MenuItem onClick={handleSettings} sx={{ padding: "10px 20px" }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ padding: "10px 20px" }}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
