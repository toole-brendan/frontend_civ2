import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Tooltip,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { ScanResult, ScanMode } from '../types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

interface ScanHistoryTableProps {
  scanHistory: ScanResult[];
  onViewDetails: (scan: ScanResult) => void;
}

const ScanHistoryTable: React.FC<ScanHistoryTableProps> = ({
  scanHistory,
  onViewDetails,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const getActionChipColor = (action?: ScanMode) => {
    switch (action) {
      case 'INVENTORY':
        return 'primary';
      case 'TRANSFER':
        return 'secondary';
      case 'RECEIPT':
        return 'success';
      case 'SHIPPING':
        return 'info';
      case 'VERIFICATION':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'success';
      case 'UNVERIFIED':
        return 'warning';
      case 'FAILED':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredHistory = scanHistory.filter(scan => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      scan.id.toLowerCase().includes(lowerCaseQuery) ||
      scan.productId.toLowerCase().includes(lowerCaseQuery) ||
      scan.location.toLowerCase().includes(lowerCaseQuery) ||
      scan.scannedBy.toLowerCase().includes(lowerCaseQuery) ||
      (scan.scanMode && scan.scanMode.toLowerCase().includes(lowerCaseQuery))
    );
  });

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Scan History</Typography>
        <TextField
          placeholder="Search scans..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
      </Box>
      
      <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Product ID</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredHistory.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    No scan history found
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              filteredHistory.map((scan) => (
                <StyledTableRow key={scan.id}>
                  <StyledTableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {formatDate(scan.timestamp)}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Tooltip title={scan.productId}>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                        {scan.productId}
                      </Typography>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Chip
                      label={scan.scanMode || 'UNKNOWN'}
                      size="small"
                      color={getActionChipColor(scan.scanMode) as any}
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2">{scan.location}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography variant="body2">{scan.scannedBy}</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {scan.status === 'VERIFIED' ? (
                        <CheckCircleIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
                      ) : (
                        <ErrorIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
                      )}
                      <Typography variant="body2">
                        {scan.status}
                      </Typography>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        size="small"
                        onClick={() => onViewDetails(scan)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ScanHistoryTable; 