import React, { useState } from "react";
import { Card, CardContent, Avatar, Typography, Box, Menu, MenuItem, Button } from "@mui/material";
import Logout from "../auth/Logout";
import { useDispatch } from "react-redux";
import profilePic from "../../assets/profilepic.jpeg";
import { logout } from "../../redux/slices/authSlice";

const UserCard = ({ user = { name: "Avaneesh", imageUrl: profilePic } }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to login or home
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    handleLogout()
    console.log('logged out');
    // setAnchorEl(null);
    // setMenuOpen(false);
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        maxWidth: 300,
        position: "relative",
        '&:hover': {
          boxShadow: 6, // Add a shadow on hover
        },
      }}
      onMouseEnter={(event) => {
        setAnchorEl(event.currentTarget)
        setMenuOpen(true);
      }}
      onMouseLeave={() => {
        setAnchorEl(null);
        setMenuOpen(false);
      }}
    >
      {/* User Avatar */}
      <Avatar
        alt={user.name}
        src={user.imageUrl}
        sx={{ width: 40, height: 40, marginRight: 2 }}
      />

      {/* User Info */}
      {/* <CardContent sx={{ flexGrow: 1 }}> */}
      <Typography variant="subtitle1">{user.name}</Typography>
      {/* </CardContent> */}


      {/* Hoverable Menu */}
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem> */}
        <MenuItem onClick={handleMenuClose}>
          Logout
        </MenuItem>
      </Menu>
    </Card>
  );
};

export default UserCard;
