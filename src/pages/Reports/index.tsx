import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import PageTitle from '../../components/common/PageTitle';

const ReportsPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <PageTitle title="Generate Report" />
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">
          Report generation interface will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default ReportsPage; 