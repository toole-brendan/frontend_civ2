import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

/**
 * Creates a glass morphism effect with background blur and subtle transparency
 */
export const glassMorphismMixin = (theme: Theme) => ({
  backdropFilter: 'blur(8px)',
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.background.paper, 0.8)
    : alpha(theme.palette.background.paper, 0.9),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${
    theme.palette.mode === 'dark' 
      ? alpha(theme.palette.divider, 0.2)
      : alpha(theme.palette.divider, 0.5)
  }`,
  boxShadow: theme.shadows[1],
});

/**
 * Card header with standardized padding and flex layout
 */
export const cardHeaderMixin = (theme: Theme) => ({
  padding: theme.spacing(2.5, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`
});

/**
 * Content container with standardized padding
 */
export const contentContainerMixin = (theme: Theme) => ({
  padding: theme.spacing(3),
});

/**
 * Adds a hover effect to elements
 */
export const hoverEffectMixin = (theme: Theme) => ({
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? `0 6px 16px ${alpha(theme.palette.common.black, 0.3)}`
      : `0 6px 16px ${alpha(theme.palette.common.black, 0.1)}`,
  }
});

/**
 * Adds subtle gradients to elements
 */
export const subtleGradientMixin = (theme: Theme, color: string = theme.palette.primary.main) => ({
  background: `linear-gradient(145deg, ${
    theme.palette.mode === 'dark' 
      ? alpha(theme.palette.background.paper, 0.9)
      : theme.palette.background.paper
  } 0%, ${
    theme.palette.mode === 'dark' 
      ? alpha(color, 0.05)
      : alpha(color, 0.03)
  } 100%)`,
});

/**
 * Creates verification badge styling
 */
export const verificationBadgeMixin = (theme: Theme) => ({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.success.main, 0.1),
  color: theme.palette.success.main,
  borderRadius: 12,
  padding: '2px 8px',
  fontSize: '0.75rem',
  fontWeight: 500,
  '& .MuiSvgIcon-root': {
    fontSize: '0.875rem',
    marginRight: theme.spacing(0.5),
  }
});

/**
 * Creates status chip styling
 */
export const statusChipMixin = (theme: Theme, status: 'success' | 'warning' | 'error' | 'info' | 'default') => {
  let mainColor: string;
  
  switch(status) {
    case 'success':
      mainColor = theme.palette.success.main;
      break;
    case 'warning':
      mainColor = theme.palette.warning.main;
      break;
    case 'error':
      mainColor = theme.palette.error.main;
      break;
    case 'info':
      mainColor = theme.palette.info.main;
      break;
    default:
      mainColor = theme.palette.grey[500];
  }
  
  return {
    backgroundColor: alpha(mainColor, 0.1),
    color: mainColor,
    border: `1px solid ${alpha(mainColor, 0.3)}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 1),
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.5,
    display: 'inline-flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '0.875rem',
      marginRight: theme.spacing(0.5),
    }
  };
};
