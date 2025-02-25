import React from 'react';
import { Box, Grid, Typography, styled, Paper } from '@mui/material';
import { 
  Inventory as InventoryIcon,
  CheckCircle as CheckCircleIcon,
  Build as BuildIcon,
  LocalShipping as ShippingIcon,
  Equalizer as MetricsIcon 
} from '@mui/icons-material';

interface MetricCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: 'primary' | 'success' | 'warning' | 'error';
}

const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

const MetricCard: React.FC<MetricCardProps> = ({ icon, value, label, color }) => (
  <DashboardCard>
    <div className="card-content">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: `${color}.light`,
            color: `${color}.main`,
          }}
        >
          {React.cloneElement(icon as React.ReactElement, { 
            sx: { fontSize: 24 } 
          })}
        </Box>
        <Box>
          <Typography variant="h4" color={`${color}.main`}>
            {value.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </Box>
    </div>
  </DashboardCard>
);

export interface KeyMetricsCardsProps {
  totalItems: number;
  serviceableItems: number;
  maintenanceNeeded: number;
  pendingReceipts: number;
}

export const KeyMetricsCards: React.FC<KeyMetricsCardsProps> = ({ 
  totalItems,
  serviceableItems,
  maintenanceNeeded,
  pendingReceipts
}) => {
  const metrics = [
    {
      icon: <InventoryIcon />,
      value: totalItems,
      label: 'Total Inventory Items',
      color: 'primary' as const,
    },
    {
      icon: <CheckCircleIcon />,
      value: serviceableItems,
      label: 'Available Items',
      color: 'success' as const,
    },
    {
      icon: <BuildIcon />,
      value: maintenanceNeeded,
      label: 'Items Needing Attention',
      color: 'warning' as const,
    },
    {
      icon: <ShippingIcon />,
      value: pendingReceipts,
      label: 'Pending Receipts',
      color: 'primary' as const,
    }
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
}; 