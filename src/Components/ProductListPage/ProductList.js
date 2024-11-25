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
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import products from "../../Data/ProductData";
import { BlackButton, OutlinedBlackButton } from "../Utils/Buttons";
import { fontSize, height, textTransform } from "@mui/system";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Filter products based on availability
  const filteredProducts = products.filter(
    (product) => !showInStockOnly || product.inStock
  );

  const itemsPerPage = 8;

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
      <Box sx={{ width: "100%", display: "flex", justifyContent: "start" }}>
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
                />
              }
              label="Show In-Stock Only"
            />
          </Box>
          <OutlinedBlackButton
            text={"Price"}
            sx={{ height: "30px", fontSize: "13px" }}
          />
          {/* Filter Option */}
        </Stack>
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
