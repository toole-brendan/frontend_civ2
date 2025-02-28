import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  FormControl, 
  Select, 
  MenuItem, 
  Button, 
  TextField, 
  InputAdornment,
  useTheme
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PageHeader from '@/components/common/PageHeader';
import { DashboardCard } from '@/components/common/DashboardCard';
import { useTitle } from '@/hooks/useTitle';
import { 
  CriticalStatusCards,
  FinancialSnapshot,
  SupplyChainMap,
  ActionCenterPanel,
  PerformanceMetricsPanel,
  ForecastPanel,
  QuickAccessShortcuts,
  NotificationSidebar
} from './components';
import './dashboard.css';

const Dashboard: React.FC = () => {
  useTitle('TechComponents Operations Dashboard');
  const theme = useTheme();
  
  // Warehouse state
  const [warehouse, setWarehouse] = useState('all');

  // Format current date
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', options);
  
  // Mock data for last updated
  const lastUpdated = '2 minutes ago';

  const handleWarehouseChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWarehouse(event.target.value as string);
  };

  return (
    <Container maxWidth={false} className="dashboard-container" sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 4 }}>
      {/* Header Bar: Full-width with global filters and warehouse selector */}
      <Box sx={{ mb: 3 }}>
        <PageHeader 
          title="TechComponents Operations Dashboard" 
          subtitle={`Welcome, Michael | ${formattedDate} | Last updated: ${lastUpdated}`}
          actions={
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              alignItems: 'center',
              flexWrap: { xs: 'wrap', md: 'nowrap' }
            }}>
              <FormControl 
                variant="outlined" 
                size="small" 
                sx={{ minWidth: 180 }}
              >
                <Select
                  value={warehouse}
                  onChange={handleWarehouseChange as any}
                  displayEmpty
                  sx={{ 
                    borderRadius: 1,
                    backgroundColor: theme.palette.background.paper,
                  }}
                >
                  <MenuItem value="all">All Locations</MenuItem>
                  <MenuItem value="austin">Austin</MenuItem>
                  <MenuItem value="san-jose">San Jose</MenuItem>
                  <MenuItem value="guadalajara">Guadalajara</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                size="small"
                placeholder="Date Range"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  minWidth: 150,
                  backgroundColor: theme.palette.background.paper,
                }}
              />
              
              <Button 
                variant="outlined" 
                startIcon={<FileDownloadIcon />}
                sx={{ 
                  whiteSpace: 'nowrap',
                  borderRadius: 1,
                }}
              >
                Export Dashboard
              </Button>
            </Box>
          }
        />
      </Box>
      
      {/* Main Dashboard Content */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { 
          xs: '1fr', 
          md: '1fr 1fr', 
          lg: '1fr 1fr 1fr' 
        },
        gap: 3
      }}>
        {/* Left Column (spans 1/3 on large screens, full width on small) */}
        <Box sx={{ 
          gridColumn: { xs: '1', lg: '1' }
        }}>
          {/* Critical Alert Card 1 */}
          <Box sx={{ mb: 3 }}>
            <CriticalStatusCards type="urgent" />
          </Box>
          
          {/* Action Center Panel */}
          <Box sx={{ mb: 3 }}>
            <DashboardCard title="Priority Action Panel">
              <ActionCenterPanel />
            </DashboardCard>
          </Box>
        </Box>
        
        {/* Middle Column (spans 1/3 on large screens, 1/2 on medium, full width on small) */}
        <Box sx={{ 
          gridColumn: { xs: '1', md: '2', lg: '2' }
        }}>
          {/* Critical Alert Card 2 */}
          <Box sx={{ mb: 3 }}>
            <CriticalStatusCards type="warning" />
          </Box>
          
          {/* Performance Metrics Panel */}
          <Box sx={{ mb: 3 }}>
            <DashboardCard title="Performance Metrics Dashboard">
              <PerformanceMetricsPanel />
            </DashboardCard>
          </Box>
        </Box>
        
        {/* Right Column (spans 1/3 on large screens, spans across on medium and small) */}
        <Box sx={{ 
          gridColumn: { xs: '1', md: '1 / span 2', lg: '3' }
        }}>
          {/* Critical Alert Card 3 */}
          <Box sx={{ mb: 3 }}>
            <CriticalStatusCards type="caution" />
          </Box>
          
          {/* Notifications Panel (only visible on large screens in this column) */}
          <Box sx={{ 
            mb: 3,
            display: { xs: 'none', lg: 'block' }
          }}>
            <DashboardCard title="Notifications & Activity">
              <NotificationSidebar />
            </DashboardCard>
          </Box>
        </Box>
      </Box>
      
      {/* Two-column section for Financial Summary and Map (spans full width) */}
      <Box sx={{ 
        mt: 3,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
        gap: 3
      }}>
        {/* Financial Summary (2/3 width) */}
        <DashboardCard title="Financial Snapshot">
          <FinancialSnapshot />
        </DashboardCard>
        
        {/* Supply Chain Map (1/3 width) */}
        <DashboardCard title="Supply Chain Map">
          <SupplyChainMap />
        </DashboardCard>
      </Box>
      
      {/* Full-width 30-Day Forecast */}
      <Box sx={{ mt: 3 }}>
        <DashboardCard title="30-Day Business Forecast">
          <ForecastPanel />
        </DashboardCard>
      </Box>
      
      {/* Quick Actions: Horizontal row of circular icon buttons */}
      <Box sx={{ mt: 3 }}>
        <QuickAccessShortcuts />
      </Box>
      
      {/* Notifications Panel (only visible on medium and small screens as full width) */}
      <Box sx={{ 
        mt: 3,
        display: { xs: 'block', lg: 'none' }
      }}>
        <DashboardCard title="Notifications & Activity">
          <NotificationSidebar />
        </DashboardCard>
      </Box>
    </Container>
  );
};

export default Dashboard; 