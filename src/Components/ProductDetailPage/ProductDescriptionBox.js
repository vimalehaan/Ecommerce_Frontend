// ProductDescriptionBox.js
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ProductDescriptionBox = ({ description }) => {
  return (
    <Box
      id="Two"
      height={430}
      width={600}
      borderRadius={1}
      sx={{
        p: "50px",
        boxSizing: "border-box",
        textAlign: "left",
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "600",
          paddingTop: "5px",
          fontSize: "18px",
          color: "#505050",
        }}
      >
        About this Item
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          paddingTop: "5px",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ProductDescriptionBox;
