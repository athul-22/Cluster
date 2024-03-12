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
import style from "../styles/admin.css";

const UserListTable = () => {
  const [userList, setUserList] = useState([]);
  const [joinedToday, setJoinedToday] = useState(0);
  const [last30Days, setLast30Days] = useState(0);
  
  useEffect(() => {
    // Fetch user list from the server
    axios
      .get("https://cluster-backend.onrender.com/users/getAllUsers")
      .then((response) => {
        setUserList(response.data.users);
        calculateStatistics(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);

  const calculateStatistics = (users) => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const joinedTodayCount = users.filter(
      (user) => new Date(user.createdAt).toDateString() === today.toDateString()
    ).length;

    const last30DaysCount = users.filter(
      (user) =>
        new Date(user.createdAt) >= thirtyDaysAgo &&
        new Date(user.createdAt) <= today
    ).length;

    setJoinedToday(joinedTodayCount);
    setLast30Days(last30DaysCount);
  };

  return (
    <div>
      {/* Statics Card */}
      <Card variant="outlined" style={{ marginBottom: 16 }}>
      <div id="rootforadmin" className="flex flex-col md:flex-row md:items-stretch md:space-x-4 m-4">
  <div className="container">
    <div className="flex flex-wrap md:-mx-4">
      <div className="c-dashboardInfo col w-full md:w-1/3 px-4 mb-4 md:mb-0">
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
            Total Users
            <svg
              className="MuiSvgIcon-root-19"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
            </svg>
          </h4>
          <span className="hind-font caption-12 c-dashboardInfo__count">
            {userList.length}
          </span>
        </div>
      </div>
      <div className="c-dashboardInfo col w-full md:w-1/3 px-4 mb-4 md:mb-0">
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
            Joined Today
            <svg
              className="MuiSvgIcon-root-19"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
            </svg>
          </h4>
          <span className="hind-font caption-12 c-dashboardInfo__count">
            {joinedToday}
          </span>
        </div>
      </div>
      <div className="c-dashboardInfo col w-full md:w-1/3 px-4 mb-4 md:mb-0">
        <div className="wrap">
          <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
            Last 30 days users
            <svg
              className="MuiSvgIcon-root-19"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
            </svg>
          </h4>
          <span className="hind-font caption-12 c-dashboardInfo__count">
            {last30Days}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

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
            {userList
              .slice()
              .reverse()
              .map((user) => (
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
