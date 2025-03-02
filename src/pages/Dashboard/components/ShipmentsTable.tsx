import React from 'react';
import { Box, Button } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { TableCard, StatusChip } from '@/components/common';
import { shipmentData } from '../data';
import { DataTableColumn } from '@/components/common/DataTable';

const ShipmentsTable: React.FC = () => {
  // Define the table columns
  const columns: DataTableColumn[] = [
    { id: 'id', label: 'Shipment ID', field: 'id' },
    { id: 'from', label: 'From', field: 'from' },
    { id: 'to', label: 'To', field: 'to' },
    { 
      id: 'value', 
      label: 'Value', 
      align: 'right',
      renderCell: (row) => `$${row.value.toLocaleString()}`
    },
    { 
      id: 'status', 
      label: 'Status',
      renderCell: (row) => (
        <StatusChip 
          label={row.status} 
          status={row.statusColor} 
          size="small"
          variant="filled"
        />
      )
    },
    { id: 'eta', label: 'ETA', field: 'eta' }
  ];

  return (
    <TableCard
      title="Active Shipments"
      subtitle="All ongoing shipments and ETA status"
      columns={columns}
      data={shipmentData}
      maxHeight={300}
      toolbarActions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="outlined" startIcon={<TuneIcon fontSize="small" />}>
            Filter
          </Button>
          <Button size="small" variant="outlined">View All (18)</Button>
        </Box>
      }
      sx={{ height: '100%' }}
    />
  );
};

export default ShipmentsTable;
