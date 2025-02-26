import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Box,
  styled,
  Theme,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { icons } from '../../../app/routes';
import { useTheme } from '../../../theme/ThemeContext';

const DRAWER_WIDTH = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: DRAWER_WIDTH,
  borderRadius: 0,
  backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#F5F5F5',
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

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  cursor: 'pointer',
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

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.mode === 'dark' ? '#000000' : '#FFFFFF',
    backdropFilter: 'blur(12px)',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    borderRadius: 0,
    boxShadow: theme.palette.mode === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.5)' : '0 4px 8px rgba(0, 0, 0, 0.1)',
    '& .MuiMenuItem-root': {
      transition: theme.transitions.create(
        ['background-color', 'color'],
        {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeInOut,
        }
      ),
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
}));

const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FF3B3B',
    color: '#FFFFFF',
    boxShadow: '0 0 0 2px #000000',
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

interface AppBarContentProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
  userDisplayName: string;
}

export const AppBarContent: React.FC<AppBarContentProps> = ({
  isMobile,
  onDrawerToggle,
  userDisplayName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/defense/dashboard');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar sx={{ position: 'relative' }}>
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
          color="inherit"
          sx={{
            mr: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        <StyledBadge badgeContent={3} color="error">
          <NotificationsIcon />
        </StyledBadge>
      </IconButton>

      <UserInfo onClick={handleMenuOpen}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          {userDisplayName.charAt(0)}
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: mode === 'dark' ? '#FFFFFF' : '#000000',
            }}
          >
            {userDisplayName}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.7rem',
              color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            }}
          >
            USER
          </Typography>
        </Box>
        <ArrowDownIcon
          sx={{
            fontSize: 20,
            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'none',
          }}
        />
      </UserInfo>

      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to="/defense/profile">
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to="/defense/settings">
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <icons.LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </StyledMenu>
    </Toolbar>
  );
};

export default AppBarContent; 