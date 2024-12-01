import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { getOrders } from "../../../Actions/AdminAction";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      // console.log("g",response);
      setOrders(response);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  // Update order status
  // const handleStatusChange = (orderId, newStatus) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.id === orderId ? { ...order, status: newStatus } : order
  //     )
  //   );
  // };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Box sx={{ width: "60vw", margin: "0 auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Customer Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Items</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.length > 0 && // Check for orders existence and length
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.shippingDetails.fullName}</TableCell>
                    <TableCell>{new Date().toLocaleDateString()}</TableCell>
                    <TableCell>
                      {order &&
                        order.length > 0 &&
                        order.products.map((item) => (
                          <div key={item.id}>
                            {item.title} (x{item.quantity})
                          </div>
                        ))}
                    </TableCell>
                    <TableCell>LKR {order.totalAmount}</TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={order.status || "Pending"}
                          onChange={(e) => {
                            const updatedStatus = e.target.value;
                            setOrders((prevOrders) =>
                              prevOrders.map((o) =>
                                o.id === order.id
                                  ? { ...o, status: updatedStatus }
                                  : o
                              )
                            );
                          }}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          setOrders((prev) =>
                            prev.filter((o) => o.id !== order.id)
                          )
                        }
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default OrderPage;
