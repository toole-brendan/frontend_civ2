import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Chip,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
  CircularProgress,
  styled,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  FileCopy as DuplicateIcon,
  QrCode as QrCodeIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShipIcon,
  History as HistoryIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

// Define the inventory item interface locally
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: {
    id: string;
    name: string;
    color?: string;
  };
  quantity: number;
  location: {
    id: string;
    name: string;
    path: string[];
  };
  unitPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'On Order' | 'Discontinued';
  lastUpdated: string;
  imageUrl?: string;
  minimumQuantity?: number;
  description?: string;
}

// Define table props
interface InventoryTableProps {
  items: InventoryItem[];
  loading?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onShowQrCode: (id: string) => void;
  onViewDetails: (id: string) => void;
  onViewHistory: (id: string) => void;
  onTransfer: (id: string) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
  cursor: 'pointer',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  height: 24,
  fontSize: '0.75rem',
}));

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: InventoryItem['status'] }>(({ theme, status }) => {
  let color;
  switch (status) {
    case 'In Stock':
      color = theme.palette.success;
      break;
    case 'Low Stock':
      color = theme.palette.warning;
      break;
    case 'Out of Stock':
    case 'Discontinued':
      color = theme.palette.error;
      break;
    case 'On Order':
      color = theme.palette.info;
      break;
    default:
      color = theme.palette.primary;
  }
  
  return {
    height: 24,
    fontSize: '0.75rem',
    backgroundColor: color.light,
    color: color.dark,
    fontWeight: 500,
  };
});

export const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  loading = false,
  onEdit,
  onDelete,
  onDuplicate,
  onShowQrCode,
  onViewDetails,
  onViewHistory,
  onTransfer,
  onSelectionChange,
}) => {
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for selected rows
  const [selected, setSelected] = useState<string[]>([]);
  
  // State for action menu
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);
  const [actionItemId, setActionItemId] = useState<string | null>(null);
  
  // Check if an item is selected
  const isSelected = (id: string) => selected.includes(id);
  
  // Handle select all click
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = items.map((item) => item.id);
      setSelected(newSelected);
      if (onSelectionChange) onSelectionChange(newSelected);
      return;
    }
    setSelected([]);
    if (onSelectionChange) onSelectionChange([]);
  };
  
  // Handle row click for selection
  const handleRowClick = (event: React.MouseEvent<unknown>, id: string) => {
    // Prevent selection when clicking on action buttons
    if ((event.target as HTMLElement).closest('button')) {
      return;
    }
    
    onViewDetails(id);
  };
  
  // Handle checkbox click
  const handleCheckboxClick = (event: React.MouseEvent<unknown>, id: string) => {
    event.stopPropagation();
    
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];
    
    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((itemId) => itemId !== id);
    }
    
    setSelected(newSelected);
    if (onSelectionChange) onSelectionChange(newSelected);
  };
  
  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Handle action menu open
  const handleActionMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.stopPropagation();
    setActionItemId(id);
    setActionMenuAnchor(event.currentTarget);
  };
  
  // Handle action menu close
  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
    setActionItemId(null);
  };
  
  // Handle action menu item click
  const handleActionClick = (action: 'edit' | 'delete' | 'duplicate' | 'qrcode' | 'history' | 'transfer') => {
    if (!actionItemId) return;
    
    switch (action) {
      case 'edit':
        onEdit(actionItemId);
        break;
      case 'delete':
        onDelete(actionItemId);
        break;
      case 'duplicate':
        onDuplicate(actionItemId);
        break;
      case 'qrcode':
        onShowQrCode(actionItemId);
        break;
      case 'history':
        onViewHistory(actionItemId);
        break;
      case 'transfer':
        onTransfer(actionItemId);
        break;
      default:
        break;
    }
    
    handleActionMenuClose();
  };
  
  // Format price as currency
  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Calculate stock status
  const getStockStatus = (item: InventoryItem) => {
    // If item already has a status, use it
    if (item.status) return item.status;
    
    // Otherwise calculate based on quantity
    if (item.quantity <= 0) return 'Out of Stock';
    if (item.minimumQuantity && item.quantity <= item.minimumQuantity) return 'Low Stock';
    return 'In Stock';
  };
  
  // Get visible rows based on pagination
  const visibleRows = items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <StyledPaper>
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < items.length}
                  checked={items.length > 0 && selected.length === items.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>Item</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={32} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Loading inventory items...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : visibleRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 3 }}>
                  <InventoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body1">
                    No inventory items found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try adjusting your filters or adding new items
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((item) => {
                const isItemSelected = isSelected(item.id);
                const stockStatus = getStockStatus(item);
                const isLowStock = stockStatus === 'Low Stock';
                
                return (
                  <StyledTableRow
                    hover
                    key={item.id}
                    onClick={(event) => handleRowClick(event, item.id)}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleCheckboxClick(event, item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {item.imageUrl ? (
                          <Box
                            component="img"
                            src={item.imageUrl}
                            alt={item.name}
                            sx={{
                              width: 40,
                              height: 40,
                              objectFit: 'contain',
                              borderRadius: 1,
                              mr: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'action.hover',
                              mr: 2,
                            }}
                          >
                            <InventoryIcon color="action" />
                          </Box>
                        )}
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>
                      <CategoryChip
                        label={item.category.name}
                        size="small"
                        sx={{
                          backgroundColor: item.category.color || 'primary.light',
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {isLowStock ? (
                        <Tooltip title="Low stock">
                          <Badge
                            badgeContent={<WarningIcon fontSize="small" />}
                            color="warning"
                          >
                            <Typography variant="body2">{item.quantity}</Typography>
                          </Badge>
                        </Tooltip>
                      ) : (
                        <Typography variant="body2">{item.quantity}</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title={item.location.path.join(' > ')}>
                        <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                          {item.location.name}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2">
                        {formatCurrency(item.unitPrice)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        label={stockStatus}
                        size="small"
                        status={stockStatus}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(item.lastUpdated)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleActionMenuOpen(event, item.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
      >
        <MenuItem onClick={() => handleActionClick('edit')}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('duplicate')}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('transfer')}>
          <ListItemIcon>
            <ShipIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Transfer</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('qrcode')}>
          <ListItemIcon>
            <QrCodeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Show QR Code</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('history')}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View History</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleActionClick('delete')}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </StyledPaper>
  );
};

export default InventoryTable; 