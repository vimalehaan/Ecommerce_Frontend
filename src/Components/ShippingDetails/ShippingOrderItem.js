
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const ShippingOrderItem = ({ image, title, quantity, price }) => {
  const totalAmount = price * quantity;

  return (
    <Paper sx={{ padding: "10px", marginBottom: "15px" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <img src={image} alt={title} style={{ width: "100%", height: "auto", borderRadius: "8px" }} />
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Quantity: {quantity}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total: ${totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ShippingOrderItem;
