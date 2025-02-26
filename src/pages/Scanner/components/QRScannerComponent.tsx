import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Alert,
  Switch,
  FormControlLabel,
  CircularProgress,
  TextField,
  Paper,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { ScanMode, ScanTechnology } from '../types';
import QRScanner from './QRScanner';

interface QRScannerComponentProps {
  open: boolean;
  onClose: () => void;
  onScan: (result: { productId: string; batchNumber: string; type: string }) => void;
  title?: string;
  scanMode: ScanMode;
  scanTechnology?: ScanTechnology;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({
  open,
  onClose,
  onScan,
  title = 'Scan QR Code',
  scanMode,
  scanTechnology = 'QR_CODE',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFrontCamera, setUseFrontCamera] = useState(false);
  const [manualInput, setManualInput] = useState({
    productId: '',
    batchNumber: '',
    type: 'PRODUCT'
  });

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setError(null);
      setIsLoading(false);
      setManualInput({
        productId: '',
        batchNumber: '',
        type: 'PRODUCT'
      });
    }
  }, [open]);

  const handleQRScan = (data: string) => {
    try {
      // Parse QR code data
      // Expected format: JSON or URL-like string with product ID and batch number
      let parsedData;
      
      try {
        // Try to parse as JSON
        parsedData = JSON.parse(data);
      } catch (e) {
        // If not JSON, try to parse as URL or custom format
        // Format could be: product:PROD-123:BATCH-456 or similar
        const parts = data.split(':');
        if (parts.length >= 3) {
          parsedData = {
            type: parts[0],
            productId: parts[1],
            batchNumber: parts[2]
          };
        } else {
          throw new Error('Invalid QR code format');
        }
      }
      
      const result = {
        productId: parsedData.productId || '',
        batchNumber: parsedData.batchNumber || '',
        type: parsedData.type || 'PRODUCT'
      };
      
      if (!result.productId) {
        throw new Error('Product ID not found in QR code');
      }
      
      onScan(result);
    } catch (err) {
      console.error('Error parsing QR code data:', err, data);
      setError(`Could not parse QR code data: ${(err as Error).message}`);
    }
  };

  const handleQRError = (err: Error) => {
    console.error('QR Scanner error:', err);
    setError(`Scanner error: ${err.message}`);
  };

  const handleManualSubmit = () => {
    if (manualInput.productId && manualInput.batchNumber) {
      onScan(manualInput);
    } else {
      setError('Please fill in all required fields');
    }
  };

  const handleRFIDScan = () => {
    setIsLoading(true);
    // Simulate RFID scan
    setTimeout(() => {
      setIsLoading(false);
      onScan({
        productId: 'PROD-A7X-001',
        batchNumber: 'BATCH-2023-09-15-001',
        type: 'PRODUCT',
      });
    }, 1500);
  };

  const toggleCamera = () => {
    setUseFrontCamera(!useFrontCamera);
  };

  const renderScannerContent = () => {
    switch (scanTechnology) {
      case 'QR_CODE':
      case 'BARCODE':
        return (
          <Box sx={{ position: 'relative', width: '100%', height: 400 }}>
            <QRScanner 
              onScan={handleQRScan}
              onError={handleQRError}
              useFrontCamera={useFrontCamera}
            />
          </Box>
        );
        
      case 'RFID':
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <SettingsInputAntennaIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              RFID Scanner Ready
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Place the RFID tag near the reader to scan
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleRFIDScan}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SettingsInputAntennaIcon />}
            >
              {isLoading ? 'Scanning...' : 'Simulate RFID Scan'}
            </Button>
          </Box>
        );
        
      case 'MANUAL':
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Manual Entry
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Product ID"
                  fullWidth
                  value={manualInput.productId}
                  onChange={(e) => setManualInput({...manualInput, productId: e.target.value})}
                  required
                  error={error?.includes('Product ID')}
                  helperText={error?.includes('Product ID') ? error : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Batch Number"
                  fullWidth
                  value={manualInput.batchNumber}
                  onChange={(e) => setManualInput({...manualInput, batchNumber: e.target.value})}
                  required
                  error={error?.includes('Batch')}
                  helperText={error?.includes('Batch') ? error : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  fullWidth
                  onClick={handleManualSubmit}
                  disabled={!manualInput.productId || !manualInput.batchNumber}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
        
      default:
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Alert severity="error">
              Unsupported scan technology: {scanTechnology}
            </Alert>
          </Box>
        );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 0,
          boxShadow: 8,
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {scanTechnology === 'QR_CODE' && <QrCodeScannerIcon sx={{ mr: 1 }} color="primary" />}
          {scanTechnology === 'BARCODE' && <ViewWeekIcon sx={{ mr: 1 }} color="primary" />}
          {scanTechnology === 'RFID' && <SettingsInputAntennaIcon sx={{ mr: 1 }} color="primary" />}
          {scanTechnology === 'MANUAL' && <KeyboardIcon sx={{ mr: 1 }} color="primary" />}
          <Typography variant="h6">
            {title} - {scanMode.charAt(0) + scanMode.slice(1).toLowerCase()} Mode
          </Typography>
        </Box>
        <IconButton edge="end" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        {error && error !== 'No QR code found in image' && (
          <Alert 
            severity="error" 
            sx={{ m: 2 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}
        
        {renderScannerContent()}
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'space-between', p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box>
          {(scanTechnology === 'QR_CODE' || scanTechnology === 'BARCODE') && (
            <FormControlLabel
              control={
                <Switch 
                  checked={useFrontCamera}
                  onChange={toggleCamera}
                  color="primary"
                />
              }
              label="Use front camera"
            />
          )}
        </Box>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QRScannerComponent; 