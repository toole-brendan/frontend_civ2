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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import { ScanMode } from '../types';

interface QRScannerComponentProps {
  open: boolean;
  onClose: () => void;
  onScan: (result: { productId: string; batchNumber: string; type: string }) => void;
  title?: string;
  scanMode: ScanMode;
}

const QRScannerComponent: React.FC<QRScannerComponentProps> = ({
  open,
  onClose,
  onScan,
  title = 'Scan QR Code',
  scanMode,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        if (!open) return;

        // Stop any existing stream
        if (videoRef.current && videoRef.current.srcObject) {
          const existingStream = videoRef.current.srcObject as MediaStream;
          existingStream.getTracks().forEach(track => track.stop());
        }

        const constraints = {
          video: { facingMode: useFrontCamera ? 'user' : 'environment' }
        };

        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setScanning(true);
          setError(null);
        }
      } catch (err) {
        setError('Unable to access camera. Please ensure you have granted camera permissions.');
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setScanning(false);
    };
  }, [open, useFrontCamera]);

  const handleScan = () => {
    // Simulate verification process
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      
      // Different mock data based on the scan mode
      let mockResult;
      
      switch (scanMode) {
        case 'INVENTORY':
          mockResult = {
            productId: 'ETHIO-YIRGACHEFFE-2023',
            batchNumber: 'BATCH-Y2023-04',
            type: 'PRODUCT'
          };
          break;
        case 'TRANSFER':
          mockResult = {
            productId: 'GUAT-HUEHUETENANGO-2023',
            batchNumber: 'BATCH-H2023-08',
            type: 'TRANSFER'
          };
          break;
        case 'SHIPPING':
          mockResult = {
            productId: 'COL-NARIÑO-2023',
            batchNumber: 'BATCH-N2023-12',
            type: 'ORDER'
          };
          break;
        default:
          mockResult = {
            productId: 'KEN-NYERI-2023',
            batchNumber: 'BATCH-N2023-06',
            type: 'PRODUCT'
          };
      }
      
      onScan(mockResult);
      onClose();
    }, 1500);
  };

  const toggleCamera = () => {
    setUseFrontCamera(!useFrontCamera);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">{title} - {scanMode} Mode</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 0,
            paddingBottom: '75%',
            backgroundColor: 'black',
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {scanning && !verifying && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                border: '2px solid white',
                borderRadius: 1,
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
              }}
            />
          )}
          {verifying && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CircularProgress color="primary" />
              <Typography color="white" sx={{ mt: 2 }}>
                Verifying on blockchain...
              </Typography>
            </Box>
          )}
        </Box>
        
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Position the QR code within the frame to scan
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={useFrontCamera}
              onChange={toggleCamera}
              color="primary"
            />
          }
          label="Use front camera"
          sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          variant="outlined"
        >
          Cancel
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={toggleCamera}
            color="primary"
          >
            <FlipCameraIosIcon />
          </IconButton>
          <Button
            onClick={handleScan}
            variant="contained"
            startIcon={<QrCodeScannerIcon />}
            disabled={!scanning || verifying}
          >
            {verifying ? 'Verifying...' : 'Scan'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default QRScannerComponent; 