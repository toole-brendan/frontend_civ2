import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  Grid,
  Chip,
  Avatar,
  Button,
  IconButton,
  Divider,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';

// Icons
import VerifiedIcon from '@mui/icons-material/Verified';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PrintIcon from '@mui/icons-material/Print';
import RouteIcon from '@mui/icons-material/Route';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Types
import { Shipment } from '../data';

interface ShipmentDetailPanelProps {
  shipment: Shipment;
}

const ShipmentDetailPanel: React.FC<ShipmentDetailPanelProps> = ({ shipment }) => {
  const theme = useTheme();

  // Get icon based on shipment type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inbound':
        return <SouthIcon fontSize="small" />;
      case 'outbound':
        return <NorthIcon fontSize="small" />;
      case 'internal':
        return <SwapHorizIcon fontSize="small" />;
      default:
        return undefined;
    }
  };

  // Get color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6">Shipment Details</Typography>
          <Button 
            variant="outlined" 
            size="small"
            startIcon={<PrintIcon />}
          >
            Print Label
          </Button>
        </Box>

        {/* Shipment ID and Verification */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" sx={{ mr: 1 }}>{shipment.id}</Typography>
            {shipment.blockchainVerified && (
              <Tooltip title={`Blockchain Verified (${shipment.confirmations} confirmations)`}>
                <Chip
                  icon={<VerifiedIcon />}
                  label="Verified"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Tooltip>
            )}
          </Box>
          <Chip
            size="small"
            label={shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
            icon={getTypeIcon(shipment.type)}
            sx={{ mr: 1 }}
          />
          <Chip
            size="small"
            label={shipment.statusText}
            color={
              shipment.status === 'delayed' ? 'error' :
              shipment.status === 'delivered' || shipment.status === 'completed' ? 'success' :
              shipment.status === 'in-customs' ? 'warning' :
              shipment.status === 'preparing' ? 'secondary' : 'info'
            }
          />
        </Box>

        {/* Reference and Priority */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Reference #</Typography>
            <Typography variant="subtitle2">{shipment.referenceNumber}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">Priority</Typography>
            <Chip
              size="small"
              label={shipment.priority.charAt(0).toUpperCase() + shipment.priority.slice(1)}
              color={getPriorityColor(shipment.priority)}
              sx={{ mt: 0.5 }}
            />
          </Grid>
        </Grid>

        {/* Origin and Destination */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Route</Typography>
          <Paper
            variant="outlined"
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: alpha(theme.palette.background.paper, 0.5) 
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={5}>
                <Typography variant="subtitle2">{shipment.origin}</Typography>
                <Typography variant="body2" color="text.secondary">Origin</Typography>
              </Grid>
              <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ArrowDropDownIcon sx={{ transform: 'rotate(-90deg)' }} />
              </Grid>
              <Grid item xs={5}>
                <Typography variant="subtitle2">{shipment.destination}</Typography>
                <Typography variant="body2" color="text.secondary">Destination</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Shipment Items */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Items</Typography>
          <Paper
            variant="outlined"
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: alpha(theme.palette.background.paper, 0.5) 
            }}
          >
            {shipment.items.map((item, index) => (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  mb: index !== shipment.items.length - 1 ? 1 : 0,
                  pb: index !== shipment.items.length - 1 ? 1 : 0,
                  borderBottom: index !== shipment.items.length - 1 ? 1 : 0,
                  borderColor: 'divider'
                }}
              >
                <Typography variant="body2">{item.name}</Typography>
                <Typography variant="body2">{item.quantity.toLocaleString()} units</Typography>
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Shipment Value */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Value & Dates</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Paper
                variant="outlined"
                sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  textAlign: 'center'
                }}
              >
                <Typography variant="h6" color="primary.main">${shipment.value.toLocaleString()}</Typography>
                <Typography variant="caption" color="text.secondary">Value</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                variant="outlined"
                sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  textAlign: 'center'
                }}
              >
                <Typography variant="h6">{new Date(shipment.createdDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</Typography>
                <Typography variant="caption" color="text.secondary">Created</Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper
                variant="outlined"
                sx={{ 
                  p: 2, 
                  borderRadius: 2, 
                  bgcolor: alpha(theme.palette.background.paper, 0.5),
                  textAlign: 'center'
                }}
              >
                <Typography 
                  variant="h6" 
                  color={
                    shipment.status === 'delayed' ? 'error.main' : 
                    (shipment.status === 'delivered' || shipment.status === 'completed') ? 'success.main' : 'inherit'
                  }
                >
                  {shipment.actualDelivery ? 
                    new Date(shipment.actualDelivery).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 
                    new Date(shipment.estimatedDelivery).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {shipment.actualDelivery ? 'Delivered' : 'Expected'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Tracking Information */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Tracking Information</Typography>
          <Paper
            variant="outlined"
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: alpha(theme.palette.background.paper, 0.5) 
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Carrier</Typography>
                <Typography variant="subtitle2">{shipment.carrier}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">Tracking Number</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    {shipment.trackingNumber === 'Pending' ? 'Pending' : shipment.trackingNumber}
                  </Typography>
                  {shipment.trackingNumber !== 'Pending' && (
                    <IconButton size="small">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Blockchain Verification */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>Blockchain Verification</Typography>
          <Paper
            variant="outlined"
            sx={{ 
              p: 2, 
              borderRadius: 2, 
              bgcolor: alpha(theme.palette.background.paper, 0.5) 
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Smart Contract</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', mr: 1 }}>
                    {shipment.smartContract}
                  </Typography>
                  <IconButton size="small">
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Confirmations</Typography>
                <Typography variant="subtitle2">{shipment.confirmations}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Last Updated</Typography>
                <Typography variant="subtitle2">{shipment.lastUpdated}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Notes */}
        {shipment.notes && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>Notes</Typography>
            <Paper
              variant="outlined"
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: alpha(theme.palette.background.paper, 0.5) 
              }}
            >
              <Typography variant="body2">{shipment.notes}</Typography>
            </Paper>
          </Box>
        )}

        {/* Action Buttons */}
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="contained" 
              startIcon={<RouteIcon />}
            >
              Track Shipment
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="outlined"
              startIcon={<VerifiedIcon />}
            >
              Verify on Blockchain
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ShipmentDetailPanel;
