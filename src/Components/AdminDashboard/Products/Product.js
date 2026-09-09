import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { fetchAllCategories } from "../../../Actions/CategoryAction"; // Adjust the path as needed

const Product = ({ product, onEdit, onDelete }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [categories, setCategories] = useState([]);

  const handleEditOpen = async () => {
    const fetchedCategories = await fetchAllCategories();
    setCategories(fetchedCategories);
    setEditOpen(true);
  };
  const handleEditClose = () => setEditOpen(false);

  const handleEditChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveEdit = () => {
    onEdit(editedProduct);
    setEditOpen(false);
  };

  return (
    <Card
      style={{
        margin: "10px",
        padding: "10px",
        width: "250px",
        borderRadius: "10px",
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={product.productImg[0]}
        alt={product.name}
        sx={{ borderRadius: "15px" }}
      />
      <CardContent>
        <Typography variant="h6">Name: {product.name}</Typography>
        <Typography>Description: {product.description}</Typography>
        <Typography>Category: {product.categoryName}</Typography>
        <Typography>Quantity: {product.availableQuantity}</Typography>
        <Typography>Price: LKR {product.price}</Typography>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px",
        }}
      >
        <Button variant="outlined" color="primary" onClick={handleEditOpen}>
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDelete(product.id)}
        >
          Delete
        </Button>
      </Box>

      {/* Edit Product Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            mt={1}
            sx={{ width: "30vw" }}
          >
            <TextField
              label="Product Name"
              value={editedProduct.name}
              onChange={(e) => handleEditChange("name", e.target.value)}
            />
            <TextField
              label="Description"
              value={editedProduct.description}
              onChange={(e) => handleEditChange("description", e.target.value)}
            />
            <TextField
              label="Quantity"
              type="number"
              value={editedProduct.availableQuantity}
              onChange={(e) =>
                handleEditChange("availableQuantity", e.target.value)
              }
            />
            <TextField
              label="Price"
              type="number"
              value={editedProduct.price}
              onChange={(e) => handleEditChange("price", e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={editedProduct.categoryId}
                onChange={(e) => handleEditChange("categoryId", e.target.value)}
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
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default Product;
