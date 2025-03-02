import { styled } from '@mui/material/styles';
import { Card, CardContent, CardProps, Toolbar, Box, Typography, Avatar } from '@mui/material';
import { alpha } from '@mui/system';

// Basic styled components
export const StyledCard = styled(Card)({
  borderRadius: 2,
  overflow: 'hidden',
  height: '100%', 
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
});

export const StyledCardToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  backgroundColor: theme.palette.mode === 'light' 
    ? alpha(theme.palette.primary.main, 0.02)
    : alpha(theme.palette.background.paper, 0.3),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

export const StyledCardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.background.paper, 0.6)
    : alpha(theme.palette.background.paper, 0.8),
}));

export const StyledCardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
}));

export const StyledCardSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  marginTop: 4,
}));

export const CardHeaderContainer = styled(Box)({
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
});

// Variant specific cards with subdued colors
export const GradientCard = styled(StyledCard)(({ theme }) => ({
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${
    theme.palette.mode === 'dark' 
      ? alpha(theme.palette.primary.main, 0.06)
      : alpha(theme.palette.primary.main, 0.02)
  } 100%)`,
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.divider, 0.7)
      : alpha(theme.palette.primary.main, 0.05)
  }`,
}));

export const OutlinedCard = styled(StyledCard)(({ theme }) => ({
  border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
  boxShadow: 'none',
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.background.paper, 0.4)
    : theme.palette.background.paper,
}));

export const AccentCardPrimary = styled(StyledCard)(({ theme }) => ({
  borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.7)}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary.main, 0.03)
    : alpha(theme.palette.primary.main, 0.01),
}));

export const AccentCardSecondary = styled(StyledCard)(({ theme }) => ({
  borderTop: `2px solid ${alpha(theme.palette.secondary.main, 0.7)}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.secondary.main, 0.03)
    : alpha(theme.palette.secondary.main, 0.01),
}));

export const AccentCardSuccess = styled(StyledCard)(({ theme }) => ({
  borderTop: `2px solid ${alpha(theme.palette.success.main, 0.7)}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.success.main, 0.03)
    : alpha(theme.palette.success.main, 0.01),
}));

export const AccentCardError = styled(StyledCard)(({ theme }) => ({
  borderTop: `2px solid ${alpha(theme.palette.error.main, 0.7)}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.error.main, 0.03)
    : alpha(theme.palette.error.main, 0.01),
}));

export const AccentCardWarning = styled(StyledCard)(({ theme }) => ({
  borderTop: `2px solid ${alpha(theme.palette.warning.main, 0.7)}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.warning.main, 0.03)
    : alpha(theme.palette.warning.main, 0.01),
}));

export const AccentCardInfo = styled(StyledCard)(({ theme }) => ({
  borderTop: `2px solid ${alpha(theme.palette.info.main, 0.7)}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.info.main, 0.03)
    : alpha(theme.palette.info.main, 0.01),
}));

// Card with hover effect and elevation
export const ElevatedCard = styled(StyledCard)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 24px rgba(0,0,0,0.4)' 
      : '0 8px 24px rgba(0,0,0,0.1)',
  },
}));

// Additional styled components can be added here
