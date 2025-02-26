import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  useTheme,
  alpha,
  Tooltip
} from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { InventoryMetrics } from '../types';

interface InventoryMetricsStripProps {
  metrics: InventoryMetrics;
}

export const InventoryMetricsStrip: React.FC<InventoryMetricsStripProps> = ({
  metrics
}) => {
  const theme = useTheme();

  const metricItems = [
    {
      icon: <AutorenewIcon />,
      label: 'Inventory Turnover Rate',
      value: `${metrics.turnoverRate}×`,
      tooltip: 'Average turnover rate in the last 90 days',
      color: theme.palette.primary.main
    },
    {
      icon: <AccessTimeIcon />,
      label: 'Average Days on Hand',
      value: `${metrics.averageDaysOnHand} days`,
      tooltip: 'Average time inventory items remain in stock',
      color: theme.palette.info.main
    },
    {
      icon: <InventoryIcon />,
      label: 'Slow-Moving Items',
      value: `${metrics.slowMovingItems} SKUs`,
      tooltip: 'Items with no movement for over 90 days',
      color: theme.palette.warning.main
    },
    {
      icon: <AttachMoneyIcon />,
      label: 'Excess Inventory Value',
      value: `$${metrics.excessInventoryValue.toLocaleString()}`,
      tooltip: 'Value of inventory exceeding 180 days supply',
      color: theme.palette.error.main
    },
    {
      icon: <ErrorOutlineIcon />,
      label: 'Stockout Events',
      value: `${metrics.stockoutEvents}`,
      tooltip: 'Number of stockout events in the last 30 days',
      color: theme.palette.error.dark
    }
  ];

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: 4, 
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.7)
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {metricItems.map((item, index) => (
          <React.Fragment key={index}>
            <Tooltip title={item.tooltip} arrow placement="top">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 2 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: item.color,
                    mb: 1
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, textAlign: 'center' }}>
                  {item.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: item.color }}>
                  {item.value}
                </Typography>
              </Box>
            </Tooltip>
            {index < metricItems.length - 1 && (
              <Divider orientation="vertical" flexItem />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Paper>
  );
};

export default InventoryMetricsStrip; 