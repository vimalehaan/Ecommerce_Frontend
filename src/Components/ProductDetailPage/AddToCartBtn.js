import React from "react";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { addToCart } from "../../Actions/CartAction"; // Import addToCart function

const AddToCartBtn = ({ productId }) => {
  // Access userId from Redux
  const userId = useSelector((state) => state.auth.user);

  // Handle button click logic
  const handleAddToCart = async () => {
    if (!userId) {
      console.error("User ID is not available. Please log in first.");
      return;
    }
    try {
      // Call the addToCart function
      await addToCart(productId, 1, userId); // Quantity set to 1 for simplicity
      console.log(`Item with Product ID: ${productId} added to cart!`);
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
    }
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
