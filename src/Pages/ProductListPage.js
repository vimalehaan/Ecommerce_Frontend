import React, { useState, useEffect } from "react";
import { baseIp } from "../Server";

import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import PlainBox from "../Components/StyledComponents/PlainBox";
import NavBar from "../Components/Utils/NavBar";
import ProductList from "../Components/ProductListPage/ProductList";

import { getProducts } from "../Actions/ProductApi";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("lehan", products);
  
  return (
    <div>
      <PlainBox
        sx={{ height: "1100px" }}
        innerSx={{
          backgroundColor: "bgSoft.main",
        }}
      >
        <NavBar />
        <Container sx={{ pt: "20px" }}>
          <Box sx={{ width: "100%" }}>
            <ProductList />
          </Box>
        </Container>
      </PlainBox>
    </div>
  );
};

export default ProductListPage;
