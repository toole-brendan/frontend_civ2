import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  CircularProgress, 
  Paper,
  useTheme
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LoopIcon from '@mui/icons-material/Loop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TokenIcon from '@mui/icons-material/Token';
import VerifiedIcon from '@mui/icons-material/Verified';

const PerformanceMetricsPanel: React.FC = () => {
  const theme = useTheme();
  
  // Performance metrics data
  const metrics = [
    {
      id: 1,
      name: 'Inventory Turnover',
      value: 4.2,
      trend: 0.3,
      trendDirection: 'up',
      icon: <LoopIcon />,
      color: theme.palette.primary.main,
      suffix: '×'
    },
    {
      id: 2,
      name: 'Order Fulfillment Rate',
      value: 97.3,
      trend: 1.2,
      trendDirection: 'up',
      icon: <ShoppingCartIcon />,
      color: theme.palette.success.main,
      suffix: '%'
    },
    {
      id: 3,
      name: 'On-Time Delivery',
      value: 93.8,
      trend: -0.5,
      trendDirection: 'down',
      icon: <LocalShippingIcon />,
      color: theme.palette.warning.main,
      suffix: '%'
    },
    {
      id: 4,
      name: 'Average Order Value',
      value: 14250,
      trend: 850,
      trendDirection: 'up',
      icon: <ShoppingCartIcon />,
      color: theme.palette.info.main,
      suffix: ''
    },
    {
      id: 5,
      name: 'Shell Token Adoption',
      value: 58.3,
      trend: 8.2,
      trendDirection: 'up',
      icon: <TokenIcon />,
      color: theme.palette.secondary.main,
      suffix: '%'
    },
    {
      id: 6,
      name: 'Blockchain Verification',
      value: 99.8,
      trend: 0.2,
      trendDirection: 'up',
      icon: <VerifiedIcon />,
      color: theme.palette.success.main,
      suffix: '%'
    }
  ];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format trend value
  const formatTrend = (value: number, suffix: string) => {
    if (suffix === '%' || suffix === '×') {
      return value.toFixed(1) + suffix;
    } else if (suffix === '') {
      return formatCurrency(value);
    }
    return value.toString() + suffix;
  };
  
  return (
    <Box>
      <Grid container spacing={2}>
        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} key={metric.id}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                height: '100%',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: theme.palette.background.paper,
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                  variant="determinate"
                  value={metric.suffix === '%' ? metric.value : 75}
                  size={60}
                  thickness={4}
                  sx={{
                    color: metric.color,
                    '& .MuiCircularProgress-circle': {
                      strokeLinecap: 'round',
                    },
                  }}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: metric.color
                  }}
                >
                  {metric.icon}
                </Box>
              </Box>
              
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {metric.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
                    {metric.suffix === '' ? formatCurrency(metric.value) : metric.value + metric.suffix}
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      color: metric.trendDirection === 'up' 
                        ? theme.palette.success.main 
                        : theme.palette.error.main
                    }}
                  >
                    {metric.trendDirection === 'up' 
                      ? <TrendingUpIcon fontSize="small" /> 
                      : <TrendingDownIcon fontSize="small" />
                    }
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {formatTrend(metric.trend, metric.suffix)}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Mini sparkline - would be replaced with actual chart in production */}
                <Box 
                  sx={{ 
                    mt: 1, 
                    height: 20, 
                    width: '100%',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 1,
                      bgcolor: theme.palette.divider
                    }
                  }}
                >
                  <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path
                      d={metric.trendDirection === 'up' 
                        ? 'M0,15 L10,12 L20,13 L30,10 L40,11 L50,9 L60,7 L70,8 L80,6 L90,4 L100,2' 
                        : 'M0,5 L10,7 L20,6 L30,8 L40,7 L50,9 L60,10 L70,8 L80,12 L90,13 L100,15'
                      }
                      fill="none"
                      stroke={metric.color}
                      strokeWidth="1.5"
                    />
                  </svg>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ 
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          View Full Analytics →
        </Typography>
      </Box>
    </Box>
  );
};

export default PerformanceMetricsPanel; 