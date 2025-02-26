import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  styled,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import SendIcon from '@mui/icons-material/Send';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PageTitle from '../../components/common/PageTitle';
import TransactionTable from './components/TransactionTable';
import TransactionFilters from './components/TransactionFilters';
import SmartContractTable from './components/SmartContractTable';
import { TransferModal } from './components/TransferModal';
import { QRCodeModal } from './components/QRCodeModal';

import { 
  Transaction, 
  SmartContract, 
  TransactionFilters as TransactionFiltersType,
  SmartContractFilters as SmartContractFiltersType 
} from './types';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

// Wallet Balance Card
const BalanceCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: 0,
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 60%)',
  }
}));

// Mock data for wallet
const mockWalletBalance = {
  usdcBalance: 245000.00,
  pendingTransactions: 78500.00,
  availableBalance: 166500.00,
  totalTransactionVolume: 1750000.00,
};

// Mock transactions
const mockTransactions: Transaction[] = [
  {
    id: 'tx_12345',
    type: 'payment',
    status: 'confirmed',
    amount: 92000.00,
    timestamp: '2023-10-05T10:30:00Z',
    counterparty: 'Korea Chip Manufacturing',
    counterpartyType: 'supplier',
    relatedOrderId: 'PO-12345',
    blockchainTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: 'tx_12346',
    type: 'receipt',
    status: 'confirmed',
    amount: 45000.00,
    timestamp: '2023-10-01T08:15:00Z',
    counterparty: 'MediTech Devices',
    counterpartyType: 'customer',
    relatedOrderId: 'SO-67890',
    blockchainTxHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
  },
  {
    id: 'tx_12347',
    type: 'refund',
    status: 'pending',
    amount: 3500.00,
    timestamp: '2023-10-10T14:45:00Z',
    counterparty: 'Robotics Solutions Inc.',
    counterpartyType: 'customer',
    relatedOrderId: 'SO-67891',
    notes: 'Partial refund for defective components',
  },
  {
    id: 'tx_12348',
    type: 'transfer',
    status: 'confirmed',
    amount: 50000.00,
    timestamp: '2023-09-28T11:20:00Z',
    counterparty: 'San Jose Warehouse',
    counterpartyType: 'internal',
    blockchainTxHash: '0x2468013579abcdef2468013579abcdef2468013579abcdef2468013579abcdef',
  },
  {
    id: 'tx_12349',
    type: 'payment',
    status: 'failed',
    amount: 78500.00,
    timestamp: '2023-09-25T16:30:00Z',
    counterparty: 'Shenzhen Electronics',
    counterpartyType: 'supplier',
    notes: 'Payment failed due to pending quality verification',
  },
];

// Mock smart contracts
const mockSmartContracts: SmartContract[] = [
  {
    id: 'sc_12345',
    name: 'Taiwan Semiconductor Purchase Agreement',
    type: 'payment',
    status: 'active',
    createdDate: '2023-09-15T10:00:00Z',
    updatedDate: '2023-09-15T10:00:00Z',
    triggerConditions: ['Delivery confirmation', 'Quality check passed', 'Customs clearance verified'],
    associatedParties: ['Taiwan Semiconductor', 'TechComponents International'],
    totalValue: 125000.00,
    blockchainAddress: '0x1234567890abcdef1234567890abcdef1234567890',
    relatedOrderIds: ['PO-12345'],
  },
  {
    id: 'sc_12346',
    name: 'MediTech Devices Delivery Escrow',
    type: 'escrow',
    status: 'executed',
    createdDate: '2023-09-01T08:00:00Z',
    updatedDate: '2023-09-10T14:30:00Z',
    expiryDate: '2023-10-01T08:00:00Z',
    triggerConditions: ['Delivery confirmation by customer', 'Functional testing completed'],
    associatedParties: ['TechComponents International', 'MediTech Devices', 'Secure Logistics Inc.'],
    totalValue: 45000.00,
    blockchainAddress: '0xabcdef1234567890abcdef1234567890abcdef1234',
    relatedOrderIds: ['SO-67890'],
  },
  {
    id: 'sc_12347',
    name: 'Shenzhen Electronics Partial Payment',
    type: 'payment',
    status: 'draft',
    createdDate: '2023-10-01T09:15:00Z',
    updatedDate: '2023-10-01T09:15:00Z',
    triggerConditions: ['Partial delivery confirmation', 'Quality check passed on received items'],
    associatedParties: ['Shenzhen Electronics', 'TechComponents International'],
    totalValue: 78500.00,
    blockchainAddress: '0x9876543210fedcba9876543210fedcba9876543210',
  },
  {
    id: 'sc_12348',
    name: 'Inventory Level-Based Payment',
    type: 'custom',
    status: 'active',
    createdDate: '2023-09-20T11:30:00Z',
    updatedDate: '2023-09-20T11:30:00Z',
    triggerConditions: ['Inventory level below 200 units', 'Automatic reorder', 'Payment on shipment'],
    associatedParties: ['Korea Chip Manufacturing', 'TechComponents International'],
    totalValue: 35000.00,
    blockchainAddress: '0x5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a',
  },
];

// Mock data for recipients (to use with TransferModal)
const mockRecipients = [
  { id: '1', name: 'Taiwan Semiconductor', type: 'supplier' as const, walletAddress: '0x1a2b3c4d5e6f7g8h9i0j' },
  { id: '2', name: 'Shenzhen Electronics', type: 'supplier' as const, walletAddress: '0x9i8h7g6f5e4d3c2b1a0' },
  { id: '3', name: 'MediTech Devices', type: 'customer' as const, walletAddress: '0x2b3c4d5e6f7g8h9i0j1a' },
  { id: '4', name: 'Korea Chip Manufacturing', type: 'supplier' as const, walletAddress: '0x8h9i0j1a2b3c4d5e6f7g' },
  { id: '5', name: 'San Jose Warehouse', type: 'internal' as const, walletAddress: '0x5e6f7g8h9i0j1a2b3c4d' },
  { id: '6', name: 'Guadalajara Warehouse', type: 'internal' as const, walletAddress: '0x3c4d5e6f7g8h9i0j1a2b' },
  { id: '7', name: 'Robotics Solutions Inc.', type: 'customer' as const, walletAddress: '0x7g8h9i0j1a2b3c4d5e6f' },
];

// Define MetricCard component for wallet metrics
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}> = ({ title, value, icon, color = 'primary' }) => (
  <Grid item xs={12} sm={6} md={3}>
    <DashboardCard elevation={0}>
      <Box className="card-content" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: `${color}.light`,
              color: `${color}.main`,
            }}
          >
            {icon}
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
    </DashboardCard>
  </Grid>
);

const Wallet: React.FC = () => {
  // State for tab selection
  const [currentTab, setCurrentTab] = useState(0);

  // State for filters
  const [transactionFilters, setTransactionFilters] = useState<TransactionFiltersType>({
    search: '',
    type: '',
    status: '',
    counterpartyType: '',
    counterparty: '',
    dateRange: {
      start: null,
      end: null,
    },
    minAmount: null,
    maxAmount: null,
  });

  const [contractFilters, setContractFilters] = useState<SmartContractFiltersType>({
    search: '',
    type: '',
    status: '',
    party: '',
    dateRange: {
      start: null,
      end: null,
    },
  });

  // State for modals
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Handlers for tab changes
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Format amount as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <AccountBalanceWalletIcon sx={{ mr: 2 }} />
        <PageTitle variant="h5">Wallet</PageTitle>
      </Box>

      {/* Wallet Balance Card */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <BalanceCard>
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h6" color="inherit" sx={{ opacity: 0.8, mb: 2 }}>
                USDC BALANCE
              </Typography>
              <Typography variant="h3" color="inherit" sx={{ mb: 3 }}>
                {formatCurrency(mockWalletBalance.usdcBalance)}
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
                    Pending
                  </Typography>
                  <Typography variant="h6" color="inherit">
                    {formatCurrency(mockWalletBalance.pendingTransactions)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="inherit" sx={{ opacity: 0.8 }}>
                    Available
                  </Typography>
                  <Typography variant="h6" color="inherit">
                    {formatCurrency(mockWalletBalance.availableBalance)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </BalanceCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Grid container spacing={3} height="100%">
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<SendIcon />}
                onClick={() => setIsTransferModalOpen(true)}
                sx={{ height: '100%', borderRadius: 0 }}
              >
                Transfer Funds
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<QrCodeIcon />}
                onClick={() => setIsQrModalOpen(true)}
                sx={{ height: '100%', borderRadius: 0 }}
              >
                Show Wallet QR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Tabs for transactions and smart contracts */}
      <DashboardCard elevation={0} sx={{ mb: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Transactions" icon={<ReceiptIcon />} />
          <Tab label="Smart Contracts" icon={<DescriptionIcon />} />
        </Tabs>
      </DashboardCard>

      {/* Main Content */}
      {currentTab === 0 ? (
        <DashboardCard elevation={0}>
          <Box className="card-header">
            <Typography variant="subtitle2">Transaction History</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {/* Transaction filters */}
            <TransactionFilters 
              filters={transactionFilters}
              onFilterChange={setTransactionFilters}
              onClearFilters={() => setTransactionFilters({
                search: '',
                type: '',
                status: '',
                counterpartyType: '',
                counterparty: '',
                dateRange: {
                  start: null,
                  end: null,
                },
                minAmount: null,
                maxAmount: null,
              })}
            />
            
            {/* Transaction table */}
            <TransactionTable 
              transactions={mockTransactions}
              isLoading={false}
              onViewTransaction={(transaction) => console.log('View transaction', transaction)}
              onExportTransactions={(transactionIds) => console.log('Export transactions', transactionIds)}
              onGenerateReceipt={(transaction) => console.log('Generate receipt for', transaction)}
            />
          </Box>
        </DashboardCard>
      ) : (
        <DashboardCard elevation={0}>
          <Box className="card-header">
            <Typography variant="subtitle2">Smart Contracts</Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            {/* Smart contract filters */}
            <Typography variant="body2" sx={{ mb: 2 }}>
              Smart contract filters placeholder
            </Typography>
            
            {/* Smart contract table */}
            <SmartContractTable 
              contracts={mockSmartContracts}
              isLoading={false}
              onViewContract={(contract) => console.log('View contract', contract)}
              onExecuteContract={(contract) => console.log('Execute contract', contract)}
              onCancelContract={(contract) => console.log('Cancel contract', contract)}
              onDuplicateContract={(contract) => console.log('Duplicate contract', contract)}
              onUpdateContract={(contract) => console.log('Update contract', contract)}
            />
          </Box>
        </DashboardCard>
      )}

      {/* Modals */}
      {isTransferModalOpen && (
        <TransferModal
          open={isTransferModalOpen}
          onClose={() => setIsTransferModalOpen(false)}
          currentBalance={mockWalletBalance.usdcBalance}
          recipients={mockRecipients}
          onTransfer={async (data) => {
            console.log('Transfer initiated:', data);
            return true; // Simulate successful transfer
          }}
        />
      )}
      
      {isQrModalOpen && (
        <QRCodeModal
          open={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          walletAddress="0xD8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
          transactionId=""
        />
      )}
    </Container>
  );
};

export default Wallet; 