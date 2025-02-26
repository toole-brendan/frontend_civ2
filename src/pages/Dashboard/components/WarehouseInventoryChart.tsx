import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Box, useTheme, FormControl, Select, MenuItem, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { WarehouseInventoryData } from '../mockData';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WarehouseInventoryChartProps {
  data: WarehouseInventoryData[];
  onDetailsClick?: () => void;
}

export const WarehouseInventoryChart: React.FC<WarehouseInventoryChartProps> = ({ 
  data,
  onDetailsClick 
}) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('6mo');
  const [visibleWarehouses, setVisibleWarehouses] = useState({
    austin: true,
    sanJose: true,
    guadalajara: true
  });

  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
  };

  const toggleWarehouse = (warehouse: 'austin' | 'sanJose' | 'guadalajara') => {
    setVisibleWarehouses(prev => ({
      ...prev,
      [warehouse]: !prev[warehouse]
    }));
  };

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      visibleWarehouses.austin && {
        label: 'Austin',
        data: data.map(item => item.austin),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false
      },
      visibleWarehouses.sanJose && {
        label: 'San Jose',
        data: data.map(item => item.sanJose),
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.main,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false
      },
      visibleWarehouses.guadalajara && {
        label: 'Guadalajara',
        data: data.map(item => item.guadalajara),
        borderColor: theme.palette.success.main,
        backgroundColor: theme.palette.success.main,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: false
      }
    ].filter(Boolean) as any[]
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle'
        },
        onClick: (e, legendItem) => {
          const index = legendItem.datasetIndex;
          if (index === 0) toggleWarehouse('austin');
          else if (index === 1) toggleWarehouse('sanJose');
          else if (index === 2) toggleWarehouse('guadalajara');
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y.toLocaleString() + ' SKUs';
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Inventory by Warehouse</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
                <Select
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  displayEmpty
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="6mo">Last 6 Months</MenuItem>
                  <MenuItem value="12mo">Last 12 Months</MenuItem>
                  <MenuItem value="ytd">Year to Date</MenuItem>
                </Select>
              </FormControl>
              <IconButton size="small" onClick={onDetailsClick}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ height: 'calc(100% - 70px)' }}>
        <Box sx={{ height: '100%', minHeight: 300 }}>
          <Line data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default WarehouseInventoryChart; 