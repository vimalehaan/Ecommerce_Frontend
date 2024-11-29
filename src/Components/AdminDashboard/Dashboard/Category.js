import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState(""); // State for description
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch categories (Static list or API request)
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8222/api/v1/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Handle adding a new category
  const handleAddCategory = async () => {
    if (newCategory.trim() === "" || newDescription.trim() === "") return;

    try {
      // Add category with description
      await axios.post("http://localhost:8222/api/v1/category", {
        name: newCategory,
        description: newDescription, // Add description to the request
      });

      // Update category list after adding a new category
      fetchCategories();
      setNewCategory("");
      setNewDescription(""); // Clear description field
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8222/api/v1/category/${categoryId}`);
      fetchCategories();
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  return (
    <Box sx={{ p: 3 , mt:2, borderRadius:2,backgroundColor: "#f3f4f6"}}>
      <Paper
        sx={{
          p: 2,
          textAlign: "center",
          backgroundColor: "#f3f4f6",
          borderRadius: 2,
          flex: "1 1 100px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total : {categories.length}
        </Typography>
        <List>
          {categories.map((category) => (
            <ListItem key={category.id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <ListItemText
                primary={category.name}
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Add New Category
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="New Category"
            variant="outlined"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            label="Category Description"
            variant="outlined"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)} // Handle description change
            sx={{ flex: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCategory}
            sx={{ ml: 2 }}
          >
            Add
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Category updated"
      />
    </Box>
  );
};

export default Category;
