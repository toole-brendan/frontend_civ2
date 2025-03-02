import React, { useState } from 'react';
import { 
  Box, 
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  CssBaseline
} from '@mui/material';
import { useTitle } from '@/hooks/useTitle';
import PageHeader from '@/components/common/PageHeader';

// Icons
import BarChartIcon from '@mui/icons-material/BarChart';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DescriptionIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Components
import { 
  OverviewPanel, 
  PaymentsPanel, 
  InvoicesPanel, 
  TransactionsPanel,
  SmartContractsPanel,
  AnalyticsPanel 
} from './components';

// Data
import { 
  cashFlowData, 
  paymentMethodData, 
  upcomingPaymentsData, 
  invoiceData, 
  recentTransactionsData, 
  smartContractData 
} from './data';

const FinancialCenter: React.FC = () => {
  useTitle('Financial Center');
  
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('Shell Token');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenPaymentDialog = (invoice: any) => {
    setSelectedInvoice(invoice);
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
    setPaymentLoading(false);
  };

  const handleProcessPayment = () => {
    setPaymentLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      handleClosePaymentDialog();
    }, 2000);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pb: 8 }}>
        <Box component="main" sx={{ p: 3 }}>
          {/* Page Header */}
          <PageHeader 
            title="Financial Center" 
            subtitle="Manage payments, invoices, and financial transactions with blockchain verification"
          />

          {/* Tabs Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 1 }}
            >
              <Tab 
                label="Overview" 
                icon={<BarChartIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Payments" 
                icon={<PaymentIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Invoices" 
                icon={<ReceiptIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Transactions" 
                icon={<AccountBalanceWalletIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Smart Contracts" 
                icon={<DescriptionIcon />} 
                iconPosition="start"
              />
              <Tab 
                label="Analytics" 
                icon={<TrendingUpIcon />} 
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box role="tabpanel" hidden={tabValue !== 0} id="tabpanel-overview">
            {tabValue === 0 && <OverviewPanel cashFlowData={cashFlowData} paymentMethodData={paymentMethodData} />}
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 1} id="tabpanel-payments">
            {tabValue === 1 && <PaymentsPanel upcomingPayments={upcomingPaymentsData} onProcessPayment={handleOpenPaymentDialog} />}
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 2} id="tabpanel-invoices">
            {tabValue === 2 && <InvoicesPanel invoiceData={invoiceData} onProcessPayment={handleOpenPaymentDialog} />}
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 3} id="tabpanel-transactions">
            {tabValue === 3 && <TransactionsPanel transactions={recentTransactionsData} />}
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 4} id="tabpanel-smartcontracts">
            {tabValue === 4 && <SmartContractsPanel contracts={smartContractData} />}
          </Box>
          <Box role="tabpanel" hidden={tabValue !== 5} id="tabpanel-analytics">
            {tabValue === 5 && <AnalyticsPanel cashFlowData={cashFlowData} paymentMethodData={paymentMethodData} />}
          </Box>
        </Box>
      </Box>

      {/* Payment Dialog */}
      <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Process Payment</DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box sx={{ py: 2 }}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Invoice"
                  fullWidth
                  value={`${selectedInvoice.id} - ${selectedInvoice.supplier}`}
                  disabled
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Amount"
                  fullWidth
                  value={`$${selectedInvoice.amount.toLocaleString()}`}
                  disabled
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  label="Due Date"
                  fullWidth
                  value={selectedInvoice.dueDate}
                  disabled
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  select
                  label="Payment Method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                >
                  <MenuItem value="Shell Token">Shell Token (3% discount)</MenuItem>
                  <MenuItem value="Wire Transfer">Wire Transfer</MenuItem>
                  <MenuItem value="ACH">ACH (1% discount)</MenuItem>
                </TextField>
              </Box>
            </Box>
          )}
          {paymentLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog} disabled={paymentLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleProcessPayment} 
            variant="contained" 
            disabled={paymentLoading}
            startIcon={<PaymentIcon />}
          >
            Process Payment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FinancialCenter;
