import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { useTitle } from '@/hooks/useTitle';

const OrderShipmentTracking: React.FC = () => {
  useTitle('Order & Shipment Tracking');
  
  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 4 }}>
      <PageHeader 
        title="Order & Shipment Tracking" 
        subtitle="Track orders and shipments in real-time"
      />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Order & Shipment Tracking Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the Order & Shipment Tracking page. Implementation coming soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default OrderShipmentTracking; 