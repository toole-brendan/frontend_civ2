import React from 'react';
import {
  Grid,
  Box,
  Chip,
  useTheme
} from '@mui/material';
import KpiStatsCard from '@/components/common/KpiStatsCard';

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
        <KpiStatsCard
          icon={<AttachMoneyIcon />}
          title="Value in Transit"
          value={`$${valueInTransit.toLocaleString()}`}
          subtitle={`Across ${activeShipmentsCount} active shipments`}
          color={theme.palette.primary.main}
          variant="outlined"
          elevation={0}
        />
      </Grid>

      {/* Expected Deliveries */}
      <Grid item xs={12} sm={6} md={3}>
        <KpiStatsCard
          icon={<CalendarTodayIcon />}
          title="Expected Today"
          value={`${expectedToday.total} Shipments`}
          subtitle={`${expectedToday.inbound} inbound, ${expectedToday.outbound} outbound`}
          color={theme.palette.info.main}
          variant="outlined"
          elevation={0}
        />
      </Grid>

      {/* Delayed Shipments */}
      <Grid item xs={12} sm={6} md={3}>
        <KpiStatsCard
          icon={<WarningIcon />}
          title="Delayed Shipments"
          value={`${delayedShipments.count} Shipments`}
          subtitle={delayedShipments.critical > 0 ? "Requiring immediate attention" : "Currently delayed in transit"}
          color={theme.palette.error.main}
          variant="outlined"
          elevation={0}
          action={
            delayedShipments.critical > 0 ? (
              <Box sx={{ mt: 1 }}>
                <Chip
                  size="small"
                  color="error"
                  label={`${delayedShipments.critical} Critical`}
                  sx={{ height: 24 }}
                />
              </Box>
            ) : undefined
          }
        />
      </Grid>

      {/* Blockchain Verification */}
      <Grid item xs={12} sm={6} md={3}>
        <KpiStatsCard
          icon={<VerifiedIcon />}
          title="Blockchain Verified"
          value={`${verificationStats.percent}% Verified`}
          subtitle={`${verificationStats.confirmations} total confirmations`}
          color={theme.palette.success.main}
          variant="outlined"
          elevation={0}
        />
      </Grid>
    </Grid>
  );
};

export default ShipmentStatusCards;
