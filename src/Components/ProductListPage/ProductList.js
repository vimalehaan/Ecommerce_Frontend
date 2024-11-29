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
import SortIcon from "@mui/icons-material/Sort";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";


import Dropdown from "./Dropdown";
import CategorySelector from "./DropdownCategory";
import DropdownSort from "./DropdownSort";

const ProductList = ({ products, categories }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSort, setSelectedSort] = useState(0);

  // const itemsPerPageOptions = [4, 8, 12, 16];
  const itemsPerPageOptions = [
    {id: 4, name: "4 itemps per page"},
    {id: 8, name: "8 itemps per page"},
    {id: 12, name: "12 itemps per page"},
    {id: 16, name: "16 itemps per page"},
  ];
  const sortOptions = [
    { id: 0, name: "None" },
    { id: 1, name: "Price: Low to High" },
    { id: 2, name: "Price: High to Low" },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    if (selectedSort === 1) {
      return a.price - b.price;
    } else if (selectedSort === 2) {
      return b.price - a.price;
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    const selectedCategoryIds = selectedCategories.map(
      (category) => category.id
    );
    const matchesCategory =
      selectedCategoryIds.length === 0 ||
      selectedCategoryIds.includes(product.categoryId);

    const matchesStock = !showInStockOnly || product.availableQuantity > 0;

    return matchesCategory && matchesStock;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("Pro", products[1].categoryId);
  console.log("Cat", selectedCategories);
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-around",
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
                />
              }
              label="Show In-Stock Only"
              sx={{
                color: "red",
              }}
            />
          </Box>
          <DropdownSort
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            icon={<SortIcon fontSize="small" sx={{ ml: "-6px" }} />}
          />
          <CategorySelector
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            categories={categories}
          />
        </Stack>
        {/* <Dropdown
          label="Items Per Page"
          selectedValue={itemsPerPage}
          setSelectedValue={setItemsPerPage}
          options={itemsPerPageOptions}
        /> */}
        <DropdownSort
          sortOptions={itemsPerPageOptions}
          selectedSort={itemsPerPage}
          setSelectedSort={setItemsPerPage}
          icon={<ArrowDropDownIcon fontSize="small" sx={{ ml: "-10px" }} />}

        />
      </Box>
      <Grid2 container spacing={3} sx={{ justifyContent: "start", mt: "20px" }}>
        {currentProducts.map((product) => (
          <Grid2 lg={3} key={product.id}>
            <ListProductCard
              id={product.id}
              image={product.productImg}
              title={product.name}
              description={product.description}
              price={product.price}
              availableQuantity={product.availableQuantity} // Pass availableQuantity
            />
          </Grid2>
        ))}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "20px",
          }}
        >
          <Stack spacing={2} sx={{ pb: "27px" }}>
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
