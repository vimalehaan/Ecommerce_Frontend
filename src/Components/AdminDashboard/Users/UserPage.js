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
import { fetchAllCustomers, removeUser } from "../../../Actions/AdminAction";

const UserPage = () => {
  const [userList, setUserList] = useState([]);


  const fetchUserData = async () => {
    try {
      const response = await fetchAllCustomers();
      setUserList(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      console.log("userId",userId);
      await removeUser(userId);
      setUserList(userList.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
                    {user.name} 
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
