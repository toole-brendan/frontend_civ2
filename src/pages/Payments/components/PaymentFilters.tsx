import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  TextField, 
  MenuItem, 
  Chip,
  Button,
  IconButton,
  Collapse,
  Grid,
  Slider,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
  useTheme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  X,
  RefreshCw
} from 'lucide-react';
import { PaymentStatus, PaymentMethod, PaymentUrgency, PaymentFilterState } from '../types';

interface PaymentFiltersProps {
  filters: PaymentFilterState;
  onFilterChange: (filters: PaymentFilterState) => void;
  onSearch: (query: string) => void;
  onReset: () => void;
}

const PaymentFilters: React.FC<PaymentFiltersProps> = ({
  filters,
  onFilterChange,
  onSearch,
  onReset
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle filter changes
  const handleStatusChange = (event: SelectChangeEvent<PaymentStatus[]>) => {
    const newFilters = { 
      ...filters, 
      status: event.target.value as PaymentStatus[] 
    };
    onFilterChange(newFilters);
  };
  
  const handlePaymentMethodChange = (event: SelectChangeEvent<PaymentMethod[]>) => {
    const newFilters = { 
      ...filters, 
      paymentMethods: event.target.value as PaymentMethod[] 
    };
    onFilterChange(newFilters);
  };
  
  const handleUrgencyChange = (event: SelectChangeEvent<PaymentUrgency[]>) => {
    const newFilters = { 
      ...filters, 
      urgency: event.target.value as PaymentUrgency[] 
    };
    onFilterChange(newFilters);
  };
  
  const handleStartDateChange = (date: Date | null) => {
    const newFilters = { 
      ...filters, 
      dateRange: { 
        ...filters.dateRange, 
        start: date 
      } 
    };
    onFilterChange(newFilters);
  };
  
  const handleEndDateChange = (date: Date | null) => {
    const newFilters = { 
      ...filters, 
      dateRange: { 
        ...filters.dateRange, 
        end: date 
      } 
    };
    onFilterChange(newFilters);
  };
  
  const handleAmountRangeChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    const newFilters = { 
      ...filters, 
      amountRange: { 
        min, 
        max 
      } 
    };
    onFilterChange(newFilters);
  };
  
  const handleSupplierChange = (event: SelectChangeEvent<string[]>) => {
    const newFilters = { 
      ...filters, 
      suppliers: event.target.value as string[] 
    };
    onFilterChange(newFilters);
  };
  
  // Handle search
  const handleSearchSubmit = () => {
    onSearch(searchQuery);
  };
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    onReset();
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  // Mock suppliers for the dropdown
  const suppliers = [
    'Shenzhen Electronics Ltd',
    'Korea Chip Manufacturing',
    'Tokyo Components',
    'Malaysia Circuit',
    'Taiwan Semiconductor',
    'Singapore Tech Solutions',
    'Hong Kong Electronics',
    'Vietnam Manufacturing'
  ];
  
  // Payment status options
  const statusOptions: PaymentStatus[] = [
    'Draft',
    'Scheduled',
    'Pending Approval',
    'Processing',
    'Completed'
  ];
  
  // Payment method options
  const paymentMethodOptions: PaymentMethod[] = [
    'Traditional Wire',
    'Shell Token',
    'USDC'
  ];
  
  // Payment urgency options
  const urgencyOptions: PaymentUrgency[] = [
    'critical',
    'high',
    'medium',
    'low'
  ];
  
  // Format urgency label
  const formatUrgencyLabel = (urgency: PaymentUrgency) => {
    switch (urgency) {
      case 'critical':
        return 'Critical';
      case 'high':
        return 'High';
      case 'medium':
        return 'Medium';
      case 'low':
        return 'Low';
      default:
        return urgency;
    }
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden'
      }}
    >
      {/* Basic Search Bar */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search payments by invoice, supplier, or PO number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: <Search size={18} color={theme.palette.text.secondary} style={{ marginRight: 8 }} />,
            sx: { borderRadius: 1 }
          }}
          size="small"
        />
        
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleSearchSubmit}
          sx={{ minWidth: 100 }}
        >
          Search
        </Button>
        
        <Button
          variant="outlined"
          color="primary"
          startIcon={expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          onClick={toggleExpanded}
          sx={{ minWidth: 120 }}
        >
          {expanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </Box>
      
      {/* Advanced Filters */}
      <Collapse in={expanded}>
        <Box sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Advanced Filters
            </Typography>
            
            <Button
              variant="text"
              color="primary"
              startIcon={<RefreshCw size={16} />}
              onClick={handleResetFilters}
            >
              Reset Filters
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {/* Status Filter */}
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-filter-label">Payment Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  multiple
                  value={filters.status}
                  onChange={handleStatusChange}
                  input={<OutlinedInput label="Payment Status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as PaymentStatus[]).map((value) => (
                        <Chip 
                          key={value} 
                          label={value} 
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={filters.status.indexOf(status) > -1} />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Payment Method Filter */}
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="payment-method-filter-label">Payment Method</InputLabel>
                <Select
                  labelId="payment-method-filter-label"
                  multiple
                  value={filters.paymentMethods}
                  onChange={handlePaymentMethodChange}
                  input={<OutlinedInput label="Payment Method" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as PaymentMethod[]).map((value) => (
                        <Chip 
                          key={value} 
                          label={value} 
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {paymentMethodOptions.map((method) => (
                    <MenuItem key={method} value={method}>
                      <Checkbox checked={filters.paymentMethods.indexOf(method) > -1} />
                      <ListItemText primary={method} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Urgency Filter */}
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="urgency-filter-label">Urgency</InputLabel>
                <Select
                  labelId="urgency-filter-label"
                  multiple
                  value={filters.urgency}
                  onChange={handleUrgencyChange}
                  input={<OutlinedInput label="Urgency" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as PaymentUrgency[]).map((value) => (
                        <Chip 
                          key={value} 
                          label={formatUrgencyLabel(value)} 
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {urgencyOptions.map((urgency) => (
                    <MenuItem key={urgency} value={urgency}>
                      <Checkbox checked={filters.urgency.indexOf(urgency) > -1} />
                      <ListItemText primary={formatUrgencyLabel(urgency)} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Supplier Filter */}
            <Grid item xs={12} md={6} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="supplier-filter-label">Supplier</InputLabel>
                <Select
                  labelId="supplier-filter-label"
                  multiple
                  value={filters.suppliers}
                  onChange={handleSupplierChange}
                  input={<OutlinedInput label="Supplier" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip 
                          key={value} 
                          label={value} 
                          size="small"
                          sx={{ borderRadius: 1 }}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {suppliers.map((supplier) => (
                    <MenuItem key={supplier} value={supplier}>
                      <Checkbox checked={filters.suppliers.indexOf(supplier) > -1} />
                      <ListItemText primary={supplier} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Date Range Filter */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Due Date Range
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label="From"
                  value={filters.dateRange.start}
                  onChange={handleStartDateChange}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
                <DatePicker
                  label="To"
                  value={filters.dateRange.end}
                  onChange={handleEndDateChange}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </Box>
            </Grid>
            
            {/* Amount Range Filter */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Amount Range: ${filters.amountRange.min?.toLocaleString() || 0} - ${filters.amountRange.max?.toLocaleString() || 100000}
              </Typography>
              <Slider
                value={[filters.amountRange.min || 0, filters.amountRange.max || 100000]}
                onChange={handleAmountRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                step={1000}
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
            </Grid>
            
            {/* Active Filters Display */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {filters.status.length > 0 && (
                  <Chip 
                    label={`Status: ${filters.status.length} selected`} 
                    onDelete={() => onFilterChange({ ...filters, status: [] })}
                    size="small"
                    color="primary"
                    variant="outlined"
                    deleteIcon={<X size={14} />}
                  />
                )}
                
                {filters.paymentMethods.length > 0 && (
                  <Chip 
                    label={`Payment Method: ${filters.paymentMethods.length} selected`} 
                    onDelete={() => onFilterChange({ ...filters, paymentMethods: [] })}
                    size="small"
                    color="primary"
                    variant="outlined"
                    deleteIcon={<X size={14} />}
                  />
                )}
                
                {filters.urgency.length > 0 && (
                  <Chip 
                    label={`Urgency: ${filters.urgency.length} selected`} 
                    onDelete={() => onFilterChange({ ...filters, urgency: [] })}
                    size="small"
                    color="primary"
                    variant="outlined"
                    deleteIcon={<X size={14} />}
                  />
                )}
                
                {filters.suppliers.length > 0 && (
                  <Chip 
                    label={`Suppliers: ${filters.suppliers.length} selected`} 
                    onDelete={() => onFilterChange({ ...filters, suppliers: [] })}
                    size="small"
                    color="primary"
                    variant="outlined"
                    deleteIcon={<X size={14} />}
                  />
                )}
                
                {filters.dateRange.start && (
                  <Chip 
                    label={`From: ${filters.dateRange.start.toLocaleDateString()}`} 
                    onDelete={() => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, start: null } })}
                    size="small"
                    color="primary"
                    variant="outlined"
                    deleteIcon={<X size={14} />}
                  />
                )}
                
                {filters.dateRange.end && (
                  <Chip 
                    label={`To: ${filters.dateRange.end.toLocaleDateString()}`} 
                    onDelete={() => onFilterChange({ ...filters, dateRange: { ...filters.dateRange, end: null } })}
                    size="small"
                    color="primary"
                    variant="outlined"
                    deleteIcon={<X size={14} />}
                  />
                )}
                
                {(filters.amountRange.min !== 0 || filters.amountRange.max !== 100000) && (
                  <Chip 
                    label={`Amount: $${filters.amountRange.min?.toLocaleString() || 0} - $${filters.amountRange.max?.toLocaleString() || 100000}`} 
                    onDelete={() => onFilterChange({ ...filters, amountRange: { min: 0, max: 100000 } })}
                    size="small"
                    color="primary"
                    variant="outlined"
                    deleteIcon={<X size={14} />}
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default PaymentFilters; 