import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  Autocomplete,
  Grid,
  Divider,
  styled,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import {
  Close as CloseIcon,
  Send as SendIcon,
  ContactMail as ContactIcon,
  AccountBalanceWallet as WalletIcon,
  Check as CheckIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2, 3),
  },
}));

const BalanceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

interface Recipient {
  id: string;
  name: string;
  type: 'customer' | 'supplier' | 'internal';
  walletAddress?: string;
}

interface TransferModalProps {
  open: boolean;
  onClose: () => void;
  currentBalance: number;
  recipients: Recipient[];
  onTransfer: (data: {
    amount: number;
    recipientId: string;
    recipientType: string;
    notes: string;
  }) => Promise<boolean>;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  open,
  onClose,
  currentBalance,
  recipients,
  onTransfer,
}) => {
  const [amount, setAmount] = useState<number | string>('');
  const [recipientId, setRecipientId] = useState('');
  const [recipientType, setRecipientType] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{
    amount?: string;
    recipientId?: string;
    recipientType?: string;
  }>({});
  const [transferStatus, setTransferStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [filteredRecipients, setFilteredRecipients] = useState<Recipient[]>([]);

  const isLoading = transferStatus === 'loading';

  useEffect(() => {
    if (recipientType) {
      setFilteredRecipients(
        recipients.filter((recipient) => recipient.type === recipientType)
      );
    } else {
      setFilteredRecipients(recipients);
    }
  }, [recipientType, recipients]);

  const resetForm = () => {
    setAmount('');
    setRecipientId('');
    setRecipientType('');
    setNotes('');
    setErrors({});
    setTransferStatus('idle');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = (): boolean => {
    const newErrors: {
      amount?: string;
      recipientId?: string;
      recipientType?: string;
    } = {};

    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    } else if (Number(amount) > currentBalance) {
      newErrors.amount = 'Amount exceeds available balance';
    }

    if (!recipientType) {
      newErrors.recipientType = 'Recipient type is required';
    }

    if (!recipientId) {
      newErrors.recipientId = 'Recipient is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setTransferStatus('loading');

    try {
      const success = await onTransfer({
        amount: Number(amount),
        recipientId,
        recipientType,
        notes,
      });

      if (success) {
        setTransferStatus('success');
        // Reset form after a successful transfer, but keep the modal open to show success
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setTransferStatus('error');
      }
    } catch (error) {
      setTransferStatus('error');
    }
  };

  const handleRecipientTypeChange = (event: SelectChangeEvent) => {
    setRecipientType(event.target.value);
    setRecipientId(''); // Reset recipient when type changes
    if (errors.recipientType) {
      setErrors({ ...errors, recipientType: undefined });
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    if (errors.amount) {
      setErrors({ ...errors, amount: undefined });
    }
  };

  const selectedRecipient = recipients.find((r) => r.id === recipientId);

  return (
    <StyledDialog
      open={open}
      onClose={isLoading ? undefined : handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="transfer-dialog-title"
    >
      <DialogTitle id="transfer-dialog-title" sx={{ m: 0, p: 2 }}>
        <Typography variant="h6">Transfer Funds</Typography>
        {!isLoading && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      
      <DialogContent dividers>
        {transferStatus === 'success' ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Transfer Successful
            </Typography>
            <Typography variant="body1" color="textSecondary">
              ${amount} has been transferred to {selectedRecipient?.name}.
            </Typography>
          </Box>
        ) : transferStatus === 'error' ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Transfer Failed
            </Typography>
            <Typography variant="body1" color="textSecondary">
              There was an error processing your transfer. Please try again.
            </Typography>
          </Box>
        ) : (
          <>
            <BalanceBox>
              <WalletIcon sx={{ mr: 1, color: 'primary.dark' }} />
              <Box>
                <Typography variant="body2" color="primary.dark">
                  Available Balance
                </Typography>
                <Typography variant="h6" color="primary.dark">
                  ${currentBalance.toFixed(2)}
                </Typography>
              </Box>
            </BalanceBox>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.recipientType}>
                  <InputLabel id="recipient-type-label">Recipient Type</InputLabel>
                  <Select
                    labelId="recipient-type-label"
                    value={recipientType}
                    label="Recipient Type"
                    onChange={handleRecipientTypeChange}
                    disabled={isLoading}
                  >
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="supplier">Supplier</MenuItem>
                    <MenuItem value="internal">Internal Account</MenuItem>
                  </Select>
                  {errors.recipientType && (
                    <FormHelperText>{errors.recipientType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  options={filteredRecipients}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  disabled={!recipientType || isLoading}
                  onChange={(_, newValue) => {
                    setRecipientId(newValue ? newValue.id : '');
                    if (errors.recipientId) {
                      setErrors({ ...errors, recipientId: undefined });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Recipient"
                      error={!!errors.recipientId}
                      helperText={errors.recipientId}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <InputAdornment position="start">
                              <ContactIcon />
                            </InputAdornment>
                            {params.InputProps.startAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={isLoading}
                  placeholder="Add a note for this transfer (optional)"
                />
              </Grid>
            </Grid>

            {selectedRecipient && selectedRecipient.walletAddress && (
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Recipient Wallet Address
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}
                >
                  {selectedRecipient.walletAddress}
                </Typography>
              </Box>
            )}
          </>
        )}
      </DialogContent>
      
      <DialogActions>
        {transferStatus === 'idle' && (
          <>
            <Button onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <SendIcon />}
            >
              Transfer Funds
            </Button>
          </>
        )}
        {transferStatus === 'success' && (
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        )}
        {transferStatus === 'error' && (
          <>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Try Again
            </Button>
          </>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default TransferModal; 