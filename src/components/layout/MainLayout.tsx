import React, { useState } from 'react';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import { NAV_ITEMS } from '../../app/routes';
import { useTheme } from '../../theme/ThemeContext';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar 
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
      />
      
      <Sidebar 
        variant={isMobile ? "temporary" : "permanent"}
        isMobile={isMobile}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        navItems={NAV_ITEMS}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8, // Height of AppBar
          backgroundColor: muiTheme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout; 