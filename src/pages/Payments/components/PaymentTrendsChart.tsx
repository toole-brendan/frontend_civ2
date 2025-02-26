import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  ToggleButtonGroup, 
  ToggleButton,
  useTheme
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  ReferenceLine,
  Label
} from 'recharts';
import { PaymentTrend } from '../mockData';
import { AnalyticsPeriod } from '../types';

interface PaymentTrendsChartProps {
  trends: PaymentTrend[];
}

const PaymentTrendsChart: React.FC<PaymentTrendsChartProps> = ({
  trends
}) => {
  const theme = useTheme();
  const [period, setPeriod] = useState<AnalyticsPeriod>('6mo');
  
  // Calculate projected data points (for demonstration)
  const projectedTrends = [...trends];
  const lastMonth = trends[trends.length - 1];
  
  // Add 3 projected months
  for (let i = 1; i <= 3; i++) {
    const monthNames = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const projectedMonth = {
      month: monthNames[trends.length - 1 + i],
      traditionalVolume: Math.max(0, lastMonth.traditionalVolume - 40000),
      shellTokenVolume: lastMonth.shellTokenVolume + 40000,
      totalVolume: lastMonth.totalVolume + 10000,
      savings: lastMonth.savings + 1200
    };
    projectedTrends.push(projectedMonth);
  }
  
  // Milestone annotations
  const milestones = [
    { month: 'Oct', text: 'Started Korea Chip on Shell tokens', y: 70000 },
    { month: 'Dec', text: 'Added Tokyo Components', y: 180000 },
    { month: 'Feb', text: 'Added Taiwan Semiconductor', y: 320000 }
  ];
  
  const handlePeriodChange = (
    _: React.MouseEvent<HTMLElement>,
    newPeriod: AnalyticsPeriod,
  ) => {
    if (newPeriod !== null) {
      setPeriod(newPeriod);
    }
  };
  
  // Filter data based on selected period
  const getFilteredData = () => {
    switch (period) {
      case '3mo':
        return projectedTrends.slice(-3);
      case '6mo':
        return projectedTrends.slice(-6);
      case '12mo':
        return projectedTrends;
      case 'YTD':
        return projectedTrends.slice(-2);
      default:
        return projectedTrends;
    }
  };
  
  const filteredData = getFilteredData();
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          elevation={3}
          sx={{
            p: 2,
            bgcolor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
            {label}
          </Typography>
          
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                display: 'inline-block', 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: theme.palette.primary.main,
                mr: 1
              }} />
              Shell Token: ${payload[1].value.toLocaleString()}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                display: 'inline-block', 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: theme.palette.grey[400],
                mr: 1
              }} />
              Traditional: ${payload[0].value.toLocaleString()}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box component="span" sx={{ 
                display: 'inline-block', 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                bgcolor: theme.palette.success.main,
                mr: 1
              }} />
              Savings: ${payload[2].value.toLocaleString()}
            </Typography>
          </Box>
          
          <Typography variant="body2" fontWeight="medium" sx={{ mt: 1, color: theme.palette.text.secondary }}>
            Total Volume: ${(payload[0].value + payload[1].value).toLocaleString()}
          </Typography>
        </Paper>
      );
    }
    return null;
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Payment Trends
        </Typography>
        
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={handlePeriodChange}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              px: 2,
              py: 0.5
            }
          }}
        >
          <ToggleButton value="3mo">3 Months</ToggleButton>
          <ToggleButton value="6mo">6 Months</ToggleButton>
          <ToggleButton value="12mo">12 Months</ToggleButton>
          <ToggleButton value="YTD">YTD</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Box sx={{ height: 400, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={filteredData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={{ stroke: theme.palette.divider }}
            />
            <YAxis 
              yAxisId="left"
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={{ stroke: theme.palette.divider }}
              tickFormatter={(value) => `$${value/1000}k`}
            >
              <Label
                value="Payment Volume"
                position="insideLeft"
                angle={-90}
                style={{ textAnchor: 'middle', fill: theme.palette.text.secondary }}
              />
            </YAxis>
            <YAxis 
              yAxisId="right" 
              orientation="right"
              tick={{ fill: theme.palette.text.secondary }}
              axisLine={{ stroke: theme.palette.divider }}
              tickLine={{ stroke: theme.palette.divider }}
              tickFormatter={(value) => `$${value/1000}k`}
            >
              <Label
                value="Savings"
                position="insideRight"
                angle={90}
                style={{ textAnchor: 'middle', fill: theme.palette.text.secondary }}
              />
            </YAxis>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="traditionalVolume" 
              name="Traditional Payments" 
              stackId="a" 
              fill={theme.palette.grey[400]}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              yAxisId="left"
              dataKey="shellTokenVolume" 
              name="Shell Token Payments" 
              stackId="a" 
              fill={theme.palette.primary.main}
              radius={[4, 4, 0, 0]}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="savings" 
              name="Fee Savings" 
              stroke={theme.palette.success.main}
              strokeWidth={3}
              dot={{ r: 6, fill: theme.palette.success.main, stroke: theme.palette.success.main }}
            />
            
            {/* Projected trend line */}
            {period !== '3mo' && (
              <ReferenceLine 
                x={trends[trends.length - 1].month} 
                stroke={theme.palette.warning.main} 
                strokeDasharray="3 3"
                yAxisId="left"
                label={{ 
                  value: 'Projected', 
                  position: 'insideTopRight', 
                  fill: theme.palette.warning.main,
                  fontSize: 12
                }}
              />
            )}
            
            {/* Milestone annotations */}
            {milestones.map((milestone, index) => {
              // Only show milestones that are in the filtered data
              if (filteredData.find(item => item.month === milestone.month)) {
                return (
                  <ReferenceLine
                    key={index}
                    x={milestone.month}
                    yAxisId="left"
                    stroke={theme.palette.info.main}
                    strokeDasharray="3 3"
                    label={{
                      value: milestone.text,
                      position: 'top',
                      fill: theme.palette.info.main,
                      fontSize: 10
                    }}
                  />
                );
              }
              return null;
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default PaymentTrendsChart; 