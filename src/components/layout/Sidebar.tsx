import React from 'react';
import {
  Drawer,
  List,
  Divider,
  useTheme,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  SwapHoriz as TransfersIcon,
  ShoppingCart as OrdersIcon,
  AccountBalanceWallet as WalletIcon,
  QrCode as QrCodeIcon,
  Handshake as PartnersIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { NavItemConfig, DrawerVariant } from '../../types/navigation';
import NavItem from './NavItem';

// Create an icons map to help TypeScript understand the icons are used
const icons = {
  DashboardIcon,
  InventoryIcon,
  TransfersIcon,
  OrdersIcon,
  WalletIcon,
  QrCodeIcon,
  PartnersIcon,
  AnalyticsIcon,
  SettingsIcon,
  LogoutIcon,
} as const;

// Export for use in routes configuration
export { icons };

interface SidebarProps {
  variant: DrawerVariant;
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  navItems: NavItemConfig[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  variant, 
  open, 
  onClose,
  navItems 
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/');
  };

  return (
    <Drawer
      variant={variant}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(12px)',
          color: theme.palette.text.primary,
          borderRight: `1px solid ${theme.palette.divider}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
            pointerEvents: 'none',
          },
        },
      }}
    >
      <Box sx={{ height: theme.spacing(8) }} /> {/* Toolbar spacing */}
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
      
      {/* Main Navigation Items */}
      <List sx={{ 
        flexGrow: 1, 
        py: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {navItems.map((item) => (
          <NavItem
            key={item.title}
            to={item.path}
            icon={<item.icon />}
            data-testid={`nav-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
            aria-label={item.title}
          >
            {item.title}
          </NavItem>
        ))}
        <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push logout to bottom */}
      </List>

      {/* Logout Button at Bottom */}
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
      <List sx={{ py: 1 }}>
        <NavItem
          to="/"
          icon={<LogoutIcon />}
          onClick={handleLogout}
          data-testid="nav-item-logout"
          aria-label="Logout"
        >
          Logout
        </NavItem>
      </List>
    </Drawer>
  );
};

export default Sidebar; 