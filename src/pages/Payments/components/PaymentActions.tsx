import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  TextField,
  InputAdornment,
  Chip,
  Avatar,
  useTheme
} from '@mui/material';
import { 
  CreditCard, 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Wallet,
  DollarSign,
  Coins,
  BarChart4,
  FileCheck,
  Shield,
  RefreshCw
} from 'lucide-react';
import { mockUser } from '../mockData';

interface PaymentActionsProps {
  onCreatePayment: () => void;
  onSchedulePayment: () => void;
  onBulkPayment: () => void;
  onViewReports: () => void;
  onManageSuppliers: () => void;
  onVerifyPayment: (hash: string) => void;
}

const PaymentActions: React.FC<PaymentActionsProps> = ({
  onCreatePayment,
  onSchedulePayment,
  onBulkPayment,
  onViewReports,
  onManageSuppliers,
  onVerifyPayment
}) => {
  const theme = useTheme();
  const [verificationHash, setVerificationHash] = useState('');
  
  const handleVerify = () => {
    if (verificationHash.trim()) {
      onVerifyPayment(verificationHash);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 3 }}>
      {/* User Profile Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48, 
              mr: 2, 
              bgcolor: theme.palette.primary.main 
            }}
          >
            {mockUser.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {mockUser.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {mockUser.role}, {mockUser.company}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Pending Approvals
          </Typography>
          <Chip 
            label={mockUser.pendingApprovals} 
            size="small" 
            color="warning"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            YTD Savings
          </Typography>
          <Typography variant="body2" fontWeight="bold" color="success.main">
            ${mockUser.ytdSavings.toLocaleString()}
          </Typography>
        </Box>
      </Paper>
      
      {/* Quick Actions Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Quick Actions
        </Typography>
        
        <List sx={{ p: 0 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary"
              startIcon={<Plus size={18} />}
              onClick={onCreatePayment}
              sx={{ py: 1 }}
            >
              Create New Payment
            </Button>
          </ListItem>
          
          <ListItem disablePadding sx={{ mb: 1 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<Clock size={18} />}
              onClick={onSchedulePayment}
              sx={{ py: 1 }}
            >
              Schedule Payment
            </Button>
          </ListItem>
          
          <ListItem disablePadding sx={{ mb: 1 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<FileText size={18} />}
              onClick={onBulkPayment}
              sx={{ py: 1 }}
            >
              Bulk Payment Upload
            </Button>
          </ListItem>
          
          <ListItem disablePadding sx={{ mb: 1 }}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<BarChart4 size={18} />}
              onClick={onViewReports}
              sx={{ py: 1 }}
            >
              Payment Reports
            </Button>
          </ListItem>
          
          <ListItem disablePadding>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<FileCheck size={18} />}
              onClick={onManageSuppliers}
              sx={{ py: 1 }}
            >
              Manage Suppliers
            </Button>
          </ListItem>
        </List>
      </Paper>
      
      {/* Wallet Balance Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          background: `linear-gradient(to right bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
          color: 'white'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Wallet size={20} />
          <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
            Shell Token Balance
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
          <Typography variant="h4" fontWeight="bold">
            125,000
          </Typography>
          <Typography variant="body2" sx={{ ml: 1, opacity: 0.9 }}>
            SHL
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            USD Value
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            $125,000.00
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<Plus size={16} />}
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              color: theme.palette.primary.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.8)',
              }
            }}
          >
            Add Tokens
          </Button>
          <Button 
            variant="outlined" 
            fullWidth
            startIcon={<RefreshCw size={16} />}
            sx={{ 
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: 'white',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.8)',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Convert
          </Button>
        </Box>
      </Paper>
      
      {/* Blockchain Verification Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          flexGrow: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Shield size={20} color={theme.palette.success.main} />
          <Typography variant="h6" fontWeight="bold" sx={{ ml: 1 }}>
            Blockchain Verification
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Verify payment authenticity by entering the transaction hash
        </Typography>
        
        <TextField
          fullWidth
          placeholder="Enter transaction hash"
          value={verificationHash}
          onChange={(e) => setVerificationHash(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Coins size={16} color={theme.palette.text.secondary} />
              </InputAdornment>
            ),
          }}
        />
        
        <Button 
          fullWidth 
          variant="contained" 
          color="success"
          startIcon={<CheckCircle size={18} />}
          onClick={handleVerify}
          sx={{ mb: 2 }}
        >
          Verify Transaction
        </Button>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
          Recent Verifications
        </Typography>
        
        <List sx={{ p: 0 }}>
          <ListItem sx={{ px: 0, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircle size={18} color={theme.palette.success.main} />
            </ListItemIcon>
            <ListItemText 
              primary="Payment to Tokyo Components" 
              secondary="Verified 2 hours ago"
              primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
          
          <ListItem sx={{ px: 0, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <CheckCircle size={18} color={theme.palette.success.main} />
            </ListItemIcon>
            <ListItemText 
              primary="Payment to Korea Chip" 
              secondary="Verified yesterday"
              primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
          
          <ListItem sx={{ px: 0, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AlertTriangle size={18} color={theme.palette.warning.main} />
            </ListItemIcon>
            <ListItemText 
              primary="Payment to Vietnam Manufacturing" 
              secondary="Pending verification"
              primaryTypographyProps={{ variant: 'body2', fontWeight: 'medium' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default PaymentActions; 