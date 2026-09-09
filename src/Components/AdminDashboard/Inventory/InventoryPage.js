import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getProducts } from '../../../Actions/ProductApi';
import { handleAlert } from '../../../Actions/AdminAction';

const InventoryPage = () => {
  const [productList, setProductList] = useState([]);
  const [lowStockAlert, setLowStockAlert] = useState(""); // State to hold the low stock alert message

  const fetchProductData = async () => {
    try {
      const response = await getProducts();
      const data = response.content; 
      setProductList(data || []);
      
      // Check for products with stock less than 5
      const lowStockProducts = handleAlert();
      
      // If there are any low stock products, set the alert message
      if (lowStockProducts.length > 0) {
        const productNames = lowStockProducts.map(product => product.name).join(', ');
        setLowStockAlert(`Warning: The following products have less than 5 items in stock: ${productNames}. Please check.`);
      } else {
        setLowStockAlert(""); // Clear the alert if no low stock products
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

      {/* Display the alert message below the inventory table */}
      {lowStockAlert && (
        <Box sx={{ marginTop: '20px', backgroundColor: '#ffcc00', padding: '10px', borderRadius: '4px' }}>
          <Typography variant="body1" align="center" color="textPrimary">
            {lowStockAlert}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default InventoryPage;
