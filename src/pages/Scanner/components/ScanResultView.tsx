import React from 'react';
import {
  Box,
  Typography,
  Paper,
  styled,
  Chip,
  Divider,
  Button,
  Grid,
  Avatar,
  Tooltip,
  Link,
  ButtonGroup,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LinkIcon from '@mui/icons-material/Link';
import { ScanResult } from '../types';

const StyledPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
  boxShadow: 'none',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1.5),
  '& .label': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  '& .value': {
    fontWeight: 600,
    textAlign: 'right',
  },
}));

interface ScanResultViewProps {
  scanResult: ScanResult;
  onInventoryUpdate?: () => void;
  onStartTransfer?: () => void;
  onStartShipping?: () => void;
  onClose: () => void;
}

const ScanResultView: React.FC<ScanResultViewProps> = ({
  scanResult,
  onInventoryUpdate,
  onStartTransfer,
  onStartShipping,
  onClose,
}) => {
  const { productDetails, blockchainVerified, scanMode } = scanResult;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_STOCK':
        return 'success';
      case 'RESERVED':
        return 'warning';
      case 'SHIPPED':
        return 'info';
      case 'IN_TRANSIT':
        return 'primary';
      case 'QUALITY_HOLD':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getScanModeIcon = () => {
    switch (scanMode) {
      case 'INVENTORY':
        return <InventoryIcon />;
      case 'TRANSFER':
        return <SwapHorizIcon />;
      case 'SHIPPING':
        return <LocalShippingIcon />;
      case 'RECEIPT':
        return <ReceiptIcon />;
      case 'VERIFICATION':
        return <FactCheckIcon />;
      default:
        return <InventoryIcon />;
    }
  };

  const handleBlockchainVerification = () => {
    // This would open the blockchain explorer to show the transaction
    if (scanResult.blockchainTxHash) {
      window.open(`https://etherscan.io/tx/${scanResult.blockchainTxHash}`, '_blank');
    }
  };

  return (
    <Box>
      {/* Verification Status Banner */}
      <Paper
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: blockchainVerified ? 'success.light' : 'error.light',
          color: blockchainVerified ? 'success.dark' : 'error.dark',
          marginBottom: 3,
          borderRadius: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {blockchainVerified ? (
            <VerifiedIcon sx={{ marginRight: 1 }} />
          ) : (
            <ErrorOutlineIcon sx={{ marginRight: 1 }} />
          )}
          <Typography variant="subtitle1" fontWeight="bold">
            {blockchainVerified
              ? 'Blockchain Verification Successful'
              : 'Blockchain Verification Failed'}
          </Typography>
        </Box>
        {blockchainVerified && scanResult.blockchainTxHash && (
          <Tooltip title="View on Blockchain Explorer">
            <Chip
              label={`TX: ${scanResult.blockchainTxHash.substring(0, 8)}...`}
              size="small"
              color="success"
              variant="outlined"
              deleteIcon={<LinkIcon />}
              onDelete={handleBlockchainVerification}
              onClick={handleBlockchainVerification}
              sx={{ cursor: 'pointer' }}
            />
          </Tooltip>
        )}
      </Paper>

      {/* Product Info Card */}
      <StyledPaper>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              backgroundColor: 'primary.light',
              color: 'primary.main',
              width: 56,
              height: 56,
              mr: 2,
            }}
          >
            {productDetails?.category ? productDetails.category.charAt(0) : 'P'}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {productDetails?.name || 'Unknown Product'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDetails?.manufacturer || 'Unknown Manufacturer'} | {productDetails?.componentType || 'Unknown Type'}
            </Typography>
          </Box>
        </Box>

        {productDetails?.status && (
          <Chip
            label={productDetails.status}
            color={getStatusColor(productDetails.status) as any}
            sx={{ mb: 3 }}
          />
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Product Details
            </Typography>
            <DetailRow>
              <Typography className="label">SKU</Typography>
              <Typography className="value">{productDetails?.sku || 'N/A'}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Batch Number</Typography>
              <Typography className="value">{productDetails?.batchNumber || scanResult.batchNumber || 'N/A'}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Category</Typography>
              <Typography className="value">{productDetails?.category || 'N/A'}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Quantity Available</Typography>
              <Typography className="value">
                {productDetails?.quantityAvailable !== undefined 
                  ? `${productDetails.quantityAvailable} ${productDetails.unit || 'units'}`
                  : 'N/A'}
              </Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Unit Price</Typography>
              <Typography className="value">
                {productDetails?.unitPrice !== undefined 
                  ? formatCurrency(productDetails.unitPrice)
                  : 'N/A'}
              </Typography>
            </DetailRow>
            
            {productDetails?.hazardousMaterial !== undefined && (
              <DetailRow>
                <Typography className="label">Hazardous Material</Typography>
                <Chip 
                  label={productDetails.hazardousMaterial ? 'Yes' : 'No'} 
                  color={productDetails.hazardousMaterial ? 'error' : 'success'}
                  size="small"
                />
              </DetailRow>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Location & Dates
            </Typography>
            <DetailRow>
              <Typography className="label">Warehouse</Typography>
              <Typography className="value">{productDetails?.warehouse || 'N/A'}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Location</Typography>
              <Typography className="value">{productDetails?.location || scanResult.location || 'N/A'}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Manufacturing Date</Typography>
              <Typography className="value">
                {formatDate(productDetails?.manufacturingDate || scanResult?.details?.manufacturingDate)}
              </Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Expiry Date</Typography>
              <Typography className="value">
                {formatDate(productDetails?.expiryDate || scanResult?.details?.expiryDate)}
              </Typography>
            </DetailRow>
            {productDetails?.customsStatus && (
              <DetailRow>
                <Typography className="label">Customs Status</Typography>
                <Chip 
                  label={productDetails.customsStatus} 
                  color={productDetails.customsStatus === 'CLEARED' ? 'success' : 
                         productDetails.customsStatus === 'PENDING' ? 'warning' : 
                         productDetails.customsStatus === 'HELD' ? 'error' : 'default'}
                  size="small"
                />
              </DetailRow>
            )}
          </Grid>
        </Grid>

        {productDetails?.specifications && Object.keys(productDetails.specifications).length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Specifications
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(productDetails.specifications).map(([key, value]) => (
                <Grid item xs={6} sm={4} key={key}>
                  <Box sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 1 }}>
                    <Typography variant="caption" color="text.secondary" component="div">
                      {key}
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {value}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {productDetails?.certifications && productDetails.certifications.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Certifications
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {productDetails.certifications.map((cert, index) => (
                <Chip key={index} label={cert} size="small" />
              ))}
            </Box>
          </Box>
        )}
      </StyledPaper>

      {/* Scan Info */}
      <StyledPaper>
        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Scan Information
        </Typography>
        <DetailRow>
          <Typography className="label">Scan ID</Typography>
          <Typography className="value">{scanResult.id}</Typography>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Scan Mode</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getScanModeIcon()}
            <Typography className="value">{scanResult.scanMode || 'UNKNOWN'}</Typography>
          </Box>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Scanned At</Typography>
          <Typography className="value">
            {scanResult.timestamp ? new Date(scanResult.timestamp).toLocaleString() : 'N/A'}
          </Typography>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Scanned By</Typography>
          <Typography className="value">{scanResult.scannedBy}</Typography>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Scan Technology</Typography>
          <Typography className="value">{scanResult.scanTechnology}</Typography>
        </DetailRow>
        {scanResult.notes && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">Notes:</Typography>
            <Typography variant="body2" sx={{ mt: 0.5, p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
              {scanResult.notes}
            </Typography>
          </Box>
        )}
      </StyledPaper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        
        <ButtonGroup variant="contained">
          {onInventoryUpdate && (
            <Button 
              startIcon={<InventoryIcon />} 
              onClick={onInventoryUpdate}
              color="primary"
            >
              Update Inventory
            </Button>
          )}
          
          {onStartTransfer && (
            <Button 
              startIcon={<SwapHorizIcon />} 
              onClick={onStartTransfer}
              color="secondary"
            >
              Transfer
            </Button>
          )}
          
          {onStartShipping && (
            <Button 
              startIcon={<LocalShippingIcon />} 
              onClick={onStartShipping}
              color="info"
            >
              Ship
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default ScanResultView; 