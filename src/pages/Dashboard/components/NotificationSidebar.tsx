import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  Badge,
  IconButton,
  useTheme
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BusinessIcon from '@mui/icons-material/Business';
import PaymentsIcon from '@mui/icons-material/Payments';
import VerifiedIcon from '@mui/icons-material/Verified';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const NotificationSidebar: React.FC = () => {
  const theme = useTheme();
  
  // Notifications data
  const notifications = [
    {
      id: 1,
      type: 'inventory',
      title: 'Low stock alert for RF Amplifiers',
      time: '2 hours ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'inventory',
      title: 'MX9250 Memory Controllers below safety stock',
      time: '4 hours ago',
      priority: 'high',
      read: false
    },
    {
      id: 3,
      type: 'shipment',
      title: 'TECI-9542 shipment delayed in customs',
      time: '6 hours ago',
      priority: 'medium',
      read: false
    },
    {
      id: 4,
      type: 'supplier',
      title: 'Shenzhen Electronics updated pricing',
      time: '1 day ago',
      priority: 'low',
      read: true
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment due for Tokyo Components',
      time: '1 day ago',
      priority: 'medium',
      read: true
    }
  ];
  
  // Activity data
  const activities = [
    {
      id: 1,
      user: 'Sarah',
      avatar: '/assets/images/avatars/sarah.jpg',
      action: 'approved Taiwan Semiconductor shipment receipt',
      time: '9:15 AM',
      verified: true
    },
    {
      id: 2,
      user: 'David',
      avatar: '/assets/images/avatars/david.jpg',
      action: 'initiated stock transfer from Austin to San Jose',
      time: '8:42 AM',
      verified: true
    },
    {
      id: 3,
      user: 'System',
      avatar: null,
      action: 'generated low stock alert for RF Amplifiers',
      time: 'Yesterday, 5:30 PM',
      verified: true
    },
    {
      id: 4,
      user: 'Michael',
      avatar: '/assets/images/avatars/michael.jpg',
      action: 'processed payment to Tokyo Components',
      time: 'Yesterday, 4:15 PM',
      verified: true
    },
    {
      id: 5,
      user: 'QC',
      avatar: null,
      action: 'completed for Guadalajara incoming shipment',
      time: 'Yesterday, 2:30 PM',
      verified: true
    }
  ];
  
  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'inventory':
        return <InventoryIcon />;
      case 'shipment':
        return <LocalShippingIcon />;
      case 'supplier':
        return <BusinessIcon />;
      case 'payment':
        return <PaymentsIcon />;
      default:
        return <NotificationsIcon />;
    }
  };
  
  // Get color for notification priority
  const getNotificationColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };
  
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Notifications Header */}
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Notifications
          </Typography>
          <Badge 
            badgeContent={notifications.filter(n => !n.read).length} 
            color="error"
          >
            <NotificationsIcon color="action" />
          </Badge>
        </Box>
        <Typography variant="body2" color="text.secondary">
          5 new alerts since yesterday
        </Typography>
      </Box>
      
      {/* Notifications List */}
      <List 
        sx={{ 
          p: 0,
          overflow: 'auto',
          flexGrow: 0,
          maxHeight: '40%'
        }}
      >
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            {index > 0 && <Divider component="li" />}
            <ListItem 
              alignItems="flex-start"
              sx={{ 
                py: 1.5,
                px: 2,
                bgcolor: notification.read 
                  ? 'transparent' 
                  : `${getNotificationColor(notification.priority)}10`,
                '&:hover': {
                  bgcolor: theme.palette.action.hover
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 40, 
                  color: getNotificationColor(notification.priority),
                  mt: 0.5
                }}
              >
                {getNotificationIcon(notification.type)}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: notification.read ? 400 : 500,
                        pr: 1
                      }}
                    >
                      {notification.title}
                    </Typography>
                    <Chip 
                      label={notification.priority} 
                      size="small"
                      sx={{ 
                        height: 20,
                        fontSize: '0.625rem',
                        bgcolor: `${getNotificationColor(notification.priority)}20`,
                        color: getNotificationColor(notification.priority),
                        borderRadius: 1
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    component="span"
                  >
                    {notification.time}
                  </Typography>
                }
              />
              <IconButton 
                size="small" 
                edge="end" 
                sx={{ ml: 1, mt: -0.5 }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      
      <Divider />
      
      {/* Activity Header */}
      <Box 
        sx={{ 
          p: 2, 
          borderBottom: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper
        }}
      >
        <Typography variant="h6">
          Recent Activity
        </Typography>
      </Box>
      
      {/* Activity Feed */}
      <List 
        sx={{ 
          p: 0,
          overflow: 'auto',
          flexGrow: 1
        }}
      >
        {activities.map((activity, index) => (
          <React.Fragment key={activity.id}>
            {index > 0 && <Divider component="li" />}
            <ListItem 
              alignItems="flex-start"
              sx={{ 
                py: 1.5,
                px: 2,
                '&:hover': {
                  bgcolor: theme.palette.action.hover
                }
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={activity.avatar || undefined} 
                  alt={activity.user}
                  sx={{ width: 36, height: 36 }}
                >
                  {!activity.avatar && activity.user.charAt(0)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="body2" 
                      component="span"
                      sx={{ fontWeight: 500 }}
                    >
                      {activity.user}
                    </Typography>
                    {activity.verified && (
                      <VerifiedIcon 
                        color="primary" 
                        fontSize="small" 
                        sx={{ ml: 0.5, width: 16, height: 16 }} 
                      />
                    )}
                  </Box>
                }
                secondary={
                  <>
                    <Typography 
                      variant="body2" 
                      color="text.primary"
                      component="span"
                    >
                      {activity.action}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      component="div"
                    >
                      {activity.time}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
      
      {/* Blockchain Status */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Blockchain Verification
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Last block: 2 minutes ago
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CheckCircleIcon color="success" sx={{ mr: 1 }} />
          <Typography variant="caption" color="success.main">
            12/12 nodes active
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationSidebar; 