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
import { getTokenFromCookies } from "../../../Actions/AuthAction";

const ProductListPage = () => {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [productImages, setProductImages] = useState([]);
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

      let imageUrls = [];
      if (productImages.length > 0) {
        // Upload all images and collect their URLs
        for (const image of productImages) {
          const imageUrl = await uploadImage(image); // Assuming this function returns the uploaded image's URL
          imageUrls.push(imageUrl);
        }
      }

      // Create the product payload as a plain object
      const payload = {
        name: productName,
        description: description,
        price: parseFloat(price),
        availableQuantity: parseInt(quantity, 10),
        categoryId: parseInt(category, 10),
        productImg: imageUrls, // Attach uploaded image URLs
      };

      // Convert payload to FormData
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (Array.isArray(payload[key])) {
          // For arrays (e.g., productImg), append each item individually
          payload[key].forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, payload[key]);
        }
      });

      console.log("FORM DATA:", formData);
      const token = getTokenFromCookies();

      // Send the FormData as the request body
      const response = await axios.post(
        "http://localhost:8222/api/v1/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set correct Content-Type for FormData
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setSuccess("Product added successfully!");
      const fetchedProducts = await getProducts();
      setProductList(fetchedProducts.content);

      // Reset form data
      setProductName("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setCategory("");
      setProductImages([]);
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
        productImgs: editedProduct.productImgs,
        categoryId: editedProduct.categoryId,
      };

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
      const token = getTokenFromCookies();
      await axios.delete(`http://localhost:8222/api/v1/products/${productId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
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
        const [fetchedProducts, fetchedCategories] = await Promise.all([
          getProducts(),
          fetchAllCategories(),
        ]);
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
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            mt={1}
            sx={{ width: "30vw", padding: "1vw" }}
          >
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
              multiple
              onChange={(e) => setProductImages(Array.from(e.target.files))}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "20px",
        }}
      >
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
