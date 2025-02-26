import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ReceiptIcon from '@mui/icons-material/Receipt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PrintIcon from '@mui/icons-material/Print';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Transfer } from '../types';

interface TransferActionsPanelProps {
  selectedTransfer: Transfer | null;
  onUpdateStatus: (transfer: Transfer, newStatus: string) => void;
  onAddTracking: (transfer: Transfer) => void;
  onProcessReceipt: (transfer: Transfer) => void;
  onVerifyContents: (transfer: Transfer) => void;
  onGenerateDocuments: (transfer: Transfer) => void;
  onTriggerPayment: (transfer: Transfer) => void;
  onRequestVerification: (transfer: Transfer, step: string) => void;
}

const TransferActionsPanel: React.FC<TransferActionsPanelProps> = ({
  selectedTransfer,
  onUpdateStatus,
  onAddTracking,
  onProcessReceipt,
  onVerifyContents,
  onGenerateDocuments,
  onTriggerPayment,
  onRequestVerification,
}) => {
  const theme = useTheme();

  if (!selectedTransfer) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: '100%',
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" color="text.secondary" align="center">
          Select a transfer to view actions
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ p: 2, backgroundColor: theme.palette.primary.main }}>
        <Typography variant="h6" fontWeight="bold" color="white">
          Transfer Actions
        </Typography>
      </Box>

      {/* Context-specific actions */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Available Actions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<UpdateIcon />}
            fullWidth
            onClick={() => onUpdateStatus(selectedTransfer, 'next')}
          >
            Update Status
          </Button>
          <Button
            variant="outlined"
            startIcon={<LocalShippingIcon />}
            fullWidth
            onClick={() => onAddTracking(selectedTransfer)}
            disabled={!['SCHEDULED', 'IN_PREPARATION'].includes(selectedTransfer.status)}
          >
            Add Tracking Information
          </Button>
          <Button
            variant="outlined"
            startIcon={<ReceiptIcon />}
            fullWidth
            onClick={() => onProcessReceipt(selectedTransfer)}
            disabled={!['IN_TRANSIT', 'IN_CUSTOMS', 'QUALITY_CHECK'].includes(selectedTransfer.status)}
          >
            Process Receipt
          </Button>
          <Button
            variant="outlined"
            startIcon={<VerifiedUserIcon />}
            fullWidth
            onClick={() => onVerifyContents(selectedTransfer)}
            disabled={selectedTransfer.status !== 'QUALITY_CHECK'}
          >
            Verify Contents
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            fullWidth
            onClick={() => onGenerateDocuments(selectedTransfer)}
          >
            Generate Documents
          </Button>
          {selectedTransfer.smartContract && (
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              fullWidth
              onClick={() => onTriggerPayment(selectedTransfer)}
              disabled={selectedTransfer.smartContract.paymentStatus !== 'PENDING' || 
                        selectedTransfer.status !== 'COMPLETED'}
              color="secondary"
            >
              Trigger Payment
            </Button>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Transfer participants */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Transfer Participants
        </Typography>
        <List dense disablePadding>
          <ListItem>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 28, height: 28 }}>
                <BusinessIcon fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight="medium">
                  {selectedTransfer.from.name}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  Sender • {selectedTransfer.from.location}
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 28, height: 28 }}>
                <BusinessIcon fontSize="small" />
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight="medium">
                  {selectedTransfer.to.name}
                </Typography>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  Recipient • {selectedTransfer.to.location}
                </Typography>
              }
            />
          </ListItem>
          {selectedTransfer.timeline && selectedTransfer.timeline.some(event => event.actor.includes('Logistics') || event.actor.includes('Freight')) && (
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: theme.palette.warning.main, width: 28, height: 28 }}>
                  <LocalShippingIcon fontSize="small" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="medium">
                    {selectedTransfer.timeline.find(event => 
                      event.actor.includes('Logistics') || event.actor.includes('Freight'))?.actor}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    Carrier/Logistics Provider
                  </Typography>
                }
              />
            </ListItem>
          )}
          {selectedTransfer.timeline && selectedTransfer.timeline.some(event => event.actor.includes('Broker')) && (
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: theme.palette.info.main, width: 28, height: 28 }}>
                  <PersonIcon fontSize="small" />
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="medium">
                    {selectedTransfer.timeline.find(event => event.actor.includes('Broker'))?.actor}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    Customs Broker
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Box>

      <Divider />

      {/* Verification Status */}
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Verification Status
        </Typography>
        {selectedTransfer.verifications ? (
          <List dense disablePadding>
            {selectedTransfer.verifications.map((verification, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {verification.verified ? (
                    <VerifiedIcon color="success" fontSize="small" />
                  ) : (
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        border: `2px solid ${theme.palette.divider}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      {verification.step.replace(/_/g, ' ')}
                    </Typography>
                  }
                  secondary={
                    verification.verified ? (
                      <Typography variant="caption" color="text.secondary">
                        Verified by {verification.verifier}
                      </Typography>
                    ) : (
                      <Button
                        variant="text"
                        size="small"
                        color="primary"
                        onClick={() => onRequestVerification(selectedTransfer, verification.step)}
                        sx={{ fontSize: '0.7rem', p: 0, minWidth: 'auto' }}
                      >
                        Request Verification
                      </Button>
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No verification data available
          </Typography>
        )}
      </Box>

      {/* Special handling requirements */}
      {selectedTransfer.items.some(item => 
        item.name.includes('Microcontroller') || 
        item.name.includes('IC') || 
        item.name.includes('Semiconductor')
      ) && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Special Handling Requirements
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedTransfer.items.some(item => item.name.includes('IC')) && (
                <Chip 
                  label="Temperature Monitoring" 
                  size="small" 
                  color="warning" 
                  variant="outlined" 
                />
              )}
              {selectedTransfer.items.some(item => 
                item.name.includes('Microcontroller') || 
                item.name.includes('Semiconductor')
              ) && (
                <Chip 
                  label="Anti-Static Verification" 
                  size="small" 
                  color="error" 
                  variant="outlined" 
                />
              )}
              <Chip 
                label="Manufacturer Verification" 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label="Batch Tracking" 
                size="small" 
                color="info" 
                variant="outlined" 
              />
            </Box>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default TransferActionsPanel; 