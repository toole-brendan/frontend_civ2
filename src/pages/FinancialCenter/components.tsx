import React from 'react';
import { 
  alpha,
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Divider,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Chip,
  Avatar,
  Stack,
  LinearProgress,
  TextField,
  MenuItem,
  InputAdornment,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';

// Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionIcon from '@mui/icons-material/Description';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoopIcon from '@mui/icons-material/Loop';
import HistoryIcon from '@mui/icons-material/History';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// Chart components
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, Area, AreaChart } from 'recharts';

// Data
import { 
  cashFlowData, 
  paymentMethodData, 
  paymentComparisonData,
  upcomingPaymentsData,
  recentTransactionsData,
  invoiceData,
  smartContractData
} from './data';

// Overview Panel Component
export const OverviewPanel: React.FC = () => {
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
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
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
      
      {/* Upcoming Payments Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6">Upcoming Payments</Typography>
              <Typography variant="body2" color="text.secondary">Due invoices requiring your attention</Typography>
            </Box>
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
              size="small"
            >
              Filter
            </Button>
          </Box>
          <TableContainer>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Potential Savings</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {upcomingPaymentsData.map((payment) => (
                  <TableRow key={payment.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ReceiptIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                        <Typography variant="body2">{payment.id}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{payment.supplier}</TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight="medium">
                        ${payment.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{payment.dueDate.split('-')[2]}/{payment.dueDate.split('-')[1]}/{payment.dueDate.split('-')[0].substring(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={payment.status} 
                        size="small"
                        sx={{
                          bgcolor: `${payment.statusColor}.dark` + '22',
                          color: `${payment.statusColor}.main`,
                          fontWeight: 'medium'
                        }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="success.main" fontWeight="medium">
                        ${payment.potentialSavings.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        size="small"
                        startIcon={<PaymentIcon />}
                      >
                        Pay
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      
      {/* Shell Token vs Traditional Payment Trend */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography variant="h6">Shell Token Payment Analysis</Typography>
              <Typography variant="body2" color="text.secondary">Transaction volume and savings over time</Typography>
            </Box>
            <Box>
              <Button 
                size="small" 
                startIcon={<FileDownloadIcon />}
                variant="outlined"
                sx={{ mr: 1 }}
              >
                Export
              </Button>
              <Button 
                size="small"
                variant="contained"
                startIcon={<TrendingUpIcon />}
              >
                Detailed Analysis
              </Button>
            </Box>
          </Box>
          <Box sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={paymentComparisonData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `$${value/1000}k`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value/1000}k`} />
                <RechartsTooltip 
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`, 
                    name === 'savings' ? 'Cost Savings' : name === 'Shell' ? 'Shell Token Volume' : 'Traditional Volume'
                  ]}
                  contentStyle={{ backgroundColor: 'rgba(33, 33, 33, 0.9)', border: 'none', borderRadius: 4, color: '#fff' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="Shell" fill="#66bb6a" name="Shell Token Volume" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="Traditional" fill="#ffa726" name="Traditional Volume" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="savings" stroke="#29b6f6" name="Cost Savings" strokeWidth={3} dot={{ r: 6 }} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

// Payments Panel Component
export const PaymentsPanel: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Manage Payments</Typography>
            <Typography variant="body2" color="text.secondary">Process and track supplier payments</Typography>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
            >
              New Payment
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Box>
        </Box>
        
        {/* Payment Methods Selection */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ bgcolor: alpha('#66bb6a', 0.08), cursor: 'pointer', transition: 'all 0.2s' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2.5 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <VerifiedUserIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">Shell Token</Typography>
                  <Typography variant="body2" color="text.secondary">Secure blockchain payment</Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h6" color="success.main">3%</Typography>
                  <Typography variant="caption" color="success.main">Discount</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ cursor: 'pointer', transition: 'all 0.2s' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2.5 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <AccountBalanceIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">Wire Transfer</Typography>
                  <Typography variant="body2" color="text.secondary">Traditional bank transfer</Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h6" color="text.secondary">0%</Typography>
                  <Typography variant="caption" color="text.secondary">Standard</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ cursor: 'pointer', transition: 'all 0.2s' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2.5 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <PaymentIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">ACH/Credit</Typography>
                  <Typography variant="body2" color="text.secondary">Automated clearing house</Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h6" color="text.secondary">1%</Typography>
                  <Typography variant="caption" color="text.secondary">Discount</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Upcoming Payments Table */}
        <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Payments</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingPaymentsData.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ReceiptIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      <Typography variant="body2">{payment.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{payment.supplier}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${payment.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{payment.dueDate.split('-')[2]}/{payment.dueDate.split('-')[1]}/{payment.dueDate.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={payment.status} 
                      size="small"
                      sx={{
                        bgcolor: `${payment.statusColor}.dark` + '22',
                        color: `${payment.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={payment.paymentMethod} 
                      size="small"
                      icon={payment.paymentMethod === 'Shell Token' ? <VerifiedIcon /> : undefined}
                      sx={{
                        bgcolor: payment.paymentMethod === 'Shell Token' ? 'success.dark' + '22' : 'warning.dark' + '22',
                        color: payment.paymentMethod === 'Shell Token' ? 'success.main' : 'warning.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<PaymentIcon />}
                    >
                      Pay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

// Invoices Panel Component
export const InvoicesPanel: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Manage Invoices</Typography>
            <Typography variant="body2" color="text.secondary">Track and process supplier invoices</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search invoices..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 200 }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
            >
              New Invoice
            </Button>
          </Box>
        </Box>
        
        {/* Invoice Status Summary */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'error.main', mr: 1, width: 32, height: 32 }}>
                    <WarningIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Overdue</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">0</Typography>
                <Typography variant="body2" color="text.secondary">$0.00</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', mr: 1, width: 32, height: 32 }}>
                    <ScheduleIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Due Soon</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">3</Typography>
                <Typography variant="body2" color="text.secondary">$156,900.00</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'info.main', mr: 1, width: 32, height: 32 }}>
                    <ReceiptIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Open</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">5</Typography>
                <Typography variant="body2" color="text.secondary">$197,550.00</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'success.main', mr: 1, width: 32, height: 32 }}>
                    <CheckCircleIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Paid</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">2</Typography>
                <Typography variant="body2" color="text.secondary">$71,350.00</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Invoices Table */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.map((invoice) => (
                <TableRow key={invoice.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ReceiptIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      <Typography variant="body2">{invoice.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{invoice.supplier}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {invoice.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${invoice.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{invoice.dueDate.split('-')[2]}/{invoice.dueDate.split('-')[1]}/{invoice.dueDate.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={invoice.status} 
                      size="small"
                      sx={{
                        bgcolor: `${invoice.statusColor}.dark` + '22',
                        color: `${invoice.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    {invoice.paymentStatus && (
                      <Chip 
                        label={invoice.paymentStatus} 
                        size="small"
                        sx={{
                          bgcolor: `${invoice.paymentStatusColor}.dark` + '22',
                          color: `${invoice.paymentStatusColor}.main`,
                          fontWeight: 'medium'
                        }} 
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      size="small"
                      disabled={invoice.status === 'Paid'}
                      startIcon={<PaymentIcon />}
                    >
                      {invoice.status === 'Paid' ? 'Paid' : 'Pay'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

// Transactions Panel Component
export const TransactionsPanel: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Transaction History</Typography>
            <Typography variant="body2" color="text.secondary">All financial transactions with suppliers</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search transactions..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 200 }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FileDownloadIcon />}
            >
              Export
            </Button>
          </Box>
        </Box>
        
        {/* Transactions Table */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Blockchain</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTransactionsData.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {transaction.type === 'Payment' ? (
                        <PaymentIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      ) : transaction.type === 'Invoice' ? (
                        <ReceiptIcon sx={{ mr: 1, color: 'warning.main', fontSize: 16 }} />
                      ) : (
                        <InventoryIcon sx={{ mr: 1, color: 'success.main', fontSize: 16 }} />
                      )}
                      <Typography variant="body2">{transaction.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.type} 
                      size="small"
                      sx={{
                        bgcolor: 
                          transaction.type === 'Payment' ? 'primary.dark' + '22' : 
                          transaction.type === 'Invoice' ? 'warning.dark' + '22' : 
                          'success.dark' + '22',
                        color: 
                          transaction.type === 'Payment' ? 'primary.main' : 
                          transaction.type === 'Invoice' ? 'warning.main' : 
                          'success.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {transaction.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{transaction.date.split('-')[2]}/{transaction.date.split('-')[1]}/{transaction.date.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.method} 
                      size="small"
                      icon={transaction.method === 'Shell Token' ? <VerifiedIcon /> : undefined}
                      sx={{
                        bgcolor: 
                          transaction.method === 'Shell Token' ? 'success.dark' + '22' : 
                          transaction.method === 'Traditional Wire' ? 'warning.dark' + '22' : 
                          'info.dark' + '22',
                        color: 
                          transaction.method === 'Shell Token' ? 'success.main' : 
                          transaction.method === 'Traditional Wire' ? 'warning.main' : 
                          'info.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.status} 
                      size="small"
                      sx={{
                        bgcolor: `${transaction.statusColor}.dark` + '22',
                        color: `${transaction.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    {transaction.txHash !== 'N/A' ? (
                      <Tooltip title={transaction.txHash}>
                        <Chip 
                          label={transaction.verifications > 0 ? `${transaction.verifications} verifications` : 'N/A'} 
                          size="small"
                          icon={transaction.verifications > 0 ? <VerifiedUserIcon /> : undefined}
                          sx={{
                            bgcolor: transaction.verifications > 0 ? 'success.dark' + '22' : 'text.disabled',
                            color: transaction.verifications > 0 ? 'success.main' : 'text.disabled',
                            fontWeight: 'medium'
                          }} 
                        />
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="text.secondary">N/A</Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

// Smart Contracts Panel Component
export const SmartContractsPanel: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Blockchain Smart Contracts</Typography>
            <Typography variant="body2" color="text.secondary">Manage and track all supplier agreements</Typography>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
            >
              New Contract
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<LoopIcon />}
            >
              Refresh
            </Button>
          </Box>
        </Box>
        
        {/* Smart Contracts Table */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Contract ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Parties</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Verifications</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {smartContractData.map((contract) => (
                <TableRow key={contract.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DescriptionIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      <Typography variant="body2">{contract.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {contract.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={contract.type} 
                      size="small"
                      sx={{
                        bgcolor: 
                          contract.type.includes('Supply') ? 'info.dark' + '22' : 
                          contract.type.includes('Payment') ? 'success.dark' + '22' : 
                          'primary.dark' + '22',
                        color: 
                          contract.type.includes('Supply') ? 'info.main' : 
                          contract.type.includes('Payment') ? 'success.main' : 
                          'primary.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {contract.parties}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${contract.value.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={contract.status} 
                      size="small"
                      sx={{
                        bgcolor: `${contract.statusColor}.dark` + '22',
                        color: `${contract.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{contract.expiryDate.split('-')[2]}/{contract.expiryDate.split('-')[1]}/{contract.expiryDate.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${contract.verifications} nodes`} 
                      size="small"
                      icon={<VerifiedUserIcon />}
                      sx={{
                        bgcolor: 'success.dark' + '22',
                        color: 'success.main',
                        fontWeight: 'medium'
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
  );
};

// Analytics Panel Component
export const AnalyticsPanel: React.FC = () => {
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
      <Card sx={{ mb: 3 }}>
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
                <TableRow hover>
                  <TableCell>Taiwan Semiconductor</TableCell>
                  <TableCell align="right">$324,500</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={72} 
                          sx={{ height: 6, borderRadius: 5 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">72%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="success.main" fontWeight="medium">$6,970</Typography>
                  </TableCell>
                  <TableCell align="right">7</TableCell>
                  <TableCell>
                    <Chip 
                      label="Excellent" 
                      size="small"
                      sx={{ bgcolor: 'success.dark' + '22', color: 'success.main' }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Shenzhen Electronics</TableCell>
                  <TableCell align="right">$298,200</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={85} 
                          sx={{ height: 6, borderRadius: 5 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">85%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="success.main" fontWeight="medium">$7,605</Typography>
                  </TableCell>
                  <TableCell align="right">9</TableCell>
                  <TableCell>
                    <Chip 
                      label="Excellent" 
                      size="small"
                      sx={{ bgcolor: 'success.dark' + '22', color: 'success.main' }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Korea Chip Manufacturing</TableCell>
                  <TableCell align="right">$245,600</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={64} 
                          sx={{ height: 6, borderRadius: 5 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">64%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="success.main" fontWeight="medium">$4,710</Typography>
                  </TableCell>
                  <TableCell align="right">6</TableCell>
                  <TableCell>
                    <Chip 
                      label="Good" 
                      size="small"
                      sx={{ bgcolor: 'info.dark' + '22', color: 'info.main' }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Tokyo Components</TableCell>
                  <TableCell align="right">$189,450</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={68} 
                          sx={{ height: 6, borderRadius: 5 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">68%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="success.main" fontWeight="medium">$3,860</Typography>
                  </TableCell>
                  <TableCell align="right">5</TableCell>
                  <TableCell>
                    <Chip 
                      label="Good" 
                      size="small"
                      sx={{ bgcolor: 'info.dark' + '22', color: 'info.main' }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow hover>
                  <TableCell>Malaysia Circuit Systems</TableCell>
                  <TableCell align="right">$122,580</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ width: '100%', mr: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={38} 
                          sx={{ height: 6, borderRadius: 5 }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">38%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="success.main" fontWeight="medium">$1,395</Typography>
                  </TableCell>
                  <TableCell align="right">4</TableCell>
                  <TableCell>
                    <Chip 
                      label="Average" 
                      size="small"
                      sx={{ bgcolor: 'warning.dark' + '22', color: 'warning.main' }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </>
  );
};
