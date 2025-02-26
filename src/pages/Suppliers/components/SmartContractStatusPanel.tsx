import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grid,
  Divider,
  Button,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  Tooltip,
  Link
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SavingsIcon from '@mui/icons-material/Savings';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { SmartContract } from '../types';

interface SmartContractStatusPanelProps {
  contract: SmartContract | null;
  onViewTransactions: () => void;
  onViewContract: () => void;
  onMakePayment: () => void;
}

const SmartContractStatusPanel: React.FC<SmartContractStatusPanelProps> = ({
  contract,
  onViewTransactions,
  onViewContract,
  onMakePayment
}) => {
  const theme = useTheme();

  if (!contract) {
    return (
      <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No smart contract data available
        </Typography>
      </Paper>
    );
  }

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return {
          bg: theme.palette.success.light,
          color: theme.palette.success.dark,
          icon: <CheckCircleIcon fontSize="small" sx={{ color: theme.palette.success.main }} />
        };
      case 'PENDING':
        return {
          bg: theme.palette.warning.light,
          color: theme.palette.warning.dark,
          icon: <HourglassTopIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
        };
      case 'VERIFICATION_PENDING':
        return {
          bg: theme.palette.info.light,
          color: theme.palette.info.dark,
          icon: <VerifiedUserIcon fontSize="small" sx={{ color: theme.palette.info.main }} />
        };
      default:
        return {
          bg: theme.palette.grey[200],
          color: theme.palette.grey[700],
          icon: <DescriptionIcon fontSize="small" sx={{ color: theme.palette.grey[500] }} />
        };
    }
  };

  const { bg, color, icon } = getVerificationStatusColor(contract.status);

  // Format a dollar amount as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Generate a shortened version of a blockchain address
  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Calculate days until next automatic payment
  const getDaysUntilNextPayment = () => {
    const today = new Date();
    const nextPaymentDate = new Date(contract.nextAutoPaymentDate);
    const diffTime = nextPaymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const daysUntilNextPayment = getDaysUntilNextPayment();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      {/* Header with contract status */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Smart Contract
        </Typography>
        <Chip
          icon={icon}
          label={contract.status}
          size="small"
          sx={{
            backgroundColor: bg,
            color: color,
            fontWeight: 500,
          }}
        />
      </Box>

      {/* Contract address and details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          Contract Address
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Paper
            variant="outlined"
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              borderColor: theme.palette.divider,
              bgcolor: theme.palette.grey[50],
            }}
          >
            <AccountBalanceWalletIcon fontSize="small" sx={{ color: theme.palette.primary.main, mr: 1 }} />
            <Typography variant="body2" fontFamily="monospace" fontWeight="medium">
              {shortenAddress(contract.contractAddress)}
            </Typography>
          </Paper>
          <Tooltip title="View on blockchain explorer">
            <Link 
              href="#" 
              underline="none" 
              sx={{ ml: 1, display: 'flex', alignItems: 'center', fontSize: 12 }}
              color="primary"
            >
              View
            </Link>
          </Tooltip>
        </Box>
      </Box>

      {/* Payment terms */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: theme.palette.background.default,
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <EventNoteIcon fontSize="small" sx={{ color: theme.palette.primary.main, mr: 1 }} />
              <Typography variant="body2" fontWeight="medium">
                Payment Terms
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="bold">
              {contract.paymentTerms}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {contract.autoPaymentEnabled ? 'Auto-payment enabled' : 'Manual payments only'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: theme.palette.background.default,
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SavingsIcon fontSize="small" sx={{ color: theme.palette.success.main, mr: 1 }} />
              <Typography variant="body2" fontWeight="medium">
                Annual Savings
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight="bold">
              {formatCurrency(contract.annualSavings)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`${contract.savingsPercentage}% below previous contract`}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Shell token status */}
      {contract.shellTokenEnabled && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              Shell Token Balance
            </Typography>
            <Chip
              label="SHL Enabled"
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.primary.dark,
                fontWeight: 500,
                height: 20,
                fontSize: '0.625rem',
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {contract.shellTokenBalance.toLocaleString()} SHL
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ≈ {formatCurrency(contract.shellTokenBalance * contract.shellTokenRate)}
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Current rate: 1 SHL = ${contract.shellTokenRate.toFixed(2)}
          </Typography>
        </Box>
      )}

      {/* Payment status */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
          Next Payment
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {formatCurrency(contract.nextPaymentAmount)}
          </Typography>
          <Chip
            label={`Due in ${daysUntilNextPayment} days`}
            size="small"
            sx={{
              backgroundColor: daysUntilNextPayment <= 7 ? theme.palette.warning.light : theme.palette.info.light,
              color: daysUntilNextPayment <= 7 ? theme.palette.warning.dark : theme.palette.info.dark,
              fontWeight: 500,
              height: 20,
              fontSize: '0.625rem',
            }}
          />
        </Box>
        
        <LinearProgress
          variant="determinate"
          value={(30 - daysUntilNextPayment) / 30 * 100}
          sx={{
            height: 6,
            borderRadius: 3,
            mb: 1,
            bgcolor: theme.palette.grey[200],
            '& .MuiLinearProgress-bar': {
              backgroundColor: daysUntilNextPayment <= 7 ? theme.palette.warning.main : theme.palette.info.main,
            },
          }}
        />
        
        <Typography variant="caption" color="text.secondary">
          Payment due on {new Date(contract.nextAutoPaymentDate).toLocaleDateString()}
        </Typography>
      </Box>

      {/* Recent Transactions */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ReceiptLongIcon sx={{ mr: 1 }} /> Recent Transactions
        </Typography>
        <List disablePadding>
          {contract.transactions.slice(0, 3).map((transaction, index) => (
            <ListItem
              key={transaction.id || index}
              disablePadding
              sx={{ 
                py: 1,
                borderBottom: index < 2 ? `1px solid ${theme.palette.divider}` : 'none'
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {transaction.status === 'COMPLETED' ? (
                  <CheckCircleIcon color="success" fontSize="small" />
                ) : (
                  <HourglassTopIcon color="warning" fontSize="small" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2" fontWeight={500}>
                    {formatCurrency(transaction.amount)}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    {new Date(transaction.date).toLocaleDateString()}
                  </Typography>
                }
              />
              {transaction.txHash && (
                <Tooltip title="View on blockchain">
                  <Link 
                    href={`https://etherscan.io/tx/${transaction.txHash}`}
                    target="_blank"
                    sx={{ ml: 1, color: 'primary.main' }}
                  >
                    <VerifiedUserIcon fontSize="small" />
                  </Link>
                </Tooltip>
              )}
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button
            variant="outlined"
            onClick={onViewTransactions}
            startIcon={<ReceiptLongIcon />}
            size="small"
          >
            View All Transactions
          </Button>
        </Box>
      </Box>

      {/* Actions */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<PaymentsIcon />}
          onClick={onMakePayment}
          fullWidth
        >
          Make Payment
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DescriptionIcon />}
          onClick={onViewContract}
          fullWidth
        >
          View Contract
        </Button>
      </Box>
    </Paper>
  );
};

export default SmartContractStatusPanel; 