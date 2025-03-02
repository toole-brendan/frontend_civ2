import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Typography,
  Box,
  styled,
  Theme,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Check as CheckIcon,
  SwapHoriz as TransferIcon,
  DoneAll as DoneAllIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeContext';
import { useDispatch, useSelector } from '../../../store';
import { 
  selectNotifications, 
  selectUnreadCount, 
  markAsRead, 
  markAllAsRead,
  Notification
} from '../../../store/slices/notifications/slice';

const DRAWER_WIDTH = 260;

const Search = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: DRAWER_WIDTH,
  borderRadius: 0,
  backgroundColor: theme.palette.mode === 'dark' ? '#333333' : '#FCFCFC',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth: '800px',
  transition: theme.transitions.create(
    ['border-color', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.24)' : 'rgba(0, 0, 0, 0.24)',
  },
  '&:focus-within': {
    borderColor: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    '& .SearchIconWrapper': {
      color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    },
  },
  [theme.breakpoints.up('md')]: {
    width: 'auto',
    minWidth: '500px',
  },
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    left: 'auto',
    marginLeft: theme.spacing(3),
  },
  // Ensure search box doesn't affect AppBar background
  '&::before, &::after': {
    display: 'none',
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
  transition: theme.transitions.create('color', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    letterSpacing: '0.02em',
    fontSize: '0.9375rem',
    fontWeight: 400,
    '&::placeholder': {
      color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      opacity: 1,
      letterSpacing: '0.02em',
      fontWeight: 300,
    },
    '&:focus': {
      '&::placeholder': {
        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      },
    },
  },
}));

const LogoContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1, 0, 2),
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.9,
  },
}));

const LogoBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.7)' 
    : 'rgba(0, 0, 0, 0.7)'}`,
  padding: theme.spacing(0.75, 2),
  marginRight: theme.spacing(2),
  '& h1': {
    fontSize: '1.125rem',
    fontWeight: 300,
    letterSpacing: '0.05em',
    color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#000000',
    margin: 0,
    fontFamily: 'Georgia, serif',
    textTransform: 'none',
  },
}));

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FF3B3B',
    color: '#FFFFFF',
    boxShadow: '0 0 0 2px #000000',
  },
}));

// Mock data for user
const mockUser = {
  name: 'Michael Chen',
  unit: '',
  avatar: '',
  status: 'online',
};

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  borderRadius: 0,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.03)' 
    : 'rgba(0, 0, 0, 0.03)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.1)' 
    : 'rgba(0, 0, 0, 0.1)'}`,
  transition: theme.transitions.create(
    ['background-color', 'transform', 'box-shadow'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeInOut,
    }
  ),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)' 
      : 'rgba(0, 0, 0, 0.05)',
    transform: 'translateY(-1px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 2px 4px rgba(0, 0, 0, 0.5)'
      : '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
}));

// Status indicator component
const StatusIndicator = styled('div')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: '#4CAF50', // Green color for online status
  border: `1px solid ${theme.palette.background.paper}`,
  position: 'absolute',
  bottom: 0,
  right: 0,
}));

interface AppBarContentProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
}

export const AppBarContent: React.FC<AppBarContentProps> = ({
  isMobile,
  onDrawerToggle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const theme = useMuiTheme();
  const dispatch = useDispatch();
  
  // Get notifications from Redux store
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogoClick = () => {
    navigate('/defense/dashboard');
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };
  
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };
  
  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };
  
  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };
  
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
    handleNotificationMenuClose();
  };
  
  const handleNavigateToNotification = (notification: Notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    
    handleNotificationMenuClose();
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out');
    handleProfileMenuClose();
  };
  
  // Format timestamp to a more readable format
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Toolbar sx={{ 
      position: 'relative',
      backgroundColor: mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important', 
      background: mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important',
    }}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{
            marginRight: 2,
            color: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.7)' 
              : 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              color: mode === 'dark' ? '#FFFFFF' : '#000000',
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <LogoContainer onClick={handleLogoClick}>
        <LogoBox>
          <h1>HandReceipt</h1>
        </LogoBox>
      </LogoContainer>

      <Search>
        <SearchIconWrapper className="SearchIconWrapper">
          <SearchIcon />
        </SearchIconWrapper>
        <form onSubmit={handleSearch} style={{ width: '100%' }}>
          <StyledInputBase
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            inputProps={{ 'aria-label': 'search' }}
          />
        </form>
      </Search>

      <Box sx={{ flexGrow: 1 }} />

      {/* Theme Toggle Button */}
      <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            mr: 1,
            color: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.9)' 
              : 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              backgroundColor: mode === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            },
          }}
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>

      <IconButton
        size="large"
        aria-label="show notifications"
        color="inherit"
        onClick={handleNotificationMenuOpen}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          mr: 1,
        }}
      >
        {unreadCount > 0 ? (
          <StyledBadge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </StyledBadge>
        ) : (
          <NotificationsIcon />
        )}
      </IconButton>
      
      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 360,
            maxHeight: 480,
            border: theme => `1px solid ${theme.palette.divider}`,
            boxShadow: theme => theme.palette.mode === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Notifications
          </Typography>
          {unreadCount > 0 && (
            <Button
              size="small"
              color="primary"
              onClick={handleMarkAllAsRead}
              startIcon={<DoneAllIcon />}
            >
              Mark all as read
            </Button>
          )}
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </Box>
        ) : (
          <Box sx={{ maxHeight: 360, overflow: 'auto' }}>
            {notifications.map((notification) => (
              <Box 
                key={notification.id} 
                sx={{ 
                  p: 2,
                  bgcolor: !notification.read 
                    ? (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(144, 202, 249, 0.08)' 
                      : 'rgba(37, 99, 235, 0.05)' 
                    : 'transparent',
                  borderBottom: 1,
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ mr: 1 }}>
                    <Avatar 
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: notification.type === 'transfer' 
                          ? 'primary.main' 
                          : 'warning.main' 
                      }}
                    >
                      <TransferIcon fontSize="small" />
                    </Avatar>
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" component="div" sx={{ fontWeight: !notification.read ? 600 : 400 }}>
                      {notification.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      {formatTimestamp(notification.timestamp)}
                    </Typography>
                  </Box>
                  {!notification.read && (
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsRead(notification.id);
                      }}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      <CheckIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button 
                    size="small" 
                    onClick={() => handleNavigateToNotification(notification)}
                    sx={{ textTransform: 'none' }}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Menu>

      <UserInfo onClick={handleProfileMenuOpen} sx={{ cursor: 'pointer' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={mockUser.avatar}
            alt={mockUser.name}
            sx={{
              width: 32,
              height: 32,
              border: (theme) => `2px solid ${theme.palette.primary.main}`,
            }}
          >
            {mockUser.name.split(' ')[1].charAt(0)}
          </Avatar>
          <StatusIndicator />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: mode === 'dark' ? '#FFFFFF' : '#000000',
            }}
          >
            {mockUser.name}
          </Typography>
        </Box>
      </UserInfo>
      
      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            border: theme => `1px solid ${theme.palette.divider}`,
            boxShadow: theme => theme.palette.mode === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.5)' 
              : '0 4px 20px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default AppBarContent;
