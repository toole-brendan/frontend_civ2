import React, { useState } from 'react';
import {
  Box, 
  Grid, 
  Typography, 
  Divider, 
  Avatar, 
  Button, 
  TextField, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Slider,
  useTheme,
  SelectChangeEvent,
  Card,
  CardContent
} from '@mui/material';
import StatusChip from '@/components/common/StatusChip';

// Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MonitorIcon from '@mui/icons-material/Monitor';

import { defaultFormValues } from '../data';

interface AccountTabProps {
  onShowSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const AccountTab: React.FC<AccountTabProps> = ({ onShowSnackbar }) => {
  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // State for form values
  const [formValues, setFormValues] = useState(defaultFormValues);
  
  const theme = useTheme();
  
  // Handle different form value changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle select changes
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name as string]: value
    });
  };
  
  // Handle slider changes
  const handleSliderChange = (_event: Event, value: number | number[]) => {
    setFormValues({
      ...formValues,
      autoLogout: value as number
    });
  };
  
  // Handle toggle profile edit mode
  const handleToggleEditProfile = () => {
    if (isEditingProfile) {
      // If saving, show success message
      onShowSnackbar('Profile updated successfully', 'success');
    }
    setIsEditingProfile(!isEditingProfile);
  };
  
  // Handle saving settings
  const handleSaveSettings = () => {
    onShowSnackbar('Settings saved successfully', 'success');
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Information
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Manage your account details and preferences
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src="/api/placeholder/150/150"
                  alt="Michael Chen"
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h6">
                  {formValues.fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formValues.position}
                </Typography>
                <Button
                  startIcon={isEditingProfile ? <SaveIcon /> : <EditIcon />}
                  onClick={handleToggleEditProfile}
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  {isEditingProfile ? 'Save Profile' : 'Edit Profile'}
                </Button>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Account Status
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Account Type
                  </Typography>
                  <StatusChip label="Administrator" status="primary" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Verification Authority
                  </Typography>
                  <StatusChip label="Full Access" status="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Last Login
                  </Typography>
                  <Typography variant="body2">
                    Today, 8:42 AM
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Profile Details Form */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Details
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Update your personal information
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formValues.position}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    disabled={!isEditingProfile}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroidIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="language-select-label">Language</InputLabel>
                    <Select
                      labelId="language-select-label"
                      id="language-select"
                      name="language"
                      value={formValues.language}
                      onChange={handleSelectChange}
                      disabled={!isEditingProfile}
                      label="Language"
                      startAdornment={
                        <InputAdornment position="start">
                          <LanguageOutlinedIcon fontSize="small" />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Spanish">Spanish</MenuItem>
                      <MenuItem value="Chinese">Chinese (Simplified)</MenuItem>
                      <MenuItem value="Japanese">Japanese</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="timezone-select-label">Time Zone</InputLabel>
                    <Select
                      labelId="timezone-select-label"
                      id="timezone-select"
                      name="timeZone"
                      value={formValues.timeZone}
                      onChange={handleSelectChange}
                      disabled={!isEditingProfile}
                      label="Time Zone"
                    >
                      <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                      <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                      <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                      <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                      <MenuItem value="America/Mexico_City">Mexico City (CT)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Interface Preferences
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Customize your application experience
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Theme
                  </Typography>
                  <FormGroup row>
                    <Button
                      variant={formValues.theme === 'dark' ? 'contained' : 'outlined'}
                      onClick={() => setFormValues({...formValues, theme: 'dark'})}
                      startIcon={<DarkModeIcon />}
                      sx={{ mr: 1 }}
                    >
                      Dark
                    </Button>
                    <Button
                      variant={formValues.theme === 'light' ? 'contained' : 'outlined'}
                      onClick={() => setFormValues({...formValues, theme: 'light'})}
                      startIcon={<LightModeIcon />}
                      sx={{ mr: 1 }}
                    >
                      Light
                    </Button>
                    <Button
                      variant={formValues.theme === 'system' ? 'contained' : 'outlined'}
                      onClick={() => setFormValues({...formValues, theme: 'system'})}
                      startIcon={<MonitorIcon />}
                    >
                      System
                    </Button>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Auto Logout Time (Minutes)
                  </Typography>
                  <Box sx={{ px: 2 }}>
                    <Slider
                      value={formValues.autoLogout}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={5}
                      max={60}
                    />
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveSettings}
                >
                  Save Changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountTab;
