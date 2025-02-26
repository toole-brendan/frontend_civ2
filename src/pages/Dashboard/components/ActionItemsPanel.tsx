import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import { ActionItem } from '../mockData';

interface ActionItemsPanelProps {
  items: ActionItem[];
  onViewAll?: () => void;
  onComplete?: (id: string) => void;
}

export const ActionItemsPanel: React.FC<ActionItemsPanelProps> = ({
  items,
  onViewAll,
  onComplete
}) => {
  const theme = useTheme();
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleToggle = (id: string) => () => {
    const currentIndex = checkedItems.indexOf(id);
    const newChecked = [...checkedItems];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedItems(newChecked);
    if (currentIndex === -1 && onComplete) {
      onComplete(id);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'low-stock':
        return <WarningIcon />;
      case 'shipment-delay':
        return <LocalShippingIcon />;
      case 'payment-due':
        return <PaymentIcon />;
      default:
        return <WarningIcon />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Action Items</Typography>
            <Box>
              <Button 
                size="small" 
                onClick={onViewAll}
                sx={{ mr: 1 }}
              >
                View All
              </Button>
              <IconButton size="small">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        }
      />
      <CardContent>
        <List sx={{ width: '100%', p: 0 }}>
          {items.map((item, index) => {
            const labelId = `action-item-${item.id}`;
            const severityColor = getSeverityColor(item.severity);

            return (
              <React.Fragment key={item.id}>
                {index > 0 && <Divider component="li" />}
                <ListItem
                  alignItems="flex-start"
                  dense
                  sx={{ 
                    py: 2,
                    backgroundColor: checkedItems.indexOf(item.id) !== -1 
                      ? alpha(theme.palette.success.main, 0.05)
                      : 'transparent'
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Box 
                      sx={{ 
                        color: severityColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: alpha(severityColor, 0.1),
                        borderRadius: '50%',
                        p: 1
                      }}
                    >
                      {getIcon(item.type)}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 'bold',
                          color: checkedItems.indexOf(item.id) !== -1 
                            ? theme.palette.text.disabled
                            : theme.palette.text.primary,
                          textDecoration: checkedItems.indexOf(item.id) !== -1 
                            ? 'line-through'
                            : 'none'
                        }}
                      >
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <div
                          style={{ 
                            color: checkedItems.indexOf(item.id) !== -1 
                              ? theme.palette.text.disabled
                              : theme.palette.text.secondary,
                            fontSize: '0.875rem'
                          }}
                        >
                          {item.description}
                        </div>
                        <div
                          style={{ 
                            marginTop: '4px',
                            color: severityColor,
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        >
                          Impact: {item.impact}
                        </div>
                      </React.Fragment>
                    }
                  />
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(item.id)}
                    checked={checkedItems.indexOf(item.id) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItem>
              </React.Fragment>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default ActionItemsPanel; 