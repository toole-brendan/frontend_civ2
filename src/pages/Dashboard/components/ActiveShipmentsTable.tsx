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
  Chip,
  Button,
  IconButton,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ActiveShipment } from '../mockData';

interface ActiveShipmentsTableProps {
  shipments: ActiveShipment[];
  onViewAll?: () => void;
  onViewDetails?: (id: string) => void;
}

export const ActiveShipmentsTable: React.FC<ActiveShipmentsTableProps> = ({
  shipments,
  onViewAll,
  onViewDetails
}) => {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Customs':
        return theme.palette.warning.main;
      case 'In Transit':
        return theme.palette.info.main;
      case 'Preparing Shipment':
        return theme.palette.primary.main;
      case 'Delivered':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Active Shipments</Typography>
            <Box>
              <Button 
                size="small" 
                onClick={onViewAll}
                sx={{ mr: 1 }}
              >
                View All ({shipments.length})
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
                <TableCell>Shipment ID</TableCell>
                <TableCell>From/To</TableCell>
                <TableCell>Items</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>ETA</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow
                  key={shipment.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 'medium' }}>
                    {shipment.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                      {shipment.from}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      → {shipment.to}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                      {shipment.items}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    ${shipment.value.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={shipment.status}
                      size="small"
                      sx={{
                        backgroundColor: `${getStatusColor(shipment.status)}20`,
                        color: getStatusColor(shipment.status),
                        fontWeight: 'medium',
                        borderRadius: '4px'
                      }}
                    />
                  </TableCell>
                  <TableCell>{shipment.eta}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => onViewDetails && onViewDetails(shipment.id)}
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ActiveShipmentsTable; 