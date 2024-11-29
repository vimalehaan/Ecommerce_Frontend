import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const InventoryPage = () => {
  const [productList, setProductList] = useState([]);

  // Fetch product data from API
  const fetchProductData = async () => {
    try {
      const response = await axios.get('http://localhost:8222/api/v1/products');
      const data = response.data; 
      setProductList(data.content || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
    console.log(productList);

  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Inventory
      </Typography>
      <Box sx={{ width: '60vw', margin: '0 auto', marginTop: '20px' }}>
        {productList.length > 0 ? (
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
                    <TableCell>{product.name}</TableCell> 
                    <TableCell align="center">{product.categoryName}</TableCell> 
                    <TableCell align="center">{product.availableQuantity}</TableCell> 
                    <TableCell align="center">LKR {product.price.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" align="center">
            No products available in the inventory.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default InventoryPage;
