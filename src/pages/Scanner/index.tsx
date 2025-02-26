import React, { useState, useEffect } from 'react';
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
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Badge,
  Dialog,
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import HistoryIcon from '@mui/icons-material/History';
import BarcodeReaderIcon from '@mui/icons-material/ViewWeek';
import RfidIcon from '@mui/icons-material/SettingsInputAntenna';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import SyncIcon from '@mui/icons-material/Sync';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PageTitle from '../../components/common/PageTitle';
import QRScannerComponent from './components/QRScannerComponent';
import ScanResultView from './components/ScanResultView';
import ScanHistoryTable from './components/ScanHistoryTable';
import { ScanResult, ScanHistory, ScanMode, ProductDetails, ScanMetrics, ScanTechnology } from './types';
import { mockScanHistory as scanHistoryData, mockScanMetrics } from '../../mockData';

// Base card styling
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
const scanMetrics: ScanMetrics = mockScanMetrics;

// Mock scan history
const mockScanHistory: ScanHistory[] = [
  {
    id: 'scan_001',
    productId: 'PROD-A7X-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    action: 'INVENTORY',
    scanTechnology: 'QR_CODE',
    location: 'Austin Warehouse',
    performedBy: 'Michael Chen',
    result: 'SUCCESS',
    systemIntegration: 'SAP ERP'
  },
  {
    id: 'scan_002',
    productId: 'PROD-RF5G-023',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    action: 'TRANSFER',
    scanTechnology: 'BARCODE',
    location: 'Austin Warehouse',
    performedBy: 'Sarah Johnson',
    result: 'SUCCESS',
    systemIntegration: 'Oracle WMS'
  },
  {
    id: 'scan_003',
    productId: 'PROD-FPGA-107',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    action: 'SHIPPING',
    scanTechnology: 'RFID',
    location: 'Austin Warehouse',
    performedBy: 'Michael Chen',
    result: 'SUCCESS'
  },
  {
    id: 'scan_004',
    productId: 'PROD-CAP-512',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    action: 'RECEIPT',
    scanTechnology: 'BARCODE',
    location: 'Austin Warehouse',
    performedBy: 'David Rodriguez',
    result: 'FAILURE',
    notes: 'Barcode damaged, entered manually'
  },
  {
    id: 'scan_005',
    productId: 'PROD-PWR-098',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    action: 'VERIFICATION',
    scanTechnology: 'MANUAL',
    location: 'Austin Warehouse',
    performedBy: 'Michael Chen',
    result: 'SUCCESS',
    systemIntegration: 'SAP ERP'
  },
];

// Mock product details for a successful scan
const mockProductDetails: ProductDetails = {
  id: 'PROD-A7X-001',
  name: 'A7X Microprocessor',
  sku: 'A7X-MP-2023-V2',
  batchNumber: 'BATCH-2023-09-15-001',
  manufacturer: 'Taiwan Semiconductor',
  category: 'SEMICONDUCTOR',
  componentType: 'Microprocessor',
  specifications: {
    'Clock Speed': '3.2 GHz',
    'Cores': '8',
    'Architecture': '7nm',
    'Power Consumption': '65W'
  },
  location: 'Aisle 5, Rack 3, Bin 12',
  warehouse: 'Austin Warehouse',
  quantityAvailable: 150,
  unit: 'UNITS',
  unitPrice: 245.00,
  status: 'IN_STOCK',
  manufacturingDate: '2023-09-15',
  expiryDate: '2028-09-15',
  certifications: ['ISO-9001', 'RoHS', 'REACH'],
  customsStatus: 'CLEARED',
  hazardousMaterial: false
};

// Create a mock scan result
const createMockScanResult = (productId: string, batchNumber: string, scanMode: ScanMode, scanTechnology: ScanTechnology): ScanResult => {
  return {
    id: `SCAN-${Date.now()}`,
    timestamp: new Date().toISOString(),
    productId,
    batchNumber,
    status: 'VERIFIED',
    scannedBy: currentUser.name,
    location: currentUser.location,
    scanTechnology,
    details: {
      productName: 'Industrial Component XYZ',
      manufacturer: 'TechComponents International',
      manufacturingDate: '2023-05-15',
      expiryDate: '2025-05-15',
      certifications: ['ISO9001', 'CE'],
    },
    scanMode,
    blockchainVerified: true,
    blockchainTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    notes: 'High-quality component from trusted supplier',
    productDetails: mockProductDetails
  };
};

// Define MetricCard component for scanner metrics
const MetricCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}> = ({ title, value, icon, color = 'primary' }) => (
  <Grid item xs={6} sm={4} md={2}>
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

const ScannerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanMode, setScanMode] = useState<ScanMode>('INVENTORY');
  const [scanTechnology, setScanTechnology] = useState<ScanTechnology>('QR_CODE');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<ScanResult | null>(null);
  const [integrationEnabled, setIntegrationEnabled] = useState({
    erp: true,
    wms: true,
    autoSync: true
  });
  const [techMenuAnchor, setTechMenuAnchor] = useState<null | HTMLElement>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  
  // Initialize scan history on component mount
  useEffect(() => {
    // In a real app, this would be an API call to fetch scan history
    setScanHistory(mockScanHistory.map(item => 
      createMockScanResult(item.productId, 'BATCH-123', item.action, item.scanTechnology)
    ));
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenScanner = () => {
    setScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setScannerOpen(false);
  };

  const handleScanModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: ScanMode | null,
  ) => {
    if (newMode !== null) {
      setScanMode(newMode);
    }
  };

  const handleScanTechnologyChange = (
    event: React.MouseEvent<HTMLElement>,
    newTechnology: ScanTechnology | null,
  ) => {
    if (newTechnology !== null) {
      setScanTechnology(newTechnology);
    }
  };

  const handleStartScan = () => {
    setIsScanning(true);
    handleOpenScanner();
  };

  const handleScanComplete = (result: { productId: string; batchNumber: string; type: string }) => {
    // Close the scanner dialog
    handleCloseScanner();
    setIsScanning(false);
    
    // Create a mock scan result - in a real app, we would fetch this from an API
    const newScanResult = createMockScanResult(
      result.productId,
      result.batchNumber,
      scanMode,
      scanTechnology
    );
    
    // Add to scan history
    setScanHistory(prev => [newScanResult, ...prev]);
    
    // Show the scan result
    setScanResult(newScanResult);
  };

  const handleClearResult = () => {
    setScanResult(null);
  };

  const handleInventoryUpdate = () => {
    // This would update inventory in a real app
    console.log('Updating inventory for product:', scanResult?.productId);
    handleClearResult();
  };

  const handleStartTransfer = () => {
    // This would navigate to the transfer page in a real app
    console.log('Starting transfer for product:', scanResult?.productId);
    handleClearResult();
  };

  const handleStartShipping = () => {
    // This would navigate to the shipping page in a real app
    console.log('Starting shipping for product:', scanResult?.productId);
    handleClearResult();
  };

  const handleViewScanHistory = () => {
    setShowHistory(true);
    setScanResult(null);
  };

  const handleViewHistoryDetails = (item: ScanResult) => {
    setSelectedHistoryItem(item);
  };

  const handleCloseHistoryDetails = () => {
    setSelectedHistoryItem(null);
  };

  const handleIntegrationToggle = (integration: 'erp' | 'wms' | 'autoSync') => {
    setIntegrationEnabled(prev => ({
      ...prev,
      [integration]: !prev[integration]
    }));
  };

  const handleSyncWithExternalSystems = () => {
    // This would sync with external systems in a real app
    console.log('Syncing with external systems');
  };

  const handleOpenTechMenu = (event: React.MouseEvent<HTMLElement>) => {
    setTechMenuAnchor(event.currentTarget);
  };

  const handleCloseTechMenu = () => {
    setTechMenuAnchor(null);
  };

  const handleSelectTechnology = (tech: ScanTechnology) => {
    setScanTechnology(tech);
    handleCloseTechMenu();
  };

  const getTechIcon = (tech: ScanTechnology) => {
    switch (tech) {
      case 'QR_CODE':
        return <QrCodeIcon />;
      case 'BARCODE':
        return <BarcodeReaderIcon />;
      case 'RFID':
        return <RfidIcon />;
      case 'MANUAL':
        return <KeyboardIcon />;
      default:
        return <QrCodeIcon />;
    }
  };

  const getTechName = (tech: ScanTechnology) => {
    switch (tech) {
      case 'QR_CODE':
        return 'QR Code';
      case 'BARCODE':
        return 'Barcode';
      case 'RFID':
        return 'RFID';
      case 'MANUAL':
        return 'Manual Entry';
      default:
        return 'Unknown';
    }
  };

  return (
    <Container maxWidth="xl">
      <PageTitle title="Scanner" />
      
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="scanner tabs">
          <Tab label="Scanner" icon={<QrCodeScannerIcon />} iconPosition="start" />
          <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
        </Tabs>
      </Box>
      
      {/* Scanner Tab */}
      {activeTab === 0 && (
        <>
          {/* Scanner Header */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Supply Chain Scanner
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Scan QR codes, barcodes, or RFID tags to view, update, or transfer items in your supply chain.
                  All scans are securely recorded on the blockchain for maximum traceability and accountability.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<QrCodeScannerIcon />}
                  onClick={handleStartScan}
                  sx={{ mr: 2 }}
                >
                  Start Scan
                </Button>
                <Tooltip title="Scan Technology">
                  <Button
                    variant="outlined"
                    onClick={handleOpenTechMenu}
                    startIcon={getTechIcon(scanTechnology)}
                  >
                    {getTechName(scanTechnology)}
                  </Button>
                </Tooltip>
                <Menu
                  anchorEl={techMenuAnchor}
                  open={Boolean(techMenuAnchor)}
                  onClose={handleCloseTechMenu}
                >
                  <MenuItem onClick={() => handleSelectTechnology('QR_CODE')}>
                    <ListItemIcon>
                      <QrCodeIcon />
                    </ListItemIcon>
                    <ListItemText>QR Code</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleSelectTechnology('BARCODE')}>
                    <ListItemIcon>
                      <BarcodeReaderIcon />
                    </ListItemIcon>
                    <ListItemText>Barcode</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleSelectTechnology('RFID')}>
                    <ListItemIcon>
                      <RfidIcon />
                    </ListItemIcon>
                    <ListItemText>RFID</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={() => handleSelectTechnology('MANUAL')}>
                    <ListItemIcon>
                      <KeyboardIcon />
                    </ListItemIcon>
                    <ListItemText>Manual Entry</ListItemText>
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Box>
          
          {/* Scan Mode Selection */}
          <Box sx={{ mb: 4 }}>
            <DashboardCard>
              <Box className="card-header">
                <Typography variant="h6">Select Scan Mode</Typography>
              </Box>
              <Box className="card-content">
                <ToggleButtonGroup
                  value={scanMode}
                  exclusive
                  onChange={handleScanModeChange}
                  aria-label="scan mode"
                  fullWidth
                >
                  <ToggleButton value="INVENTORY" aria-label="inventory">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                      <InventoryIcon sx={{ mb: 1 }} />
                      <Typography variant="body2">Inventory</Typography>
                    </Box>
                  </ToggleButton>
                  
                  <ToggleButton value="TRANSFER" aria-label="transfer">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                      <LocalShippingIcon sx={{ mb: 1 }} />
                      <Typography variant="body2">Transfer</Typography>
                    </Box>
                  </ToggleButton>
                  
                  <ToggleButton value="RECEIPT" aria-label="receipt">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                      <ReceiptIcon sx={{ mb: 1 }} />
                      <Typography variant="body2">Receipt</Typography>
                    </Box>
                  </ToggleButton>
                  
                  <ToggleButton value="SHIPPING" aria-label="shipping">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                      <LocalShippingIcon sx={{ mb: 1 }} />
                      <Typography variant="body2">Shipping</Typography>
                    </Box>
                  </ToggleButton>
                  
                  <ToggleButton value="VERIFICATION" aria-label="verification">
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1 }}>
                      <FactCheckIcon sx={{ mb: 1 }} />
                      <Typography variant="body2">Verification</Typography>
                    </Box>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </DashboardCard>
          </Box>
          
          {/* Scan Metrics */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Today's Scan Metrics</Typography>
            <Grid container spacing={2}>
              <MetricCard title="Total Scans" value={scanMetrics.totalScansToday} icon={<QrCodeScannerIcon />} />
              <MetricCard title="Successful" value={scanMetrics.successfulScans} icon={<FactCheckIcon />} color="success" />
              <MetricCard title="Failed" value={scanMetrics.failedScans} icon={<ErrorOutlineIcon />} color="error" />
              <MetricCard title="Products" value={scanMetrics.productsScanned} icon={<InventoryIcon />} color="info" />
              <MetricCard title="Location Changes" value={scanMetrics.locationChanges} icon={<LocalShippingIcon />} color="warning" />
              <MetricCard title="Syncs" value={scanMetrics.externalSystemSyncs} icon={<SyncIcon />} color="secondary" />
            </Grid>
          </Box>
          
          {/* System Integration */}
          <Box sx={{ mb: 4 }}>
            <DashboardCard>
              <Box className="card-header">
                <Typography variant="h6">System Integrations</Typography>
                <Tooltip title="Sync with external systems now">
                  <IconButton onClick={handleSyncWithExternalSystems}>
                    <SyncIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box className="card-content">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={integrationEnabled.erp} 
                          onChange={() => handleIntegrationToggle('erp')} 
                        />
                      }
                      label="ERP Integration"
                    />
                    <Typography variant="body2" color="textSecondary">
                      Automatically sync scan data with your ERP system
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={integrationEnabled.wms} 
                          onChange={() => handleIntegrationToggle('wms')} 
                        />
                      }
                      label="WMS Integration"
                    />
                    <Typography variant="body2" color="textSecondary">
                      Automatically sync scan data with your WMS
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={integrationEnabled.autoSync} 
                          onChange={() => handleIntegrationToggle('autoSync')} 
                        />
                      }
                      label="Auto Blockchain Sync"
                    />
                    <Typography variant="body2" color="textSecondary">
                      Automatically record all scans on the blockchain
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </DashboardCard>
          </Box>
          
          {/* Recent Scan History */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Recent Scans</Typography>
              <Button 
                variant="text" 
                endIcon={<HistoryIcon />}
                onClick={handleViewScanHistory}
              >
                View All History
              </Button>
            </Box>
            <ScanHistoryTable scanHistory={scanHistory.slice(0, 5)} onViewDetails={handleViewHistoryDetails} />
          </Box>
        </>
      )}
      
      {/* History Tab */}
      {activeTab === 1 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3 }}>Scan History</Typography>
          <ScanHistoryTable scanHistory={scanHistory} onViewDetails={handleViewHistoryDetails} />
        </Box>
      )}
      
      {/* QR Scanner Dialog */}
      <QRScannerComponent
        open={scannerOpen}
        onClose={handleCloseScanner}
        onScan={handleScanComplete}
        title={`${getTechName(scanTechnology)} Scanner`}
        scanMode={scanMode}
        scanTechnology={scanTechnology}
      />
      
      {/* Scan Result Dialog */}
      {scanResult && (
        <Dialog
          open={Boolean(scanResult)}
          onClose={handleClearResult}
          maxWidth="md"
          fullWidth
          PaperProps={{ 
            sx: { 
              borderRadius: 0,
              maxHeight: '90vh',
              overflowY: 'auto'
            } 
          }}
        >
          <Box sx={{ p: 3 }}>
            <ScanResultView
              scanResult={scanResult}
              onInventoryUpdate={handleInventoryUpdate}
              onStartTransfer={handleStartTransfer}
              onStartShipping={handleStartShipping}
              onClose={handleClearResult}
            />
          </Box>
        </Dialog>
      )}
      
      {/* History Item Details Dialog */}
      {selectedHistoryItem && (
        <Dialog
          open={Boolean(selectedHistoryItem)}
          onClose={handleCloseHistoryDetails}
          maxWidth="md"
          fullWidth
          PaperProps={{ 
            sx: { 
              borderRadius: 0,
              maxHeight: '90vh',
              overflowY: 'auto'
            } 
          }}
        >
          <Box sx={{ p: 3 }}>
            <ScanResultView
              scanResult={selectedHistoryItem}
              onClose={handleCloseHistoryDetails}
            />
          </Box>
        </Dialog>
      )}
    </Container>
  );
};

export default ScannerPage; 