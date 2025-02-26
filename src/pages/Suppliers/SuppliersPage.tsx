import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  useTheme,
  Paper,
  Typography,
  Chip,
  IconButton,
  Button,
  Tabs,
  Tab,
  useMediaQuery,
  Drawer,
  Divider,
  Alert,
  styled
} from '@mui/material';
import SupplierHeader from './components/SupplierHeader';
import SupplierHealthDashboard from './components/SupplierHealthDashboard';
import KeySupplierCards from './components/KeySupplierCards';
import SupplierOrderStatusPanel from './components/SupplierOrderStatusPanel';
import SupplierTable from './components/SupplierTable';
import SupplierProfileSummary from './components/SupplierProfileSummary';
import SmartContractStatusPanel from './components/SmartContractStatusPanel';
import ComponentQualityTracking from './components/ComponentQualityTracking';
import SupplierMapView from './components/SupplierMapView';
import SupplierAnalytics from './components/SupplierAnalytics';
import SupplierFilter from './components/SupplierFilter';
import SupplierRiskManagement from './components/SupplierRiskManagement';
import { Supplier } from './types';

// Icons
import TableChartIcon from '@mui/icons-material/TableChart';
import MapIcon from '@mui/icons-material/Map';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BarChartIcon from '@mui/icons-material/BarChart';

import { 
  mockSuppliers, 
  mockSupplierMetrics, 
  mockOrderStatuses, 
  mockQualityMetrics,
  mockUser 
} from './mockData';

// Styled components
const DashboardCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  overflow: 'hidden',
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const TabIcon = styled(Box)(({ theme }) => ({
  display: 'flex', 
  alignItems: 'center', 
  '& > svg': {
    marginRight: theme.spacing(1),
    fontSize: '1.2rem',
  }
}));

const SuppliersPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [activeOrderStatusFilter, setActiveOrderStatusFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'map' | 'analytics' | 'risk'>('table');
  
  // Get the selected supplier
  const selectedSupplier = selectedSupplierId ? 
    mockSuppliers.find(s => s.id === selectedSupplierId) : 
    null;

  // Handler for selecting a supplier
  const handleSupplierSelect = (supplierOrId: Supplier | string) => {
    const supplierId = typeof supplierOrId === 'string' ? supplierOrId : supplierOrId.id;
    setSelectedSupplierId(supplierId);
    if (isMobile) {
      setDrawerOpen(true);
    }
  };

  // Handler for order status filter changes
  const handleOrderStatusFilterChange = (status: string | null) => {
    setActiveOrderStatusFilter(status === activeOrderStatusFilter ? null : status);
  };

  // Various action handlers
  const handleSearch = (query: string) => console.log('Search:', query);
  const handleExportData = () => console.log('Export data');
  const handleAddSupplier = () => console.log('Add supplier');
  const handleSupplierAssessment = () => console.log('Supplier assessment');
  const handleGenerateReport = () => console.log('Generate report');
  const handleRegionFilter = (region: string) => console.log('Filter by region:', region);
  const handleTimeRangeChange = () => console.log('Time range changed');
  const handleViewFullscreen = () => console.log('View fullscreen');
  const handleContactSupplier = (supplier: Supplier) => console.log('Contact supplier', supplier.id);
  const handleCreateOrder = (supplier: Supplier) => console.log('Create order', supplier.id);
  const handleSendMessage = () => console.log('Send message');
  const handleScheduleCall = () => console.log('Schedule call');
  const handleViewContract = () => console.log('View contract');
  const handleMakePayment = (supplier: Supplier) => console.log('Make payment', supplier.id);
  const handleViewTransactions = () => console.log('View transactions');
  const handleViewIncident = () => console.log('View incident');
  const handleViewAllMetrics = () => console.log('View all metrics');
  const handleFilterChange = (filters: any) => console.log('Filter changed:', filters);

  // Render the active view content based on selected tab and view mode
  const renderContent = () => {
    if (activeTab === 0) {
      switch (viewMode) {
        case 'table':
          return (
            <SupplierTable 
              suppliers={mockSuppliers}
              onViewDetails={handleSupplierSelect}
              onContactSupplier={handleContactSupplier}
              onCreateOrder={handleCreateOrder}
              onPaySupplier={handleMakePayment}
              onExpandRow={(supplierId) => setSelectedSupplierId(supplierId)}
              expandedSupplierId={selectedSupplierId}
            />
          );
        case 'map':
          return (
            <SupplierMapView 
              suppliers={mockSuppliers}
              onRegionFilter={handleRegionFilter}
              onSupplierSelect={handleSupplierSelect}
              onViewFullscreen={handleViewFullscreen}
            />
          );
        case 'analytics':
          return (
            <SupplierAnalytics 
              suppliers={mockSuppliers}
              onTimeRangeChange={handleTimeRangeChange}
              onExportData={handleExportData}
              onFilterChange={handleFilterChange}
            />
          );
        case 'risk':
          return (
            <SupplierRiskManagement 
              suppliers={mockSuppliers}
              onSupplierSelect={handleSupplierSelect}
            />
          );
      }
    } else if (activeTab === 1) {
      return (
        <SupplierAnalytics 
          suppliers={mockSuppliers}
          onTimeRangeChange={handleTimeRangeChange}
          onExportData={handleExportData}
          onFilterChange={handleFilterChange}
        />
      );
    } else if (activeTab === 2) {
      return (
        <SupplierRiskManagement 
          suppliers={mockSuppliers}
          onSupplierSelect={handleSupplierSelect}
        />
      );
    }
  };

  // Render the supplier details view
  const renderSupplierDetails = () => {
    if (!selectedSupplier) {
      return (
        <Alert 
          severity="info" 
          sx={{ 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 0,
            textAlign: 'center'
          }}
        >
          Select a supplier to view detailed information
        </Alert>
      );
    }

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <SupplierProfileSummary 
          supplier={selectedSupplier} 
          onContactSupplier={handleContactSupplier}
          onScheduleCall={handleScheduleCall}
          onSendMessage={handleSendMessage}
          onViewContract={handleViewContract}
        />
        
        {selectedSupplier.smartContract && (
          <SmartContractStatusPanel 
            contract={selectedSupplier.smartContract}
            onViewTransactions={handleViewTransactions}
            onViewContract={handleViewContract}
            onMakePayment={() => handleMakePayment(selectedSupplier)}
          />
        )}
        
        <ComponentQualityTracking 
          qualityMetrics={mockQualityMetrics}
          onViewIncident={handleViewIncident}
          onViewAllMetrics={handleViewAllMetrics}
        />
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header with search and actions */}
      <SupplierHeader 
        onAddSupplier={handleAddSupplier}
        onSupplierAssessment={handleSupplierAssessment}
        onGenerateReport={handleGenerateReport}
        onExportData={handleExportData}
        onSearch={handleSearch}
      />

      {/* KPI/Metrics Row */}
      <Grid container spacing={3} sx={{ mt: 3, mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    mr: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'primary.lighter',
                  }}
                >
                  <BusinessIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Total Suppliers</Typography>
                  <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.totalCount}</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  size="small" 
                  label={`${mockSupplierMetrics.activeSuppliers} active`} 
                  color="primary"
                  sx={{ mr: 1 }}
                />
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    mr: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'success.lighter',
                  }}
                >
                  <BarChartIcon color="success" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Average Performance</Typography>
                  <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.averagePerformance}%</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  size="small" 
                  label="+3.2% this month" 
                  color="success"
                />
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    mr: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'warning.lighter',
                  }}
                >
                  <VerifiedUserIcon color="warning" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Verified Suppliers</Typography>
                  <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.verifiedCount}</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  size="small" 
                  label={`${Math.round((mockSupplierMetrics.verifiedCount / mockSupplierMetrics.totalCount) * 100)}% of total`} 
                  color="warning"
                />
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                  sx={{
                    mr: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'info.lighter',
                  }}
                >
                  <AccountBalanceWalletIcon color="info" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Smart Contracts</Typography>
                  <Typography variant="h4" fontWeight="bold">{mockSupplierMetrics.smartContractCount}</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Chip 
                  size="small" 
                  label={`${mockSupplierMetrics.annualSavings}% savings`} 
                  color="info"
                />
              </Box>
            </CardContent>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Order Status Panel */}
      <DashboardCard sx={{ mb: 3 }}>
        <CardHeader>
          <Typography variant="subtitle1" fontWeight="medium">Order Status</Typography>
        </CardHeader>
        <CardContent>
          <SupplierOrderStatusPanel
            orderStatuses={mockOrderStatuses}
            activeFilter={activeOrderStatusFilter}
            onStatusClick={handleOrderStatusFilterChange}
          />
        </CardContent>
      </DashboardCard>

      {/* Main Navigation Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          aria-label="main navigation tabs"
        >
          <Tab 
            label={
              <TabIcon>
                <BusinessIcon /> Suppliers
              </TabIcon>
            } 
          />
          <Tab 
            label={
              <TabIcon>
                <BarChartIcon /> Analytics
              </TabIcon>
            } 
          />
          <Tab 
            label={
              <TabIcon>
                <SecurityIcon /> Risk Management
              </TabIcon>
            } 
          />
        </Tabs>
      </Box>

      {/* Content Area */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* View Selection and Filtering */}
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 2,
              flexWrap: 'wrap',
              gap: 1
            }}>
              <Tabs 
                value={['table', 'map', 'analytics', 'risk'].indexOf(viewMode)} 
                onChange={(_, newValue) => {
                  const modes = ['table', 'map', 'analytics', 'risk'] as const;
                  setViewMode(modes[newValue]);
                }}
                aria-label="view mode tabs"
              >
                <Tab 
                  label={
                    <TabIcon>
                      <TableChartIcon /> Table
                    </TabIcon>
                  }
                />
                <Tab 
                  label={
                    <TabIcon>
                      <MapIcon /> Map
                    </TabIcon>
                  }
                />
                <Tab 
                  label={
                    <TabIcon>
                      <AssessmentIcon /> Analytics
                    </TabIcon>
                  }
                />
                <Tab 
                  label={
                    <TabIcon>
                      <SecurityIcon /> Risk
                    </TabIcon>
                  }
                />
              </Tabs>
              
              <Button 
                startIcon={<FilterListIcon />} 
                variant={showFilters ? "contained" : "outlined"} 
                size="small"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </Box>
          </Grid>

          {/* Filters (collapsible) */}
          {showFilters && (
            <Grid item xs={12}>
              <DashboardCard sx={{ mb: 3 }}>
                <CardContent>
                  <SupplierFilter
                    onFilterChange={handleFilterChange}
                    onSaveFilter={() => {}}
                    onLoadFilter={() => {}}
                    savedFilters={[]}
                  />
                </CardContent>
              </DashboardCard>
            </Grid>
          )}

          {/* Main Content and Sidebar */}
          <Grid item xs={12} md={8}>
            <DashboardCard>
              <CardHeader>
                <Typography variant="subtitle1" fontWeight="medium">
                  {viewMode === 'table' && 'Supplier List'}
                  {viewMode === 'map' && 'Supplier Geography'}
                  {viewMode === 'analytics' && 'Supplier Analytics'}
                  {viewMode === 'risk' && 'Supplier Risk Assessment'}
                </Typography>
              </CardHeader>
              <CardContent>
                {renderContent()}
              </CardContent>
            </DashboardCard>
          </Grid>
          
          {!isMobile && (
            <Grid item xs={12} md={4}>
              <DashboardCard sx={{ height: '100%' }}>
                <CardHeader>
                  <Typography variant="subtitle1" fontWeight="medium">Supplier Details</Typography>
                  {selectedSupplier && (
                    <Typography variant="body2" color="text.secondary">
                      {selectedSupplier.name}
                    </Typography>
                  )}
                </CardHeader>
                <CardContent>
                  {renderSupplierDetails()}
                </CardContent>
              </DashboardCard>
            </Grid>
          )}
        </Grid>
      )}

      {/* Full-width content for other tabs */}
      {activeTab > 0 && (
        <DashboardCard>
          <CardHeader>
            <Typography variant="subtitle1" fontWeight="medium">
              {activeTab === 1 ? 'Supplier Analytics' : 'Risk Management'}
            </Typography>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </DashboardCard>
      )}

      {/* Mobile drawer for supplier details */}
      <Drawer
        anchor="right"
        open={isMobile && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: '85%', maxWidth: 500 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {selectedSupplier ? selectedSupplier.name : 'Supplier Details'}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {renderSupplierDetails()}
        </Box>
      </Drawer>
    </Container>
  );
};

export default SuppliersPage; 