import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Paper, styled, useTheme } from '@mui/material';
import {
  // New TechComponents Dashboard components
  KPICard,
  DashboardHeader,
  WarehouseInventoryChart,
  PaymentMethodsChart,
  ActiveShipmentsTable,
  SupplierDistributionChart,
  CriticalStockTable,
  ActionItemsPanel,
  BlockchainRecordsTable,
  QuickActionsPanel
} from './components';
import { techComponentsData } from './mockData';
import { useTitle } from '../../hooks/useTitle';

// Styled components
const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const Dashboard: React.FC = () => {
  useTitle('Dashboard');
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState(techComponentsData);

  // In a real app, we would fetch the dashboard data from an API
  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.getDashboardData();
        // setDashboardData(response.data);
        
        // For now, we'll just use the mock data
        setDashboardData(techComponentsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  // Event handlers
  const handleViewDetails = (type: string) => {
    console.log(`View details for ${type} clicked`);
  };

  const handleViewAll = (type: string) => {
    console.log(`View all ${type} clicked`);
  };

  const handleExportDashboard = () => {
    console.log('Export dashboard clicked');
  };

  const handleNotificationsClick = () => {
    console.log('Notifications clicked');
  };

  const handleGeneratePurchaseOrders = () => {
    console.log('Generate purchase orders clicked');
  };

  const handleOrderItem = (sku: string) => {
    console.log(`Order item ${sku} clicked`);
  };

  const handleTransferItem = (sku: string) => {
    console.log(`Transfer item ${sku} clicked`);
  };

  const handleCompleteAction = (id: string) => {
    console.log(`Complete action ${id} clicked`);
  };

  const handleScanQR = () => {
    console.log('Scan QR code clicked');
  };

  const handleCreatePayment = () => {
    console.log('Create payment clicked');
  };

  const handleCreateContract = () => {
    console.log('Create contract clicked');
  };

  return (
    <DashboardContainer maxWidth="xl">
      {/* Dashboard Header */}
      <DashboardHeader
        userName={dashboardData.user.name}
        notificationCount={3}
        onNotificationsClick={handleNotificationsClick}
        onExportClick={handleExportDashboard}
      />

      {/* KPI Cards Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard data={dashboardData.kpiCards.inventoryValue} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard data={dashboardData.kpiCards.activeTransfers} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard data={dashboardData.kpiCards.lowStockAlerts} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard data={dashboardData.kpiCards.shellTokenSavings} />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <WarehouseInventoryChart 
            data={dashboardData.warehouseInventory}
            onDetailsClick={() => handleViewDetails('warehouseInventory')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentMethodsChart 
            data={dashboardData.paymentMethods}
            onDetailsClick={() => handleViewDetails('paymentMethods')}
          />
        </Grid>
      </Grid>

      {/* Shipments and Suppliers Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <ActiveShipmentsTable 
            shipments={dashboardData.activeShipments}
            onViewAll={() => handleViewAll('shipments')}
            onViewDetails={(id) => handleViewDetails(`shipment-${id}`)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SupplierDistributionChart 
            data={dashboardData.supplierDistribution}
            onViewDetails={() => handleViewDetails('supplierDistribution')}
          />
        </Grid>
      </Grid>

      {/* Critical Items and Actions Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <CriticalStockTable 
            items={dashboardData.criticalStockItems}
            onGeneratePurchaseOrders={handleGeneratePurchaseOrders}
            onOrder={handleOrderItem}
            onTransfer={handleTransferItem}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ActionItemsPanel 
            items={dashboardData.actionItems}
            onViewAll={() => handleViewAll('actionItems')}
            onComplete={handleCompleteAction}
          />
        </Grid>
      </Grid>

      {/* Blockchain Records Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <BlockchainRecordsTable records={dashboardData.blockchainRecords} />
        </Grid>
      </Grid>

      {/* Quick Actions Row */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <QuickActionsPanel 
            onScanQR={handleScanQR}
            onCreatePayment={handleCreatePayment}
            onCreateContract={handleCreateContract}
          />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard; 