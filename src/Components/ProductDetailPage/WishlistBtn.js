import React, { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material/styles";

const WishlistButton = ({ productId }) => {
  const [saved, setSaved] = useState(false); // Tracks if the product is saved
  const theme = useTheme();

  // Handle the save toggle action
  const handleSaveToggle = () => {
    setSaved(!saved);
    console.log(
      `Product with ID ${productId} has been ${
        saved ? "removed from" : "added to"
      } the wishlist.`
    );
    // Here you can also make an API call or update context/state for wishlist
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
