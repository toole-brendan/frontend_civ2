import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  styled,
  Paper,
  Drawer,
  useTheme,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Add as AddIcon } from '@mui/icons-material';
import PageTitle from '../../components/common/PageTitle';

// Import the components
import { WarehouseSelector } from './components/WarehouseSelector';
import { InventoryFilters } from './components/InventoryFilters';
import { InventoryTable } from './components/InventoryTable';
import { ItemDetailsDrawer } from './components/ItemDetailsDrawer';
import { AddItemModal } from './components/AddItemModal';
import { InventoryItem, WarehouseStructure } from './types';
import InventoryHeader from './components/InventoryHeader';
import CategoryCards from './components/CategoryCards';
import InventoryMetricsStrip from './components/InventoryMetricsStrip';
import TechComponentsInventoryTable from './components/TechComponentsInventoryTable';
import InventoryInsights from './components/InventoryInsights';
import AdvancedSearchPanel from './components/AdvancedSearchPanel';

// Import types and mock data
import { 
  TechComponentsInventoryData, 
  TechComponentsInventoryItem,
  SavedFilter
} from './types';
import { techComponentsInventoryData } from './mockData';

// Base card styling following dashboard pattern
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  '& .card-header': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  '& .card-content': {
    padding: theme.spacing(2),
  },
}));

// Mock data for initial testing
const mockWarehouseStructure: WarehouseStructure = {
  id: 'main',
  name: 'Main Warehouse',
  level: 'warehouse',
  children: [
    {
      id: 'section-a',
      name: 'Section A',
      level: 'section',
      children: [
        {
          id: 'aisle-1',
          name: 'Aisle 1',
          level: 'aisle',
          children: [
            { id: 'shelf-1', name: 'Shelf 1', level: 'shelf' },
            { id: 'shelf-2', name: 'Shelf 2', level: 'shelf' },
          ],
        },
      ],
    },
    {
      id: 'section-b',
      name: 'Section B',
      level: 'section',
    },
  ],
};

// Mock inventory items
const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Widget A',
    sku: 'WA-1234',
    serialNumber: 'SN12345',
    status: 'in_stock',
    location: 'Section A, Aisle 1, Shelf 1',
    assignedTo: null,
    warehouse: 'Main Warehouse',
    category: 'Electronics',
    lastUpdated: '2023-10-15',
    quantity: 25,
    price: 29.99,
    supplier: 'ABC Supplies',
  },
  {
    id: '2',
    name: 'Gadget B',
    sku: 'GB-5678',
    serialNumber: 'SN67890',
    status: 'reserved',
    location: 'Section B, Aisle 3, Shelf 2',
    assignedTo: 'Order #12345',
    warehouse: 'Main Warehouse',
    category: 'Tools',
    lastUpdated: '2023-10-16',
    quantity: 10,
    price: 49.99,
    supplier: 'XYZ Manufacturing',
  },
  {
    id: '3',
    name: 'Component C',
    sku: 'CC-9012',
    serialNumber: 'SN90123',
    status: 'shipped',
    location: 'Shipping Area',
    assignedTo: 'Order #12346',
    warehouse: 'Main Warehouse',
    category: 'Parts',
    lastUpdated: '2023-10-17',
    quantity: 5,
    price: 19.99,
    supplier: 'ABC Supplies',
  },
];

// Mock inventory metrics
const mockInventoryMetrics = {
  totalItems: 500,
  itemsInStock: 350,
  itemsReserved: 75,
  itemsShipped: 60,
  itemsUnderMaintenance: 15,
  totalValue: 24750.50,
};

// Mock categories for filters
const mockCategories = [
  { id: '1', name: 'Electronics', description: 'Electronic components and devices', color: '#4caf50' },
  { id: '2', name: 'Tools', description: 'Hand and power tools', color: '#2196f3' },
  { id: '3', name: 'Parts', description: 'Spare parts and components', color: '#ff9800' },
];

// Mock locations for item placement
const mockLocations = [
  { id: 'loc1', name: 'Section A, Aisle 1, Shelf 1', path: ['main', 'section-a', 'aisle-1', 'shelf-1'] },
  { id: 'loc2', name: 'Section B, Aisle 3, Shelf 2', path: ['main', 'section-b', 'aisle-3', 'shelf-2'] },
  { id: 'loc3', name: 'Shipping Area', path: ['main', 'shipping'] },
];

// Define MetricCard component for inventory metrics
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}> = ({ title, value, icon, color = 'primary' }) => (
  <Grid item xs={12} sm={6} md={3}>
    <DashboardCard elevation={0}>
      <Box className="card-content" sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: `${color}.light`,
              color: `${color}.main`,
            }}
          >
            {icon}
          </Box>
          <Typography variant="subtitle2" color="textSecondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
    </DashboardCard>
  </Grid>
);

const Inventory: React.FC = () => {
  const theme = useTheme();
  const [data, setData] = useState<TechComponentsInventoryData>(techComponentsInventoryData);
  const [filteredItems, setFilteredItems] = useState<TechComponentsInventoryItem[]>(data.items);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TechComponentsInventoryItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'info'
  });
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
    action: () => void;
  }>({
    open: false,
    title: '',
    message: '',
    action: () => {}
  });

  // Handle search panel toggle
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  // Handle filter changes
  const handleFilterChange = (filters: any) => {
    // In a real app, this would filter based on the criteria
    // For now, we'll just simulate filtering with a subset of items
    const filtered = data.items.filter(item => {
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !item.sku.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      if (filters.categories.length > 0 && !filters.categories.includes(item.category)) {
        return false;
      }
      
      if (filters.suppliers.length > 0 && !filters.suppliers.includes(item.supplier)) {
        return false;
      }
      
      if (filters.locations.length > 0 && !item.locations.some(loc => 
        filters.locations.includes(loc.warehouseId))) {
        return false;
      }
      
      return true;
    });
    
    setFilteredItems(filtered);
    
    // Update active filters for display
    const newActiveFilters: string[] = [];
    if (filters.search) newActiveFilters.push(`Search: ${filters.search}`);
    if (filters.categories.length) newActiveFilters.push(`Categories: ${filters.categories.length}`);
    if (filters.suppliers.length) newActiveFilters.push(`Suppliers: ${filters.suppliers.length}`);
    if (filters.locations.length) newActiveFilters.push(`Locations: ${filters.locations.length}`);
    
    setActiveFilters(newActiveFilters);
  };

  // Handle saved filter load
  const handleLoadSavedFilter = (filter: SavedFilter) => {
    handleFilterChange(filter.filters);
    setSearchOpen(false);
    showSnackbar(`Loaded filter: ${filter.name}`, 'success');
  };

  // Handle save filter
  const handleSaveFilter = (name: string, filters: any) => {
    // In a real app, this would save to the backend
    showSnackbar(`Filter "${name}" saved successfully`, 'success');
    setSearchOpen(false);
  };

  // Handle view item details
  const handleViewDetails = (item: TechComponentsInventoryItem) => {
    setSelectedItem(item);
    setDetailsOpen(true);
  };

  // Handle edit item
  const handleEditItem = (item: TechComponentsInventoryItem) => {
    // In a real app, this would open an edit form
    showSnackbar(`Editing item: ${item.name}`, 'info');
  };

  // Handle transfer item
  const handleTransferItem = (item: TechComponentsInventoryItem) => {
    // In a real app, this would open a transfer dialog
    showConfirmDialog(
      'Transfer Item',
      `Are you sure you want to transfer ${item.name}?`,
      () => {
        showSnackbar(`Transfer initiated for: ${item.name}`, 'success');
      }
    );
  };

  // Handle order item
  const handleOrderItem = (item: TechComponentsInventoryItem) => {
    // In a real app, this would open an order dialog
    showConfirmDialog(
      'Order Item',
      `Are you sure you want to order more ${item.name}?`,
      () => {
        showSnackbar(`Order placed for: ${item.name}`, 'success');
      }
    );
  };

  // Handle view QR code
  const handleViewQR = (item: TechComponentsInventoryItem) => {
    // In a real app, this would display the QR code
    showSnackbar(`Viewing QR code for: ${item.name}`, 'info');
  };

  // Handle recommendation action
  const handleRecommendationAction = (action: string, itemId: string) => {
    const item = data.items.find(i => i.id === itemId);
    if (!item) return;

    switch (action) {
      case 'order':
        handleOrderItem(item);
        break;
      case 'transfer':
        handleTransferItem(item);
        break;
      case 'rebalance':
        showSnackbar(`Rebalancing inventory for: ${item.name}`, 'info');
        break;
      case 'substitute':
        showSnackbar(`Finding substitutes for: ${item.name}`, 'info');
        break;
      case 'view':
        handleViewDetails(item);
        break;
      case 'view_all':
        showSnackbar('Viewing all recommendations', 'info');
        break;
      default:
        break;
    }
  };

  // Handle category click
  const handleCategoryClick = (categoryId: string) => {
    const category = data.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    // Filter items by category
    const filtered = data.items.filter(item => item.category === category.name);
    setFilteredItems(filtered);
    setActiveFilters([`Category: ${category.name}`]);
    showSnackbar(`Viewing category: ${category.name}`, 'info');
  };

  // Show snackbar
  const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  // Show confirmation dialog
  const showConfirmDialog = (title: string, message: string, action: () => void) => {
    setConfirmDialog({
      open: true,
      title,
      message,
      action
    });
  };

  // Handle confirm dialog close
  const handleConfirmDialogClose = (confirm: boolean) => {
    if (confirm) {
      confirmDialog.action();
    }
    setConfirmDialog({
      ...confirmDialog,
      open: false
    });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilteredItems(data.items);
    setActiveFilters([]);
    showSnackbar('All filters cleared', 'info');
  };

  return (
    <Container maxWidth={false} sx={{ mt: 3, mb: 4 }}>
      {/* Header with metrics */}
      <InventoryHeader 
        metrics={data.metrics}
        activeFilters={activeFilters.length}
        onAdvancedSearchClick={handleSearchToggle}
        onFilterClick={handleSearchToggle}
        onExportClick={() => showSnackbar('Exporting inventory data', 'info')}
        onImportClick={() => showSnackbar('Importing inventory data', 'info')}
        onAddItemClick={() => showSnackbar('Adding new item', 'info')}
      />

      {/* Metrics Strip */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <InventoryMetricsStrip metrics={data.metrics} />
      </Box>

      {/* Category Cards */}
      <Box sx={{ mt: 3, mb: 3 }}>
        <CategoryCards 
          categories={data.categories} 
          onCategoryClick={handleCategoryClick} 
        />
      </Box>

      {/* Main Content */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Inventory Table */}
        <Grid item xs={12} md={9}>
          <TechComponentsInventoryTable 
            items={filteredItems}
            onViewDetails={handleViewDetails}
            onEditItem={handleEditItem}
            onTransferItem={handleTransferItem}
            onOrderItem={handleOrderItem}
            onViewQR={handleViewQR}
          />
        </Grid>

        {/* Insights Panel */}
        <Grid item xs={12} md={3}>
          <InventoryInsights 
            recommendations={data.recommendations}
            onActionClick={handleRecommendationAction}
          />
        </Grid>
      </Grid>

      {/* Advanced Search Drawer */}
      <Drawer
        anchor="right"
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { 
            width: { xs: '100%', sm: 450 },
            padding: 2
          },
        }}
      >
        <AdvancedSearchPanel 
          open={searchOpen}
          onSearch={handleFilterChange}
          onSaveSearch={handleSaveFilter}
          onClose={() => setSearchOpen(false)}
          savedFilters={data.savedFilters}
          onLoadSavedFilter={handleLoadSavedFilter}
          categories={data.categories.map(c => c.name)}
          suppliers={Array.from(new Set(data.items.map(item => item.supplier)))}
          locations={data.warehouses.map(w => w.id)}
          subcategories={Array.from(new Set(data.items.map(item => item.subcategory)))}
          onClearFilters={handleClearFilters}
          initialFilters={{
            search: '',
            sku: '',
            description: '',
            suppliers: [],
            categories: [],
            subcategories: [],
            locations: [],
            stockLevelRange: { min: 0, max: 10000 },
            receivedDateRange: { start: null, end: null },
            lifecycleStatus: [],
            blockchainVerified: null
          }}
        />
      </Drawer>

      {/* Item Details Drawer */}
      <Drawer
        anchor="right"
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { 
            width: { xs: '100%', sm: 600 },
            padding: 0
          },
        }}
      >
        {selectedItem && (
          <ItemDetailsDrawer 
            item={selectedItem}
            onClose={() => setDetailsOpen(false)}
          />
        )}
      </Drawer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => handleConfirmDialogClose(false)}
      >
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          {confirmDialog.message}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmDialogClose(false)}>Cancel</Button>
          <Button onClick={() => handleConfirmDialogClose(true)} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Inventory; 