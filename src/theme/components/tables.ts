import { Theme, alpha } from '@mui/material/styles';

/**
 * Theme overrides for MUI Table components
 */
export const getTableOverrides = (theme: Theme) => {
  const isDark = theme.palette.mode === 'dark';
  
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.divider}`,
          padding: '12px 16px',
          transition: 'border-color 0.3s ease, background-color 0.3s ease',
          fontSize: '0.875rem',
        },
        head: {
          fontWeight: 500,
          backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.background.default, 0.6)
            : alpha(theme.palette.primary.main, 0.05),
          color: theme.palette.text.primary,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        body: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:nth-of-type(even)': {
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.action.hover, 0.05) 
              : alpha(theme.palette.action.selected, 0.1),
          },
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.action.hover, 0.1)
              : alpha(theme.palette.action.hover, 0.05),
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${theme.palette.divider}`,
        },
        selectIcon: {
          color: theme.palette.text.secondary,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          '&.MuiTableToolbar-root': {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.mode === 'light' 
              ? 'rgba(237, 242, 247, 0.5)' 
              : 'rgba(39, 39, 42, 0.5)',
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        },
      },
    },
  };
};
