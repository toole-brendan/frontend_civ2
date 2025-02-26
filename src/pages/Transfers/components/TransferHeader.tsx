import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  Badge,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarningIcon from '@mui/icons-material/Warning';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface TransferHeaderProps {
  onCreateTransfer: () => void;
  onScanQR: () => void;
  onViewPendingApprovals: () => void;
  onFilterChange: (filter: string) => void;
}

const TransferHeader: React.FC<TransferHeaderProps> = ({
  onCreateTransfer,
  onScanQR,
  onViewPendingApprovals,
  onFilterChange,
}) => {
  const theme = useTheme();
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(null);
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  
  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };
  
  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };
  
  const handleActionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };
  
  const handleActionsMenuClose = () => {
    setActionsMenuAnchor(null);
  };
  
  const handleFilterSelect = (filter: string) => {
    onFilterChange(filter);
    handleFilterMenuClose();
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalShippingIcon 
            sx={{ 
              fontSize: 32, 
              mr: 2, 
              color: theme.palette.primary.main 
            }} 
          />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Transfers
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Scan QR Code">
            <IconButton 
              color="primary" 
              onClick={onScanQR}
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <QrCodeScannerIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="View Pending Approvals">
            <IconButton 
              color="primary" 
              onClick={onViewPendingApprovals}
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Filter View">
            <IconButton 
              color="primary" 
              onClick={handleFilterMenuOpen}
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={filterMenuAnchor}
            open={Boolean(filterMenuAnchor)}
            onClose={handleFilterMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleFilterSelect('all')}>
              <LocalShippingIcon fontSize="small" sx={{ mr: 1 }} />
              All Transfers
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('inbound')}>
              <LocalShippingIcon fontSize="small" sx={{ mr: 1 }} />
              Inbound Transfers
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('outbound')}>
              <LocalShippingIcon fontSize="small" sx={{ mr: 1 }} />
              Outbound Transfers
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => handleFilterSelect('critical')}>
              <WarningIcon fontSize="small" sx={{ mr: 1, color: theme.palette.error.main }} />
              Critical Transfers
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('verified')}>
              <VerifiedIcon fontSize="small" sx={{ mr: 1, color: theme.palette.success.main }} />
              Verified Transfers
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect('receipts')}>
              <ReceiptIcon fontSize="small" sx={{ mr: 1 }} />
              Pending Receipts
            </MenuItem>
          </Menu>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreateTransfer}
            sx={{ borderRadius: 1 }}
          >
            Create Transfer
          </Button>
          
          <IconButton 
            color="inherit" 
            onClick={handleActionsMenuOpen}
            sx={{ 
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
            }}
          >
            <MoreVertIcon />
          </IconButton>
          
          <Menu
            anchorEl={actionsMenuAnchor}
            open={Boolean(actionsMenuAnchor)}
            onClose={handleActionsMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleActionsMenuClose}>Import Transfers</MenuItem>
            <MenuItem onClick={handleActionsMenuClose}>Export Transfers</MenuItem>
            <MenuItem onClick={handleActionsMenuClose}>Generate Reports</MenuItem>
            <Divider />
            <MenuItem onClick={handleActionsMenuClose}>Transfer Settings</MenuItem>
          </Menu>
        </Box>
      </Box>
      
      <Typography variant="body2" color="text.secondary">
        Manage and track all transfers across your organization. Create new transfers, monitor status, and verify receipts.
      </Typography>
    </Box>
  );
};

export default TransferHeader; 