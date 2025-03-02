import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  alpha,
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
}) => (
  <Card 
    elevation={elevation}
    variant={variant}
    sx={{ 
      height: '100%',
      bgcolor: color, // Use full color background instead of border
      color: '#FFFFFF', // White text for better contrast
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        boxShadow: elevation > 0 ? 4 : undefined,
        transform: elevation > 0 ? 'translateY(-2px)' : 'none',
      }
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>{title}</Typography>
        <Avatar 
          sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            width: 40,
            height: 40,
            borderRadius: '8px'
          }}
        >
          {icon}
        </Avatar>
      </Box>
      
      <Typography variant="h3" fontWeight="500" color="#FFFFFF" sx={{ my: 1.5 }}>
        {value}
      </Typography>
      
      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 1.5 }}>
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
            color={trendDirection === 'up' ? 'rgba(152, 255, 152, 0.9)' : 'rgba(255, 152, 152, 0.9)'}
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

export default KpiStatsCard;
