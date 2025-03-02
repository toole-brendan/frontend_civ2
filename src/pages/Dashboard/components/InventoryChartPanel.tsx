import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  useTheme
} from '@mui/material';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import TuneIcon from '@mui/icons-material/Tune';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@/components/common/CardHeader';
import { inventoryData } from '../data';

const InventoryChartPanel: React.FC = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2 }}>
        <CardHeader 
          title="Inventory by Warehouse"
          subtitle="Last 6 months SKU count trends"
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
            <LineChart data={inventoryData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
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
                tickFormatter={(value) => (value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value)}
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
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: 10, 
                  fontSize: 11, 
                  opacity: 0.8,
                }} 
              />
              <ReferenceLine y={6000} stroke="rgba(255, 255, 255, 0.3)" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="Austin" stroke="#3B82F6" strokeWidth={2} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="SanJose" stroke="#F59E0B" strokeWidth={2} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Guadalajara" stroke="#10B981" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ 
          mt: 1, 
          pt: 1, 
          borderTop: '1px dashed rgba(140, 140, 160, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ 
              display: 'inline-block', 
              width: 8, 
              height: 1, 
              backgroundColor: 'rgba(255, 255, 255, 0.3)', 
              mr: 0.5, 
              borderRadius: 0 
            }} />
            Target threshold: 6,000
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Data source: ERP System
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InventoryChartPanel;
