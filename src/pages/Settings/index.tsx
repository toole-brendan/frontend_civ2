import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  Snackbar, 
  Alert
} from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { useTitle } from '@/hooks/useTitle';

// Icons
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsIcon from '@mui/icons-material/Settings';

// Tab Components
import {
  AccountTab,
  SecurityTab,
  NotificationsTab,
  WarehousesTab,
  IntegrationsTab,
  BlockchainTab,
  SystemTab
} from './components';

const Settings: React.FC = () => {
  useTitle('Settings');
  
  // State for tab selection
  const [activeTab, setActiveTab] = useState(0);
  
  // State for snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });
  
  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  // Handle showing snackbar
  const handleShowSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };
  
  // Handle snackbar close
  const handleCloseSnackbar = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({
      ...snackbar,
      open: false
    });
  };
  
  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      pb: 8
    }}>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <PageHeader 
          title="Settings" 
          subtitle="Configure application preferences and user settings"
        />
        
        <Paper sx={{ mb: 4, p: 0, overflow: 'hidden' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant="scrollable" 
              scrollButtons="auto" 
              textColor="primary" 
              indicatorColor="primary"
              sx={{ px: 2 }}
            >
              <Tab icon={<PersonIcon />} label="Account" iconPosition="start" />
              <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
              <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
              <Tab icon={<WarehouseIcon />} label="Warehouses" iconPosition="start" />
              <Tab icon={<IntegrationInstructionsIcon />} label="Integrations" iconPosition="start" />
              <Tab icon={<VerifiedIcon />} label="Blockchain" iconPosition="start" />
              <Tab icon={<SettingsIcon />} label="System" iconPosition="start" />
            </Tabs>
          </Box>
          
          {/* Tab Panels */}
          <Box>
            {activeTab === 0 && <AccountTab onShowSnackbar={handleShowSnackbar} />}
            {activeTab === 1 && <SecurityTab onShowSnackbar={handleShowSnackbar} />}
            {activeTab === 2 && <NotificationsTab onShowSnackbar={handleShowSnackbar} />}
            {activeTab === 3 && <WarehousesTab onShowSnackbar={handleShowSnackbar} />}
            {activeTab === 4 && <IntegrationsTab onShowSnackbar={handleShowSnackbar} />}
            {activeTab === 5 && <BlockchainTab onShowSnackbar={handleShowSnackbar} />}
            {activeTab === 6 && <SystemTab onShowSnackbar={handleShowSnackbar} />}
          </Box>
        </Paper>
        
        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity} 
            sx={{ width: '100%' }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Settings;
