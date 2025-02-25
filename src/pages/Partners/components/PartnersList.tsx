import React, { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Button,
  Paper,
  Alert,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';
import PartnerCard from './PartnerCard';
import { Partner } from '../types';

interface PartnersListProps {
  partners: Partner[];
  onViewPartner: (partner: Partner) => void;
  onEditPartner: (partner: Partner) => void;
  onDeletePartner: (partner: Partner) => void;
  onCreatePartner: () => void;
}

const PartnersList: React.FC<PartnersListProps> = ({
  partners,
  onViewPartner,
  onEditPartner,
  onDeletePartner,
  onCreatePartner,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, partner: Partner) => {
    setAnchorEl(event.currentTarget);
    setSelectedPartner(partner);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<string>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleAction = (action: 'view' | 'edit' | 'delete' | 'contact' | 'activate' | 'deactivate') => {
    if (!selectedPartner) return;

    switch (action) {
      case 'view':
        onViewPartner(selectedPartner);
        break;
      case 'edit':
        onEditPartner(selectedPartner);
        break;
      case 'delete':
        onDeletePartner(selectedPartner);
        break;
      // Add more actions here
      default:
        break;
    }
    handleMenuClose();
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPartners = partners.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(partners.length / itemsPerPage);

  return (
    <Box>
      {/* Header with Actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" component="div">
          {partners.length} Partners
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2 }}>
            <Tooltip title="Grid View">
              <Button
                variant={viewType === 'grid' ? 'contained' : 'outlined'}
                size="small"
                sx={{ minWidth: 0, p: 1, mr: 1 }}
                onClick={() => setViewType('grid')}
              >
                <GridViewIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="List View">
              <Button
                variant={viewType === 'list' ? 'contained' : 'outlined'}
                size="small"
                sx={{ minWidth: 0, p: 1 }}
                onClick={() => setViewType('list')}
              >
                <ViewListIcon fontSize="small" />
              </Button>
            </Tooltip>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={onCreatePartner}
          >
            Add Partner
          </Button>
        </Box>
      </Box>

      {/* Display No Results Message if Empty */}
      {partners.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            No partners found matching your criteria
          </Alert>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onCreatePartner}
          >
            Add New Partner
          </Button>
        </Paper>
      ) : (
        <>
          {/* Grid View */}
          {viewType === 'grid' && (
            <Grid container spacing={3}>
              {currentPartners.map((partner) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={partner.id}>
                  <PartnerCard
                    partner={partner}
                    onClick={onViewPartner}
                    onMenuClick={handleMenuClick}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* List View */}
          {viewType === 'list' && (
            <Paper variant="outlined" sx={{ mb: 3 }}>
              {/* We would implement a table view here */}
              <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                List view is not fully implemented yet
              </Typography>
            </Paper>
          )}

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
            <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
              <InputLabel id="items-per-page-label">Show</InputLabel>
              <Select
                labelId="items-per-page-label"
                value={itemsPerPage.toString()}
                onChange={handleItemsPerPageChange}
                label="Show"
              >
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="12">12</MenuItem>
                <MenuItem value="24">24</MenuItem>
                <MenuItem value="48">48</MenuItem>
                <MenuItem value="96">96</MenuItem>
              </Select>
            </FormControl>
            
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange} 
              color="primary" 
              showFirstButton 
              showLastButton
            />
            
            <Typography variant="body2" color="textSecondary">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, partners.length)} of {partners.length}
            </Typography>
          </Box>
        </>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleAction('view')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Partner</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('contact')}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Contact Partner</ListItemText>
        </MenuItem>
        <Divider />
        {selectedPartner && selectedPartner.status === 'ACTIVE' ? (
          <MenuItem onClick={() => handleAction('deactivate')}>
            <ListItemIcon>
              <BlockIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Deactivate</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleAction('activate')}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText>Activate</ListItemText>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => handleAction('delete')} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete Partner</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PartnersList; 