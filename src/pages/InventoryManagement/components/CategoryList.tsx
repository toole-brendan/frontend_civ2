import React from 'react';
import { 
  Box, 
  Button, 
  alpha, 
  useTheme 
} from '@mui/material';
import { CardHeader, KpiStatsCard, ProgressBar } from '@/components/common';
import { categoryConfigs, CategoryItem } from '../data';

// Icons
import TuneIcon from '@mui/icons-material/Tune';
import MemoryIcon from '@mui/icons-material/Memory';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import StorageIcon from '@mui/icons-material/Storage';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

/**
 * Maps category names to their appropriate icons
 */
const getCategoryIcon = (categoryName: string): JSX.Element => {
  switch(categoryName) {
    case 'Microcontrollers':
      return <MemoryIcon fontSize="small" />;
    case 'Passive Components':
      return <ElectricalServicesIcon fontSize="small" />;
    case 'Connectors':
      return <SettingsInputComponentIcon fontSize="small" />;
    case 'Memory ICs':
      return <StorageIcon fontSize="small" />;
    case 'Power Components':
      return <BatteryChargingFullIcon fontSize="small" />;
    case 'Display Modules':
      return <DeveloperBoardIcon fontSize="small" />;
    default:
      return <MemoryIcon fontSize="small" />;
  }
};

/**
 * Component that displays the category breakdown of inventory
 */
const CategoryList: React.FC = () => {
  const theme = useTheme();
  
  // Create full category items with icons
  const categories: CategoryItem[] = categoryConfigs.map(config => ({
    ...config,
    icon: getCategoryIcon(config.name)
  }));
  
  // Get status color based on health percentage
  const getStatusColor = (health: number) => {
    if (health >= 90) return theme.palette.success.main;
    if (health >= 80) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <CardHeader 
        title="Component Categories" 
        subtitle="Inventory breakdown by component type"
        action={
          <Button size="small" variant="outlined" startIcon={<TuneIcon fontSize="small" />}>
            View All
          </Button>
        }
      />
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
        {categories.map((category, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 250,
              flexShrink: 0,
            }}
          >
            <KpiStatsCard
              title={category.name}
              value={`${category.count.toLocaleString()} SKUs`}
              subtitle={
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, mt: 1 }}>
                    <span>${(category.value / 1000).toLocaleString()}K value</span>
                    <span style={{ 
                      color: getStatusColor(category.health),
                      fontWeight: 500
                    }}>
                      {category.health}% healthy
                    </span>
                  </Box>
                  <ProgressBar
                    value={category.health}
                    color={
                      category.health >= 90 ? 'success' : 
                      category.health >= 80 ? 'warning' : 'error'
                    }
                  />
                </Box>
              }
              icon={category.icon}
              color={getStatusColor(category.health)}
              variant="outlined"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryList;
