import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  useTheme,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  tooltipText?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  tooltipText,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
          {tooltipText && (
            <Tooltip title={tooltipText} arrow>
              <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {icon && <Box sx={{ color: theme.palette.primary.main }}>{icon}</Box>}
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {trend && (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color:
                trend === 'up'
                  ? theme.palette.success.main
                  : trend === 'down'
                  ? theme.palette.error.main
                  : theme.palette.text.secondary,
              mr: 1,
            }}
          >
            {trend === 'up' ? (
              <TrendingUpIcon fontSize="small" />
            ) : trend === 'down' ? (
              <TrendingDownIcon fontSize="small" />
            ) : null}
            <Typography variant="caption" sx={{ ml: 0.5 }}>
              {trendValue}
            </Typography>
          </Box>
        )}
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

interface ProgressMetricProps {
  title: string;
  value: number;
  total: number;
  tooltipText?: string;
}

const ProgressMetric: React.FC<ProgressMetricProps> = ({ title, value, total, tooltipText }) => {
  const theme = useTheme();
  const percentage = Math.round((value / total) * 100);

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          {title}
          {tooltipText && (
            <Tooltip title={tooltipText} arrow>
              <IconButton size="small" sx={{ ml: 0.5, p: 0 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        <Typography variant="body2" color="text.primary">
          {value}/{total} ({percentage}%)
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: theme.palette.grey[200],
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
};

export interface TransferAnalyticsPanelProps {
  metrics: {
    totalTransfers: number;
    pendingTransfers: number;
    completedTransfers: number;
    criticalTransfers: number;
    avgProcessingTime: string;
    onTimeDelivery: number;
    transferVolume: string;
    transferGrowth: string;
  };
}

const TransferAnalyticsPanel: React.FC<TransferAnalyticsPanelProps> = ({ metrics }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="h2">
          Transfer Analytics
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Transfers"
            value={metrics.totalTransfers}
            subtitle="All time"
            icon={<LocalShippingIcon />}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Processing Time"
            value={metrics.avgProcessingTime}
            subtitle="Last 30 days"
            icon={<AccessTimeIcon />}
            tooltipText="Average time from transfer creation to completion"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="On-time Delivery"
            value={`${metrics.onTimeDelivery}%`}
            subtitle="Last 30 days"
            icon={<CheckCircleOutlineIcon />}
            trend="up"
            trendValue="+5.2%"
            tooltipText="Percentage of transfers completed within the expected timeframe"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Transfer Volume"
            value={metrics.transferVolume}
            subtitle="This month"
            icon={<TrendingUpIcon />}
            trend="up"
            trendValue={metrics.transferGrowth}
            tooltipText="Total value of transfers processed"
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Transfer Status
      </Typography>

      <Box sx={{ mb: 3 }}>
        <ProgressMetric
          title="Completed Transfers"
          value={metrics.completedTransfers}
          total={metrics.totalTransfers}
          tooltipText="Transfers that have been successfully completed"
        />
        <ProgressMetric
          title="Pending Transfers"
          value={metrics.pendingTransfers}
          total={metrics.totalTransfers}
          tooltipText="Transfers that are in progress or awaiting action"
        />
        <ProgressMetric
          title="Critical Transfers"
          value={metrics.criticalTransfers}
          total={metrics.totalTransfers}
          tooltipText="Transfers that require immediate attention"
        />
      </Box>

      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          backgroundColor: theme.palette.warning.light,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <WarningIcon color="warning" sx={{ mr: 1 }} />
        <Typography variant="body2" color="warning.dark">
          {metrics.criticalTransfers} transfers require immediate attention
        </Typography>
      </Box>
    </Paper>
  );
};

export default TransferAnalyticsPanel; 