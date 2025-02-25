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
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
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
          <Chip
            label={`TX: ${scanResult.blockchainTxHash.substring(0, 8)}...`}
            size="small"
            color="success"
            variant="outlined"
          />
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
            {productDetails.category.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {productDetails.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {productDetails.origin} | {productDetails.roastLevel} Roast | {productDetails.processMethod} Process
            </Typography>
          </Box>
        </Box>

        <Chip
          label={productDetails.status}
          color={getStatusColor(productDetails.status) as any}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Product Details
            </Typography>
            <DetailRow>
              <Typography className="label">SKU</Typography>
              <Typography className="value">{productDetails.sku}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Batch Number</Typography>
              <Typography className="value">{productDetails.batchNumber}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Category</Typography>
              <Typography className="value">{productDetails.category}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Quantity Available</Typography>
              <Typography className="value">
                {productDetails.quantityAvailable} {productDetails.unit}
              </Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Unit Price</Typography>
              <Typography className="value">
                {formatCurrency(productDetails.unitPrice)}
              </Typography>
            </DetailRow>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Location & Dates
            </Typography>
            <DetailRow>
              <Typography className="label">Warehouse</Typography>
              <Typography className="value">{productDetails.warehouse}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Location</Typography>
              <Typography className="value">{productDetails.location}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Harvest Date</Typography>
              <Typography className="value">{formatDate(productDetails.harvestDate)}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography className="label">Expiry Date</Typography>
              <Typography className="value">{formatDate(productDetails.expiryDate)}</Typography>
            </DetailRow>
          </Grid>
        </Grid>

        {productDetails.certifications.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
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
        <Typography variant="subtitle1" gutterBottom>
          Scan Information
        </Typography>
        <DetailRow>
          <Typography className="label">Scan ID</Typography>
          <Typography className="value">{scanResult.id}</Typography>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Scan Mode</Typography>
          <Typography className="value">{scanResult.scanMode}</Typography>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Scanned At</Typography>
          <Typography className="value">
            {new Date(scanResult.scannedAt).toLocaleString()}
          </Typography>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Scanned By</Typography>
          <Typography className="value">{scanResult.scannedBy}</Typography>
        </DetailRow>
        <DetailRow>
          <Typography className="label">Location</Typography>
          <Typography className="value">{scanResult.location}</Typography>
        </DetailRow>
        {scanResult.relatedOrderId && (
          <DetailRow>
            <Typography className="label">Related Order</Typography>
            <Typography className="value">{scanResult.relatedOrderId}</Typography>
          </DetailRow>
        )}
        {scanResult.relatedTransferId && (
          <DetailRow>
            <Typography className="label">Related Transfer</Typography>
            <Typography className="value">{scanResult.relatedTransferId}</Typography>
          </DetailRow>
        )}
      </StyledPaper>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {onInventoryUpdate && (
            <Button
              variant="contained"
              startIcon={<InventoryIcon />}
              onClick={onInventoryUpdate}
            >
              Update Inventory
            </Button>
          )}
          {onStartTransfer && (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<LocalShippingIcon />}
              onClick={onStartTransfer}
            >
              Start Transfer
            </Button>
          )}
          {onStartShipping && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<PriceCheckIcon />}
              onClick={onStartShipping}
            >
              Start Shipping
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ScanResultView; 