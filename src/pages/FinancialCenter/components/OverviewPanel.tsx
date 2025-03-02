import React from 'react';
import { 
  alpha,
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Chip, 
  Divider, 
  Button
} from '@mui/material';

// Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventNoteIcon from '@mui/icons-material/EventNote';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import SavingsIcon from '@mui/icons-material/Savings';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Chart components
import { ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';

// Types
interface CashFlowData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface PaymentMethodData {
  name: string;
  value: number;
  color: string;
}

// Props
export interface OverviewPanelProps {
  cashFlowData: CashFlowData[];
  paymentMethodData: PaymentMethodData[];
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ cashFlowData, paymentMethodData }) => {
  return (
    <>
      {/* Financial KPIs */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Cash on Hand */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: -16, 
                left: 24, 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                border: '4px solid',
                borderColor: 'background.default'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'info.main', 
                  color: 'info.contrastText',
                  width: 48,
                  height: 48
                }}
              >
                <AttachMoneyIcon />
              </Avatar>
            </Box>
            <CardContent sx={{ pt: 4, pb: 3, px: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Cash on Hand
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
                $1,250,600
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" color="success.main">
                  +5.2% this month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Accounts Receivable */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: -16, 
                left: 24, 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                border: '4px solid',
                borderColor: 'background.default'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'warning.main', 
                  color: 'warning.contrastText',
                  width: 48,
                  height: 48
                }}
              >
                <EventNoteIcon />
              </Avatar>
            </Box>
            <CardContent sx={{ pt: 4, pb: 3, px: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Accounts Receivable
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
                $685,200
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  12 open invoices • 38 days average
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Accounts Payable */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: -16, 
                left: 24, 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                border: '4px solid',
                borderColor: 'background.default'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'error.main', 
                  color: 'error.contrastText',
                  width: 48,
                  height: 48
                }}
              >
                <MoneyOffIcon />
              </Avatar>
            </Box>
            <CardContent sx={{ pt: 4, pb: 3, px: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Accounts Payable
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
                $197,550
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" color="error.main">
                  <Box component="span" sx={{ fontWeight: 'bold' }}>$78,500</Box> due tomorrow
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Shell Token Savings */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                top: -16, 
                left: 24, 
                width: 56, 
                height: 56, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'background.paper',
                border: '4px solid',
                borderColor: 'background.default'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: 'success.main', 
                  color: 'success.contrastText',
                  width: 48,
                  height: 48
                }}
              >
                <SavingsIcon />
              </Avatar>
            </Box>
            <CardContent sx={{ pt: 4, pb: 3, px: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Shell Token Savings
              </Typography>
              <Typography variant="h4" fontWeight="600" sx={{ mb: 1 }}>
                $24,850
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ArrowUpwardIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption" color="success.main">
                  18.2% vs. traditional payments
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Cash Flow Trend */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6">Financial Performance</Typography>
                  <Typography variant="body2" color="text.secondary">Revenue, expenses & profit trends (6 months)</Typography>
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
              <Box sx={{ height: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }} />
                    <YAxis 
                      tickFormatter={(value) => `$${value/1000}k`} 
                      tick={{ fontSize: 12, fill: 'rgba(255, 255, 255, 0.7)' }}
                    />
                    <RechartsTooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.9)', border: 'none', borderRadius: 4, color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                    <Area type="monotone" dataKey="expenses" stroke="#F59E0B" fillOpacity={1} fill="url(#colorExpenses)" name="Expenses" />
                    <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" name="Profit" />
                    <Legend />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Payment Distribution */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Payment Methods</Typography>
                <Button
                  size="small"
                  variant="text"
                  sx={{ minWidth: 0, p: 0.5 }}
                >
                  <MoreVertIcon fontSize="small" />
                </Button>
              </Box>
              <Box sx={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend 
                      layout="vertical" 
                      verticalAlign="middle" 
                      align="right"
                      formatter={(value) => <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 14 }}>{value}</span>}
                    />
                    <RechartsTooltip 
                      formatter={(value: number) => [`${value}%`, '']}
                      contentStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.9)', border: 'none', borderRadius: 4, color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Token vs Traditional Payment Savings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight="600">
                  $24,850
                </Typography>
                <Chip 
                  label="↑ 18.2%" 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha('#10B981', 0.2), 
                    color: '#10B981',
                    fontWeight: 'bold',
                    borderRadius: 1
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OverviewPanel;
