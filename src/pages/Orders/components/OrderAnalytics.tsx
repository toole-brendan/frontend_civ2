import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  Select,
  MenuItem,
  Grid,
  styled,
  useTheme,
  Tabs,
  Tab,
  Divider,
  Tooltip,
  Button,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  AreaChart,
  Area,
  ComposedChart,
  Scatter,
} from 'recharts';

// Styled components
const AnalyticsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  overflow: 'visible',
  '& .MuiCardContent-root': {
    padding: theme.spacing(2),
  },
}));

const ChartContainer = styled(Box)(({ theme }) => ({
  height: 300,
  marginTop: theme.spacing(2),
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const TimeRangeToggle = styled(ToggleButtonGroup)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& .MuiToggleButtonGroup-grouped': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 4,
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0, 0.5),
    fontSize: '0.75rem',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const MetricsGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const MetricItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    transform: 'translateY(-2px)',
  },
}));

const ChartLegend = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const LegendColor = styled(Box)<{ color: string }>(({ color }) => ({
  width: 12,
  height: 12,
  backgroundColor: color,
  marginRight: 6,
  borderRadius: 2,
}));

// Mock data for the charts
const generateOrderVolumeData = (months: number) => {
  const data = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  for (let i = 0; i < months; i++) {
    const month = (currentMonth - i + 12) % 12;
    const year = currentYear - Math.floor((i - currentMonth) / 12);
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'short' });
    
    const purchaseOrders = Math.floor(Math.random() * 100) + 20;
    const salesOrders = Math.floor(Math.random() * 100) + 30;
    
    data.unshift({
      name: `${monthName} ${year}`,
      purchaseOrders,
      salesOrders,
      totalOrders: purchaseOrders + salesOrders,
      avgValue: Math.floor(Math.random() * 5000) + 2000,
    });
  }

  return data;
};

const generateOrderValueData = (months: number) => {
  const data = [];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  for (let i = 0; i < months; i++) {
    const month = (currentMonth - i + 12) % 12;
    const year = currentYear - Math.floor((i - currentMonth) / 12);
    const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'short' });
    
    const purchaseValue = Math.floor(Math.random() * 500000) + 100000;
    const salesValue = Math.floor(Math.random() * 700000) + 200000;
    
    data.unshift({
      name: `${monthName} ${year}`,
      purchaseValue,
      salesValue,
      totalValue: purchaseValue + salesValue,
      yoy: Math.random() * 40 - 20, // -20% to +20% YoY
    });
  }

  return data;
};

const generateCycleTimeData = () => {
  const buckets = [
    '0-1 days',
    '1-2 days',
    '2-3 days',
    '3-5 days',
    '5-7 days',
    '7-10 days',
    '10-14 days',
    '14+ days',
  ];
  
  return buckets.map(range => ({
    range,
    count: Math.floor(Math.random() * 50) + 5,
    salesOrders: Math.floor(Math.random() * 30) + 5,
    purchaseOrders: Math.floor(Math.random() * 30),
  }));
};

// Interface for the component props
interface OrderAnalyticsProps {
  onTimeRangeChange?: (range: string) => void;
}

const OrderAnalytics: React.FC<OrderAnalyticsProps> = ({ onTimeRangeChange }) => {
  const theme = useTheme();
  
  // State for time range and chart type
  const [timeRange, setTimeRange] = useState<string>('YTD');
  const [chartTab, setChartTab] = useState<number>(0);
  const [orderTypeFilter, setOrderTypeFilter] = useState<string>('all');
  
  // Generate mock data based on selected time range
  let months;
  switch (timeRange) {
    case 'MTD':
      months = 1;
      break;
    case 'QTD':
      months = 3;
      break;
    case 'YTD':
      months = 12;
      break;
    case '3Y':
      months = 36;
      break;
    default:
      months = 12;
  }
  
  const orderVolumeData = generateOrderVolumeData(months);
  const orderValueData = generateOrderValueData(months);
  const cycleTimeData = generateCycleTimeData();
  
  // Event handlers
  const handleTimeRangeChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeRange: string,
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
      if (onTimeRangeChange) onTimeRangeChange(newTimeRange);
    }
  };
  
  const handleChartTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setChartTab(newValue);
  };
  
  const handleOrderTypeChange = (event: SelectChangeEvent) => {
    setOrderTypeFilter(event.target.value);
  };
  
  // Determine which data to display based on chart tab and filters
  const getChartData = () => {
    switch (chartTab) {
      case 0: // Order Volume
        return orderVolumeData;
      case 1: // Order Value
        return orderValueData;
      case 2: // Cycle Time
        return cycleTimeData;
      default:
        return orderVolumeData;
    }
  };
  
  return (
    <AnalyticsCard>
      <CardContent>
        <ChartHeader>
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Analytics
            </Typography>
            <Typography variant="body2" color="textSecondary">
              View order metrics and performance indicators
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimeRangeToggle
              value={timeRange}
              exclusive
              onChange={handleTimeRangeChange}
              aria-label="time range"
              size="small"
            >
              <ToggleButton value="MTD">MTD</ToggleButton>
              <ToggleButton value="QTD">QTD</ToggleButton>
              <ToggleButton value="YTD">YTD</ToggleButton>
              <ToggleButton value="3Y">3Y</ToggleButton>
            </TimeRangeToggle>
            
            <IconButton size="small">
              <DownloadIcon fontSize="small" />
            </IconButton>
            <IconButton size="small">
              <FullscreenIcon fontSize="small" />
            </IconButton>
          </Box>
        </ChartHeader>
        
        {/* Key metrics row */}
        <MetricsGrid container spacing={2}>
          <Grid item xs={6} md={3}>
            <MetricItem>
              <Typography variant="caption" color="textSecondary">
                Total Orders
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {orderVolumeData.reduce((sum, item) => sum + item.totalOrders, 0)}
              </Typography>
              <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center' }}>
                +{Math.floor(Math.random() * 15) + 5}% from prev. period
              </Typography>
            </MetricItem>
          </Grid>
          <Grid item xs={6} md={3}>
            <MetricItem>
              <Typography variant="caption" color="textSecondary">
                Total Value
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                ${(orderValueData.reduce((sum, item) => sum + item.totalValue, 0) / 1000000).toFixed(2)}M
              </Typography>
              <Typography variant="caption" color="success.main">
                +{Math.floor(Math.random() * 15) + 5}% from prev. period
              </Typography>
            </MetricItem>
          </Grid>
          <Grid item xs={6} md={3}>
            <MetricItem>
              <Typography variant="caption" color="textSecondary">
                Average Order Value
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                ${Math.floor(
                  orderValueData.reduce((sum, item) => sum + item.totalValue, 0) / 
                  orderVolumeData.reduce((sum, item) => sum + item.totalOrders, 0)
                ).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="error.main">
                -{Math.floor(Math.random() * 10) + 1}% from prev. period
              </Typography>
            </MetricItem>
          </Grid>
          <Grid item xs={6} md={3}>
            <MetricItem>
              <Typography variant="caption" color="textSecondary">
                Avg. Cycle Time
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                4.2 days
              </Typography>
              <Typography variant="caption" color="success.main">
                -{Math.floor(Math.random() * 15) + 5}% from prev. period
              </Typography>
            </MetricItem>
          </Grid>
        </MetricsGrid>
        
        {/* Chart tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={chartTab}
            onChange={handleChartTabChange}
            aria-label="chart tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Order Volume" />
            <Tab label="Order Value" />
            <Tab label="Cycle Time" />
          </Tabs>
        </Box>
        
        {/* Filter row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
          <Box>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
              <Select
                value={orderTypeFilter}
                onChange={handleOrderTypeChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Order Type' }}
              >
                <MenuItem value="all">All Orders</MenuItem>
                <MenuItem value="purchase">Purchase Orders</MenuItem>
                <MenuItem value="sales">Sales Orders</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              sx={{ borderRadius: 4, fontSize: '0.75rem' }}
              endIcon={<ExpandMoreIcon />}
            >
              More Filters
            </Button>
            <Button
              size="small"
              variant="outlined"
              sx={{ borderRadius: 4, fontSize: '0.75rem' }}
            >
              Drill Down
            </Button>
          </Box>
        </Box>
        
        {/* Chart display area */}
        <ChartContainer>
          {chartTab === 0 && (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={orderVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                    domain={[0, 'auto']}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                    domain={[0, 'auto']}
                  />
                  <RechartsTooltip 
                    formatter={(value: any, name: string) => [
                      value, 
                      name === 'avgValue' 
                        ? 'Average Value ($)' 
                        : name === 'purchaseOrders' 
                          ? 'Purchase Orders' 
                          : name === 'salesOrders'
                            ? 'Sales Orders'
                            : 'Total Orders'
                    ]}
                    labelFormatter={(label) => `Period: ${label}`}
                  />
                  <Bar 
                    dataKey="purchaseOrders" 
                    fill={theme.palette.primary.main} 
                    barSize={20} 
                    yAxisId="left"
                    name="Purchase Orders"
                    stackId="orders"
                    opacity={orderTypeFilter === 'sales' ? 0.3 : 1}
                  />
                  <Bar 
                    dataKey="salesOrders" 
                    fill={theme.palette.success.main} 
                    barSize={20} 
                    yAxisId="left"
                    name="Sales Orders"
                    stackId="orders"
                    opacity={orderTypeFilter === 'purchase' ? 0.3 : 1}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgValue" 
                    stroke={theme.palette.warning.main} 
                    strokeWidth={2}
                    yAxisId="right"
                    dot={{ fill: theme.palette.warning.main, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Average Value ($)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              
              <ChartLegend>
                <LegendItem>
                  <LegendColor color={theme.palette.primary.main} />
                  Purchase Orders
                </LegendItem>
                <LegendItem>
                  <LegendColor color={theme.palette.success.main} />
                  Sales Orders
                </LegendItem>
                <LegendItem>
                  <LegendColor color={theme.palette.warning.main} />
                  Average Order Value
                </LegendItem>
              </ChartLegend>
            </>
          )}
          
          {chartTab === 1 && (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={orderValueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                  />
                  <YAxis 
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                    domain={[0, 'auto']}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                    domain={[-30, 30]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <RechartsTooltip 
                    formatter={(value: any, name: string) => [
                      name.includes('Value') 
                        ? `$${value.toLocaleString()}` 
                        : `${value.toFixed(1)}%`, 
                      name === 'yoy' 
                        ? 'YoY Change' 
                        : name
                    ]}
                    labelFormatter={(label) => `Period: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="purchaseValue" 
                    fill={theme.palette.primary.light} 
                    stroke={theme.palette.primary.main}
                    fillOpacity={0.3}
                    stackId="value"
                    name="Purchase Value"
                    opacity={orderTypeFilter === 'sales' ? 0.3 : 1}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="salesValue" 
                    fill={theme.palette.success.light} 
                    stroke={theme.palette.success.main}
                    fillOpacity={0.3}
                    stackId="value"
                    name="Sales Value"
                    opacity={orderTypeFilter === 'purchase' ? 0.3 : 1}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="yoy" 
                    stroke={theme.palette.warning.main} 
                    strokeWidth={2}
                    yAxisId="right"
                    dot={{ fill: theme.palette.warning.main, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="yoy"
                  />
                </ComposedChart>
              </ResponsiveContainer>
              
              <ChartLegend>
                <LegendItem>
                  <LegendColor color={theme.palette.primary.main} />
                  Purchase Value
                </LegendItem>
                <LegendItem>
                  <LegendColor color={theme.palette.success.main} />
                  Sales Value
                </LegendItem>
                <LegendItem>
                  <LegendColor color={theme.palette.warning.main} />
                  YoY Change
                </LegendItem>
              </ChartLegend>
            </>
          )}
          
          {chartTab === 2 && (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cycleTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                  <XAxis 
                    dataKey="range" 
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                  />
                  <YAxis 
                    tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                    axisLine={{ stroke: theme.palette.divider }}
                    tickLine={{ stroke: theme.palette.divider }}
                  />
                  <RechartsTooltip 
                    formatter={(value: any, name: string) => [
                      value, 
                      name === 'salesOrders' 
                        ? 'Sales Orders' 
                        : name === 'purchaseOrders'
                          ? 'Purchase Orders'
                          : 'All Orders'
                    ]}
                    labelFormatter={(label) => `Cycle Time: ${label}`}
                  />
                  <Bar 
                    dataKey={orderTypeFilter === 'all' ? 'count' : orderTypeFilter === 'purchase' ? 'purchaseOrders' : 'salesOrders'} 
                    fill={orderTypeFilter === 'purchase' ? theme.palette.primary.main : orderTypeFilter === 'sales' ? theme.palette.success.main : theme.palette.info.main} 
                    barSize={20} 
                    name={orderTypeFilter === 'all' ? 'All Orders' : orderTypeFilter === 'purchase' ? 'Purchase Orders' : 'Sales Orders'}
                  />
                </BarChart>
              </ResponsiveContainer>
              
              <ChartLegend>
                <LegendItem>
                  <LegendColor color={
                    orderTypeFilter === 'purchase' 
                      ? theme.palette.primary.main 
                      : orderTypeFilter === 'sales' 
                        ? theme.palette.success.main 
                        : theme.palette.info.main
                  } />
                  {orderTypeFilter === 'purchase' ? 'Purchase Orders' : orderTypeFilter === 'sales' ? 'Sales Orders' : 'All Orders'}
                </LegendItem>
                <Typography variant="caption" color="textSecondary" sx={{ ml: 2 }}>
                  Distribution of cycle times across all orders
                </Typography>
              </ChartLegend>
            </>
          )}
        </ChartContainer>
      </CardContent>
    </AnalyticsCard>
  );
};

export default OrderAnalytics; 