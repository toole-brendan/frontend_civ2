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
  InputAdornment,
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
import { TransactionFilters as TransactionFiltersType } from '../types';

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
const defaultFilters: TransactionFiltersType = {
  search: '',
  type: '',
  status: '',
  counterpartyType: '',
  counterparty: '',
  dateRange: {
    start: null,
    end: null,
  },
  minAmount: null,
  maxAmount: null,
};

// Types for props
interface TransactionFiltersProps {
  filters: TransactionFiltersType;
  onFilterChange: (filters: TransactionFiltersType) => void;
  onClearFilters: () => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  // State for showing advanced filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Update filters and notify parent
  const updateFilters = (newFilters: Partial<TransactionFiltersType>) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
    };
    onFilterChange(updatedFilters);
  };

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ search: event.target.value });
  };

  // Handle select changes
  const handleSelectChange = (field: keyof TransactionFiltersType) => (event: SelectChangeEvent<string>) => {
    updateFilters({ [field]: event.target.value });
  };

  // Handle date changes
  const handleStartDateChange = (date: Date | null) => {
    updateFilters({
      dateRange: {
        ...filters.dateRange,
        start: date ? date.toISOString() : null,
      },
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    updateFilters({
      dateRange: {
        ...filters.dateRange,
        end: date ? date.toISOString() : null,
      },
    });
  };

  // Handle amount changes
  const handleAmountChange = (field: 'minAmount' | 'maxAmount') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? null : Number(event.target.value);
    updateFilters({ [field]: value });
  };

  // Clear all filters
  const handleClearFilters = () => {
    onClearFilters();
  };

  // Toggle advanced filters
  const toggleAdvancedFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
  };

  return (
    <StyledPaper>
      {/* Basic Filters */}
      <FilterSection>
        <TextField
          label="Search transactions"
          variant="outlined"
          size="small"
          value={filters.search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, maxWidth: 400 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Transaction Type</InputLabel>
          <Select
            value={filters.type}
            onChange={handleSelectChange('type')}
            label="Transaction Type"
          >
            <MenuItem value="">All Types</MenuItem>
            <MenuItem value="payment">Payment</MenuItem>
            <MenuItem value="receipt">Receipt</MenuItem>
            <MenuItem value="refund">Refund</MenuItem>
            <MenuItem value="transfer">Transfer</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filters.status}
            onChange={handleSelectChange('status')}
            label="Status"
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="confirmed">Confirmed</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          startIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={toggleAdvancedFilters}
          size="small"
        >
          {showAdvancedFilters ? 'Hide' : 'More'} Filters
        </Button>

        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={handleClearFilters}
          size="small"
          disabled={Object.values(filters).every(value => 
            value === '' || value === null || 
            (typeof value === 'object' && Object.values(value).every(v => v === null))
          )}
        >
          Clear Filters
        </Button>
      </FilterSection>

      {/* Advanced Filters */}
      <Collapse in={showAdvancedFilters}>
        <FiltersContainer>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="subtitle2" gutterBottom>
            Advanced Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Counterparty Type</InputLabel>
                <Select
                  value={filters.counterpartyType}
                  onChange={handleSelectChange('counterpartyType')}
                  label="Counterparty Type"
                >
                  <MenuItem value="">All Types</MenuItem>
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="supplier">Supplier</MenuItem>
                  <MenuItem value="internal">Internal</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Counterparty"
                size="small"
                value={filters.counterparty}
                onChange={(e) => updateFilters({ counterparty: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    label="From Date"
                    value={filters.dateRange.start ? new Date(filters.dateRange.start) : null}
                    onChange={handleStartDateChange}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="To Date"
                    value={filters.dateRange.end ? new Date(filters.dateRange.end) : null}
                    onChange={handleEndDateChange}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Min Amount ($)"
                    type="number"
                    size="small"
                    value={filters.minAmount ?? ''}
                    onChange={handleAmountChange('minAmount')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Max Amount ($)"
                    type="number"
                    size="small"
                    value={filters.maxAmount ?? ''}
                    onChange={handleAmountChange('maxAmount')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MoneyIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FiltersContainer>
      </Collapse>
    </StyledPaper>
  );
};

export default TransactionFilters; 