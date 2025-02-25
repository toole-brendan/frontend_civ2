import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  styled,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HistoryIcon from '@mui/icons-material/History';
import PageTitle from '../../components/common/PageTitle';
import QRScannerComponent from './components/QRScannerComponent';
import ScanResultView from './components/ScanResultView';
import ScanHistoryTable from './components/ScanHistoryTable';
import { ScanResult, ScanHistory, ScanMode, ProductDetails, ScanMetrics } from './types';

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

// Mock data for a user
const currentUser = {
  id: 'USER123',
  name: 'Alex Rodriguez',
  role: 'Warehouse Manager',
  location: 'Seattle Warehouse'
};

// Mock scan metrics
const mockScanMetrics: ScanMetrics = {
  totalScansToday: 47,
  successfulScans: 45,
  failedScans: 2,
  productsScanned: 38,
  locationChanges: 12,
  inventoryUpdates: 22,
};

// Mock scan history
const mockScanHistory: ScanHistory[] = [
  {
    id: 'SCAN-001',
    productId: 'ETHIO-YIRGACHEFFE-2023',
    timestamp: '2023-10-19T09:15:30Z',
    action: 'INVENTORY',
    location: 'Seattle Warehouse - Section A',
    performedBy: 'Alex Rodriguez',
    result: 'SUCCESS',
    notes: 'Regular inventory check'
  },
  {
    id: 'SCAN-002',
    productId: 'GUAT-HUEHUETENANGO-2023',
    timestamp: '2023-10-19T10:22:15Z',
    action: 'TRANSFER',
    location: 'Seattle Warehouse - Loading Bay',
    performedBy: 'Alex Rodriguez',
    result: 'SUCCESS',
    notes: 'Transfer to Portland distribution center'
  },
  {
    id: 'SCAN-003',
    productId: 'COL-NARIÑO-2023',
    timestamp: '2023-10-19T11:45:08Z',
    action: 'SHIPPING',
    location: 'Seattle Warehouse - Loading Bay',
    performedBy: 'Alex Rodriguez',
    result: 'SUCCESS',
    notes: 'Shipment to Blue Bottle Coffee'
  },
  {
    id: 'SCAN-004',
    productId: 'BRA-CERRADO-2023',
    timestamp: '2023-10-19T12:30:22Z',
    action: 'RECEIPT',
    location: 'Seattle Warehouse - Receiving',
    performedBy: 'Alex Rodriguez',
    result: 'SUCCESS',
    notes: 'New shipment from Brazil'
  },
  {
    id: 'SCAN-005',
    productId: 'KEN-NYERI-2023',
    timestamp: '2023-10-19T14:05:45Z',
    action: 'VERIFICATION',
    location: 'Seattle Warehouse - Section B',
    performedBy: 'Alex Rodriguez',
    result: 'FAILURE',
    notes: 'Blockchain verification failed'
  },
];

// Mock product details for scan result
const mockProductDetails: ProductDetails = {
  id: 'ETHIO-YIRGACHEFFE-2023',
  name: 'Ethiopia Yirgacheffe',
  sku: 'COFFEE-ETH-YIR-2023',
  batchNumber: 'BATCH-Y2023-04',
  origin: 'Yirgacheffe, Ethiopia',
  roastLevel: 'MEDIUM',
  processMethod: 'WASHED',
  category: 'GREEN',
  location: 'Aisle 3, Rack 2, Shelf 4',
  warehouse: 'Seattle Warehouse',
  quantityAvailable: 750,
  unit: 'KG',
  unitPrice: 8.75,
  status: 'IN_STOCK',
  harvestDate: '2023-01-15',
  expiryDate: '2024-01-15',
  certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'],
};

// Mock scan result 
const mockScanResult: ScanResult = {
  id: 'SCAN-001',
  productId: 'ETHIO-YIRGACHEFFE-2023',
  scannedAt: '2023-10-19T09:15:30Z',
  scannedBy: 'Alex Rodriguez',
  scanMode: 'INVENTORY',
  location: 'Seattle Warehouse - Section A',
  productDetails: mockProductDetails,
  blockchainVerified: true,
  blockchainTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  notes: 'Regular inventory check',
};

// Define MetricCard component for scan metrics
const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}> = ({ title, value, icon, color = 'primary' }) => (
  <Grid item xs={6} md={4} lg={2}>
    <Card elevation={0} sx={{ borderRadius: 0, border: 1, borderColor: 'divider' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              mr: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: '50%',
              backgroundColor: `${color}.light`,
              color: `${color}.main`,
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

const ScannerPage: React.FC = () => {
  const [scanMode, setScanMode] = useState<ScanMode>('INVENTORY');
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<ScanHistory | null>(null);

  const handleScanModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: ScanMode | null,
  ) => {
    if (newMode !== null) {
      setScanMode(newMode);
    }
  };

  const handleStartScan = () => {
    setIsQRScannerOpen(true);
  };
  
  const handleScanComplete = (result: { productId: string; batchNumber: string; type: string }) => {
    // In a real app, you would fetch product details and create a scan record
    // For now, we'll use mock data with the scanned info
    const newScanResult = {
      ...mockScanResult,
      id: `SCAN-${Math.floor(Math.random() * 10000)}`,
      productId: result.productId,
      scannedAt: new Date().toISOString(),
      scanMode,
      productDetails: {
        ...mockProductDetails,
        id: result.productId,
        batchNumber: result.batchNumber,
      },
    };
    
    setScanResult(newScanResult);
    setShowHistory(false);
  };

  const handleClearResult = () => {
    setScanResult(null);
  };

  const handleInventoryUpdate = () => {
    // In a real app, this would navigate to inventory update form
    console.log('Update inventory for', scanResult?.productId);
  };

  const handleStartTransfer = () => {
    // In a real app, this would navigate to transfer initiation
    console.log('Start transfer for', scanResult?.productId);
  };

  const handleStartShipping = () => {
    // In a real app, this would navigate to shipping initiation
    console.log('Start shipping for', scanResult?.productId);
  };

  const handleViewScanHistory = () => {
    setShowHistory(true);
    setScanResult(null);
  };

  const handleViewHistoryDetails = (scan: ScanHistory) => {
    setSelectedHistoryItem(scan);
  };

  const handleCloseHistoryDetails = () => {
    setSelectedHistoryItem(null);
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <QrCodeIcon sx={{ mr: 2 }} />
        <PageTitle variant="h5">QR Scanner</PageTitle>
      </Box>

      {/* Metrics Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <MetricCard
          title="Total Scans Today"
          value={mockScanMetrics.totalScansToday}
          icon={<QrCodeScannerIcon />}
        />
        <MetricCard
          title="Successful"
          value={mockScanMetrics.successfulScans}
          icon={<FactCheckIcon />}
          color="success"
        />
        <MetricCard
          title="Failed"
          value={mockScanMetrics.failedScans}
          icon={<FactCheckIcon />}
          color="error"
        />
        <MetricCard
          title="Products"
          value={mockScanMetrics.productsScanned}
          icon={<InventoryIcon />}
          color="info"
        />
        <MetricCard
          title="Location Changes"
          value={mockScanMetrics.locationChanges}
          icon={<LocalShippingIcon />}
          color="secondary"
        />
        <MetricCard
          title="Inventory Updates"
          value={mockScanMetrics.inventoryUpdates}
          icon={<InventoryIcon />}
          color="warning"
        />
      </Grid>

      {/* Scan Controls */}
      <DashboardCard elevation={0} sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>
                Select Scan Mode
              </Typography>
              <ToggleButtonGroup
                value={scanMode}
                exclusive
                onChange={handleScanModeChange}
                aria-label="scan mode"
                size="small"
              >
                <ToggleButton value="INVENTORY" aria-label="inventory scan">
                  <InventoryIcon sx={{ mr: 1 }} />
                  Inventory
                </ToggleButton>
                <ToggleButton value="TRANSFER" aria-label="transfer scan">
                  <LocalShippingIcon sx={{ mr: 1 }} />
                  Transfer
                </ToggleButton>
                <ToggleButton value="RECEIPT" aria-label="receipt scan">
                  <ReceiptIcon sx={{ mr: 1 }} />
                  Receipt
                </ToggleButton>
                <ToggleButton value="SHIPPING" aria-label="shipping scan">
                  <LocalShippingIcon sx={{ mr: 1 }} />
                  Shipping
                </ToggleButton>
                <ToggleButton value="VERIFICATION" aria-label="verification scan">
                  <FactCheckIcon sx={{ mr: 1 }} />
                  Verify
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<HistoryIcon />}
                onClick={handleViewScanHistory}
              >
                History
              </Button>
              <Button
                variant="contained"
                startIcon={<QrCodeScannerIcon />}
                onClick={handleStartScan}
              >
                Start Scanning
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DashboardCard>

      {/* Main Content - Either scan result or history */}
      <DashboardCard elevation={0}>
        <Box className="card-header">
          <Typography variant="subtitle2">
            {scanResult 
              ? 'Scan Result' 
              : showHistory 
                ? 'Scan History' 
                : 'Scanner Ready'}
          </Typography>
        </Box>
        <Box className="card-content">
          {scanResult ? (
            <ScanResultView
              scanResult={scanResult}
              onInventoryUpdate={handleInventoryUpdate}
              onStartTransfer={handleStartTransfer}
              onStartShipping={handleStartShipping}
              onClose={handleClearResult}
            />
          ) : showHistory ? (
            selectedHistoryItem ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Scan History Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Button variant="outlined" onClick={handleCloseHistoryDetails}>
                    Back to History
                  </Button>
                </Box>
                <Typography>Detailed view for scan {selectedHistoryItem.id}</Typography>
                {/* In a real app, you'd show full details here */}
              </Box>
            ) : (
              <ScanHistoryTable
                scanHistory={mockScanHistory}
                onViewDetails={handleViewHistoryDetails}
              />
            )
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <QrCodeIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Scanner Ready
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Select a scan mode and click "Start Scanning" to begin
              </Typography>
              <Button
                variant="contained"
                startIcon={<QrCodeScannerIcon />}
                onClick={handleStartScan}
              >
                Start Scanning
              </Button>
            </Box>
          )}
        </Box>
      </DashboardCard>

      {/* QR Scanner Dialog */}
      <QRScannerComponent
        open={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleScanComplete}
        scanMode={scanMode}
      />
    </Container>
  );
};

export default ScannerPage; 