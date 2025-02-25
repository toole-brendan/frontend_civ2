import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
  Collapse,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CalendarMonth as DateIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { OrderFilters as OrderFiltersType } from '../types';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const FilterSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const FiltersContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

// Default state for filters
const defaultFilters: OrderFiltersType = {
  search: '',
  type: '',
  status: '',
  dateRange: {
    start: null,
    end: null,
  },
  customer: '',
  supplier: '',
  paymentStatus: '',
  minAmount: null,
  maxAmount: null,
};

// Types for props
interface OrderFiltersProps {
  initialFilters?: Partial<OrderFiltersType>;
  onFilterChange: (filters: OrderFiltersType) => void;
  onClearFilters: () => void;
  customers: Array<{id: string, name: string}>;
  suppliers: Array<{id: string, name: string}>;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({
  initialFilters,
  onFilterChange,
  onClearFilters,
  customers,
  suppliers,
}) => {
  // State for filters
  const [filters, setFilters] = useState<OrderFiltersType>({
    ...defaultFilters,
    ...initialFilters,
  });

  // State for showing advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Update filters and notify parent
  const updateFilters = (newFilters: Partial<OrderFiltersType>) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
    };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: event.target.value });
  };

  // Handle select changes
  const handleSelectChange = (field: keyof OrderFiltersType) => (event: SelectChangeEvent) => {
    updateFilters({ [field]: event.target.value });
  };

  // Handle date changes
  const handleDateChange = (field: 'start' | 'end') => (date: Date | null) => {
    updateFilters({
      dateRange: {
        ...filters.dateRange,
        [field]: date,
      },
    });
  };

  // Handle amount changes
  const handleAmountChange = (field: 'minAmount' | 'maxAmount') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseFloat(event.target.value) : null;
    updateFilters({ [field]: value });
  };

  // Toggle advanced filters
  const handleToggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters(defaultFilters);
    onClearFilters();
  };

  return (
    <StyledPaper>
      {/* Basic Filters */}
      <FilterSection>
        <TextField
          placeholder="Search orders..."
          value={filters.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          variant="outlined"
          size="small"
          sx={{ flexGrow: 1, minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="order-type-label">Order Type</InputLabel>
          <Select
            labelId="order-type-label"
            value={filters.type}
            label="Order Type"
            onChange={handleSelectChange('type')}
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="purchase">Purchase</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="return">Return</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel id="order-status-label">Status</InputLabel>
          <Select
            labelId="order-status-label"
            value={filters.status}
            label="Status"
            onChange={handleSelectChange('status')}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <Button
          onClick={handleToggleAdvancedFilters}
          endIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          color="primary"
          size="small"
        >
          Advanced Filters
        </Button>

        <IconButton onClick={handleClearFilters} title="Clear filters">
          <ClearIcon />
        </IconButton>
      </FilterSection>

      {/* Advanced Filters */}
      <Collapse in={showAdvancedFilters}>
        <FiltersContainer>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" gutterBottom>
            Advanced Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="payment-status-label">Payment Status</InputLabel>
                <Select
                  labelId="payment-status-label"
                  value={filters.paymentStatus}
                  label="Payment Status"
                  onChange={handleSelectChange('paymentStatus')}
                >
                  <MenuItem value="">All Payment Statuses</MenuItem>
                  <MenuItem value="unpaid">Unpaid</MenuItem>
                  <MenuItem value="partial">Partially Paid</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="refunded">Refunded</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="customer-label">Customer</InputLabel>
                <Select
                  labelId="customer-label"
                  value={filters.customer}
                  label="Customer"
                  onChange={handleSelectChange('customer')}
                >
                  <MenuItem value="">All Customers</MenuItem>
                  {customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="supplier-label">Supplier</InputLabel>
                <Select
                  labelId="supplier-label"
                  value={filters.supplier}
                  label="Supplier"
                  onChange={handleSelectChange('supplier')}
                >
                  <MenuItem value="">All Suppliers</MenuItem>
                  {suppliers.map(supplier => (
                    <MenuItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DateIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Date Range:
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="From"
                value={filters.dateRange.start}
                onChange={handleDateChange('start')}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker
                label="To"
                value={filters.dateRange.end}
                onChange={handleDateChange('end')}
                slotProps={{ textField: { size: 'small', fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Amount Range:
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Min Amount"
                type="number"
                fullWidth
                size="small"
                value={filters.minAmount === null ? '' : filters.minAmount}
                onChange={handleAmountChange('minAmount')}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Max Amount"
                type="number"
                fullWidth
                size="small"
                value={filters.maxAmount === null ? '' : filters.maxAmount}
                onChange={handleAmountChange('maxAmount')}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 0.5 }}>$</Typography>,
                }}
              />
            </Grid>
          </Grid>
        </FiltersContainer>
      </Collapse>
    </StyledPaper>
  );
};

export default OrderFilters; 