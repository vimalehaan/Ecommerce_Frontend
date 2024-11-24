import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const InventoryPage = () => {
  const [productList, setProductList] = useState([]);

  // Fetch product data from API
  const fetchProductData = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    setProductList(data.products); // Assuming `data.products` contains the product details
  };

  // UseEffect to fetch data when the page loads
  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
      <Box sx={{ width: '60vw', margin: '0 auto' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell align="center"><strong>Category</strong></TableCell>
                <TableCell align="center"><strong>Quantity</strong></TableCell>
                <TableCell align="center"><strong>Price</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productList.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell align="center">{product.category}</TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">LKR {product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default InventoryPage;
