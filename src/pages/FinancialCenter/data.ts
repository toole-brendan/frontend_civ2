// Cash flow data for financial performance charts
export const cashFlowData = [
  { month: 'Sep', revenue: 580000, expenses: 425000, profit: 155000 },
  { month: 'Oct', revenue: 620000, expenses: 435000, profit: 185000 },
  { month: 'Nov', revenue: 645000, expenses: 455000, profit: 190000 },
  { month: 'Dec', revenue: 700000, expenses: 490000, profit: 210000 },
  { month: 'Jan', revenue: 660000, expenses: 480000, profit: 180000 },
  { month: 'Feb', revenue: 720000, expenses: 505000, profit: 215000 }
];

// Payment method distribution data for pie chart
export const paymentMethodData = [
  { name: 'Shell Token', value: 57, color: '#66bb6a' },
  { name: 'Wire Transfer', value: 28, color: '#ffa726' },
  { name: 'ACH', value: 13, color: '#29b6f6' },
  { name: 'Credit Card', value: 2, color: '#ef5350' }
];

// Payment comparison data for bar chart
export const paymentComparisonData = [
  { month: 'Sep', Shell: 120000, Traditional: 92000, savings: 3600 },
  { month: 'Oct', Shell: 134000, Traditional: 98000, savings: 4020 },
  { month: 'Nov', Shell: 140000, Traditional: 105000, savings: 4200 },
  { month: 'Dec', Shell: 158000, Traditional: 110000, savings: 4740 },
  { month: 'Jan', Shell: 142000, Traditional: 108000, savings: 4260 },
  { month: 'Feb', Shell: 148500, Traditional: 111800, savings: 4455 }
];

// Upcoming payments data
export const upcomingPaymentsData = [
  {
    id: 'INV-4728',
    supplier: 'Taiwan Semiconductor',
    amount: 54250,
    dueDate: '2025-03-05',
    status: 'Due Soon',
    statusColor: 'warning',
    paymentMethod: 'Shell Token',
    potentialSavings: 1627.50
  },
  {
    id: 'INV-4722',
    supplier: 'Shenzhen Electronics',
    amount: 28750,
    dueDate: '2025-03-08',
    status: 'Due Soon',
    statusColor: 'warning',
    paymentMethod: 'Traditional Wire',
    potentialSavings: 862.50
  },
  {
    id: 'INV-4715',
    supplier: 'Korea Chip Manufacturing',
    amount: 73900,
    dueDate: '2025-03-12',
    status: 'Open',
    statusColor: 'info',
    paymentMethod: 'Shell Token',
    potentialSavings: 2217.00
  },
  {
    id: 'INV-4710',
    supplier: 'Tokyo Components',
    amount: 42600,
    dueDate: '2025-03-18',
    status: 'Open',
    statusColor: 'info',
    paymentMethod: 'ACH',
    potentialSavings: 852.00
  },
  {
    id: 'INV-4705',
    supplier: 'Malaysia Circuit Systems',
    amount: 22950,
    dueDate: '2025-03-15',
    status: 'Open',
    statusColor: 'info',
    paymentMethod: 'Traditional Wire',
    potentialSavings: 688.50
  }
];

// Recent transactions data
export const recentTransactionsData = [
  {
    id: 'TRX-63892',
    type: 'Payment',
    description: 'Payment to Taiwan Semiconductor for INV-4690',
    amount: 62850,
    date: '2025-02-28',
    method: 'Shell Token',
    status: 'Completed',
    statusColor: 'success',
    txHash: '0x7f39e458b2c4e85f1bdfla9e51d209e224a6bf3b21',
    verifications: 14
  },
  {
    id: 'TRX-63885',
    type: 'Invoice',
    description: 'Invoice received from Shenzhen Electronics',
    amount: 28750,
    date: '2025-02-27',
    method: 'N/A',
    status: 'Pending Payment',
    statusColor: 'warning',
    txHash: 'N/A',
    verifications: 0
  },
  {
    id: 'TRX-63880',
    type: 'Payment',
    description: 'Payment to Korea Chip Manufacturing for INV-4682',
    amount: 46200,
    date: '2025-02-25',
    method: 'ACH',
    status: 'Completed',
    statusColor: 'success',
    txHash: '0x5c1a7b34d1f8276c395ae12d791560f4e39c3e28',
    verifications: 12
  },
  {
    id: 'TRX-63878',
    type: 'Transfer',
    description: 'Internal fund transfer between accounts',
    amount: 150000,
    date: '2025-02-24',
    method: 'Traditional Wire',
    status: 'Completed',
    statusColor: 'success',
    txHash: 'N/A',
    verifications: 0
  },
  {
    id: 'TRX-63872',
    type: 'Payment',
    description: 'Payment to Tokyo Components for INV-4675',
    amount: 38600,
    date: '2025-02-22',
    method: 'Shell Token',
    status: 'Completed',
    statusColor: 'success',
    txHash: '0x9d48c3a17b52d6e82f5c9a4d2f13a6c8e7bd5f21',
    verifications: 15
  }
];

// Invoice data
export const invoiceData = [
  {
    id: 'INV-4728',
    supplier: 'Taiwan Semiconductor',
    description: 'Semiconductor components for Q1 2025',
    amount: 54250,
    dueDate: '2025-03-05',
    status: 'Due Soon',
    statusColor: 'warning'
  },
  {
    id: 'INV-4722',
    supplier: 'Shenzhen Electronics',
    description: 'PCB assemblies and connectors',
    amount: 28750,
    dueDate: '2025-03-08',
    status: 'Due Soon',
    statusColor: 'warning'
  },
  {
    id: 'INV-4715',
    supplier: 'Korea Chip Manufacturing',
    description: 'Custom IC chips and memory modules',
    amount: 73900,
    dueDate: '2025-03-12',
    status: 'Open',
    statusColor: 'info'
  },
  {
    id: 'INV-4710',
    supplier: 'Tokyo Components',
    description: 'Display modules and power supplies',
    amount: 42600,
    dueDate: '2025-03-18',
    status: 'Open',
    statusColor: 'info'
  },
  {
    id: 'INV-4705',
    supplier: 'Malaysia Circuit Systems',
    description: 'RF modulators and circuit boards',
    amount: 22950,
    dueDate: '2025-03-15',
    status: 'Open',
    statusColor: 'info'
  },
  {
    id: 'INV-4690',
    supplier: 'Taiwan Semiconductor',
    description: 'Microcontrollers and memory units',
    amount: 62850,
    dueDate: '2025-02-28',
    status: 'Paid',
    statusColor: 'success',
    paymentStatus: 'Paid',
    paymentStatusColor: 'success'
  },
  {
    id: 'INV-4682',
    supplier: 'Korea Chip Manufacturing',
    description: 'ASIC chips for device controllers',
    amount: 46200,
    dueDate: '2025-02-25',
    status: 'Paid',
    statusColor: 'success',
    paymentStatus: 'Paid',
    paymentStatusColor: 'success'
  }
];

// Smart contract data
export const smartContractData = [
  {
    id: 'SCC-1089',
    name: 'Taiwan Semicond. Supply Agreement',
    type: 'Supply Chain',
    parties: 'TechCorp & Taiwan Semiconductor',
    value: 320000,
    status: 'Active',
    statusColor: 'success',
    expiryDate: '2025-12-31',
    verifications: 24
  },
  {
    id: 'SCC-1085',
    name: 'Shenzhen Elec. Framework',
    type: 'Supply Chain',
    parties: 'TechCorp & Shenzhen Electronics',
    value: 275000,
    status: 'Active',
    statusColor: 'success',
    expiryDate: '2025-09-30',
    verifications: 22
  },
  {
    id: 'SCC-1081',
    name: 'Korea Chip Manufacturing Agreement',
    type: 'Supply Chain',
    parties: 'TechCorp & Korea Chip Manufacturing',
    value: 285000,
    status: 'Active',
    statusColor: 'success',
    expiryDate: '2025-06-30',
    verifications: 19
  },
  {
    id: 'SCC-1076',
    name: 'Tokyo Components Escrow Account',
    type: 'Payment Escrow',
    parties: 'TechCorp & Tokyo Components',
    value: 120000,
    status: 'Active',
    statusColor: 'success',
    expiryDate: '2025-07-15',
    verifications: 18
  },
  {
    id: 'SCC-1072',
    name: 'Malaysia CS Conditional Payment',
    type: 'Payment Terms',
    parties: 'TechCorp & Malaysia Circuit Systems',
    value: 85000,
    status: 'Pending Review',
    statusColor: 'warning',
    expiryDate: '2025-08-01',
    verifications: 16
  }
];
