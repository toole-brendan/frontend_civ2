import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  CircularProgress,
  Chip,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  VerifiedUser as VerifiedIcon,
  Warning as WarningIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrderIcon,
  QrCode as QrCodeIcon,
  Check as CheckIcon,
  ReceiptLong as ReceiptIcon,
  Link as LinkIcon,
  LocationOn as LocationIcon,
  History as HistoryIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2, 3),
  },
}));

const InfoTable = styled(TableContainer)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTableCell-root': {
    borderBottom: 'none',
    padding: theme.spacing(1, 2),
  },
  '& .MuiTableCell-head': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    width: '40%',
  },
}));

const QRDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scan-result-tabpanel-${index}`}
      aria-labelledby={`scan-result-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

type ScanResultType = 'product' | 'order' | 'location' | 'document' | 'unknown';

interface ScanResultItemBase {
  id: string;
  type: ScanResultType;
  isAuthentic: boolean;
  scannedTimestamp: string;
  rawData: string;
}

interface ProductScanResult extends ScanResultItemBase {
  type: 'product';
  name: string;
  sku: string;
  category: string;
  quantity: number;
  location: string;
  imageUrl?: string;
  manufacturer: string;
  manufactureDate: string;
}

interface OrderScanResult extends ScanResultItemBase {
  type: 'order';
  orderNumber: string;
  orderType: 'purchase' | 'sales' | 'return';
  status: string;
  customer: string;
  orderDate: string;
  items: { id: string; name: string; quantity: number }[];
}

interface LocationScanResult extends ScanResultItemBase {
  type: 'location';
  warehouse: string;
  section: string;
  aisle: string;
  shelf: string;
  available: boolean;
}

interface DocumentScanResult extends ScanResultItemBase {
  type: 'document';
  title: string;
  documentType: string;
  issueDate: string;
  expiryDate?: string;
  issuer: string;
}

interface UnknownScanResult extends ScanResultItemBase {
  type: 'unknown';
}

type ScanResult = ProductScanResult | OrderScanResult | LocationScanResult | DocumentScanResult | UnknownScanResult;

interface ScanResultModalProps {
  open: boolean;
  onClose: () => void;
  scanData: string;
  onViewDetails: (result: ScanResult) => void;
  onAddToInventory?: (result: ProductScanResult) => void;
  onAddToOrder?: (result: ProductScanResult) => void;
  onNavigateToLocation?: (result: LocationScanResult) => void;
  onVerifyDocument?: (result: DocumentScanResult) => void;
}

export const ScanResultModal: React.FC<ScanResultModalProps> = ({
  open,
  onClose,
  scanData,
  onViewDetails,
  onAddToInventory,
  onAddToOrder,
  onNavigateToLocation,
  onVerifyDocument,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (!open || !scanData) return;

    setLoading(true);

    // In a real app, this would be an API call to decode the QR data
    const fetchScanResult = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock result based on the scan data
        if (scanData.startsWith('product:')) {
          setScanResult({
            id: 'prod-123',
            type: 'product',
            name: 'Wireless Headphones',
            sku: 'WH-BT100',
            category: 'Electronics',
            quantity: 45,
            location: 'Warehouse A, Section 3, Aisle 2, Shelf 4',
            manufacturer: 'TechAudio Inc.',
            manufactureDate: '2023-06-15',
            isAuthentic: true,
            scannedTimestamp: new Date().toISOString(),
            rawData: scanData,
          });
        } else if (scanData.startsWith('order:')) {
          setScanResult({
            id: 'ord-456',
            type: 'order',
            orderNumber: 'SO-29845',
            orderType: 'sales',
            status: 'Processing',
            customer: 'Acme Corporation',
            orderDate: '2023-09-20',
            items: [
              { id: 'item1', name: 'Laptop', quantity: 2 },
              { id: 'item2', name: 'Monitor', quantity: 3 },
            ],
            isAuthentic: true,
            scannedTimestamp: new Date().toISOString(),
            rawData: scanData,
          });
        } else if (scanData.startsWith('location:')) {
          setScanResult({
            id: 'loc-789',
            type: 'location',
            warehouse: 'Warehouse B',
            section: 'Section 2',
            aisle: 'Aisle 5',
            shelf: 'Shelf 1',
            available: true,
            isAuthentic: true,
            scannedTimestamp: new Date().toISOString(),
            rawData: scanData,
          });
        } else if (scanData.startsWith('document:')) {
          setScanResult({
            id: 'doc-101',
            type: 'document',
            title: 'Certificate of Authenticity',
            documentType: 'Certificate',
            issueDate: '2023-05-10',
            expiryDate: '2024-05-10',
            issuer: 'GlobalCert Authority',
            isAuthentic: true,
            scannedTimestamp: new Date().toISOString(),
            rawData: scanData,
          });
        } else {
          setScanResult({
            id: 'unknown',
            type: 'unknown',
            isAuthentic: false,
            scannedTimestamp: new Date().toISOString(),
            rawData: scanData,
          });
        }
      } catch (error) {
        console.error('Error fetching scan result:', error);
        setScanResult({
          id: 'error',
          type: 'unknown',
          isAuthentic: false,
          scannedTimestamp: new Date().toISOString(),
          rawData: scanData,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchScanResult();
  }, [open, scanData]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleViewDetails = () => {
    if (scanResult) {
      onViewDetails(scanResult);
      onClose();
    }
  };

  const renderScanResultContent = () => {
    if (!scanResult) return null;

    switch (scanResult.type) {
      case 'product':
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ mr: 2 }}>
                <InventoryIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="h6">{scanResult.name}</Typography>
                <Typography variant="body2" color="textSecondary">SKU: {scanResult.sku}</Typography>
              </Box>
            </Box>

            <Chip 
              icon={scanResult.isAuthentic ? <VerifiedIcon /> : <WarningIcon />}
              label={scanResult.isAuthentic ? 'Authentic Product' : 'Authenticity Unknown'}
              color={scanResult.isAuthentic ? 'success' : 'warning'}
              sx={{ mb: 3 }}
            />

            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="scan result tabs"
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
            >
              <Tab label="Details" icon={<InfoIcon />} id="scan-result-tab-0" />
              <Tab label="Location" icon={<LocationIcon />} id="scan-result-tab-1" />
              <Tab label="History" icon={<HistoryIcon />} id="scan-result-tab-2" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Paper variant="outlined">
                <InfoTable>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">Category</TableCell>
                        <TableCell>{scanResult.category}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Quantity</TableCell>
                        <TableCell>{scanResult.quantity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Manufacturer</TableCell>
                        <TableCell>{scanResult.manufacturer}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">Manufacture Date</TableCell>
                        <TableCell>{formatDate(scanResult.manufactureDate)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </InfoTable>
              </Paper>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="body1" gutterBottom>
                Current Location:
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {scanResult.location}
              </Typography>
              
              <Button 
                variant="outlined" 
                startIcon={<LocationIcon />}
                onClick={() => onNavigateToLocation && onNavigateToLocation(scanResult as unknown as LocationScanResult)}
                sx={{ mt: 1 }}
              >
                View on Map
              </Button>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="body2" color="textSecondary">
                Scanned at: {new Date(scanResult.scannedTimestamp).toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                No previous scan history available for this item.
              </Typography>
            </TabPanel>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              {onAddToInventory && (
                <Grid item xs={6}>
                  <Button 
                    fullWidth
                    variant="outlined" 
                    startIcon={<InventoryIcon />}
                    onClick={() => onAddToInventory(scanResult)}
                  >
                    Add to Inventory
                  </Button>
                </Grid>
              )}
              {onAddToOrder && (
                <Grid item xs={6}>
                  <Button 
                    fullWidth
                    variant="outlined" 
                    startIcon={<OrderIcon />}
                    onClick={() => onAddToOrder(scanResult)}
                  >
                    Add to Order
                  </Button>
                </Grid>
              )}
            </Grid>
          </>
        );

      case 'order':
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ mr: 2 }}>
                <OrderIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="h6">Order {scanResult.orderNumber}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {scanResult.orderType.charAt(0).toUpperCase() + scanResult.orderType.slice(1)} Order
                </Typography>
              </Box>
            </Box>

            <Chip 
              icon={<VerifiedIcon />}
              label="Verified Order"
              color="success"
              sx={{ mb: 3 }}
            />

            <Paper variant="outlined">
              <InfoTable>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">Status</TableCell>
                      <TableCell>
                        <Chip 
                          label={scanResult.status} 
                          color={
                            scanResult.status === 'Completed' ? 'success' :
                            scanResult.status === 'Processing' ? 'primary' :
                            scanResult.status === 'Pending' ? 'warning' : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Customer</TableCell>
                      <TableCell>{scanResult.customer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Order Date</TableCell>
                      <TableCell>{formatDate(scanResult.orderDate)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Items</TableCell>
                      <TableCell>{scanResult.items.length}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </InfoTable>
            </Paper>

            <Typography variant="subtitle2" gutterBottom>
              Order Items
            </Typography>

            <Paper variant="outlined">
              <InfoTable>
                <Table size="small">
                  <TableBody>
                    {scanResult.items.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">Qty: {item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </InfoTable>
            </Paper>

            <Typography variant="body2" color="textSecondary">
              Scanned at: {new Date(scanResult.scannedTimestamp).toLocaleString()}
            </Typography>
          </>
        );

      case 'location':
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ mr: 2 }}>
                <LocationIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="h6">Location</Typography>
                <Typography variant="body2" color="textSecondary">
                  {scanResult.warehouse} • {scanResult.section} • {scanResult.aisle} • {scanResult.shelf}
                </Typography>
              </Box>
            </Box>

            <Chip 
              icon={scanResult.available ? <CheckIcon /> : <WarningIcon />}
              label={scanResult.available ? 'Available' : 'Unavailable'}
              color={scanResult.available ? 'success' : 'error'}
              sx={{ mb: 3 }}
            />

            <Paper variant="outlined">
              <InfoTable>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">Warehouse</TableCell>
                      <TableCell>{scanResult.warehouse}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Section</TableCell>
                      <TableCell>{scanResult.section}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Aisle</TableCell>
                      <TableCell>{scanResult.aisle}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Shelf</TableCell>
                      <TableCell>{scanResult.shelf}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </InfoTable>
            </Paper>

            <Typography variant="body2" color="textSecondary">
              Scanned at: {new Date(scanResult.scannedTimestamp).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {onNavigateToLocation && (
              <Button 
                fullWidth
                variant="contained" 
                startIcon={<LocationIcon />}
                onClick={() => onNavigateToLocation(scanResult)}
              >
                Navigate to Location
              </Button>
            )}
          </>
        );

      case 'document':
        return (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ mr: 2 }}>
                <ReceiptIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
              <Box>
                <Typography variant="h6">{scanResult.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {scanResult.documentType}
                </Typography>
              </Box>
            </Box>

            <Chip 
              icon={scanResult.isAuthentic ? <VerifiedIcon /> : <WarningIcon />}
              label={scanResult.isAuthentic ? 'Verified Document' : 'Verification Required'}
              color={scanResult.isAuthentic ? 'success' : 'warning'}
              sx={{ mb: 3 }}
            />

            <Paper variant="outlined">
              <InfoTable>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">Issuer</TableCell>
                      <TableCell>{scanResult.issuer}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">Issue Date</TableCell>
                      <TableCell>{formatDate(scanResult.issueDate)}</TableCell>
                    </TableRow>
                    {scanResult.expiryDate && (
                      <TableRow>
                        <TableCell component="th" scope="row">Expiry Date</TableCell>
                        <TableCell>{formatDate(scanResult.expiryDate)}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </InfoTable>
            </Paper>

            <Typography variant="body2" color="textSecondary">
              Scanned at: {new Date(scanResult.scannedTimestamp).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {onVerifyDocument && (
              <Button 
                fullWidth
                variant="contained" 
                startIcon={<VerifiedIcon />}
                onClick={() => onVerifyDocument(scanResult)}
                color={scanResult.isAuthentic ? 'success' : 'primary'}
              >
                {scanResult.isAuthentic ? 'Document Verified' : 'Verify Document'}
              </Button>
            )}
          </>
        );

      case 'unknown':
      default:
        return (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <WarningIcon sx={{ fontSize: 60, color: theme.palette.warning.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Unknown QR Code
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              The scanned QR code doesn't match any recognized format in our system.
            </Typography>
            <QRDisplay>
              <QrCodeIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {scanData}
              </Typography>
            </QRDisplay>
            <Typography variant="body2" color="textSecondary">
              Scanned at: {new Date(scanResult.scannedTimestamp).toLocaleString()}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="scan-result-dialog-title"
    >
      <DialogTitle id="scan-result-dialog-title" sx={{ m: 0, p: 2 }}>
        <Typography variant="h6">Scan Result</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          renderScanResultContent()
        )}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {!loading && scanResult && scanResult.type !== 'unknown' && (
          <Button 
            variant="contained" 
            endIcon={<ArrowForwardIcon />}
            onClick={handleViewDetails}
          >
            View Full Details
          </Button>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default ScanResultModal; 