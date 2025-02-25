import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Chip,
  FormControlLabel,
  Checkbox,
  Button,
  styled,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import { PartnerFilters as PartnerFiltersType } from '../types';

const FilterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
}));

interface PartnerFiltersProps {
  filters: PartnerFiltersType;
  onFilterChange: (filters: PartnerFiltersType) => void;
  onClearFilters: () => void;
}

// Arrays for dropdown selections
const partnerTypes = ['SUPPLIER', 'CUSTOMER', 'DISTRIBUTOR', 'LOGISTICS', 'OTHER'];
const statusOptions = ['ACTIVE', 'INACTIVE', 'PENDING', 'ON_HOLD'];

// Coffee-specific filter options
const allCertifications = [
  'Organic',
  'Fair Trade',
  'Rainforest Alliance',
  'UTZ Certified',
  'Bird Friendly',
  'Shade Grown',
  'Direct Trade',
  'USDA Organic',
  'EU Organic',
  'Demeter',
  'Smithsonian',
];

const countries = [
  'Ethiopia',
  'Colombia',
  'Brazil',
  'Guatemala',
  'Costa Rica',
  'Kenya',
  'Indonesia',
  'India',
  'Vietnam',
  'Honduras',
  'El Salvador',
  'Peru',
  'Mexico',
  'Jamaica',
  'Panama',
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'Japan',
  'Australia',
];

const tagOptions = [
  'Premium',
  'Specialty',
  'Commercial',
  'Auction',
  'Single Origin',
  'Blend',
  'Estate',
  'Cooperative',
  'Microlot',
  'Direct Relationship',
  'Exclusive',
  'New',
  'Preferred',
  'High Volume',
  'Seasonal',
];

const PartnerFilters: React.FC<PartnerFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: event.target.value,
    });
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      type: event.target.value,
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      status: event.target.value,
    });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      country: event.target.value,
    });
  };

  const handleTagsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    onFilterChange({
      ...filters,
      tags: newValue,
    });
  };

  const handleCertificationsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
    onFilterChange({
      ...filters,
      certifications: newValue,
    });
  };

  const handleCheckboxChange = (field: 'isFairTrade' | 'isOrganic') => (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      [field]: event.target.checked,
    });
  };

  return (
    <FilterPaper elevation={0}>
      <Grid container spacing={2}>
        {/* Basic Search Row */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <TextField
              placeholder="Search partners..."
              value={filters.search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, mr: 2 }}
              variant="outlined"
              size="small"
            />
            <Button
              startIcon={expanded ? <ClearIcon /> : <FilterListIcon />}
              onClick={() => setExpanded(!expanded)}
              variant="outlined"
            >
              {expanded ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Box>
          
          {/* Quick Filter Chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {filters.type && (
              <Chip 
                label={`Type: ${filters.type}`} 
                onDelete={() => onFilterChange({ ...filters, type: '' })}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            {filters.status && (
              <Chip 
                label={`Status: ${filters.status}`} 
                onDelete={() => onFilterChange({ ...filters, status: '' })}
                color="info"
                variant="outlined"
                size="small"
              />
            )}
            {filters.country && (
              <Chip 
                label={`Country: ${filters.country}`} 
                onDelete={() => onFilterChange({ ...filters, country: '' })}
                color="success"
                variant="outlined"
                size="small"
              />
            )}
            {filters.tags.length > 0 && (
              <Chip 
                label={`Tags: ${filters.tags.length}`} 
                onDelete={() => onFilterChange({ ...filters, tags: [] })}
                color="secondary"
                variant="outlined"
                size="small"
              />
            )}
            {filters.certifications.length > 0 && (
              <Chip 
                label={`Certifications: ${filters.certifications.length}`} 
                onDelete={() => onFilterChange({ ...filters, certifications: [] })}
                color="warning"
                variant="outlined"
                size="small"
              />
            )}
            {(filters.isFairTrade || filters.isOrganic) && (
              <Chip 
                label={filters.isFairTrade && filters.isOrganic 
                  ? 'Fair Trade & Organic' 
                  : filters.isFairTrade 
                    ? 'Fair Trade' 
                    : 'Organic'} 
                onDelete={() => onFilterChange({ 
                  ...filters, 
                  isFairTrade: false, 
                  isOrganic: false 
                })}
                color="error"
                variant="outlined"
                size="small"
              />
            )}
            {/* Show Clear All button when filters are applied */}
            {(filters.type || 
              filters.status || 
              filters.country || 
              filters.tags.length > 0 || 
              filters.certifications.length > 0 || 
              filters.isFairTrade || 
              filters.isOrganic) && (
              <Chip 
                label="Clear All" 
                onClick={onClearFilters}
                variant="outlined"
                size="small"
                color="default"
              />
            )}
          </Box>
        </Grid>

        {/* Advanced Filter Options */}
        {expanded && (
          <>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Basic Filters
              </Typography>
              <TextField
                select
                label="Partner Type"
                fullWidth
                value={filters.type}
                onChange={handleTypeChange}
                margin="dense"
                size="small"
              >
                <MenuItem value="">All Types</MenuItem>
                {partnerTypes.map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Status"
                fullWidth
                value={filters.status}
                onChange={handleStatusChange}
                margin="dense"
                size="small"
              >
                <MenuItem value="">All Statuses</MenuItem>
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Country"
                fullWidth
                value={filters.country}
                onChange={handleCountryChange}
                margin="dense"
                size="small"
              >
                <MenuItem value="">All Countries</MenuItem>
                {countries.map(country => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Coffee Specific
              </Typography>
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.isFairTrade || false}
                      onChange={handleCheckboxChange('isFairTrade')}
                    />
                  }
                  label="Fair Trade"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.isOrganic || false}
                      onChange={handleCheckboxChange('isOrganic')}
                    />
                  }
                  label="Organic"
                />
              </Box>
              <Autocomplete
                multiple
                options={allCertifications}
                value={filters.certifications}
                onChange={handleCertificationsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Certifications"
                    size="small"
                    margin="dense"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      label={option} 
                      size="small" 
                      {...getTagProps({ index })} 
                    />
                  ))
                }
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Other Filters
              </Typography>
              <Autocomplete
                multiple
                options={tagOptions}
                value={filters.tags}
                onChange={handleTagsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    size="small"
                    margin="dense"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip 
                      label={option} 
                      size="small" 
                      {...getTagProps({ index })} 
                    />
                  ))
                }
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={onClearFilters}
                  sx={{ mr: 1 }}
                >
                  Clear All
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setExpanded(false)}
                >
                  Apply Filters
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
    </FilterPaper>
  );
};

export default PartnerFilters; 