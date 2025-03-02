import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  type: 'transfer' | 'alert' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationsState {
  items: Notification[];
}

// Mock data for notifications
const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'transfer',
    title: 'Transfer Request #TR-2458',
    message: 'New transfer request from Warehouse A to Warehouse B requires your approval',
    timestamp: '2025-03-01T14:30:00Z',
    read: false,
    actionUrl: '/transfers/TR-2458'
  },
  {
    id: '2',
    type: 'transfer',
    title: 'Transfer Request #TR-2459',
    message: 'Transfer of 24 items from San Jose to Austin has been initiated',
    timestamp: '2025-03-01T13:15:00Z',
    read: false,
    actionUrl: '/transfers/TR-2459'
  },
  {
    id: '3',
    type: 'transfer',
    title: 'Transfer Request #TR-2457',
    message: 'Transfer to Guadalajara warehouse has been completed',
    timestamp: '2025-03-01T10:45:00Z',
    read: false,
    actionUrl: '/transfers/TR-2457'
  }
];

const initialState: NotificationsState = {
  items: initialNotifications,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(notification => {
        notification.read = true;
      });
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'read'>>) => {
      state.items.unshift({
        ...action.payload,
        read: false
      });
    }
  }
});

export const { markAsRead, markAllAsRead, addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;

// Selectors
export const selectNotifications = (state: { notifications: NotificationsState }) => state.notifications.items;
export const selectUnreadCount = (state: { notifications: NotificationsState }) => 
  state.notifications.items.filter(item => !item.read).length;
