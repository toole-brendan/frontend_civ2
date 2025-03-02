import { Theme, alpha } from '@mui/material/styles';

/**
 * Theme overrides for MUI Card component
 */
export const getCardOverrides = (theme: Theme) => {
  const isDark = theme.palette.mode === 'dark';
  
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          borderRadius: 4,
          border: isDark 
            ? `1px solid ${theme.palette.divider}` 
            : 'none',
          boxShadow: isDark 
            ? 'none' 
            : '0 4px 6px rgba(0, 0, 0, 0.05)',
          transition: 'border-color 0.2s ease-in-out, background-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            borderColor: isDark ? theme.palette.divider : 'none',
            boxShadow: isDark 
              ? `0 5px 10px rgba(0, 0, 0, 0.3)` 
              : '0 6px 12px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: isDark 
            ? alpha(theme.palette.background.paper, 0.6)
            : theme.palette.background.paper,
        },
        title: {
          fontSize: '1rem',
          fontWeight: 500,
        },
        subheader: {
          fontSize: '0.875rem',
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          '&:last-child': {
            paddingBottom: theme.spacing(2),
          },
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1.5, 2),
          borderTop: `1px solid ${theme.palette.divider}`,
          backgroundColor: isDark
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha(theme.palette.background.paper, 0.8),
        },
      },
    },
  };
};
