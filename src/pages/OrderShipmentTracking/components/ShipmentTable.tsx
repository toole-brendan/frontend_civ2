import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Typography,
  Button,
  IconButton,
  LinearProgress,
  Tooltip,
  alpha,
  useTheme
} from '@mui/material';

// Icons
import ReceiptIcon from '@mui/icons-material/Receipt';
import VerifiedIcon from '@mui/icons-material/Verified';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RouteIcon from '@mui/icons-material/Route';
import DoneIcon from '@mui/icons-material/Done';
import RefreshIcon from '@mui/icons-material/Refresh';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

// Types
import { Shipment } from '../data';

interface ShipmentTableProps {
  filteredData: Shipment[];
  page: number;
  rowsPerPage: number;
  selectedShipment: Shipment | null;
  onRowClick: (shipment: Shipment) => void;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearFilters: () => void;
}

const ShipmentTable: React.FC<ShipmentTableProps> = ({
  filteredData,
  page,
  rowsPerPage,
  selectedShipment,
  onRowClick,
  onChangePage,
  onChangeRowsPerPage,
  onClearFilters
}) => {
  const theme = useTheme();

  // Get status chip color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing':
        return 'secondary';
      case 'in-transit':
        return 'info';
      case 'in-customs':
        return 'warning';
      case 'delivered':
      case 'completed':
        return 'success';
      case 'delayed':
        return 'error';
      default:
        return 'default';
    }
  };

  // Get icon based on shipment type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inbound':
        return <SouthIcon fontSize="small" />;
      case 'outbound':
        return <NorthIcon fontSize="small" />;
      case 'internal':
        return <SwapHorizIcon fontSize="small" />;
      default:
        return undefined;
    }
  };

  return (
    <>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>ID / Reference</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Origin → Destination</TableCell>
              <TableCell>Items</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Est. Delivery</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((shipment) => (
                  <TableRow 
                    key={shipment.id} 
                    hover
                    onClick={() => onRowClick(shipment)}
                    sx={{ 
                      cursor: 'pointer',
                      bgcolor: selectedShipment?.id === shipment.id ? alpha('#90caf9', 0.1) : 'inherit'
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        {shipment.blockchainVerified && (
                          <Tooltip title="Blockchain Verified">
                            <VerifiedIcon 
                              fontSize="small" 
                              color="primary"
                              sx={{ mr: 1, mt: 0.3 }}
                            />
                          </Tooltip>
                        )}
                        <Box>
                          <Typography variant="subtitle2">{shipment.id}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {shipment.referenceNumber}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
                        icon={getTypeIcon(shipment.type)}
                        sx={{ 
                          bgcolor: alpha(
                            shipment.type === 'inbound' ? theme.palette.info.main : 
                            shipment.type === 'outbound' ? theme.palette.warning.main :
                            theme.palette.secondary.main, 0.15
                          ),
                          border: '1px solid',
                          borderColor: alpha(
                            shipment.type === 'inbound' ? theme.palette.info.main : 
                            shipment.type === 'outbound' ? theme.palette.warning.main :
                            theme.palette.secondary.main, 0.3
                          ),
                          color: 'text.primary'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{shipment.origin}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        → {shipment.destination}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {shipment.totalItems} {shipment.totalItems === 1 ? 'Item' : 'Items'}
                      </Typography>
                      <Box component="span" sx={{ display: 'block', color: 'text.secondary', fontSize: 'body2.fontSize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {shipment.items[0].name}
                        {shipment.items.length > 1 ? ` +${shipment.items.length - 1} more` : ''}
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      ${shipment.value.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ mb: 0.5 }}>
                          <Chip
                            size="small"
                            label={shipment.statusText}
                            color={getStatusColor(shipment.status)}
                            sx={{ height: 24 }}
                          />
                        </Box>
                        {shipment.alerts > 0 && (
                          <Box>
                            <Chip
                              size="small"
                              label={`${shipment.alerts} ${shipment.alerts === 1 ? 'Alert' : 'Alerts'}`}
                              color="error"
                              variant="outlined"
                              sx={{ height: 20 }}
                            />
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {shipment.actualDelivery ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <DoneIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">
                            {new Date(shipment.actualDelivery).toLocaleDateString()}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2">
                          {new Date(shipment.estimatedDelivery).toLocaleDateString()}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: '100%' }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={shipment.progress} 
                          color={
                            shipment.status === 'delayed' ? 'error' :
                            shipment.status === 'delivered' || shipment.status === 'completed' ? 'success' :
                            shipment.status === 'in-customs' ? 'warning' : 'primary'
                          }
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Track shipment action
                        }}
                      >
                        <RouteIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          // View documents action
                        }}
                      >
                        <ReceiptIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          // More options action
                        }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">No shipments found matching your criteria</Typography>
                  <Button variant="text" sx={{ mt: 1 }} startIcon={<RefreshIcon />} onClick={onClearFilters}>
                    Clear Filters
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
      />
    </>
  );
};

export default ShipmentTable;
