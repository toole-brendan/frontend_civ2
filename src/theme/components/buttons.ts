import { Theme, alpha } from '@mui/material/styles';

/**
 * Theme overrides for MUI Button components
 */
export const getButtonOverrides = (theme: Theme) => {
  const isDark = theme.palette.mode === 'dark';
  
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: isDark 
              ? '0 4px 8px rgba(0, 0, 0, 0.2)' 
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: theme.palette.divider,
          '&:hover': {
            borderColor: isDark 
              ? alpha(theme.palette.primary.main, 0.5) 
              : theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
          },
        },
        sizeSmall: {
          fontSize: '0.8125rem',
          padding: '6px 12px',
        },
        sizeLarge: {
          fontSize: '0.9375rem',
          padding: '10px 20px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.hover, 0.8),
            transform: 'scale(1.1)',
          },
        },
        sizeSmall: {
          padding: 6,
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: isDark 
            ? '0 4px 8px rgba(0, 0, 0, 0.3)' 
            : '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: isDark 
              ? '0 6px 12px rgba(0, 0, 0, 0.4)' 
              : '0 4px 12px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
  };
};
