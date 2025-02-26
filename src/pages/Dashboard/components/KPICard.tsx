import React from 'react';
import { Box, Card, CardContent, Typography, useTheme, alpha, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InventoryIcon from '@mui/icons-material/Inventory';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import WarningIcon from '@mui/icons-material/Warning';
import SavingsIcon from '@mui/icons-material/Savings';
import { KPICardData } from '../mockData';
import { Sparkline } from './Sparkline';

interface KPICardProps {
  data: KPICardData;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'inventory':
      return <InventoryIcon />;
    case 'transfer':
      return <SwapHorizIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'savings':
      return <SavingsIcon />;
    default:
      return <InventoryIcon />;
  }
};

const getColor = (colorName: string, theme: any) => {
  switch (colorName) {
    case 'blue':
      return theme.palette.primary.main;
    case 'indigo':
      return theme.palette.indigo?.main || '#3f51b5';
    case 'orange':
      return theme.palette.warning.main;
    case 'green':
      return theme.palette.success.main;
    default:
      return theme.palette.primary.main;
  }
};

export const KPICard: React.FC<KPICardProps> = ({ data }) => {
  const theme = useTheme();
  const color = getColor(data.color, theme);

  return (
    <Card 
      sx={{ 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        borderLeft: `4px solid ${color}`,
        boxShadow: 2
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              {data.title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {data.value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {data.trend.isPositive ? (
                <TrendingUpIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
              ) : (
                <TrendingDownIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
              )}
              <Typography 
                variant="body2" 
                color={data.trend.isPositive ? 'success.main' : 'error.main'}
              >
                {data.trend.isPositive ? '+' : '-'}{Math.abs(data.trend.value)}% {data.trend.text}
              </Typography>
            </Box>
          </Box>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: alpha(color, 0.1),
              borderRadius: '50%',
              p: 1.5,
              color: color
            }}
          >
            {getIcon(data.icon)}
          </Box>
        </Box>

        {data.sparklineData && (
          <Box sx={{ mt: 2, height: 40 }}>
            <Sparkline 
              data={data.sparklineData} 
              color={color}
              height={40}
            />
          </Box>
        )}

        {data.secondaryInfo && (
          <Box sx={{ display: 'flex', mt: 2, flexWrap: 'wrap', gap: 1 }}>
            {data.secondaryInfo.map((info, index) => (
              <Chip
                key={index}
                size="small"
                label={`${info.label}: ${info.value}`}
                sx={{ 
                  backgroundColor: alpha(color, 0.1),
                  color: color,
                  fontWeight: 'medium'
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard; 