import { alpha, Theme } from '@mui/material/styles';

/**
 * Common card styles that can be shared across different card components
 */
export const cardStyles = {
  base: {
    borderRadius: 2,
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
  },
  hover: (theme: Theme, elevation: number = 0) => ({
    transform: elevation > 0 ? 'translateY(-4px)' : 'none',
    boxShadow: elevation > 0 
      ? `0 8px 24px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.1)'}`
      : undefined,
  }),
  variants: {
    gradient: (theme: Theme) => ({
      background: 
        `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${
          theme.palette.mode === 'dark' 
            ? alpha(theme.palette.primary.main, 0.1)
            : alpha(theme.palette.primary.main, 0.05)
        } 100%)`,
    }),
    outlined: (theme: Theme) => ({
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',
    }),
    accent: (theme: Theme, color: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' = 'primary') => ({
      borderTop: `3px solid ${theme.palette[color].main}`,
    }),
    default: () => ({}),
  },
};

/**
 * Common toolbar styles that can be shared across different components
 */
export const toolbarStyles = {
  base: (theme: Theme) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  }),
  tableHeader: (theme: Theme) => ({
    backgroundColor: theme.palette.mode === 'light' 
      ? 'rgba(237, 242, 247, 0.5)' 
      : 'rgba(39, 39, 42, 0.5)',
  }),
};

/**
 * Common footer styles for cards
 */
export const footerStyles = {
  base: (theme: Theme) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.6)
      : alpha(theme.palette.background.paper, 0.8),
  }),
};
