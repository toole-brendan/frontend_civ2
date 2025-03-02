import React from 'react';
import { 
  Box, 
  Button,
  Typography,
  alpha
} from '@mui/material';
import { KpiStatsCard, ProgressBar } from '@/components/common';
import { categoryConfigs, CategoryItem } from '../data';
import { 
  InventorySection,
  CategoryIcon
} from '@/components/ui/styled/inventory';
import { 
  OutlinedCard,
  StyledCardToolbar,
  CardHeaderContainer,
  StyledCardTitle,
  StyledCardSubtitle
} from '@/components/ui/styled/cards';
import { hoverEffectMixin } from '@/styles/mixins';

// Icons
import TuneIcon from '@mui/icons-material/Tune';
import MemoryIcon from '@mui/icons-material/Memory';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import StorageIcon from '@mui/icons-material/Storage';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

/**
 * Component that displays the category breakdown of inventory
 * Refactored to use styled components for better maintainability
 */
const CategoryList: React.FC = () => {
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
  
  // Create full category items with icons
  const categories: CategoryItem[] = categoryConfigs.map(config => ({
    ...config,
    icon: getCategoryIcon(config.name)
  }));
  
  // Get status color based on health percentage
  const getStatusColor = (health: number): 'success' | 'warning' | 'error' => {
    if (health >= 90) return 'success';
    if (health >= 80) return 'warning';
    return 'error';
  };
  
  return (
    <InventorySection>
      <OutlinedCard>
        <StyledCardToolbar>
          <CardHeaderContainer>
            <StyledCardTitle variant="h6">
              Component Categories
            </StyledCardTitle>
            <StyledCardSubtitle variant="body2">
              Inventory breakdown by component type
            </StyledCardSubtitle>
          </CardHeaderContainer>
          <Button 
            size="small" 
            variant="outlined" 
            startIcon={<TuneIcon fontSize="small" />}
          >
            View All
          </Button>
        </StyledCardToolbar>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          overflowX: 'auto', 
          py: 3, 
          px: 3,
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: 4,
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2)
          }
        }}>
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
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mb: 1, 
                      mt: 1 
                    }}>
                      <Typography variant="caption">
                        ${(category.value / 1000).toLocaleString()}K value
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color={`${getStatusColor(category.health)}.main`}
                        fontWeight={500}
                      >
                        {category.health}% healthy
                      </Typography>
                    </Box>
                    <ProgressBar
                      value={category.health}
                      color={getStatusColor(category.health)}
                    />
                  </Box>
                }
                icon={category.icon}
                color={`${getStatusColor(category.health)}.main`}
                variant="outlined"
              />
            </Box>
          ))}
        </Box>
      </OutlinedCard>
    </InventorySection>
  );
};

export default CategoryList;
