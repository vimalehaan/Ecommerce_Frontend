import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Product from "./Product";

// Fetch product data from the dummy API
const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products.slice(0, 5); // Fetch a limited number of products for demo
};

const ProductListPage = () => {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState("");
  const [productList, setProductList] = useState([]);

  // Open/close dialog handlers
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add product to the list
  const handleAddProduct = () => {
    const newProduct = {
      name: productName,
      description,
      quantity,
      price,
      imageURL,
      category,
    };
    setProductList([...productList, newProduct]);
    setProductName("");
    setDescription("");
    setQuantity("");
    setPrice("");
    setImageURL("");
    setCategory("");
    setOpen(false);
  };

  // Fetch products when the component is mounted
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProductList(fetchedProducts);
    };

    getProducts();
  }, []); // Empty dependency array to fetch data only once

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ backgroundColor: "#76ABAE" }}>
        Add Product
      </Button>

      {/* Dialog for adding a product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ width: "30vw" }}>
            <TextField
              fullWidth
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              fullWidth
              label="Available Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              fullWidth
              label="Product Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
                <MenuItem value="Kids">Kids</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="Footwear">Footwear</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddProduct} sx={{backgroundColor:"#76ABAE"}}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Displaying the list of products */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
        {productList.map((product, index) => (
          <Product key={index} product={product} />
        ))}
      </Box>
    </div>
  );
};

export default ProductListPage;
