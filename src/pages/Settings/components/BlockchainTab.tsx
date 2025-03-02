import React, { useState } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Slider,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  useTheme,
  SelectChangeEvent
} from '@mui/material';
import { TableCard, StatusChip } from '@/components/common';
import KpiStatsCard from '@/components/common/KpiStatsCard';

// Icons
import TokenIcon from '@mui/icons-material/Token';
import BoltIcon from '@mui/icons-material/Bolt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { blockchainNetworks, defaultFormValues } from '../data';

interface BlockchainTabProps {
  onShowSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const BlockchainTab: React.FC<BlockchainTabProps> = ({ onShowSnackbar }) => {
  // State
  const [blockchainSettings, setBlockchainSettings] = useState({
    networks: blockchainNetworks,
    formValues: {
      automaticVerification: defaultFormValues.automaticVerification,
      shellTokenEnabled: defaultFormValues.shellTokenEnabled,
      minVerifications: defaultFormValues.minVerifications,
      defaultBlockchain: defaultFormValues.defaultBlockchain,
      maxGasPrice: 150
    },
    gasPriority: 2
  });
  
  const theme = useTheme();
  
  // Handle toggle network status
  const handleToggleNetwork = (id: number) => {
    const updatedNetworks = blockchainSettings.networks.map(network => 
      network.id === id ? { 
        ...network, 
        status: network.status === 'Active' ? 'Inactive' : 'Active'
      } : network
    );
    
    setBlockchainSettings({
      ...blockchainSettings,
      networks: updatedNetworks
    });
    
    // Find the network that was toggled
    const network = updatedNetworks.find(n => n.id === id);
    if (network) {
      onShowSnackbar(
        `${network.name} ${network.status === 'Active' ? 'activated' : 'deactivated'}`,
        'success'
      );
    }
  };
  
  // Handle add new network
  const handleAddNetwork = () => {
    onShowSnackbar('Add new blockchain network dialog opened', 'info');
  };
  
  // Handle switch control changes
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setBlockchainSettings({
      ...blockchainSettings,
      formValues: {
        ...blockchainSettings.formValues,
        [name]: checked
      }
    });
  };
  
  // Handle slider changes
  const handleSliderChange = (name: string) => (_event: Event, value: number | number[]) => {
    setBlockchainSettings({
      ...blockchainSettings,
      formValues: {
        ...blockchainSettings.formValues,
        [name]: value as number
      }
    });
  };
  
  // Handle gas priority change
  const handleGasPriorityChange = (_event: Event, value: number | number[]) => {
    setBlockchainSettings({
      ...blockchainSettings,
      gasPriority: value as number
    });
  };
  
  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBlockchainSettings({
      ...blockchainSettings,
      formValues: {
        ...blockchainSettings.formValues,
        [name]: value
      }
    });
  };
  
  // Handle default blockchain change
  const handleDefaultBlockchainChange = (event: SelectChangeEvent) => {
    setBlockchainSettings({
      ...blockchainSettings,
      formValues: {
        ...blockchainSettings.formValues,
        defaultBlockchain: event.target.value
      }
    });
  };
  
  // Handle save blockchain settings
  const handleSaveSettings = () => {
    onShowSnackbar('Blockchain settings saved successfully', 'success');
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Blockchain Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Configure blockchain settings for inventory verification
          </Typography>
          
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Connected Networks
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Configure blockchain networks for verification
              </Typography>
              <List>
                {blockchainSettings.networks.map((network) => (
                  <ListItem key={network.id} disablePadding sx={{ py: 1 }}>
                    <ListItemIcon>
                      <TokenIcon color={network.status === 'Active' ? 'primary' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={network.name} 
                      secondary={network.status} 
                    />
                    <ListItemSecondaryAction>
                      <FormControlLabel 
                        control={
                          <Switch 
                            checked={network.status === 'Active'} 
                            onChange={() => handleToggleNetwork(network.id)} 
                            color="primary" 
                          />
                        } 
                        label="" 
                      />
                      {network.default && (
                        <StatusChip 
                          label="Default" 
                          status="success"
                          size="small"
                          sx={{ ml: 1 }} 
                        />
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button 
                variant="text" 
                color="primary" 
                startIcon={<AddCircleOutlineIcon />} 
                sx={{ mt: 2 }}
                onClick={handleAddNetwork}
              >
                Add New Network
              </Button>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Verification Settings
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Configure blockchain verification requirements
              </Typography>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={blockchainSettings.formValues.automaticVerification} 
                      onChange={handleSwitchChange} 
                      name="automaticVerification" 
                      color="primary" 
                    />
                  } 
                  label="Automatic blockchain verification" 
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={blockchainSettings.formValues.shellTokenEnabled} 
                      onChange={handleSwitchChange} 
                      name="shellTokenEnabled" 
                      color="primary" 
                    />
                  } 
                  label="Enable token-based verification" 
                />
              </FormGroup>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Minimum Verifications Required
                </Typography>
                <Slider 
                  value={blockchainSettings.formValues.minVerifications} 
                  onChange={handleSliderChange('minVerifications')}
                  valueLabelDisplay="auto" 
                  step={1} 
                  marks 
                  min={1} 
                  max={30} 
                />
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="default-blockchain-label">Default Blockchain Network</InputLabel>
                  <Select
                    labelId="default-blockchain-label"
                    id="default-blockchain"
                    value={blockchainSettings.formValues.defaultBlockchain}
                    onChange={handleDefaultBlockchainChange}
                    label="Default Blockchain Network"
                  >
                    {blockchainSettings.networks.map(network => (
                      <MenuItem key={network.id} value={network.name}>
                        {network.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Gas & Network Fees
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Configure how transactions are processed on the blockchain
          </Typography>
          
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Transaction Priority
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Configure transaction gas fees and priority
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Gas Fee Priority</Typography>
                    <StatusChip 
                      label={
                        blockchainSettings.gasPriority === 1 ? 'Low' : 
                        blockchainSettings.gasPriority === 2 ? 'Standard' : 'High'
                      } 
                      status={
                        blockchainSettings.gasPriority === 1 ? 'info' : 
                        blockchainSettings.gasPriority === 2 ? 'success' : 'warning'
                      }
                      size="small" 
                    />
                  </Box>
                  <Slider 
                    value={blockchainSettings.gasPriority} 
                    onChange={handleGasPriorityChange}
                    step={1} 
                    marks={[
                      { value: 1, label: 'Low' },
                      { value: 2, label: 'Standard' },
                      { value: 3, label: 'High' },
                    ]}
                    min={1} 
                    max={3} 
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Automatically adjust gas based on network conditions" 
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Maximum Gas Price (Gwei)
                  </Typography>
                  <TextField 
                    fullWidth 
                    type="number" 
                    name="maxGasPrice"
                    value={blockchainSettings.formValues.maxGasPrice}
                    onChange={handleInputChange}
                    InputProps={{ 
                      endAdornment: <InputAdornment position="end">Gwei</InputAdornment>, 
                    }} 
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Smart Contract Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Optimize contract execution settings
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BoltIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2">Contract Performance</Typography>
                </Box>
                <FormGroup>
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Batch transactions when possible" 
                  />
                  <FormControlLabel 
                    control={<Switch defaultChecked color="primary" />} 
                    label="Use optimized contract calls" 
                  />
                </FormGroup>
                
                <Box sx={{ mt: 3 }}>
                  <TableCard
                    title="Active Smart Contracts"
                    data={[
                      { id: 1, contract: 'HandReceiptRegistry', network: 'Ethereum Mainnet', address: '0x7a3B...c5E8', status: 'Active' },
                      { id: 2, contract: 'VerifyToken', network: 'Polygon', address: '0x92F1...d73A', status: 'Active' },
                      { id: 3, contract: 'InventoryOracle', network: 'Ethereum Mainnet', address: '0x41C0...f29B', status: 'Active' }
                    ]}
                    columns={[
                      { id: 'contract', label: 'Contract Name', field: 'contract', minWidth: 150 },
                      { id: 'network', label: 'Network', field: 'network', minWidth: 120 },
                      { id: 'address', label: 'Address', field: 'address', minWidth: 120 },
                      { 
                        id: 'status', 
                        label: 'Status', 
                        minWidth: 100,
                        align: 'right',
                        renderCell: (row) => (
                          <StatusChip label={row.status} status="success" size="small" />
                        )
                      }
                    ]}
                    elevation={0}
                    cardVariant="outlined"
                  />
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
              Save Blockchain Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlockchainTab;
