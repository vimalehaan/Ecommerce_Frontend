import React from "react";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useTheme } from "@mui/material/styles";

const AddToCartBtn = () => {
  // Handle button click logic
  const handleAddToCart = () => {
    console.log("Item added to cart!");
  };

  // Access theme for customization
  const theme = useTheme();

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddShoppingCartIcon />}
      onClick={handleAddToCart} // Call the handle function on click
      sx={{
        px: "30px",
        py: "10px",
        borderRadius: "30px",
        backgroundColor: theme.palette.primary.main,
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
        textTransform: "none",
      }}
    >
      Add to Cart {/* Button text */}
    </Button>
  );
};

export default AddToCartBtn;
