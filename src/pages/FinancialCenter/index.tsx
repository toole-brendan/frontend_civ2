import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { useTitle } from '@/hooks/useTitle';

const FinancialCenter: React.FC = () => {
  useTitle('Financial Center');
  
  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 4 }}>
      <PageHeader 
        title="Financial Center" 
        subtitle="Manage payments, invoices, and financial analytics"
      />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Financial Center Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the Financial Center page. Implementation coming soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default FinancialCenter; 