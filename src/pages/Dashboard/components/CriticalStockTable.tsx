import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Tooltip,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { CriticalStockItem } from '../mockData';

interface CriticalStockTableProps {
  items: CriticalStockItem[];
  onGeneratePurchaseOrders?: () => void;
  onOrder?: (sku: string) => void;
  onTransfer?: (sku: string) => void;
}

export const CriticalStockTable: React.FC<CriticalStockTableProps> = ({
  items,
  onGeneratePurchaseOrders,
  onOrder,
  onTransfer
}) => {
  const theme = useTheme();

  const getStockLevelColor = (current: number, min: number) => {
    const percentage = (current / min) * 100;
    if (percentage < 25) return theme.palette.error.main;
    if (percentage < 50) return theme.palette.warning.main;
    return theme.palette.info.main;
  };

  const getStockPercentage = (current: number, min: number) => {
    return Math.min(Math.round((current / min) * 100), 100);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Critical Low Stock Items</Typography>
            <Box>
              <Button 
                variant="contained" 
                size="small" 
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={onGeneratePurchaseOrders}
                sx={{ mr: 1 }}
              >
                Generate Purchase Orders
              </Button>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell>SKU & Name</TableCell>
                <TableCell>Stock Level</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Supplier</TableCell>
                <TableCell>Lead Time</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                const stockPercentage = getStockPercentage(item.currentStock, item.minStock);
                const stockColor = getStockLevelColor(item.currentStock, item.minStock);
                
                return (
                  <TableRow
                    key={item.sku}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {item.sku}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                        <Box sx={{ width: '100%', mb: 1, display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="caption">
                            {item.currentStock}/{item.minStock}
                          </Typography>
                          <Typography variant="caption" color={stockColor}>
                            {stockPercentage}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={stockPercentage}
                          sx={{ 
                            width: '100%', 
                            height: 6, 
                            borderRadius: 1,
                            backgroundColor: `${stockColor}20`,
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: stockColor
                            }
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.leadTime} days</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="Order">
                          <IconButton 
                            size="small" 
                            color="primary"
                            onClick={() => onOrder && onOrder(item.sku)}
                            sx={{ mr: 1 }}
                          >
                            <ShoppingCartIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Transfer">
                          <IconButton 
                            size="small" 
                            color="secondary"
                            onClick={() => onTransfer && onTransfer(item.sku)}
                          >
                            <SwapHorizIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CriticalStockTable; 