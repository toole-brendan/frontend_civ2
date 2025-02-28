import React from 'react';
import { createBrowserRouter, RouterProvider, RouteObject, Outlet } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  Business as BusinessIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// Define icons here for use in navigation
export const icons = {
  DashboardIcon,
  InventoryIcon,
  ShippingIcon,
  BusinessIcon,
  AccountBalanceWalletIcon,
  SettingsIcon,
} as const;

// Layouts
import MainLayout from '../components/layout/MainLayout';

// Lazy load new consolidated pages
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const InventoryManagement = React.lazy(() => import('../pages/InventoryManagement'));
const OrderShipmentTracking = React.lazy(() => import('../pages/OrderShipmentTracking'));
const SupplierHub = React.lazy(() => import('../pages/SupplierHub'));
const FinancialCenter = React.lazy(() => import('../pages/FinancialCenter'));
const Settings = React.lazy(() => import('../pages/Settings'));

// Routes constants
export const ROUTES = {
  DASHBOARD: '/',
  INVENTORY: '/inventory',
  ORDERS_SHIPMENTS: '/orders-shipments',
  SUPPLIERS: '/suppliers',
  FINANCIAL: '/financial',
  SETTINGS: '/settings',
} as const;

// Navigation items for sidebar
export const NAV_ITEMS = [
  {
    title: 'Command Center',
    path: ROUTES.DASHBOARD,
    icon: icons.DashboardIcon,
  },
  {
    title: 'Inventory Management',
    path: ROUTES.INVENTORY,
    icon: icons.InventoryIcon,
  },
  {
    title: 'Orders & Shipments',
    path: ROUTES.ORDERS_SHIPMENTS,
    icon: icons.ShippingIcon,
  },
  {
    title: 'Supplier Hub',
    path: ROUTES.SUPPLIERS,
    icon: icons.BusinessIcon,
  },
  {
    title: 'Financial Center',
    path: ROUTES.FINANCIAL,
    icon: icons.AccountBalanceWalletIcon,
  },
  {
    title: 'Settings',
    path: ROUTES.SETTINGS,
    icon: icons.SettingsIcon,
  },
];

// Define the routes for the application
const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </React.Suspense>
        ),
      },
      {
        path: ROUTES.INVENTORY,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <InventoryManagement />
          </React.Suspense>
        ),
      },
      {
        path: ROUTES.ORDERS_SHIPMENTS,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <OrderShipmentTracking />
          </React.Suspense>
        ),
      },
      {
        path: ROUTES.SUPPLIERS,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <SupplierHub />
          </React.Suspense>
        ),
      },
      {
        path: ROUTES.FINANCIAL,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <FinancialCenter />
          </React.Suspense>
        ),
      },
      {
        path: ROUTES.SETTINGS,
        element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <Settings />
          </React.Suspense>
        ),
      },
    ],
  },
];

// Define the base URL for the router
const BASE_URL = '/civilian';

// Create router instance with the correct basename
const router = createBrowserRouter(routes, {
  basename: BASE_URL
});

// AppRoutes component that uses RouterProvider
const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
