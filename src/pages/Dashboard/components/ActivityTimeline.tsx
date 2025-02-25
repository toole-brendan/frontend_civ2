import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  Avatar,
  Chip,
  Divider,
  styled,
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Payment as PaymentIcon,
  ShoppingCart as OrderIcon,
  Send as TransferIcon,
  Person as UserIcon,
  Settings as SystemIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { Activity } from '../mockData';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const TimelineHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/* eslint-disable @typescript-eslint/no-unused-vars */
const TimelineContent = styled(Box)(({ theme }) => ({
  padding: '0 8px 0 12px',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const TimelineItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 28,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: theme.palette.divider,
    zIndex: 1,
  },
  '&:last-child::before': {
    display: 'none',
  },
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  zIndex: 2,
  marginRight: theme.spacing(2),
}));

const TimelineContent2 = styled(Box)(({ theme }) => ({
  padding: '8px 8px 8px 12px',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const TimelineTimestamp = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.75rem',
}));

const TimelineItemId = styled(Chip)(({ theme }) => ({
  height: 24,
  fontSize: '0.75rem',
  marginTop: theme.spacing(1),
}));

/* eslint-enable @typescript-eslint/no-unused-vars */

// Get icon based on activity type
const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'inventory':
      return <InventoryIcon />;
    case 'transaction':
      return <PaymentIcon />;
    case 'order':
      return <OrderIcon />;
    case 'transfer':
      return <TransferIcon />;
    case 'user':
      return <UserIcon />;
    case 'system':
      return <SystemIcon />;
    default:
      return <SystemIcon />;
  }
};

// Get color based on activity type
const getActivityColor = (type: Activity['type'], theme: any) => {
  switch (type) {
    case 'inventory':
      return theme.palette.info.main;
    case 'transaction':
      return theme.palette.success.main;
    case 'order':
      return theme.palette.warning.main;
    case 'transfer':
      return theme.palette.secondary.main;
    case 'user':
      return theme.palette.primary.main;
    case 'system':
      return theme.palette.grey[600];
    default:
      return theme.palette.grey[600];
  }
};

interface ActivityTimelineProps {
  activities: Activity[];
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onViewAll: () => void;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  onViewAll,
}) => {
  return (
    <StyledPaper>
      <TimelineHeader>
        <Typography variant="h6">Activity Timeline</Typography>
      </TimelineHeader>
      <TimelineContent>
        <List disablePadding>
          {activities.map((activity, index) => {
            const timestamp = new Date(activity.timestamp);
            return (
              <React.Fragment key={activity.id}>
                {index > 0 && <Divider component="li" variant="inset" />}
                <TimelineItem>
                  {activity.userAvatar ? (
                    <Avatar 
                      src={activity.userAvatar} 
                      alt={activity.user} 
                      sx={{ 
                        width: 40, 
                        height: 40, 
                        mr: 2,
                        zIndex: 2 
                      }} 
                    />
                  ) : (
                    <TimelineDot
                      sx={{
                        bgcolor: (theme) => getActivityColor(activity.type, theme),
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </TimelineDot>
                  )}
                  <TimelineContent2>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle2">{activity.user || 'System'}</Typography>
                      <TimelineTimestamp>{formatDistanceToNow(timestamp, { addSuffix: true })}</TimelineTimestamp>
                    </Box>
                    <Typography variant="body2">{activity.message}</Typography>
                    {activity.itemId && (
                      <TimelineItemId 
                        label={activity.itemId} 
                        size="small" 
                        variant="outlined"
                      />
                    )}
                  </TimelineContent2>
                </TimelineItem>
              </React.Fragment>
            );
          })}
        </List>
      </TimelineContent>
    </StyledPaper>
  );
}; 