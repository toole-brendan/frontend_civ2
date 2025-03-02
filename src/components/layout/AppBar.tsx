import React from 'react';
import { AppBar as MuiAppBar, styled } from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { AppBarContent } from './AppBar/AppBarContent';
import { useTheme } from '../../theme/ThemeContext';

// Force exact match with Sidebar's color
const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa' : '#1a1a1a',
  background: theme.palette.mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important',
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
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
    zIndex: 1,
  },
  // Ensure MuiToolbar-root has exact same background
  '& .MuiToolbar-root': {
    backgroundColor: theme.palette.mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important',
    background: theme.palette.mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important',
    position: 'relative',
    zIndex: 2,
  }
}));

export interface AppBarProps {
  isMobile: boolean;
  onDrawerToggle: () => void;
}

export const AppBar: React.FC<AppBarProps> = ({
  isMobile,
  onDrawerToggle,
}) => {
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();
  
  return (
    <StyledAppBar
      position="fixed"
      sx={{
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important', 
        background: mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important',
        '& .MuiToolbar-root': {
          minHeight: { xs: 64, md: 72 },
          px: { xs: 2, md: 3 },
          backgroundColor: mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important',
          background: mode === 'light' ? '#f8f9fa !important' : '#1a1a1a !important',
        },
      }}
    >
      <AppBarContent
        isMobile={isMobile}
        onDrawerToggle={onDrawerToggle}
      />
    </StyledAppBar>
  );
};

export default AppBar;
