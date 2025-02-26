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
import jsQR from 'jsqr';

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
  useFrontCamera?: boolean;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError, useFrontCamera = false }) => {
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const [scanning, setScanning] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Load available cameras
  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameras(videoDevices);
        
        if (videoDevices.length > 0) {
          // If useFrontCamera is true, try to find a front camera
          if (useFrontCamera) {
            const frontCamera = videoDevices.find(device => 
              device.label.toLowerCase().includes('front')
            );
            setSelectedCamera(frontCamera?.deviceId || videoDevices[0].deviceId);
          } else {
            // Otherwise, prefer back camera (environment facing)
            const backCamera = videoDevices.find(device => 
              device.label.toLowerCase().includes('back') || 
              device.label.toLowerCase().includes('rear')
            );
            setSelectedCamera(backCamera?.deviceId || videoDevices[0].deviceId);
          }
        }
      } catch (error) {
        console.error('Error enumerating devices:', error);
        onError(error as Error);
      }
    };

    getCameras();

    // Clean up animation frame on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [onError, useFrontCamera]);

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
            facingMode: useFrontCamera ? 'user' : 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          
          // Start scanning for QR codes once video is playing
          startQRScanning();
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
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [selectedCamera, onError, useFrontCamera]);

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      
      await new Promise((resolve) => {
        image.onload = resolve;
      });
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      
      if (code) {
        onScan(code.data);
      } else {
        onError(new Error('No QR code found in image'));
      }
      
      URL.revokeObjectURL(image.src);
    } catch (error) {
      console.error('Error processing uploaded file:', error);
      onError(error as Error);
    }
  };

  const startQRScanning = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const scanFrame = () => {
      if (!videoRef.current || !canvasRef.current) return;
      
      // Check if video is playing and ready
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        
        // Set canvas dimensions to match video
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        
        // Draw current video frame to canvas
        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        
        // Get image data from canvas
        const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);
        
        // Try to find QR code in the image
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          console.log('QR code detected:', code.data);
          onScan(code.data);
          
          // Stop scanning after detecting a QR code
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
          return;
        }
      }
      
      // Continue scanning
      animationFrameRef.current = requestAnimationFrame(scanFrame);
    };
    
    // Start the scanning loop
    animationFrameRef.current = requestAnimationFrame(scanFrame);
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
          <VideoElement ref={videoRef} playsInline />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          {!loading && (
            <>
              <ScanFrame />
              <ScannerOverlay>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: 'white', 
                    textAlign: 'center', 
                    textShadow: '0 0 4px rgba(0,0,0,0.8)',
                    mb: 2 
                  }}
                >
                  Position QR code inside the frame
                </Typography>
              </ScannerOverlay>
            </>
          )}
          
          {loading && (
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)'
              }}
            >
              <CircularProgress color="primary" />
            </Box>
          )}
        </VideoContainer>
        
        <ScannerControls>
          <FormControl size="small" sx={{ width: 120, pointerEvents: 'auto' }}>
            <InputLabel id="camera-select-label" sx={{ color: 'white' }}>Camera</InputLabel>
            <Select
              labelId="camera-select-label"
              value={selectedCamera}
              label="Camera"
              onChange={handleCameraChange}
              sx={{ 
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.5)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.7)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '.MuiSvgIcon-root': {
                  color: 'white',
                }
              }}
            >
              {cameras.map((camera) => (
                <MenuItem key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {streamRef.current?.getVideoTracks()[0]?.getCapabilities && 
            ('torch' in (streamRef.current?.getVideoTracks()[0]?.getCapabilities() || {})) && (
            <IconButton 
              color="primary" 
              onClick={toggleFlash}
              sx={{ pointerEvents: 'auto' }}
            >
              {flash ? <FlashOffIcon /> : <FlashOnIcon />}
            </IconButton>
          )}
          
          <label htmlFor="upload-qr-image">
            <FileInput
              accept="image/*"
              id="upload-qr-image"
              type="file"
              onChange={handleFileUpload}
            />
            <Button
              component="span"
              startIcon={<GalleryIcon />}
              variant="contained"
              color="primary"
              size="small"
              sx={{ pointerEvents: 'auto' }}
            >
              Upload
            </Button>
          </label>
        </ScannerControls>
      </ScannerContainer>
    </Box>
  );
};

export default QRScanner; 