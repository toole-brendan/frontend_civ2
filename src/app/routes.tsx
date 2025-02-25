import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { icons } from '../components/layout/Sidebar';

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
    title: 'Orders',
    path: ROUTES.ORDERS,
    icon: icons.OrdersIcon,
  },
  {
    title: 'Wallet',
    path: ROUTES.WALLET,
    icon: icons.WalletIcon,
  },
  {
    title: 'Scanner',
    path: ROUTES.SCANNER,
    icon: icons.QrCodeIcon,
  },
  {
    title: 'Partners',
    path: ROUTES.PARTNERS,
    icon: icons.PartnersIcon,
  },
  {
    title: 'Analytics',
    path: ROUTES.ANALYTICS,
    icon: icons.AnalyticsIcon,
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
        
        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
