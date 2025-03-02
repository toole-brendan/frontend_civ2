import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  alpha,
  useTheme
} from '@mui/material';

// Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WarningIcon from '@mui/icons-material/Warning';
import VerifiedIcon from '@mui/icons-material/Verified';

interface ShipmentStatusCardsProps {
  valueInTransit: number;
  activeShipmentsCount: number;
  expectedToday: {
    total: number;
    inbound: number;
    outbound: number;
  };
  delayedShipments: {
    count: number;
    critical: number;
  };
  verificationStats: {
    percent: number;
    confirmations: number;
  };
}

const ShipmentStatusCards: React.FC<ShipmentStatusCardsProps> = ({
  valueInTransit,
  activeShipmentsCount,
  expectedToday,
  delayedShipments,
  verificationStats
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {/* Total Value in Transit */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.2), color: 'primary.main', mr: 2 }}>
                <AttachMoneyIcon />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Value in Transit
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              ${valueInTransit.toLocaleString()}
            </Typography>
            <Box component="span" sx={{ display: 'block' }} color="text.secondary" fontSize="body2.fontSize">
              Across {activeShipmentsCount} active shipments
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Expected Deliveries */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.2), color: 'info.main', mr: 2 }}>
                <CalendarTodayIcon />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Expected Today
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {expectedToday.total} Shipments
            </Typography>
            <Box component="span" sx={{ display: 'block' }} color="text.secondary" fontSize="body2.fontSize">
              {expectedToday.inbound} inbound, {expectedToday.outbound} outbound
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Delayed Shipments */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.2), color: 'error.main', mr: 2 }}>
                <WarningIcon />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Delayed Shipments
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {delayedShipments.count} Shipments
            </Typography>
            <Box sx={{ mt: 1 }}>
              {delayedShipments.critical > 0 && (
                <Chip
                  size="small"
                  color="error"
                  label={`${delayedShipments.critical} Critical`}
                  sx={{ height: 24 }}
                />
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Blockchain Verification */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.2), color: 'success.main', mr: 2 }}>
                <VerifiedIcon />
              </Avatar>
              <Typography variant="subtitle1" color="text.secondary">
                Blockchain Verified
              </Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {verificationStats.percent}% Verified
            </Typography>
            <Box component="span" sx={{ display: 'block' }} color="text.secondary" fontSize="body2.fontSize">
              {verificationStats.confirmations} total confirmations
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShipmentStatusCards;
