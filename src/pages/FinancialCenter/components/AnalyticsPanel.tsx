import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  LinearProgress,
  Chip,
  Divider,
  IconButton
} from '@mui/material';

// Icons
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Chart components
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend 
} from 'recharts';

// Types and Props
export interface AnalyticsPanelProps {
  cashFlowData: Array<any>;
  paymentMethodData: Array<any>;
}

// Top Suppliers data
const topSuppliers = [
  {
    name: 'Taiwan Semiconductor',
    volume: 324500,
    shellTokenPercentage: 72,
    savings: 6970,
    invoices: 7,
    rating: 'Excellent'
  },
  {
    name: 'Shenzhen Electronics',
    volume: 298200,
    shellTokenPercentage: 85,
    savings: 7605,
    invoices: 9,
    rating: 'Excellent'
  },
  {
    name: 'Korea Chip Manufacturing',
    volume: 245600,
    shellTokenPercentage: 64,
    savings: 4710,
    invoices: 6,
    rating: 'Good'
  },
  {
    name: 'Tokyo Components',
    volume: 189450,
    shellTokenPercentage: 68,
    savings: 3860,
    invoices: 5,
    rating: 'Good'
  },
  {
    name: 'Malaysia Circuit Systems',
    volume: 122580,
    shellTokenPercentage: 38,
    savings: 1395,
    invoices: 4,
    rating: 'Average'
  }
];

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  cashFlowData,
  paymentMethodData
}) => {
  return (
    <>
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Payment Method Analysis</Typography>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethodData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={55}
                          dataKey="value"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {paymentMethodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  <Box>
                    <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                      Shell Token payments result in 3% avg cost savings
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ width: '40%' }}>
                  <Typography variant="subtitle2" gutterBottom>Metrics</Typography>
                  <Divider />
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={8}>
                        <Typography variant="body2" color="text.secondary">Total Transactions</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" fontWeight="medium" align="right">217</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2" color="text.secondary">Shell Token Volume</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" fontWeight="medium" align="right">$842,600</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2" color="text.secondary">Traditional Volume</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" fontWeight="medium" align="right">$624,800</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body2" color="text.secondary">Cost Savings</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" fontWeight="medium" color="success.main" align="right">$24,850</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Cash Flow Analysis</Typography>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cashFlowData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value/1000}k`} />
                    <RechartsTooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.9)', border: 'none', borderRadius: 4, color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6 }} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#F59E0B" strokeWidth={3} dot={{ r: 6 }} name="Expenses" />
                    <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} name="Profit" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Supplier Payment Analysis */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6">Supplier Payment Analysis</Typography>
              <Typography variant="body2" color="text.secondary">Top suppliers by payment volume</Typography>
            </Box>
            <Box>
              <Button 
                size="small" 
                startIcon={<FileDownloadIcon />}
                variant="outlined"
              >
                Export
              </Button>
            </Box>
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Supplier</TableCell>
                  <TableCell align="right">Total Volume</TableCell>
                  <TableCell>Shell Token %</TableCell>
                  <TableCell align="right">Savings</TableCell>
                  <TableCell align="right">Invoices</TableCell>
                  <TableCell>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topSuppliers.map((supplier) => (
                  <TableRow key={supplier.name} hover>
                    <TableCell>{supplier.name}</TableCell>
                    <TableCell align="right">${supplier.volume.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={supplier.shellTokenPercentage} 
                            sx={{ height: 6, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">{supplier.shellTokenPercentage}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="success.main" fontWeight="medium">${supplier.savings.toLocaleString()}</Typography>
                    </TableCell>
                    <TableCell align="right">{supplier.invoices}</TableCell>
                    <TableCell>
                      <Chip 
                        label={supplier.rating} 
                        size="small"
                        sx={{ 
                          bgcolor: 
                            supplier.rating === 'Excellent' ? 'success.dark' + '22' : 
                            supplier.rating === 'Good' ? 'info.dark' + '22' : 
                            'warning.dark' + '22',
                          color: 
                            supplier.rating === 'Excellent' ? 'success.main' : 
                            supplier.rating === 'Good' ? 'info.main' : 
                            'warning.main' 
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};

export default AnalyticsPanel;
