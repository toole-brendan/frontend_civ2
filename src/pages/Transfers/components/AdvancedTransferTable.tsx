import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Collapse,
  Button,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { formatCurrency, formatDate, formatRelativeTime } from '../../../utils/formatters';
import { Transfer } from '../types';

interface AdvancedTransferTableProps {
  transfers: Transfer[];
  onViewDetails: (transfer: Transfer) => void;
  onUpdateStatus: (transfer: Transfer, newStatus: string) => void;
  onProcessReceipt: (transfer: Transfer) => void;
  onTriggerPayment: (transfer: Transfer) => void;
  onViewDocuments: (transfer: Transfer) => void;
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, row?: any) => React.ReactNode;
  sortable?: boolean;
}

const AdvancedTransferTable: React.FC<AdvancedTransferTableProps> = ({
  transfers,
  onViewDetails,
  onUpdateStatus,
  onProcessReceipt,
  onTriggerPayment,
  onViewDocuments,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const theme = useTheme();
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'id', 'origin_destination', 'type', 'items', 'value', 'status', 'created_date', 
    'expected_arrival', 'last_update', 'actions'
  ]);
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleExpandRow = (transferId: string) => {
    setExpandedRow(expandedRow === transferId ? null : transferId);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, transfer: Transfer) => {
    event.stopPropagation();
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedTransfer(transfer);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleColumnMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setColumnMenuAnchorEl(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setColumnMenuAnchorEl(null);
  };

  const handleColumnToggle = (columnId: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnId)
        ? prev.filter(id => id !== columnId)
        : [...prev, columnId]
    );
  };

  const handleAction = (action: string) => {
    if (!selectedTransfer) return;
    
    switch (action) {
      case 'view':
        onViewDetails(selectedTransfer);
        break;
      case 'receipt':
        onProcessReceipt(selectedTransfer);
        break;
      case 'payment':
        onTriggerPayment(selectedTransfer);
        break;
      case 'documents':
        onViewDocuments(selectedTransfer);
        break;
      default:
        break;
    }
    
    handleActionMenuClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return theme.palette.info.light;
      case 'IN_PREPARATION':
        return theme.palette.info.main;
      case 'IN_TRANSIT':
        return theme.palette.primary.main;
      case 'IN_CUSTOMS':
        return theme.palette.warning.main;
      case 'QUALITY_CHECK':
        return theme.palette.secondary.main;
      case 'AWAITING_APPROVAL':
        return theme.palette.error.main;
      case 'COMPLETED':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getTransferTypeColor = (type: string) => {
    switch (type) {
      case 'INBOUND':
        return theme.palette.primary.main;
      case 'OUTBOUND':
        return theme.palette.secondary.main;
      case 'INTERNAL':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const formatStatusLabel = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const columns: Column[] = [
    { 
      id: 'id', 
      label: 'Transfer ID', 
      minWidth: 120,
      format: (value, row) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {row.blockchainTxId && (
            <Tooltip title="Blockchain Verified">
              <VerifiedIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            </Tooltip>
          )}
          <Typography variant="body2" fontWeight="medium">
            {value}
          </Typography>
        </Box>
      ),
    },
    { 
      id: 'origin_destination', 
      label: 'Origin/Destination', 
      minWidth: 200,
      format: (_, row) => (
        <Box>
          <Typography variant="body2" noWrap>
            <strong>From:</strong> {row.from.name}
          </Typography>
          <Typography variant="body2" noWrap>
            <strong>To:</strong> {row.to.name}
          </Typography>
        </Box>
      ),
    },
    { 
      id: 'type', 
      label: 'Type', 
      minWidth: 100,
      format: (value) => (
        <Chip 
          label={value} 
          size="small"
          sx={{ 
            backgroundColor: getTransferTypeColor(value) + '20',
            color: getTransferTypeColor(value),
            fontWeight: 'bold',
          }}
        />
      ),
    },
    { 
      id: 'items', 
      label: 'Items', 
      minWidth: 200,
      format: (_, row) => (
        <Box>
          <Typography variant="body2" noWrap>
            {row.items.length > 0 ? row.items[0].name : 'No items'}
            {row.items.length > 1 && ` +${row.items.length - 1} more`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total Qty: {row.items.reduce((sum: number, item: any) => sum + item.quantity, 0)} units
          </Typography>
        </Box>
      ),
    },
    { 
      id: 'value', 
      label: 'Value', 
      minWidth: 100,
      align: 'right',
      format: (value) => (
        <Typography variant="body2" fontWeight="bold">
          {formatCurrency(value)}
        </Typography>
      ),
    },
    { 
      id: 'status', 
      label: 'Status', 
      minWidth: 140,
      format: (value) => (
        <Chip 
          label={formatStatusLabel(value)} 
          size="small"
          sx={{ 
            backgroundColor: getStatusColor(value) + '20',
            color: getStatusColor(value),
            fontWeight: 'bold',
          }}
        />
      ),
    },
    { 
      id: 'created_date', 
      label: 'Created Date', 
      minWidth: 120,
      format: (value) => formatDate(value),
    },
    { 
      id: 'expected_arrival', 
      label: 'Expected Arrival', 
      minWidth: 120,
      format: (value) => formatDate(value),
    },
    { 
      id: 'last_update', 
      label: 'Last Update', 
      minWidth: 120,
      format: (value) => formatRelativeTime(value),
    },
    { 
      id: 'documents', 
      label: 'Documents', 
      minWidth: 100,
      format: (_, row) => (
        <Box>
          {row.documents ? (
            <Chip 
              label={`${row.documents.length} docs`} 
              size="small"
              variant="outlined"
              onClick={(e) => {
                e.stopPropagation();
                onViewDocuments(row);
              }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              None
            </Typography>
          )}
        </Box>
      ),
    },
    { 
      id: 'actions', 
      label: 'Actions', 
      minWidth: 100,
      align: 'center',
      format: (_, row) => (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton size="small" onClick={(e) => handleActionMenuOpen(e, row)}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleExpandRow(row.id)}>
            {expandedRow === row.id ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredColumns = columns.filter(column => selectedColumns.includes(column.id));

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          Active Transfers
        </Typography>
        <Box>
          <Button
            variant="outlined"
            size="small"
            onClick={handleColumnMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Customize Columns
          </Button>
          <Menu
            anchorEl={columnMenuAnchorEl}
            open={Boolean(columnMenuAnchorEl)}
            onClose={handleColumnMenuClose}
          >
            {columns.map((column) => (
              <MenuItem key={column.id} dense>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedColumns.includes(column.id)}
                      onChange={() => handleColumnToggle(column.id)}
                      size="small"
                    />
                  }
                  label={column.label}
                />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="transfers table">
          <TableHead>
            <TableRow>
              {filteredColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: theme.palette.background.default,
                    fontWeight: 'bold',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transfers.map((transfer) => (
              <React.Fragment key={transfer.id}>
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  onClick={() => handleExpandRow(transfer.id)}
                  sx={{ 
                    cursor: 'pointer',
                    backgroundColor: transfer.isCritical ? theme.palette.error.light + '20' : 'inherit',
                  }}
                >
                  {filteredColumns.map((column) => {
                    const value = column.id === 'totalValue' ? transfer.totalValue :
                                 column.id === 'id' ? transfer.id :
                                 column.id === 'type' ? transfer.type :
                                 column.id === 'status' ? transfer.status :
                                 column.id === 'created_date' ? transfer.dateInitiated :
                                 column.id === 'expected_arrival' ? transfer.expectedArrival :
                                 column.id === 'last_update' ? transfer.statusUpdateTime :
                                 null;
                    
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value, transfer) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
                
                {/* Expanded row */}
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={filteredColumns.length}>
                    <Collapse in={expandedRow === transfer.id} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 3, backgroundColor: theme.palette.background.default }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Transfer Details
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 2 }}>
                          {/* Timeline */}
                          <Box sx={{ flex: '1 1 300px' }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Timeline
                            </Typography>
                            <Box sx={{ ml: 2 }}>
                              {transfer.timeline?.map((event, index) => (
                                <Box key={index} sx={{ 
                                  position: 'relative', 
                                  pb: 2,
                                  pl: 3,
                                  borderLeft: index === transfer.timeline!.length - 1 ? 'none' : `2px solid ${theme.palette.divider}`,
                                }}>
                                  <Box sx={{ 
                                    width: 10, 
                                    height: 10, 
                                    borderRadius: '50%', 
                                    backgroundColor: theme.palette.primary.main,
                                    position: 'absolute',
                                    left: -5,
                                    top: 0,
                                  }} />
                                  <Typography variant="body2" fontWeight="medium">
                                    {event.event}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatDate(event.timestamp, { 
                                      year: 'numeric', 
                                      month: 'short', 
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })} • {event.actor}
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                          </Box>
                          
                          {/* Items */}
                          <Box sx={{ flex: '1 1 300px' }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Items
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Item</TableCell>
                                  <TableCell align="right">Quantity</TableCell>
                                  <TableCell align="right">Unit Price</TableCell>
                                  <TableCell align="right">Total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {transfer.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{formatCurrency(item.unitPrice)}</TableCell>
                                    <TableCell align="right">{formatCurrency(item.totalValue)}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell colSpan={3} align="right" sx={{ fontWeight: 'bold' }}>
                                    Total:
                                  </TableCell>
                                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                                    {formatCurrency(transfer.totalValue)}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                          
                          {/* Smart Contract */}
                          {transfer.smartContract && (
                            <Box sx={{ flex: '1 1 300px' }}>
                              <Typography variant="subtitle2" gutterBottom>
                                Smart Contract
                              </Typography>
                              <Box sx={{ 
                                p: 2, 
                                border: `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                backgroundColor: theme.palette.background.paper,
                              }}>
                                <Typography variant="body2">
                                  <strong>Contract ID:</strong> {transfer.smartContract.id}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Status:</strong> {transfer.smartContract.status}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Payment Terms:</strong> {transfer.smartContract.paymentTerms}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Payment Method:</strong> {transfer.smartContract.paymentMethod}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Amount:</strong> {formatCurrency(transfer.smartContract.paymentAmount)}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Trigger Condition:</strong> {transfer.smartContract.triggerCondition.replace(/_/g, ' ')}
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<PaymentIcon />}
                                    onClick={() => onTriggerPayment(transfer)}
                                    disabled={transfer.smartContract.paymentStatus !== 'PENDING'}
                                  >
                                    {transfer.smartContract.paymentStatus === 'PENDING' ? 'Trigger Payment' : 'Payment Processed'}
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          )}
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                          <Button
                            variant="outlined"
                            onClick={() => onViewDetails(transfer)}
                            startIcon={<VisibilityIcon />}
                            sx={{ mr: 1 }}
                          >
                            View Full Details
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => onProcessReceipt(transfer)}
                            startIcon={<ReceiptIcon />}
                            color="primary"
                          >
                            Process Receipt
                          </Button>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
      />
      
      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('receipt')}>
          <ListItemIcon>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Process Receipt</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('documents')}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Documents</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('payment')} disabled={!selectedTransfer?.smartContract}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Trigger Payment</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default AdvancedTransferTable; 