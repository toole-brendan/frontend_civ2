import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Chip, 
  IconButton, 
  Stack,
  Button,
  Divider,
  useTheme,
  Tooltip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Supplier } from '../types';

interface KeySupplierCardsProps {
  suppliers: Supplier[];
  onContactSupplier: (supplier: Supplier) => void;
  onCreateOrder: (supplier: Supplier) => void;
  onPaySupplier: (supplier: Supplier) => void;
  onViewDetails: (supplier: Supplier) => void;
}

const KeySupplierCards: React.FC<KeySupplierCardsProps> = ({
  suppliers,
  onContactSupplier,
  onCreateOrder,
  onPaySupplier,
  onViewDetails,
}) => {
  const theme = useTheme();

  const getStatusColor = (score: number) => {
    if (score >= 95) return theme.palette.success.main;
    if (score >= 90) return theme.palette.success.light;
    if (score >= 85) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
      case 'PARTIALLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      case 'VERIFICATION_PENDING':
        return <WarningIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      default:
        return <WarningIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
    }
  };

  const getVerificationStatusText = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return 'Fully verified';
      case 'PARTIALLY_VERIFIED':
        return 'Partially verified';
      case 'VERIFICATION_PENDING':
        return 'Verification pending';
      default:
        return 'Not verified';
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="medium" color="text.primary">
          Key Supplier Cards
        </Typography>
        <Tooltip title="Showing top 5 suppliers by annual spend">
          <IconButton size="small">
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 3,
          pb: 1,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[100],
            borderRadius: 4,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[400],
            borderRadius: 4,
          },
        }}
      >
        {suppliers.map((supplier) => (
          <Paper
            key={supplier.id}
            elevation={0}
            sx={{
              width: 300,
              minWidth: 300,
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              '&:hover': {
                boxShadow: theme.shadows[3],
                borderColor: theme.palette.primary.light,
              },
              transition: 'all 0.3s ease',
            }}
          >
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={supplier.logo}
                alt={supplier.name}
                variant="rounded"
                sx={{ width: 48, height: 48, mr: 2 }}
              />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {supplier.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {supplier.headquarters}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Performance */}
            <Box sx={{ mb: 2 }}>
              <Chip
                label={`Performance: ${supplier.performanceScore}/100`}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(supplier.performanceScore),
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {supplier.percentOfTotalSpend}% of total spend (${(supplier.annualSpend / 1000000).toFixed(2)}M annually)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {supplier.onTimeDeliveryRate}% on-time delivery
              </Typography>
            </Box>

            {/* Categories */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" fontWeight="medium">
                Primary categories:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
                {supplier.categories.slice(0, 2).map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    size="small"
                    sx={{ 
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.main,
                      fontSize: '0.7rem'
                    }}
                  />
                ))}
                {supplier.categories.length > 2 && (
                  <Chip
                    label={`+${supplier.categories.length - 2} more`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                  />
                )}
              </Stack>
            </Box>

            {/* Contract & Verification */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <CalendarTodayIcon fontSize="small" sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  Contract expires: {new Date(supplier.contractExpiration).toLocaleDateString()}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {getVerificationStatusIcon(supplier.blockchainVerificationStatus)}
                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                  Blockchain status: {getVerificationStatusText(supplier.blockchainVerificationStatus)}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Actions */}
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Tooltip title="Contact supplier">
                <IconButton 
                  size="small" 
                  onClick={() => onContactSupplier(supplier)}
                  sx={{ color: theme.palette.primary.main }}
                >
                  <EmailIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Create order">
                <IconButton 
                  size="small" 
                  onClick={() => onCreateOrder(supplier)}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  <ShoppingCartIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Make payment">
                <span>
                  <IconButton 
                    size="small" 
                    onClick={() => onPaySupplier(supplier)}
                    sx={{ color: theme.palette.success.main }}
                    disabled={!supplier.shellTokenEnabled}
                  >
                    <AccountBalanceWalletIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
              <Button
                variant="text"
                endIcon={<ArrowForwardIcon />}
                onClick={() => onViewDetails(supplier)}
                size="small"
              >
                Details
              </Button>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default KeySupplierCards; 