import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  Divider,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  styled,
  Stack,
  SelectChangeEvent,
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  QrCode as QrCodeIcon,
  LocalShipping as ShippingIcon,
  Inventory as InventoryIcon,
  History as HistoryIcon,
  DeleteOutline as DeleteIcon,
  FileCopy as DuplicateIcon,
  Label as LabelIcon,
  Info as InfoIcon,
  AttachMoney as PriceIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { InventoryItem } from './InventoryTable';
import { Category } from './InventoryFilters';

// Define transaction history interface
interface ItemTransaction {
  id: string;
  type: 'receipt' | 'transfer' | 'adjustment' | 'audit' | 'order';
  date: string;
  quantity: number;
  from?: string;
  to?: string;
  user: string;
  notes?: string;
}

// Define item attachment interface
interface ItemAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  dateAdded: string;
  addedBy: string;
}

// Component props
interface ItemDetailsDrawerProps {
  open: boolean;
  item: InventoryItem | null;
  categories: Category[];
  locations: Array<{ id: string; name: string; path: string[] }>;
  transactions?: ItemTransaction[];
  attachments?: ItemAttachment[];
  loading?: boolean;
  onClose: () => void;
  onSave: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onTransfer: (id: string) => void;
  onShowQrCode: (id: string) => void;
}

// Styled components
const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(3),
}));

const ImagePreview = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 200,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
  position: 'relative',
}));

const ButtonWithIcon = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
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
    backgroundColor: color.light,
    color: color.dark,
    fontWeight: 500,
  };
});

export const ItemDetailsDrawer: React.FC<ItemDetailsDrawerProps> = ({
  open,
  item,
  categories,
  locations,
  transactions = [],
  attachments = [],
  loading = false,
  onClose,
  onSave,
  onDelete,
  onDuplicate,
  onTransfer,
  onShowQrCode,
}) => {
  // State for tabs
  const [tabValue, setTabValue] = useState(0);
  
  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  
  // State for edited item
  const [editedItem, setEditedItem] = useState<InventoryItem | null>(null);
  
  // Update editedItem when item changes
  useEffect(() => {
    setEditedItem(item ? { ...item } : null);
    setEditMode(false);
    setTabValue(0);
  }, [item]);
  
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Handle edit mode toggle
  const handleEditToggle = () => {
    setEditMode(!editMode);
  };
  
  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditedItem(item ? { ...item } : null);
    setEditMode(false);
  };
  
  // Handle save changes
  const handleSave = () => {
    if (editedItem) {
      onSave(editedItem);
      setEditMode(false);
    }
  };
  
  // Handle text field changes
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedItem) return;
    
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: name === 'unitPrice' || name === 'quantity' || name === 'minimumQuantity'
        ? parseFloat(value) || 0
        : value,
    });
  };
  
  // Handle category change
  const handleCategoryChange = (event: SelectChangeEvent) => {
    if (!editedItem) return;
    
    const categoryId = event.target.value;
    const category = categories.find(cat => cat.id === categoryId);
    
    if (category) {
      setEditedItem({
        ...editedItem,
        category: {
          id: category.id,
          name: category.name,
          color: category.color,
        },
      });
    }
  };
  
  // Handle location change
  const handleLocationChange = (event: SelectChangeEvent) => {
    if (!editedItem) return;
    
    const locationId = event.target.value;
    const location = locations.find(loc => loc.id === locationId);
    
    if (location) {
      setEditedItem({
        ...editedItem,
        location: {
          id: location.id,
          name: location.name,
          path: location.path,
        },
      });
    }
  };
  
  // Handle status change
  const handleStatusChange = (event: SelectChangeEvent) => {
    if (!editedItem) return;
    
    const status = event.target.value as InventoryItem['status'];
    setEditedItem({
      ...editedItem,
      status,
    });
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  // If no item or loading, show loading state
  if (loading) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{ width: { xs: '100%', md: 600 }, '& .MuiDrawer-paper': { width: { xs: '100%', md: 600 } } }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
          }}
        >
          <CircularProgress size={48} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading item details...
          </Typography>
        </Box>
      </Drawer>
    );
  }
  
  if (!item || !editedItem) {
    return null;
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ width: { xs: '100%', md: 600 }, '& .MuiDrawer-paper': { width: { xs: '100%', md: 600 } } }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DrawerHeader>
          <Typography variant="h6">Item Details</Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab icon={<InfoIcon />} label="Details" />
          <Tab icon={<HistoryIcon />} label="History" />
          <Tab icon={<LabelIcon />} label="Attachments" />
        </Tabs>
        
        <DrawerContent>
          {tabValue === 0 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h5">{editedItem.name}</Typography>
                <StatusChip 
                  label={editedItem.status} 
                  status={editedItem.status}
                />
              </Box>
              
              <Grid container spacing={3}>
                {/* Left Column - Image */}
                <Grid item xs={12} md={4}>
                  <ImagePreview>
                    {editedItem.imageUrl ? (
                      <Box
                        component="img"
                        src={editedItem.imageUrl}
                        alt={editedItem.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <Box sx={{ textAlign: 'center' }}>
                        <ImageIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          No image available
                        </Typography>
                      </Box>
                    )}
                  </ImagePreview>
                  
                  <Box sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <ButtonWithIcon
                        variant="outlined"
                        color="primary"
                        size="small"
                        fullWidth
                        onClick={() => onShowQrCode(item.id)}
                        startIcon={<QrCodeIcon />}
                      >
                        QR Code
                      </ButtonWithIcon>
                      <ButtonWithIcon
                        variant="outlined"
                        color="primary"
                        size="small"
                        fullWidth
                        onClick={() => onTransfer(item.id)}
                        startIcon={<ShippingIcon />}
                      >
                        Transfer
                      </ButtonWithIcon>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <ButtonWithIcon
                        variant="outlined"
                        color="primary"
                        size="small"
                        fullWidth
                        onClick={() => onDuplicate(item.id)}
                        startIcon={<DuplicateIcon />}
                      >
                        Duplicate
                      </ButtonWithIcon>
                      <ButtonWithIcon
                        variant="outlined"
                        color="error"
                        size="small"
                        fullWidth
                        onClick={() => onDelete(item.id)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </ButtonWithIcon>
                    </Stack>
                  </Box>
                </Grid>
                
                {/* Right Column - Details */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 3 }}>
                    {!editMode ? (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={handleEditToggle}
                      >
                        Edit Item
                      </Button>
                    ) : (
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<SaveIcon />}
                          onClick={handleSave}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    )}
                  </Box>
                  
                  <Grid container spacing={2}>
                    {/* SKU */}
                    <Grid item xs={12} sm={6}>
                      {editMode ? (
                        <TextField
                          label="SKU"
                          name="sku"
                          value={editedItem.sku}
                          onChange={handleTextChange}
                          fullWidth
                          variant="outlined"
                          margin="normal"
                        />
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            SKU
                          </Typography>
                          <Typography variant="body1">
                            {editedItem.sku}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Category */}
                    <Grid item xs={12} sm={6}>
                      {editMode ? (
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="category-label">Category</InputLabel>
                          <Select
                            labelId="category-label"
                            value={editedItem.category.id}
                            label="Category"
                            onChange={handleCategoryChange}
                          >
                            {categories.map((category) => (
                              <MenuItem key={category.id} value={category.id}>
                                {category.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Category
                          </Typography>
                          <Chip
                            label={editedItem.category.name}
                            size="small"
                            sx={{
                              backgroundColor: editedItem.category.color || 'primary.light',
                              mt: 0.5,
                            }}
                          />
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Unit Price */}
                    <Grid item xs={12} sm={6}>
                      {editMode ? (
                        <TextField
                          label="Unit Price"
                          name="unitPrice"
                          type="number"
                          value={editedItem.unitPrice}
                          onChange={handleTextChange}
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          InputProps={{
                            startAdornment: <PriceIcon sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                        />
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Unit Price
                          </Typography>
                          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PriceIcon sx={{ mr: 1, color: 'action.active' }} />
                            {formatCurrency(editedItem.unitPrice)}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Quantity */}
                    <Grid item xs={12} sm={6}>
                      {editMode ? (
                        <TextField
                          label="Quantity"
                          name="quantity"
                          type="number"
                          value={editedItem.quantity}
                          onChange={handleTextChange}
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          InputProps={{
                            startAdornment: <InventoryIcon sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                        />
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Quantity
                          </Typography>
                          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                            <InventoryIcon sx={{ mr: 1, color: 'action.active' }} />
                            {editedItem.quantity} units
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Min Quantity */}
                    <Grid item xs={12} sm={6}>
                      {editMode ? (
                        <TextField
                          label="Minimum Quantity"
                          name="minimumQuantity"
                          type="number"
                          value={editedItem.minimumQuantity || 0}
                          onChange={handleTextChange}
                          fullWidth
                          variant="outlined"
                          margin="normal"
                        />
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Minimum Quantity
                          </Typography>
                          <Typography variant="body1">
                            {editedItem.minimumQuantity || 'Not set'}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Status */}
                    <Grid item xs={12} sm={6}>
                      {editMode ? (
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="status-label">Status</InputLabel>
                          <Select
                            labelId="status-label"
                            value={editedItem.status}
                            label="Status"
                            onChange={handleStatusChange}
                          >
                            <MenuItem value="In Stock">In Stock</MenuItem>
                            <MenuItem value="Low Stock">Low Stock</MenuItem>
                            <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                            <MenuItem value="On Order">On Order</MenuItem>
                            <MenuItem value="Discontinued">Discontinued</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Status
                          </Typography>
                          <StatusChip 
                            label={editedItem.status} 
                            status={editedItem.status}
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Location */}
                    <Grid item xs={12}>
                      {editMode ? (
                        <FormControl fullWidth margin="normal">
                          <InputLabel id="location-label">Location</InputLabel>
                          <Select
                            labelId="location-label"
                            value={editedItem.location.id}
                            label="Location"
                            onChange={handleLocationChange}
                          >
                            {locations.map((location) => (
                              <MenuItem key={location.id} value={location.id}>
                                {location.path.join(' > ')}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Location
                          </Typography>
                          <Typography variant="body1">
                            {editedItem.location.path.join(' > ')}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Description */}
                    <Grid item xs={12}>
                      {editMode ? (
                        <TextField
                          label="Description"
                          name="description"
                          value={editedItem.description || ''}
                          onChange={handleTextChange}
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          multiline
                          rows={4}
                        />
                      ) : (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" color="text.secondary">
                            Description
                          </Typography>
                          <Typography variant="body1">
                            {editedItem.description || 'No description provided'}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                    
                    {/* Last Updated */}
                    <Grid item xs={12}>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Last Updated
                        </Typography>
                        <Typography variant="body1">
                          {formatDate(editedItem.lastUpdated)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Transaction History</Typography>
                <Chip
                  label={`${transactions.length} transactions`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
              
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell>From/To</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <TableRow key={transaction.id} hover>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>
                            <Chip
                              label={transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                              size="small"
                              color={
                                transaction.type === 'receipt' ? 'success' :
                                transaction.type === 'transfer' ? 'primary' :
                                transaction.type === 'adjustment' ? 'warning' :
                                transaction.type === 'audit' ? 'info' : 'secondary'
                              }
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography
                              variant="body2"
                              color={transaction.quantity >= 0 ? 'success.main' : 'error.main'}
                            >
                              {transaction.quantity >= 0 ? '+' : ''}{transaction.quantity}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {transaction.from && (
                              <Typography variant="body2">
                                From: {transaction.from}
                              </Typography>
                            )}
                            {transaction.to && (
                              <Typography variant="body2">
                                To: {transaction.to}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>{transaction.user}</TableCell>
                          <TableCell>
                            <Tooltip title={transaction.notes || ''}>
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 150,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {transaction.notes || '-'}
                              </Typography>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No transaction history found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
          
          {tabValue === 2 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Attachments</Typography>
                <Button variant="outlined" startIcon={<LabelIcon />}>
                  Add Attachment
                </Button>
              </Box>
              
              <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Added By</TableCell>
                      <TableCell>Date Added</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {attachments.length > 0 ? (
                      attachments.map((attachment) => (
                        <TableRow key={attachment.id} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <DescriptionIcon sx={{ mr: 1, color: 'action.active' }} />
                              <Typography variant="body2">{attachment.name}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{attachment.type}</TableCell>
                          <TableCell>{formatFileSize(attachment.size)}</TableCell>
                          <TableCell>{attachment.addedBy}</TableCell>
                          <TableCell>{formatDate(attachment.dateAdded)}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              color="primary"
                              component="a"
                              href={attachment.url}
                              target="_blank"
                            >
                              <DownloadIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No attachments found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DrawerContent>
      </Box>
    </Drawer>
  );
};

export default ItemDetailsDrawer; 