import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Autocomplete,
  IconButton,
  SelectChangeEvent,
  styled,
  Divider,
  Collapse,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FilterListIcon from '@mui/icons-material/FilterList';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AnalyticsFilters as AnalyticsFiltersType, TimePeriod, ComparisonType } from '../types';

export interface AnalyticsFiltersProps {
  filters: AnalyticsFiltersType;
  onFilterChange: (filters: AnalyticsFiltersType) => void;
  onClearFilters: () => void;
  onSaveReport?: () => void;
}

// Mock data for filters
const productOptions = [
  'Ethiopian Yirgacheffe',
  'Colombian Supremo',
  'Morning Blend',
  'Dark Roast Espresso',
  'Decaf Sumatra',
  'Kenyan AA',
  'Guatemalan Antigua',
  'Costa Rican Tarrazu',
  'Brazilian Santos',
  'Tanzanian Peaberry',
];

const originOptions = [
  'Ethiopia',
  'Colombia',
  'Brazil',
  'Kenya',
  'Indonesia',
  'Guatemala',
  'Costa Rica',
  'Vietnam',
  'Tanzania',
  'Jamaica',
  'Honduras',
  'Uganda',
];

const certificationOptions = [
  'Organic',
  'Fair Trade',
  'Rainforest Alliance',
  'Bird Friendly',
  'Direct Trade',
  'UTZ Certified',
  'Shade Grown',
  'Carbon Neutral',
];

const customerOptions = [
  'Artisan Cafes',
  'Specialty Coffee Shops',
  'Coffee Roasters',
  'Hospitality Chains',
  'Corporate Offices',
  'Online Retailers',
  'Food Service',
  'Subscription Services',
];

const supplierOptions = [
  'Cooperative Farms',
  'Direct Farm Partners',
  'Sustainable Growers',
  'Regional Exporters',
  'Processing Plants',
  'Packaging Suppliers',
  'Logistics Partners',
];

// Time period options
const timePeriodOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7Days', label: 'Last 7 Days' },
  { value: 'last30Days', label: 'Last 30 Days' },
  { value: 'thisMonth', label: 'This Month' },
  { value: 'lastMonth', label: 'Last Month' },
  { value: 'thisQuarter', label: 'This Quarter' },
  { value: 'lastQuarter', label: 'Last Quarter' },
  { value: 'thisYear', label: 'This Year' },
  { value: 'lastYear', label: 'Last Year' },
  { value: 'custom', label: 'Custom Range' },
];

// Comparison options
const comparisonOptions = [
  { value: 'previousPeriod', label: 'Previous Period' },
  { value: 'samePeroidLastYear', label: 'Same Period Last Year' },
  { value: 'custom', label: 'Custom Comparison' },
];

const FiltersHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FiltersContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const FiltersFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
  borderTop: `1px solid ${theme.palette.divider}`,
  gap: theme.spacing(1),
}));

const FilterPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 0,
}));

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  onSaveReport,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCustomDateRange, setShowCustomDateRange] = useState(filters.timePeriod === 'custom');

  const handleFilterChange = (field: keyof AnalyticsFiltersType, value: any) => {
    const newFilters = { ...filters, [field]: value };
    
    // If changing time period to/from custom, update the custom date display
    if (field === 'timePeriod') {
      setShowCustomDateRange(value === 'custom');
    }

    onFilterChange(newFilters);
  };

  const handleDateChange = (field: 'startDate' | 'endDate', value: Date | null) => {
    const newFilters = {
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    };
    onFilterChange(newFilters);
  };

  const handleToggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSearch = () => {
    // In a real implementation, this would probably filter based on the search term
    console.log('Searching for:', searchTerm);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FilterPaper elevation={0}>
        <FiltersHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterListIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Analytics Filters</Typography>
          </Box>
          <Button
            endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={handleToggleExpanded}
          >
            {expanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </FiltersHeader>

        <Collapse in={expanded}>
          <FiltersContent>
            <Grid container spacing={3}>
              {/* Quick search */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search by any keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    endAdornment: (
                      <Button variant="contained" size="small" onClick={handleSearch}>
                        Search
                      </Button>
                    ),
                  }}
                />
              </Grid>

              {/* Time period selection */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="time-period-label">Time Period</InputLabel>
                  <Select
                    labelId="time-period-label"
                    id="time-period"
                    value={filters.timePeriod}
                    label="Time Period"
                    onChange={(e: SelectChangeEvent) => handleFilterChange('timePeriod', e.target.value as TimePeriod)}
                  >
                    {timePeriodOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Comparison type */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="comparison-label">Compare To</InputLabel>
                  <Select
                    labelId="comparison-label"
                    id="comparison"
                    value={filters.comparison}
                    label="Compare To"
                    onChange={(e: SelectChangeEvent) => handleFilterChange('comparison', e.target.value as ComparisonType)}
                  >
                    {comparisonOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Placeholder for other quick filters in the top row */}
              <Grid item xs={12} md={4} />

              {/* Custom date range (only show if custom is selected) */}
              {showCustomDateRange && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Custom Date Range
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Start Date"
                        value={filters.dateRange.startDate}
                        onChange={(date) => handleDateChange('startDate', date)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="End Date"
                        value={filters.dateRange.endDate}
                        onChange={(date) => handleDateChange('endDate', date)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {/* Divider for advanced filters */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Advanced Filters
                </Typography>
              </Grid>

              {/* Product filter */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  id="product-filter"
                  options={productOptions}
                  value={filters.products}
                  onChange={(_, newValue) => handleFilterChange('products', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Products" placeholder="Filter by products" />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip 
                        label={option} 
                        {...getTagProps({ index })} 
                        size="small" 
                      />
                    ))
                  }
                />
              </Grid>

              {/* Origin filter */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  id="origin-filter"
                  options={originOptions}
                  value={filters.origins}
                  onChange={(_, newValue) => handleFilterChange('origins', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Origins" placeholder="Filter by origin countries" />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip 
                        label={option} 
                        {...getTagProps({ index })} 
                        size="small" 
                      />
                    ))
                  }
                />
              </Grid>

              {/* Customer type filter */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  id="customer-filter"
                  options={customerOptions}
                  value={filters.customers}
                  onChange={(_, newValue) => handleFilterChange('customers', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Customer Types" placeholder="Filter by customer types" />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip 
                        label={option} 
                        {...getTagProps({ index })} 
                        size="small" 
                      />
                    ))
                  }
                />
              </Grid>

              {/* Supplier type filter */}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  multiple
                  id="supplier-filter"
                  options={supplierOptions}
                  value={filters.suppliers}
                  onChange={(_, newValue) => handleFilterChange('suppliers', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Supplier Types" placeholder="Filter by supplier types" />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip 
                        label={option} 
                        {...getTagProps({ index })} 
                        size="small" 
                      />
                    ))
                  }
                />
              </Grid>

              {/* Certifications filter */}
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="certification-filter"
                  options={certificationOptions}
                  value={filters.certifications}
                  onChange={(_, newValue) => handleFilterChange('certifications', newValue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Certifications" placeholder="Filter by certifications" />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip 
                        label={option} 
                        {...getTagProps({ index })} 
                        size="small" 
                      />
                    ))
                  }
                />
              </Grid>
            </Grid>
          </FiltersContent>
        </Collapse>

        <FiltersFooter>
          <Button variant="outlined" onClick={onClearFilters} startIcon={<CloseIcon />}>
            Clear Filters
          </Button>
          {onSaveReport && (
            <Button variant="outlined" onClick={onSaveReport} startIcon={<SaveIcon />}>
              Save Report
            </Button>
          )}
          <Button variant="contained" onClick={() => onFilterChange(filters)}>
            Apply Filters
          </Button>
        </FiltersFooter>
      </FilterPaper>
    </LocalizationProvider>
  );
};

export default AnalyticsFilters; 