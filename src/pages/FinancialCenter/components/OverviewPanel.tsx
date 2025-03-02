import React from 'react';
import { 
  alpha,
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Divider, 
  Button,
  Avatar,
  useTheme
} from '@mui/material';
import KpiStatsCard from '@/components/common/KpiStatsCard';

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
          <KpiStatsCard
            icon={<AttachMoneyIcon />}
            title="Cash on Hand"
            value="$1,250,600"
            subtitle="Available balance"
            trend={true}
            trendDirection="up"
            trendValue="+5.2% this month"
            color="info.main"
            variant="outlined"
            elevation={0}
          />
        </Grid>
        
        {/* Accounts Receivable */}
        <Grid item xs={12} sm={6} md={3}>
          <KpiStatsCard
            icon={<EventNoteIcon />}
            title="Accounts Receivable"
            value="$685,200"
            subtitle="12 open invoices • 38 days average"
            color="warning.main"
            variant="outlined"
            elevation={0}
          />
        </Grid>
        
        {/* Accounts Payable */}
        <Grid item xs={12} sm={6} md={3}>
          <KpiStatsCard
            icon={<MoneyOffIcon />}
            title="Accounts Payable"
            value="$197,550"
            subtitle={
              <Typography variant="caption" color="error.main">
                <Box component="span" sx={{ fontWeight: 'bold' }}>$78,500</Box> due tomorrow
              </Typography>
            }
            color="error.main"
            variant="outlined"
            elevation={0}
          />
        </Grid>
        
        {/* Shell Token Savings */}
        <Grid item xs={12} sm={6} md={3}>
          <KpiStatsCard
            icon={<SavingsIcon />}
            title="Shell Token Savings"
            value="$24,850"
            subtitle="Using blockchain payments"
            trend={true}
            trendDirection="up"
            trendValue="18.2% vs. traditional payments"
            color="success.main"
            variant="outlined"
            elevation={0}
          />
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
