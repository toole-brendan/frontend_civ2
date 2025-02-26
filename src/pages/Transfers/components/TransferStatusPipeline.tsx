import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import { Transfer } from '../types';
import { transferStatusPipeline } from '../mockData';

interface TransferStatusPipelineProps {
  transfers: Transfer[];
  onTransferClick: (transfer: Transfer) => void;
  onStatusChange?: (transferId: string, newStatus: string) => void;
}

const TransferStatusPipeline: React.FC<TransferStatusPipelineProps> = ({
  transfers,
  onTransferClick,
  onStatusChange,
}) => {
  const theme = useTheme();

  // Group transfers by status
  const transfersByStatus = transfers.reduce((acc, transfer) => {
    if (!acc[transfer.status]) {
      acc[transfer.status] = [];
    }
    acc[transfer.status].push(transfer);
    return acc;
  }, {} as Record<string, Transfer[]>);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return theme.palette.info.light;
      case 'IN_PREPARATION':
        return theme.palette.info.main;
      case 'IN_TRANSIT':
        return theme.palette.primary.main;
      case 'IN_CUSTOMS':
        return theme.palette.warning.main;
      case 'QUALITY_CHECK':
        return theme.palette.secondary.main;
      case 'AWAITING_APPROVAL':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Get transfer type color
  const getTransferTypeColor = (type: string) => {
    switch (type) {
      case 'INBOUND':
        return theme.palette.primary.main;
      case 'OUTBOUND':
        return theme.palette.secondary.main;
      case 'INTERNAL':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Format status label
  const formatStatusLabel = (status: string) => {
    return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Transfer Status Pipeline
      </Typography>
      
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ display: 'flex', minWidth: 1200, pb: 1 }}>
          {transferStatusPipeline.map((statusGroup) => (
            <Box
              key={statusGroup.status}
              sx={{
                width: `${100 / transferStatusPipeline.length}%`,
                minWidth: 280,
                px: 1,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  mb: 2,
                  backgroundColor: theme.palette.background.default,
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: getStatusColor(statusGroup.status),
                      mr: 1,
                    }}
                  />
                  <Typography variant="subtitle2">
                    {formatStatusLabel(statusGroup.status)}
                  </Typography>
                </Box>
                <Chip
                  label={statusGroup.count}
                  size="small"
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    fontWeight: 'bold',
                  }}
                />
              </Paper>

              <Box sx={{ height: 'calc(100vh - 400px)', overflowY: 'auto', pr: 1 }}>
                {transfersByStatus[statusGroup.status]?.map((transfer) => (
                  <Card
                    key={transfer.id}
                    sx={{
                      mb: 2,
                      cursor: 'pointer',
                      borderLeft: `4px solid ${getTransferTypeColor(transfer.type)}`,
                      '&:hover': {
                        boxShadow: 3,
                      },
                    }}
                    onClick={() => onTransferClick(transfer)}
                  >
                    <CardHeader
                      title={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {transfer.id}
                          </Typography>
                          {transfer.priority === 'HIGH' && (
                            <Tooltip title="High Priority">
                              <PriorityHighIcon color="error" fontSize="small" />
                            </Tooltip>
                          )}
                        </Box>
                      }
                      subheader={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {transfer.from.name}
                          </Typography>
                          <ArrowForwardIcon sx={{ mx: 0.5, fontSize: 12, color: theme.palette.text.secondary }} />
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {transfer.to.name}
                          </Typography>
                        </Box>
                      }
                      action={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {transfer.blockchainTxId && (
                            <Tooltip title="Blockchain Verified">
                              <VerifiedIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                            </Tooltip>
                          )}
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                      sx={{ pb: 0 }}
                    />
                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Key Items:
                        </Typography>
                        <Typography variant="body2" noWrap>
                          {transfer.items.map(item => item.name).join(', ')}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Value:
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(transfer.totalValue)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Expected:
                          </Typography>
                          <Typography variant="body2">
                            {formatDate(transfer.expectedArrival, { month: 'short', day: 'numeric' })}
                          </Typography>
                        </Box>
                      </Box>
                      
                      {transfer.smartContract && (
                        <Chip
                          label={`${transfer.smartContract.paymentMethod} Payment`}
                          size="small"
                          sx={{ mt: 1, fontSize: '0.7rem' }}
                          variant="outlined"
                        />
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {(!transfersByStatus[statusGroup.status] || transfersByStatus[statusGroup.status].length === 0) && (
                  <Box
                    sx={{
                      height: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: `1px dashed ${theme.palette.divider}`,
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      No transfers in this status
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default TransferStatusPipeline; 