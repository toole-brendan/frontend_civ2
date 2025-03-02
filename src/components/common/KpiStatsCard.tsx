import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  alpha,
  useTheme
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Define interface for component props
export interface KpiStatsCardProps {
  /**
   * Icon to display in the card
   */
  icon: React.ReactNode;
  
  /**
   * Card title
   */
  title: string;
  
  /**
   * Main value to display
   */
  value: string;
  
  /**
   * Subtitle or description text
   */
  subtitle: string | React.ReactNode;
  
  /**
   * Whether to show a trend indicator
   * @default false
   */
  trend?: boolean;
  
  /**
   * Trend value text
   */
  trendValue?: string;
  
  /**
   * Direction of the trend
   * @default 'up'
   */
  trendDirection?: 'up' | 'down';
  
  /**
   * Optional action component (e.g., a button)
   */
  action?: React.ReactNode;
  
  /**
   * Background color of the card
   * @default "transparent"
   */
  bgColor?: string;
  
  /**
   * Primary color for card accent and icon
   */
  color: string;

  /**
   * Card elevation (0-24)
   * @default 0
   */
  elevation?: number;

  /**
   * Card variant
   * @default 'outlined'
   */
  variant?: 'outlined' | 'elevation';
}

/**
 * KpiStatsCard component displays key performance indicators in a consistent card format
 * with customizable styling, icons, and trend indicators.
 * 
 * Updated with more subtle styling (reduced opacity backgrounds, left border accent)
 */
export const KpiStatsCard: React.FC<KpiStatsCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  trend = false, 
  trendValue = "", 
  trendDirection = 'up',
  action, 
  bgColor = "transparent", 
  color,
  elevation = 0,
  variant = 'outlined'
}) => {
  const theme = useTheme();
  
  // Get the actual color value (handles both direct colors and theme palette references)
  let actualColor = color;
  if (color.includes('.')) {
    const [paletteName, variant] = color.split('.');
    if (paletteName && variant && theme.palette[paletteName as keyof typeof theme.palette]) {
      const palette = theme.palette[paletteName as keyof typeof theme.palette] as any;
      if (palette && variant in palette) {
        actualColor = palette[variant];
      }
    }
  }
  
  return (
    <Card 
      elevation={elevation}
      variant={variant}
      sx={{ 
        height: '100%',
        backgroundColor: theme.palette.mode === 'dark'
          ? alpha(actualColor, 0.08)
          : alpha(actualColor, 0.04),
        border: `1px solid ${alpha(actualColor, 0.2)}`,
        borderLeft: `3px solid ${alpha(actualColor, 0.7)}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: `0 4px 12px ${alpha(actualColor, 0.15)}`,
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="subtitle1" color="text.primary">{title}</Typography>
          <Avatar 
            sx={{ 
              bgcolor: alpha(actualColor, 0.15),
              color: actualColor,
              width: 40,
              height: 40,
              borderRadius: theme.shape.borderRadius
            }}
          >
            {icon}
          </Avatar>
        </Box>
        
        <Typography variant="h3" fontWeight="500" color="text.primary" sx={{ my: 1.5 }}>
          {value}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {subtitle}
        </Typography>
        
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {trendDirection === 'up' ? (
              <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} />
            ) : (
              <ArrowDownwardIcon sx={{ color: 'error.main', fontSize: 14, mr: 0.5 }} />
            )}
            <Typography 
              variant="caption" 
              color={trendDirection === 'up' ? 'success.main' : 'error.main'}
            >
              {trendValue}
            </Typography>
          </Box>
        )}
        
        {action && (
          <Box sx={{ mt: 1 }}>
            {action}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default KpiStatsCard;
