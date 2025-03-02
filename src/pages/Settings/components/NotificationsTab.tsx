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
  IconButton,
  useTheme,
  SelectChangeEvent
} from '@mui/material';

// Icons
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SmsIcon from '@mui/icons-material/Sms';
import ForumIcon from '@mui/icons-material/Forum';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { notificationChannels, defaultFormValues } from '../data';

interface NotificationsTabProps {
  onShowSnackbar: (message: string, severity: 'success' | 'error' | 'info' | 'warning') => void;
}

const NotificationsTab: React.FC<NotificationsTabProps> = ({ onShowSnackbar }) => {
  // State
  const [notificationSettings, setNotificationSettings] = useState({
    channels: notificationChannels,
    formValues: {
      criticalAlerts: defaultFormValues.criticalAlerts,
      lowStockAlerts: defaultFormValues.lowStockAlerts,
      paymentAlerts: defaultFormValues.paymentAlerts,
      blockchainNotifications: defaultFormValues.blockchainNotifications,
      soundAlert: 'Ping'
    }
  });
  
  const theme = useTheme();
  
  // Handle toggle notification channel
  const handleToggleChannel = (id: number) => {
    const updatedChannels = notificationSettings.channels.map(channel => 
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    );
    
    setNotificationSettings({
      ...notificationSettings,
      channels: updatedChannels
    });
    
    // Find the channel that was toggled
    const channel = updatedChannels.find(c => c.id === id);
    if (channel) {
      onShowSnackbar(
        `${channel.type} notifications ${channel.enabled ? 'enabled' : 'disabled'}`,
        'success'
      );
    }
  };
  
  // Handle add notification channel
  const handleAddChannel = () => {
    onShowSnackbar('New notification channel added', 'info');
  };
  
  // Handle switch control changes
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setNotificationSettings({
      ...notificationSettings,
      formValues: {
        ...notificationSettings.formValues,
        [name]: checked
      }
    });
  };
  
  // Handle sound select change
  const handleSoundChange = (event: SelectChangeEvent) => {
    setNotificationSettings({
      ...notificationSettings,
      formValues: {
        ...notificationSettings.formValues,
        soundAlert: event.target.value
      }
    });
  };
  
  // Handle test sound
  const handleTestSound = () => {
    onShowSnackbar(`Testing sound: ${notificationSettings.formValues.soundAlert}`, 'info');
  };
  
  // Handle save notification preferences
  const handleSavePreferences = () => {
    onShowSnackbar('Notification preferences saved', 'success');
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Notification Preferences
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Configure which notifications you want to receive and how
          </Typography>
          
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Notification Channels
              </Typography>
              <List sx={{ py: 0 }}>
                {notificationSettings.channels.map((channel) => (
                  <ListItem key={channel.id} disablePadding sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {channel.type === 'Email' && <EmailIcon color="primary" />}
                      {channel.type === 'Mobile App' && <PhoneAndroidIcon color="primary" />}
                      {channel.type === 'SMS' && <SmsIcon color="primary" />}
                      {channel.type === 'Slack' && <ForumIcon color="primary" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={channel.type} 
                      secondary={channel.destination} 
                    />
                    <ListItemSecondaryAction>
                      <Switch 
                        edge="end" 
                        checked={channel.enabled} 
                        onChange={() => handleToggleChannel(channel.id)}
                        color="primary" 
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Button 
                variant="text" 
                color="primary" 
                startIcon={<AddCircleOutlineIcon />} 
                sx={{ mt: 2 }}
                onClick={handleAddChannel}
              >
                Add Notification Channel
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Notification Sound
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <FormControl fullWidth sx={{ mr: 2 }}>
                  <InputLabel id="sound-select-label">Alert Sound</InputLabel>
                  <Select
                    labelId="sound-select-label"
                    id="sound-select"
                    value={notificationSettings.formValues.soundAlert}
                    label="Alert Sound"
                    onChange={handleSoundChange}
                  >
                    <MenuItem value="Ping">Ping</MenuItem>
                    <MenuItem value="Chime">Chime</MenuItem>
                    <MenuItem value="Bell">Bell</MenuItem>
                    <MenuItem value="None">None</MenuItem>
                  </Select>
                </FormControl>
                <IconButton color="primary" onClick={handleTestSound}>
                  <VolumeUpIcon />
                </IconButton>
              </Box>
              <FormControlLabel 
                control={<Switch defaultChecked color="primary" />} 
                label="Play sound for critical alerts only" 
                sx={{ mt: 2 }} 
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Alert Types
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Select which types of alerts you want to be notified about
          </Typography>
          
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Inventory Notifications
              </Typography>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={notificationSettings.formValues.criticalAlerts} 
                      onChange={handleSwitchChange} 
                      name="criticalAlerts" 
                      color="error" 
                    />
                  } 
                  label="Critical stock alerts" 
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={notificationSettings.formValues.lowStockAlerts} 
                      onChange={handleSwitchChange} 
                      name="lowStockAlerts" 
                      color="warning" 
                    />
                  } 
                  label="Low stock warnings" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="info" />} 
                  label="Inventory adjustment notifications" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="success" />} 
                  label="Restock notifications" 
                />
              </FormGroup>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Transfer Notifications
              </Typography>
              <FormGroup>
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Transfer requests" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Transfer status updates" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Transfer completion" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Customs status changes" 
                />
              </FormGroup>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>
                Financial Notifications
              </Typography>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={notificationSettings.formValues.paymentAlerts} 
                      onChange={handleSwitchChange} 
                      name="paymentAlerts" 
                      color="primary" 
                    />
                  } 
                  label="Payment due reminders" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Payment received confirmations" 
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={notificationSettings.formValues.blockchainNotifications} 
                      onChange={handleSwitchChange} 
                      name="blockchainNotifications" 
                      color="secondary" 
                    />
                  } 
                  label="Blockchain transaction updates" 
                />
                <FormControlLabel 
                  control={<Switch defaultChecked color="primary" />} 
                  label="Smart contract execution alerts" 
                />
              </FormGroup>
            </CardContent>
          </Card>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSavePreferences}
            >
              Save Notification Preferences
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationsTab;
