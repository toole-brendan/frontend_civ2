import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
  ContentCopy as DuplicateIcon,
  GetApp as DownloadIcon,
  Receipt as ReceiptIcon,
  CreditCard as PaymentIcon,
  AssignmentReturn as RefundIcon,
  SwapHoriz as TransferIcon,
  OpenInNew as ExternalLinkIcon,
} from '@mui/icons-material';
import { Transaction } from '../types';

// Styled components
const TransactionRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: 'pointer',
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  fontWeight: 500,
  backgroundColor:
    status === 'confirmed'
      ? theme.palette.success.light
      : status === 'pending'
      ? theme.palette.warning.light
      : status === 'failed'
      ? theme.palette.error.light
      : theme.palette.grey[300],
  color:
    status === 'confirmed'
      ? theme.palette.success.dark
      : status === 'pending'
      ? theme.palette.warning.dark
      : status === 'failed'
      ? theme.palette.error.dark
      : theme.palette.grey[800],
}));

const TypeChip = styled(Chip)<{ type: string }>(({ theme, type }) => ({
  fontWeight: 500,
  backgroundColor:
    type === 'payment'
      ? theme.palette.primary.light
      : type === 'receipt'
      ? theme.palette.success.light
      : type === 'refund'
      ? theme.palette.warning.light
      : theme.palette.info.light,
  color:
    type === 'payment'
      ? theme.palette.primary.dark
      : type === 'receipt'
      ? theme.palette.success.dark
      : type === 'refund'
      ? theme.palette.warning.dark
      : theme.palette.info.dark,
}));

const AmountText = styled(Typography)<{ type: string }>(({ theme, type }) => ({
  fontWeight: 600,
  color:
    type === 'payment' || type === 'refund'
      ? theme.palette.error.main
      : theme.palette.success.main,
}));

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  onViewTransaction: (transaction: Transaction) => void;
  onGenerateReceipt: (transaction: Transaction) => void;
  onExportTransactions: (selectedIds: string[]) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  isLoading,
  onViewTransaction,
  onGenerateReceipt,
  onExportTransactions,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, transaction: Transaction) => {
    event.stopPropagation();
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedTransaction(transaction);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchorEl(null);
  };

  const handleViewTransaction = () => {
    if (selectedTransaction) {
      onViewTransaction(selectedTransaction);
      handleCloseActionMenu();
    }
  };

  const handleGenerateReceipt = () => {
    if (selectedTransaction) {
      onGenerateReceipt(selectedTransaction);
      handleCloseActionMenu();
    }
  };

  const handleViewOnExplorer = () => {
    if (selectedTransaction?.blockchainTxHash) {
      window.open(
        `https://explorer.example.com/tx/${selectedTransaction.blockchainTxHash}`,
        '_blank'
      );
      handleCloseActionMenu();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <PaymentIcon fontSize="small" />;
      case 'receipt':
        return <ReceiptIcon fontSize="small" />;
      case 'refund':
        return <RefundIcon fontSize="small" />;
      case 'transfer':
        return <TransferIcon fontSize="small" />;
      default:
        return <PaymentIcon fontSize="small" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatAmount = (amount: number, type: string) => {
    // Format with 2 decimal places and add $ sign
    const formattedAmount = `$${amount.toFixed(2)}`;
    
    // For payments and refunds, we add a minus sign
    return (type === 'payment' || type === 'refund') ? `-${formattedAmount}` : formattedAmount;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Paper elevation={0} variant="outlined">
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Recent Transactions</Typography>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          disabled={selectedTransactions.length === 0}
          onClick={() => onExportTransactions(selectedTransactions)}
        >
          Export Selected
        </Button>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Counterparty</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Loading transactions...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No transactions found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    onClick={() => onViewTransaction(transaction)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {transaction.id.slice(0, 8)}...
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDate(transaction.timestamp)}</Typography>
                    </TableCell>
                    <TableCell>
                      <TypeChip
                        size="small"
                        icon={getTypeIcon(transaction.type)}
                        label={getTypeLabel(transaction.type)}
                        type={transaction.type}
                      />
                    </TableCell>
                    <TableCell>
                      <StatusChip size="small" label={transaction.status} status={transaction.status} />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{transaction.counterparty}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {transaction.counterpartyType}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <AmountText variant="body2" type={transaction.type}>
                        {formatAmount(transaction.amount, transaction.type)}
                      </AmountText>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleOpenActionMenu(event, transaction)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </TransactionRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleViewTransaction}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleGenerateReceipt}>
          <ListItemIcon>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Generate Receipt</ListItemText>
        </MenuItem>
        {selectedTransaction?.blockchainTxHash && (
          <MenuItem onClick={handleViewOnExplorer}>
            <ListItemIcon>
              <ExternalLinkIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View on Blockchain Explorer</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </Paper>
  );
};

export default TransactionTable; 