import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Paper, styled, useTheme } from '@mui/material';
import {
  KeyMetricsCards,
  NotificationsPanel,
  ActivityTimeline,
  CriticalAlertsCard,
  PerformanceMetricsGrid,
  QuickTransferCard,
  SupplyChainVisualization,
  PendingApprovalsTable
} from './components';
import { mockDashboardData } from './mockData';
import { useTitle } from '../../hooks/useTitle';

// Notification types for the NotificationsPanel
type NotificationType = 'high' | 'medium' | 'low';

// Styled components
const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  overflow: 'auto',
  flexDirection: 'column',
  height: '100%',
}));

const Dashboard: React.FC = () => {
  useTitle('Dashboard');
  const theme = useTheme();
  const [dashboardData, setDashboardData] = useState(mockDashboardData);

  // In a real app, we would fetch the dashboard data from an API
  useEffect(() => {
    // Simulate API call
    const fetchDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await api.getDashboardData();
        // setDashboardData(response.data);
        
        // For now, we'll just use the mock data
        setDashboardData(mockDashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleResolveAlert = (id: string) => {
    setDashboardData(prevData => ({
      ...prevData,
      criticalAlerts: prevData.criticalAlerts.filter(alert => alert.id !== id)
    }));
  };

  const handleViewAllAlerts = () => {
    // Navigate to alerts page or open a modal with all alerts
    console.log('View all alerts clicked');
  };

  const handleViewAllActivities = () => {
    // Navigate to activities page or open a modal with all activities
    console.log('View all activities clicked');
  };

  const handleChartDetailsClick = (chartType: string) => {
    // Navigate to detailed view of the chart or open a modal
    console.log(`View details for ${chartType} clicked`);
  };

  const handleApproveItem = (id: string) => {
    console.log(`Approved item: ${id}`);
    setDashboardData(prevData => ({
      ...prevData,
      pendingApprovals: prevData.pendingApprovals.filter(item => item.id !== id)
    }));
  };

  const handleRejectItem = (id: string) => {
    console.log(`Rejected item: ${id}`);
    setDashboardData(prevData => ({
      ...prevData,
      pendingApprovals: prevData.pendingApprovals.filter(item => item.id !== id)
    }));
  };

  const handleViewAllApprovals = () => {
    console.log('View all pending approvals');
  };

  const handleNodeClick = (node: any) => {
    console.log(`Clicked on node: ${node.name}`);
  };

  const handleTransfer = (itemId: string, quantity: number, recipientId: string) => {
    console.log(`Transferred ${quantity} of item ${itemId} to recipient ${recipientId}`);
  };

  const handleScanQR = () => {
    console.log('Scan QR code clicked');
  };

  // Convert notification types to match the NotificationsPanel component
  const convertedNotifications: Array<{
    id: string;
    type: NotificationType;
    message: string;
    timestamp: string;
  }> = dashboardData.notifications.map(notification => ({
    id: notification.id,
    type: (notification.type === 'error' 
      ? 'high' 
      : notification.type === 'warning' 
        ? 'medium' 
        : 'low') as NotificationType,
    message: notification.message,
    timestamp: notification.timestamp
  }));

  return (
    <DashboardContainer maxWidth="xl">
      <Grid container spacing={3}>
        {/* Key Metrics Row */}
        <Grid item xs={12}>
          <KeyMetricsCards
            totalItems={dashboardData.propertyStats.totalItems}
            serviceableItems={dashboardData.propertyStats.serviceableItems}
            pendingReceipts={dashboardData.propertyStats.pendingReceipts}
            maintenanceNeeded={dashboardData.propertyStats.maintenanceNeeded}
          />
        </Grid>

        {/* Main Content Row */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Performance Metrics */}
            <Grid item xs={12}>
              <PerformanceMetricsGrid
                transitTimeData={dashboardData.transitTimeData}
                inventoryLevelData={dashboardData.inventoryLevelData}
                paymentResolutionData={dashboardData.paymentResolutionData}
                transferVolumeData={dashboardData.transferVolumeData}
                onDetailsClick={handleChartDetailsClick}
              />
            </Grid>

            {/* Supply Chain Visualization */}
            <Grid item xs={12}>
              <SupplyChainVisualization
                suppliers={dashboardData.supplyChain.suppliers}
                warehouses={dashboardData.supplyChain.warehouses}
                customers={dashboardData.supplyChain.customers}
                connections={dashboardData.supplyChain.connections}
                onNodeClick={handleNodeClick}
              />
            </Grid>

            {/* Pending Approvals */}
            <Grid item xs={12}>
              <PendingApprovalsTable
                items={dashboardData.pendingApprovals}
                onApprove={handleApproveItem}
                onReject={handleRejectItem}
                onViewAll={handleViewAllApprovals}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            {/* Critical Alerts */}
            <Grid item xs={12}>
              <CriticalAlertsCard
                alerts={dashboardData.criticalAlerts}
                onResolve={handleResolveAlert}
                onViewAll={handleViewAllAlerts}
              />
            </Grid>

            {/* Quick Transfer */}
            <Grid item xs={12}>
              <QuickTransferCard
                items={dashboardData.quickTransfer.items}
                recipients={dashboardData.quickTransfer.recipients}
                recentTransfers={dashboardData.quickTransfer.recentTransfers}
                onTransfer={handleTransfer}
                onScanQR={handleScanQR}
              />
            </Grid>

            {/* Activity Timeline */}
            <Grid item xs={12}>
              <ActivityTimeline
                activities={dashboardData.recentActivities}
                onViewAll={handleViewAllActivities}
              />
            </Grid>

            {/* Notifications */}
            <Grid item xs={12}>
              <NotificationsPanel notifications={convertedNotifications} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard; 