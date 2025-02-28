import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  useTheme
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';
import AssessmentIcon from '@mui/icons-material/Assessment';

const QuickAccessShortcuts: React.FC = () => {
  const theme = useTheme();
  
  // Shortcuts data
  const shortcuts = [
    {
      id: 1,
      name: 'Scan Inventory',
      icon: <QrCodeScannerIcon fontSize="large" />,
      color: theme.palette.primary.main,
      action: () => console.log('Scan Inventory clicked')
    },
    {
      id: 2,
      name: 'Create Transfer',
      icon: <CompareArrowsIcon fontSize="large" />,
      color: theme.palette.success.main,
      action: () => console.log('Create Transfer clicked')
    },
    {
      id: 3,
      name: 'Generate Order',
      icon: <AddShoppingCartIcon fontSize="large" />,
      color: theme.palette.info.main,
      action: () => console.log('Generate Order clicked')
    },
    {
      id: 4,
      name: 'Process Payment',
      icon: <PaymentsIcon fontSize="large" />,
      color: theme.palette.warning.main,
      action: () => console.log('Process Payment clicked')
    },
    {
      id: 5,
      name: 'View Reports',
      icon: <AssessmentIcon fontSize="large" />,
      color: theme.palette.secondary.main,
      action: () => console.log('View Reports clicked')
    }
  ];
  
  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" gutterBottom>
        Quick Access
      </Typography>
      
      <Grid container spacing={2} justifyContent="center">
        {shortcuts.map((shortcut) => (
          <Grid item key={shortcut.id}>
            <Paper
              elevation={0}
              onClick={shortcut.action}
              sx={{
                width: 120,
                height: 120,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                  borderColor: shortcut.color,
                  '& .MuiSvgIcon-root': {
                    color: shortcut.color
                  }
                }
              }}
            >
              <Box 
                sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 1,
                  transition: 'color 0.2s ease-in-out'
                }}
              >
                {shortcut.icon}
              </Box>
              <Typography 
                variant="body2" 
                align="center"
                sx={{ fontWeight: 500 }}
              >
                {shortcut.name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuickAccessShortcuts; 