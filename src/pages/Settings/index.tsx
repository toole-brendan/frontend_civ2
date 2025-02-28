import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHeader from '@/components/common/PageHeader';
import { useTitle } from '@/hooks/useTitle';

const Settings: React.FC = () => {
  useTitle('Settings');
  
  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4 }, pb: 4 }}>
      <PageHeader 
        title="Settings" 
        subtitle="Configure application preferences and user settings"
      />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Settings Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is a placeholder for the Settings page. Implementation coming soon.
        </Typography>
      </Box>
    </Container>
  );
};

export default Settings; 