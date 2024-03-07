// UserListTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const UserListTable = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Fetch user list from the server
    axios
      .get("https://cluster-backend.onrender.com/users/getAllUsers")
      .then((response) => {
        setUserList(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);

  // Calculate statistics from user data
  const totalUsers = userList.length;
  const uniqueEmails = new Set(userList.map((user) => user.email)).size;

  return (
    <div>
      {/* Statics Card */}
      <Card variant="outlined" style={{ marginBottom: 16 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h5" component="div" color="primary">
                {totalUsers}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Total Users
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" component="div" color="success">
                {uniqueEmails}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Unique Emails
              </Typography>
            </Grid>
            {/* Add more statistical data as needed */}
          </Grid>
        </CardContent>
      </Card>

      {/* User List Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>📧</TableCell>
              <TableCell>⏰</TableCell>
              <TableCell>✅</TableCell>
              {/* Add more columns based on your user model */}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.slice().reverse().map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: false, // 24-hour clock
                  }).format(new Date(user.createdAt))}
                </TableCell>
                <TableCell>{user.verified}</TableCell>
                {/* Add more cells based on your user model */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserListTable;
