import React from 'react';
import { Grid, Typography } from '@mui/material';
import { KpiStatsCard, ProgressBar } from '@/components/common';
import { inventoryHealth, inventoryMetrics } from '../data';
import {
  HealthPanelCard,
  HealthMetricContainer,
  StatsGrid,
  HealthPanelFooter,
  HighlightedStat,
  DataSourceCaption
} from '@/components/ui/styled/inventory';

import {
  StyledCardToolbar,
  StyledCardContent,
  StyledCardTitle,
  StyledCardSubtitle,
  CardHeaderContainer,
} from '@/components/ui/styled/cards';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';

/**
 * Component that displays inventory health metrics and KPIs
 * Refactored to use styled components for better maintainability
 */
const InventoryHealthPanel: React.FC = () => {
  // Get icons for metrics
  const getMetricIcon = (index: number) => {
    switch(index) {
      case 0: return <TrendingUpIcon fontSize="small" />;
      case 1: return <ShoppingCartIcon fontSize="small" />;
      case 2: return <LocalShippingIcon fontSize="small" />;
      case 3:
      default: return <WarehouseIcon fontSize="small" />;
    }
  };
  
  return (
    <HealthPanelCard>
      <StyledCardToolbar>
        <CardHeaderContainer>
          <StyledCardTitle variant="h6">
            Inventory Health Overview
          </StyledCardTitle>
          <StyledCardSubtitle variant="body2">
            Stock levels and key performance metrics
          </StyledCardSubtitle>
        </CardHeaderContainer>
      </StyledCardToolbar>
      
      <StyledCardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <HealthMetricContainer>
              <ProgressBar
                label={`Healthy Stock: ${inventoryHealth.healthy.count.toLocaleString()} SKUs (${inventoryHealth.healthy.percent}%)`}
                sublabel={`$${inventoryHealth.healthy.value.toLocaleString()}`}
                value={inventoryHealth.healthy.percent}
                color="success"
              />
            </HealthMetricContainer>
            
            <HealthMetricContainer>
              <ProgressBar
                label={`Low Stock: ${inventoryHealth.low.count.toLocaleString()} SKUs (${inventoryHealth.low.percent}%)`}
                sublabel={`$${inventoryHealth.low.value.toLocaleString()}`}
                value={inventoryHealth.low.percent}
                color="warning"
              />
            </HealthMetricContainer>
            
            <HealthMetricContainer>
              <ProgressBar
                label={`Critical Stock: ${inventoryHealth.critical.count.toLocaleString()} SKUs (${inventoryHealth.critical.percent}%)`}
                sublabel={`$${inventoryHealth.critical.value.toLocaleString()}`}
                value={inventoryHealth.critical.percent}
                color="error"
              />
            </HealthMetricContainer>
          </Grid>
          
          <StatsGrid container spacing={2} item xs={12}>
            {inventoryMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <KpiStatsCard
                  title={metric.label}
                  value={metric.value}
                  subtitle={metric.period || ''}
                  icon={getMetricIcon(index)}
                  color="primary.main"
                  elevation={0}
                  variant="outlined"
                />
              </Grid>
            ))}
          </StatsGrid>
        </Grid>
      </StyledCardContent>
      
      <HealthPanelFooter>
        <Typography variant="caption">
          <HighlightedStat>87%</HighlightedStat> of inventory at healthy levels
        </Typography>
        <DataSourceCaption variant="caption">
          Data source: ERP System
        </DataSourceCaption>
      </HealthPanelFooter>
    </HealthPanelCard>
  );
};

export default InventoryHealthPanel;
