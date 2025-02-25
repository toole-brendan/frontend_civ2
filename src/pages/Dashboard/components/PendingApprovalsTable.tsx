import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Tooltip,
  TablePagination,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  FilterList as FilterListIcon,
  Circle as CircleIcon,
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

const TableHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const TableFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// Types
export interface ApprovalItem {
  id: string;
  itemName: string;
  quantity: number;
  source: string;
  destination: string;
  value: number;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

interface PendingApprovalsTableProps {
  items: ApprovalItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewAll: () => void;
}

// Priority color mapping
const getPriorityColor = (priority: ApprovalItem['priority']) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'primary';
  }
};

// Format value as currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const PendingApprovalsTable: React.FC<PendingApprovalsTableProps> = ({
  items,
  onApprove,
  onReject,
  onViewAll,
}) => {
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  // State for filter menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  
  // Handle menu open/close
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Handle filter change
  const handleFilterChange = (value: 'all' | 'high' | 'medium' | 'low') => {
    setFilter(value);
    setPage(0);
    handleMenuClose();
  };
  
  // Filter items based on selected filter
  const filteredItems = items.filter(item => 
    filter === 'all' ? true : item.priority === filter
  );
  
  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Calculate pagination
  const paginatedItems = filteredItems.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <StyledPaper>
      <TableHeader>
        <Typography variant="h6">Pending Approvals</Typography>
        <IconButton onClick={handleMenuOpen}>
          <FilterListIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleFilterChange('all')}>
            All Priorities
          </MenuItem>
          <MenuItem onClick={() => handleFilterChange('high')}>
            <CircleIcon sx={{ color: 'error.main', mr: 1, fontSize: 12 }} />
            High Priority
          </MenuItem>
          <MenuItem onClick={() => handleFilterChange('medium')}>
            <CircleIcon sx={{ color: 'warning.main', mr: 1, fontSize: 12 }} />
            Medium Priority
          </MenuItem>
          <MenuItem onClick={() => handleFilterChange('low')}>
            <CircleIcon sx={{ color: 'success.main', mr: 1, fontSize: 12 }} />
            Low Priority
          </MenuItem>
        </Menu>
      </TableHeader>
      
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell>From/To</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CircleIcon 
                        sx={{ 
                          color: `${getPriorityColor(item.priority)}.main`, 
                          mr: 1, 
                          fontSize: 12 
                        }} 
                      />
                      {item.itemName}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell>
                    <Tooltip title="Source">
                      <Typography variant="body2">{item.source}</Typography>
                    </Tooltip>
                    <Tooltip title="Destination">
                      <Typography variant="body2" color="text.secondary">
                        {item.destination}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{formatCurrency(item.value)}</TableCell>
                  <TableCell>
                    {new Date(item.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <Tooltip title="Approve">
                        <IconButton 
                          size="small" 
                          color="success" 
                          onClick={() => onApprove(item.id)}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton 
                          size="small" 
                          color="error" 
                          onClick={() => onReject(item.id)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No pending approvals found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TableFooter>
        <TablePagination
          component="div"
          count={filteredItems.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
        <Button color="primary" onClick={onViewAll}>
          View All
        </Button>
      </TableFooter>
    </StyledPaper>
  );
};

export default PendingApprovalsTable; 