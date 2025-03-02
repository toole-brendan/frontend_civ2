import React, { useState, useEffect } from 'react';
import { 
  Box,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../theme/ThemeContext';
import AppBar from './AppBar';
import Sidebar from './Sidebar';
import { NAV_ITEMS } from '../../app/routes';

/**
 * AppContainer is the main layout component that wraps the entire application.
 * It manages the AppBar, Sidebar, and main content area.
 */
const AppContainer: React.FC = () => {
  const { mode } = useTheme();
  const theme = useMuiTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });

  const drawerWidth = sidebarCollapsed ? 72 : 260;

  // Update collapsed state whenever localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        setSidebarCollapsed(JSON.parse(savedState));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(collapsed));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        isMobile={isMobile}
        onDrawerToggle={handleDrawerToggle}
      />

      {/* Sidebar - Mobile (Drawer) */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : '#1a1a1a',
            },
          }}
        >
          <Sidebar 
            variant="temporary"
            isMobile={isMobile}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            navItems={NAV_ITEMS}
            onCollapseChange={handleSidebarCollapse}
          />
        </Drawer>
      )}

      {/* Sidebar - Desktop (Permanent) */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : '#1a1a1a',
              position: 'relative',
              height: '100%',
              border: 'none',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
            width: drawerWidth,
            flexShrink: 0,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
          open
        >
          <Sidebar 
            variant="permanent"
            isMobile={isMobile}
            open={true}
            onClose={() => {}}
            navItems={NAV_ITEMS}
            onCollapseChange={handleSidebarCollapse}
          />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          pt: { xs: 8, md: 10 },
          height: '100vh',
          overflow: 'auto',
          bgcolor: theme.palette.mode === 'light' ? '#f8f9fa' : '#121212',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppContainer;
