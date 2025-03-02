import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  Divider,
  Box,
  Typography,
  IconButton,
  Badge,
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
  Button,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  AddCircleOutline as CreateTransferIcon,
  Description as ReportIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  AccountCircle,
  Logout as LogoutIcon,
  NotificationsActive as NotificationsActiveIcon,
  QrCode as QrCodeIcon,
  Warehouse as WarehouseIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavItemConfig, DrawerVariant } from '../../types/navigation';
import NavItem from './NavItem';
import { NAV_ITEMS, ROUTES, icons } from '../../app/routes';
import { useTheme } from '../../theme/ThemeContext';

// Add these routes for the sidebar actions (not yet implemented in main routes)
const ADDITIONAL_ROUTES = {
  SCANNER: '/scanner',
  CREATE_TRANSFER: '/create-transfer',
  GENERATE_REPORT: '/reports',
};

// Enhanced navigation item interface that extends NavItemConfig
interface EnhancedNavItem extends NavItemConfig {
  badge?: number;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  subtitle?: string;
}

// Mock data for warehouse locations
const warehouseLocations = [
  { id: 'all', name: 'All Locations', status: 'normal' },
  { id: 'austin', name: 'Austin, TX', status: 'warning' },
  { id: 'sanjose', name: 'San Jose, CA', status: 'normal' },
  { id: 'guadalajara', name: 'Guadalajara, MX', status: 'critical' },
];

// Mock data for user
const mockUser = {
  name: 'Michael Chen',
  role: 'Operations Director',
  company: 'TechComponents International',
  avatar: '',
};

interface SidebarProps {
  variant: DrawerVariant;
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  navItems: NavItemConfig[];
  onCollapseChange?: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  variant, 
  open, 
  onClose,
  navItems,
  isMobile,
  onCollapseChange,
}) => {
  const { mode, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize collapsed state from localStorage or default to false
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });
  
  // Initialize warehousesOpen state from localStorage or default to false
  const [warehousesOpen, setWarehousesOpen] = useState(() => {
    const savedState = localStorage.getItem('warehousesOpen');
    return savedState ? JSON.parse(savedState) : false;
  });
  
  // Update parent component with initial state
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(collapsed);
    }
  }, []);
  
  const drawerWidth = collapsed ? 72 : 260;

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
    if (onCollapseChange) {
      onCollapseChange(newState);
    }
  };

  const toggleWarehouses = () => {
    const newState = !warehousesOpen;
    setWarehousesOpen(newState);
    localStorage.setItem('warehousesOpen', JSON.stringify(newState));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  };

  // Enhanced navigation items with badges and counts
  const enhancedNavItems: EnhancedNavItem[] = [
    {
      ...navItems.find(item => item.title === 'Dashboard') || { title: 'Dashboard', path: ROUTES.DASHBOARD, icon: icons.DashboardIcon },
      badge: 5, // Unread notifications
    },
    {
      ...navItems.find(item => item.title === 'Inventory Management') || { title: 'Inventory Management', path: ROUTES.INVENTORY, icon: icons.InventoryIcon },
      subtitle: '12,483 SKUs',
    },
    {
      ...navItems.find(item => item.title === 'Orders & Shipments') || { title: 'Orders & Shipments', path: ROUTES.ORDERS_SHIPMENTS, icon: icons.ShippingIcon },
      subtitle: '18 active',
    },
    {
      ...navItems.find(item => item.title === 'Supplier Hub') || { title: 'Supplier Hub', path: ROUTES.SUPPLIERS, icon: icons.BusinessIcon },
      subtitle: '15 total',
    },
    {
      ...navItems.find(item => item.title === 'Financial Center') || { title: 'Financial Center', path: ROUTES.FINANCIAL, icon: icons.AccountBalanceWalletIcon },
      subtitle: '3 due',
    },
    {
      ...navItems.find(item => item.title === 'Settings') || { title: 'Settings', path: ROUTES.SETTINGS, icon: icons.SettingsIcon },
    },
  ];

  const renderNavItem = (item: EnhancedNavItem, index: number) => {
    const isActive = location.pathname === item.path;
    
    return (
      <ListItemButton
        key={index}
        onClick={() => navigate(item.path)}
        selected={isActive}
        sx={{
          py: 1.5,
          px: 2.5,
          borderRadius: 1,
          backgroundColor: isActive 
            ? (theme.palette.mode === 'light' 
                ? 'rgba(59, 130, 246, 0.08)' 
                : 'rgba(144, 202, 249, 0.16)')
            : 'transparent',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(0, 0, 0, 0.04)' 
              : 'rgba(255, 255, 255, 0.08)'
          },
          justifyContent: collapsed ? 'center' : 'initial',
          mb: 1,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 40,
            mr: collapsed ? 0 : 0,
            justifyContent: 'center',
            color: isActive 
              ? theme.palette.primary.main 
              : theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.7)' 
                : 'rgba(0, 0, 0, 0.7)',
          }}
        >
          {item.badge ? (
            <Badge
              badgeContent={item.badge}
              color={item.badgeColor as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' || 'error'}
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                  fontSize: 10, 
                  height: 16, 
                  minWidth: 16,
                  border: `2px solid ${theme.palette.background.paper}`,
                  padding: '0 4px',
                },
              }}
            >
              <item.icon />
            </Badge>
          ) : (
            <item.icon />
          )}
        </ListItemIcon>
        
        {!collapsed && (
          <>
            <ListItemText
              primary={item.title}
              secondary={item.subtitle}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: isActive ? 600 : 400,
                color: isActive 
                  ? theme.palette.primary.main 
                  : theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.9)' 
                    : 'rgba(0, 0, 0, 0.9)',
                noWrap: true,
              }}
              secondaryTypographyProps={{
                variant: 'caption',
                color: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.6)' 
                  : 'rgba(0, 0, 0, 0.6)',
                noWrap: true,
              }}
              sx={{ opacity: collapsed ? 0 : 1 }}
            />
          </>
        )}
      </ListItemButton>
    );
  };

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={variant === 'temporary' ? open : true}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : '#1a1a1a',
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          marginTop: { xs: '64px', md: '72px' },
          height: { xs: 'calc(100% - 64px)', md: 'calc(100% - 72px)' },
          display: 'flex',
          flexDirection: 'column',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
              : 'linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 100%)',
            pointerEvents: 'none',
          },
        },
      }}
    >
      {/* Main Navigation Items */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1, // Take available space
          overflow: 'auto', // Enable scrolling for this section
          minHeight: 0, // Important for flexbox scrolling
          pt: 2, // Add padding at the top
        }}
      >
        <List sx={{ py: 1 }}>
          {enhancedNavItems.map(renderNavItem)}
        </List>
        
        <Divider sx={{ backgroundColor: theme.palette.divider, my: 1 }} />
        
        {/* Warehouses Section */}
        <Box sx={{ px: 2, py: 1 }}>
          <ListItemButton 
            onClick={toggleWarehouses}
            sx={{ 
              borderRadius: 1,
              mb: 1,
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <WarehouseIcon />
            </ListItemIcon>
            {!collapsed && (
              <>
                <ListItemText 
                  primary="Warehouses" 
                  primaryTypographyProps={{ 
                    variant: 'body2',
                    color: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.9)' 
                      : 'rgba(0, 0, 0, 0.9)',
                  }} 
                />
                {warehousesOpen ? <ExpandLess /> : <ExpandMore />}
              </>
            )}
          </ListItemButton>
          
          <Collapse in={!collapsed && warehousesOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {warehouseLocations.map((location) => (
                <ListItem key={location.id} disablePadding sx={{ pl: 2 }}>
                  <ListItemButton sx={{ borderRadius: 1, py: 0.75 }}>
                    <ListItemIcon sx={{ minWidth: 24, mr: 1 }}>
                      <Box
                        component="span"
                        sx={{
                          display: 'flex',
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: getStatusColor(location.status),
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={location.name}
                      primaryTypographyProps={{
                        variant: 'body2',
                        color: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.7)' 
                          : 'rgba(0, 0, 0, 0.7)',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      </Box>
      
      {/* Bottom Actions Section - Fixed at bottom */}
      <Box sx={{ flexShrink: 0, mt: 'auto' }}>
        {/* Sidebar Toggle */}
        <Box sx={{ 
          justifyContent: 'center', 
          mb: 2,
          display: { xs: 'none', sm: 'flex' },
        }}>
          <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <IconButton
              onClick={toggleCollapse}
              sx={{
                color: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.7)' 
                  : 'rgba(0, 0, 0, 0.7)',
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : '1px solid rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)',
                },
              }}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Quick Actions */}
        <Box sx={{ 
          p: collapsed ? 1 : 2,
          pt: 0,
        }}>
          {!collapsed ? (
            <>
              <Button
                fullWidth
                variant="contained"
                startIcon={<QrCodeIcon />}
                onClick={() => navigate(ADDITIONAL_ROUTES.SCANNER)}
                sx={{ 
                  mb: 2, 
                  py: 1.5,
                  bgcolor: theme.palette.primary.main,
                  color: theme.palette.mode === 'light' ? 'white' : '#121212'
                }}
              >
                Scan QR Code
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<CreateTransferIcon />}
                onClick={() => navigate(ADDITIONAL_ROUTES.CREATE_TRANSFER)}
                sx={{ 
                  mb: 2, 
                  py: 1.5,
                  borderColor: theme.palette.mode === 'light' 
                    ? 'rgba(0, 0, 0, 0.23)' 
                    : 'rgba(255, 255, 255, 0.23)',
                }}
              >
                Create Transfer
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<ReportIcon />}
                onClick={() => navigate(ADDITIONAL_ROUTES.GENERATE_REPORT)}
                sx={{ 
                  mb: 2, 
                  py: 1.5,
                  borderColor: theme.palette.mode === 'light' 
                    ? 'rgba(0, 0, 0, 0.23)' 
                    : 'rgba(255, 255, 255, 0.23)',
                }}
              >
                Generate Report
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Scan QR Code" placement="right">
                <IconButton
                  color="primary"
                  onClick={() => navigate(ADDITIONAL_ROUTES.SCANNER)}
                  sx={{ 
                    backgroundColor: theme.palette.primary.main, 
                    color: 'white', 
                    '&:hover': { 
                      backgroundColor: theme.palette.primary.dark 
                    } 
                  }}
                >
                  <QrCodeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Create Transfer" placement="right">
                <IconButton
                  onClick={() => navigate(ADDITIONAL_ROUTES.CREATE_TRANSFER)}
                  sx={{ 
                    border: theme.palette.mode === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid rgba(0, 0, 0, 0.23)', 
                    color: theme.palette.text.primary 
                  }}
                >
                  <CreateTransferIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Generate Report" placement="right">
                <IconButton
                  onClick={() => navigate(ADDITIONAL_ROUTES.GENERATE_REPORT)}
                  sx={{ 
                    border: theme.palette.mode === 'dark' 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid rgba(0, 0, 0, 0.23)',
                    color: theme.palette.text.primary 
                  }}
                >
                  <ReportIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        
        {/* Logout Button */}
        <Box sx={{ 
          pb: 2, 
          display: 'flex', 
          justifyContent: collapsed ? 'center' : 'flex-start', 
          px: collapsed ? 0 : 2,
        }}>
          <Button
            fullWidth
            variant="text"
            onClick={handleLogout}
            startIcon={!collapsed && <LogoutIcon />}
            sx={{ 
              justifyContent: collapsed ? 'center' : 'flex-start', 
              py: 1.5,
              color: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.7)' 
                : 'rgba(0, 0, 0, 0.7)',
              minWidth: collapsed ? 'auto' : '100%',
            }}
          >
            {collapsed ? <LogoutIcon /> : 'Logout'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
