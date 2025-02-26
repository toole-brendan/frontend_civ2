import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Chip,
  useTheme,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import { criticalTransfers } from '../mockData';

interface CriticalTransfersPanelProps {
  onViewTransfer: (transferId: string) => void;
  onTakeAction: (transferId: string, action: string) => void;
}

const CriticalTransfersPanel: React.FC<CriticalTransfersPanelProps> = ({
  onViewTransfer,
  onTakeAction,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: theme.palette.error.light,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <WarningIcon sx={{ color: theme.palette.error.main, mr: 1 }} />
        <Typography variant="h6" fontWeight="bold" color="error.main">
          Critical Transfers
        </Typography>
      </Box>
      
      <List disablePadding>
        {criticalTransfers.map((transfer, index) => (
          <React.Fragment key={transfer.id}>
            {index > 0 && <Divider />}
            <ListItem
              alignItems="flex-start"
              sx={{
                p: 2,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => onViewTransfer(transfer.id)}
                    >
                      {transfer.id}
                    </Typography>
                    <Chip
                      label={transfer.description}
                      size="small"
                      sx={{ ml: 1, fontSize: '0.7rem' }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onTakeAction(transfer.id, transfer.suggestedAction)}
                  >
                    Take Action
                  </Button>
                </Box>
                
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                  <strong>Issue:</strong> {transfer.reason}
                </Typography>
                
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Suggested Action:</strong> {transfer.suggestedAction}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Escalation Contact:</strong>
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: '0.75rem',
                        mr: 0.5,
                        backgroundColor: theme.palette.primary.main,
                      }}
                    >
                      {transfer.escalationContact.split(',')[0].charAt(0)}
                    </Avatar>
                    <Typography variant="body2">
                      {transfer.escalationContact}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      
      <Box sx={{ p: 2, backgroundColor: theme.palette.background.default }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={() => onViewTransfer('all-critical')}
        >
          View All Critical Transfers
        </Button>
      </Box>
    </Paper>
  );
};

export default CriticalTransfersPanel; 