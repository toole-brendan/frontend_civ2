import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  Badge,
  Tooltip,
  useTheme,
  SelectChangeEvent,
  InputLabel
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

interface DashboardHeaderProps {
  userName: string;
  notificationCount: number;
  onNotificationsClick?: () => void;
  onExportClick?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  notificationCount,
  onNotificationsClick,
  onExportClick
}) => {
  const theme = useTheme();
  const [warehouse, setWarehouse] = useState<string>('all');
  const [date, setDate] = useState<Date | null>(new Date());

  const handleWarehouseChange = (event: SelectChangeEvent) => {
    setWarehouse(event.target.value);
  };

  // Get current day of week and date
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = today.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Welcome back, {userName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's your overview for {dayOfWeek}, {formattedDate}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton color="default" onClick={onNotificationsClick}>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="warehouse-select-label">Location</InputLabel>
              <Select
                labelId="warehouse-select-label"
                id="warehouse-select"
                value={warehouse}
                label="Location"
                onChange={handleWarehouseChange}
              >
                <MenuItem value="all">All Locations</MenuItem>
                <MenuItem value="austin">Austin</MenuItem>
                <MenuItem value="sanJose">San Jose</MenuItem>
                <MenuItem value="guadalajara">Guadalajara</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Range"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{ 
                textField: { 
                  size: 'small',
                  sx: { width: 150 }
                } 
              }}
            />
          </LocalizationProvider>
          <Tooltip title="Export Dashboard">
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={onExportClick}
              size="small"
            >
              Export
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="caption" color="text.secondary">
          Last updated: {new Date().toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardHeader;

 