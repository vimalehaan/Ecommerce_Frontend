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
} from "@mui/material";

const UserPage = () => {
  const [userList, setUserList] = useState([]);

  // Fetch user data from API
  const fetchUserData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUserList(data.users); // Assuming `data.users` contains the user details
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // UseEffect to fetch data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Remove user handler
  const handleRemoveUser = async (userId) => {
    try {
      // Dummy API request for removal
      await fetch(`https://dummyjson.com/users/${userId}`, {
        method: "DELETE",
      });

      // Update state by filtering out the removed user
      setUserList(userList.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <Box sx={{ width: "60vw", margin: "0 auto" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      Remove
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

export default UserPage;
