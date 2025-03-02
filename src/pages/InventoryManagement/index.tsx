import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Grid, 
  Button, 
  Divider,
  Typography,
  Stack,
  useTheme 
} from '@mui/material';
import { InventoryItem } from './data';
import { 
  InventoryHealthPanel, 
  QuickActionsPanel, 
  CategoryList, 
  InventoryTable,
  ItemDetailDrawer
} from './components';
import { PageHeader } from '@/components/common';

// Icons
import TuneIcon from '@mui/icons-material/Tune';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

/**
 * Inventory Management page that displays inventory items, categories, and metrics
 */
const InventoryManagement: React.FC = () => {
  const theme = useTheme();
  
  // State for search and item detail drawer
  const [searchTerm, setSearchTerm] = useState('');
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Handlers
  const handleOpenDetail = (item: InventoryItem) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setDetailOpen(false);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Page header actions
  const headerActions = (
    <Stack direction="row" spacing={1.5}>
      <Button variant="outlined" startIcon={<TuneIcon fontSize="small" />}>
        Filters
      </Button>
      <Button variant="outlined" startIcon={<QrCodeScannerIcon fontSize="small" />}>
        Scan
      </Button>
      <Button 
        variant="contained" 
        startIcon={<AddIcon fontSize="small" />}
      >
        Add Item
      </Button>
    </Stack>
  );

  // Page header subtitle with stats
  const headerSubtitle = (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
      <Typography variant="body2" color="text.secondary">
        12,483 SKUs | $4,285,630 Total Value
      </Typography>
      <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 12, alignSelf: 'center' }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <RefreshIcon sx={{ color: 'text.secondary', fontSize: 12, mr: 0.5 }} />
        <Typography variant="caption" color="text.secondary">
          Last verification: Today, 9:15 AM
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      pb: 8
    }}>
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        {/* Use PageHeader component for consistent styling */}
        <PageHeader 
          title="Inventory Management"
          actions={headerActions}
        >
          {headerSubtitle}
        </PageHeader>

        {/* Top Section: Inventory Health & Quick Actions */}
        <Grid container spacing={2}>
          {/* Inventory Health Overview */}
          <Grid item xs={12} lg={8}>
            <InventoryHealthPanel />
          </Grid>
          
          {/* Quick Actions */}
          <Grid item xs={12} lg={4}>
            <QuickActionsPanel 
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
            />
          </Grid>
        </Grid>

        {/* Component Categories */}
        <CategoryList />

        {/* Inventory Table */}
        <InventoryTable 
          searchTerm={searchTerm}
          onItemSelect={handleOpenDetail}
        />
        
        {/* Item Detail Drawer */}
        <ItemDetailDrawer 
          item={selectedItem}
          open={detailOpen}
          onClose={handleCloseDetail}
        />
      </Container>
    </Box>
  );
};

export default InventoryManagement;
