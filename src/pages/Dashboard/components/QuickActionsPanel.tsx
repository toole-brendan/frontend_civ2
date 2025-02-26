import React from 'react';
import { Box, Button, Card, CardContent, Typography, useTheme, alpha } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import PaymentIcon from '@mui/icons-material/Payment';
import DescriptionIcon from '@mui/icons-material/Description';

interface QuickActionsPanelProps {
  onScanQR?: () => void;
  onCreatePayment?: () => void;
  onCreateContract?: () => void;
}

export const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({
  onScanQR,
  onCreatePayment,
  onCreateContract
}) => {
  const theme = useTheme();

  const actions = [
    {
      title: 'Scan QR Code',
      description: 'Scan inventory or shipment',
      icon: <QrCodeScannerIcon fontSize="large" />,
      color: theme.palette.primary.main,
      onClick: onScanQR
    },
    {
      title: 'Create Payment',
      description: 'Shell token or traditional',
      icon: <PaymentIcon fontSize="large" />,
      color: theme.palette.success.main,
      onClick: onCreatePayment
    },
    {
      title: 'Create Contract',
      description: 'Set up smart contract',
      icon: <DescriptionIcon fontSize="large" />,
      color: theme.palette.secondary.main,
      onClick: onCreateContract
    }
  ];

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="contained"
              fullWidth
              size="large"
              startIcon={action.icon}
              onClick={action.onClick}
              sx={{
                backgroundColor: action.color,
                '&:hover': {
                  backgroundColor: alpha(action.color, 0.8)
                },
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {action.title}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {action.description}
                </Typography>
              </Box>
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActionsPanel; 