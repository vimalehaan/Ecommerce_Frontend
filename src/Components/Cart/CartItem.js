import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { deleteCartItem } from "../../Actions/CartAction";

const CartItem = ({ CartProduct, onDelete }) => {
  const [quantity, setQuantity] = React.useState(CartProduct.quantity); // Initialize with the current quantity

  // Handlers for incrementing and decrementing quantity
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

  const userId = useSelector((state) => state.auth.user); // Get userId from Redux

  // Handle delete action
  const handleDelete = async () => {
    try {
      await deleteCartItem(userId, CartProduct.productId); // Pass userId and productId to the deleteCartItem function
      console.log("Item deleted successfully");
      // setChanged(changed + 1);
      onDelete();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        padding: "16px",
        borderBottom: "1px solid #e0e0e0",
        borderRadius: "20px",
        position: "relative", // Enable positioning for the close icon
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src="https://img.freepik.com/free-photo/handsome-man-wearing-bomber-jacket_176474-50013.jpg?t=st=1732303502~exp=1732307102~hmac=43ba7c4d428cac627d6c742ad002092370ecfdc1598ede43c6e74407f1c73608&w=996" // Replace with your product image URL
        alt="Product"
        sx={{
          width: 100,
          height: 100,
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      {/* Product Details */}
      <Stack
        spacing={1}
        sx={{
          flex: 1,
          marginLeft: "16px",
          textAlign: "left",
          justifyContent: "flex-end",
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {CartProduct.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {CartProduct.productDescription}
        </Typography>
      </Stack>

      {/* Quantity & Price */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={handleDecrement}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
            width: 20,
            height: 20,
            fontSize: "14px",
          }}
        >
          <RemoveIcon fontSize="16px" />
        </IconButton>
        <Typography variant="body2" sx={{ fontSize: "14px" }}>
          {quantity}
        </Typography>
        <IconButton
          onClick={handleIncrement}
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.dark,
            },
            width: 20,
            height: 20,
            fontSize: "14px",
          }}
        >
          <AddIcon fontSize="14px" />
        </IconButton>
      </Stack>

      <Stack direction={"column"} sx={{ alignItems: "flex-end" }}>
        {/* Price */}
        <Typography variant="h6" fontWeight="semibold">
          ${CartProduct.productPrice}
        </Typography>
      </Stack>

      {/* Delete Icon */}
      <IconButton
        sx={{
          color: "error.light",
          width: 24,
          height: 24,
        }}
        onClick={handleDelete} // Call handleDelete when clicked
      >
        <DeleteOutlineIcon sx={{ fontSize: "20px" }} />
      </IconButton>
    </Box>
  );
};

export default CartItem;
