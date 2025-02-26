import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VerifiedIcon from '@mui/icons-material/Verified';
import { InventoryMetrics } from '../types';

interface InventoryHeaderProps {
  metrics: InventoryMetrics;
  activeFilters: number;
  onAdvancedSearchClick: () => void;
  onFilterClick: () => void;
  onAddItemClick: () => void;
  onImportClick: () => void;
  onExportClick: () => void;
}

export const InventoryHeader: React.FC<InventoryHeaderProps> = ({
  metrics,
  activeFilters,
  onAdvancedSearchClick,
  onFilterClick,
  onAddItemClick,
  onImportClick,
  onExportClick
}) => {
  const theme = useTheme();
  const [importExportAnchorEl, setImportExportAnchorEl] = useState<null | HTMLElement>(null);
  const importExportMenuOpen = Boolean(importExportAnchorEl);

  const handleImportExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setImportExportAnchorEl(event.currentTarget);
  };

  const handleImportExportClose = () => {
    setImportExportAnchorEl(null);
  };

  const handleImportClick = () => {
    handleImportExportClose();
    onImportClick();
  };

  const handleExportClick = () => {
    handleImportExportClose();
    onExportClick();
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header with title and stats */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            Inventory Management
            <Chip 
              icon={<VerifiedIcon fontSize="small" />}
              label="Blockchain Verified"
              size="small"
              color="success"
              sx={{ ml: 2, height: 24 }}
            />
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            {metrics.totalSKUs.toLocaleString()} SKUs | ${metrics.totalValue.toLocaleString()} Total Value
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<SearchIcon />}
            onClick={onAdvancedSearchClick}
            sx={{ mr: 1 }}
          >
            Advanced Search
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={onFilterClick}
            sx={{ mr: 1 }}
            color={activeFilters > 0 ? 'primary' : 'inherit'}
            endIcon={activeFilters > 0 ? (
              <Badge badgeContent={activeFilters} color="primary" sx={{ ml: 1 }}>
                <Box />
              </Badge>
            ) : undefined}
          >
            Filters
          </Button>
          <Button
            variant="outlined"
            startIcon={<MoreVertIcon />}
            onClick={handleImportExportClick}
            sx={{ mr: 1 }}
          >
            Import/Export
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onAddItemClick}
          >
            Add New Item
          </Button>
        </Box>
      </Box>

      {/* Import/Export Menu */}
      <Menu
        anchorEl={importExportAnchorEl}
        open={importExportMenuOpen}
        onClose={handleImportExportClose}
        PaperProps={{
          elevation: 3,
          sx: { width: 250, mt: 1 }
        }}
      >
        <MenuItem onClick={handleImportClick}>
          <ListItemIcon>
            <FileUploadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Import from CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleImportClick}>
          <ListItemIcon>
            <FileUploadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Import from ERP</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleExportClick}>
          <ListItemIcon>
            <FileDownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export to CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportClick}>
          <ListItemIcon>
            <FileDownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export to Excel</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportClick}>
          <ListItemIcon>
            <FileDownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export to ERP</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default InventoryHeader; 