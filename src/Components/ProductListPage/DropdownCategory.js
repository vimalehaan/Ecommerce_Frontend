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

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CategorySelector = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddCategory = (category) => {
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories((prev) => [...prev, category]);
    }
    handleMenuClose();
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setSelectedCategories((prev) =>
      prev.filter((category) => category !== categoryToRemove)
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
        endIcon={<ArrowDropDownIcon sx={{ ml: "-10px" }} />}
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
        Category
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
        {categories.map((category) => (
          <MenuItem
            key={category.id}
            onClick={() => handleAddCategory(category)}
            sx={{
              backgroundColor: selectedCategories.includes(category)
                ? "primary.main"
                : "transparent",
              color: selectedCategories.includes(category)
                ? "white"
                : "inherit",
              "&:hover": {
                backgroundColor: selectedCategories.includes(category)
                  ? "primary.dark"
                  : "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>

      {/* Selected Categories as Chips */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {selectedCategories.map((category, index) => (
          <Chip
            key={category.id}
            label={category.name}
            onDelete={() => handleRemoveCategory(category)}
            variant="contained"
            sx={{
              height: "30px",
              backgroundColor: "primary.main",
              color: "white",
              "& .MuiChip-deleteIcon": {
                color: "white",
                ":hover": {
                  color: "#ffffff",
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategorySelector;
