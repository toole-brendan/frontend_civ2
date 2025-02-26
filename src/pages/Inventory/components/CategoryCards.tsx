import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  useTheme,
  alpha,
  Chip,
  IconButton
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MemoryIcon from '@mui/icons-material/Memory';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import UsbIcon from '@mui/icons-material/Usb';
import SdCardIcon from '@mui/icons-material/SdCard';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import TabletIcon from '@mui/icons-material/Tablet';
import { InventoryCategory } from '../types';

interface CategoryCardsProps {
  categories: InventoryCategory[];
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({
  categories,
  onCategoryClick
}) => {
  const theme = useTheme();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'microchip':
        return <MemoryIcon fontSize="large" />;
      case 'capacitor':
        return <SettingsInputComponentIcon fontSize="large" />;
      case 'connector':
        return <UsbIcon fontSize="large" />;
      case 'memory':
        return <SdCardIcon fontSize="large" />;
      case 'power':
        return <BatteryChargingFullIcon fontSize="large" />;
      case 'display':
        return <TabletIcon fontSize="large" />;
      default:
        return <MemoryIcon fontSize="large" />;
    }
  };

  const getHealthColor = (health: 'good' | 'warning' | 'critical') => {
    switch (health) {
      case 'good':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'critical':
        return theme.palette.error.main;
      default:
        return theme.palette.success.main;
    }
  };

  return (
    <Box sx={{ mb: 4, overflowX: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Inventory Categories
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, pb: 1 }}>
        {categories.map((category) => (
          <Card
            key={category.id}
            sx={{
              minWidth: 220,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              },
              borderLeft: `4px solid ${getHealthColor(category.stockHealth)}`
            }}
            onClick={() => onCategoryClick(category.id)}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mb: 1
                  }}
                >
                  {getCategoryIcon(category.icon)}
                </Box>
                <IconButton size="small">
                  <ArrowForwardIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {category.skuCount.toLocaleString()} SKUs
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  ${category.totalValue.toLocaleString()}
                </Typography>
                {category.lowStockCount > 0 && (
                  <Chip
                    label={`${category.lowStockCount} Low`}
                    size="small"
                    color={category.stockHealth === 'critical' ? 'error' : 'warning'}
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryCards; 