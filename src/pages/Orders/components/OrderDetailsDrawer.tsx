import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Typography,
  Tabs,
  Tab,
  Button,
  IconButton,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemText,
  Alert,
  Avatar,
  Tooltip,
  styled,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  LocalShipping as ShippingIcon,
  Receipt as ReceiptIcon,
  Delete as DeleteIcon,
  History as HistoryIcon,
  CheckCircle as VerifiedIcon,
  FileCopy as DuplicateIcon,
  FileCopy,
  Payment as PaymentIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Visibility as ViewIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { Order, OrderItem, PaymentRecord, RelatedDocument } from '../types';

// Define styled components
const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(3),
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'orderStatus',
})<{ orderStatus: Order['status'] }>(({ theme, orderStatus }) => {
  let color: any;
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
    backgroundColor: color.main || color[300],
    color: color.contrastText || theme.palette.getContrastText(color.main || color[300]),
    fontWeight: 500,
  };
});

const PaymentStatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'paymentStatus',
})<{ paymentStatus: Order['paymentStatus'] }>(({ theme, paymentStatus }) => {
  let color: any;
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
    backgroundColor: color.main || color[300],
    color: color.contrastText || theme.palette.getContrastText(color.main || color[300]),
    fontWeight: 500,
  };
});

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  boxShadow: theme.shadows[1],
}));

const OrderDetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
    <Typography color="text.secondary" variant="body2">{label}:</Typography>
    <Box sx={{ textAlign: 'right' }}>{value}</Box>
  </Box>
);

// Define props
interface OrderDetailsDrawerProps {
  open: boolean;
  order: Order | null;
  paymentRecords?: PaymentRecord[];
  statusHistory?: { date: string; status: Order['status']; user: string; notes?: string }[];
  onClose: () => void;
  onSave: (order: Order) => void;
  onShip: (id: string) => void;
  onCancel: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPrintOrder: (id: string) => void;
  onPrintInvoice: (id: string) => void;
  onProcessPayment: (id: string) => void;
}

export const OrderDetailsDrawer: React.FC<OrderDetailsDrawerProps> = ({
  open,
  order,
  paymentRecords = [],
  statusHistory = [],
  onClose,
  onSave,
  onShip,
  onCancel,
  onDelete,
  onDuplicate,
  onPrintOrder,
  onPrintInvoice,
  onProcessPayment,
}) => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editedOrder, setEditedOrder] = useState<Order | null>(null);
  
  // Reset state when order changes
  useEffect(() => {
    setEditedOrder(order ? { ...order } : null);
    setEditMode(false);
    setTabValue(0);
  }, [order]);
  
  if (!order || !editedOrder) {
    return null;
  }
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Calculate total for an item
  const calculateItemTotal = (item: OrderItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const taxAmount = subtotal * (item.tax / 100);
    const discountAmount = subtotal * (item.discount / 100);
    return subtotal + taxAmount - discountAmount;
  };
  
  // Handle edit mode toggle
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedOrder(order ? { ...order } : null);
    setEditMode(false);
  };
  
  // Handle save changes
  const handleSave = () => {
    if (editedOrder) {
      onSave(editedOrder);
      setEditMode(false);
    }
  };
  
  // Handle text field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedOrder) return;
    
    const { name, value } = e.target;
    setEditedOrder({
      ...editedOrder,
      [name]: value,
    });
  };
  
  // Function to get customer/supplier name
  const getPartyName = () => {
    if (order.type === 'purchase') {
      return order.supplier || 'N/A';
    } else {
      return order.customer || 'N/A';
    }
  };
  
  // Function to get the address string
  const formatAddress = (address?: { street: string; city: string; state: string; postalCode: string; country: string }) => {
    if (!address) return 'Not specified';
    return `${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`;
  };
  
  // Render order status history
  const renderStatusHistory = () => {
    if (!statusHistory.length) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          No status history available
        </Typography>
      );
    }
    
    return (
      <List>
        {statusHistory.map((record, index) => (
          <ListItem key={index} divider={index < statusHistory.length - 1}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <TimelineIcon />
            </Avatar>
            <ListItemText
              primary={
                <Typography variant="subtitle2">
                  Status changed to <StatusChip label={record.status} size="small" orderStatus={record.status} />
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(record.date)} by {record.user}
                  </Typography>
                  {record.notes && (
                    <Typography variant="body2" color="text.secondary">
                      Notes: {record.notes}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    );
  };
  
  // Render payment history
  const renderPaymentHistory = () => {
    if (!paymentRecords.length) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          No payment records available
        </Typography>
      );
    }
    
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Reference</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentRecords.map((payment) => (
              <TableRow key={payment.id} hover>
                <TableCell>{formatDate(payment.date.toString())}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell align="right">{formatCurrency(payment.amount)}</TableCell>
                <TableCell>
                  <Chip 
                    label={payment.status} 
                    size="small" 
                    color={
                      payment.status === 'completed' ? 'success' :
                      payment.status === 'refunded' ? 'info' :
                      payment.status === 'failed' ? 'error' : 'warning'
                    }
                  />
                </TableCell>
                <TableCell>{payment.notes || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  // Render related documents
  const renderRelatedDocuments = () => {
    if (!order.relatedDocuments || !order.relatedDocuments.length) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          No related documents available
        </Typography>
      );
    }
    
    return (
      <List>
        {order.relatedDocuments.map((doc, index) => (
          <ListItem key={doc.id} divider={index < order.relatedDocuments!.length - 1}>
            <ListItemText
              primary={doc.name}
              secondary={`Type: ${doc.type} | Created: ${formatDate(doc.dateCreated)}`}
            />
            <Tooltip title="View">
              <IconButton component="a" href={doc.url} target="_blank">
                <ViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton component="a" href={doc.url} download>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ width: { xs: '100%', md: 700 }, '& .MuiDrawer-paper': { width: { xs: '100%', md: 700 } } }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6">
              Order #{order.orderNumber}
            </Typography>
            {order.blockchainVerified && (
              <Tooltip title="Blockchain Verified">
                <VerifiedIcon color="success" sx={{ ml: 1 }} />
              </Tooltip>
            )}
          </Box>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<ReceiptIcon />} label="Details" />
          <Tab icon={<PaymentIcon />} label="Payments" />
          <Tab icon={<HistoryIcon />} label="History" />
          <Tab icon={<FileCopy />} label="Documents" />
        </Tabs>
        
        <DrawerContent>
          {/* Details Tab */}
          {tabValue === 0 && (
            <>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1}>
                  <StatusChip
                    label={order.status}
                    orderStatus={order.status}
                  />
                  <PaymentStatusChip
                    label={order.paymentStatus}
                    paymentStatus={order.paymentStatus}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  {!editMode ? (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={handleEditToggle}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ShippingIcon />}
                        onClick={() => onShip(order.id)}
                        disabled={['delivered', 'cancelled', 'shipped'].includes(order.status)}
                      >
                        Ship
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={() => onCancel(order.id)}
                        disabled={['delivered', 'cancelled'].includes(order.status)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </Stack>
              </Box>
              
              <Grid container spacing={3}>
                {/* Order Info Card */}
                <Grid item xs={12} md={6}>
                  <InfoCard>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Order Information
                    </Typography>
                    <OrderDetailItem
                      label="Order Type"
                      value={
                        <Typography variant="body2">
                          {order.type.charAt(0).toUpperCase() + order.type.slice(1)}
                        </Typography>
                      }
                    />
                    <OrderDetailItem
                      label="Date Created"
                      value={
                        <Typography variant="body2">
                          {formatDate(order.dateCreated)}
                        </Typography>
                      }
                    />
                    <OrderDetailItem
                      label="Last Updated"
                      value={
                        <Typography variant="body2">
                          {formatDate(order.dateUpdated)}
                        </Typography>
                      }
                    />
                    {order.expectedDelivery && (
                      <OrderDetailItem
                        label="Expected Delivery"
                        value={
                          <Typography variant="body2">
                            {formatDate(order.expectedDelivery)}
                          </Typography>
                        }
                      />
                    )}
                    {order.assignedTo && (
                      <OrderDetailItem
                        label="Assigned To"
                        value={
                          <Typography variant="body2">
                            {order.assignedTo}
                          </Typography>
                        }
                      />
                    )}
                    {order.smartContractId && (
                      <OrderDetailItem
                        label="Smart Contract ID"
                        value={
                          <Tooltip title={order.smartContractId}>
                            <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                              {order.smartContractId.substring(0, 10)}...
                            </Typography>
                          </Tooltip>
                        }
                      />
                    )}
                    <OrderDetailItem
                      label={order.type === 'purchase' ? 'Supplier' : 'Customer'}
                      value={
                        <Typography variant="body2">
                          {getPartyName()}
                        </Typography>
                      }
                    />
                  </InfoCard>
                </Grid>
                
                {/* Address Card */}
                <Grid item xs={12} md={6}>
                  <InfoCard>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Addresses
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2">Shipping Address</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {formatAddress(order.shippingAddress)}
                      </Typography>
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                        <Typography variant="subtitle2">Billing Address</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {formatAddress(order.billingAddress)}
                      </Typography>
                    </Box>
                  </InfoCard>
                </Grid>
                
                {/* Notes */}
                <Grid item xs={12}>
                  <InfoCard>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Notes
                    </Typography>
                    {editMode ? (
                      <TextField
                        name="notes"
                        value={editedOrder.notes || ''}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="Add notes about this order"
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {order.notes || 'No notes available'}
                      </Typography>
                    )}
                  </InfoCard>
                </Grid>
                
                {/* Order Items */}
                <Grid item xs={12}>
                  <InfoCard>
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                      Order Items
                    </Typography>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Item</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell align="right">Unit Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Discount</TableCell>
                            <TableCell align="right">Tax</TableCell>
                            <TableCell align="right">Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.sku}</TableCell>
                              <TableCell align="right">{formatCurrency(item.unitPrice)}</TableCell>
                              <TableCell align="right">{item.quantity}</TableCell>
                              <TableCell align="right">{item.discount}%</TableCell>
                              <TableCell align="right">{item.tax}%</TableCell>
                              <TableCell align="right">{formatCurrency(item.total)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Box sx={{ width: '250px' }}>
                        <OrderDetailItem
                          label="Subtotal"
                          value={
                            <Typography variant="body2">
                              {formatCurrency(order.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0))}
                            </Typography>
                          }
                        />
                        <OrderDetailItem
                          label="Tax"
                          value={
                            <Typography variant="body2">
                              {formatCurrency(order.items.reduce((acc, item) => acc + (item.total - (item.quantity * item.unitPrice * (1 - item.discount / 100))), 0))}
                            </Typography>
                          }
                        />
                        <OrderDetailItem
                          label="Discount"
                          value={
                            <Typography variant="body2" color="error">
                              -{formatCurrency(order.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice * (item.discount / 100)), 0))}
                            </Typography>
                          }
                        />
                        <Divider sx={{ my: 1 }} />
                        <OrderDetailItem
                          label="Total"
                          value={
                            <Typography variant="subtitle2" fontWeight="bold">
                              {formatCurrency(order.totalAmount)}
                            </Typography>
                          }
                        />
                      </Box>
                    </Box>
                  </InfoCard>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => onDelete(order.id)}
                >
                  Delete Order
                </Button>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<DuplicateIcon />}
                    onClick={() => onDuplicate(order.id)}
                  >
                    Duplicate
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => onPrintOrder(order.id)}
                  >
                    Print Order
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ReceiptIcon />}
                    onClick={() => onPrintInvoice(order.id)}
                  >
                    Print Invoice
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PaymentIcon />}
                    color="primary"
                    onClick={() => onProcessPayment(order.id)}
                    disabled={order.paymentStatus === 'paid'}
                  >
                    {order.paymentStatus === 'unpaid' ? 'Make Payment' : 
                     order.paymentStatus === 'partial' ? 'Complete Payment' : 
                     'View Payment'}
                  </Button>
                </Stack>
              </Box>
            </>
          )}
          
          {/* Payments Tab */}
          {tabValue === 1 && (
            <>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Payment History</Typography>
                <Button
                  variant="contained"
                  startIcon={<PaymentIcon />}
                  color="primary"
                  onClick={() => onProcessPayment(order.id)}
                  disabled={order.paymentStatus === 'paid'}
                >
                  {order.paymentStatus === 'unpaid' ? 'Make Payment' : 
                   order.paymentStatus === 'partial' ? 'Complete Payment' : 
                   'View Payment'}
                </Button>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <OrderDetailItem
                  label="Total Amount"
                  value={
                    <Typography variant="subtitle1" fontWeight="bold">
                      {formatCurrency(order.totalAmount)}
                    </Typography>
                  }
                />
                <OrderDetailItem
                  label="Payment Status"
                  value={
                    <PaymentStatusChip label={order.paymentStatus} paymentStatus={order.paymentStatus} />
                  }
                />
                {order.paymentStatus === 'partial' && (
                  <OrderDetailItem
                    label="Remaining Amount"
                    value={
                      <Typography variant="body2" color="error.main" fontWeight="bold">
                        {formatCurrency(order.totalAmount - paymentRecords.reduce((acc, record) => record.status === 'completed' ? acc + record.amount : acc, 0))}
                      </Typography>
                    }
                  />
                )}
              </Box>
              
              {renderPaymentHistory()}
            </>
          )}
          
          {/* History Tab */}
          {tabValue === 2 && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">Status History</Typography>
              </Box>
              {renderStatusHistory()}
            </>
          )}
          
          {/* Documents Tab */}
          {tabValue === 3 && (
            <>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Related Documents</Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    startIcon={<PrintIcon />}
                    onClick={() => onPrintOrder(order.id)}
                  >
                    Print Order
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ReceiptIcon />}
                    onClick={() => onPrintInvoice(order.id)}
                  >
                    Print Invoice
                  </Button>
                </Stack>
              </Box>
              {renderRelatedDocuments()}
            </>
          )}
        </DrawerContent>
      </Box>
    </Drawer>
  );
};

export default OrderDetailsDrawer; 