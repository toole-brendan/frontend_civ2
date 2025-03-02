import React, { useState } from 'react';
import { 
  Box, 
  Container,
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  Stack
} from '@mui/material';

// Icons
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddIcon from '@mui/icons-material/Add';

// Components
import {
  ShipmentStatusCards,
  ShipmentFilters,
  ShipmentTable,
  ShipmentDetailPanel
} from './components';

// Data
import { shipmentData, shipmentStats } from './data';
import { Shipment } from './data';

const OrderShipmentTracking: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  // Tab change handler
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setPage(0);
  };

  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setPage(0);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setTabValue(0);
  };

  // Row click handler
  const handleRowClick = (shipment: Shipment) => {
    setSelectedShipment(shipment);
  };

  // Filter data based on active tab, search term, and status filter
  const getFilteredData = () => {
    let filtered = [...shipmentData];
    
    // Apply tab filter
    switch (tabValue) {
      case 1: // Inbound
        filtered = filtered.filter(item => item.type === 'inbound');
        break;
      case 2: // Outbound
        filtered = filtered.filter(item => item.type === 'outbound');
        break;
      case 3: // Internal
        filtered = filtered.filter(item => item.type === 'internal');
        break;
      case 4: // Critical
        filtered = filtered.filter(item => item.priority === 'high');
        break;
      default: // All
        break;
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.items.some(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter (if not 'all')
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    return filtered;
  };

  const filteredData = getFilteredData();

  // Calculate metrics for status cards
  const valueInTransit = shipmentData
    .filter(s => ['in-transit', 'in-customs', 'preparing', 'delayed'].includes(s.status))
    .reduce((sum, item) => sum + item.value, 0);

  const activeShipmentsCount = shipmentData
    .filter(s => ['in-transit', 'in-customs', 'preparing', 'delayed'].includes(s.status))
    .length;

  const expectedToday = {
    total: 3, // Mocked data - in a real app, this would be based on delivery dates
    inbound: 2,
    outbound: 1
  };

  const delayedShipments = {
    count: shipmentData.filter(s => s.status === 'delayed').length,
    critical: shipmentData.filter(s => s.status === 'delayed' && s.priority === 'high').length
  };

  const verificationStats = {
    percent: 100, // Assuming all shipments are verified in this example
    confirmations: shipmentData.reduce((sum, item) => sum + item.confirmations, 0)
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3 }}>
      <Container maxWidth="xl">
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h5" sx={{ mb: 0.5 }}>
                Order & Shipment Tracking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage and monitor all shipments across your supply chain with blockchain verification
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
                <Button
                  variant="outlined"
                  startIcon={<QrCodeScannerIcon />}
                >
                  Scan Shipment
                </Button>
                <Button
                  variant="contained" 
                  startIcon={<AddIcon />}
                >
                  Create Shipment
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Summary Cards */}
        <ShipmentStatusCards
          valueInTransit={valueInTransit}
          activeShipmentsCount={activeShipmentsCount}
          expectedToday={expectedToday}
          delayedShipments={delayedShipments}
          verificationStats={verificationStats}
        />

        {/* Main Content */}
        <Grid container spacing={3}>
          {/* Shipment Table */}
          <Grid item xs={12} lg={selectedShipment ? 8 : 12}>
            <Card>
              <CardContent sx={{ p: 2 }}>
                {/* Filters */}
                <ShipmentFilters
                  tabValue={tabValue}
                  searchTerm={searchTerm}
                  anchorEl={anchorEl}
                  shipmentStats={shipmentStats}
                  onTabChange={handleTabChange}
                  onSearchChange={(e) => setSearchTerm(e.target.value)}
                  onMenuOpen={handleMenuOpen}
                  onMenuClose={handleMenuClose}
                  onStatusFilterChange={handleStatusFilterChange}
                />

                {/* Shipments Table */}
                <ShipmentTable
                  filteredData={filteredData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  selectedShipment={selectedShipment}
                  onRowClick={handleRowClick}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  onClearFilters={handleClearFilters}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Shipment Details Panel */}
          {selectedShipment && (
            <Grid item xs={12} lg={4}>
              <ShipmentDetailPanel shipment={selectedShipment} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default OrderShipmentTracking;
