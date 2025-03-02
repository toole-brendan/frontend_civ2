import React from 'react';
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  Chip,
  Stack,
  Divider,
  Grid,
  Button,
  Tabs,
  Tab,
  Tooltip,
  useTheme
} from '@mui/material';
import { InventoryItem } from '../data';

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import EditIcon from '@mui/icons-material/Edit';

interface ItemDetailDrawerProps {
  item: InventoryItem | null;
  open: boolean;
  onClose: () => void;
}

/**
 * Component that displays details about a selected inventory item in a drawer
 */
const ItemDetailDrawer: React.FC<ItemDetailDrawerProps> = ({
  item,
  open,
  onClose
}) => {
  const theme = useTheme();
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  if (!item) return null;
  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: { xs: '100%', sm: '50%', md: '40%' }, 
          maxWidth: '600px',
          p: 2,
          borderRadius: 0,
          border: 'none',
          boxShadow: 'none'
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5">{item.id}</Typography>
            {item.verified && (
              <Tooltip title="Blockchain Verified">
                <VerifiedIcon 
                  color="primary"
                  sx={{ ml: 1 }}
                />
              </Tooltip>
            )}
          </Box>
          <Typography variant="body1">{item.name}</Typography>
          <Chip 
            size="small" 
            label={item.category} 
            sx={{ mt: 1 }}
          />
        </Box>
        <IconButton onClick={onClose}>
          <MoreVertIcon />
        </IconButton>
      </Box>
      
      <Tabs 
        value={0} 
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Overview" />
        <Tab label="History" />
        <Tab label="Usage" />
        <Tab label="Documents" />
      </Tabs>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ 
              mb: 1,
              pb: 0.5,
              borderBottom: '1px solid rgba(140, 140, 160, 0.12)'
            }}>
              Stock Information
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Current Stock</Typography>
                <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                  {item.stock.toLocaleString()} units
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Minimum Level</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {item.min.toLocaleString()} units
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Maximum Level</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {item.max.toLocaleString()} units
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Total Value</Typography>
                <Typography variant="body2" fontWeight="medium" sx={{ fontFamily: 'monospace' }}>
                  ${item.value.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ 
              mb: 1,
              pb: 0.5,
              borderBottom: '1px solid rgba(140, 140, 160, 0.12)'
            }}>
              Location Details
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Primary Location</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {item.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Warehouse Zone</Typography>
                <Typography variant="body2">
                  Zone B-12
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Last Movement</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {item.lastTransaction}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ 
              mb: 1,
              pb: 0.5,
              borderBottom: '1px solid rgba(140, 140, 160, 0.12)'
            }}>
              Supplier Information
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Main Supplier</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {item.supplier}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Lead Time</Typography>
                <Typography variant="body2">
                  {item.leadTime}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Alternative Supplier</Typography>
                <Typography variant="body2">
                  {item.category === 'RF Components' ? 'Tokyo Components' : 
                   item.category === 'Memory ICs' ? 'Korea Chip Manufacturing' : 
                   'Malaysia Circuit Systems'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Last Order Date</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  2025-02-10
                </Typography>
              </Box>
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ 
              mb: 1,
              pb: 0.5,
              borderBottom: '1px solid rgba(140, 140, 160, 0.12)'
            }}>
              Status Information
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Current Status</Typography>
                <Chip 
                  size="small" 
                  label={item.status}
                  color={
                    item.status.includes('Healthy') ? 'success' :
                    item.status.includes('Critical') || item.status.includes('affected') ? 'error' :
                    item.status.includes('Low') || item.status.includes('warning') ? 'warning' :
                    item.status.includes('Excess') ? 'info' : 'default'
                  }
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Lifecycle Status</Typography>
                <Chip 
                  size="small" 
                  label={item.id.includes('LCD') ? 'End-of-Life' : 'Active'}
                  color={item.id.includes('LCD') ? 'default' : 'success'}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Verification Status</Typography>
                <Chip 
                  size="small" 
                  label="Blockchain Verified"
                  color="primary"
                  icon={<VerifiedIcon style={{ fontSize: 14 }} />}
                />
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="subtitle1" sx={{
        mb: 2,
        pb: 0.5,
        borderBottom: '1px solid rgba(140, 140, 160, 0.12)'
      }}>
        Quick Actions
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button 
            fullWidth 
            variant="contained" 
            startIcon={<ShoppingCartIcon />}
            sx={{ py: 1 }}
          >
            Create Order
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button 
            fullWidth 
            variant="outlined"
            startIcon={<SwapHorizIcon />}
            sx={{ py: 1 }}
          >
            Transfer Stock
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button 
            fullWidth 
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ py: 1 }}
          >
            Adjust Quantity
          </Button>
        </Grid>
      </Grid>
      
      <Box sx={{ 
        mt: 3,
        pt: 2, 
        borderTop: '1px dashed rgba(140, 140, 160, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Typography variant="caption">
          Last inventory audit: <Box component="span" sx={{ fontFamily: 'monospace' }}>2025-02-22</Box>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Updated: {timeStr}
        </Typography>
      </Box>
    </Drawer>
  );
};

export default ItemDetailDrawer;
