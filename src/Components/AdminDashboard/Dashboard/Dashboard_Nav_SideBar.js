import { Box, Container, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import DashboardPage from "./DashboardPage";
import ProductListPage from "../Products/ProductListPage";
import InventoryPage from "../Inventory/InventoryPage";
import OrderPage from "../Orders/OrderPage";
import UserPage from "../Users/UserPage";

const componentMap = {
  Dashboard: <DashboardPage />,
  Products: <ProductListPage />,
  Inventory: <InventoryPage />,
  Orders: <OrderPage />,
  Users: <UserPage />,
};

const Dashboard_Nav_SideBar = () => {
  const [selectedKey, setSelectedKey] = useState("Dashboard");


  return (
    <div>
      <Container sx={{ display: "flex", padding: "20px" }}>
        <Box
          sx={{
            width: "10vw",
            borderRadius: "20px",
            padding: "10px 20px",
          }}
        >
          <List>
            {Object.keys(componentMap).map((item, index) => (
              <ListItem
                key={index}
                // role="button"
                aria-selected={selectedKey === item}
                sx={{
                  alignItems: "center",
                  textAlign: "center",
                  padding: "20px 40px",
                  borderRadius: "20px",
                  backgroundColor: selectedKey === item ? "#5a8f91" : "#76ABAE",
                  color: "#fff",
                  marginBottom: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#5a8f91",
                  },
                }}
                onClick={() => setSelectedKey(item)}
              >
                {item}
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          sx={{
            width: "90vw",
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {componentMap[selectedKey]}
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard_Nav_SideBar;
