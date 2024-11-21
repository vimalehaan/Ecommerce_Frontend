import React from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import HomeProductCard from "../Cards/HomeProductCard";

const ProductsList = () => {
  return (
    <Container sx={{
        // border: '1px solid red',
        mt: '5%'
    }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Distribute space evenly
          flexWrap: "wrap", // Ensure responsiveness
        }}
      >
        {Array(4)
          .fill()
          .map((_, index) => (
            <HomeProductCard key={index} />
          ))}
      </Box>
    </Container>
  );
};

export default ProductsList;
