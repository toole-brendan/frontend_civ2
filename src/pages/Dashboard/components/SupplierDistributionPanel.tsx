import React from 'react';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography
} from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import TuneIcon from '@mui/icons-material/Tune';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@/components/common/CardHeader';
import { supplierData } from '../data';

const SupplierDistributionPanel: React.FC = () => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2 }}>
        <CardHeader 
          title="Supplier Distribution"
          subtitle="Component allocation by supplier"
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
        <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={supplierData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {supplierData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Allocation']}
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
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                wrapperStyle={{
                  fontSize: 11,
                  paddingLeft: 20
                }}
              />
            </PieChart>
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
            Top supplier: <Box component="span" sx={{ fontWeight: 500 }}>Taiwan Semiconductor (28%)</Box>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Data source: Procurement API
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SupplierDistributionPanel;
