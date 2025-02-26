import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  SwapHoriz as TransfersIcon,
  Business as SuppliersIcon,
  Payments as PaymentsIcon,
  Notifications as AlertsIcon,
  BarChart as AnalyticsIcon,
  People as TeamIcon,
  Settings as SettingsIcon,
  QrCode as QrCodeIcon,
  Warehouse as WarehouseIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

// Define icons here instead of importing from Sidebar
export const icons = {
  DashboardIcon,
  InventoryIcon,
  TransfersIcon,
  SuppliersIcon,
  PaymentsIcon,
  AlertsIcon,
  AnalyticsIcon,
  TeamIcon,
  SettingsIcon,
  QrCodeIcon,
  WarehouseIcon,
  LogoutIcon,
} as const;

// Lazy load pages
const Dashboard = React.lazy(() => import('../pages/Dashboard/index'));
const Inventory = React.lazy(() => import('../pages/Inventory/index'));
const Transfers = React.lazy(() => import('../pages/Transfers/index'));
const Orders = React.lazy(() => import('../pages/Orders/index'));
const Wallet = React.lazy(() => import('../pages/Wallet/index'));
const Scanner = React.lazy(() => import('../pages/Scanner/index'));
const Partners = React.lazy(() => import('../pages/Partners/index'));
const Analytics = React.lazy(() => import('../pages/Analytics/index'));
const Settings = React.lazy(() => import('../pages/Settings/index'));
const Profile = React.lazy(() => import('../pages/Profile/index'));
// New pages
const Suppliers = React.lazy(() => import('../pages/Suppliers/SuppliersPage'));
const Payments = React.lazy(() => import('../pages/Payments/index'));
const Alerts = React.lazy(() => import('../pages/Alerts/index'));
const Team = React.lazy(() => import('../pages/Team/index'));
const Reports = React.lazy(() => import('../pages/Reports/index'));

export const ROUTES = {
  DASHBOARD: '/civilian/dashboard',
  INVENTORY: '/civilian/inventory',
  TRANSFERS: '/civilian/transfers',
  ORDERS: '/civilian/orders',
  WALLET: '/civilian/wallet',
  SCANNER: '/civilian/scanner',
  PARTNERS: '/civilian/partners',
  ANALYTICS: '/civilian/analytics',
  SETTINGS: '/civilian/settings',
  PROFILE: '/civilian/profile',
  // New routes
  SUPPLIERS: '/civilian/suppliers',
  PAYMENTS: '/civilian/payments',
  ALERTS: '/civilian/alerts',
  TEAM: '/civilian/team',
  // Additional routes for quick actions
  CREATE_TRANSFER: '/civilian/transfers/create',
  GENERATE_REPORT: '/civilian/reports/generate',
} as const;

export const NAV_ITEMS = [
  {
    title: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: icons.DashboardIcon,
  },
  {
    title: 'Inventory',
    path: ROUTES.INVENTORY,
    icon: icons.InventoryIcon,
  },
  {
    title: 'Transfers',
    path: ROUTES.TRANSFERS,
    icon: icons.TransfersIcon,
  },
  {
    title: 'Suppliers',
    path: ROUTES.SUPPLIERS,
    icon: icons.SuppliersIcon,
  },
  {
    title: 'Payments',
    path: ROUTES.PAYMENTS,
    icon: icons.PaymentsIcon,
  },
  {
    title: 'Alerts',
    path: ROUTES.ALERTS,
    icon: icons.AlertsIcon,
  },
  {
    title: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: icons.AnalyticsIcon,
  },
  {
    title: 'Team',
    path: ROUTES.TEAM,
    icon: icons.TeamIcon,
  },
  {
    title: 'Settings',
    path: ROUTES.SETTINGS,
    icon: icons.SettingsIcon,
  },
];

const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        
        {/* Civilian routes */}
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.INVENTORY} element={<Inventory />} />
        <Route path={ROUTES.TRANSFERS} element={<Transfers />} />
        <Route path={ROUTES.ORDERS} element={<Orders />} />
        <Route path={ROUTES.WALLET} element={<Wallet />} />
        <Route path={ROUTES.SCANNER} element={<Scanner />} />
        <Route path={ROUTES.PARTNERS} element={<Partners />} />
        <Route path={ROUTES.ANALYTICS} element={<Analytics />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        
        {/* New routes */}
        <Route path={ROUTES.SUPPLIERS} element={<Suppliers />} />
        <Route path={ROUTES.PAYMENTS} element={<Payments />} />
        <Route path={ROUTES.ALERTS} element={<Alerts />} />
        <Route path={ROUTES.TEAM} element={<Team />} />
        
        {/* Quick action routes - using existing components for now */}
        <Route path={ROUTES.CREATE_TRANSFER} element={<Transfers />} />
        <Route path={ROUTES.GENERATE_REPORT} element={<Reports />} />
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
