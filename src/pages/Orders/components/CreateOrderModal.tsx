import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  styled,
  SelectChangeEvent,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingCart as OrderIcon,
  LocalShipping as ShippingIcon,
  Description as BillingIcon,
  Payment as PaymentIcon,
  CheckCircle as ConfirmIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Order, OrderItem, Address } from '../types';

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2, 3),
  },
}));

const StepContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const ItemRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Interface for a new order
interface NewOrder {
  orderNumber: string;
  type: 'purchase' | 'sales' | 'return';
  status: 'draft' | 'pending' | 'approved';
  customerId?: string;
  supplierId?: string;
  dateCreated: Date;
  expectedDelivery?: Date | null;
  items: OrderItem[];
  notes?: string;
  assignedTo?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
}

interface CreateOrderModalProps {
  open: boolean;
  onClose: () => void;
  onCreateOrder: (order: NewOrder) => void;
  customers: Array<{ id: string; name: string }>;
  suppliers: Array<{ id: string; name: string }>;
  products: Array<{ id: string; name: string; sku: string; price: number }>;
}

const initialOrder: NewOrder = {
  orderNumber: '',
  type: 'sales',
  status: 'draft',
  dateCreated: new Date(),
  expectedDelivery: null,
  items: [],
  paymentStatus: 'unpaid',
};

const steps = ['Order Type', 'Order Items', 'Shipping & Delivery', 'Billing & Payment', 'Review'];

export const CreateOrderModal: React.FC<CreateOrderModalProps> = ({
  open,
  onClose,
  onCreateOrder,
  customers,
  suppliers,
  products,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState<NewOrder>(initialOrder);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Temporary state for the current item being added
  const [currentItem, setCurrentItem] = useState<Partial<OrderItem>>({
    id: '',
    productId: '',
    name: '',
    sku: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    tax: 0,
    total: 0,
  });

  // Generate a new order number
  React.useEffect(() => {
    if (open && orderData.orderNumber === '') {
      const date = new Date();
      const prefix = orderData.type === 'purchase' ? 'PO' : orderData.type === 'sales' ? 'SO' : 'RO';
      const timestamp = date.getTime().toString().slice(-6);
      const randomChars = Math.random().toString(36).substring(2, 5).toUpperCase();
      setOrderData({
        ...orderData,
        orderNumber: `${prefix}-${timestamp}-${randomChars}`,
      });
    }
  }, [open, orderData.type]);

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleClose = () => {
    onClose();
    // Reset form state
    setActiveStep(0);
    setOrderData(initialOrder);
    setValidationErrors({});
    setCurrentItem({
      id: '',
      productId: '',
      name: '',
      sku: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      tax: 0,
      total: 0,
    });
  };

  const handleSubmit = () => {
    onCreateOrder(orderData);
    handleClose();
  };

  const handleChange = (field: keyof NewOrder, value: any) => {
    setOrderData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when field is changed
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleItemChange = (field: keyof OrderItem, value: any) => {
    setCurrentItem((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Recalculate total if price, quantity, discount or tax changed
      if (['unitPrice', 'quantity', 'discount', 'tax'].includes(field)) {
        const price = Number(updated.unitPrice) || 0;
        const quantity = Number(updated.quantity) || 0;
        const discount = Number(updated.discount) || 0;
        const tax = Number(updated.tax) || 0;
        
        const subtotal = price * quantity;
        const discountAmount = (subtotal * discount) / 100;
        const taxAmount = ((subtotal - discountAmount) * tax) / 100;
        
        updated.total = subtotal - discountAmount + taxAmount;
      }
      
      return updated;
    });
  };

  const handleProductSelect = (product: { id: string; name: string; sku: string; price: number } | null) => {
    if (product) {
      setCurrentItem({
        ...currentItem,
        productId: product.id,
        name: product.name,
        sku: product.sku,
        unitPrice: product.price,
        total: product.price * (currentItem.quantity || 1),
      });
    } else {
      setCurrentItem({
        id: '',
        productId: '',
        name: '',
        sku: '',
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        tax: 0,
        total: 0,
      });
    }
  };

  const handleAddItem = () => {
    if (!currentItem.productId || !currentItem.name || !currentItem.quantity) {
      return;
    }

    // Create a new order item with an ID
    const newItem: OrderItem = {
      id: `item-${Date.now()}`,
      productId: currentItem.productId || '',
      name: currentItem.name || '',
      sku: currentItem.sku || '',
      quantity: Number(currentItem.quantity) || 0,
      unitPrice: Number(currentItem.unitPrice) || 0,
      discount: Number(currentItem.discount) || 0,
      tax: Number(currentItem.tax) || 0,
      total: Number(currentItem.total) || 0,
    };

    setOrderData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    // Reset current item
    setCurrentItem({
      id: '',
      productId: '',
      name: '',
      sku: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      tax: 0,
      total: 0,
    });
  };

  const handleRemoveItem = (id: string) => {
    setOrderData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 0: // Order Type
        if (!orderData.orderNumber) {
          errors.orderNumber = 'Order number is required';
        }
        if (orderData.type === 'purchase' && !orderData.supplierId) {
          errors.supplierId = 'Supplier is required for purchase orders';
        }
        if (orderData.type === 'sales' && !orderData.customerId) {
          errors.customerId = 'Customer is required for sales orders';
        }
        break;
      
      case 1: // Order Items
        if (orderData.items.length === 0) {
          errors.items = 'At least one item is required';
        }
        break;
      
      case 2: // Shipping & Delivery
        if (!orderData.expectedDelivery) {
          errors.expectedDelivery = 'Expected delivery date is required';
        }
        // Only require shipping address for sales orders
        if (orderData.type === 'sales' && (!orderData.shippingAddress?.street || !orderData.shippingAddress?.city)) {
          errors.shippingAddress = 'Shipping address is required for sales orders';
        }
        break;
      
      case 3: // Billing & Payment
        // Don't need to validate here as payment status is set by default
        break;
      
      case 4: // Review - final validation
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateOrderTotal = (): number => {
    return orderData.items.reduce((sum, item) => sum + (item.total || 0), 0);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StepContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Order Number"
                  value={orderData.orderNumber}
                  onChange={(e) => handleChange('orderNumber', e.target.value)}
                  error={!!validationErrors.orderNumber}
                  helperText={validationErrors.orderNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <OrderIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!validationErrors.type}>
                  <InputLabel>Order Type</InputLabel>
                  <Select
                    value={orderData.type}
                    label="Order Type"
                    onChange={(e: SelectChangeEvent) => handleChange('type', e.target.value)}
                  >
                    <MenuItem value="sales">Sales Order</MenuItem>
                    <MenuItem value="purchase">Purchase Order</MenuItem>
                    <MenuItem value="return">Return Order</MenuItem>
                  </Select>
                  {validationErrors.type && <FormHelperText>{validationErrors.type}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Order Date"
                  value={orderData.dateCreated}
                  onChange={(date) => date && handleChange('dateCreated', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!validationErrors.dateCreated,
                      helperText: validationErrors.dateCreated,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!validationErrors.status}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={orderData.status}
                    label="Status"
                    onChange={(e: SelectChangeEvent) => handleChange('status', e.target.value)}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                  </Select>
                  {validationErrors.status && <FormHelperText>{validationErrors.status}</FormHelperText>}
                </FormControl>
              </Grid>

              {orderData.type === 'sales' && (
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!validationErrors.customerId}>
                    <Autocomplete
                      options={customers}
                      getOptionLabel={(option) => option.name}
                      onChange={(_, value) => handleChange('customerId', value?.id || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Customer"
                          error={!!validationErrors.customerId}
                          helperText={validationErrors.customerId}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              )}

              {orderData.type === 'purchase' && (
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!validationErrors.supplierId}>
                    <Autocomplete
                      options={suppliers}
                      getOptionLabel={(option) => option.name}
                      onChange={(_, value) => handleChange('supplierId', value?.id || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Supplier"
                          error={!!validationErrors.supplierId}
                          helperText={validationErrors.supplierId}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  value={orderData.notes || ''}
                  onChange={(e) => handleChange('notes', e.target.value)}
                />
              </Grid>
            </Grid>
          </StepContent>
        );

      case 1:
        return (
          <StepContent>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Add Items to Order
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <Autocomplete
                    options={products}
                    getOptionLabel={(option) => `${option.name} (${option.sku})`}
                    onChange={(_, value) => handleProductSelect(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select Product"
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    margin="normal"
                    InputProps={{ inputProps: { min: 1 } }}
                    value={currentItem.quantity || ''}
                    onChange={(e) => handleItemChange('quantity', parseInt(e.target.value))}
                  />
                </Grid>
                <Grid item xs={6} md={2}>
                  <TextField
                    fullWidth
                    label="Unit Price"
                    type="number"
                    margin="normal"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      inputProps: { min: 0, step: 0.01 }
                    }}
                    value={currentItem.unitPrice || ''}
                    onChange={(e) => handleItemChange('unitPrice', parseFloat(e.target.value))}
                  />
                </Grid>
                <Grid item xs={6} md={1}>
                  <TextField
                    fullWidth
                    label="Discount %"
                    type="number"
                    margin="normal"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={currentItem.discount || ''}
                    onChange={(e) => handleItemChange('discount', parseFloat(e.target.value))}
                  />
                </Grid>
                <Grid item xs={6} md={1}>
                  <TextField
                    fullWidth
                    label="Tax %"
                    type="number"
                    margin="normal"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    value={currentItem.tax || ''}
                    onChange={(e) => handleItemChange('tax', parseFloat(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} md={1} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddItem}
                    startIcon={<AddIcon />}
                    disabled={!currentItem.productId}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {validationErrors.items && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {validationErrors.items}
              </Typography>
            )}

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Discount</TableCell>
                    <TableCell align="right">Tax</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData.items.length > 0 ? (
                    orderData.items.map((item) => (
                      <ItemRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                        <TableCell align="right">{item.discount}%</TableCell>
                        <TableCell align="right">{item.tax}%</TableCell>
                        <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </ItemRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography color="textSecondary">
                          No items added to this order yet
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  {orderData.items.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="right">
                        <Typography variant="subtitle1">Order Total:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">${calculateOrderTotal().toFixed(2)}</Typography>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </StepContent>
        );

      case 2:
        return (
          <StepContent>
            <Typography variant="h6" gutterBottom>
              Shipping & Delivery Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Expected Delivery Date"
                  value={orderData.expectedDelivery}
                  onChange={(date) => handleChange('expectedDelivery', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!validationErrors.expectedDelivery,
                      helperText: validationErrors.expectedDelivery,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  Shipping Address
                </Typography>
                {validationErrors.shippingAddress && (
                  <Typography color="error" variant="body2">
                    {validationErrors.shippingAddress}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={orderData.shippingAddress?.name || ''}
                  onChange={(e) =>
                    handleChange('shippingAddress', {
                      ...orderData.shippingAddress,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={orderData.shippingAddress?.street || ''}
                  onChange={(e) =>
                    handleChange('shippingAddress', {
                      ...orderData.shippingAddress,
                      street: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={orderData.shippingAddress?.city || ''}
                  onChange={(e) =>
                    handleChange('shippingAddress', {
                      ...orderData.shippingAddress,
                      city: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={orderData.shippingAddress?.state || ''}
                  onChange={(e) =>
                    handleChange('shippingAddress', {
                      ...orderData.shippingAddress,
                      state: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={orderData.shippingAddress?.postalCode || ''}
                  onChange={(e) =>
                    handleChange('shippingAddress', {
                      ...orderData.shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={orderData.shippingAddress?.country || ''}
                  onChange={(e) =>
                    handleChange('shippingAddress', {
                      ...orderData.shippingAddress,
                      country: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={orderData.shippingAddress?.phone || ''}
                  onChange={(e) =>
                    handleChange('shippingAddress', {
                      ...orderData.shippingAddress,
                      phone: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </StepContent>
        );

      case 3:
        return (
          <StepContent>
            <Typography variant="h6" gutterBottom>
              Billing & Payment Details
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={orderData.paymentStatus}
                label="Payment Status"
                onChange={(e: SelectChangeEvent) => handleChange('paymentStatus', e.target.value)}
              >
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="partial">Partially Paid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mb: 2 }}>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" gutterBottom>
                  Use same address for billing?
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant={
                        JSON.stringify(orderData.billingAddress) ===
                        JSON.stringify(orderData.shippingAddress)
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() =>
                        handleChange('billingAddress', orderData.shippingAddress)
                      }
                    >
                      Yes
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant={
                        JSON.stringify(orderData.billingAddress) !==
                        JSON.stringify(orderData.shippingAddress)
                          ? 'contained'
                          : 'outlined'
                      }
                      onClick={() =>
                        handleChange('billingAddress', {})
                      }
                    >
                      No
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>

            {JSON.stringify(orderData.billingAddress) !==
              JSON.stringify(orderData.shippingAddress) && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Billing Address
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={orderData.billingAddress?.name || ''}
                    onChange={(e) =>
                      handleChange('billingAddress', {
                        ...orderData.billingAddress,
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    value={orderData.billingAddress?.street || ''}
                    onChange={(e) =>
                      handleChange('billingAddress', {
                        ...orderData.billingAddress,
                        street: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={orderData.billingAddress?.city || ''}
                    onChange={(e) =>
                      handleChange('billingAddress', {
                        ...orderData.billingAddress,
                        city: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={6} md={4}>
                  <TextField
                    fullWidth
                    label="State/Province"
                    value={orderData.billingAddress?.state || ''}
                    onChange={(e) =>
                      handleChange('billingAddress', {
                        ...orderData.billingAddress,
                        state: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={6} md={4}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    value={orderData.billingAddress?.postalCode || ''}
                    onChange={(e) =>
                      handleChange('billingAddress', {
                        ...orderData.billingAddress,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    value={orderData.billingAddress?.country || ''}
                    onChange={(e) =>
                      handleChange('billingAddress', {
                        ...orderData.billingAddress,
                        country: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={orderData.billingAddress?.phone || ''}
                    onChange={(e) =>
                      handleChange('billingAddress', {
                        ...orderData.billingAddress,
                        phone: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            )}
          </StepContent>
        );

      case 4:
        return (
          <StepContent>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order Number
                  </Typography>
                  <Typography variant="body1">{orderData.orderNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order Type
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {orderData.type} Order
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Order Date
                  </Typography>
                  <Typography variant="body1">
                    {orderData.dateCreated.toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    label={orderData.status}
                    color={
                      orderData.status === 'approved'
                        ? 'success'
                        : orderData.status === 'pending'
                        ? 'warning'
                        : 'default'
                    }
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {orderData.type === 'sales' ? 'Customer' : 'Supplier'}
                  </Typography>
                  <Typography variant="body1">
                    {orderData.type === 'sales'
                      ? customers.find((c) => c.id === orderData.customerId)?.name || '-'
                      : suppliers.find((s) => s.id === orderData.supplierId)?.name || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Expected Delivery
                  </Typography>
                  <Typography variant="body1">
                    {orderData.expectedDelivery
                      ? orderData.expectedDelivery.toLocaleDateString()
                      : 'Not specified'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderData.items.map((item) => (
                    <ItemRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell align="right">${item.total.toFixed(2)}</TableCell>
                    </ItemRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={4} align="right">
                      <Typography variant="subtitle1">Order Total:</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle1">
                        ${calculateOrderTotal().toFixed(2)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Shipping Details
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  {orderData.shippingAddress ? (
                    <>
                      <Typography variant="body1">
                        {orderData.shippingAddress.name}
                      </Typography>
                      <Typography variant="body2">
                        {orderData.shippingAddress.street}
                      </Typography>
                      <Typography variant="body2">
                        {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{' '}
                        {orderData.shippingAddress.postalCode}
                      </Typography>
                      <Typography variant="body2">
                        {orderData.shippingAddress.country}
                      </Typography>
                      {orderData.shippingAddress.phone && (
                        <Typography variant="body2">
                          Phone: {orderData.shippingAddress.phone}
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No shipping address provided
                    </Typography>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Payment Information
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Payment Status
                  </Typography>
                  <Chip
                    label={orderData.paymentStatus}
                    color={
                      orderData.paymentStatus === 'paid'
                        ? 'success'
                        : orderData.paymentStatus === 'partial'
                        ? 'warning'
                        : 'error'
                    }
                  />

                  {orderData.billingAddress && (
                    <>
                      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                        Billing Address
                      </Typography>
                      <Typography variant="body1">
                        {orderData.billingAddress.name}
                      </Typography>
                      <Typography variant="body2">
                        {orderData.billingAddress.street}
                      </Typography>
                      <Typography variant="body2">
                        {orderData.billingAddress.city}, {orderData.billingAddress.state}{' '}
                        {orderData.billingAddress.postalCode}
                      </Typography>
                      <Typography variant="body2">
                        {orderData.billingAddress.country}
                      </Typography>
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </StepContent>
        );

      default:
        return null;
    }
  };

  return (
    <StyledDialog
      open={open}
      maxWidth="md"
      fullWidth
      scroll="paper"
      aria-labelledby="create-order-dialog-title"
    >
      <DialogTitle id="create-order-dialog-title">
        <Typography variant="h6">Create New Order</Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {renderStepContent(activeStep)}
      </DialogContent>

      <DialogActions>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        
        <Box sx={{ flex: '1 1 auto' }} />
        
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit} startIcon={<ConfirmIcon />}>
            Create Order
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default CreateOrderModal; 