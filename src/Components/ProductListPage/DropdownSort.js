import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Chip,
  Typography,
  Divider,
} from "@mui/material";


const DropdownSort = ({ selectedSort, setSelectedSort, sortOptions, icon }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelection = (option) => {
    setSelectedSort(option.id);
    {
      option.id === 0 ? setSelectedSort(0) : setSelectedSort(option.id);
    }
    handleMenuClose();
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setSelectedSort((prev) =>
      prev.filter((option) => option !== categoryToRemove)
    );
  };

  return (
    <Box sx={{ maxWidth: 400, display: "flex", alignItems: "center" }}>
      {/* Dropdown Trigger Button */}
      <Button
        variant="text"
        onClick={handleMenuOpen}
        disableRipple
        disableFocusRipple
        endIcon={icon}
        sx={{
          color: "primary.lighter",
          textTransform: "capitalize",
          fontSize: "13px",
          fontFamily: "Noto Sans",
          backgroundColor: "transparent",
          //   textDecoration: "underline",

          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
            color: "primary.main",
          },
          "&:active": {
            backgroundColor: "transparent",
          },
        }}
      >
        {selectedSort === 0
          ? "Sort By"
          : sortOptions.find((option) => option.id === selectedSort)?.name ||
            "Sort By"}
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{
          ".MuiMenu-paper": {
            width: "150px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.id}
            onClick={() => handleSortSelection(option)}
            sx={{
              backgroundColor:
                selectedSort === option.id ? "primary.main" : "transparent",
              color: selectedSort === option.id ? "white" : "inherit",
              "&:hover": {
                backgroundColor:
                  selectedSort === option.id
                    ? "primary.dark"
                    : "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DropdownSort;
