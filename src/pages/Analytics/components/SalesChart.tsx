import React from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Divider,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  styled,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChartContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flexGrow: 1,
  height: '400px',
  width: '100%',
}));

interface SalesChartProps {
  data: any[];
  title: string;
  xAxisDataKey: string;
  series: {
    name: string;
    dataKey: string;
    color: string;
  }[];
  chartType?: 'line' | 'bar';
}

const SalesChart: React.FC<SalesChartProps> = ({
  data,
  title,
  xAxisDataKey,
  series,
  chartType = 'line',
}) => {
  const theme = useTheme();
  const [timeFrame, setTimeFrame] = React.useState('monthly');

  const handleTimeFrameChange = (event: SelectChangeEvent) => {
    setTimeFrame(event.target.value as string);
  };

  // Custom formatter for currency values
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[1],
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  backgroundColor: entry.color,
                  mr: 1,
                }}
              />
              <Typography variant="body2">
                {entry.name}: ${entry.value.toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
          <XAxis
            dataKey={xAxisDataKey}
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
          />
          <YAxis
            tick={{ fill: theme.palette.text.secondary }}
            axisLine={{ stroke: theme.palette.divider }}
            tickLine={{ stroke: theme.palette.divider }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {series.map((s) => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              name={s.name}
              stroke={s.color}
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      );
    }

    return (
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey={xAxisDataKey}
          tick={{ fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
        />
        <YAxis
          tick={{ fill: theme.palette.text.secondary }}
          axisLine={{ stroke: theme.palette.divider }}
          tickLine={{ stroke: theme.palette.divider }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {series.map((s) => (
          <Bar key={s.dataKey} dataKey={s.dataKey} name={s.name} fill={s.color} />
        ))}
      </BarChart>
    );
  };

  return (
    <StyledPaper elevation={0}>
      <ChartHeader>
        <Typography variant="h6">{title}</Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={timeFrame}
            onChange={handleTimeFrameChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Time frame' }}
            sx={{ fontSize: '0.875rem' }}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="quarterly">Quarterly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </ChartHeader>
      <Divider />
      <ChartContent>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </ChartContent>
    </StyledPaper>
  );
};

export default SalesChart; 