import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  styled,
} from '@mui/material';
import {
  BarChart as BarChartIcon,
  ShowChart as LineChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChartContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const StyledLegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  '& .legend-color': {
    width: 12,
    height: 12,
    borderRadius: '50%',
    marginRight: theme.spacing(0.5),
  },
  '& .legend-label': {
    fontSize: '0.75rem',
  },
}));

// Chart types and data interfaces
type TimeUnit = 'days' | 'weeks' | 'months';

export interface TransitTimeData {
  route: string;
  avgTime: number;
  target: number;
}

export interface InventoryLevelData {
  date: string;
  coffee: number;
  equipment: number;
  packaging: number;
  min: number;
  max: number;
}

export interface PaymentResolutionData {
  name: string;
  value: number;
  color: string;
}

export interface TransferVolumeData {
  week: string;
  inbound: number;
  outbound: number;
  internal: number;
  total: number;
}

interface PerformanceMetricsGridProps {
  transitTimeData: TransitTimeData[];
  inventoryLevelData: InventoryLevelData[];
  paymentResolutionData: PaymentResolutionData[];
  transferVolumeData: TransferVolumeData[];
  onDetailsClick: (chartType: string) => void;
}

// Custom recharts tooltip
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1, boxShadow: 3 }}>
        <Typography variant="body2">{label}</Typography>
        {payload.map((entry, index) => (
          <Box key={`tooltip-item-${index}`} sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                backgroundColor: entry.color,
                mr: 1,
                borderRadius: '50%',
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {entry.name}: {entry.value}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

export const PerformanceMetricsGrid: React.FC<PerformanceMetricsGridProps> = ({
  transitTimeData,
  inventoryLevelData,
  paymentResolutionData,
  transferVolumeData,
  onDetailsClick,
}) => {
  // State for time unit toggle
  const [timeUnit, setTimeUnit] = useState<TimeUnit>('weeks');
  
  // Handle time unit change
  const handleTimeUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeUnit: TimeUnit | null
  ) => {
    if (newTimeUnit !== null) {
      setTimeUnit(newTimeUnit);
    }
  };
  
  // Colors for charts
  const colors = {
    primary: '#1976d2',
    secondary: '#9c27b0',
    success: '#4caf50',
    error: '#f44336',
    warning: '#ff9800',
    info: '#03a9f4',
    grey: '#9e9e9e',
  };

  return (
    <Grid container spacing={3}>
      {/* Transit Times Chart */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <ChartHeader>
            <Typography variant="subtitle1">Transit Times</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography 
                variant="caption" 
                color="primary"
                sx={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center',
                  '&:hover': { textDecoration: 'underline' }
                }}
                onClick={() => onDetailsClick('transitTimes')}
              >
                Details
                <InfoIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Typography>
            </Box>
          </ChartHeader>
          <ChartContent>
            <Box sx={{ flexGrow: 1, height: '90%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transitTimeData}
                  margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="route" />
                  <YAxis unit=" days" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="avgTime" name="Average Time" fill={colors.primary} />
                  <Line
                    type="monotone"
                    dataKey="target"
                    name="Target"
                    stroke={colors.error}
                    strokeWidth={2}
                    dot={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </ChartContent>
        </StyledPaper>
      </Grid>
      
      {/* Inventory Levels Chart */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <ChartHeader>
            <Typography variant="subtitle1">Inventory Levels</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ToggleButtonGroup
                size="small"
                value={timeUnit}
                exclusive
                onChange={handleTimeUnitChange}
                aria-label="time unit"
              >
                <ToggleButton value="days" aria-label="days">
                  Days
                </ToggleButton>
                <ToggleButton value="weeks" aria-label="weeks">
                  Weeks
                </ToggleButton>
                <ToggleButton value="months" aria-label="months">
                  Months
                </ToggleButton>
              </ToggleButtonGroup>
              <Typography 
                variant="caption" 
                color="primary"
                sx={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center',
                  ml: 2,
                  '&:hover': { textDecoration: 'underline' }
                }}
                onClick={() => onDetailsClick('inventoryLevels')}
              >
                Details
                <InfoIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Typography>
            </Box>
          </ChartHeader>
          <ChartContent>
            <Box sx={{ flexGrow: 1, height: '90%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={inventoryLevelData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="coffee"
                    name="Coffee"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="equipment"
                    name="Equipment"
                    stroke={colors.secondary}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="packaging"
                    name="Packaging"
                    stroke={colors.info}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="min"
                    name="Min Level"
                    stroke={colors.error}
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="max"
                    name="Max Level"
                    stroke={colors.success}
                    strokeDasharray="5 5"
                    strokeWidth={1}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </ChartContent>
        </StyledPaper>
      </Grid>
      
      {/* Payment Resolution Chart */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <ChartHeader>
            <Typography variant="subtitle1">Payment Resolution</Typography>
            <Typography 
              variant="caption" 
              color="primary"
              sx={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center',
                '&:hover': { textDecoration: 'underline' }
              }}
              onClick={() => onDetailsClick('paymentResolution')}
            >
              Details
              <InfoIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Typography>
          </ChartHeader>
          <ChartContent>
            <Box sx={{ flexGrow: 1, height: '90%', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentResolutionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {paymentResolutionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  3.2 days
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Avg. Resolution
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
              {paymentResolutionData.map((item, index) => (
                <StyledLegendItem key={index}>
                  <Box className="legend-color" sx={{ backgroundColor: item.color }} />
                  <Typography className="legend-label">
                    {item.name}
                  </Typography>
                </StyledLegendItem>
              ))}
            </Box>
          </ChartContent>
        </StyledPaper>
      </Grid>
      
      {/* Transfer Volume Chart */}
      <Grid item xs={12} md={6}>
        <StyledPaper>
          <ChartHeader>
            <Typography variant="subtitle1">Transfer Volume</Typography>
            <Typography 
              variant="caption" 
              color="primary"
              sx={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center',
                '&:hover': { textDecoration: 'underline' }
              }}
              onClick={() => onDetailsClick('transferVolume')}
            >
              Details
              <InfoIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Typography>
          </ChartHeader>
          <ChartContent>
            <Box sx={{ flexGrow: 1, height: '90%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={transferVolumeData}
                  margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="inbound"
                    name="Inbound"
                    stackId="1"
                    stroke={colors.success}
                    fill={colors.success}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="outbound"
                    name="Outbound"
                    stackId="1"
                    stroke={colors.error}
                    fill={colors.error}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="internal"
                    name="Internal"
                    stackId="1"
                    stroke={colors.info}
                    fill={colors.info}
                    fillOpacity={0.6}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    name="Total"
                    stroke={colors.primary}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </ChartContent>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default PerformanceMetricsGrid; 