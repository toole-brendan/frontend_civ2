import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  LinearProgress, 
  Tooltip, 
  IconButton,
  useTheme
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { SupplierMetrics } from '../types';

interface SupplierHealthDashboardProps {
  metrics: SupplierMetrics;
  onMetricClick: (metricKey: string) => void;
}

const SupplierHealthDashboard: React.FC<SupplierHealthDashboardProps> = ({
  metrics,
  onMetricClick,
}) => {
  const theme = useTheme();

  const getColorByScore = (score: number, threshold1: number = 85, threshold2: number = 95) => {
    if (score >= threshold2) return theme.palette.success.main;
    if (score >= threshold1) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getTrendIcon = (current: number, previous: number) => {
    const diff = current - previous;
    if (diff > 0) return <ArrowUpwardIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
    if (diff < 0) return <ArrowDownwardIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
    return null;
  };

  const MetricCard = ({ 
    title, 
    value, 
    previousValue, 
    industryValue, 
    unit = '', 
    metricKey 
  }: { 
    title: string; 
    value: number; 
    previousValue: number; 
    industryValue: number; 
    unit?: string; 
    metricKey: string;
  }) => {
    const color = getColorByScore(value);
    const trendIcon = getTrendIcon(value, previousValue);
    const delta = ((value - previousValue) / previousValue * 100).toFixed(1);
    const showPositiveSign = value > previousValue;

    return (
      <Paper 
        elevation={0}
        onClick={() => onMetricClick(metricKey)}
        sx={{ 
          p: 2, 
          height: '100%',
          border: `1px solid ${theme.palette.divider}`,
          borderLeft: `4px solid ${color}`,
          cursor: 'pointer',
          '&:hover': {
            boxShadow: theme.shadows[2],
          },
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Tooltip title={`Industry average: ${industryValue}${unit}`}>
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            {value}{unit}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            {trendIcon}
            <Typography 
              variant="body2" 
              color={value >= previousValue ? 'success.main' : 'error.main'}
              sx={{ ml: 0.5 }}
            >
              {showPositiveSign && '+'}{delta}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 1.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
            vs. Industry Benchmark
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(value / (industryValue * 1.25)) * 100} 
            sx={{ 
              height: 6, 
              borderRadius: 1,
              backgroundColor: theme.palette.grey[200],
              '& .MuiLinearProgress-bar': {
                backgroundColor: color,
              }
            }} 
          />
        </Box>
      </Paper>
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 2 }}>
        Supplier Health Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Overall Performance"
            value={metrics.overallPerformance.score}
            previousValue={metrics.overallPerformance.previousScore}
            industryValue={metrics.overallPerformance.industryAverage}
            unit="/100"
            metricKey="overallPerformance"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="On-Time Delivery"
            value={metrics.onTimeDelivery.rate}
            previousValue={metrics.onTimeDelivery.previousRate}
            industryValue={metrics.onTimeDelivery.industryAverage}
            unit="%"
            metricKey="onTimeDelivery"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Quality Acceptance"
            value={metrics.qualityAcceptance.rate}
            previousValue={metrics.qualityAcceptance.previousRate}
            industryValue={metrics.qualityAcceptance.industryAverage}
            unit="%"
            metricKey="qualityAcceptance"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Price Competitiveness"
            value={metrics.priceCompetitiveness.score}
            previousValue={metrics.priceCompetitiveness.previousScore}
            industryValue={metrics.priceCompetitiveness.industryAverage}
            unit="/100"
            metricKey="priceCompetitiveness"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <MetricCard
            title="Documentation Accuracy"
            value={metrics.documentationAccuracy.rate}
            previousValue={metrics.documentationAccuracy.previousRate}
            industryValue={metrics.documentationAccuracy.industryAverage}
            unit="%"
            metricKey="documentationAccuracy"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SupplierHealthDashboard; 