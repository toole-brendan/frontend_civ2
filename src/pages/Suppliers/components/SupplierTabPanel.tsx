import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Badge,
  useTheme,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import MapIcon from '@mui/icons-material/Map';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import SettingsIcon from '@mui/icons-material/Settings';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import { Supplier } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Component for displaying tab content
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`supplier-tabpanel-${index}`}
      aria-labelledby={`supplier-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

// Helper function for tab accessibility
const a11yProps = (index: number) => {
  return {
    id: `supplier-tab-${index}`,
    'aria-controls': `supplier-tabpanel-${index}`,
  };
};

interface SupplierTabPanelProps {
  suppliers: Supplier[];
  onViewChange: (viewType: string) => void;
  onExport: () => void;
  onShare: () => void;
  onPrint: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
  activeTab?: number;
  children?: React.ReactNode;
}

const SupplierTabPanel: React.FC<SupplierTabPanelProps> = ({
  suppliers,
  onViewChange,
  onExport,
  onShare,
  onPrint,
  onToggleFavorite,
  isFavorite,
  activeTab = 0,
  children,
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(activeTab);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    
    // Map tab index to view type
    const viewTypes = ['table', 'map', 'analytics', 'cards'];
    onViewChange(viewTypes[newValue]);
  };

  // Count suppliers with high risk levels based on risk assessment
  const highRiskCount = suppliers.filter(s => 
    s.riskAssessment.geopoliticalRisk === 'HIGH' || 
    s.riskAssessment.financialStability === 'CONCERNING'
  ).length;
  
  // Count suppliers with pending verification
  const pendingVerificationCount = suppliers.filter(s => 
    s.blockchainVerificationStatus === 'VERIFICATION_PENDING'
  ).length;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="supplier view tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab 
              icon={<TableViewIcon />} 
              iconPosition="start" 
              label="Table View" 
              {...a11yProps(0)} 
            />
            <Tab 
              icon={<MapIcon />} 
              iconPosition="start" 
              label="Map View" 
              {...a11yProps(1)} 
            />
            <Tab 
              icon={<EqualizerIcon />} 
              iconPosition="start" 
              label="Analytics" 
              {...a11yProps(2)} 
            />
            <Tab 
              icon={<ViewAgendaIcon />} 
              iconPosition="start" 
              label="Card View" 
              {...a11yProps(3)} 
            />
            <Tab 
              icon={
                <Badge badgeContent={highRiskCount} color="error" max={99}>
                  <SettingsIcon />
                </Badge>
              } 
              iconPosition="start" 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  Risk Management
                  {pendingVerificationCount > 0 && (
                    <Badge 
                      badgeContent={pendingVerificationCount} 
                      color="warning" 
                      max={99}
                      sx={{ ml: 1 }}
                    />
                  )}
                </Box>
              } 
              {...a11yProps(4)} 
            />
          </Tabs>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <IconButton size="small" onClick={onToggleFavorite} sx={{ mr: 1 }}>
              {isFavorite ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Export data">
            <IconButton size="small" onClick={onExport} sx={{ mr: 1 }}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Share">
            <IconButton size="small" onClick={onShare} sx={{ mr: 1 }}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Print">
            <IconButton size="small" onClick={onPrint}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Divider />
      
      {/* Status summary info */}
      <Box sx={{ mt: 1, mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {suppliers.length} suppliers total | {highRiskCount} high risk | {pendingVerificationCount} pending verification
        </Typography>
      </Box>
      
      {/* Tab panel content */}
      <TabPanel value={tabValue} index={0}>
        {/* Table View Content */}
        {tabValue === 0 && children}
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        {/* Map View Content */}
        {tabValue === 1 && children}
      </TabPanel>
      
      <TabPanel value={tabValue} index={2}>
        {/* Analytics Content */}
        {tabValue === 2 && children}
      </TabPanel>
      
      <TabPanel value={tabValue} index={3}>
        {/* Card View Content */}
        {tabValue === 3 && children}
      </TabPanel>
      
      <TabPanel value={tabValue} index={4}>
        {/* Risk Management Content */}
        {tabValue === 4 && children}
      </TabPanel>
    </Box>
  );
};

export default SupplierTabPanel; 