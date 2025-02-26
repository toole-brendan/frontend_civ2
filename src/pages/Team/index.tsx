import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import PageTitle from '../../components/common/PageTitle';

const TeamPage: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <PageTitle title="Team" />
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">
          Team page content will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default TeamPage; 