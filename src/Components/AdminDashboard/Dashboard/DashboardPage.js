import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch metrics data
  const fetchMetrics = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        fetch("https://dummyjson.com/users"),
        fetch("https://dummyjson.com/products"),
        fetch("https://dummyjson.com/carts"),
      ]);

      const usersData = await usersRes.json();
      const productsData = await productsRes.json();
      const ordersData = await ordersRes.json();

      // Calculate total revenue
      const totalRevenue = ordersData.carts.reduce(
        (sum, cart) => sum + cart.total,
        0
      );

      setMetrics({
        totalUsers: usersData.users.length,
        totalProducts: productsData.products.length,
        totalOrders: ordersData.carts.length,
        totalRevenue,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // Bar chart data
  const chartData = {
    labels: ["Users", "Products", "Orders", "Revenue"],
    datasets: [
      {
        label: "Dashboard Metrics",
        data: [
          metrics.totalUsers,
          metrics.totalProducts,
          metrics.totalOrders,
          metrics.totalRevenue,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3", "#FF5722"],
      },
    ],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#f3f4f6",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h5" color="primary">
                  {metrics.totalUsers}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#f3f4f6",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h5" color="secondary">
                  {metrics.totalProducts}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#f3f4f6",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">Total Orders</Typography>
                <Typography variant="h5" color="success">
                  {metrics.totalOrders}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "#f3f4f6",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h5" color="error">
                  ${metrics.totalRevenue}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Metrics Overview
            </Typography>
            <Bar data={chartData} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DashboardPage;
