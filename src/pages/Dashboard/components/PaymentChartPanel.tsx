import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  alpha
} from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import TuneIcon from '@mui/icons-material/Tune';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@/components/common/CardHeader';
import { paymentData } from '../data';

const PaymentChartPanel: React.FC = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2 }}>
        <CardHeader 
          title="Payment Methods Trend"
          subtitle="Traditional vs. Shell token payments"
          action={
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton size="small">
                <TuneIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          }
        />
        <Box sx={{ height: 300, mt: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 11 }} 
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 11 }} 
                axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                tickFormatter={(value) => (value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`)}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(12, 14, 20, 0.95)', 
                  borderColor: 'rgba(80, 80, 80, 0.4)',
                  borderRadius: 0,
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  fontSize: 11,
                  padding: '6px 8px',
                }} 
                formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: 10, 
                  fontSize: 11, 
                  opacity: 0.8 
                }} 
              />
              <ReferenceLine y={100000} stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="3 3" label="Target" />
              <Bar dataKey="Wire" name="Wire Transfer" stackId="a" fill={alpha('#F59E0B', 0.8)} />
              <Bar dataKey="Shell" name="Shell Tokens" stackId="a" fill={alpha('#10B981', 0.8)} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ 
          mt: 1, 
          pt: 1, 
          borderTop: '1px dashed rgba(140, 140, 160, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography variant="caption">
            50% conversion to Shell tokens: <Box component="span" sx={{ color: 'success.main' }}>$15,200 monthly savings</Box>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Data source: Finance API
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentChartPanel;
