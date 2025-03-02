// Types
export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  min: number;
  max: number;
  location: string;
  supplier: string;
  leadTime: string;
  lastTransaction: string;
  value: number;
  status: string;
  critical: boolean;
  verified: boolean;
}

export interface CategoryItem {
  name: string;
  count: number;
  value: number;
  health: number;
  icon: JSX.Element;
}

// Sample data
export const inventoryStats = {
  totalSkus: 12483,
  totalValue: 4285630,
  lastVerification: 'Today, 9:15 AM'
};

export const inventoryHealth = {
  healthy: { count: 10864, percent: 87.0, value: 3425000 },
  low: { count: 1215, percent: 9.7, value: 650000 },
  critical: { count: 404, percent: 3.3, value: 210630 }
};

export const inventoryMetrics = [
  { label: 'Inventory Turnover', value: '4.2×', period: 'last 90 days' },
  { label: 'Avg Days on Hand', value: '42 days', period: '' },
  { label: 'Slow-Moving Items', value: '324 SKUs', period: '>90 days no movement' },
  { label: 'Excess Inventory Value', value: '$245,000', period: '>180 days supply' }
];

// This will be filled with React elements in the component
export const categoryConfigs = [
  { name: 'Microcontrollers', count: 1845, value: 1200000, health: 94 },
  { name: 'Passive Components', count: 3250, value: 450000, health: 88 },
  { name: 'Connectors', count: 1720, value: 320000, health: 92 },
  { name: 'Memory ICs', count: 950, value: 680000, health: 82 },
  { name: 'Power Components', count: 1140, value: 520000, health: 90 },
  { name: 'Display Modules', count: 350, value: 290000, health: 86 }
];

export const inventoryItems = [
  { 
    id: 'IC-RF-PA5040',
    name: 'RF Amplifier ICs',
    category: 'RF Components',
    stock: 112,
    min: 500,
    max: 2000,
    location: 'San Jose',
    supplier: 'Korea Chip Manufacturing',
    leadTime: '15 days',
    lastTransaction: '2025-02-25 (Outbound)',
    value: 28000,
    status: '3 customer orders affected',
    critical: true,
    verified: true
  },
  { 
    id: 'MC-MX9250',
    name: 'MX9250 Memory Controllers',
    category: 'Memory ICs',
    stock: 380,
    min: 1200,
    max: 3000,
    location: 'Austin',
    supplier: 'Taiwan Semiconductor',
    leadTime: '20 days',
    lastTransaction: '2025-02-20 (Inbound)',
    value: 47500,
    status: 'Customer order pending',
    critical: true,
    verified: true
  },
  { 
    id: 'DIO-SK8045',
    name: 'Schottky Diodes',
    category: 'Passive Components',
    stock: 520,
    min: 2000,
    max: 5000,
    location: 'Austin',
    supplier: 'Shenzhen Electronics',
    leadTime: '12 days',
    lastTransaction: '2025-02-18 (Outbound)',
    value: 5200,
    status: 'Usage rate increasing (15% MoM)',
    critical: true,
    verified: true
  },
  { 
    id: 'CONN-USB-C',
    name: 'USB-C Connectors',
    category: 'Connectors',
    stock: 380,
    min: 1200,
    max: 3000,
    location: 'Guadalajara',
    supplier: 'Taiwan Connector Co.',
    leadTime: '18 days',
    lastTransaction: '2025-02-22 (Transfer)',
    value: 3800,
    status: 'Low stock warning',
    critical: false,
    verified: true
  },
  { 
    id: 'CAP-CX400-104',
    name: 'CX400 Capacitors',
    category: 'Passive Components',
    stock: 24500,
    min: 10000,
    max: 30000,
    location: 'Multiple',
    supplier: 'Shenzhen Electronics',
    leadTime: '10 days',
    lastTransaction: '2025-02-15 (Inbound)',
    value: 12250,
    status: 'Healthy',
    critical: false,
    verified: true
  },
  { 
    id: 'MC-AX7240-T',
    name: 'AX7240 Microcontrollers',
    category: 'Microcontrollers',
    stock: 4850,
    min: 2000,
    max: 6000,
    location: 'Austin',
    supplier: 'Taiwan Semiconductor',
    leadTime: '25 days',
    lastTransaction: '2025-02-10 (Inbound)',
    value: 145500,
    status: 'Healthy',
    critical: false,
    verified: true
  },
  { 
    id: 'LCD-5540',
    name: 'LCD-5540 Displays',
    category: 'Display Modules',
    stock: 750,
    min: 200,
    max: 300,
    location: 'San Jose',
    supplier: 'Malaysia Circuit Systems',
    leadTime: '30 days',
    lastTransaction: '2025-01-05 (No movement)',
    value: 37500,
    status: 'Excess inventory (250% of max)',
    critical: false,
    verified: true
  },
];
