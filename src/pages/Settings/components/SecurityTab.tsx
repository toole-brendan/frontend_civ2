import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Chip,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  alpha,
  useTheme
} from '@mui/material';

// Icons
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DevicesIcon from '@mui/icons-material/Devices';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { securitySettings, defaultFormValues } from '../data';

interface SecurityTabProps {
  onShowSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ onShowSnackbar }) => {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    currentPassword: defaultFormValues.currentPassword,
    newPassword: '',
    confirmPassword: '',
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(securitySettings.twoFactorEnabled);
  
  const theme = useTheme();
  
  // Handle password visibility toggle
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Handle form value changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  // Handle two-factor authentication toggle
  const handleTwoFactorToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTwoFactorEnabled(event.target.checked);
    onShowSnackbar(
      event.target.checked 
        ? 'Two-factor authentication enabled' 
        : 'Two-factor authentication disabled',
      'success'
    );
  };
  
  // Handle update password
  const handleUpdatePassword = () => {
    // Here you would normally validate the password
    if (formValues.newPassword !== formValues.confirmPassword) {
      onShowSnackbar('Passwords do not match', 'error');
      return;
    }
    
    if (formValues.newPassword.length < 8) {
      onShowSnackbar('Password must be at least 8 characters', 'error');
      return;
    }
    
    // Success case
    onShowSnackbar('Password updated successfully', 'success');
    
    // Reset form
    setFormValues({
      ...formValues,
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  // Handle generate new key
  const handleGenerateNewKey = () => {
    onShowSnackbar('New authentication key generated', 'success');
  };
  
  // Handle copy key
  const handleCopyKey = () => {
    // In a real app, you would use clipboard API
    onShowSnackbar('Key copied to clipboard', 'success');
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Manage your account security and authentication options
          </Typography>
          
          <Card sx={{ mb: 3, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1">
                  Account Protection
                </Typography>
              </Box>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Switch
                      checked={twoFactorEnabled}
                      onChange={handleTwoFactorToggle}
                      color="primary"
                    />
                  } 
                  label="Two-Factor Authentication"
                />
                <Typography variant="caption" color="text.secondary" sx={{ ml: 4, mt: -0.5 }}>
                  Increases security by requiring an additional verification code
                </Typography>
              </FormGroup>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Last password change: <strong>{securitySettings.lastPasswordChange}</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Change Password
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.currentPassword}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.newPassword}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                  variant="outlined"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleUpdatePassword}
                >
                  Update Password
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Blockchain Verification Keys
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2">
                    Authentication Key
                  </Typography>
                  <Chip icon={<VpnKeyIcon />} label="Active" color="success" size="small" />
                </Box>
                <Box sx={{ 
                  p: 1.5, 
                  bgcolor: 'background.default', 
                  borderRadius: 1, 
                  fontFamily: 'monospace', 
                  fontSize: '0.85rem', 
                  position: 'relative', 
                  mb: 2 
                }}>
                  0x7e5F4552091A69125d5DfCb7b8C2659029395Bdf
                  <IconButton 
                    size="small" 
                    sx={{ position: 'absolute', right: 4, top: 4 }} 
                    color="primary"
                    onClick={handleCopyKey}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  startIcon={<AutorenewIcon />}
                  onClick={handleGenerateNewKey}
                >
                  Generate New Key
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Typography variant="h6" gutterBottom>
            Recent Login Activity
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Review recent sign-ins to your account
          </Typography>
          
          <Card sx={{ p: 0, mb: 4 }}>
            <List sx={{ p: 0 }}>
              {securitySettings.loginHistory.map((login, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ py: 2 }}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: index === 0 ? 'primary.dark' : 'background.default' }}>
                        {index === 0 ? <DoneAllIcon /> : <DevicesIcon />}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={login.device} 
                      secondary={`IP: ${login.ip}`} 
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="caption" color="text.secondary">
                        {login.timestamp}
                      </Typography>
                      {index === 0 && (
                        <Chip 
                          label="Current Session" 
                          size="small" 
                          color="primary" 
                          sx={{ ml: 1 }} 
                        />
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < securitySettings.loginHistory.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Card>
          
          <Typography variant="h6" gutterBottom>
            API Access
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Manage API keys for external integrations
          </Typography>
          
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="subtitle1">
                  API Keys
                </Typography>
                <Button 
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<AutorenewIcon />}
                >
                  Create New API Key
                </Button>
              </Box>
              
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Key Name</TableCell>
                      <TableCell>Created</TableCell>
                      <TableCell>Last Used</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Production API Key</TableCell>
                      <TableCell>Jan 15, 2025</TableCell>
                      <TableCell>Today</TableCell>
                      <TableCell>
                        <Chip label="Active" size="small" color="success" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>ERP Integration</TableCell>
                      <TableCell>Feb 3, 2025</TableCell>
                      <TableCell>Today</TableCell>
                      <TableCell>
                        <Chip label="Active" size="small" color="success" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Development Key</TableCell>
                      <TableCell>Feb 10, 2025</TableCell>
                      <TableCell>Feb 22, 2025</TableCell>
                      <TableCell>
                        <Chip label="Inactive" size="small" color="warning" />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SecurityTab;
