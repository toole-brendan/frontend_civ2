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
  Typography,
  IconButton,
  Chip,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  useTheme,
  alpha
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import QrCodeIcon from '@mui/icons-material/QrCode';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WarningIcon from '@mui/icons-material/Warning';
import { TechComponentsInventoryItem } from '../types';

interface TechComponentsInventoryTableProps {
  items: TechComponentsInventoryItem[];
  onViewDetails: (item: TechComponentsInventoryItem) => void;
  onEditItem: (item: TechComponentsInventoryItem) => void;
  onTransferItem: (item: TechComponentsInventoryItem) => void;
  onOrderItem: (item: TechComponentsInventoryItem) => void;
  onViewQR: (item: TechComponentsInventoryItem) => void;
}

export const TechComponentsInventoryTable: React.FC<TechComponentsInventoryTableProps> = ({
  items,
  onViewDetails,
  onEditItem,
  onTransferItem,
  onOrderItem,
  onViewQR
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<TechComponentsInventoryItem | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExpandRow = (itemId: string) => {
    setExpandedRow(expandedRow === itemId ? null : itemId);
  };

  const handleActionMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, item: TechComponentsInventoryItem) => {
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchorEl(null);
  };

  const handleAction = (action: 'view' | 'edit' | 'transfer' | 'order' | 'qr') => {
    if (!selectedItem) return;

    handleActionMenuClose();

    switch (action) {
      case 'view':
        onViewDetails(selectedItem);
        break;
      case 'edit':
        onEditItem(selectedItem);
        break;
      case 'transfer':
        onTransferItem(selectedItem);
        break;
      case 'order':
        onOrderItem(selectedItem);
        break;
      case 'qr':
        onViewQR(selectedItem);
        break;
    }
  };

  const getStockLevelColor = (current: number, min: number) => {
    const ratio = current / min;
    if (ratio < 0.5) return theme.palette.error.main;
    if (ratio < 1) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getStockPercentage = (current: number, min: number, max: number) => {
    // Calculate percentage relative to min and max
    if (current <= min) return Math.max(Math.round((current / min) * 50), 5);
    const range = max - min;
    const excess = current - min;
    return Math.min(50 + Math.round((excess / range) * 50), 100);
  };

  const getLifecycleStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return theme.palette.info.main;
      case 'active':
        return theme.palette.success.main;
      case 'mature':
        return theme.palette.success.dark;
      case 'declining':
        return theme.palette.warning.main;
      case 'end-of-life':
        return theme.palette.error.light;
      case 'obsolete':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getWarehouseLabel = (item: TechComponentsInventoryItem) => {
    if (item.locations.length === 1) {
      return item.locations[0].warehouseId.charAt(0).toUpperCase() + item.locations[0].warehouseId.slice(1);
    }
    return `${item.locations.length} Locations`;
  };

  const isLowStock = (item: TechComponentsInventoryItem) => {
    return item.currentStock < item.reorderPoint;
  };

  const isExcessStock = (item: TechComponentsInventoryItem) => {
    return item.currentStock > item.maxLevel * 1.2;
  };

  const getRowBackgroundColor = (item: TechComponentsInventoryItem) => {
    if (isLowStock(item)) return alpha(theme.palette.error.main, 0.05);
    if (isExcessStock(item)) return alpha(theme.palette.warning.main, 0.05);
    return 'transparent';
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mb: 4 }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 350px)' }}>
        <Table stickyHeader aria-label="inventory table">
          <TableHead>
            <TableRow>
              <TableCell width="50px" />
              <TableCell>SKU / Part Number</TableCell>
              <TableCell>Component Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Current Stock</TableCell>
              <TableCell>Min/Max</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell align="right">Unit Cost</TableCell>
              <TableCell align="right">Total Value</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell width="80px">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                const isExpanded = expandedRow === item.id;
                const stockColor = getStockLevelColor(item.currentStock, item.minLevel);
                const stockPercentage = getStockPercentage(item.currentStock, item.minLevel, item.maxLevel);
                const rowBackground = getRowBackgroundColor(item);

                return (
                  <React.Fragment key={item.id}>
                    <TableRow 
                      hover 
                      sx={{ 
                        '& > *': { borderBottom: 'unset' },
                        backgroundColor: rowBackground
                      }}
                    >
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleExpandRow(item.id)}
                        >
                          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.sku}
                          {item.blockchainVerified && (
                            <Tooltip title="Blockchain Verified">
                              <VerifiedIcon 
                                fontSize="small" 
                                color="success" 
                                sx={{ ml: 1 }} 
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200, display: 'block' }}>
                          {item.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {item.category}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.subcategory}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={getWarehouseLabel(item)} 
                          size="small" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                          <Box sx={{ width: '100%', mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                              {item.currentStock.toLocaleString()}
                            </Typography>
                            {isLowStock(item) && (
                              <Tooltip title="Below reorder point">
                                <WarningIcon fontSize="small" color="error" />
                              </Tooltip>
                            )}
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={stockPercentage}
                            sx={{ 
                              width: '100%', 
                              height: 6, 
                              borderRadius: 1,
                              backgroundColor: `${stockColor}20`,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: stockColor
                              }
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary" component="div">
                          Min: {item.minLevel.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" component="div">
                          Max: {item.maxLevel.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell align="right">${item.unitCost.toFixed(2)}</TableCell>
                      <TableCell align="right">${item.totalValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary" component="div">
                          Received: {new Date(item.lastReceived).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" component="div">
                          Shipped: {new Date(item.lastShipped).toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={(event) => handleActionMenuOpen(event, item)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                              Additional Details
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  Lead Time:
                                </Typography>
                                <Typography variant="body2">
                                  {item.leadTime} days
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  Lifecycle Status:
                                </Typography>
                                <Chip 
                                  label={item.lifecycleStatus} 
                                  size="small"
                                  sx={{ 
                                    backgroundColor: alpha(getLifecycleStatusColor(item.lifecycleStatus), 0.1),
                                    color: getLifecycleStatusColor(item.lifecycleStatus),
                                    fontWeight: 'medium',
                                    textTransform: 'capitalize'
                                  }}
                                />
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  Compliance:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                                  <Chip 
                                    label="RoHS" 
                                    size="small"
                                    color={item.complianceStatus.rohs ? "success" : "error"}
                                    variant="outlined"
                                  />
                                  <Chip 
                                    label="REACH" 
                                    size="small"
                                    color={item.complianceStatus.reach ? "success" : "error"}
                                    variant="outlined"
                                  />
                                </Box>
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  Health Score:
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={item.healthScore}
                                    sx={{ 
                                      width: 100, 
                                      height: 8, 
                                      borderRadius: 1,
                                      mr: 1,
                                      backgroundColor: alpha(theme.palette.success.main, 0.2),
                                      '& .MuiLinearProgress-bar': {
                                        backgroundColor: theme.palette.success.main
                                      }
                                    }}
                                  />
                                  <Typography variant="body2">
                                    {item.healthScore}/100
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Typography variant="subtitle2" gutterBottom component="div">
                              Location Breakdown
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                              {item.locations.map((location, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                                  <Typography variant="body2" sx={{ width: 100 }}>
                                    {location.warehouseId.charAt(0).toUpperCase() + location.warehouseId.slice(1)}:
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                    {location.quantity.toLocaleString()} units
                                  </Typography>
                                </Box>
                              ))}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Tooltip title="View Details">
                                <IconButton size="small" onClick={() => onViewDetails(item)}>
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Edit Item">
                                <IconButton size="small" onClick={() => onEditItem(item)}>
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Transfer Item">
                                <IconButton size="small" onClick={() => onTransferItem(item)}>
                                  <SwapHorizIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Order Item">
                                <IconButton size="small" onClick={() => onOrderItem(item)}>
                                  <ShoppingCartIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View QR Code">
                                <IconButton size="small" onClick={() => onViewQR(item)}>
                                  <QrCodeIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleActionMenuClose}
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
          <ListItemText>Edit Item</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('transfer')}>
          <ListItemIcon>
            <SwapHorizIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Transfer Item</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('order')}>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Order Item</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('qr')}>
          <ListItemIcon>
            <QrCodeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View QR Code</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default TechComponentsInventoryTable; 