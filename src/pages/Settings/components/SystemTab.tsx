import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Slider,
  Chip,
  Alert,
  useTheme,
  SelectChangeEvent
} from '@mui/material';

// Icons
import BackupIcon from '@mui/icons-material/Backup';
import TimelineIcon from '@mui/icons-material/Timeline';
import StorageIcon from '@mui/icons-material/Storage';

interface SystemTabProps {
  onShowSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const SystemTab: React.FC<SystemTabProps> = ({ onShowSnackbar }) => {
  // State
  const [systemSettings, setSystemSettings] = useState({
    backupFrequency: 'daily',
    dataRetention: '1-year',
    pageSize: 25,
    exportFormat: 'excel',
  });
  
  const theme = useTheme();
  
  // Handle select changes
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setSystemSettings({
      ...systemSettings,
      [name as string]: value
    });
  };
  
  // Handle slider changes
  const handlePageSizeChange = (_event: Event, value: number | number[]) => {
    setSystemSettings({
      ...systemSettings,
      pageSize: value as number
    });
  };
  
  // Handle save system settings
  const handleSaveSettings = () => {
    onShowSnackbar('System settings saved successfully', 'success');
  };
  
  // Handle view logs
  const handleViewLogs = () => {
    onShowSnackbar('System logs opened in new window', 'info');
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            System Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Configure global system behavior and data management
          </Typography>
          
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Data Management
              </Typography>
              <List>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <BackupIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Database Backups" 
                    secondary="Schedule automatic backups of your data" 
                  />
                  <ListItemSecondaryAction>
                    <FormControlLabel 
                      control={<Switch defaultChecked color="primary" />} 
                      label="" 
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <TimelineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Historical Data Retention" 
                    secondary="Keep historical records for auditing" 
                  />
                  <ListItemSecondaryAction>
                    <FormControlLabel 
                      control={<Switch defaultChecked color="primary" />} 
                      label="" 
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem disablePadding sx={{ py: 1 }}>
                  <ListItemIcon>
                    <StorageIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Cache Management" 
                    secondary="Optimize data retrieval performance" 
                  />
                  <ListItemSecondaryAction>
                    <FormControlLabel 
                      control={<Switch defaultChecked color="primary" />} 
                      label="" 
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Database Backup Frequency
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="backupFrequency"
                    value={systemSettings.backupFrequency}
                    onChange={handleSelectChange}
                    displayEmpty
                  >
                    <MenuItem value="hourly">Every hour</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Data Retention Period
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="dataRetention"
                    value={systemSettings.dataRetention}
                    onChange={handleSelectChange}
                    displayEmpty
                  >
                    <MenuItem value="30-days">30 days</MenuItem>
                    <MenuItem value="90-days">90 days</MenuItem>
                    <MenuItem value="6-months">6 months</MenuItem>
                    <MenuItem value="1-year">1 year</MenuItem>
                    <MenuItem value="forever">Forever</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Performance Settings
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Page Size (Items Per Page)
                </Typography>
                <Slider 
                  value={systemSettings.pageSize} 
                  onChange={handlePageSizeChange}
                  step={5} 
                  marks={[
                    { value: 10, label: '10' },
                    { value: 25, label: '25' },
                    { value: 50, label: '50' },
                    { value: 100, label: '100' },
                  ]}
                  min={10} 
                  max={100} 
                />
              </Box>
              
              <FormGroup sx={{ mt: 3 }}>
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Enable lazy loading for large data sets" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Prefetch data for faster navigation" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Compress images for faster loading" 
                />
              </FormGroup>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Import & Export
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Manage data import and export settings
          </Typography>
          
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Data Export
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Available Export Formats
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  <Chip label="CSV" color="primary" />
                  <Chip label="Excel (.xlsx)" color="primary" />
                  <Chip label="JSON" color="primary" />
                  <Chip label="PDF" color="primary" />
                </Box>
                
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <Select
                    name="exportFormat"
                    value={systemSettings.exportFormat}
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="csv">CSV</MenuItem>
                    <MenuItem value="excel">Excel (.xlsx)</MenuItem>
                    <MenuItem value="json">JSON</MenuItem>
                    <MenuItem value="pdf">PDF</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Include blockchain verification data in exports" 
                />
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Data Import
              </Typography>
              <Box sx={{ mt: 2 }}>
                <FormGroup>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Validate data before importing" 
                  />
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Allow duplicate checking" 
                  />
                  <FormControlLabel 
                    control={<Switch defaultChecked color="warning" />} 
                    label="Create blockchain records for imported items" 
                  />
                </FormGroup>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                System Status
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Alert severity="success" sx={{ mb: 2 }}>
                  System is running normally
                </Alert>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Application Version
                  </Typography>
                  <Typography variant="body2">
                    2.4.1
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Update
                  </Typography>
                  <Typography variant="body2">
                    February 15, 2025
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Database Status
                  </Typography>
                  <Chip size="small" color="success" label="Connected" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    API Status
                  </Typography>
                  <Chip size="small" color="success" label="Operational" />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Blockchain Connection
                  </Typography>
                  <Chip size="small" color="success" label="Connected" />
                </Box>
                
                <Box sx={{ mt: 3 }}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<TimelineIcon />}
                    onClick={handleViewLogs}
                  >
                    View System Logs
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSaveSettings}
            >
              Save System Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemTab;
