import React from 'react';
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
  TableSortLabel,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  styled,
  LinearProgress,
  linearProgressClasses,
  alpha,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const TableHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Custom styled progress bar
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 3,
    backgroundColor: theme.palette.primary.main,
  },
}));

// Types for product performance data
interface ProductData {
  id: string;
  name: string;
  imageUrl?: string;
  origin: string;
  category: string;
  sales: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  inventory: number;
  trend: number;
  rating: number;
}

// Props for the component
interface ProductPerformanceProps {
  title: string;
  data: ProductData[];
  onProductClick?: (productId: string) => void;
}

// Type for sorting
type Order = 'asc' | 'desc';
type OrderBy = keyof ProductData;

const ProductPerformance: React.FC<ProductPerformanceProps> = ({
  title,
  data,
  onProductClick,
}) => {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<OrderBy>('revenue');

  // Handle sort request
  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Stable sort function
  function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // Comparator function
  function getComparator<Key extends keyof ProductData>(
    order: Order,
    orderBy: Key,
  ): (a: ProductData, b: ProductData) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // Descending comparator
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  // Helper function to render trend indicator
  const renderTrend = (trend: number) => {
    if (trend === 0) return null;
    const color = trend > 0 ? 'success.main' : 'error.main';
    const Icon = trend > 0 ? ArrowUpward : ArrowDownward;
    
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', color }}>
        <Icon fontSize="small" sx={{ mr: 0.5 }} />
        <Typography variant="body2" sx={{ fontWeight: 'medium', color }}>
          {Math.abs(trend)}%
        </Typography>
      </Box>
    );
  };

  // Helper function to render profit margin
  const renderProfitMargin = (margin: number) => {
    let color = 'primary.main';
    if (margin < 15) color = 'error.main';
    else if (margin < 25) color = 'warning.main';
    else if (margin >= 35) color = 'success.main';

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', mr: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2">{margin}%</Typography>
        </Box>
        <BorderLinearProgress
          variant="determinate"
          value={margin}
          sx={{
            [`& .${linearProgressClasses.bar}`]: {
              backgroundColor: color,
            },
          }}
        />
      </Box>
    );
  };

  // Render category chip
  const renderCategory = (category: string) => {
    let color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default' = 'default';
    
    switch (category) {
      case 'Single Origin':
        color = 'primary';
        break;
      case 'Blend':
        color = 'secondary';
        break;
      case 'Espresso':
        color = 'error';
        break;
      case 'Decaf':
        color = 'info';
        break;
      case 'Specialty':
        color = 'success';
        break;
      default:
        color = 'default';
    }
    
    return <Chip label={category} color={color} size="small" />;
  };

  return (
    <StyledPaper elevation={0}>
      <TableHeader>
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </TableHeader>
      
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table stickyHeader aria-label="product performance table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'origin'}
                  direction={orderBy === 'origin' ? order : 'asc'}
                  onClick={() => handleRequestSort('origin')}
                >
                  Origin
                </TableSortLabel>
              </TableCell>
              <TableCell>Category</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'sales'}
                  direction={orderBy === 'sales' ? order : 'asc'}
                  onClick={() => handleRequestSort('sales')}
                >
                  Sales
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'revenue'}
                  direction={orderBy === 'revenue' ? order : 'asc'}
                  onClick={() => handleRequestSort('revenue')}
                >
                  Revenue
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'profitMargin'}
                  direction={orderBy === 'profitMargin' ? order : 'asc'}
                  onClick={() => handleRequestSort('profitMargin')}
                >
                  Profit Margin
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'trend'}
                  direction={orderBy === 'trend' ? order : 'asc'}
                  onClick={() => handleRequestSort('trend')}
                >
                  Trend
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(data, getComparator(order, orderBy)).map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={product.imageUrl || undefined}
                      alt={product.name}
                      variant="rounded"
                      sx={{ width: 40, height: 40, mr: 2, bgcolor: 'primary.light' }}
                    >
                      {product.name.charAt(0)}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {product.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{product.origin}</TableCell>
                <TableCell>{renderCategory(product.category)}</TableCell>
                <TableCell>{product.sales.toLocaleString()} kg</TableCell>
                <TableCell>${product.revenue.toLocaleString()}</TableCell>
                <TableCell>{renderProfitMargin(product.profitMargin)}</TableCell>
                <TableCell>{renderTrend(product.trend)}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View product details">
                    <IconButton
                      size="small"
                      onClick={() => onProductClick && onProductClick(product.id)}
                    >
                      <OpenInNewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};

export default ProductPerformance; 