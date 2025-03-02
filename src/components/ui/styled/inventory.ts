import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { alpha } from '@mui/system';
import { StyledCard, GradientCard } from './cards';
import { glassMorphismMixin, cardHeaderMixin, contentContainerMixin } from '../../../styles/mixins';

/**
 * Styled container for inventory sections
 */
export const InventorySection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

/**
 * Gradient health panel card with very subtle background
 */
export const HealthPanelCard = styled(GradientCard)(({ theme }) => ({
  height: '100%',
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${
        alpha(theme.palette.primary.main, 0.08)
      } 100%)`
    : `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${
        alpha(theme.palette.primary.main, 0.03)
      } 100%)`,
  boxShadow: theme.palette.mode === 'dark' 
    ? 'none' 
    : `0 2px 6px ${alpha(theme.palette.primary.main, 0.05)}`,
  border: `1px solid ${
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.divider, 0.8)
      : alpha(theme.palette.primary.main, 0.07)
  }`,
}));

/**
 * Health metric container for progress bars
 */
export const HealthMetricContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
  padding: theme.spacing(0, 1),
}));

/**
 * Stats card grid container with proper spacing
 */
export const StatsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 1),
}));

/**
 * Health panel footer with stats
 */
export const HealthPanelFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: theme.spacing(2),
  borderTop: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.background.paper, 0.4)
    : alpha(theme.palette.background.paper, 0.5),
}));

/**
 * Highlighted stats value
 */
export const HighlightedStat = styled('span')(({ theme }) => ({
  color: theme.palette.success.main,
  fontWeight: 500,
}));

/**
 * Data source caption
 */
export const DataSourceCaption = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));

/**
 * Category item container
 */
export const CategoryItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  textAlign: 'center',
  borderRadius: 8,
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 16px rgba(0, 0, 0, 0.3)' 
      : '0 8px 16px rgba(0, 0, 0, 0.1)',
    borderColor: theme.palette.primary.main,
  },
}));

/**
 * Category icon container
 */
export const CategoryIcon = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark'
    ? alpha(theme.palette.primary.main, 0.15)
    : alpha(theme.palette.primary.main, 0.1),
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  color: theme.palette.primary.main,
}));

/**
 * Category label
 */
export const CategoryLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
}));

/**
 * Category count
 */
export const CategoryCount = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));
