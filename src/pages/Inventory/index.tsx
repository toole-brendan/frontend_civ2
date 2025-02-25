import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  styled,
  Paper,
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
import { InventoryItem, InventoryFilters as InventoryFiltersType, WarehouseStructure } from './types';

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
  // State for warehouse selection
  const [selectedWarehouse, setSelectedWarehouse] = useState<string[]>([
    'main',
  ]);

  // State for inventory filters
  const [filters, setFilters] = useState<InventoryFiltersType>({
    search: '',
    status: '',
    category: '',
    location: '',
    warehouse: '',
    supplier: '',
    priceRange: { min: 0, max: 1000 },
  });

  // State for drawer/modal visibility
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Handlers for warehouse and filter changes
  const handleWarehouseSelect = (warehousePath: string[]) => {
    setSelectedWarehouse(warehousePath);
  };

  const handleFilterChange = (newFilters: InventoryFiltersType) => {
    setFilters(newFilters);
  };

  const handleSaveFilter = () => {
    console.log('Saving filter:', filters);
    // Implement save filter functionality
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: '',
      category: '',
      location: '',
      warehouse: '',
      supplier: '',
      priceRange: { min: 0, max: 1000 },
    });
  };

  // Handlers for item actions
  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleTransfer = (item: InventoryItem) => {
    console.log('Transfer item:', item);
    // Implement transfer item functionality
  };

  const handleShip = (item: InventoryItem) => {
    console.log('Ship item:', item);
    // Implement ship item functionality
  };

  const handleViewQR = (item: InventoryItem) => {
    console.log('View QR for item:', item);
    // Implement view QR functionality
  };

  const handleEdit = (item: InventoryItem) => {
    console.log('Edit item:', item);
    // Implement edit item functionality
  };

  const handleAddItem = (data: any) => {
    console.log('Add new item:', data);
    setIsAddItemOpen(false);
    // Implement add item functionality
  };

  // Mock inventory items that match the InventoryTable component's expected format
  const tableReadyItems = mockInventoryItems.map(item => ({
    id: item.id,
    name: item.name,
    sku: item.sku,
    category: {
      id: mockCategories.find(c => c.name === item.category)?.id || '1',
      name: item.category,
      color: mockCategories.find(c => c.name === item.category)?.color
    },
    quantity: item.quantity,
    location: {
      id: mockLocations.find(l => l.name === item.location)?.id || 'loc1',
      name: item.location,
      path: mockLocations.find(l => l.name === item.location)?.path || []
    },
    unitPrice: item.price,
    status: item.status === 'in_stock' 
      ? 'In Stock' 
      : item.status === 'reserved' 
        ? 'Low Stock' 
        : item.status === 'shipped' 
          ? 'Out of Stock' 
          : 'In Stock' as 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order' | 'Discontinued',
    lastUpdated: item.lastUpdated,
    description: `Sample description for ${item.name}`
  }));

  return (
    <Container maxWidth={false}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <InventoryIcon sx={{ mr: 2 }} />
        <PageTitle variant="h5">Inventory Management</PageTitle>
      </Box>

      {/* Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <MetricCard
          title="Total Items"
          value={mockInventoryMetrics.totalItems}
          icon={<InventoryIcon />}
        />
        <MetricCard
          title="In Stock"
          value={mockInventoryMetrics.itemsInStock}
          icon={<CheckCircleIcon />}
          color="success"
        />
        <MetricCard
          title="Reserved"
          value={mockInventoryMetrics.itemsReserved}
          icon={<WarningIcon />}
          color="warning"
        />
        <MetricCard
          title="Shipped"
          value={mockInventoryMetrics.itemsShipped}
          icon={<LocalShippingIcon />}
          color="info"
        />
      </Grid>

      {/* Add Item Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setIsAddItemOpen(true)}
        >
          Add Item
        </Button>
      </Box>

      {/* Main Content Area */}
      <Grid container spacing={3}>
        {/* Warehouse Selector */}
        <Grid item xs={12} md={3}>
          <DashboardCard elevation={0}>
            <Box className="card-header">
              <Typography variant="subtitle2">Warehouse Structure</Typography>
            </Box>
            <Box className="card-content">
              <WarehouseSelector
                warehouses={[mockWarehouseStructure]}
                onLocationSelect={handleWarehouseSelect}
                selectedPath={selectedWarehouse}
              />
            </Box>
          </DashboardCard>
        </Grid>

        {/* Inventory List */}
        <Grid item xs={12} md={9}>
          <DashboardCard elevation={0}>
            <Box className="card-header">
              <Typography variant="subtitle2">Inventory Items</Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <InventoryFilters
                categories={mockCategories}
                initialFilters={{
                  search: filters.search,
                  category: filters.category ? [filters.category] : [],
                  status: filters.status ? [filters.status] : [],
                  sortBy: 'name',
                  sortOrder: 'asc',
                  priceRange: [0, 1000],
                  dateRange: [null, null],
                  stockLevel: [0, 100]
                }}
                onFilterChange={(newFilters) => {
                  setFilters({
                    ...filters,
                    search: newFilters.search,
                    status: newFilters.status[0] || '',
                    category: newFilters.category[0] || '',
                    priceRange: { min: newFilters.priceRange[0], max: newFilters.priceRange[1] }
                  });
                }}
                onClearFilters={handleClearFilters}
              />
              
              <InventoryTable
                items={tableReadyItems}
                loading={false}
                onViewDetails={(id) => {
                  const item = mockInventoryItems.find(item => item.id === id);
                  if (item) handleViewDetails(item);
                }}
                onEdit={(id) => {
                  const item = mockInventoryItems.find(item => item.id === id);
                  if (item) handleEdit(item);
                }}
                onDelete={(id) => console.log('Delete item:', id)}
                onDuplicate={(id) => console.log('Duplicate item:', id)}
                onShowQrCode={(id) => {
                  const item = mockInventoryItems.find(item => item.id === id);
                  if (item) handleViewQR(item);
                }}
                onViewHistory={(id) => console.log('View history for item:', id)}
                onTransfer={(id) => {
                  const item = mockInventoryItems.find(item => item.id === id);
                  if (item) handleTransfer(item);
                }}
              />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Modals and Drawers */}
      {selectedItem && (
        <ItemDetailsDrawer
          open={isDetailsOpen}
          item={{
            ...selectedItem,
            category: {
              id: mockCategories.find(c => c.name === selectedItem.category)?.id || '1',
              name: selectedItem.category,
              color: mockCategories.find(c => c.name === selectedItem.category)?.color || '#4caf50'
            },
            location: {
              id: mockLocations.find(l => l.name === selectedItem.location)?.id || 'loc1',
              name: selectedItem.location,
              path: mockLocations.find(l => l.name === selectedItem.location)?.path || []
            },
            unitPrice: selectedItem.price,
            status: selectedItem.status === 'in_stock' ? 'In Stock' : selectedItem.status === 'reserved' ? 'Low Stock' : 'Out of Stock'
          }}
          categories={mockCategories}
          locations={mockLocations}
          onClose={() => setIsDetailsOpen(false)}
          onSave={(item) => console.log('Save item:', item)}
          onDelete={(id) => console.log('Delete item:', id)}
          onDuplicate={(id) => console.log('Duplicate item:', id)}
          onTransfer={(id) => {
            const item = mockInventoryItems.find(item => item.id === id);
            if (item) handleTransfer(item);
          }}
          onShowQrCode={(id) => {
            const item = mockInventoryItems.find(item => item.id === id);
            if (item) handleViewQR(item);
          }}
        />
      )}
      
      <AddItemModal
        open={isAddItemOpen}
        categories={mockCategories}
        locations={mockLocations}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddItem}
      />
    </Container>
  );
};

export default Inventory; 