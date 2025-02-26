import React, { useState, useCallback } from 'react';
import { Box, Typography, Container, Grid, useTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PageTitle from '../../components/common/PageTitle';

// Import components
import PaymentHeader from './components/PaymentHeader';
import PaymentStatusCards from './components/PaymentStatusCards';
import PaymentMethodComparison from './components/PaymentMethodComparison';
import PaymentTrendsChart from './components/PaymentTrendsChart';
import PaymentTable from './components/PaymentTable';
import PaymentFilters from './components/PaymentFilters';
import PaymentActions from './components/PaymentActions';

// Import mock data
import { 
  mockPayments, 
  mockPaymentStatusSummary, 
  mockPaymentMethodComparison,
  mockPaymentTrends,
  mockUser
} from './mockData';

// Import types
import { PaymentFilterState } from './types';

const PaymentsPage: React.FC = () => {
  const theme = useTheme();
  
  // State for payment filters
  const [filters, setFilters] = useState<PaymentFilterState>({
    status: [],
    dateRange: {
      start: null,
      end: null,
    },
    suppliers: [],
    amountRange: {
      min: null,
      max: null,
    },
    paymentMethods: [],
    urgency: [],
  });
  
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Event handlers
  const handleFilterChange = useCallback((newFilters: PaymentFilterState) => {
    setFilters(newFilters);
  }, []);
  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  
  const handleResetFilters = useCallback(() => {
    setFilters({
      status: [],
      dateRange: {
        start: null,
        end: null,
      },
      suppliers: [],
      amountRange: {
        min: null,
        max: null,
      },
      paymentMethods: [],
      urgency: [],
    });
    setSearchQuery('');
  }, []);
  
  // Payment action handlers
  const handleCreatePayment = () => {
    console.log('Create payment');
  };
  
  const handleSchedulePayment = () => {
    console.log('Schedule payment');
  };
  
  const handleViewPayment = (paymentId: string) => {
    console.log('View payment', paymentId);
  };
  
  const handleEditPayment = (paymentId: string) => {
    console.log('Edit payment', paymentId);
  };
  
  const handleCancelPayment = (paymentId: string) => {
    console.log('Cancel payment', paymentId);
  };
  
  const handleProcessPayment = (paymentId: string) => {
    console.log('Process payment', paymentId);
  };
  
  const handleBulkPayment = () => {
    console.log('Bulk payment upload');
  };
  
  const handleViewReports = () => {
    console.log('View payment reports');
  };
  
  const handleManageSuppliers = () => {
    console.log('Manage suppliers');
  };
  
  const handleVerifyPayment = (hash: string) => {
    console.log('Verify payment', hash);
  };
  
  const handlePayNow = () => {
    console.log('Pay now');
  };
  
  const handleReviewSchedule = () => {
    console.log('Review schedule');
  };
  
  const handleViewReceipts = () => {
    console.log('View receipts');
  };
  
  const handleOpenSettings = () => {
    console.log('Open payment settings');
  };
  
  const handleApprovePending = () => {
    console.log('Approve pending payments');
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl" sx={{ pb: 6 }}>
        <PageTitle title="Payments" />
        
        <Grid container spacing={3}>
          {/* Main Content Area - 9 columns */}
          <Grid item xs={12} lg={9}>
            {/* Payment Header */}
            <PaymentHeader 
              pendingAmount={mockPaymentStatusSummary.dueToday.amount + mockPaymentStatusSummary.dueThisWeek.amount}
              ytdSavings={mockUser.ytdSavings}
              pendingPayments={mockPaymentStatusSummary.dueToday.amount > 0 ? 1 : 0}
              onCreatePayment={handleCreatePayment}
              onApprovePending={handleApprovePending}
              onSchedulePayment={handleSchedulePayment}
              onOpenSettings={handleOpenSettings}
            />
            
            {/* Payment Status Cards */}
            <PaymentStatusCards 
              statusSummary={mockPaymentStatusSummary}
              onPayNow={handlePayNow}
              onReviewSchedule={handleReviewSchedule}
              onViewReceipts={handleViewReceipts}
            />
            
            {/* Payment Method Comparison */}
            <PaymentMethodComparison 
              comparisonData={mockPaymentMethodComparison}
            />
            
            {/* Payment Trends Chart */}
            <PaymentTrendsChart 
              trends={mockPaymentTrends}
            />
            
            {/* Payment Filters */}
            <PaymentFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              onReset={handleResetFilters}
            />
            
            {/* Payment Table */}
            <PaymentTable 
              payments={mockPayments}
              onViewPayment={handleViewPayment}
              onEditPayment={handleEditPayment}
              onCancelPayment={handleCancelPayment}
              onProcessPayment={handleProcessPayment}
            />
          </Grid>
          
          {/* Right Sidebar - 3 columns */}
          <Grid item xs={12} lg={3}>
            <PaymentActions 
              onCreatePayment={handleCreatePayment}
              onSchedulePayment={handleSchedulePayment}
              onBulkPayment={handleBulkPayment}
              onViewReports={handleViewReports}
              onManageSuppliers={handleManageSuppliers}
              onVerifyPayment={handleVerifyPayment}
            />
          </Grid>
        </Grid>
      </Container>
    </LocalizationProvider>
  );
};

export default PaymentsPage; 