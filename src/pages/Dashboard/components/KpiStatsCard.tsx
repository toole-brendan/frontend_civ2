import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  Button,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Define interface for component props
export interface KpiStatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string | React.ReactNode;
  trend?: boolean;
  trendValue?: string;
  action?: React.ReactNode;
  bgColor?: string;
  color: string;
}

// KPI Stats card component for reusability
const KpiStatsCard: React.FC<KpiStatsCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  trend = false, 
  trendValue = "", 
  action, 
  bgColor = "transparent", 
  color 
}) => (
  <Card sx={{ 
    height: '100%',
    bgcolor: bgColor,
    borderLeft: `3px solid ${color}`,
  }}>
    <CardContent sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', mb: 1.5 }}>
        <Avatar 
          sx={{ 
            bgcolor: alpha(color, 0.15),
            color: color,
            width: 32,
            height: 32,
            mr: 1.5
          }}
        >
          {icon}
        </Avatar>
        <Typography variant="subtitle1" sx={{ pt: 0.5 }}>{title}</Typography>
      </Box>
      
      <Typography variant="h3" fontWeight="500" color={color} sx={{ my: 1.5 }}>
        {value}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        {subtitle}
      </Typography>
      
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} />
          <Typography variant="caption" color="success.main">
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
