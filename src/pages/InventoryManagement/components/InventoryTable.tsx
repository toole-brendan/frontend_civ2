import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Menu,
  MenuItem,
  alpha,
  useTheme
} from '@mui/material';
import { 
  TableCard, 
  ProgressBar, 
  VerificationBadge, 
  StatusChip,
  TableToolbar
} from '@/components/common';
import { inventoryItems, inventoryHealth, InventoryItem } from '../data';

// Icons
import TuneIcon from '@mui/icons-material/Tune';
import RefreshIcon from '@mui/icons-material/Refresh';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import HistoryIcon from '@mui/icons-material/History';
import FilterListIcon from '@mui/icons-material/FilterList';

interface InventoryTableProps {
  searchTerm: string;
  onItemSelect: (item: InventoryItem) => void;
}

/**
 * Component that displays the inventory items in a tabbed table
 */
const InventoryTable: React.FC<InventoryTableProps> = ({
  searchTerm,
  onItemSelect
}) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [actionItem, setActionItem] = useState<InventoryItem | null>(null);

  // Filter items based on search term and selected tab
  const filteredItems = inventoryItems.filter(item => {
    // First filter by search term
    const matchesSearch = 
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then filter by selected tab
    if (selectedTab === 0) return matchesSearch; // All items
    if (selectedTab === 1) return matchesSearch && item.critical; // Critical items
    if (selectedTab === 2) return matchesSearch && !item.critical && item.status.includes('Low'); // Low stock
    if (selectedTab === 3) return matchesSearch && item.lastTransaction.includes('Inbound'); // Recently added
    
    return matchesSearch;
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, item: InventoryItem) => {
    event.stopPropagation();
    setActionItem(item);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActionItem(null);
  };

  // Custom toolbar content with tabs
  const toolbarContent = (
    <Box sx={{ width: '100%' }}>
      <Tabs 
        value={selectedTab} 
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 1 }}
      >
        <Tab label="All Items" />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              Critical Items
              <StatusChip 
                label={inventoryHealth.critical.count.toString()} 
                size="small" 
                status="error" 
                sx={{ ml: 1, height: 20 }} 
              />
            </Box>
          } 
        />
        <Tab label="Low Stock" />
        <Tab label="Recently Added" />
      </Tabs>
    </Box>
  );

  // Custom toolbar actions
  const toolbarActions = (
    <Box>
      <Button 
        size="small" 
        startIcon={<TuneIcon fontSize="small" />}
        variant="text"
        sx={{ mr: 1 }}
      >
        Columns
      </Button>
      <Button 
        size="small" 
        startIcon={<RefreshIcon fontSize="small" />}
        variant="text"
      >
        Refresh
      </Button>
    </Box>
  );

  // Define table columns with correct typing
  const columns = [
    { 
      id: 'id',
      label: 'SKU / Name',
      field: 'id' as keyof InventoryItem,
      renderCell: (item: InventoryItem) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          {item.verified && (
            <Box sx={{ mr: 1 }}>
              <VerificationBadge 
                status="verified"
                verifications={3}
                size="small"
              />
            </Box>
          )}
          <Box>
            <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', letterSpacing: '-0.01em' }}>
              {item.id}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.name}
            </Typography>
          </Box>
        </Box>
      )
    },
    { 
      id: 'category',
      label: 'Category',
      field: 'category' as keyof InventoryItem,
      minWidth: 120
    },
    { 
      id: 'stock',
      label: 'Stock Level',
      field: 'stock' as keyof InventoryItem,
      minWidth: 150,
      renderCell: (item: InventoryItem) => {
        const stockPercent = Math.min((item.stock / item.min) * 100, 100);
        const stockColor = 
          stockPercent <= 30 ? 'error' : 
          stockPercent <= 70 ? 'warning' : 'success';
        
        return (
          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">
                <Box component="span" sx={{ color: theme.palette[stockColor].main, fontWeight: 'medium' }}>
                  {item.stock.toLocaleString()}
                </Box>
                /{item.min.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Min
              </Typography>
            </Box>
            <ProgressBar 
              value={stockPercent} 
              color={stockColor}
            />
          </Box>
        );
      }
    },
    { 
      id: 'location',
      label: 'Location',
      field: 'location' as keyof InventoryItem,
      minWidth: 120,
      renderCell: (item: InventoryItem) => (
        <StatusChip
          label={item.location}
          size="small"
          status="default"
          variant="subtle"
        />
      )
    },
    { 
      id: 'supplier',
      label: 'Supplier',
      field: 'supplier' as keyof InventoryItem,
      minWidth: 120
    },
    { 
      id: 'leadTime',
      label: 'Lead Time',
      field: 'leadTime' as keyof InventoryItem,
      minWidth: 100
    },
    { 
      id: 'value',
      label: 'Value',
      field: 'value' as keyof InventoryItem,
      minWidth: 100,
      renderCell: (item: InventoryItem) => (
        <Typography sx={{ fontFamily: 'monospace' }}>
          ${item.value.toLocaleString()}
        </Typography>
      )
    },
    { 
      id: 'status',
      label: 'Status',
      field: 'status' as keyof InventoryItem,
      minWidth: 130,
      renderCell: (item: InventoryItem) => {
        let status: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';
        
        if (item.status.includes('Healthy')) status = 'success';
        else if (item.status.includes('Critical') || item.status.includes('affected')) status = 'error';
        else if (item.status.includes('Low') || item.status.includes('warning')) status = 'warning';
        else if (item.status.includes('Excess')) status = 'info';
        
        return (
          <StatusChip
            label={item.status}
            size="small"
            status={status}
          />
        );
      }
    },
    { 
      id: 'actions',
      label: 'Actions',
      minWidth: 120,
      renderCell: (item: InventoryItem) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" color="primary">
            <ShoppingCartIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <SwapHorizIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small" 
            color="primary"
            onClick={(e) => handleMenuOpen(e, item)}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>
      )
    }
  ];

  return (
    <React.Fragment>
      <Box sx={{ mb: 3 }}>
        {toolbarContent}
        <TableCard
          title="Inventory Items"
          subtitle={`${filteredItems.length} items found`}
          toolbarActions={toolbarActions}
          data={filteredItems}
          columns={columns}
          enablePagination={true}
          defaultRowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowClick={onItemSelect}
          cardVariant="default"
        />
      </Box>
      
      {/* Actions Menu */}
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{ 
            elevation: 0,
            sx: {
              borderRadius: 1,
              border: '1px solid rgba(140, 140, 160, 0.12)',
            }
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit Item
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <QrCodeScannerIcon fontSize="small" sx={{ mr: 1 }} />
            Generate QR Code
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <VerifiedIcon fontSize="small" sx={{ mr: 1 }} />
            Verify on Blockchain
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
            View History
          </MenuItem>
        </Menu>
      )}
    </React.Fragment>
  );
};

export default InventoryTable;
