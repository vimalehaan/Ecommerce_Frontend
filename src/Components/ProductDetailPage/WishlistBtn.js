import React, { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch
import { addToWishlist } from "../../Actions/WishlistAction"; // Import your action

const WishlistButton = ({ productId }) => {
  const userId = useSelector((state) => state.auth.user);

  const [saved, setSaved] = useState(false); // Tracks if the product is saved
  const theme = useTheme();
  const dispatch = useDispatch(); // Get dispatch function from redux

  // Handle the save toggle action
  const handleSaveToggle = () => {
    setSaved(!saved);
    console.log(
      `Product with ID ${productId} has been ${
        saved ? "removed from" : "added to"
      } the wishlist.`
    );

    // Dispatch the AddToWishlist action
    if (!saved) {
      addToWishlist(productId, userId); // Add product to wishlist
    } else {
      // You can call another action to remove from the wishlist if needed
      // dispatch(RemoveFromWishlist(productId));
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      onClick={handleSaveToggle}
      sx={{
        borderRadius: "30px",
        backgroundColor: (theme) =>
          saved ? theme.palette.error.main : theme.palette.primary.main,
        "&:hover": {
          backgroundColor: (theme) =>
            saved ? theme.palette.error.dark : theme.palette.primary.light,
        },
        textTransform: "none",
        display: "flex", // Use flexbox to center content
        justifyContent: "center", // Center the content horizontally
        alignItems: "center", // Center the content vertically
        padding: "10px 20px", // Adjust padding for better alignment
      }}
    >
      {!saved && "Add to Wishlist"}
      {saved && "Saved"}
    </Button>
  );
};

export default WishlistButton;
