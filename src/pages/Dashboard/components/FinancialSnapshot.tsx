import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  Paper,
  useTheme
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import TokenIcon from '@mui/icons-material/Token';

const FinancialSnapshot: React.FC = () => {
  const theme = useTheme();
  
  // Financial data
  const financialData = {
    cashPosition: 1420500,
    accountsPayable: {
      total: 254800,
      aging: {
        current: 78500,
        days1to15: 142650,
        days16to30: 33650,
      }
    },
    accountsReceivable: {
      total: 382500,
      aging: {
        current: 124500,
        days1to15: 185200,
        days16to30: 52800,
        daysOver30: 20000,
      }
    },
    inventoryValue: 4285630,
    skuCount: 12483,
    shellTokenBalance: 85400,
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cash Position & Working Capital
      </Typography>
      
      <Grid container spacing={3}>
        {/* Cash Position */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              height: '100%',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <AccountBalanceWalletIcon 
                color="primary" 
                sx={{ mr: 1 }} 
              />
              <Typography variant="subtitle1">
                Cash Position
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              color="primary" 
              sx={{ mb: 1, fontWeight: 500 }}
            >
              {formatCurrency(financialData.cashPosition)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Available for operations
            </Typography>
          </Paper>
        </Grid>
        
        {/* Shell Token Balance */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2, 
              height: '100%',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TokenIcon 
                color="secondary" 
                sx={{ mr: 1 }} 
              />
              <Typography variant="subtitle1">
                Shell Token Balance
              </Typography>
            </Box>
            <Typography 
              variant="h4" 
              color="secondary" 
              sx={{ mb: 1, fontWeight: 500 }}
            >
              {formatNumber(financialData.shellTokenBalance)} SHL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${formatNumber(financialData.shellTokenBalance)} equivalent
            </Typography>
          </Paper>
        </Grid>
        
        {/* Accounts Payable */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <ReceiptIcon 
                sx={{ mr: 1, color: theme.palette.error.main }} 
              />
              <Typography variant="subtitle1">
                Accounts Payable
              </Typography>
            </Box>
            <Typography 
              variant="h5" 
              sx={{ mb: 1, fontWeight: 500, color: theme.palette.error.main }}
            >
              {formatCurrency(financialData.accountsPayable.total)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Across 5 suppliers
            </Typography>
            
            <Divider sx={{ my: 1 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Aging
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Current" 
                  secondary={formatCurrency(financialData.accountsPayable.aging.current)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body2',
                    color: 'error.main',
                    fontWeight: 500
                  }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="1-15 days" 
                  secondary={formatCurrency(financialData.accountsPayable.aging.days1to15)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="16-30 days" 
                  secondary={formatCurrency(financialData.accountsPayable.aging.days16to30)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Accounts Receivable */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LocalShippingIcon 
                sx={{ mr: 1, color: theme.palette.success.main }} 
              />
              <Typography variant="subtitle1">
                Accounts Receivable
              </Typography>
            </Box>
            <Typography 
              variant="h5" 
              sx={{ mb: 1, fontWeight: 500, color: theme.palette.success.main }}
            >
              {formatCurrency(financialData.accountsReceivable.total)}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Across 8 customers
            </Typography>
            
            <Divider sx={{ my: 1 }} />
            
            <Typography variant="subtitle2" gutterBottom>
              Aging
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Current" 
                  secondary={formatCurrency(financialData.accountsReceivable.aging.current)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="1-15 days" 
                  secondary={formatCurrency(financialData.accountsReceivable.aging.days1to15)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="16-30 days" 
                  secondary={formatCurrency(financialData.accountsReceivable.aging.days16to30)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
              <ListItem disableGutters sx={{ py: 0.5 }}>
                <ListItemText 
                  primary=">30 days" 
                  secondary={formatCurrency(financialData.accountsReceivable.aging.daysOver30)}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ 
                    variant: 'body2',
                    color: 'warning.main',
                    fontWeight: 500
                  }}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Inventory Value */}
        <Grid item xs={12}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 2,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              bgcolor: theme.palette.background.paper,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <InventoryIcon 
                sx={{ mr: 1, color: theme.palette.info.main }} 
              />
              <Typography variant="subtitle1">
                Inventory Value
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography 
                variant="h5" 
                sx={{ fontWeight: 500, color: theme.palette.info.main }}
              >
                {formatCurrency(financialData.inventoryValue)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatNumber(financialData.skuCount)} SKUs
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          mt: 2
        }}
      >
        <Typography 
          variant="body2" 
          color="primary" 
          sx={{ 
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          View Financial Details →
        </Typography>
      </Box>
    </Box>
  );
};

export default FinancialSnapshot; 