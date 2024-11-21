import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

// import HomeProductCard from "../Cards/HomeProductCard";
import ProductsList from "./ProductsList";
import Button from "@mui/material/Button";

const HotProductsCompo = () => {
  return (
    <Container
      sx={{
        p: "5% 0 0 0",
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
          mt: '2%',
        }}
      >
        <Typography
          variant="primePara1"
          fontWeight={"bold"}
          sx={{color: 'primary.lighter', width: '90%'}}
        >
          Discover a fusion of trend and sophistication in our curated
          collection. From chic essentials to statement pieces, our fashion
          embraces individuality, ensuring every wardrobe reflects style,
          versatility, and timeless elegance
        </Typography>
      </Box>
      <ProductsList />
      <Button
        disableElevation
        variant="contained"
        sx={{
          fontWeight: 600,
          mt: "6%",
          borderRadius: "200px",
          height: "50px",
          width: "160px",
          transition: "transform 0.4s",
          ":hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        View More
      </Button>
    </Container>
  );
};

export default HotProductsCompo;
