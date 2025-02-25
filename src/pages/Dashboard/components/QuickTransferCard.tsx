import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Autocomplete,
  MenuItem,
  Select,
  InputAdornment,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import {
  QrCodeScanner as QrCodeScannerIcon,
  Send as SendIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const CardHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  flexGrow: 1,
}));

const CardFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// Recent transfer interface
export interface RecentTransfer {
  id: string;
  itemName: string;
  quantity: number;
  recipient: string;
  timestamp: string;
}

// Component props
interface QuickTransferCardProps {
  items: Array<{ id: string; name: string; stock: number }>;
  recipients: Array<{ id: string; name: string; type: string }>;
  recentTransfers: RecentTransfer[];
  onTransfer: (itemId: string, quantity: number, recipientId: string) => void;
  onScanQR: () => void;
}

export const QuickTransferCard: React.FC<QuickTransferCardProps> = ({
  items,
  recipients,
  recentTransfers,
  onTransfer,
  onScanQR,
}) => {
  // State for form fields
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string; stock: number } | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [recipientId, setRecipientId] = useState<string>('');
  
  // Handle item change
  const handleItemChange = (
    event: React.SyntheticEvent,
    value: { id: string; name: string; stock: number } | null
  ) => {
    setSelectedItem(value);
    // Reset quantity if item changed
    if (value) {
      setQuantity(1);
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else if (selectedItem && value > selectedItem.stock) {
      setQuantity(selectedItem.stock);
    } else {
      setQuantity(value);
    }
  };
  
  // Handle recipient change
  const handleRecipientChange = (event: SelectChangeEvent) => {
    setRecipientId(event.target.value);
  };
  
  // Handle submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedItem && recipientId) {
      onTransfer(selectedItem.id, quantity, recipientId);
      // Reset form
      setSelectedItem(null);
      setQuantity(1);
      setRecipientId('');
    }
  };
  
  // Format time to relative format
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    
    if (diffMinutes < 1) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <StyledPaper>
      <CardHeader>
        <Typography variant="h6">Quick Transfer</Typography>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
            <Autocomplete
              options={items}
              getOptionLabel={(option) => option.name}
              value={selectedItem}
              onChange={handleItemChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Item"
                  placeholder="Type or scan item"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Typography variant="body1">{option.name}</Typography>
                  <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                    (Stock: {option.stock})
                  </Typography>
                </li>
              )}
              sx={{ flexGrow: 1 }}
            />
            <IconButton 
              color="primary" 
              onClick={onScanQR}
              sx={{ mt: 0.5 }}
            >
              <QrCodeScannerIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{
                inputProps: { min: 1, max: selectedItem?.stock || 999 }
              }}
              disabled={!selectedItem}
              size="small"
              sx={{ width: '30%' }}
            />
            
            <Select
              value={recipientId}
              onChange={handleRecipientChange}
              displayEmpty
              renderValue={(selected) => {
                if (!selected) {
                  return <Typography color="text.secondary">Select Recipient</Typography>;
                }
                const recipient = recipients.find(r => r.id === selected);
                return recipient ? recipient.name : '';
              }}
              sx={{ flexGrow: 1 }}
              size="small"
            >
              <MenuItem disabled value="">
                <em>Select Recipient</em>
              </MenuItem>
              {recipients.map((recipient) => (
                <MenuItem key={recipient.id} value={recipient.id}>
                  <Typography variant="body1">{recipient.name}</Typography>
                  <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                    ({recipient.type})
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            startIcon={<SendIcon />}
            disabled={!selectedItem || !recipientId}
          >
            Transfer Now
          </Button>
        </form>
        
        <Divider sx={{ my: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Recent Transfers
          </Typography>
        </Divider>
        
        <List>
          {recentTransfers.slice(0, 3).map((transfer) => (
            <ListItem key={transfer.id} alignItems="flex-start" sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.light' }}>
                  <ArrowForwardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <strong>{transfer.quantity}x</strong> {transfer.itemName}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      To: {transfer.recipient}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatRelativeTime(transfer.timestamp)}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </StyledPaper>
  );
};

export default QuickTransferCard; 