import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Paper,
  TextField,
  InputAdornment,
  Tooltip,
  Divider,
  styled,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
  Wallet as WalletIcon,
  Receipt as ReceiptIcon,
  QrCode as QRCodeIcon,
} from '@mui/icons-material';

// Simulating QR code component. In a real app, you'd import from a library like 'react-qr-code'
const QRCodePlaceholder = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 250,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

const AddressBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
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
      id={`qr-code-tabpanel-${index}`}
      aria-labelledby={`qr-code-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
  walletAddress?: string;
  transactionId?: string;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  open,
  onClose,
  walletAddress,
  transactionId,
}) => {
  const [tabValue, setTabValue] = useState(walletAddress ? 0 : 1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCopyToClipboard = (text: string | undefined, type: string) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(
      () => {
        setSnackbarMessage(`${type} copied to clipboard!`);
        setSnackbarOpen(true);
      },
      () => {
        setSnackbarMessage('Failed to copy to clipboard');
        setSnackbarOpen(true);
      }
    );
  };

  const handleShareQRCode = () => {
    // In a real app, this would use the Web Share API if available
    if (navigator.share) {
      navigator.share({
        title: tabValue === 0 ? 'My Wallet Address' : 'Transaction Details',
        text: tabValue === 0 
          ? `My wallet address: ${walletAddress}` 
          : `Transaction ID: ${transactionId}`,
        url: window.location.href,
      }).catch(() => {
        setSnackbarMessage('Failed to share');
        setSnackbarOpen(true);
      });
    } else {
      setSnackbarMessage('Sharing not supported on this browser');
      setSnackbarOpen(true);
    }
  };

  const handleDownloadQRCode = () => {
    // This is a simplified version. In a real app, you'd convert the QR code to an image and download it
    setSnackbarMessage('QR Code downloaded');
    setSnackbarOpen(true);
  };

  // In a real app, you would generate QR codes with actual data
  const getQRCodeData = () => {
    return tabValue === 0 
      ? walletAddress || 'No wallet address provided' 
      : transactionId || 'No transaction ID provided';
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="qr-code-dialog-title"
      >
        <DialogTitle id="qr-code-dialog-title" sx={{ m: 0, p: 2 }}>
          <Typography variant="h6">QR Code</Typography>
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
        
        <StyledTabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab 
            icon={<WalletIcon />} 
            label="Wallet Address" 
            disabled={!walletAddress} 
            id="qr-code-tab-0"
            aria-controls="qr-code-tabpanel-0"
          />
          <Tab 
            icon={<ReceiptIcon />} 
            label="Transaction" 
            disabled={!transactionId} 
            id="qr-code-tab-1"
            aria-controls="qr-code-tabpanel-1"
          />
        </StyledTabs>
        
        <StyledDialogContent dividers>
          <TabPanel value={tabValue} index={0}>
            {walletAddress && (
              <>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Scan to view or transfer to this wallet
                </Typography>
                
                <QRCodePlaceholder elevation={0}>
                  <QRCodeIcon fontSize="large" />
                  {/* In a real app, use a QR code library */}
                  {/* <QRCode value={walletAddress} size={230} /> */}
                </QRCodePlaceholder>
                
                <AddressBox>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={walletAddress}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Copy Address">
                            <IconButton
                              edge="end"
                              onClick={() => handleCopyToClipboard(walletAddress, 'Wallet address')}
                            >
                              <CopyIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </AddressBox>
                
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                  Use this QR code to share your wallet address with others.
                </Typography>
              </>
            )}
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            {transactionId && (
              <>
                <Typography variant="subtitle1" gutterBottom align="center">
                  Scan to view transaction details
                </Typography>
                
                <QRCodePlaceholder elevation={0}>
                  <QRCodeIcon fontSize="large" />
                  {/* In a real app, use a QR code library */}
                  {/* <QRCode value={`https://explorer.example.com/tx/${transactionId}`} size={230} /> */}
                </QRCodePlaceholder>
                
                <AddressBox>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    label="Transaction ID"
                    value={transactionId}
                    InputProps={{
                      readOnly: true,
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Copy Transaction ID">
                            <IconButton
                              edge="end"
                              onClick={() => handleCopyToClipboard(transactionId, 'Transaction ID')}
                            >
                              <CopyIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </AddressBox>
                
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                  This QR code contains a link to view this transaction on the blockchain explorer.
                </Typography>
              </>
            )}
          </TabPanel>
        </StyledDialogContent>
        
        <Divider />
        
        <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button 
            startIcon={<DownloadIcon />} 
            onClick={handleDownloadQRCode}
            disabled={!getQRCodeData()}
          >
            Download
          </Button>
          
          <Button 
            variant="contained" 
            startIcon={<ShareIcon />} 
            onClick={handleShareQRCode}
            disabled={!getQRCodeData()}
          >
            Share
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QRCodeModal; 