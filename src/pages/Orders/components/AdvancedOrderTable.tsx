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
  LinearProgress,
  TextField,
  InputAdornment,
  Button,
  Collapse,
  Grid,
  Divider,
  Avatar,
  Card,
  CardContent,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
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
  Search as SearchIcon,
  FilterList as FilterListIcon,
  GetApp as DownloadIcon,
  Print as PrintIcon,
  SwapVert as SortIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AssignmentTurnedIn as AssignmentIcon,
  CalendarToday as CalendarIcon,
  CreditCard as CreditCardIcon,
  QuestionAnswer as CommentIcon,
  Warning as WarningIcon,
  Flag as FlagIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Today as TodayIcon,
  Timeline as TimelineIcon,
  Person as PersonIcon,
  Check as CheckIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { Order, OrderItem } from '../types';

// Styled components for enhanced table
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.background.paper,
}));

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  fontWeight: 600,
  fontSize: '0.75rem',
  whiteSpace: 'nowrap',
  padding: theme.spacing(1.5),
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TableActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.75rem',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 8,
    height: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.action.hover,
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.action.disabled,
    borderRadius: 4,
    '&:hover': {
      backgroundColor: theme.palette.text.disabled,
    },
  },
}));

const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'isExpanded' && prop !== 'priority'
})<{ isExpanded?: boolean; priority?: 'high' | 'medium' | 'low' }>(
  ({ theme, isExpanded, priority }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: isExpanded
        ? theme.palette.action.selected
        : theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
    cursor: 'pointer',
    borderLeft: priority
      ? `4px solid ${
          priority === 'high'
            ? theme.palette.error.main
            : priority === 'medium'
            ? theme.palette.warning.main
            : theme.palette.success.main
        }`
      : 'none',
  })
);

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
    height: 20,
    fontSize: '0.65rem',
    backgroundColor: color.main || color[300],
    color: color.contrastText || theme.palette.getContrastText(color.main || color[300]),
    fontWeight: 500,
  };
});

const ProgressBarCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius * 2,
  },
}));

const DetailCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  backgroundColor: theme.palette.background.default,
  boxShadow: 'none',
}));

const ItemRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Order progress stages
const orderProgressStages = [
  { status: 'draft', label: 'Draft', value: 16.67 },
  { status: 'pending', label: 'Pending', value: 33.33 },
  { status: 'approved', label: 'Approved', value: 50.00 },
  { status: 'processing', label: 'Processing', value: 66.67 },
  { status: 'shipped', label: 'Shipped', value: 83.33 },
  { status: 'delivered', label: 'Delivered', value: 100.00 },
];

// Component props
interface AdvancedOrderTableProps {
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

export const AdvancedOrderTable: React.FC<AdvancedOrderTableProps> = ({
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
  const theme = useTheme();
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for selected rows
  const [selected, setSelected] = useState<string[]>([]);
  
  // State for action menu
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [actionOrderId, setActionOrderId] = useState<string | null>(null);
  
  // State for expanded rows
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  
  // State for detail tabs
  const [detailTab, setDetailTab] = useState<Record<string, number>>({});
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for sorting
  const [orderBy, setOrderBy] = useState<keyof Order>('dateCreated');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  
  // Check if an order is selected
  const isSelected = (id: string) => selected.includes(id);
  
  // Check if a row is expanded
  const isExpanded = (id: string) => expandedRows.includes(id);
  
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
    if (
      (event.target as HTMLElement).closest('button') ||
      (event.target as HTMLElement).closest('[role="checkbox"]')
    ) {
      return;
    }
    
    // Toggle row expansion
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
    
    // Initialize detail tab if not set
    if (!detailTab[id]) {
      setDetailTab((prev) => ({ ...prev, [id]: 0 }));
    }
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
  
  // Handle detail tab change
  const handleDetailTabChange = (id: string, newValue: number) => {
    setDetailTab((prev) => ({ ...prev, [id]: newValue }));
  };
  
  // Handle search change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  // Handle sort request
  const handleSortRequest = (property: keyof Order) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const searchFields = [
        order.orderNumber,
        order.customer,
        order.supplier,
        order.type,
        order.status,
        ...order.items.map((item) => item.name),
      ].filter(Boolean);
      
      const searchTermLower = searchTerm.toLowerCase();
      
      return searchFields.some(
        (field) => field && field.toLowerCase().includes(searchTermLower)
      );
    })
    .sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return order === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  
  // Get order priority (simulated logic)
  const getOrderPriority = (order: Order): 'high' | 'medium' | 'low' => {
    if (order.status === 'approved' && Date.now() > new Date(order.dateCreated).getTime() + 7 * 24 * 60 * 60 * 1000) {
      return 'high';
    }
    if (order.totalAmount > 1000) {
      return 'medium';
    }
    return 'low';
  };
  
  // Get progress value based on order status
  const getOrderProgress = (status: Order['status']) => {
    const stage = orderProgressStages.find((stage) => stage.status === status);
    return stage ? stage.value : 0;
  };
  
  // Calculate days from date to now
  const getDaysFromNow = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Get date display format
  const getDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = getDaysFromNow(dateString);
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return date > now ? 'Tomorrow' : 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString(undefined, { weekday: 'long' });
    }
    
    return date.toLocaleDateString();
  };

  // Truncate text with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  // Order detail tab panels
  const renderOrderDetailTabs = (order: Order) => {
    const currentTab = detailTab[order.id] || 0;
    
    return (
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={currentTab}
            onChange={(_, newValue) => handleDetailTabChange(order.id, newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Summary" />
            <Tab label="Items" />
            <Tab label="Timeline" />
            <Tab label="Documents" />
            <Tab label="Payment" />
          </Tabs>
        </Box>
        
        {/* Summary Tab */}
        {currentTab === 0 && (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Order Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Created: {new Date(order.dateCreated).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Updated: {new Date(order.dateUpdated).toLocaleString()}
                  </Typography>
                  {order.expectedDelivery && (
                    <Typography variant="body2" color="textSecondary">
                      Expected Delivery: {new Date(order.expectedDelivery).toLocaleDateString()}
                    </Typography>
                  )}
                </Box>
                
                <Typography variant="subtitle2" gutterBottom>
                  {order.type === 'purchase' ? 'Supplier' : 'Customer'} Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    {order.type === 'purchase' ? order.supplier : order.customer}
                  </Typography>
                  {order.shippingAddress && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="textSecondary">
                        Shipping Address:
                      </Typography>
                      <Typography variant="body2">
                        {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                        {order.shippingAddress.state} {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Financial Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                      Subtotal:
                    </Typography>
                    <Typography variant="body2">
                      ${order.items.reduce((sum, item) => sum + (item.total || 0), 0).toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                      Tax:
                    </Typography>
                    <Typography variant="body2">
                      ${order.items.reduce((sum, item) => sum + (item.tax || 0), 0).toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2">Total:</Typography>
                    <Typography variant="subtitle2" color="primary">
                      ${order.totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="subtitle2" gutterBottom>
                  Blockchain Verification
                </Typography>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {order.blockchainVerified ? (
                      <>
                        <VerifiedIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2">Verified on Blockchain</Typography>
                      </>
                    ) : (
                      <>
                        <WarningIcon color="warning" sx={{ mr: 1 }} />
                        <Typography variant="body2">Not Verified</Typography>
                      </>
                    )}
                  </Box>
                  {order.smartContractId && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LinkIcon fontSize="small" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="textSecondary">
                        Smart Contract: {order.smartContractId}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* Items Tab */}
        {currentTab === 1 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Order Items ({order.items.length})
            </Typography>
            
            {order.items.map((item) => (
              <ItemRow key={item.id}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: theme.palette.action.hover,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Typography variant="subtitle2">{item.quantity}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">{item.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      SKU: {item.sku} | Unit Price: ${item.unitPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    ${item.total.toFixed(2)}
                  </Typography>
                  <Chip
                    label={item.status || 'pending'}
                    size="small"
                    sx={{ height: 20, fontSize: '0.65rem' }}
                  />
                </Box>
              </ItemRow>
            ))}
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <TableActionButton
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                onClick={() => onPrintInvoice(order.id)}
              >
                Export Items
              </TableActionButton>
            </Box>
          </Box>
        )}
        
        {/* Timeline Tab */}
        {currentTab === 2 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Order Timeline
            </Typography>
            
            <Box sx={{ position: 'relative', ml: 2, mt: 2 }}>
              {/* Vertical timeline line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 10,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: theme.palette.divider,
                  zIndex: 0,
                }}
              />
              
              {/* Timeline events - simulated based on order data */}
              <Box sx={{ position: 'relative', mb: 3, ml: 3 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    left: -23,
                    top: 0,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.success.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}
                >
                  <CheckIcon sx={{ color: '#fff', fontSize: 14 }} />
                </Box>
                <Typography variant="subtitle2">Order Created</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(order.dateCreated).toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Order #{order.orderNumber} was created
                </Typography>
              </Box>
              
              {/* Conditionally show other events based on order status */}
              {order.status !== 'draft' && (
                <Box sx={{ position: 'relative', mb: 3, ml: 3 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -23,
                      top: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.warning.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <CheckIcon sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                  <Typography variant="subtitle2">Order Submitted</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(
                      new Date(order.dateCreated).getTime() + 1000 * 60 * 60
                    ).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Order was submitted for approval
                  </Typography>
                </Box>
              )}
              
              {(order.status === 'approved' ||
                order.status === 'processing' ||
                order.status === 'shipped' ||
                order.status === 'delivered') && (
                <Box sx={{ position: 'relative', mb: 3, ml: 3 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -23,
                      top: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.info.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <CheckIcon sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                  <Typography variant="subtitle2">Order Approved</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(
                      new Date(order.dateCreated).getTime() + 1000 * 60 * 60 * 24
                    ).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Order was approved and moved to processing
                  </Typography>
                </Box>
              )}
              
              {(order.status === 'shipped' || order.status === 'delivered') && (
                <Box sx={{ position: 'relative', mb: 3, ml: 3 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -23,
                      top: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.primary.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <ShippingIcon sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                  <Typography variant="subtitle2">Order Shipped</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(
                      new Date(order.dateCreated).getTime() + 1000 * 60 * 60 * 72
                    ).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Order was shipped to the destination
                  </Typography>
                </Box>
              )}
              
              {order.status === 'delivered' && (
                <Box sx={{ position: 'relative', mb: 3, ml: 3 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -23,
                      top: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.success.dark,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <CheckIcon sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                  <Typography variant="subtitle2">Order Delivered</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {order.expectedDelivery
                      ? new Date(order.expectedDelivery).toLocaleString()
                      : 'N/A'}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Order was delivered successfully
                  </Typography>
                </Box>
              )}
              
              {order.paymentStatus === 'paid' && (
                <Box sx={{ position: 'relative', mb: 3, ml: 3 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -23,
                      top: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: theme.palette.success.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1,
                    }}
                  >
                    <PaymentIcon sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                  <Typography variant="subtitle2">Payment Completed</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(
                      new Date(order.dateUpdated).getTime() - 1000 * 60 * 60 * 24
                    ).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Payment for ${order.totalAmount.toFixed(2)} was received
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
        
        {/* Documents Tab */}
        {currentTab === 3 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Order Documents
            </Typography>
            
            <Box>
              <ItemRow>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PdfIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                  <Typography variant="body2">Order Form - {order.orderNumber}</Typography>
                </Box>
                <Box>
                  <IconButton size="small">
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <PrintIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ItemRow>
              
              <ItemRow>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PdfIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                  <Typography variant="body2">Invoice - {order.orderNumber}</Typography>
                </Box>
                <Box>
                  <IconButton size="small">
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <PrintIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ItemRow>
              
              {order.status === 'shipped' && (
                <ItemRow>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PdfIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                    <Typography variant="body2">Shipping Documents</Typography>
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <PrintIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </ItemRow>
              )}
              
              {order.blockchainVerified && (
                <ItemRow>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <VerifiedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="body2">Blockchain Verification Certificate</Typography>
                  </Box>
                  <Box>
                    <IconButton size="small">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <PrintIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </ItemRow>
              )}
            </Box>
          </Box>
        )}
        
        {/* Payment Tab */}
        {currentTab === 4 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Payment Information
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Payment Status:
                </Typography>
                <PaymentStatusChip
                  label={order.paymentStatus}
                  paymentStatus={order.paymentStatus}
                  size="small"
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Total Amount:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  ${order.totalAmount.toFixed(2)}
                </Typography>
              </Box>
              
              {order.blockchainVerified && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Blockchain Payment Details
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Smart Contract:
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
                      {order.smartContractId || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Transaction Status:
                    </Typography>
                    <Typography variant="body2">
                      {order.paymentStatus === 'paid'
                        ? 'Confirmed (6 blocks)'
                        : 'Pending'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary">
                      Payment Method:
                    </Typography>
                    <Typography variant="body2">USDC</Typography>
                  </Box>
                </>
              )}
              
              {order.paymentStatus !== 'paid' && (
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PaymentIcon />}
                    onClick={() => onProcessPayment(order.id)}
                  >
                    Process Payment
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  };
  
  // Calculate empty rows for consistent pagination
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredOrders.length)
      : 0;
  
  return (
    <StyledPaper>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SearchBar
          placeholder="Search orders by number, customer, items..."
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
        
        <Box>
          <TableActionButton
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
          >
            Export
          </TableActionButton>
          <TableActionButton
            variant="outlined"
            size="small"
            startIcon={<PrintIcon />}
          >
            Print
          </TableActionButton>
          <TableActionButton
            variant="contained"
            size="small"
            color="primary"
            disabled={selected.length === 0}
          >
            Bulk Actions
          </TableActionButton>
        </Box>
      </Box>
      
      <StyledTableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableHeaderCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < orders.length}
                  checked={orders.length > 0 && selected.length === orders.length}
                  onChange={handleSelectAllClick}
                  inputProps={{
                    'aria-label': 'select all orders',
                  }}
                />
              </TableHeaderCell>
              <TableHeaderCell>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSortRequest('orderNumber')}
                >
                  Order #
                  {orderBy === 'orderNumber' && (
                    <SortIcon
                      fontSize="small"
                      sx={{
                        ml: 0.5,
                        transform: order === 'desc' ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  )}
                </Box>
              </TableHeaderCell>
              <TableHeaderCell
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => handleSortRequest('dateCreated')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Date
                  {orderBy === 'dateCreated' && (
                    <SortIcon
                      fontSize="small"
                      sx={{
                        ml: 0.5,
                        transform: order === 'desc' ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  )}
                </Box>
              </TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Customer/Supplier</TableHeaderCell>
              <TableHeaderCell
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => handleSortRequest('totalAmount')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Amount
                  {orderBy === 'totalAmount' && (
                    <SortIcon
                      fontSize="small"
                      sx={{
                        ml: 0.5,
                        transform: order === 'desc' ? 'rotate(180deg)' : 'none',
                      }}
                    />
                  )}
                </Box>
              </TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
              <TableHeaderCell>Progress</TableHeaderCell>
              <TableHeaderCell>Verification</TableHeaderCell>
              <TableHeaderCell>Payment</TableHeaderCell>
              <TableHeaderCell align="center">Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={30} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Loading orders...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">No orders found</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Try adjusting your search or filters
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => {
                    const isItemSelected = isSelected(order.id);
                    const isRowExpanded = isExpanded(order.id);
                    
                    return (
                      <React.Fragment key={order.id}>
                        <StyledTableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                          onClick={(event) => handleRowClick(event, order.id)}
                          isExpanded={isRowExpanded}
                          priority={getOrderPriority(order)}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              onClick={(event) => handleCheckboxClick(event, order.id)}
                              inputProps={{
                                'aria-labelledby': `order-${order.id}`,
                              }}
                            />
                          </TableCell>
                          <TableCell id={`order-${order.id}`}>
                            <Typography variant="body2" fontWeight="bold">
                              {order.orderNumber}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              ID: {truncateText(order.id, 8)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {getDateDisplay(order.dateCreated)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {getDaysFromNow(order.dateCreated)} days ago
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.type}
                              size="small"
                              sx={{
                                height: 24,
                                backgroundColor:
                                  order.type === 'purchase'
                                    ? theme.palette.primary.main
                                    : order.type === 'sales'
                                    ? theme.palette.success.main
                                    : theme.palette.warning.main,
                                color: '#fff',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <StatusChip label={order.status} orderStatus={order.status} size="small" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {order.type === 'purchase' ? order.supplier : order.customer}
                            </Typography>
                            {order.blockchainVerified && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <VerifiedIcon
                                  sx={{ fontSize: 12, color: theme.palette.primary.main, mr: 0.5 }}
                                />
                                <Typography variant="caption" color="primary">
                                  Verified
                                </Typography>
                              </Box>
                            )}
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              ${order.totalAmount.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ mr: 0.5 }}>
                                {order.items.length}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {order.items.length === 1 ? 'item' : 'items'}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <ProgressBarCell>
                              <LinearProgress
                                variant="determinate"
                                value={getOrderProgress(order.status)}
                                sx={{
                                  width: 60,
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: theme.palette.action.hover,
                                }}
                              />
                              <Typography variant="caption" color="textSecondary">
                                {Math.round(getOrderProgress(order.status))}%
                              </Typography>
                            </ProgressBarCell>
                          </TableCell>
                          <TableCell>
                            {order.blockchainVerified ? (
                              <Tooltip title="Verified on Blockchain">
                                <VerifiedIcon
                                  sx={{ color: theme.palette.primary.main, fontSize: 18 }}
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title="Not Verified">
                                <WarningIcon
                                  sx={{ color: theme.palette.warning.main, fontSize: 18 }}
                                />
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell>
                            <PaymentStatusChip
                              label={order.paymentStatus}
                              paymentStatus={order.paymentStatus}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={(event) => handleActionMenuOpen(event, order.id)}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                        
                        {/* Expanded details */}
                        {isRowExpanded && (
                          <TableRow>
                            <TableCell colSpan={11} sx={{ py: 0, backgroundColor: theme.palette.action.selected }}>
                              <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                                {renderOrderDetailTabs(order)}
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={11} />
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            if (actionOrderId) onViewOrder(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (actionOrderId) onEditOrder(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Order</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (actionOrderId) onDuplicateOrder(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            if (actionOrderId) onPrintOrder(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Order</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (actionOrderId) onPrintInvoice(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print Invoice</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            if (actionOrderId) onShipOrder(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <ShippingIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Ship Order</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (actionOrderId) onProcessPayment(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Process Payment</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            if (actionOrderId) onCancelOrder(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <CancelIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Cancel Order</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (actionOrderId) onDeleteOrder(actionOrderId);
            handleActionMenuClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete Order</ListItemText>
        </MenuItem>
      </Menu>
    </StyledPaper>
  );
};

export default AdvancedOrderTable; 