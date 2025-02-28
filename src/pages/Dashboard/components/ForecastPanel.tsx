import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import ReceiptIcon from '@mui/icons-material/Receipt';

const ForecastPanel: React.FC = () => {
  const theme = useTheme();
  
  // Financial projections data
  const financialProjections = {
    revenue: { min: 520000, max: 550000 },
    expenses: { min: 425000, max: 450000 },
    cashPositionChange: { min: 75000, max: 100000 },
    shellTokenSavings: 6240
  };
  
  // Supply chain projections data
  const supplyChainProjections = {
    incomingShipments: { count: 12, value: 625000 },
    outgoingShipments: { count: 18, value: 842000 },
    inventoryTurns: 4.3,
    potentialStockIssues: 5
  };
  
  // Timeline events data
  const timelineEvents = [
    {
      id: 1,
      date: 'Feb 27',
      title: 'Shenzhen Electronics payment due',
      description: 'Invoice #TCB-2842 for $78,500',
      type: 'payment',
      urgent: true
    },
    {
      id: 2,
      date: 'Mar 2',
      title: 'Korea Chip Manufacturing shipment arrival',
      description: 'TECI-9550 with 8,000 microcontrollers',
      type: 'shipment',
      urgent: false
    },
    {
      id: 3,
      date: 'Mar 8',
      title: 'Robotics Solutions order fulfillment deadline',
      description: 'Order #RS-2025-0342 for $124,500',
      type: 'order',
      urgent: true
    },
    {
      id: 4,
      date: 'Mar 12',
      title: 'Quarterly inventory audit',
      description: 'All warehouses, scheduled 9 AM - 5 PM',
      type: 'inventory',
      urgent: false
    },
    {
      id: 5,
      date: 'Mar 15',
      title: 'MediTech order deadline',
      description: 'Order #MT-2025-0128 for $185,200',
      type: 'order',
      urgent: true
    }
  ];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format range
  const formatRange = (min: number, max: number) => {
    return `${formatCurrency(min)} - ${formatCurrency(max)}`;
  };
  
  // Get icon for timeline event
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ReceiptIcon />;
      case 'shipment':
        return <LocalShippingIcon />;
      case 'order':
        return <InventoryIcon />;
      case 'inventory':
        return <WarningIcon />;
      default:
        return <WarningIcon />;
    }
  };
  
  // Get color for timeline event
  const getTimelineColor = (type: string, urgent: boolean) => {
    if (urgent) return theme.palette.error.main;
    
    switch (type) {
      case 'payment':
        return theme.palette.error.main;
      case 'shipment':
        return theme.palette.info.main;
      case 'order':
        return theme.palette.success.main;
      case 'inventory':
        return theme.palette.warning.main;
      default:
        return theme.palette.primary.main;
    }
  };
  
  return (
    <Box>
      <Grid container spacing={3}>
        {/* Financial Projections */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2,
              height: '100%',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AccountBalanceWalletIcon 
                color="primary" 
                sx={{ mr: 1 }} 
              />
              <Typography variant="subtitle1">
                Financial Projections
              </Typography>
            </Box>
            
            <List dense disablePadding>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Expected Revenue" 
                  secondary={formatRange(financialProjections.revenue.min, financialProjections.revenue.max)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    color: 'success.main',
                    fontWeight: 500
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Projected Expenses" 
                  secondary={formatRange(financialProjections.expenses.min, financialProjections.expenses.max)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    color: 'error.main',
                    fontWeight: 500
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Cash Position Change" 
                  secondary={formatRange(financialProjections.cashPositionChange.min, financialProjections.cashPositionChange.max)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    color: 'success.main',
                    fontWeight: 500
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Shell Token Savings Forecast" 
                  secondary={formatCurrency(financialProjections.shellTokenSavings)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    color: 'secondary.main',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Supply Chain Projections */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2,
              height: '100%',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalShippingIcon 
                color="info" 
                sx={{ mr: 1 }} 
              />
              <Typography variant="subtitle1">
                Supply Chain Projections
              </Typography>
            </Box>
            
            <List dense disablePadding>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Incoming Shipments" 
                  secondary={`${supplyChainProjections.incomingShipments.count} scheduled (${formatCurrency(supplyChainProjections.incomingShipments.value)})`}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    fontWeight: 500
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Outgoing Shipments" 
                  secondary={`${supplyChainProjections.outgoingShipments.count} scheduled (${formatCurrency(supplyChainProjections.outgoingShipments.value)})`}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    fontWeight: 500
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Inventory Turns Projection" 
                  secondary={`${supplyChainProjections.inventoryTurns}×`}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    fontWeight: 500
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 1 }}>
                <ListItemText 
                  primary="Potential Stock Issues" 
                  secondary={`${supplyChainProjections.potentialStockIssues} components identified`}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    color: 'warning.main',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Timeline */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              Key Upcoming Events
            </Typography>
            
            <Timeline position="alternate" sx={{ p: 0, m: 0 }}>
              {timelineEvents.map((event) => (
                <TimelineItem key={event.id}>
                  <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {event.date}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot 
                      sx={{ 
                        bgcolor: getTimelineColor(event.type, event.urgent),
                        boxShadow: 'none'
                      }}
                    >
                      {getTimelineIcon(event.type)}
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography 
                      variant="subtitle2" 
                      component="span"
                      sx={{ fontWeight: 500 }}
                    >
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Paper>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ 
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          View Detailed Forecast →
        </Typography>
      </Box>
    </Box>
  );
};

export default ForecastPanel; 