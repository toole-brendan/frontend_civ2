import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  styled,
  CircularProgress,
  IconButton,
  alpha
} from '@mui/material';
import { 
  KeyboardArrowRight as KeyboardArrowRightIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  Pending as PendingIcon,
  Payments as PaymentsIcon,
  Storage as BlockchainIcon
} from '@mui/icons-material';

// Type for supported color options
type ColorOption = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

// Custom styled components
const StyledCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
}));

const CardContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const CardFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
  paddingTop: theme.spacing(1),
}));

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'colorName',
})<{ colorName?: ColorOption }>(({ theme, colorName = 'primary' }) => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: alpha(theme.palette[colorName].main, 0.1),
  color: theme.palette[colorName].main,
}));

const DetailLink = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  fontSize: '0.75rem',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

// Trend component for showing increase/decrease
const Trend = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'positive',
})<{ positive?: boolean }>(({ theme, positive }) => ({
  display: 'flex',
  alignItems: 'center',
  color: positive ? theme.palette.success.main : theme.palette.error.main,
  fontSize: '0.75rem',
  fontWeight: 500,
}));

// Card types
export interface MetricsCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  comparePeriod?: string;
  loading?: boolean;
  colorName?: ColorOption;
  onMoreClick?: () => void;
}

// Get icon based on title (for default icons)
const getDefaultIcon = (title: string) => {
  switch (title.toLowerCase()) {
    case 'inventory value':
      return <InventoryIcon />;
    case 'items in transit':
      return <ShippingIcon />;
    case 'pending orders':
      return <PendingIcon />;
    case 'payment status':
      return <PaymentsIcon />;
    case 'blockchain status':
      return <BlockchainIcon />;
    default:
      return <InventoryIcon />;
  }
};

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  suffix = '',
  description,
  icon,
  trend,
  comparePeriod = 'vs last period',
  loading = false,
  colorName = 'primary',
  onMoreClick,
}) => {
  const defaultIcon = getDefaultIcon(title);

  return (
    <StyledCard>
      <CardHeader>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <IconContainer colorName={colorName}>
          {icon || defaultIcon}
        </IconContainer>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
              {value}{suffix}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter>
        {trend ? (
          <Trend positive={trend.positive}>
            {trend.positive ? (
              <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
            ) : (
              <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
            )}
            {Math.abs(trend.value).toFixed(1)}% {trend.positive ? '↑' : '↓'} 
            <Typography variant="caption" sx={{ ml: 0.5, color: 'text.secondary' }}>
              {comparePeriod}
            </Typography>
          </Trend>
        ) : (
          <Box /> // Empty box for spacing
        )}
        
        {onMoreClick && (
          <DetailLink onClick={onMoreClick}>
            Details
            <KeyboardArrowRightIcon fontSize="small" />
          </DetailLink>
        )}
      </CardFooter>
    </StyledCard>
  );
};

export default MetricsCard; 