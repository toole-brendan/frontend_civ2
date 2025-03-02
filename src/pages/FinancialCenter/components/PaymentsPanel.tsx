import React from 'react';
import { 
  Box, 
  Card, 
  CardContent,
  Typography,
  Avatar,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Chip
} from '@mui/material';

// Icons
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptIcon from '@mui/icons-material/Receipt';

// Types
interface UpcomingPayment {
  id: string;
  supplier: string;
  amount: number;
  dueDate: string;
  status: string;
  statusColor: string;
  paymentMethod: string;
  potentialSavings: number;
}

// Props
export interface PaymentsPanelProps {
  upcomingPayments: UpcomingPayment[];
  onProcessPayment?: (invoice: UpcomingPayment) => void;
}

const PaymentsPanel: React.FC<PaymentsPanelProps> = ({
  upcomingPayments,
  onProcessPayment = () => {}
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Manage Payments</Typography>
            <Typography variant="body2" color="text.secondary">Process and track supplier payments</Typography>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
            >
              New Payment
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Box>
        </Box>
        
        {/* Payment Methods Selection */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ bgcolor: 'success.dark' + '08', cursor: 'pointer', transition: 'all 0.2s' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2.5 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <VerifiedUserIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">Shell Token</Typography>
                  <Typography variant="body2" color="text.secondary">Secure blockchain payment</Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h6" color="success.main">3%</Typography>
                  <Typography variant="caption" color="success.main">Discount</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ cursor: 'pointer', transition: 'all 0.2s' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2.5 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <AccountBalanceIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">Wire Transfer</Typography>
                  <Typography variant="body2" color="text.secondary">Traditional bank transfer</Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h6" color="text.secondary">0%</Typography>
                  <Typography variant="caption" color="text.secondary">Standard</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ cursor: 'pointer', transition: 'all 0.2s' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', py: 2.5 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <PaymentIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">ACH/Credit</Typography>
                  <Typography variant="body2" color="text.secondary">Automated clearing house</Typography>
                </Box>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h6" color="text.secondary">1%</Typography>
                  <Typography variant="caption" color="text.secondary">Discount</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Upcoming Payments Table */}
        <Typography variant="h6" sx={{ mb: 2 }}>Upcoming Payments</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingPayments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ReceiptIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      <Typography variant="body2">{payment.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{payment.supplier}</TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${payment.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{payment.dueDate.split('-')[2]}/{payment.dueDate.split('-')[1]}/{payment.dueDate.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={payment.status} 
                      size="small"
                      sx={{
                        bgcolor: `${payment.statusColor}.dark` + '22',
                        color: `${payment.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={payment.paymentMethod} 
                      size="small"
                      icon={payment.paymentMethod === 'Shell Token' ? <VerifiedUserIcon /> : undefined}
                      sx={{
                        bgcolor: payment.paymentMethod === 'Shell Token' ? 'success.dark' + '22' : 'warning.dark' + '22',
                        color: payment.paymentMethod === 'Shell Token' ? 'success.main' : 'warning.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<PaymentIcon />}
                      onClick={() => onProcessPayment(payment)}
                    >
                      Pay
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PaymentsPanel;
