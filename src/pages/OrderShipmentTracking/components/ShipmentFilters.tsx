import React from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Tabs,
  Tab,
  Stack,
  Chip,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface ShipmentFiltersProps {
  tabValue: number;
  searchTerm: string;
  anchorEl: HTMLElement | null;
  shipmentStats: {
    all: number;
    inbound: number;
    outbound: number;
    internal: number;
    critical: number;
  };
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMenuClose: () => void;
  onStatusFilterChange: (status: string) => void;
}

const ShipmentFilters: React.FC<ShipmentFiltersProps> = ({
  tabValue,
  searchTerm,
  anchorEl,
  shipmentStats,
  onTabChange,
  onSearchChange,
  onMenuOpen,
  onMenuClose,
  onStatusFilterChange
}) => {
  return (
    <>
      {/* Search and Filters */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search by ID, Origin, Destination, or Items..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ maxWidth: { xs: '100%', md: 400 } }}
          />
          <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
            <Button
              variant="outlined" 
              startIcon={<FilterListIcon />}
              onClick={onMenuOpen}
              endIcon={<ArrowDropDownIcon />}
              size="small"
            >
              Status Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              size="small"
            >
              Refresh
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              size="small"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              Export
            </Button>
          </Stack>
        </Box>

        {/* Status Filter Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={onMenuClose}
        >
          <MenuItem onClick={() => { onStatusFilterChange('all'); onMenuClose(); }}>
            All Statuses
          </MenuItem>
          <MenuItem onClick={() => { onStatusFilterChange('in-transit'); onMenuClose(); }}>
            <Chip 
              size="small" 
              label="In Transit" 
              color="info" 
              sx={{ mr: 1, height: 24 }} 
            />
            In Transit
          </MenuItem>
          <MenuItem onClick={() => { onStatusFilterChange('in-customs'); onMenuClose(); }}>
            <Chip 
              size="small" 
              label="In Customs" 
              color="warning" 
              sx={{ mr: 1, height: 24 }} 
            />
            In Customs
          </MenuItem>
          <MenuItem onClick={() => { onStatusFilterChange('preparing'); onMenuClose(); }}>
            <Chip 
              size="small" 
              label="Preparing" 
              color="secondary" 
              sx={{ mr: 1, height: 24 }} 
            />
            Preparing
          </MenuItem>
          <MenuItem onClick={() => { onStatusFilterChange('delivered'); onMenuClose(); }}>
            <Chip 
              size="small" 
              label="Delivered" 
              color="success" 
              sx={{ mr: 1, height: 24 }} 
            />
            Delivered
          </MenuItem>
          <MenuItem onClick={() => { onStatusFilterChange('delayed'); onMenuClose(); }}>
            <Chip 
              size="small" 
              label="Delayed" 
              color="error" 
              sx={{ mr: 1, height: 24 }} 
            />
            Delayed
          </MenuItem>
        </Menu>

        {/* Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={onTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider'
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalShippingIcon sx={{ mr: 1, fontSize: 20 }} />
                All Shipments
                <Chip 
                  label={shipmentStats.all} 
                  size="small" 
                  sx={{ ml: 1, height: 20, minWidth: 28 }} 
                />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SouthIcon sx={{ mr: 1, fontSize: 20 }} />
                Inbound
                <Chip 
                  label={shipmentStats.inbound} 
                  size="small" 
                  color="info"
                  sx={{ ml: 1, height: 20, minWidth: 28 }} 
                />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NorthIcon sx={{ mr: 1, fontSize: 20 }} />
                Outbound
                <Chip 
                  label={shipmentStats.outbound} 
                  size="small"
                  color="info" 
                  sx={{ ml: 1, height: 20, minWidth: 28 }} 
                />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SwapHorizIcon sx={{ mr: 1, fontSize: 20 }} />
                Internal
                <Chip 
                  label={shipmentStats.internal} 
                  size="small" 
                  color="info"
                  sx={{ ml: 1, height: 20, minWidth: 28 }} 
                />
              </Box>
            } 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ErrorOutlineIcon sx={{ mr: 1, fontSize: 20 }} />
                Critical
                <Chip 
                  label={shipmentStats.critical} 
                  size="small" 
                  color="error"
                  sx={{ ml: 1, height: 20, minWidth: 28 }} 
                />
              </Box>
            } 
          />
        </Tabs>
      </Box>
    </>
  );
};

export default ShipmentFilters;
