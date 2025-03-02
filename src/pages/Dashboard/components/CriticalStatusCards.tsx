import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  LinearProgress, 
  Divider,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
  Paper,
  Badge
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InventoryOutlinedIcon color="error" />
          <Typography variant="h6" component="h3">Inventory Alerts</Typography>
        </Box>
        <Chip 
          icon={<WarningAmberIcon fontSize="small" />}
          label="3 critical" 
          size="small" 
          sx={{ 
            bgcolor: 'rgba(244, 67, 54, 0.1)',
            color: 'error.main',
            fontWeight: 600,
            borderRadius: 4,
            '& .MuiChip-icon': {
              color: 'error.main'
            }
          }} 
        />
      </Box>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        3 components below safety stock
      </Typography>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 16, color: 'error.main' }} />
        $142,000 in orders at risk
      </Typography>
      
      <Box sx={{ mb: 3 }}>
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
          <Paper 
            key={index}
            elevation={0}
            sx={{ 
              p: 1.5, 
              mb: 1.5, 
              bgcolor: theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.paper, 0.4) 
                : alpha(theme.palette.background.paper, 0.7),
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.divider, 0.1)
                : alpha(theme.palette.divider, 0.5),
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateX(4px)',
                bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.background.paper, 0.5) 
                  : alpha(theme.palette.background.paper, 0.9),
                borderColor: theme.palette.error.main,
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>
              <Tooltip title="View item details">
                <IconButton size="small">
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>{item.stock}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>{item.location}</Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={item.percentage} 
              sx={{ 
                mt: 1.5, 
                height: 6,
                borderRadius: 3,
                bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.error.main, 0.1) 
                  : alpha(theme.palette.error.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'error.main',
                  borderRadius: 3
                }
              }} 
            />
          </Paper>
        ))}
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        endIcon={<ArrowForwardIcon />}
        sx={{ 
          textTransform: 'none',
          borderRadius: 2,
          fontWeight: 600,
          py: 1,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
            : '0 4px 12px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
              ? '0 6px 16px rgba(0, 0, 0, 0.4)'
              : '0 6px 16px rgba(25, 118, 210, 0.4)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.3s ease'
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalShippingOutlinedIcon color="warning" />
          <Typography variant="h6" component="h3">Shipment Alerts</Typography>
        </Box>
        <Chip 
          icon={<WarningAmberIcon fontSize="small" />}
          label="2 delayed" 
          size="small" 
          sx={{ 
            bgcolor: 'rgba(255, 152, 0, 0.1)',
            color: 'warning.main',
            fontWeight: 600,
            borderRadius: 4,
            '& .MuiChip-icon': {
              color: 'warning.main'
            }
          }} 
        />
      </Box>
      
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        2 shipments delayed in customs
      </Typography>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 16, color: 'warning.main' }} />
        MediTech order fulfillment at risk (due Mar 15)
      </Typography>
      
      <Box sx={{ mb: 3 }}>
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
          <Paper 
            key={index}
            elevation={0}
            sx={{ 
              p: 1.5, 
              mb: 1.5, 
              bgcolor: theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.paper, 0.4) 
                : alpha(theme.palette.background.paper, 0.7),
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark'
                ? alpha(theme.palette.divider, 0.1)
                : alpha(theme.palette.divider, 0.5),
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateX(4px)',
                bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.background.paper, 0.5) 
                  : alpha(theme.palette.background.paper, 0.9),
                borderColor: theme.palette.warning.main,
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {shipment.id}
              </Typography>
              <Tooltip title="View shipment details">
                <IconButton size="small">
                  <MoreHorizIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.8 }}>{shipment.route}</Typography>
            
            <Typography variant="body2" color="warning.main" sx={{ mt: 0.5, fontWeight: 500 }}>
              {shipment.status}
            </Typography>
            
            <Box 
              sx={{ 
                mt: 1.5, 
                height: 6,
                bgcolor: theme.palette.mode === 'dark' 
                  ? alpha(theme.palette.warning.main, 0.1)
                  : alpha(theme.palette.warning.main, 0.1),
                borderRadius: 3,
                position: 'relative'
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute',
                  width: 12,
                  height: 12,
                  bgcolor: 'warning.main',
                  borderRadius: '50%',
                  top: -3,
                  left: `${shipment.progress}%`,
                  transform: 'translateX(-50%)',
                  border: '2px solid',
                  borderColor: theme.palette.background.paper,
                  boxShadow: '0 0 0 2px rgba(255, 152, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(-50%) scale(1.2)',
                    boxShadow: '0 0 0 3px rgba(255, 152, 0, 0.5)'
                  }
                }}
              />
            </Box>
          </Paper>
        ))}
      </Box>
      
      <Button 
        variant="contained" 
        color="warning" 
        fullWidth
        endIcon={<ArrowForwardIcon />}
        sx={{ 
          textTransform: 'none',
          borderRadius: 2,
          fontWeight: 600,
          py: 1,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 12px rgba(0, 0, 0, 0.3)'
            : '0 4px 12px rgba(255, 152, 0, 0.3)',
          '&:hover': {
            boxShadow: theme.palette.mode === 'dark'
              ? '0 6px 16px rgba(0, 0, 0, 0.4)'
              : '0 6px 16px rgba(255, 152, 0, 0.4)',
            transform: 'translateY(-2px)'
          },
          transition: 'all 0.3s ease'
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