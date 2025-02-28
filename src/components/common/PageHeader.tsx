import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * PageHeader component that provides consistent spacing and styling for all page headers
 * This component ensures that all page headers (Dashboard, Inventory, Transfers, etc.)
 * have the same spacing from the sidebar and app bar.
 */
const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  actions,
  children 
}) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        mb: 3, 
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        flexWrap: { xs: 'wrap', md: 'nowrap' },
        gap: 2
      }}>
        <Box>
          <Typography variant="h5" component="h1" gutterBottom={!!subtitle}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        
        {actions && (
          <Box sx={{ mt: { xs: 1, md: 0 } }}>
            {actions}
          </Box>
        )}
      </Box>
      
      {children}
    </Box>
  );
};

export default PageHeader; 