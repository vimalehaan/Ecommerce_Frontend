import React from "react";
import { useSelector } from "react-redux";
import Dashboard_Nav_Header from "../Components/AdminDashboard/Dashboard/Dashboard_Nav_Header";
import Dashboard_Nav_SideBar from "../Components/AdminDashboard/Dashboard/Dashboard_Nav_SideBar";

const AdminDashboard = () => {
  // Get authentication status and user role from Redux state
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.userRole);

  if (!isAuthenticated || role !== "ADMIN") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          color: "#555",
          textAlign: "center",
        }}
      >
        Access Denied: You do not have the necessary permissions to view this
        page. Please contact the administrator if you believe this is an error.
      </div>
    );
  }

  return (
    <div>
      <Dashboard_Nav_Header />
      <Dashboard_Nav_SideBar />
    </div>
  );
};

export default AdminDashboard;
