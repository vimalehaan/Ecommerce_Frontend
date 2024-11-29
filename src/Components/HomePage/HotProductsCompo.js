import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// import HomeProductCard from "../Cards/HomeProductCard";
import ProductsList from "./ProductsList";
import { BlackBigButton } from "../Utils/Buttons";

const HotProductsCompo = () => {
  return (
    <Container
      sx={{
        p: "30px 0 0 0",
      }}
    >
      <Typography
        variant="primeSuperTitle"
        textTransform={"uppercase"}
        fontWeight={"bold"}
      >
        Our hot selling Products
      </Typography>
      <br />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          //   border: "1px solid red",
          mt: "20px",
        }}
      >
        <Typography
          variant="primePara1"
          fontWeight={"bold"}
          sx={{ color: "primary.lighter", width: "90%" }}
        >
          Discover a fusion of trend and sophistication in our curated
          collection. From chic essentials to statement pieces, our fashion
          embraces individuality, ensuring every wardrobe reflects style,
          versatility, and timeless elegance
        </Typography>
      </Box>
      <ProductsList />
      <BlackBigButton
        text={"View More"}
        sx={{
          mt: "55px",
          width: "160px",
        }}
      />
    </Container>
  );
};

export default HotProductsCompo;
