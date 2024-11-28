import React, { useState } from "react";
import ListProductCard from "../Cards/ListProductCard";

import Grid2 from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import products from "../../Data/ProductData";
import catogary from "../../Data/CatogaryData";
import Dropdown from "./Dropdown";
import CategorySelector from "./DropdownCategory";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedCategories, setSelectedCategories] = useState([]);

  console.log("Catooo", selectedCategories);
  console.log("CatoooID", selectedCategories.id);
  const itemsPerPageOptions = [4, 8, 12, 16];

  const filteredProducts = products.filter(
    (product) => !showInStockOnly || product.inStock
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack
          direction={"row"}
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showInStockOnly}
                  onChange={(e) => setShowInStockOnly(e.target.checked)}
                  // color="secondary.lighter"
                  sx={{}}
                />
              }
              label="Show In-Stock Only"
              sx={{
                color: "red",
                // Change the label text color
              }}
            />
          </Box>
          <CategorySelector
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={catogary}
          />
        </Stack>
        <Dropdown
          label="Items Per Page"
          selectedValue={itemsPerPage}
          setSelectedValue={setItemsPerPage}
          options={itemsPerPageOptions}
        />
      </Box>
      <Grid2 container spacing={3} sx={{ justifyContent: "start", mt: "20px" }}>
        {currentProducts.map((product) => (
          <Grid2 lg={3}>
            <ListProductCard
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              inStock={product.inStock}
            />
          </Grid2>
        ))}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "20px",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
          </Stack>
        </Box>
      </Grid2>
    </div>
  );
};

export default ProductList;
