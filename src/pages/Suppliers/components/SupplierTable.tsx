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
  TableSortLabel,
  IconButton,
  Chip,
  Tooltip,
  Avatar,
  Collapse,
  Typography,
  useTheme,
  Button,
  alpha,
  Grid,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import TokenIcon from '@mui/icons-material/Token';
import { Supplier } from '../types';

// Define additional properties that are used in the table but not in the Supplier type
interface ExtendedSupplier extends Omit<Supplier, 'contactInfo' | 'metrics'> {
  performanceScore?: number;
  categories?: string[];
  annualSpend?: number;
  percentOfTotalSpend?: number;
  logo?: string;
  activeOrders?: number | { count: number; value: number };
  paymentTerms?: string;
  shellTokenStatus?: string;
  contractExpiration?: string;
  blockchainVerificationStatus?: string;
  contactInfo?: {
    email: string;
    phone: string;
    primaryContact: string;
  };
  metrics?: {
    onTimeDelivery: number;
    defectRate: number;
    responseTime: number;
  };
}

interface HeadCell {
  id: keyof ExtendedSupplier | 'actions';
  label: string;
  numeric: boolean;
  sortable: boolean;
  align: 'left' | 'right' | 'center';
  width?: string;
}

interface SupplierTableProps {
  suppliers: ExtendedSupplier[];
  onViewDetails: (supplier: ExtendedSupplier) => void;
  onContactSupplier: (supplier: ExtendedSupplier) => void;
  onCreateOrder: (supplier: ExtendedSupplier) => void;
  onPaySupplier: (supplier: ExtendedSupplier) => void;
  onExpandRow: (supplierId: string) => void;
  expandedSupplierId: string | null;
}

type Order = 'asc' | 'desc';

const headCells: HeadCell[] = [
  { id: 'name', label: 'Supplier', numeric: false, sortable: true, align: 'left' },
  { id: 'performanceScore', label: 'Performance', numeric: true, sortable: true, align: 'center', width: '120px' },
  { id: 'categories', label: 'Categories', numeric: false, sortable: false, align: 'left' },
  { id: 'annualSpend', label: 'Annual Spend', numeric: true, sortable: true, align: 'right', width: '140px' },
  { id: 'activeOrders', label: 'Active Orders', numeric: true, sortable: true, align: 'center', width: '120px' },
  { id: 'paymentTerms', label: 'Payment Terms', numeric: false, sortable: true, align: 'center', width: '130px' },
  { id: 'shellTokenStatus', label: 'Shell Token', numeric: false, sortable: true, align: 'center', width: '120px' },
  { id: 'contractExpiration', label: 'Contract Expiration', numeric: false, sortable: true, align: 'center', width: '150px' },
  { id: 'blockchainVerificationStatus', label: 'Verification', numeric: false, sortable: true, align: 'center', width: '120px' },
  { id: 'actions', label: 'Actions', numeric: false, sortable: false, align: 'center', width: '120px' },
];

const SupplierTable: React.FC<SupplierTableProps> = ({
  suppliers,
  onViewDetails,
  onContactSupplier,
  onCreateOrder,
  onPaySupplier,
  onExpandRow,
  expandedSupplierId,
}) => {
  const theme = useTheme();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof ExtendedSupplier>('annualSpend');

  const handleRequestSort = (property: keyof ExtendedSupplier | 'actions') => {
    if (property === 'actions') return; // Skip sorting for actions column
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = <T extends keyof ExtendedSupplier>(
    order: Order,
    orderBy: T
  ): ((a: ExtendedSupplier, b: ExtendedSupplier) => number) => {
    return order === 'desc'
      ? (a, b) => {
          if (orderBy === 'activeOrders') {
            // Handle nested object using the type guard
            const aValue = isActiveOrdersObject(a.activeOrders) ? a.activeOrders.value : 0;
            const bValue = isActiveOrdersObject(b.activeOrders) ? b.activeOrders.value : 0;
            return bValue - aValue;
          }
          
          if (orderBy === 'categories') {
            // Handle array
            return (b.categories?.length || 0) - (a.categories?.length || 0);
          }

          // Safely handle potentially undefined values
          const bValue = b[orderBy] ?? '';
          const aValue = a[orderBy] ?? '';
          
          if (bValue < aValue) {
            return -1;
          }
          if (bValue > aValue) {
            return 1;
          }
          return 0;
        }
      : (a, b) => {
          if (orderBy === 'activeOrders') {
            // Handle nested object using the type guard
            const aValue = isActiveOrdersObject(a.activeOrders) ? a.activeOrders.value : 0;
            const bValue = isActiveOrdersObject(b.activeOrders) ? b.activeOrders.value : 0;
            return aValue - bValue;
          }
          
          if (orderBy === 'categories') {
            // Handle array
            return (a.categories?.length || 0) - (b.categories?.length || 0);
          }

          // Safely handle potentially undefined values
          const aValue = a[orderBy] ?? '';
          const bValue = b[orderBy] ?? '';
          
          if (aValue < bValue) {
            return -1;
          }
          if (aValue > bValue) {
            return 1;
          }
          return 0;
        };
  };

  const formatCurrency = (value: number | undefined) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const getPerformanceColor = (score: number | undefined) => {
    if (!score) return theme.palette.error.main;
    if (score >= 95) return theme.palette.success.main;
    if (score >= 90) return theme.palette.success.light;
    if (score >= 85) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getVerificationStatusIcon = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
      case 'PARTIALLY_VERIFIED':
        return <VerifiedIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      case 'VERIFICATION_PENDING':
        return <WarningIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />;
      default:
        return <WarningIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
    }
  };

  const getVerificationStatusText = (status: string) => {
    switch (status) {
      case 'FULLY_VERIFIED':
        return 'Fully verified';
      case 'PARTIALLY_VERIFIED':
        return 'Partially verified';
      case 'VERIFICATION_PENDING':
        return 'Verification pending';
      default:
        return 'Not verified';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Format the date
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    
    // Add expiration warning if it's within 30 days
    if (diffDays <= 30 && diffDays > 0) {
      return (
        <Tooltip title="Expiring soon">
          <Typography component="span" sx={{ color: theme.palette.warning.main }}>
            {formattedDate} <span style={{ fontWeight: 'bold' }}>(in {diffDays} days)</span>
          </Typography>
        </Tooltip>
      );
    }
    
    // Add expired warning if it's past
    if (diffDays <= 0) {
      return (
        <Tooltip title="Contract expired">
          <Typography component="span" sx={{ color: theme.palette.error.main, fontWeight: 'bold' }}>
            {formattedDate} (Expired)
          </Typography>
        </Tooltip>
      );
    }
    
    return formattedDate;
  };

  const getShellTokenStatus = (status: string) => {
    switch (status) {
      case 'ENABLED':
        return (
          <Chip 
            label="Enabled" 
            size="small" 
            sx={{ 
              backgroundColor: theme.palette.success.light,
              color: theme.palette.success.dark,
              fontWeight: 'medium',
            }} 
          />
        );
      case 'PENDING':
        return (
          <Chip 
            label="Pending" 
            size="small" 
            sx={{ 
              backgroundColor: theme.palette.warning.light,
              color: theme.palette.warning.dark,
              fontWeight: 'medium',
            }} 
          />
        );
      default:
        return (
          <Chip 
            label="Not Available" 
            size="small" 
            variant="outlined" 
            sx={{ 
              borderColor: theme.palette.grey[400],
              color: theme.palette.grey[600],
              fontWeight: 'medium',
            }} 
          />
        );
    }
  };

  // Helper function to check if activeOrders is an object with value property
  const isActiveOrdersObject = (
    activeOrders: number | { count: number; value: number } | undefined
  ): activeOrders is { count: number; value: number } => {
    return typeof activeOrders === 'object' && activeOrders !== null && 'value' in activeOrders;
  };

  const formatOrderValue = (row: ExtendedSupplier) => {
    if (!row.activeOrders) return '0';
    if (isActiveOrdersObject(row.activeOrders)) {
      return formatCurrency(row.activeOrders.value);
    }
    return '';
  };

  const renderOrderCount = (row: ExtendedSupplier) => {
    if (!row.activeOrders) return '0';
    if (isActiveOrdersObject(row.activeOrders)) {
      return row.activeOrders.count.toString();
    }
    return row.activeOrders.toString();
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
        },
      }}
    >
      <TableContainer sx={{ maxHeight: 650 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" sx={{ backgroundColor: theme.palette.background.default }} />
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id as string}
                  align={headCell.align || 'left'}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    color: theme.palette.text.primary,
                    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    py: 1.5,
                  }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                      sx={{
                        '&.MuiTableSortLabel-root': {
                          color: theme.palette.text.primary,
                        },
                        '&.MuiTableSortLabel-root:hover': {
                          color: theme.palette.primary.main,
                        },
                        '&.Mui-active': {
                          color: theme.palette.primary.main,
                        },
                        '& .MuiTableSortLabel-icon': {
                          color: `${theme.palette.primary.main} !important`,
                        },
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers
              .slice()
              .sort(getComparator(order, orderBy))
              .map((supplier) => {
                const isExpanded = expandedSupplierId === supplier.id;
                
                return (
                  <React.Fragment key={supplier.id}>
                    <TableRow
                      hover
                      sx={{
                        '&:hover': {
                          backgroundColor: `${theme.palette.action.hover} !important`,
                        },
                        cursor: 'pointer',
                        backgroundColor: isExpanded ? alpha(theme.palette.primary.light, 0.08) : 'inherit',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <TableCell padding="checkbox">
                        <IconButton
                          size="small"
                          onClick={() => onExpandRow(supplier.id)}
                          aria-label="expand row"
                        >
                          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        onClick={() => onExpandRow(supplier.id)}
                        sx={{
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.5) },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            alt={supplier.name}
                            variant="rounded"
                            sx={{ 
                              width: 36, 
                              height: 36, 
                              mr: 1.5,
                              bgcolor: theme.palette.primary.main,
                              fontSize: '1rem',
                            }}
                          >
                            {supplier.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>
                              {supplier.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                              {supplier.location?.country || 'Unknown location'}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="center"
                        onClick={() => onExpandRow(supplier.id)}
                        sx={{
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.5) },
                        }}
                      >
                        <Box 
                          sx={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: getPerformanceColor(supplier.performanceScore),
                            color: '#fff',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                          }}
                        >
                          {supplier.performanceScore || 'N/A'}
                        </Box>
                      </TableCell>
                      <TableCell 
                        onClick={() => onExpandRow(supplier.id)}
                        sx={{
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.5) },
                        }}
                      >
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, maxWidth: '100%' }}>
                          {supplier.categories && supplier.categories.length > 0 ? (
                            <>
                              {supplier.categories.slice(0, 2).map((category) => (
                                <Chip
                                  key={category}
                                  label={category}
                                  size="small"
                                  sx={{ 
                                    fontSize: '0.7rem',
                                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 'medium',
                                    maxWidth: '100%',
                                    height: 22,
                                  }}
                                />
                              ))}
                              {supplier.categories.length > 2 && (
                                <Chip
                                  label={`+${supplier.categories.length - 2}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    fontSize: '0.7rem',
                                    height: 22,
                                    borderColor: theme.palette.primary.light,
                                    color: theme.palette.primary.main,
                                  }}
                                />
                              )}
                            </>
                          ) : (
                            <Typography variant="caption" color="text.secondary">
                              No categories
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell 
                        align="right"
                        onClick={() => onExpandRow(supplier.id)}
                        sx={{
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.5) },
                        }}
                      >
                        <Typography fontWeight="medium" sx={{ color: theme.palette.text.primary }}>
                          {formatCurrency(supplier.annualSpend)}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                          {supplier.percentOfTotalSpend || 0}% of total
                        </Typography>
                      </TableCell>
                      <TableCell 
                        align="center"
                        onClick={() => onExpandRow(supplier.id)}
                        sx={{
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.5) },
                        }}
                      >
                        <Typography fontWeight="medium" sx={{ color: theme.palette.text.primary }}>
                          {isActiveOrdersObject(supplier.activeOrders) 
                            ? supplier.activeOrders.count || 0 
                            : supplier.activeOrders || 0}
                        </Typography>
                        {isActiveOrdersObject(supplier.activeOrders) && (
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                            {formatCurrency(supplier.activeOrders.value)}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell 
                        align="center"
                        onClick={() => onExpandRow(supplier.id)}
                      >
                        {supplier.paymentTerms}
                      </TableCell>
                      <TableCell 
                        align="center"
                        onClick={() => onExpandRow(supplier.id)}
                        sx={{
                          transition: 'background-color 0.2s ease',
                          '&:hover': { backgroundColor: alpha(theme.palette.action.hover, 0.5) },
                        }}
                      >
                        <Chip
                          label={supplier.shellTokenStatus || 'DISABLED'}
                          size="small"
                          color={supplier.shellTokenStatus === 'ENABLED' ? 'success' : 'default'}
                          sx={{ 
                            fontWeight: 'medium',
                            fontSize: '0.75rem',
                          }}
                        />
                      </TableCell>
                      <TableCell 
                        align="center"
                        onClick={() => onExpandRow(supplier.id)}
                      >
                        {supplier.contractExpiration ? formatDate(supplier.contractExpiration) : 'N/A'}
                      </TableCell>
                      <TableCell 
                        align="center"
                        onClick={() => onExpandRow(supplier.id)}
                      >
                        {supplier.blockchainVerificationStatus ? (
                          <Tooltip title={getVerificationStatusText(supplier.blockchainVerificationStatus)}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {getVerificationStatusIcon(supplier.blockchainVerificationStatus)}
                            </Box>
                          </Tooltip>
                        ) : 'N/A'}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          <Tooltip title="View details">
                            <IconButton
                              size="small"
                              onClick={() => onViewDetails(supplier)}
                              sx={{ 
                                color: theme.palette.primary.main,
                                '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Contact">
                            <IconButton
                              size="small"
                              onClick={() => onContactSupplier(supplier)}
                              sx={{ 
                                color: theme.palette.info.main,
                                '&:hover': { backgroundColor: alpha(theme.palette.info.main, 0.1) },
                              }}
                            >
                              <EmailIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Create order">
                            <IconButton
                              size="small"
                              onClick={() => onCreateOrder(supplier)}
                              sx={{ 
                                color: theme.palette.secondary.main,
                                '&:hover': { backgroundColor: alpha(theme.palette.secondary.main, 0.1) },
                              }}
                            >
                              <ShoppingCartIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={supplier.shellTokenStatus === 'ENABLED' ? "Pay supplier" : "Shell token not enabled"}>
                            <span> {/* Wrap in span to allow for disabled state */}
                              <IconButton
                                size="small"
                                onClick={() => onPaySupplier(supplier)}
                                sx={{ 
                                  color: theme.palette.success.main,
                                  '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.1) },
                                  '&.Mui-disabled': {
                                    color: alpha(theme.palette.success.main, 0.4),
                                  }
                                }}
                                disabled={supplier.shellTokenStatus !== 'ENABLED'}
                              >
                                <AccountBalanceWalletIcon fontSize="small" />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell 
                        style={{ paddingBottom: 0, paddingTop: 0 }} 
                        colSpan={11}
                      >
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box 
                            sx={{ 
                              p: 3, 
                              backgroundColor: alpha(theme.palette.primary.light, 0.05),
                              borderTop: `1px solid ${theme.palette.divider}`,
                              borderBottom: `1px solid ${theme.palette.divider}`,
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="h6" fontWeight="bold">
                                {supplier.name} - Expanded Details
                              </Typography>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => onViewDetails(supplier)}
                                sx={{ 
                                  borderRadius: '8px',
                                  textTransform: 'none',
                                }}
                              >
                                View Full Profile
                              </Button>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              This is a placeholder for expanded supplier details. In the actual implementation, 
                              this would include supplier tabs with specific information.
                            </Typography>
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
    </Paper>
  );
};

export default SupplierTable; 