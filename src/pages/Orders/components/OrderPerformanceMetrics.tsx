import React from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Grid, 
  styled, 
  CircularProgress, 
  Divider, 
  useTheme,
  LinearProgress,
  Tooltip
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

// Styled components
const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: theme.shadows[3],
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
  }
}));

const FulfillmentCard = styled(MetricCard)(({ theme }) => ({
  '&::before': {
    background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.primary.main})`,
  }
}));

const CycleTimeCard = styled(MetricCard)(({ theme }) => ({
  '&::before': {
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.info.light})`,
  }
}));

const PaymentStatusCard = styled(MetricCard)(({ theme }) => ({
  '&::before': {
    background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.primary.dark})`,
  }
}));

const OrderValueCard = styled(MetricCard)(({ theme }) => ({
  '&::before': {
    background: `linear-gradient(90deg, ${theme.palette.success.light}, ${theme.palette.info.dark})`,
  }
}));

const SmallText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  display: 'flex',
  alignItems: 'center',
}));

const TrendIndicator = styled(Box)<{ trend: 'positive' | 'negative' | 'neutral' }>(({ theme, trend }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1),
  color: 
    trend === 'positive' 
      ? theme.palette.success.main 
      : trend === 'negative' 
        ? theme.palette.error.main 
        : theme.palette.text.secondary,
  '& svg': {
    fontSize: '1rem',
    marginRight: '2px'
  }
}));

const InfoIcon = styled(InfoOutlinedIcon)(({ theme }) => ({
  fontSize: '0.85rem',
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(0.5),
  cursor: 'pointer',
}));

const DetailsLink = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  display: 'inline-block',
  marginTop: theme.spacing(1),
  '&:hover': {
    textDecoration: 'underline',
  }
}));

const SegmentedBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '12px',
  borderRadius: '6px',
  overflow: 'hidden',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const Segment = styled(Box)<{ color: string }>(({ color }) => ({
  height: '100%',
  backgroundColor: color,
}));

// Cycle time data
const cycleTimeData = [
  { name: 'Purchase', value: 5.1 },
  { name: 'Sales', value: 3.6 },
  { name: 'Return', value: 2.2 },
];

// Payment status data
const paymentStatusData = [
  { status: 'Pending', percentage: 12, color: '#FFC107' },
  { status: 'Processing', percentage: 8, color: '#2196F3' },
  { status: 'Complete', percentage: 75, color: '#4CAF50' },
  { status: 'Disputed', percentage: 5, color: '#F44336' },
];

// Daily order value data
const orderValueData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 20000 + Math.random() * 15000,
}));

// Interface for the component props
interface OrderPerformanceMetricsProps {
  fulfillmentRate: number;
  fulfillmentTrend: number;
  cycleTimes: {
    average: number;
    byType: typeof cycleTimeData;
    industryComparison: number;
  };
  paymentStatus: typeof paymentStatusData;
  orderValue: {
    active: number;
    pipeline: number;
    mtd: number;
    yoyChange: number;
  };
}

const OrderPerformanceMetrics: React.FC<OrderPerformanceMetricsProps> = ({
  fulfillmentRate,
  fulfillmentTrend,
  cycleTimes,
  paymentStatus,
  orderValue,
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      {/* Order Fulfillment Rate Card */}
      <Grid item xs={12} sm={6} md={3}>
        <FulfillmentCard>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Order Fulfillment Rate
            </Typography>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: fulfillmentRate >= 90 ? 'success.main' : fulfillmentRate >= 80 ? 'warning.main' : 'error.main',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}>
              {fulfillmentRate >= 90 ? 'Above Target' : fulfillmentRate >= 80 ? 'Near Target' : 'Below Target'}
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1 }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={120}
                thickness={4}
                sx={{ color: theme.palette.action.disabled }}
              />
              <CircularProgress
                variant="determinate"
                value={fulfillmentRate}
                size={120}
                thickness={4}
                sx={{ 
                  color: fulfillmentRate >= 90 
                    ? theme.palette.success.main 
                    : fulfillmentRate >= 80 
                      ? theme.palette.warning.main 
                      : theme.palette.error.main,
                  position: 'absolute',
                  left: 0,
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" component="div" fontWeight="bold">
                  {fulfillmentRate}%
                </Typography>
              </Box>
            </Box>
            
            <SmallText>
              {fulfillmentTrend > 0 ? 'Improved' : 'Decreased'} from last period
              <TrendIndicator trend={fulfillmentTrend > 0 ? 'positive' : 'negative'}>
                {fulfillmentTrend > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                {Math.abs(fulfillmentTrend)}%
              </TrendIndicator>
            </SmallText>
            
            <DetailsLink>
              View Fulfillment Details
            </DetailsLink>
          </Box>
        </FulfillmentCard>
      </Grid>

      {/* Order Cycle Time Card */}
      <Grid item xs={12} sm={6} md={3}>
        <CycleTimeCard>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Order Cycle Time
          </Typography>
          
          <Box sx={{ mt: 1, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h4" component="div" fontWeight="bold">
                {cycleTimes.average} days
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                average
              </Typography>
            </Box>
            
            <SmallText sx={{ mt: 0.5 }}>
              {Math.abs(cycleTimes.industryComparison)}% {cycleTimes.industryComparison > 0 ? 'slower' : 'faster'} than industry average
              <TrendIndicator trend={cycleTimes.industryComparison < 0 ? 'positive' : 'negative'}>
                {cycleTimes.industryComparison < 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </TrendIndicator>
            </SmallText>
          </Box>
          
          <Box sx={{ height: 80, mt: 2 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cycleTimes.byType} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: theme.palette.text.secondary }}
                />
                <RechartsTooltip 
                  formatter={(value: any) => [`${value} days`, 'Average Cycle Time']} 
                  labelFormatter={(label) => `${label} Orders`}
                />
                <Bar 
                  dataKey="value" 
                  fill={theme.palette.primary.main} 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          
          <DetailsLink>
            View Cycle Time Analysis
          </DetailsLink>
        </CycleTimeCard>
      </Grid>

      {/* Payment Status Card */}
      <Grid item xs={12} sm={6} md={3}>
        <PaymentStatusCard>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Payment Status
          </Typography>
          
          <SegmentedBar>
            {paymentStatus.map((segment) => (
              <Segment 
                key={segment.status}
                color={segment.color}
                sx={{ width: `${segment.percentage}%` }}
              />
            ))}
          </SegmentedBar>
          
          <Box sx={{ mb: 2 }}>
            {paymentStatus.map((segment) => (
              <Box 
                key={segment.status}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 0.5
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      bgcolor: segment.color,
                      mr: 1
                    }} 
                  />
                  <Typography variant="caption">
                    {segment.status}
                  </Typography>
                </Box>
                <Typography variant="caption" fontWeight="bold">
                  {segment.percentage}%
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Divider sx={{ my: 1 }} />
          
          <Box sx={{ mt: 1 }}>
            <SmallText sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <span>USDC vs. Traditional</span>
              <Typography variant="caption" fontWeight="bold" color="primary.main">
                68% blockchain payments
              </Typography>
            </SmallText>
            
            <SmallText sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Avg. resolution time</span>
              <Typography variant="caption" fontWeight="bold">
                1.4d USDC / 6.8d traditional
              </Typography>
            </SmallText>
          </Box>
        </PaymentStatusCard>
      </Grid>

      {/* Order Value Metrics Card */}
      <Grid item xs={12} sm={6} md={3}>
        <OrderValueCard>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Order Value Metrics
          </Typography>
          
          <Box sx={{ mt: 1 }}>
            <Typography variant="h4" fontWeight="bold">
              ${(orderValue.active / 1000).toFixed(0)}K
            </Typography>
            <SmallText>
              active orders
            </SmallText>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box>
              <Typography variant="body2" fontWeight="bold">
                ${(orderValue.pipeline / 1000).toFixed(0)}K
              </Typography>
              <SmallText>
                in pipeline
              </SmallText>
            </Box>
            
            <Box>
              <Typography variant="body2" fontWeight="bold">
                ${(orderValue.mtd / 1000).toFixed(0)}K
              </Typography>
              <SmallText>
                fulfilled MTD
              </SmallText>
            </Box>
          </Box>
          
          <Box sx={{ height: 40, mt: 1, mb: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderValueData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                <Bar 
                  dataKey="value" 
                  fill={theme.palette.success.main} 
                  radius={[2, 2, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          
          <SmallText sx={{ mt: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
            Year-over-year
            <TrendIndicator trend={orderValue.yoyChange > 0 ? 'positive' : 'negative'}>
              {orderValue.yoyChange > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              {Math.abs(orderValue.yoyChange)}%
            </TrendIndicator>
          </SmallText>
        </OrderValueCard>
      </Grid>
    </Grid>
  );
};

export default OrderPerformanceMetrics; 