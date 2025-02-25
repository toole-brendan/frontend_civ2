import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Collapse,
  IconButton,
  Divider,
  styled,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  Description as ContractIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
}));

const CardContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
}));

const CardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'center',
}));

// Types of alerts
export type AlertType = 'inventory' | 'shipment' | 'contract';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  timestamp: string;
  details?: string;
}

interface CriticalAlertsCardProps {
  alerts: Alert[];
  onResolve: (id: string) => void;
  onViewAll: () => void;
}

// Get icon based on alert type
const getAlertIcon = (type: AlertType) => {
  switch (type) {
    case 'inventory':
      return <InventoryIcon color="error" />;
    case 'shipment':
      return <ShippingIcon color="error" />;
    case 'contract':
      return <ContractIcon color="error" />;
    default:
      return <WarningIcon color="error" />;
  }
};

export const CriticalAlertsCard: React.FC<CriticalAlertsCardProps> = ({
  alerts,
  onResolve,
  onViewAll,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [expandedAlerts, setExpandedAlerts] = useState<string[]>([]);

  // Toggle card expansion
  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  // Toggle alert detail expansion
  const handleAlertToggle = (id: string) => {
    setExpandedAlerts((prev) =>
      prev.includes(id) ? prev.filter((alertId) => alertId !== id) : [...prev, id]
    );
  };

  // Format time to relative format
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <StyledPaper>
      <CardHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <WarningIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Critical Alerts</Typography>
        </Box>
        <IconButton 
          onClick={handleExpandToggle} 
          size="small" 
          sx={{ color: 'inherit' }}
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardHeader>
      
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <List disablePadding>
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <React.Fragment key={alert.id}>
                  {index > 0 && <Divider />}
                  <ListItem alignItems="flex-start">
                    <ListItemIcon>
                      {getAlertIcon(alert.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" component="div">
                            {alert.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatRelativeTime(alert.timestamp)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        alert.details && (
                          <Box sx={{ mt: 1 }}>
                            <Box
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                                color: 'primary.main',
                                fontSize: '0.75rem'
                              }}
                              onClick={() => handleAlertToggle(alert.id)}
                            >
                              {expandedAlerts.includes(alert.id) ? 'Hide details' : 'Show details'}
                              {expandedAlerts.includes(alert.id) ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
                            </Box>
                            <Collapse in={expandedAlerts.includes(alert.id)}>
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {alert.details}
                              </Typography>
                            </Collapse>
                          </Box>
                        )
                      }
                    />
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => onResolve(alert.id)}
                      sx={{ minWidth: 100, alignSelf: 'center', ml: 1 }}
                    >
                      Resolve
                    </Button>
                  </ListItem>
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No critical alerts at this time"
                  primaryTypographyProps={{ align: 'center' }}
                />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Collapse>
      
      <CardFooter>
        <Button 
          color="primary" 
          onClick={onViewAll}
          sx={{ width: '100%' }}
        >
          View All Alerts
        </Button>
      </CardFooter>
    </StyledPaper>
  );
};

export default CriticalAlertsCard; 