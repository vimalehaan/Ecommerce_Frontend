import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Divider,
  TextField,
  Button,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

import {
  addCategory,
  deleteCategory,
  fetchAllCategories,
  editCategory,
} from "../../../Actions/CategoryAction";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetchAllCategories();
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() === "" || newDescription.trim() === "") return;

    try {
      await addCategory(newCategory, newDescription);
      fetchCategories();
      setNewCategory("");
      setNewDescription("");
      setSnackbarMessage("Category added successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategoryId) {
      setSnackbarMessage("Please select a category to edit");
      setOpenSnackbar(true);
      return;
    }

    if (newCategory.trim() === "" || newDescription.trim() === "") return;

    try {
      await editCategory(selectedCategoryId, newCategory, newDescription);
      fetchCategories();
      setNewCategory("");
      setNewDescription("");
      setSelectedCategoryId(null);
      setSnackbarMessage("Category edited successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to edit category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategoryId) {
      setSnackbarMessage("Please select a category to delete");
      setOpenSnackbar(true);
      return;
    }

    try {
      await deleteCategory(selectedCategoryId);
      fetchCategories();
      setSelectedCategoryId(null);
      setSnackbarMessage("Category deleted successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box sx={{ p: 3, mt: 2, borderRadius: 2, backgroundColor: "#f3f4f6", width: "50vw" }}>
      <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#f3f4f6", borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total: {categories.length}
        </Typography>
        

        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ width: "48%" }}>
          <Divider sx={{ my: 3 }} />
            <List>
              <RadioGroup value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                {(showAllCategories ? categories : categories.slice(0, 4)).map((category) => (
                  <ListItem key={category.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <FormControlLabel value={category.id} control={<Radio />} label={category.name} />
                  </ListItem>
                ))}
              </RadioGroup>
            </List>
            {!showAllCategories && categories.length > 3 && (
              <Button onClick={() => setShowAllCategories(true)} sx={{ mt: 2 }}>
                Show More
              </Button>
            )}
          </Box>

          <Box sx={{ width: "48%" }}>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom>
              Manage Category
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Category Name"
                variant="outlined"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Category Description"
                variant="outlined"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Box display="flex" gap={2} justifyContent="center">
                <Button variant="contained" color="primary" onClick={handleAddCategory}>
                  Add
                </Button>
                <Button variant="contained" color="secondary" onClick={handleEditCategory}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={handleDeleteCategory}>
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} message={snackbarMessage} />
    </Box>
  );
};

export default Category;
