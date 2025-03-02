import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import WarningIcon from '@mui/icons-material/Warning';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentIcon from '@mui/icons-material/Payment';

// Types
interface Invoice {
  id: string;
  supplier: string;
  description: string;
  amount: number;
  dueDate: string;
  status: string;
  statusColor: string;
  paymentStatus?: string;
  paymentStatusColor?: string;
}

// Props
export interface InvoicesPanelProps {
  invoiceData: Invoice[];
  onProcessPayment?: (invoice: Invoice) => void;
}

const InvoicesPanel: React.FC<InvoicesPanelProps> = ({
  invoiceData,
  onProcessPayment = () => {}
}) => {
  // Calculate summary counts
  const overdueCount = invoiceData.filter(inv => inv.status === 'Overdue').length;
  const dueSoonCount = invoiceData.filter(inv => inv.status === 'Due Soon').length;
  const openCount = invoiceData.filter(inv => inv.status === 'Open').length;
  const paidCount = invoiceData.filter(inv => inv.status === 'Paid').length;

  // Calculate summary amounts
  const overdueAmount = invoiceData
    .filter(inv => inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const dueSoonAmount = invoiceData
    .filter(inv => inv.status === 'Due Soon')
    .reduce((sum, inv) => sum + inv.amount, 0);
  
  const openAmount = invoiceData
    .filter(inv => inv.status === 'Open')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const paidAmount = invoiceData
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Manage Invoices</Typography>
            <Typography variant="body2" color="text.secondary">Track and process supplier invoices</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search invoices..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 200 }}
            />
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
            >
              New Invoice
            </Button>
          </Box>
        </Box>
        
        {/* Invoice Status Summary */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'error.main', mr: 1, width: 32, height: 32 }}>
                    <WarningIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Overdue</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">{overdueCount}</Typography>
                <Typography variant="body2" color="text.secondary">${overdueAmount.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'warning.main', mr: 1, width: 32, height: 32 }}>
                    <ScheduleIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Due Soon</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">{dueSoonCount}</Typography>
                <Typography variant="body2" color="text.secondary">${dueSoonAmount.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'info.main', mr: 1, width: 32, height: 32 }}>
                    <ReceiptIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Open</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">{openCount}</Typography>
                <Typography variant="body2" color="text.secondary">${openAmount.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: 'success.main', mr: 1, width: 32, height: 32 }}>
                    <CheckCircleIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="subtitle2">Paid</Typography>
                </Box>
                <Typography variant="h5" fontWeight="bold">{paidCount}</Typography>
                <Typography variant="body2" color="text.secondary">${paidAmount.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Invoices Table */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.map((invoice) => (
                <TableRow key={invoice.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ReceiptIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      <Typography variant="body2">{invoice.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{invoice.supplier}</TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {invoice.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${invoice.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{invoice.dueDate.split('-')[2]}/{invoice.dueDate.split('-')[1]}/{invoice.dueDate.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={invoice.status} 
                      size="small"
                      sx={{
                        bgcolor: `${invoice.statusColor}.dark` + '22',
                        color: `${invoice.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    {invoice.paymentStatus && (
                      <Chip 
                        label={invoice.paymentStatus} 
                        size="small"
                        sx={{
                          bgcolor: `${invoice.paymentStatusColor}.dark` + '22',
                          color: `${invoice.paymentStatusColor}.main`,
                          fontWeight: 'medium'
                        }} 
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      size="small"
                      disabled={invoice.status === 'Paid'}
                      startIcon={<PaymentIcon />}
                      onClick={() => onProcessPayment(invoice)}
                    >
                      {invoice.status === 'Paid' ? 'Paid' : 'Pay'}
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

export default InvoicesPanel;
