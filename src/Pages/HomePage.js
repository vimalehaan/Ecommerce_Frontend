import React from "react";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import NavBar from "../Components/Utils/NavBar";
import WishListCard from "../Components/WishLishCard/WishListCard";


const HomePage = () => {
  const products = [
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      title: 'T-shirt with multiple colors',
      details: 'Size: medium, Color: blue, Material: Plastic\nSeller: Artel Market',
      price: 39.0,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      title: 'Winter Jacket',
      details: 'Size: large, Color: brown, Material: Wool\nSeller: Winter Wear Co.',
      price: 79.0,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100',
      title: 'Denim Shorts',
      details: 'Size: small, Color: black, Material: Denim\nSeller: Artel Market',
      price: 29.0,
    },
  ];

  const handleDelete = (id) => {
    console.log(`Delete item with id: ${id}`);
  };

  const handleAddToCart = (id) => {
    console.log(`Add to cart item with id: ${id}`);
  };
  return (
    <div>
      <Box
        sx={{
          height: "calc(100vh - 40px)",
          p: "20px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "bgSoft.main",
            height: "100%",
            borderRadius: "32px",
            // m: "20px",
          }}
        >
          <NavBar />
          <div>
      {products.map((product) => (
        <WishListCard
          key={product.id}
          image={product.image}
          title={product.title}
          details={product.details}
          price={product.price}
          onDelete={() => handleDelete(product.id)}
          onAddToCart={() => handleAddToCart(product.id)}
        />
      ))}
    </div>
        </Box>
      </Box>
      {/* <Container>
        <Grid2 container>
          <Grid2
            size={12}
            sx={{ backgroundColor: "secondary.lighter", height: "100vh" }}
          ></Grid2>
        </Grid2>
      </Container> */}
    </div>
  );
};

export default HomePage;
