import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import PageTitle from '../../components/common/PageTitle';

const AlertsPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <PageTitle title="Alerts" />
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">
          Alerts page content will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default AlertsPage; 