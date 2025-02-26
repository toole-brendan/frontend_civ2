import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Box, useTheme, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PaymentMethodData } from '../mockData';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PaymentMethodsChartProps {
  data: PaymentMethodData[];
  onDetailsClick?: () => void;
}

export const PaymentMethodsChart: React.FC<PaymentMethodsChartProps> = ({ 
  data,
  onDetailsClick 
}) => {
  const theme = useTheme();

  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Wire Transfers',
        data: data.map(item => item.wireTransfer),
        backgroundColor: theme.palette.grey[400],
        borderColor: theme.palette.grey[500],
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7
      },
      {
        label: 'Shell Tokens',
        data: data.map(item => item.shellTokens),
        backgroundColor: theme.palette.success.main,
        borderColor: theme.palette.success.dark,
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.6,
        categoryPercentage: 0.7
      }
    ]
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'rectRounded'
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
              label += '$' + context.parsed.y.toLocaleString();
            }
            return label;
          },
          afterBody: function(tooltipItems) {
            const item = tooltipItems[1]; // Shell tokens item
            if (item && item.dataset.data) {
              const wireTransferValue = tooltipItems[0].parsed.y;
              const shellTokenValue = item.parsed.y;
              const savingsRate = 0.03; // 3% savings
              const savings = shellTokenValue * savingsRate;
              
              return [`Savings: $${savings.toLocaleString()}`];
            }
            return [];
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
        beginAtZero: true,
        grid: {
          color: theme.palette.divider
        },
        ticks: {
          callback: function(value) {
            return '$' + (value as number).toLocaleString();
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
            <Typography variant="h6">Payment Methods Trend</Typography>
            <IconButton size="small" onClick={onDetailsClick}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ height: 'calc(100% - 70px)' }}>
        <Box sx={{ height: '100%', minHeight: 300 }}>
          <Bar data={chartData} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodsChart; 