import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Button,
  Collapse,
  Divider,
  useTheme,
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

// Available filter options for the component
const RISK_LEVELS = ['Low', 'Medium', 'High', 'Critical'];
const CATEGORIES = ['Electronics', 'Mechanical', 'Chemical', 'Packaging', 'Raw Materials', 'Software', 'Services'];
const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'South America', 'Middle East', 'Africa'];
const VERIFICATION_STATUS = ['Verified', 'Pending', 'Rejected', 'Expired'];
const SHELL_TOKEN_STATUS = ['Enabled', 'Disabled', 'Pending'];

interface SupplierFilterProps {
  onFilterChange: (filters: FilterState) => void;
  onSaveFilter: (filterName: string, filters: FilterState) => void;
  onLoadFilter: (filterName: string) => void;
  savedFilters: { name: string; filters: FilterState }[];
}

interface FilterState {
  searchQuery: string;
  riskLevels: string[];
  categories: string[];
  regions: string[];
  verificationStatus: string[];
  shellTokenStatus: string[];
  minPerformanceScore: number;
  maxPerformanceScore: number;
  minAnnualSpend: number;
  maxAnnualSpend: number;
}

const initialFilterState: FilterState = {
  searchQuery: '',
  riskLevels: [],
  categories: [],
  regions: [],
  verificationStatus: [],
  shellTokenStatus: [],
  minPerformanceScore: 0,
  maxPerformanceScore: 100,
  minAnnualSpend: 0,
  maxAnnualSpend: 1000000,
};

const SupplierFilter: React.FC<SupplierFilterProps> = ({
  onFilterChange,
  onSaveFilter,
  onLoadFilter,
  savedFilters,
}) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [filterState, setFilterState] = React.useState<FilterState>(initialFilterState);
  const [filterName, setFilterName] = React.useState('');
  const [activeFiltersCount, setActiveFiltersCount] = React.useState(0);

  // Calculate the number of active filters
  React.useEffect(() => {
    let count = 0;
    if (filterState.searchQuery) count++;
    if (filterState.riskLevels.length > 0) count++;
    if (filterState.categories.length > 0) count++;
    if (filterState.regions.length > 0) count++;
    if (filterState.verificationStatus.length > 0) count++;
    if (filterState.shellTokenStatus.length > 0) count++;
    if (filterState.minPerformanceScore > 0 || filterState.maxPerformanceScore < 100) count++;
    if (filterState.minAnnualSpend > 0 || filterState.maxAnnualSpend < 1000000) count++;
    setActiveFiltersCount(count);
  }, [filterState]);

  // Handle changes to multi-select filters
  const handleMultiSelectChange = (
    event: SelectChangeEvent<string[]>,
    filterKey: keyof FilterState
  ) => {
    const { value } = event.target;
    setFilterState({
      ...filterState,
      [filterKey]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // Handle changes to performance score slider
  const handlePerformanceScoreChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilterState({
        ...filterState,
        minPerformanceScore: newValue[0],
        maxPerformanceScore: newValue[1],
      });
    }
  };

  // Handle changes to annual spend slider
  const handleAnnualSpendChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFilterState({
        ...filterState,
        minAnnualSpend: newValue[0],
        maxAnnualSpend: newValue[1],
      });
    }
  };

  // Handle search query changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState({
      ...filterState,
      searchQuery: event.target.value,
    });
  };

  // Apply the current filters
  const applyFilters = () => {
    onFilterChange(filterState);
  };

  // Reset all filters to their initial state
  const resetFilters = () => {
    setFilterState(initialFilterState);
    onFilterChange(initialFilterState);
  };

  // Save the current filter configuration
  const saveFilter = () => {
    if (filterName.trim()) {
      onSaveFilter(filterName.trim(), filterState);
      setFilterName('');
    }
  };

  // Format currency values for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          border: `1px solid ${theme.palette.divider}`, 
          borderRadius: 1 
        }}
      >
        {/* Basic search and filter controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FilterAltIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" fontWeight="bold">
              Filter Suppliers
            </Typography>
            {activeFiltersCount > 0 && (
              <Chip 
                label={`${activeFiltersCount} active`} 
                size="small" 
                color="primary" 
                sx={{ ml: 1 }}
              />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="text"
              size="small"
              onClick={resetFilters}
              sx={{ mr: 1 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={applyFilters}
              color="primary"
              sx={{ mr: 1 }}
            >
              Apply Filters
            </Button>
            <IconButton 
              size="small" 
              onClick={() => setExpanded(!expanded)}
              sx={{ 
                backgroundColor: expanded ? theme.palette.primary.light : undefined,
                color: expanded ? theme.palette.primary.main : undefined,
                '&:hover': {
                  backgroundColor: expanded ? theme.palette.primary.light : undefined,
                }
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>
        
        {/* Search field - always visible */}
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search suppliers by name, id, or contact..."
            value={filterState.searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
              endAdornment: filterState.searchQuery ? (
                <IconButton 
                  size="small" 
                  onClick={() => setFilterState({ ...filterState, searchQuery: '' })}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              ) : null,
            }}
          />
        </Box>
        
        {/* Expanded filter options */}
        <Collapse in={expanded} timeout="auto">
          <Box sx={{ mt: 3 }}>
            <Divider />
            
            {/* Filter grid */}
            <Box sx={{ mt: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              {/* Risk Levels */}
              <FormControl size="small">
                <InputLabel id="risk-level-label">Risk Level</InputLabel>
                <Select
                  labelId="risk-level-label"
                  multiple
                  value={filterState.riskLevels}
                  onChange={(e) => handleMultiSelectChange(e, 'riskLevels')}
                  input={<OutlinedInput label="Risk Level" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {RISK_LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      <Checkbox checked={filterState.riskLevels.indexOf(level) > -1} />
                      <ListItemText primary={level} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {/* Categories */}
              <FormControl size="small">
                <InputLabel id="categories-label">Categories</InputLabel>
                <Select
                  labelId="categories-label"
                  multiple
                  value={filterState.categories}
                  onChange={(e) => handleMultiSelectChange(e, 'categories')}
                  input={<OutlinedInput label="Categories" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={filterState.categories.indexOf(category) > -1} />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {/* Regions */}
              <FormControl size="small">
                <InputLabel id="regions-label">Regions</InputLabel>
                <Select
                  labelId="regions-label"
                  multiple
                  value={filterState.regions}
                  onChange={(e) => handleMultiSelectChange(e, 'regions')}
                  input={<OutlinedInput label="Regions" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {REGIONS.map((region) => (
                    <MenuItem key={region} value={region}>
                      <Checkbox checked={filterState.regions.indexOf(region) > -1} />
                      <ListItemText primary={region} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {/* Verification Status */}
              <FormControl size="small">
                <InputLabel id="verification-status-label">Verification Status</InputLabel>
                <Select
                  labelId="verification-status-label"
                  multiple
                  value={filterState.verificationStatus}
                  onChange={(e) => handleMultiSelectChange(e, 'verificationStatus')}
                  input={<OutlinedInput label="Verification Status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {VERIFICATION_STATUS.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={filterState.verificationStatus.indexOf(status) > -1} />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {/* Shell Token Status */}
              <FormControl size="small">
                <InputLabel id="shell-token-status-label">Shell Token Status</InputLabel>
                <Select
                  labelId="shell-token-status-label"
                  multiple
                  value={filterState.shellTokenStatus}
                  onChange={(e) => handleMultiSelectChange(e, 'shellTokenStatus')}
                  input={<OutlinedInput label="Shell Token Status" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {SHELL_TOKEN_STATUS.map((status) => (
                    <MenuItem key={status} value={status}>
                      <Checkbox checked={filterState.shellTokenStatus.indexOf(status) > -1} />
                      <ListItemText primary={status} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            {/* Sliders */}
            <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4 }}>
              {/* Performance Score Range */}
              <Box>
                <Typography variant="body2" gutterBottom>
                  Performance Score Range
                </Typography>
                <Slider
                  value={[filterState.minPerformanceScore, filterState.maxPerformanceScore]}
                  onChange={handlePerformanceScoreChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                  sx={{ mt: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {filterState.minPerformanceScore}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {filterState.maxPerformanceScore}%
                  </Typography>
                </Box>
              </Box>
              
              {/* Annual Spend Range */}
              <Box>
                <Typography variant="body2" gutterBottom>
                  Annual Spend Range
                </Typography>
                <Slider
                  value={[filterState.minAnnualSpend, filterState.maxAnnualSpend]}
                  onChange={handleAnnualSpendChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000000}
                  valueLabelFormat={(value) => formatCurrency(value)}
                  sx={{ mt: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(filterState.minAnnualSpend)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatCurrency(filterState.maxAnnualSpend)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {/* Saved Filters */}
            <Box sx={{ mt: 3 }}>
              <Divider />
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" fontWeight="bold">
                  Saved Filters
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    size="small"
                    placeholder="Save current filter as..."
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    sx={{ width: 200, mr: 1 }}
                  />
                  <Tooltip title="Save current filter">
                    <IconButton size="small" onClick={saveFilter} disabled={!filterName.trim()}>
                      <SaveAltIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              
              {/* List of saved filters */}
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {savedFilters.map((filter) => (
                  <Chip
                    key={filter.name}
                    label={filter.name}
                    onClick={() => onLoadFilter(filter.name)}
                    onDelete={() => {/* Delete saved filter logic would go here */}}
                    sx={{ backgroundColor: theme.palette.primary.light }}
                  />
                ))}
                {savedFilters.length === 0 && (
                  <Typography variant="caption" color="text.secondary">
                    No saved filters yet. Create filters and save them for quick access.
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default SupplierFilter; 