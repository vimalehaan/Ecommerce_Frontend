import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Grid2 } from "@mui/material";

const ShippingOrderItem = ({ image, title, quantity, price }) => {
  const totalAmount = price * quantity;

  // Limit the title to 20 characters with ellipsis
  const truncatedTitle = title.length > 50 ? title.slice(0, 20) + "..." : title;

  return (
    <Paper
      sx={{
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "20px",
        height: "110px",
      }}
    >
      <Grid2 container spacing={2}>
        <Grid2 item xs={3}>
          <img
            src={image}
            alt="productImage"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Grid2>
        <Grid2 item xs={9}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              textAlign: "left",
              height: "100%",
            }}
          >
            <Typography variant="body2" color="black" fontWeight={"bold"}>
              {truncatedTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Quantity: {quantity}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total: ${totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default ShippingOrderItem;
