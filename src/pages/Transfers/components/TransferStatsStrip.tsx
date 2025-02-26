import React from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Divider,
  Tooltip,
  useTheme,
} from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Import types
import { TransferMetrics } from '../types';

interface TransferStatsStripProps {
  metrics: TransferMetrics;
  onMetricClick?: (metricKey: string) => void;
}

const TransferStatsStrip: React.FC<TransferStatsStripProps> = ({
  metrics,
  onMetricClick,
}) => {
  const theme = useTheme();

  const handleMetricClick = (metricKey: string) => {
    if (onMetricClick) {
      onMetricClick(metricKey);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid container spacing={2}>
        {/* Total Active Transfers */}
        <Grid item xs={6} sm={4} md={2}>
          <Tooltip title="View all active transfers">
            <Box
              onClick={() => handleMetricClick('totalActive')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                },
              }}
            >
              <LocalShippingIcon color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                {metrics.totalActive}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Active Transfers
              </Typography>
            </Box>
          </Tooltip>
        </Grid>

        {/* Total Value in Transit */}
        <Grid item xs={6} sm={4} md={2}>
          <Tooltip title="View total value in transit">
            <Box
              onClick={() => handleMetricClick('totalValueInTransit')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                },
              }}
            >
              <AttachMoneyIcon color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                ${metrics.totalValueInTransit.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Value in Transit
              </Typography>
            </Box>
          </Tooltip>
        </Grid>

        {/* Critical Transfers */}
        <Grid item xs={6} sm={4} md={2}>
          <Tooltip title="View critical transfers">
            <Box
              onClick={() => handleMetricClick('critical')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                },
              }}
            >
              <WarningIcon sx={{ mb: 1, color: theme.palette.error.main }} />
              <Typography variant="h5" fontWeight="bold" color="error">
                {metrics.critical}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Critical Transfers
              </Typography>
            </Box>
          </Tooltip>
        </Grid>

        {/* Success Rate */}
        <Grid item xs={6} sm={4} md={2}>
          <Tooltip title="View transfer success rate">
            <Box
              onClick={() => handleMetricClick('successRate')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                },
              }}
            >
              <VerifiedIcon sx={{ mb: 1, color: theme.palette.success.main }} />
              <Typography variant="h5" fontWeight="bold" color="success.main">
                {metrics.successRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Success Rate
              </Typography>
              {metrics.successRateChange > 0 ? (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <TrendingUpIcon fontSize="small" color="success" />
                  <Typography variant="caption" color="success.main">
                    +{metrics.successRateChange}%
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <TrendingDownIcon fontSize="small" color="error" />
                  <Typography variant="caption" color="error">
                    {metrics.successRateChange}%
                  </Typography>
                </Box>
              )}
            </Box>
          </Tooltip>
        </Grid>

        {/* Average Transit Time */}
        <Grid item xs={6} sm={4} md={2}>
          <Tooltip title="View average transit time">
            <Box
              onClick={() => handleMetricClick('avgTransitTime')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                },
              }}
            >
              <AccessTimeIcon color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                {metrics.avgTransitTime}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Avg. Transit Days
              </Typography>
            </Box>
          </Tooltip>
        </Grid>

        {/* Pending Approvals */}
        <Grid item xs={6} sm={4} md={2}>
          <Tooltip title="View pending approvals">
            <Box
              onClick={() => handleMetricClick('pendingApprovals')}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                  borderRadius: 1,
                },
              }}
            >
              <NotificationsIcon color="primary" sx={{ mb: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                {metrics.pendingApprovals}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Pending Approvals
              </Typography>
            </Box>
          </Tooltip>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: theme.palette.primary.main,
                mr: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Inbound: {metrics.inbound.count} (${metrics.inbound.value.toLocaleString()})
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: theme.palette.secondary.main,
                mr: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Outbound: {metrics.outbound.count} (${metrics.outbound.value.toLocaleString()})
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: theme.palette.warning.main,
                mr: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              In Customs: {metrics.inCustoms}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: theme.palette.info.main,
                mr: 1,
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Awaiting QC: {metrics.awaitingQC}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TransferStatsStrip; 