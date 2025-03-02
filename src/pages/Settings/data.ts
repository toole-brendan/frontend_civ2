// Mock data for the Settings page

// Mock data for warehouse locations
export const warehouseLocations = [
  { id: 1, name: 'Austin TX', address: '2500 Longhorn Blvd, Austin, TX 78758', isActive: true },
  { id: 2, name: 'San Jose CA', address: '150 Technology Drive, San Jose, CA 95110', isActive: true },
  { id: 3, name: 'Guadalajara MX', address: 'Av. Chapultepec 15, Guadalajara, 44100, Mexico', isActive: true }
];

// Mock data for connected systems
export const connectedSystems = [
  { id: 1, name: 'NetSuite ERP', status: 'Connected', lastSync: '2025-02-27 08:15:22', type: 'ERP' },
  { id: 2, name: 'SAP Warehouse Management', status: 'Connected', lastSync: '2025-02-27 09:30:45', type: 'WMS' },
  { id: 3, name: 'Salesforce CRM', status: 'Connected', lastSync: '2025-02-27 10:22:18', type: 'CRM' },
  { id: 4, name: 'ShipStation', status: 'Error', lastSync: '2025-02-26 14:55:30', type: 'Shipping' }
];

// Mock data for notification channels
export const notificationChannels = [
  { id: 1, type: 'Email', destination: 'michael.chen@techcomponents.com', enabled: true },
  { id: 2, type: 'Mobile App', destination: 'Michael\'s iPhone', enabled: true },
  { id: 3, type: 'SMS', destination: '+1 (512) 555-1234', enabled: false },
  { id: 4, type: 'Slack', destination: '#inventory-alerts', enabled: true }
];

// Mock data for blockchain networks
export const blockchainNetworks = [
  { id: 1, name: 'Ethereum Mainnet', status: 'Active', default: true },
  { id: 2, name: 'Polygon', status: 'Active', default: false },
  { id: 3, name: 'Solana', status: 'Inactive', default: false },
  { id: 4, name: 'Avalanche', status: 'Active', default: false }
];

// Mock user security data
export const securitySettings = {
  twoFactorEnabled: true,
  lastPasswordChange: '2025-01-15',
  loginHistory: [
    { device: 'MacBook Pro (Austin)', ip: '192.168.1.45', timestamp: '2025-02-27 08:42:15' },
    { device: 'iPhone 15 Pro', ip: '172.22.45.10', timestamp: '2025-02-26 19:15:33' },
    { device: 'Chrome / Windows', ip: '192.168.32.110', timestamp: '2025-02-25 15:30:22' }
  ]
};

// Default form values for settings
export const defaultFormValues = {
  fullName: 'Michael Chen',
  email: 'michael.chen@techcomponents.com',
  phone: '+1 (512) 555-8976',
  position: 'Operations Director',
  language: 'English',
  theme: 'dark',
  currentPassword: '••••••••••••',
  newPassword: '',
  confirmPassword: '',
  autoLogout: 30,
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  criticalAlerts: true,
  lowStockAlerts: true,
  paymentAlerts: true,
  blockchainNotifications: true,
  defaultBlockchain: 'Ethereum Mainnet',
  shellTokenEnabled: true,
  automaticVerification: true,
  minVerifications: 12,
  timeZone: 'America/Chicago'
};
