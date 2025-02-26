import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Stack, 
  Chip, 
  Paper,
  useTheme
} from '@mui/material';
import { 
  AlertCircle, 
  Plus, 
  CheckCircle, 
  Calendar, 
  Settings 
} from 'lucide-react';

interface PaymentHeaderProps {
  pendingAmount: number;
  ytdSavings: number;
  pendingPayments: number;
  onCreatePayment: () => void;
  onApprovePending: () => void;
  onSchedulePayment: () => void;
  onOpenSettings: () => void;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({
  pendingAmount,
  ytdSavings,
  pendingPayments,
  onCreatePayment,
  onApprovePending,
  onSchedulePayment,
  onOpenSettings
}) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, mb: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Payment Management
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            <Typography variant="subtitle1" color="text.secondary">
              ${pendingAmount.toLocaleString()} in Pending Payments
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
              |
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: theme.palette.success.main,
                fontWeight: 'medium'
              }}
            >
              ${ytdSavings.toLocaleString()} YTD Fee Savings
            </Typography>
          </Box>
        </Box>

        <Chip
          icon={<AlertCircle size={16} />}
          label={`${pendingPayments} Payments Due Within 48 Hours`}
          color="warning"
          sx={{ 
            height: 'auto',
            py: 1,
            px: 1,
            mt: { xs: 2, md: 0 },
            '& .MuiChip-label': {
              px: 1,
              py: 0.5,
              fontSize: '0.9rem',
              fontWeight: 'medium'
            }
          }}
        />
      </Box>

      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        sx={{ mt: 3 }}
      >
        <Button 
          variant="contained" 
          startIcon={<Plus size={18} />}
          onClick={onCreatePayment}
          sx={{ 
            fontWeight: 'medium',
            px: 2,
            py: 1
          }}
        >
          Create New Payment
        </Button>
        <Button 
          variant="outlined" 
          color="primary"
          startIcon={<CheckCircle size={18} />}
          onClick={onApprovePending}
          sx={{ 
            fontWeight: 'medium',
            px: 2,
            py: 1
          }}
        >
          Approve Pending Payments ({pendingPayments})
        </Button>
        <Button 
          variant="outlined" 
          color="primary"
          startIcon={<Calendar size={18} />}
          onClick={onSchedulePayment}
          sx={{ 
            fontWeight: 'medium',
            px: 2,
            py: 1
          }}
        >
          Schedule Future Payment
        </Button>
        <Button 
          variant="outlined" 
          color="primary"
          startIcon={<Settings size={18} />}
          onClick={onOpenSettings}
          sx={{ 
            fontWeight: 'medium',
            px: 2,
            py: 1
          }}
        >
          Payment Settings
        </Button>
      </Stack>
    </Paper>
  );
};

export default PaymentHeader; 