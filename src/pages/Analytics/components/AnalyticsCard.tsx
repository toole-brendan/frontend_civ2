import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Skeleton,
  styled,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const CardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.action.hover,
}));

interface TrendProps {
  value: number;
  label: string;
  isPercentage?: boolean;
  isPositiveBetter?: boolean;
}

const Trend: React.FC<TrendProps> = ({ 
  value, 
  label, 
  isPercentage = false,
  isPositiveBetter = true
}) => {
  const isPositive = value > 0;
  const isNeutral = value === 0;
  
  const getColor = () => {
    if (isNeutral) return 'text.secondary';
    return (isPositive === isPositiveBetter) ? 'success.main' : 'error.main';
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {!isNeutral && (isPositive ? (
        <TrendingUpIcon color={isPositiveBetter ? 'success' : 'error'} fontSize="small" sx={{ mr: 0.5 }} />
      ) : (
        <TrendingDownIcon color={isPositiveBetter ? 'error' : 'success'} fontSize="small" sx={{ mr: 0.5 }} />
      ))}
      <Typography 
        variant="body2" 
        color={getColor()}
        fontWeight="medium"
      >
        {isPositive ? '+' : ''}{value.toFixed(isPercentage ? 1 : 0)}{isPercentage ? '%' : ''} {label}
      </Typography>
    </Box>
  );
};

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPercentage?: boolean;
    isPositiveBetter?: boolean;
  };
  comparePeriod?: string;
  loading?: boolean;
  color?: string;
  suffix?: string;
  onMoreClick?: () => void;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  comparePeriod,
  loading = false,
  color = 'primary.main',
  suffix,
  onMoreClick,
}) => {
  return (
    <StyledPaper elevation={0}>
      <CardHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          {description && (
            <Tooltip title={description} arrow>
              <IconButton size="small" sx={{ ml: 0.5 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        {onMoreClick && (
          <IconButton size="small" onClick={onMoreClick}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        )}
      </CardHeader>

      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon && (
            <Box 
              sx={{ 
                mr: 2, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: 48, 
                height: 48, 
                borderRadius: '50%', 
                backgroundColor: 'rgba(0,0,0,0.04)', 
                color 
              }}
            >
              {icon}
            </Box>
          )}
          <Box>
            {loading ? (
              <>
                <Skeleton variant="text" width="80%" height={42} />
                {trend && <Skeleton variant="text" width="60%" height={20} />}
              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color }}>
                  {typeof value === 'number' ? value.toLocaleString() : value}
                  {suffix && <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 0.5 }}>{suffix}</Typography>}
                </Typography>
                {trend && <Trend {...trend} />}
              </>
            )}
          </Box>
        </Box>
      </CardContent>

      {comparePeriod && (
        <CardFooter>
          <Typography variant="caption" color="text.secondary">
            {comparePeriod}
          </Typography>
        </CardFooter>
      )}
    </StyledPaper>
  );
};

export default AnalyticsCard; 