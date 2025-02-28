import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { useTitle } from '@/hooks/useTitle';

const InventoryManagement: React.FC = () => {
  useTitle('Inventory Management');
  
  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 4 }}>
      <PageHeader 
        title="Inventory Management" 
        subtitle="Track, manage, and optimize inventory across all locations"
      />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Inventory Management Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the Inventory Management page. Implementation coming soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default InventoryManagement; 