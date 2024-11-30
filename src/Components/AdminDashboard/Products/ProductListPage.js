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
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import Product from "./Product";
import { getProducts } from "../../../Actions/ProductApi";
import { fetchAllCategories } from "../../../Actions/CategoryAction";
import { uploadImage } from "../../../Actions/FirebaseAction";
import { updateProduct } from "../../../Actions/AdminAction";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
    setSuccess("");
  };

  const handleAddProduct = async () => {
    try {
      if (!productName || !description || !quantity || !price || !category) {
        setError("All fields are required.");
        return;
      }

      setLoading(true);

      let imageUrl = null;
      if (productImage) {
        console.log("Uploading image...");
         imageUrl = await uploadImage(productImage);
       
      }
      console.log("Image uploaded. URL:", imageUrl);
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", parseFloat(price));
      formData.append("availableQuantity", parseInt(quantity, 10));
      formData.append("categoryId", parseInt(category, 10));
    formData.append("productImg", imageUrl);
      

      const response = await axios.post("http://localhost:8222/api/v1/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
console.log("response",response);
      setSuccess("Product added successfully!");
      const fetchedProducts = await getProducts();
      setProductList(fetchedProducts.content);

      setProductName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setCategory("");
      setProductImage(null);
      setOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (editedProduct) => {
    try {
      const payload = {
        id: editedProduct.id,
        name: editedProduct.name,
        description: editedProduct.description,
        availableQuantity: editedProduct.availableQuantity,
        price: editedProduct.price,
        productImg: editedProduct.productImg,
        categoryId: editedProduct.categoryId,
      };

      //const response = await axios.put(`http://localhost:8222/api/v1/products/${editedProduct.id}`, payload);
      await updateProduct(payload);
      setSuccess("Product updated successfully!");
      const fetchedProducts = await getProducts();
      setProductList(fetchedProducts.content);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8222/api/v1/products/${productId}`);
      setSuccess("Product deleted successfully!");
      const fetchedProducts = await getProducts();
      setProductList(fetchedProducts.content);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete product.");
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const [fetchedProducts, fetchedCategories] = await Promise.all([getProducts(), fetchAllCategories()]);
        setProductList(fetchedProducts.content);
        setCategories(fetchedCategories);
      } catch (error) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1} sx={{ width: "30vw", padding: "1vw" }}>
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
            {loading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Snackbar open autoHideDuration={6000} onClose={() => setError("")}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open autoHideDuration={6000} onClose={() => setSuccess("")}>
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}

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
