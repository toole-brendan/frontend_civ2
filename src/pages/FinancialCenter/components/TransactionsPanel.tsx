import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  Tooltip
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InventoryIcon from '@mui/icons-material/Inventory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Types
interface Transaction {
  id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
  method: string;
  status: string;
  statusColor: string;
  txHash: string;
  verifications: number;
}

// Props
export interface TransactionsPanelProps {
  transactions: Transaction[];
}

const TransactionsPanel: React.FC<TransactionsPanelProps> = ({
  transactions
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Transaction History</Typography>
            <Typography variant="body2" color="text.secondary">All financial transactions with suppliers</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search transactions..."
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
              startIcon={<FileDownloadIcon />}
            >
              Export
            </Button>
          </Box>
        </Box>
        
        {/* Transactions Table */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Blockchain</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {transaction.type === 'Payment' ? (
                        <PaymentIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      ) : transaction.type === 'Invoice' ? (
                        <ReceiptIcon sx={{ mr: 1, color: 'warning.main', fontSize: 16 }} />
                      ) : (
                        <InventoryIcon sx={{ mr: 1, color: 'success.main', fontSize: 16 }} />
                      )}
                      <Typography variant="body2">{transaction.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.type} 
                      size="small"
                      sx={{
                        bgcolor: 
                          transaction.type === 'Payment' ? 'primary.dark' + '22' : 
                          transaction.type === 'Invoice' ? 'warning.dark' + '22' : 
                          'success.dark' + '22',
                        color: 
                          transaction.type === 'Payment' ? 'primary.main' : 
                          transaction.type === 'Invoice' ? 'warning.main' : 
                          'success.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {transaction.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${transaction.amount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{transaction.date.split('-')[2]}/{transaction.date.split('-')[1]}/{transaction.date.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.method} 
                      size="small"
                      icon={transaction.method === 'Shell Token' ? <VerifiedUserIcon /> : undefined}
                      sx={{
                        bgcolor: 
                          transaction.method === 'Shell Token' ? 'success.dark' + '22' : 
                          transaction.method === 'Traditional Wire' ? 'warning.dark' + '22' : 
                          'info.dark' + '22',
                        color: 
                          transaction.method === 'Shell Token' ? 'success.main' : 
                          transaction.method === 'Traditional Wire' ? 'warning.main' : 
                          'info.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.status} 
                      size="small"
                      sx={{
                        bgcolor: `${transaction.statusColor}.dark` + '22',
                        color: `${transaction.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    {transaction.txHash !== 'N/A' ? (
                      <Tooltip title={transaction.txHash}>
                        <Chip 
                          label={transaction.verifications > 0 ? `${transaction.verifications} verifications` : 'N/A'} 
                          size="small"
                          icon={transaction.verifications > 0 ? <VerifiedUserIcon /> : undefined}
                          sx={{
                            bgcolor: transaction.verifications > 0 ? 'success.dark' + '22' : 'text.disabled',
                            color: transaction.verifications > 0 ? 'success.main' : 'text.disabled',
                            fontWeight: 'medium'
                          }} 
                        />
                      </Tooltip>
                    ) : (
                      <Typography variant="body2" color="text.secondary">N/A</Typography>
                    )}
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

export default TransactionsPanel;
