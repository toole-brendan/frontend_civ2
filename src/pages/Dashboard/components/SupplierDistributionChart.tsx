import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box, Button, IconButton, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SupplierDistribution } from '../mockData';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface SupplierDistributionChartProps {
  data: SupplierDistribution[];
  onViewDetails?: () => void;
}

export const SupplierDistributionChart: React.FC<SupplierDistributionChartProps> = ({
  data,
  onViewDetails
}) => {
  const theme = useTheme();

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.percentage),
        backgroundColor: data.map(item => item.color),
        borderColor: theme.palette.background.paper,
        borderWidth: 2,
        hoverOffset: 10
      }
    ]
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw as number;
            const dataset = context.dataset;
            const total = (dataset.data as number[]).reduce((acc, data) => acc + data, 0);
            const currentValue = dataset.data[context.dataIndex] as number;
            const percentage = Math.round((currentValue / total) * 100);
            
            const dataItem = data[context.dataIndex];
            return [
              `${label}: ${percentage}%`,
              `Value: $${dataItem.value.toLocaleString()}`
            ];
          }
        }
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0
      }
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Supplier Distribution</Typography>
            <Box>
              <Button 
                size="small" 
                onClick={onViewDetails}
                sx={{ mr: 1 }}
              >
                View Details
              </Button>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        }
      />
      <CardContent sx={{ height: 'calc(100% - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ height: '100%', width: '100%', minHeight: 250 }}>
          <Pie data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SupplierDistributionChart; 