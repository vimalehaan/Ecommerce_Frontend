import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = () => {
  const [quantity, setQuantity] = React.useState(1);

  // Handlers for incrementing and decrementing quantity
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));

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
          Nike
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Air Max Sneakers
        </Typography>
      </Stack>

      {/* Quantity & Price */}
      <Stack direction="row" alignItems="center" spacing={1}>
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
        <Typography variant="body2" sx={{ fontSize: "14px" }}>
          {quantity}
        </Typography>
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
      </Stack>

      <Stack direction={"column"} sx={{ alignItems: "flex-end" }}>
        {/* Price */}
        <Typography variant="h6" fontWeight="bold">
          $120
        </Typography>
      </Stack>

      <IconButton
        sx={{
          color: "error.light",
          width: 24,
          height: 24,
        }}
        onClick={() => console.log("Remove item")}
      >
        <DeleteOutlineIcon sx={{ fontSize: "20px" }} />
      </IconButton>
    </Box>
  );
};

export default CartItem;
