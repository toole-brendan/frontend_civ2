import React from 'react';
import { 
  Box, 
  Typography, 
  Divider,
  Button,
  Chip,
  alpha,
  useTheme
} from '@mui/material';
import { Grid } from '@/components/common/Grid';

// Icons
import InventoryIcon from '@mui/icons-material/Inventory';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import WarningIcon from '@mui/icons-material/Warning';
import SavingsIcon from '@mui/icons-material/Savings';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TuneIcon from '@mui/icons-material/Tune';
import RefreshIcon from '@mui/icons-material/Refresh';

// Import dashboard components
import {
  KpiStatsCard,
  InventoryChartPanel,
  PaymentChartPanel,
  ShipmentsTable,
  SupplierDistributionPanel
} from './components';

// Dashboard main component
const Dashboard: React.FC = () => {
  const theme = useTheme();
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Main Content */}
        <Box component="main" sx={{ 
          flexGrow: 1, 
          p: 3, 
          overflowY: 'auto',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundColor: 'background.default'
        }}>
          {/* Welcome Header */}
          <Box sx={{ 
            mb: 3, 
            pb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end' 
          }}>
            <Box>
              <Typography variant="h4" fontWeight="500">
                Welcome back, Michael
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Friday, Feb 28, 2025
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12, alignSelf: 'center' }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RefreshIcon sx={{ color: 'text.secondary', fontSize: 12, mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    Last updated: {timeStr}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<TuneIcon fontSize="small" />}
              >
                Filter Data
              </Button>
              <Button 
                variant="contained" 
                size="small" 
                startIcon={<RefreshIcon fontSize="small" />}
              >
                Refresh
              </Button>
            </Box>
          </Box>
          
          {/* KPI Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Total Inventory Value Card */}
            <Grid item xs={12} sm={6} md={3}>
              <KpiStatsCard 
                icon={<InventoryIcon fontSize="small" />}
                title="Total Inventory Value"
                value="$4,285,630"
                subtitle="Current total value of all inventory items"
                trend={true}
                trendValue="+3.2% vs. previous month"
                color={theme.palette.primary.main}
                action={
                  <Button 
                    variant="text" 
                    color="primary" 
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                    sx={{ fontSize: '0.75rem', p: 0 }}
                  >
                    View Details
                  </Button>
                }
              />
            </Grid>
            
            {/* Active Transfers Card */}
            <Grid item xs={12} sm={6} md={3}>
              <KpiStatsCard 
                icon={<SwapHorizIcon fontSize="small" />}
                title="Active Transfers"
                value="18"
                subtitle={
                  <Box>
                    <Typography variant="body2" color="text.secondary">5 inbound / 13 outbound</Typography>
                    <Chip 
                      size="small" 
                      color="error" 
                      label="2 critical" 
                      variant="filled"
                      sx={{ mt: 0.5, height: 18, fontSize: '0.65rem' }}
                    />
                  </Box>
                }
                color={theme.palette.info.main}
                action={
                  <Button 
                    variant="text" 
                    color="info" 
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                    sx={{ fontSize: '0.75rem', p: 0 }}
                  >
                    View Transfers
                  </Button>
                }
              />
            </Grid>
            
            {/* Low Stock Alert Card */}
            <Grid item xs={12} sm={6} md={3}>
              <KpiStatsCard 
                icon={<WarningIcon fontSize="small" />}
                title="Low Stock Items"
                value="3"
                subtitle="Items below reorder point that need attention"
                color={theme.palette.warning.main}
                action={
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip 
                      size="small" 
                      color="error" 
                      label="1 critical"
                      variant="filled"
                      sx={{ height: 18, fontSize: '0.65rem' }}
                    />
                    <Chip 
                      size="small" 
                      color="warning" 
                      label="2 warning"
                      variant="filled"
                      sx={{ height: 18, fontSize: '0.65rem' }}
                    />
                  </Box>
                }
              />
            </Grid>
            
            {/* Shell Token Savings Card */}
            <Grid item xs={12} sm={6} md={3}>
              <KpiStatsCard 
                icon={<SavingsIcon fontSize="small" />}
                title="Shell Token Savings"
                value="$24,850"
                subtitle="Total savings from using Shell tokens"
                trend={true}
                trendValue="18.2% vs. traditional payments"
                color={theme.palette.success.main}
                action={
                  <Button 
                    variant="text" 
                    color="success" 
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />}
                    sx={{ fontSize: '0.75rem', p: 0 }}
                  >
                    View Savings
                  </Button>
                }
              />
            </Grid>
          </Grid>
          
          {/* Charts Section */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Inventory Chart */}
            <Grid item xs={12} md={6}>
              <InventoryChartPanel />
            </Grid>
            
            {/* Payment Methods Chart */}
            <Grid item xs={12} md={6}>
              <PaymentChartPanel />
            </Grid>
          </Grid>
          
          {/* Shipments and Supplier Distribution */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {/* Active Shipments Table */}
            <Grid item xs={12} lg={8}>
              <ShipmentsTable />
            </Grid>
            
            {/* Supplier Distribution */}
            <Grid item xs={12} lg={4}>
              <SupplierDistributionPanel />
            </Grid>
          </Grid>
        </Box>
      </Box>
  );
};

export default Dashboard;
