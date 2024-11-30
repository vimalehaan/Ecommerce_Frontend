import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getProducts } from '../../../Actions/ProductApi';
import { handleAlert } from '../../../Actions/AdminAction';

const InventoryPage = () => {
  const [productList, setProductList] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState([]);

  const fetchProductData = async () => {
    try {
      const response = await getProducts();
      const data = response.content; 
      setProductList(data || []);
      
      const lowStockProducts = await handleAlert();
      if (lowStockProducts.length > 0) {
        setLowStockAlert(lowStockProducts.map(product => `The product "${product.name}" has less than 10 items in stock.`));
      } else {
        setLowStockAlert([]);
      }

    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center">
        Inventory
      </Typography>
      <Box sx={{ width: '80%', margin: '20px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: 3 }}>
        {productList.length > 0 ? (
          <TableContainer component={Paper} sx={{ borderRadius: '8px', overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#76ABAE' }}>
                  <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Product Name</TableCell>
                  <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell align="center" sx={{ color: '#ffffff', fontWeight: 'bold' }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((product, index) => (
                  <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f4f4f4' } }}>
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

      {lowStockAlert.length > 0 && (
        <Box sx={{ marginTop: '20px', padding: '10px', backgroundColor: '#ffe082', borderRadius: '8px', boxShadow: 1 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Low Stock Alert
          </Typography>
          {lowStockAlert.map((alert, index) => (
            <Typography key={index} variant="body2" align="center" sx={{ marginBottom: '5px' }}>
              {alert}
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

export default InventoryPage;
