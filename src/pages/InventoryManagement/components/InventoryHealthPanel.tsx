import React from 'react';
import {
  Box,
  Typography,
  Grid,
  alpha,
  useTheme
} from '@mui/material';
import { DashboardCard, KpiStatsCard, ProgressBar } from '@/components/common';
import { inventoryHealth, inventoryMetrics } from '../data';

// Icons
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';

/**
 * Component that displays inventory health metrics and KPIs
 */
const InventoryHealthPanel: React.FC = () => {
  const theme = useTheme();
  
  return (
    <DashboardCard
      title="Inventory Health Overview"
      subtitle="Stock levels and key performance metrics"
      contentPadding={2}
      variant="filled"
      content={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ mb: 1 }}>
              <ProgressBar
                label={`Healthy Stock: ${inventoryHealth.healthy.count.toLocaleString()} SKUs (${inventoryHealth.healthy.percent}%)`}
                sublabel={`$${inventoryHealth.healthy.value.toLocaleString()}`}
                value={inventoryHealth.healthy.percent}
                color="success"
              />
            </Box>
            
            <Box sx={{ mb: 1 }}>
              <ProgressBar
                label={`Low Stock: ${inventoryHealth.low.count.toLocaleString()} SKUs (${inventoryHealth.low.percent}%)`}
                sublabel={`$${inventoryHealth.low.value.toLocaleString()}`}
                value={inventoryHealth.low.percent}
                color="warning"
              />
            </Box>
            
            <Box>
              <ProgressBar
                label={`Critical Stock: ${inventoryHealth.critical.count.toLocaleString()} SKUs (${inventoryHealth.critical.percent}%)`}
                sublabel={`$${inventoryHealth.critical.value.toLocaleString()}`}
                value={inventoryHealth.critical.percent}
                color="error"
              />
            </Box>
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              {inventoryMetrics.map((metric, index) => {
                // Determine icon based on metric type
                let icon;
                switch(index) {
                  case 0:
                    icon = <TrendingUpIcon fontSize="small" />;
                    break;
                  case 1:
                    icon = <ShoppingCartIcon fontSize="small" />;
                    break;
                  case 2:
                    icon = <LocalShippingIcon fontSize="small" />;
                    break;
                  case 3:
                  default:
                    icon = <WarehouseIcon fontSize="small" />;
                }
                
                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <KpiStatsCard
                      title={metric.label}
                      value={metric.value}
                      subtitle={metric.period || ''}
                      icon={icon}
                      color={theme.palette.primary.main}
                      elevation={0}
                      variant="outlined"
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      }
      footer={
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Typography variant="caption">
            <Box component="span" sx={{ color: theme.palette.success.main, fontWeight: 'medium' }}>87%</Box> of inventory at healthy levels
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Data source: ERP System
          </Typography>
        </Box>
      }
    />
  );
};

export default InventoryHealthPanel;
