import React, { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import PlainBox from "../Components/StyledComponents/PlainBox";
import NavBar from "../Components/Utils/NavBar";
import ProductList from "../Components/ProductListPage/ProductList";

import { getProducts } from "../Actions/ProductApi";
import { getCategories } from "../Actions/CategoryAction";
import Footer from "../Components/Utils/Footer";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        // setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("Products", products);
  console.log("Categories", categories);

  return (
    <div>
      <PlainBox
        sx={{ minHeight: "100vh" }}
        innerSx={{
          backgroundColor: "bgSoft.main",
          minHeight: "100vh",
        }}
      >
        <NavBar />
        <Container sx={{ pt: "20px" }}>
          <Box sx={{ width: "100%" }}>
            <ProductList products={products.content} categories={categories} />
          </Box>
        </Container>
      </PlainBox>
      <Footer />
    </div>
  );
};

export default ProductListPage;
