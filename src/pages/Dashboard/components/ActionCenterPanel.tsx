import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Button,
  Divider,
  ButtonGroup,
  useTheme
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ActionCenterPanel: React.FC = () => {
  const theme = useTheme();
  
  // Priority actions data
  const priorityActions = [
    {
      id: 1,
      title: 'Approve payment to Shenzhen Electronics',
      description: '$78,500 due in 48 hours | Shell savings: $2,355',
      icon: <ReceiptIcon />,
      urgency: 'high',
      primaryAction: 'Approve',
      secondaryAction: 'Review Details',
      type: 'payment'
    },
    {
      id: 2,
      title: 'Release QC hold on Taiwan Semiconductor shipment',
      description: 'TECI-9542 | 5,000 Microcontrollers awaiting verification',
      icon: <LocalShippingIcon />,
      urgency: 'medium',
      primaryAction: 'Approve',
      secondaryAction: 'View QC Report',
      type: 'shipment'
    },
    {
      id: 3,
      title: 'Resolve customs documentation for TECI-9542',
      description: 'Commercial invoice discrepancy | Broker: Global Logistics',
      icon: <ErrorIcon />,
      urgency: 'medium',
      primaryAction: 'View Documentation',
      secondaryAction: 'Contact Broker',
      type: 'customs'
    },
    {
      id: 4,
      title: 'Review low stock RF Amplifier ICs',
      description: '112/500 units | 3 customer orders affected',
      icon: <InventoryIcon />,
      urgency: 'high',
      primaryAction: 'Order More',
      secondaryAction: 'Transfer Stock',
      type: 'inventory'
    },
    {
      id: 5,
      title: 'Approve purchase order for MX9250 Memory Controllers',
      description: '$42,800 | Taiwan Semiconductor | 1,000 units',
      icon: <ReceiptIcon />,
      urgency: 'low',
      primaryAction: 'Approve PO',
      secondaryAction: 'Modify Order',
      type: 'purchase'
    }
  ];
  
  // Get urgency color
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };
  
  // Get urgency label
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'Urgent';
      case 'medium':
        return 'Important';
      case 'low':
        return 'Normal';
      default:
        return 'Normal';
    }
  };
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Action Required (5)
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label="All" 
            size="small" 
            color="primary" 
            variant="filled"
            sx={{ borderRadius: 1 }}
          />
          <Chip 
            label="Urgent" 
            size="small" 
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
          <Chip 
            label="Payments" 
            size="small" 
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Box>
      
      <List sx={{ 
        bgcolor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        overflow: 'hidden'
      }}>
        {priorityActions.map((action, index) => (
          <React.Fragment key={action.id}>
            {index > 0 && <Divider component="li" />}
            <ListItem 
              alignItems="flex-start"
              sx={{ 
                py: 2,
                borderLeft: '4px solid',
                borderLeftColor: getUrgencyColor(action.urgency),
                '&:hover': {
                  bgcolor: theme.palette.action.hover
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: getUrgencyColor(action.urgency) }}>
                {action.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {action.title}
                    </Typography>
                    <Chip 
                      label={getUrgencyLabel(action.urgency)} 
                      size="small"
                      sx={{ 
                        height: 20,
                        fontSize: '0.625rem',
                        bgcolor: `${getUrgencyColor(action.urgency)}20`,
                        color: getUrgencyColor(action.urgency),
                        borderRadius: 1
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {action.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button 
                        variant="contained" 
                        size="small"
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: 1,
                          boxShadow: 'none'
                        }}
                      >
                        {action.primaryAction}
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          textTransform: 'none',
                          borderRadius: 1
                        }}
                      >
                        {action.secondaryAction}
                      </Button>
                    </Box>
                  </Box>
                }
              />
              {action.urgency === 'high' && (
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: theme.palette.error.main,
                  ml: 1
                }}>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="caption">48h</Typography>
                </Box>
              )}
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      
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
          View All Actions →
        </Typography>
      </Box>
    </Box>
  );
};

export default ActionCenterPanel; 