import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
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
import axios from "axios";
import Category from "./Category"; 
import { fetchAllCustomers } from "../../../Actions/AdminAction";
import { getProducts } from "../../../Actions/ProductApi";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch metrics data using Axios
  const fetchMetrics = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        fetchAllCustomers(),
        getProducts(),
        axios.get("https://dummyjson.com/carts"),
      ]);

      const usersData = usersRes;
      const productsData = productsRes.content;
      const ordersData = ordersRes.data;
      const totalRevenue = ordersData.carts.reduce(
        (sum, cart) => sum + cart.total,
        0
      );

      setMetrics({
        totalUsers: usersData.length,
        totalProducts: productsData.length,
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
    fetchMetrics(); // Fetch metrics when the component mounts
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
         // metrics.totalRevenue,
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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#f3f4f6",
                borderRadius: 2,
                flex: "1 1 100px",
              }}
            >
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h5" color="primary">
                {metrics.totalUsers}
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#f3f4f6",
                borderRadius: 2,
                flex: "1 1 100px",
              }}
            >
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h5" color="secondary">
                {metrics.totalProducts}
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#f3f4f6",
                borderRadius: 2,
                flex: "1 1 100px",
              }}
            >
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h5" color="success">
                {metrics.totalOrders}
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                backgroundColor: "#f3f4f6",
                borderRadius: 2,
                flex: "1 1 100px",
              }}
            >
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h5" color="error">
                ${metrics.totalRevenue}
              </Typography>
            </Paper>
          </Box>
<Box sx={{display:"flex"}}>
<Box mt={4} sx={{width:"40vw"}}>
            <Typography variant="h6" gutterBottom>
              Metrics Overview
            </Typography>
            <Bar data={chartData} />
          </Box>

          <Box mt={4} sx={{width:"20vw"}}>
            <Category /> {/* Category management component */}
          </Box>
</Box>
          
        </>
      )}
    </Box>
  );
};

export default DashboardPage;
