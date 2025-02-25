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
  Checkbox,
  IconButton,
  Chip,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  CircularProgress,
  Badge,
  styled,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  PictureAsPdf as PdfIcon,
  LocalShipping as ShippingIcon,
  Receipt as ReceiptIcon,
  ContentCopy as DuplicateIcon,
  CheckCircle as VerifiedIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  PaymentOutlined as PaymentIcon,
} from '@mui/icons-material';
import { Order } from '../types';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  cursor: 'pointer',
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'orderStatus',
})<{ orderStatus: Order['status'] }>(({ theme, orderStatus }) => {
  let color: any; // Use 'any' to avoid strict typechecking for palette
  switch (orderStatus) {
    case 'draft':
      color = theme.palette.grey;
      break;
    case 'pending':
      color = theme.palette.warning;
      break;
    case 'approved':
      color = theme.palette.info;
      break;
    case 'processing':
      color = theme.palette.primary;
      break;
    case 'shipped':
      color = theme.palette.primary;
      break;
    case 'delivered':
      color = theme.palette.success;
      break;
    case 'cancelled':
      color = theme.palette.error;
      break;
    default:
      color = theme.palette.grey;
  }
  
  return {
    height: 24,
    fontSize: '0.75rem',
    backgroundColor: color.main || color[300],
    color: color.contrastText || theme.palette.getContrastText(color.main || color[300]),
    fontWeight: 500,
  };
});

const PaymentStatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'paymentStatus',
})<{ paymentStatus: Order['paymentStatus'] }>(({ theme, paymentStatus }) => {
  let color: any; // Use 'any' to avoid strict typechecking for palette
  switch (paymentStatus) {
    case 'paid':
      color = theme.palette.success;
      break;
    case 'partial':
      color = theme.palette.warning;
      break;
    case 'unpaid':
      color = theme.palette.error;
      break;
    case 'refunded':
      color = theme.palette.info;
      break;
    default:
      color = theme.palette.grey;
  }
  
  return {
    height: 24,
    fontSize: '0.75rem',
    backgroundColor: color.main || color[300],
    color: color.contrastText || theme.palette.getContrastText(color.main || color[300]),
    fontWeight: 500,
  };
});

// Component props
interface OrderTableProps {
  orders: Order[];
  loading?: boolean;
  onViewOrder: (id: string) => void;
  onEditOrder: (id: string) => void;
  onDeleteOrder: (id: string) => void;
  onDuplicateOrder: (id: string) => void;
  onCancelOrder: (id: string) => void;
  onShipOrder: (id: string) => void;
  onPrintOrder: (id: string) => void;
  onPrintInvoice: (id: string) => void;
  onProcessPayment: (id: string) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  loading = false,
  onViewOrder,
  onEditOrder,
  onDeleteOrder,
  onDuplicateOrder,
  onCancelOrder,
  onShipOrder,
  onPrintOrder,
  onPrintInvoice,
  onProcessPayment,
  onSelectionChange,
}) => {
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for selected rows
  const [selected, setSelected] = useState<string[]>([]);
  
  // State for action menu
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [actionOrderId, setActionOrderId] = useState<string | null>(null);
  
  // Check if an order is selected
  const isSelected = (id: string) => selected.includes(id);
  
  // Handle select all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = orders.map((order) => order.id);
      setSelected(newSelected);
      if (onSelectionChange) onSelectionChange(newSelected);
      return;
    }
    setSelected([]);
    if (onSelectionChange) onSelectionChange([]);
  };
  
  // Handle row click for selection
  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    // Prevent selection when clicking on action buttons
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    
    onViewOrder(id);
  };
  
  // Handle checkbox click
  const handleCheckboxClick = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation();
    
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    
    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((itemId) => itemId !== id);
    }
    
    setSelected(newSelected);
    if (onSelectionChange) onSelectionChange(newSelected);
  };
  
  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle action menu open
  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    setActionOrderId(id);
    setActionMenuAnchor(event.currentTarget);
  };
  
  // Handle action menu close
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setActionOrderId(null);
  };
  
  // Handle action menu item click
  const handleActionClick = (action: 'view' | 'edit' | 'delete' | 'duplicate' | 'cancel' | 'ship' | 'print' | 'invoice' | 'payment') => {
    if (!actionOrderId) return;
    
    switch (action) {
      case 'view':
        onViewOrder(actionOrderId);
        break;
      case 'edit':
        onEditOrder(actionOrderId);
        break;
      case 'delete':
        onDeleteOrder(actionOrderId);
        break;
      case 'duplicate':
        onDuplicateOrder(actionOrderId);
        break;
      case 'cancel':
        onCancelOrder(actionOrderId);
        break;
      case 'ship':
        onShipOrder(actionOrderId);
        break;
      case 'print':
        onPrintOrder(actionOrderId);
        break;
      case 'invoice':
        onPrintInvoice(actionOrderId);
        break;
      case 'payment':
        onProcessPayment(actionOrderId);
        break;
      default:
        break;
    }
    
    handleActionMenuClose();
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString();
  };
  
  // Get visible rows based on pagination
  const visibleRows = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  // Get order type label
  const getOrderTypeLabel = (type: Order['type']) => {
    switch (type) {
      case 'purchase':
        return 'Purchase';
      case 'sales':
        return 'Sales';
      case 'return':
        return 'Return';
      default:
        return type;
    }
  };

  // Get customer/supplier name
  const getPartyName = (order: Order): string => {
    if (order.type === 'purchase') {
      return order.supplier || 'N/A';
    } else {
      return order.customer || 'N/A';
    }
  };

  return (
    <StyledPaper>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < orders.length}
                  checked={orders.length > 0 && selected.length === orders.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Order #</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer/Supplier</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={32} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Loading orders...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">
                    No orders found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or create a new order
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((order) => {
                const isItemSelected = isSelected(order.id);
                
                return (
                  <StyledTableRow
                    hover
                    key={order.id}
                    onClick={(event) => handleRowClick(event, order.id)}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, order.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {order.orderNumber}
                        </Typography>
                        {order.blockchainVerified && (
                          <Tooltip title="Blockchain Verified">
                            <VerifiedIcon color="success" fontSize="small" sx={{ ml: 1 }} />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {getOrderTypeLabel(order.type)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(order.dateCreated)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {getPartyName(order)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {formatCurrency(order.totalAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        label={order.status}
                        size="small"
                        orderStatus={order.status}
                      />
                    </TableCell>
                    <TableCell>
                      <PaymentStatusChip
                        label={order.paymentStatus}
                        size="small"
                        paymentStatus={order.paymentStatus}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleActionMenuOpen(event, order.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={() => handleActionClick('view')}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('duplicate')}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('payment')}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Process Payment</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('ship')}>
          <ListItemIcon>
            <ShippingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ship Order</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('print')}>
          <ListItemIcon>
            <PdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Order</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('invoice')}>
          <ListItemIcon>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Invoice</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('cancel')}>
          <ListItemIcon>
            <CancelIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Cancel Order</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('delete')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </StyledPaper>
  );
};

export default OrderTable; 