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
  Chip,
  useTheme,
  SelectChangeEvent
} from '@mui/material';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { warehouseLocations } from '../data';

interface WarehousesTabProps {
  onShowSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const WarehousesTab: React.FC<WarehousesTabProps> = ({ onShowSnackbar }) => {
  // State
  const [defaultSource, setDefaultSource] = React.useState('1');
  
  const theme = useTheme();
  
  // Handle adding new warehouse
  const handleAddWarehouse = () => {
    onShowSnackbar('New warehouse location added', 'success');
  };
  
  // Handle edit warehouse
  const handleEditWarehouse = (id: number) => {
    onShowSnackbar(`Editing warehouse location ${id}`, 'info');
  };
  
  // Handle deactivate warehouse
  const handleDeactivateWarehouse = (id: number, name: string) => {
    onShowSnackbar(`Warehouse ${name} deactivated`, 'warning');
  };
  
  // Handle change in default source location
  const handleDefaultSourceChange = (event: SelectChangeEvent) => {
    setDefaultSource(event.target.value);
    onShowSnackbar('Default transfer source location updated', 'success');
  };
  
  // Handle save transfer settings
  const handleSaveTransferSettings = () => {
    onShowSnackbar('Transfer settings saved successfully', 'success');
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Warehouse Locations
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your warehouse and facility locations
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleAddWarehouse}
        >
          Add New Location
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {warehouseLocations.map((warehouse) => (
          <Grid item xs={12} md={4} key={warehouse.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {warehouse.name}
                  </Typography>
                  <Chip 
                    label={warehouse.isActive ? 'Active' : 'Inactive'} 
                    color={warehouse.isActive ? 'success' : 'default'} 
                    size="small" 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {warehouse.address}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Location Settings
                </Typography>
                <FormGroup>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Enable QR code scanning" 
                  />
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Allow inventory transfers" 
                  />
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Enable blockchain verification" 
                  />
                </FormGroup>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    startIcon={<EditIcon />} 
                    size="small"
                    onClick={() => handleEditWarehouse(warehouse.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<DeleteOutlineIcon />} 
                    size="small"
                    onClick={() => handleDeactivateWarehouse(warehouse.id, warehouse.name)}
                  >
                    Deactivate
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
                Default Transfer Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="default-source-label">Default Source Location</InputLabel>
                    <Select
                      labelId="default-source-label"
                      id="default-source"
                      value={defaultSource}
                      label="Default Source Location"
                      onChange={handleDefaultSourceChange}
                    >
                      {warehouseLocations.map(location => (
                        <MenuItem key={location.id} value={location.id.toString()}>
                          {location.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Require approval for transfers between locations" 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Generate blockchain record for transfers" 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Enable automatic QR code generation" 
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleSaveTransferSettings}
                >
                  Save Transfer Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WarehousesTab;
