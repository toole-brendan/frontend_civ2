// Mock data for Dashboard components

// Mock data for Inventory chart with reference values
export const inventoryData = [
  { month: 'Jan', Austin: 6150, SanJose: 3380, Guadalajara: 2490, target: 6000 },
  { month: 'Feb', Austin: 6200, SanJose: 3400, Guadalajara: 2510, target: 6000 },
  { month: 'Mar', Austin: 6250, SanJose: 3420, Guadalajara: 2530, target: 6000 },
  { month: 'Apr', Austin: 6280, SanJose: 3450, Guadalajara: 2550, target: 6000 },
  { month: 'May', Austin: 6320, SanJose: 3470, Guadalajara: 2570, target: 6000 },
  { month: 'Jun', Austin: 6350, SanJose: 3480, Guadalajara: 2590, target: 6000 }
];

// Mock data for Payment chart
export const paymentData = [
  { month: 'Jan', Wire: 62000, Shell: 32000 },
  { month: 'Feb', Wire: 58000, Shell: 38000 },
  { month: 'Mar', Wire: 55000, Shell: 45000 },
  { month: 'Apr', Wire: 52000, Shell: 52000 },
  { month: 'May', Wire: 50000, Shell: 58000 },
  { month: 'Jun', Wire: 48000, Shell: 64000 }
];

// Mock data for supplier distribution
export const supplierData = [
  { name: 'Taiwan Semiconductor', value: 28, color: '#3B82F6' },
  { name: 'Shenzhen Electronics', value: 22, color: '#10B981' },
  { name: 'Korea Chip', value: 18, color: '#F59E0B' },
  { name: 'Tokyo Components', value: 12, color: '#EF4444' },
  { name: 'Other Suppliers', value: 20, color: '#8B5CF6' }
];

// Mock data for shipments
export const shipmentData = [
  { id: 'TECI-9542', from: 'Taiwan Semiconductor', to: 'Austin', value: 84250, status: 'In Customs', eta: 'Jun 28', statusColor: 'warning' },
  { id: 'TECI-9538', from: 'Shenzhen Electronics', to: 'Guadalajara', value: 18750, status: 'In Transit', eta: 'Jul 02', statusColor: 'info' },
  { id: 'TECI-9535', from: 'Austin', to: 'MediTech Devices', value: 42600, status: 'Preparing Shipment', eta: 'Jun 29', statusColor: 'secondary' }
];

// Mock data for low stock items
export const lowStockData = [
  { sku: 'IC-RF-PA5040', name: 'RF Amplifier ICs', stock: 112, max: 500, location: 'San Jose', supplier: 'Korea Chip', leadTime: '15 days', level: 'critical' },
  { sku: 'DIODE-SCH-440', name: 'Schottky Diodes', stock: 520, max: 2000, location: 'Austin', supplier: 'Shenzhen Electronics', leadTime: '12 days', level: 'warning' },
  { sku: 'CONN-USB-C', name: 'USB-C Connectors', stock: 380, max: 1200, location: 'Guadalajara', supplier: 'Taiwan Connector Co.', leadTime: '18 days', level: 'warning' }
];

// Mock data for blockchain records
export const blockchainData = [
  { hash: '0x7f9e...3b21', type: 'Inventory Receipt', items: 'Microcontrollers (2500)', parties: 'Tokyo Components → TechComponents', timestamp: '2025-02-27 09:14:22', status: 'Verified', validations: 12 },
  { hash: '0x3a4d...8c72', type: 'Smart Contract Payment', items: 'RF Components Order', parties: 'TechComponents → Korea Chip', amount: '$42,800', timestamp: '2025-02-26 14:30:05', status: 'Verified', validations: 15, savings: '$1,284' },
  { hash: '0x8b5f...2e19', type: 'Transfer Authorization', items: 'Power Controllers (1200)', parties: 'Austin → MediTech', timestamp: '2025-02-27 11:45:33', status: 'Pending', validations: 8 }
];

// Action items data with icon placeholders
export const actionItems = [
  { 
    id: 1, 
    title: 'Low Stock: RF Amplifier ICs', 
    impact: 'Impact: 3 customer orders at risk',
    severity: 'error',
    iconType: 'error' 
  },
  { 
    id: 2, 
    title: 'Shipment Delay: MX9250 Memory Controllers', 
    impact: 'Impact: Robotics Solutions order',
    severity: 'warning',
    iconType: 'shipping'
  },
  { 
    id: 3, 
    title: 'Payment Due: Invoice #TCB-2842 for $78,500', 
    impact: 'Due tomorrow',
    severity: 'info',
    iconType: 'payment'
  }
];
