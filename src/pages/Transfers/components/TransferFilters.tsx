import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Chip,
  Grid,
  Divider,
  Typography,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  FormControlLabel,
  Checkbox,
  useTheme,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Define the filter values interface
export interface TransferFilterValues {
  status: string[];
  priority: string[];
  dateRange: [Date | null, Date | null];
  valueRange: [number, number];
  locations: string[];
  showCriticalOnly: boolean;
  showVerifiedOnly: boolean;
  showWithExceptionsOnly: boolean;
}

// Define the component props
interface TransferFiltersProps {
  onFilterChange: (filters: TransferFilterValues) => void;
  onSearch: (query: string) => void;
  onReset: () => void;
}

const TransferFilters: React.FC<TransferFiltersProps> = ({
  onFilterChange,
  onSearch,
  onReset,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter state
  const [filters, setFilters] = useState<TransferFilterValues>({
    status: [],
    priority: [],
    dateRange: [null, null],
    valueRange: [0, 100000],
    locations: [],
    showCriticalOnly: false,
    showVerifiedOnly: false,
    showWithExceptionsOnly: false,
  });

  // Active filter count
  const getActiveFilterCount = (): number => {
    let count = 0;
    if (filters.status.length > 0) count++;
    if (filters.priority.length > 0) count++;
    if (filters.dateRange[0] !== null || filters.dateRange[1] !== null) count++;
    if (filters.valueRange[0] > 0 || filters.valueRange[1] < 100000) count++;
    if (filters.locations.length > 0) count++;
    if (filters.showCriticalOnly) count++;
    if (filters.showVerifiedOnly) count++;
    if (filters.showWithExceptionsOnly) count++;
    return count;
  };

  // Handle search
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  // Handle search key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle status change
  const handleStatusChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setFilters({
      ...filters,
      status: value,
    });
  };

  // Handle priority change
  const handlePriorityChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setFilters({
      ...filters,
      priority: value,
    });
  };

  // Handle start date change
  const handleStartDateChange = (date: Date | null) => {
    setFilters({
      ...filters,
      dateRange: [date, filters.dateRange[1]],
    });
  };

  // Handle end date change
  const handleEndDateChange = (date: Date | null) => {
    setFilters({
      ...filters,
      dateRange: [filters.dateRange[0], date],
    });
  };

  // Handle value range change
  const handleValueRangeChange = (_event: Event, newValue: number | number[]) => {
    setFilters({
      ...filters,
      valueRange: newValue as [number, number],
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({
      status: [],
      priority: [],
      dateRange: [null, null],
      valueRange: [0, 100000],
      locations: [],
      showCriticalOnly: false,
      showVerifiedOnly: false,
      showWithExceptionsOnly: false,
    });
    setSearchQuery('');
    onReset();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search transfers by ID, location, item, or custodian..."
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => {
                      setSearchQuery('');
                      onSearch('');
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{ flexGrow: 1 }}
            >
              Search
            </Button>
            <Button
              variant={expanded ? "contained" : "outlined"}
              color={expanded ? "primary" : "inherit"}
              onClick={() => setExpanded(!expanded)}
              startIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{ flexGrow: 1 }}
            >
              Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Collapse in={expanded}>
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status-select"
                  multiple
                  value={filters.status}
                  onChange={handleStatusChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                  label="Status"
                >
                  <MenuItem value="PENDING">Pending</MenuItem>
                  <MenuItem value="IN_TRANSIT">In Transit</MenuItem>
                  <MenuItem value="DELIVERED">Delivered</MenuItem>
                  <MenuItem value="VERIFIED">Verified</MenuItem>
                  <MenuItem value="EXCEPTION">Exception</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small">
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority-select"
                  multiple
                  value={filters.priority}
                  onChange={handlePriorityChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                  label="Priority"
                >
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="URGENT">Urgent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <DatePicker
                    label="From"
                    value={filters.dateRange[0]}
                    onChange={handleStartDateChange}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  />
                  <DatePicker
                    label="To"
                    value={filters.dateRange[1]}
                    onChange={handleEndDateChange}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12}>
              <Typography gutterBottom>
                <AttachMoneyIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
                Value Range
              </Typography>
              <Slider
                value={filters.valueRange}
                onChange={handleValueRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                step={1000}
                valueLabelFormat={(value) => `$${value.toLocaleString()}`}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption">${filters.valueRange[0].toLocaleString()}</Typography>
                <Typography variant="caption">${filters.valueRange[1].toLocaleString()}</Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.showCriticalOnly}
                      onChange={handleCheckboxChange}
                      name="showCriticalOnly"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <WarningIcon color="error" fontSize="small" sx={{ mr: 0.5 }} />
                      Critical Only
                    </Box>
                  }
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.showVerifiedOnly}
                      onChange={handleCheckboxChange}
                      name="showVerifiedOnly"
                    />
                  }
                  label="Verified Only"
                />
                
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.showWithExceptionsOnly}
                      onChange={handleCheckboxChange}
                      name="showWithExceptionsOnly"
                    />
                  }
                  label="With Exceptions Only"
                />
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 1 }}>
            <Button variant="outlined" onClick={handleResetFilters}>
              Reset
            </Button>
            <Button variant="contained" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </Box>
        </Box>
      </Collapse>
      
      {getActiveFilterCount() > 0 && !expanded && (
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {filters.status.length > 0 && (
            <Chip
              icon={<LocalShippingIcon fontSize="small" />}
              label={`Status: ${filters.status.length}`}
              onDelete={() => setFilters({ ...filters, status: [] })}
              size="small"
            />
          )}
          
          {filters.priority.length > 0 && (
            <Chip
              icon={<WarningIcon fontSize="small" />}
              label={`Priority: ${filters.priority.length}`}
              onDelete={() => setFilters({ ...filters, priority: [] })}
              size="small"
            />
          )}
          
          {(filters.valueRange[0] > 0 || filters.valueRange[1] < 100000) && (
            <Chip
              icon={<AttachMoneyIcon fontSize="small" />}
              label={`Value: $${filters.valueRange[0].toLocaleString()} - $${filters.valueRange[1].toLocaleString()}`}
              onDelete={() => setFilters({ ...filters, valueRange: [0, 100000] })}
              size="small"
            />
          )}
          
          {filters.showCriticalOnly && (
            <Chip
              icon={<WarningIcon fontSize="small" />}
              label="Critical Only"
              onDelete={() => setFilters({ ...filters, showCriticalOnly: false })}
              size="small"
            />
          )}
          
          {filters.showVerifiedOnly && (
            <Chip
              label="Verified Only"
              onDelete={() => setFilters({ ...filters, showVerifiedOnly: false })}
              size="small"
            />
          )}
          
          {filters.showWithExceptionsOnly && (
            <Chip
              label="With Exceptions Only"
              onDelete={() => setFilters({ ...filters, showWithExceptionsOnly: false })}
              size="small"
            />
          )}
          
          <Button
            variant="outlined"
            size="small"
            onClick={handleResetFilters}
            startIcon={<CloseIcon fontSize="small" />}
          >
            Clear All
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default TransferFilters; 