import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";

const Product = ({ product }) => {
  return (
    <Card style={{ margin: "10px", padding: "10px" ,width:"250px",borderRadius:"10px"}}>
      <CardMedia
        component="img"
        height="250"
        image={"https://i.pinimg.com/736x/be/fb/f9/befbf9746dfb21228c265e879a6321e3.jpg"}
       // image={product.productImg}
        alt={product.name}
        sx={{borderRadius:"15px"}}
      />
      <CardContent>
        <Typography variant="h6">Name: {product.name}</Typography>
        <Typography>Description: {product.description}</Typography>
        <Typography>Category: {product.categoryName}</Typography>
        <Typography>Quantity: {product.availableQuantity}</Typography>
        <Typography>Price: LKR {product.price}</Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
