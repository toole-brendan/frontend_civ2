import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Badge, 
  ButtonBase,
  useTheme,
  Tooltip,
  alpha,
  Card,
  CardContent,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import FactoryIcon from '@mui/icons-material/Factory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { SupplierOrderStatus } from '../types';

interface SupplierOrderStatusPanelProps {
  orderStatuses: SupplierOrderStatus[];
  activeFilter: string | null;
  onStatusClick: (status: string | null) => void;
}

const SupplierOrderStatusPanel: React.FC<SupplierOrderStatusPanelProps> = ({
  orderStatuses,
  activeFilter,
  onStatusClick,
}) => {
  const theme = useTheme();

  const getIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <PendingActionsIcon />;
      case 'PROCESSING':
        return <FactoryIcon />;
      case 'SHIPPED':
        return <LocalShippingIcon />;
      case 'DELIVERED':
        return <CheckCircleIcon />;
      case 'CANCELLED':
        return <CancelIcon />;
      case 'RETURNED':
        return <AssignmentReturnIcon />;
      default:
        return <InventoryIcon />;
    }
  };

  const getCardColor = (status: string) => {
    const isActive = activeFilter === status;
    
    switch (status) {
      case 'PENDING':
        return {
          bg: isActive ? alpha(theme.palette.info.main, 0.15) : alpha(theme.palette.info.main, 0.05),
          text: theme.palette.info.main,
          iconBg: isActive ? theme.palette.info.main : alpha(theme.palette.info.main, 0.8),
          border: isActive ? `1px solid ${theme.palette.info.main}` : `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
          shadow: isActive ? `0 4px 12px ${alpha(theme.palette.info.main, 0.2)}` : 'none',
        };
      case 'PROCESSING':
        return {
          bg: isActive ? alpha(theme.palette.warning.main, 0.15) : alpha(theme.palette.warning.main, 0.05),
          text: theme.palette.warning.main,
          iconBg: isActive ? theme.palette.warning.main : alpha(theme.palette.warning.main, 0.8),
          border: isActive ? `1px solid ${theme.palette.warning.main}` : `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
          shadow: isActive ? `0 4px 12px ${alpha(theme.palette.warning.main, 0.2)}` : 'none',
        };
      case 'SHIPPED':
        return {
          bg: isActive ? alpha(theme.palette.secondary.main, 0.15) : alpha(theme.palette.secondary.main, 0.05),
          text: theme.palette.secondary.main,
          iconBg: isActive ? theme.palette.secondary.main : alpha(theme.palette.secondary.main, 0.8),
          border: isActive ? `1px solid ${theme.palette.secondary.main}` : `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
          shadow: isActive ? `0 4px 12px ${alpha(theme.palette.secondary.main, 0.2)}` : 'none',
        };
      case 'DELIVERED':
        return {
          bg: isActive ? alpha(theme.palette.success.main, 0.15) : alpha(theme.palette.success.main, 0.05),
          text: theme.palette.success.main,
          iconBg: isActive ? theme.palette.success.main : alpha(theme.palette.success.main, 0.8),
          border: isActive ? `1px solid ${theme.palette.success.main}` : `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
          shadow: isActive ? `0 4px 12px ${alpha(theme.palette.success.main, 0.2)}` : 'none',
        };
      case 'CANCELLED':
        return {
          bg: isActive ? alpha(theme.palette.error.main, 0.15) : alpha(theme.palette.error.main, 0.05),
          text: theme.palette.error.main,
          iconBg: isActive ? theme.palette.error.main : alpha(theme.palette.error.main, 0.8),
          border: isActive ? `1px solid ${theme.palette.error.main}` : `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
          shadow: isActive ? `0 4px 12px ${alpha(theme.palette.error.main, 0.2)}` : 'none',
        };
      case 'RETURNED':
        return {
          bg: isActive ? alpha(theme.palette.error.light, 0.15) : alpha(theme.palette.error.light, 0.05),
          text: theme.palette.error.light,
          iconBg: isActive ? theme.palette.error.light : alpha(theme.palette.error.light, 0.8),
          border: isActive ? `1px solid ${theme.palette.error.light}` : `1px solid ${alpha(theme.palette.error.light, 0.1)}`,
          shadow: isActive ? `0 4px 12px ${alpha(theme.palette.error.light, 0.2)}` : 'none',
        };
      default:
        return {
          bg: isActive ? alpha(theme.palette.grey[500], 0.15) : alpha(theme.palette.grey[500], 0.05),
          text: theme.palette.grey[700],
          iconBg: isActive ? theme.palette.grey[700] : alpha(theme.palette.grey[700], 0.8),
          border: isActive ? `1px solid ${theme.palette.grey[500]}` : `1px solid ${alpha(theme.palette.grey[500], 0.1)}`,
          shadow: isActive ? `0 4px 12px ${alpha(theme.palette.grey[500], 0.2)}` : 'none',
        };
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusLabel = (status: string) => {
    // Convert status to a more readable format (e.g., "PENDING" to "Pending")
    return status.charAt(0) + status.slice(1).toLowerCase().replace(/_/g, ' ');
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {orderStatuses.map((status) => {
          const colorSet = getCardColor(status.status);
          const isActive = activeFilter === status.status;
          
          return (
            <Grid item xs={12} sm={6} md={4} lg={2} key={status.status}>
              <ButtonBase
                sx={{ 
                  display: 'block', 
                  width: '100%', 
                  textAlign: 'left',
                  borderRadius: theme.shape.borderRadius,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => onStatusClick(isActive ? null : status.status)}
              >
                <Card
                  elevation={isActive ? 4 : 1}
                  sx={{
                    height: '100%',
                    backgroundColor: colorSet.bg,
                    border: colorSet.border,
                    borderRadius: theme.shape.borderRadius,
                    transition: 'all 0.3s ease',
                    boxShadow: colorSet.shadow,
                    overflow: 'visible',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.1)}`,
                    },
                  }}
                >
                  {status.flagged > 0 && (
                    <Badge
                      badgeContent={status.flagged}
                      color="error"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        '& .MuiBadge-badge': {
                          fontSize: '0.75rem',
                          height: 22,
                          minWidth: 22,
                          borderRadius: 11,
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      <WarningIcon sx={{ display: 'none' }} />
                    </Badge>
                  )}
                  
                  <CardContent sx={{ p: 2.5 }}>
                    <Box
                      sx={{
                        backgroundColor: colorSet.iconBg,
                        color: 'white',
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        boxShadow: `0 4px 8px ${alpha(colorSet.iconBg, 0.4)}`,
                      }}
                    >
                      {getIcon(status.status)}
                    </Box>

                    <Typography variant="h4" fontWeight="bold" color={colorSet.text} sx={{ mb: 0.5 }}>
                      {status.count}
                    </Typography>
                    
                    <Typography 
                      variant="subtitle2" 
                      fontWeight="medium" 
                      color={colorSet.text} 
                      sx={{ mb: 1, display: 'block' }}
                    >
                      {getStatusLabel(status.status)}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      color={colorSet.text} 
                      sx={{ 
                        opacity: 0.8,
                        fontWeight: 'medium',
                      }}
                    >
                      {formatCurrency(status.value)}
                    </Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SupplierOrderStatusPanel; 