import React, { useState } from 'react';
import { Box, Breadcrumbs, Paper, Typography } from '@mui/material';
import Navbar from './components/navbar/Navbar';
import Topbar from './components/navbar/Topbar';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BreadcrumbsComponent from './components/CustomComponent/BreadcrumbsComponent';

const Layout = ({ children }) => {
  const [drawerWidth, setDrawerWidth] = useState(15); // Default expanded state

  // Function to toggle drawer width between collapsed and expanded
  const toggleDrawer = () => {
    setDrawerWidth((prevWidth) => (prevWidth === 15 ? 3.5 : 15));
  };
  return (
    <Box >
      <Topbar toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
      <Navbar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${drawerWidth}rem`, // Shift the content based on drawer width
          padding: '0px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
