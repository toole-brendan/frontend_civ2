import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { useTitle } from '@/hooks/useTitle';

const SupplierHub: React.FC = () => {
  useTitle('Supplier Hub');
  
  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 4 }}>
      <PageHeader 
        title="Supplier Hub" 
        subtitle="Manage suppliers, contracts, and procurement"
      />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Supplier Hub Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the Supplier Hub page. Implementation coming soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default SupplierHub; 