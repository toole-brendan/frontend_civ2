import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  Divider,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  SelectChangeEvent
} from '@mui/material';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import SettingsIcon from '@mui/icons-material/Settings';
import LinkIcon from '@mui/icons-material/Link';
import StorageIcon from '@mui/icons-material/Storage';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import { connectedSystems } from '../data';

interface IntegrationsTabProps {
  onShowSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const IntegrationsTab: React.FC<IntegrationsTabProps> = ({ onShowSnackbar }) => {
  // State
  const [apiSettings, setApiSettings] = React.useState({
    dataFormat: 'json',
    webhookTriggers: ['inventory', 'transfer'],
  });
  
  const theme = useTheme();
  
  // Handle connect new system
  const handleConnectSystem = () => {
    onShowSnackbar('New integration initialized', 'info');
  };
  
  // Handle sync now
  const handleSyncNow = (system: typeof connectedSystems[0]) => {
    onShowSnackbar(`Syncing ${system.name}...`, 'info');
  };
  
  // Handle configure
  const handleConfigureSystem = (system: typeof connectedSystems[0]) => {
    onShowSnackbar(`Configuring ${system.name} settings`, 'info');
  };
  
  // Handle connection toggle
  const handleToggleConnection = (system: typeof connectedSystems[0]) => {
    const action = system.status === 'Connected' ? 'Disconnected from' : 'Reconnected to';
    onShowSnackbar(`${action} ${system.name}`, system.status === 'Connected' ? 'warning' : 'success');
  };
  
  // Handle select change
  const handleSelectChange = (event: SelectChangeEvent) => {
    setApiSettings({
      ...apiSettings,
      dataFormat: event.target.value,
    });
  };
  
  // Handle multiple select change
  const handleMultiSelectChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setApiSettings({
      ...apiSettings,
      webhookTriggers: typeof value === 'string' ? value.split(',') : value,
    });
  };
  
  // Handle save API settings
  const handleSaveApiSettings = () => {
    onShowSnackbar('API settings saved successfully', 'success');
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            System Integrations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage connections with external systems and services
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleConnectSystem}
        >
          Connect New System
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {connectedSystems.map((system) => (
          <Grid item xs={12} md={6} key={system.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: system.status === 'Error' ? 'error.dark' : 'primary.dark', mr: 2 }}>
                      {system.type === 'ERP' && <StorageIcon />}
                      {system.type === 'WMS' && <InventoryIcon />}
                      {system.type === 'CRM' && <GroupIcon />}
                      {system.type === 'Shipping' && <LocalShippingIcon />}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {system.name}
                      </Typography>
                      <Chip 
                        label={system.type} 
                        size="small" 
                        color="secondary" 
                        sx={{ mt: 0.5 }} 
                      />
                    </Box>
                  </Box>
                  <Chip 
                    label={system.status} 
                    color={system.status === 'Connected' ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Synchronized
                  </Typography>
                  <Typography variant="body2">
                    {system.lastSync}
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<CloudSyncIcon />} 
                    color="primary" 
                    size="small"
                    onClick={() => handleSyncNow(system)}
                  >
                    Sync Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<SettingsIcon />} 
                    color="primary" 
                    size="small"
                    onClick={() => handleConfigureSystem(system)}
                  >
                    Configure
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<LinkIcon />} 
                    color={system.status === 'Connected' ? 'error' : 'success'} 
                    size="small"
                    onClick={() => handleToggleConnection(system)}
                  >
                    {system.status === 'Connected' ? 'Disconnect' : 'Reconnect'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Configuration
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Enable API access" 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Allow external applications to query inventory" 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Default Data Format</InputLabel>
                    <Select
                      value={apiSettings.dataFormat}
                      label="Default Data Format"
                      onChange={handleSelectChange}
                    >
                      <MenuItem value="json">JSON</MenuItem>
                      <MenuItem value="xml">XML</MenuItem>
                      <MenuItem value="csv">CSV</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Webhook Triggers</InputLabel>
                    <Select
                      multiple
                      value={apiSettings.webhookTriggers}
                      label="Webhook Triggers"
                      onChange={handleMultiSelectChange}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      <MenuItem value="inventory">Inventory Changes</MenuItem>
                      <MenuItem value="transfer">Transfers</MenuItem>
                      <MenuItem value="verification">Verifications</MenuItem>
                      <MenuItem value="blockchain">Blockchain Events</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleSaveApiSettings}
                >
                  Save API Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IntegrationsTab;
