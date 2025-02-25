import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  styled,
  SelectChangeEvent,
  Alert,
} from '@mui/material';
import {
  CameraAlt as CameraIcon,
  FlashOn as FlashOnIcon,
  FlashOff as FlashOffIcon,
  Cameraswitch as CameraSwitchIcon,
  QrCodeScanner as QrCodeIcon,
  PhotoLibrary as GalleryIcon,
} from '@mui/icons-material';

// Styled components
const ScannerContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: '100%',
  backgroundColor: theme.palette.common.black,
}));

const VideoElement = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const ScannerOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  boxSizing: 'border-box',
  pointerEvents: 'none',
}));

const ScanFrame = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: `0 0 0 5000px rgba(0, 0, 0, 0.5)`,
  zIndex: 1,
}));

const ScannerControls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 2,
  backdropFilter: 'blur(5px)',
}));

const FileInput = styled('input')({
  display: 'none',
});

interface QRScannerProps {
  onScan: (data: string) => void;
  onError: (error: Error) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load available cameras
  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        
        if (videoDevices.length > 0) {
          setSelectedCamera(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error enumerating devices:', error);
        onError(error as Error);
      }
    };

    getCameras();
  }, [onError]);

  // Start camera when selected camera changes
  useEffect(() => {
    const startCamera = async () => {
      if (!selectedCamera) return;
      
      try {
        setLoading(true);
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        const constraints: MediaStreamConstraints = {
          video: {
            deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        
        setScanning(true);
        setPermissionDenied(false);
      } catch (error) {
        console.error('Error accessing camera:', error);
        if ((error as Error).name === 'NotAllowedError') {
          setPermissionDenied(true);
        }
        onError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedCamera, onError]);

  const handleCameraChange = (event: SelectChangeEvent) => {
    setSelectedCamera(event.target.value);
  };

  const toggleFlash = () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      
      if ('torch' in track.getCapabilities()) {
        const newFlashState = !flash;
        track.applyConstraints({
          advanced: [{ torch: newFlashState } as any],
        });
        setFlash(newFlashState);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // This is a placeholder. In a real app, you'd use a library like jsQR
    // to process the image and extract QR code data
    const reader = new FileReader();
    reader.onload = () => {
      // Simulate a successful scan after file upload
      setTimeout(() => {
        onScan(`file:${file.name}`);
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  // In a real app, this would implement actual QR code detection
  // using a library like jsQR, scanning the video frames periodically
  const scanQRCode = () => {
    // Placeholder for QR code scanning
    // This would typically be done by capturing frames from the video
    // and processing them with a QR code library
    console.log('Scanning QR code...');
    
    // For demo purposes, we'll just simulate a successful scan after a delay
    setTimeout(() => {
      onScan('example-qr-code-data');
    }, 2000);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, margin: '0 auto' }}>
      {permissionDenied ? (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <Button 
              color="inherit" 
              size="small"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          }
        >
          Camera access denied. Please allow camera access to scan QR codes.
        </Alert>
      ) : null}
      
      <ScannerContainer>
        <VideoContainer>
          {loading ? (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%',
                position: 'absolute',
                width: '100%',
              }}
            >
              <CircularProgress />
            </Box>
          ) : null}
          
          <VideoElement 
            ref={videoRef} 
            playsInline 
            muted
          />
          
          <ScanFrame />
          
          <ScannerOverlay>
            <Typography 
              variant="h6" 
              color="white" 
              align="center"
              sx={{ 
                textShadow: '0 0 4px rgba(0,0,0,0.7)',
                backgroundColor: 'rgba(0,0,0,0.3)',
                py: 1,
                borderRadius: 1,
                pointerEvents: 'auto',
              }}
            >
              Position QR code within frame
            </Typography>
          </ScannerOverlay>
          
          <ScannerControls>
            <IconButton 
              color="primary" 
              onClick={toggleFlash}
              disabled={!scanning || loading}
            >
              {flash ? <FlashOnIcon /> : <FlashOffIcon />}
            </IconButton>
            
            <IconButton 
              color="primary" 
              onClick={scanQRCode}
              disabled={!scanning || loading}
            >
              <QrCodeIcon />
            </IconButton>
            
            <FormControl 
              variant="filled" 
              size="small" 
              sx={{ 
                minWidth: 120, 
                '.MuiInputBase-root': { 
                  color: 'white',
                  '&:before, &:after': {
                    borderColor: 'rgba(255,255,255,0.5) !important',
                  },
                },
                '.MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
            >
              <InputLabel id="camera-select-label">Camera</InputLabel>
              <Select
                labelId="camera-select-label"
                value={selectedCamera}
                onChange={handleCameraChange}
                disabled={loading}
              >
                {cameras.map(camera => (
                  <MenuItem key={camera.deviceId} value={camera.deviceId}>
                    {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <label htmlFor="upload-qr">
              <FileInput 
                accept="image/*"
                id="upload-qr"
                type="file"
                onChange={handleFileUpload}
              />
              <IconButton 
                color="primary" 
                component="span"
                disabled={loading}
              >
                <GalleryIcon />
              </IconButton>
            </label>
          </ScannerControls>
        </VideoContainer>
      </ScannerContainer>
      
      <Typography 
        variant="body2" 
        color="textSecondary" 
        align="center" 
        sx={{ mt: 2 }}
      >
        Scan a QR code to identify products, access orders, or verify authenticity
      </Typography>
    </Box>
  );
};

export default QRScanner; 