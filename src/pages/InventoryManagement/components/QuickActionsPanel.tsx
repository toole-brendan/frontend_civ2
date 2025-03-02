import React from 'react';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Typography,
  Grid,
  alpha,
  useTheme
} from '@mui/material';
import { DashboardCard, StatusChip } from '@/components/common';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import BarChartIcon from '@mui/icons-material/BarChart';

interface QuickActionsPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

/**
 * Component that displays search box and quick action buttons
 */
const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  searchTerm,
  onSearchChange
}) => {
  const theme = useTheme();
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  return (
    <DashboardCard
      title="Quick Actions"
      subtitle="Search and common inventory operations"
      contentPadding={2}
      content={
        <Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search by SKU, description, supplier..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              sx={{ mb: 2 }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <QrCodeScannerIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: 1,
                  fontSize: '0.85rem',
                  backgroundColor: alpha(theme.palette.background.default, 0.4),
                }
              }}
            />
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap', gap: 1 }}>
              <StatusChip 
                label="Critical Stock" 
                size="small" 
                status="error"
              />
              <StatusChip 
                label="High Value" 
                size="small" 
                status="primary"
              />
              <StatusChip 
                label="Slow Moving" 
                size="small" 
                status="secondary"
              />
              <StatusChip 
                label="Unverified" 
                size="small" 
                status="info"
              />
            </Stack>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<AddIcon fontSize="small" />} 
                sx={{ py: 1, justifyContent: 'flex-start' }}
              >
                Add New Item
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<UploadFileIcon fontSize="small" />} 
                sx={{ py: 1, justifyContent: 'flex-start' }}
              >
                Bulk Import
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<QrCodeScannerIcon fontSize="small" />} 
                sx={{ py: 1, justifyContent: 'flex-start' }}
              >
                Scan Items
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<BarChartIcon fontSize="small" />} 
                sx={{ py: 1, justifyContent: 'flex-start' }}
              >
                Generate Reports
              </Button>
            </Grid>
          </Grid>
        </Box>
      }
      footer={
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <Typography variant="caption">
            Press <Box component="span" sx={{ fontFamily: 'monospace', bgcolor: alpha(theme.palette.background.default, 0.6), px: 0.5 }}>Ctrl+F</Box> for advanced search
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Updated: {timeStr}
          </Typography>
        </Box>
      }
    />
  );
};

export default QuickActionsPanel;
