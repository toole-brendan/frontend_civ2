import React from 'react';
import { Box, Card, Typography, SxProps, Theme } from '@mui/material';

export interface DashboardCardProps {
  title: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, content, children, sx }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx 
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: 1, 
          borderColor: 'divider',
          backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box 
        sx={{ 
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
        }}
      >
        {content || children}
      </Box>
    </Card>
  );
}; 