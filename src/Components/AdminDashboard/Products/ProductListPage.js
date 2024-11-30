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
import axios from "axios";
import Product from "./Product";
import { getProducts } from "../../../Actions/ProductApi";
import { fetchAllCategories } from "../../../Actions/CategoryAction";
import { updateProduct } from "../../../Actions/AdminAction";

const fetchProducts = async () => {
  try {
     const response = await getProducts();
    return response.content;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


const fetchCategories = async () => {
  try {
    const response = await fetchAllCategories();
    return response; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

const ProductListPage = () => {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); 
  const [productImage, setProductImage] = useState(null); 
  const [productList, setProductList] = useState([]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleAddProduct = async () => {
    if (!category) {
      console.error("Category ID is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("availableQuantity", parseInt(quantity, 10));
    formData.append("categoryId", parseInt(category, 10));
    if (productImage) {
      formData.append("productImg", productImage);
    }

    try {
      const response = await axios.post("http://localhost:8222/api/v1/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product added:", response.data);

      const fetchedProducts = await fetchProducts();
      setProductList(fetchedProducts);

      setProductName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setCategory("");
      setProductImage(null); 
      setOpen(false);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
    }
  };
  const handleEditProduct = async (editedProduct) => {
    const payload = {
      id: editedProduct.id,
      name: editedProduct.name,
      description: editedProduct.description,
      availableQuantity: editedProduct.availableQuantity,
      price: editedProduct.price,
      productImg: editedProduct.productImg , // Fallback to "null" if no image is provided
      categoryId: editedProduct.categoryId,
    };
   console.log("Payload being sent:", payload);
  
    try {
      // await updateProduct(payload); // Pass both payload and token
      const fetchedProducts = await fetchProducts();
      setProductList(fetchedProducts); // Update the product list
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8222/api/v1/products/${productId}`);
      console.log("Product deleted");

      const fetchedProducts = await fetchProducts();
      setProductList(fetchedProducts);
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProductList(fetchedProducts);
      setCategories(fetchedCategories);
    };

    initializeData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        sx={{ backgroundColor: "#76ABAE" }}
      >
        Add Product
      </Button>

      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent >
          <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ width: "30vw",padding:"1vw" }}>
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
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImage(e.target.files[0])}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            sx={{ backgroundColor: "#76ABAE" }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
        {productList.map((product) => (
          <Product
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </Box>
    </div>      
  );
};

export default ProductListPage;
