import React from "react";
import ListProductCard from "../Cards/ListProductCard";

import Grid2 from "@mui/material/Grid2";

import products from "../../Data/ProductData";

const ProductList = () => {
  return (
    <div>
      <Grid2 container spacing={3} sx={{ justifyContent: "start" }}>
        {products.map((product) => (
          <Grid2 lg={3}>
            <ListProductCard
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          </Grid2>
        ))}
        
      </Grid2>
    </div>
  );
};

export default ProductList;
