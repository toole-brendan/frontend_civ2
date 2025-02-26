import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Autocomplete,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { TransferItem } from '../types';
import QRScanner from './QRScanner';

interface Recipient {
  id: string;
  name: string;
  rank: string;
  unit: string;
}

interface InitiateTransferFormProps {
  onSubmit: (data: {
    items: TransferItem[];
    recipient: Recipient;
    notes: string;
    files: File[];
  }) => void;
}

const InitiateTransferForm: React.FC<InitiateTransferFormProps> = ({
  onSubmit,
}) => {
  const [selectedItems, setSelectedItems] = useState<TransferItem[]>([]);
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [notes, setNotes] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  // Mock data for demonstration
  const mockRecipients: Recipient[] = [
    { id: '1', name: 'John Smith', rank: 'SGT', unit: '1st Battalion' },
    { id: '2', name: 'Jane Doe', rank: 'CPL', unit: '2nd Battalion' },
  ];

  const handleQRScan = (result: { itemId: string; serialNumber: string }) => {
    // In a real implementation, you would fetch the item details from your backend
    const mockItem: TransferItem = {
      id: result.itemId,
      name: 'Mock Item',
      serialNumber: result.serialNumber,
      currentCustodian: 'Current User',
      quantity: 1,
      unitPrice: 100,
      totalValue: 100
    };
    setSelectedItems((prev) => [...prev, mockItem]);
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((prev) => [...prev, ...Array.from(event.target.files!)]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!recipient) return;

    onSubmit({
      items: selectedItems,
      recipient,
      notes,
      files,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Initiate New Transfer" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            {/* Item Selection Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select Items
              </Typography>
              <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<QrCodeScannerIcon />}
                  onClick={() => setIsQRScannerOpen(true)}
                >
                  Scan QR to Select Item
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => {/* Open item selection modal */}}
                >
                  Select from List
                </Button>
              </Box>

              {selectedItems.length > 0 && (
                <Paper variant="outlined" sx={{ mb: 3 }}>
                  <List>
                    {selectedItems.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemText
                          primary={item.name}
                          secondary={`Serial Number: ${item.serialNumber}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Grid>

            {/* Recipient Selection */}
            <Grid item xs={12}>
              <Autocomplete
                options={mockRecipients}
                getOptionLabel={(option) =>
                  `${option.rank} ${option.name} - ${option.unit}`
                }
                value={recipient}
                onChange={(_, newValue) => setRecipient(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Recipient"
                    required
                    fullWidth
                  />
                )}
              />
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                label="Reason for Transfer"
                multiline
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                placeholder="Enter any additional notes or reasons for the transfer"
              />
            </Grid>

            {/* File Attachments */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Attach Files
              </Typography>
              <Box
                sx={{
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Files
                  </Button>
                </label>
              </Box>

              {files.length > 0 && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <List>
                    {files.map((file) => (
                      <ListItem key={file.name}>
                        <ListItemText
                          primary={file.name}
                          secondary={`${(file.size / 1024).toFixed(1)} KB`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleRemoveFile(file.name)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={selectedItems.length === 0 || !recipient}
          >
            Submit Transfer Request
          </Button>
        </Box>
      </Card>

      <QRScanner
        open={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScan={handleQRScan}
        title="Scan Item QR Code"
      />
    </form>
  );
};

export default InitiateTransferForm; 