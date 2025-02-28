import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  LinearProgress, 
  Divider,
  useTheme
} from '@mui/material';
import { Grid } from '@/components/common/Grid';
import { DashboardCard } from '@/components/common/DashboardCard';

// Individual Card Components
const InventoryRiskCard: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h6" component="h3">Inventory Alerts</Typography>
        <Chip 
          label="3 critical" 
          size="small" 
          sx={{ 
            bgcolor: 'rgba(244, 67, 54, 0.1)',
            color: 'error.main',
            fontWeight: 500,
            borderRadius: 1
          }} 
        />
      </Box>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
        3 components below safety stock
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        $142,000 in orders at risk
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        {[
          { 
            name: 'RF Amplifier ICs', 
            stock: '112/500 units (22%)', 
            location: 'San Jose',
            percentage: 22 
          },
          { 
            name: 'MX9250 Memory Controllers', 
            stock: '380/1200 units (32%)', 
            location: 'Austin',
            percentage: 32 
          },
          { 
            name: 'USB-C Connectors', 
            stock: '520/2000 units (26%)', 
            location: 'Guadalajara',
            percentage: 26 
          }
        ].map((item, index) => (
          <Box 
            key={index}
            sx={{ 
              p: 1, 
              mb: 1, 
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
              borderRadius: 1
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {item.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">{item.stock}</Typography>
              <Typography variant="body2">{item.location}</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={item.percentage} 
              sx={{ 
                mt: 1, 
                height: 4,
                borderRadius: 2,
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.1)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'error.main'
                }
              }} 
            />
          </Box>
        ))}
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        sx={{ 
          textTransform: 'none',
          borderRadius: 1
        }}
      >
        View Critical Inventory
      </Button>
    </Box>
  );
};

const ShipmentStatusCard: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h6" component="h3">Shipment Alerts</Typography>
        <Chip 
          label="2 delayed" 
          size="small" 
          sx={{ 
            bgcolor: 'rgba(255, 152, 0, 0.1)',
            color: 'warning.main',
            fontWeight: 500,
            borderRadius: 1
          }} 
        />
      </Box>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
        2 shipments delayed in customs
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        MediTech order fulfillment at risk (due Mar 15)
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        {[
          { 
            id: 'TECI-9542', 
            route: 'Taiwan Semiconductor → Austin', 
            status: 'In Customs - 3 days',
            progress: 75 
          },
          { 
            id: 'TECI-9538', 
            route: 'Shenzhen Electronics → Guadalajara', 
            status: 'Delayed - Weather',
            progress: 45 
          }
        ].map((shipment, index) => (
          <Box 
            key={index}
            sx={{ 
              p: 1, 
              mb: 1, 
              bgcolor: theme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
              borderRadius: 1
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {shipment.id}
            </Typography>
            <Typography variant="body2">{shipment.route}</Typography>
            <Typography variant="body2" color="warning.main">
              {shipment.status}
            </Typography>
            <Box 
              sx={{ 
                mt: 1, 
                height: 4,
                bgcolor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                position: 'relative'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  width: 8,
                  height: 8,
                  bgcolor: 'warning.main',
                  borderRadius: '50%',
                  top: -2,
                  left: `${shipment.progress}%`,
                  transform: 'translateX(-50%)'
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        sx={{ 
          textTransform: 'none',
          borderRadius: 1
        }}
      >
        View Shipment Details
      </Button>
    </Box>
  );
};

const FinancialAlertCard: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2 
      }}>
        <Typography variant="h6" component="h3">Payment Alerts</Typography>
        <Chip 
          label="1 urgent" 
          size="small" 
          sx={{ 
            bgcolor: 'rgba(244, 67, 54, 0.1)',
            color: 'error.main',
            fontWeight: 500,
            borderRadius: 1
          }} 
        />
      </Box>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
        $78,500 payment due within 48 hours
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Future shipments contingent on payment
      </Typography>
      
      <Box 
        sx={{ 
          p: 1, 
          mb: 2, 
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.02)',
          borderRadius: 1
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Invoice #TCB-2842: Shenzhen Electronics Ltd
        </Typography>
        <Typography variant="body2">
          Due Date: February 27, 2025
        </Typography>
        <Typography variant="body2" color="success.main">
          Shell Token Savings Opportunity: $2,355 (3.0%)
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 1,
            p: 1,
            bgcolor: 'rgba(244, 67, 54, 0.1)',
            borderRadius: 1
          }}
        >
          <Typography 
            variant="h6" 
            color="error.main"
            sx={{ fontWeight: 500 }}
          >
            48:00:00
          </Typography>
          <Typography variant="caption">
            remaining
          </Typography>
        </Box>
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        sx={{ 
          textTransform: 'none',
          borderRadius: 1
        }}
      >
        Approve Payment
      </Button>
    </Box>
  );
};

// Define the props interface for CriticalStatusCards
interface CriticalStatusCardsProps {
  type?: 'urgent' | 'warning' | 'caution';
}

const CriticalStatusCards: React.FC<CriticalStatusCardsProps> = ({ type }) => {
  // If no type is specified, render all cards
  if (!type) {
    return (
      <>
        <Grid item xs={12} md={4}>
          <DashboardCard 
            title="Inventory Alerts"
            sx={{ 
              height: '100%',
              borderLeft: '4px solid',
              borderLeftColor: 'error.main'
            }}
          >
            <InventoryRiskCard />
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard 
            title="Shipment Status"
            sx={{ 
              height: '100%',
              borderLeft: '4px solid',
              borderLeftColor: 'warning.main'
            }}
          >
            <ShipmentStatusCard />
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard 
            title="Financial Alerts"
            sx={{ 
              height: '100%',
              borderLeft: '4px solid',
              borderLeftColor: 'info.main'
            }}
          >
            <FinancialAlertCard />
          </DashboardCard>
        </Grid>
      </>
    );
  }

  // Render a specific card based on the type prop
  const cardTitles = {
    urgent: 'Inventory Alerts',
    warning: 'Shipment Status',
    caution: 'Financial Alerts'
  };

  return (
    <DashboardCard 
      title={cardTitles[type]}
      sx={{ 
        height: '100%',
        borderLeft: '4px solid',
        borderLeftColor: type === 'urgent' ? 'error.main' : 
                         type === 'warning' ? 'warning.main' : 'info.main'
      }}
    >
      {type === 'urgent' && <InventoryRiskCard />}
      {type === 'warning' && <ShipmentStatusCard />}
      {type === 'caution' && <FinancialAlertCard />}
    </DashboardCard>
  );
};

export default CriticalStatusCards; 