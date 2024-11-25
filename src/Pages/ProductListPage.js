import React from "react";

import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import Box from "@mui/material/Box";

import PlainBox from "../Components/StyledComponents/PlainBox";
import NavBar from "../Components/Utils/NavBar";
import ProductList from "../Components/ProductListPage/ProductList";

const ProductListPage = () => {
  return (
    <div>
      <PlainBox
        sx={{ height: "1100px" }}
        innerSx={{
          backgroundColor: "bgSoft.main",
        }}
      >
        <NavBar />
        <Container sx={{pt: '20px'}}>
        <Box sx={{width: '100%',}}>
            <ProductList />
        </Box>
        </Container>
      </PlainBox>
    </div>
  );
};

export default ProductListPage;
