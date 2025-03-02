import { createTheme } from '@mui/material';

// Interfaces for data types
export interface Supplier {
  id: number;
  name: string;
  logo: string;
  location: string;
  spendPercentage: number;
  annualSpend: number;
  onTimeDelivery: number;
  categories: string[];
  verificationStatus: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  performance: number;
  pendingOrders: number;
  activeContracts: number;
  paymentTerms: string;
  shellTokenEnabled: boolean;
  qualityScore: number;
  responseTime: string;
  leadTimeAvg: number;
  lastOrder: string;
  riskScore: string;
  yearsSince: number;
  timezone: string;
}

export interface PerformanceDataItem {
  month: string;
  quality: number;
  delivery: number;
  pricing: number;
  response: number;
}

export interface LeadTimeDataItem {
  month: string;
  current: number;
  industry: number;
}

export interface QualityDataItem {
  name: string;
  supplier: number;
  industry: number;
}

export interface ActiveOrder {
  id: string;
  date: string;
  items: string;
  quantity: string;
  amount: number;
  status: string;
  delivery: string;
  paymentStatus: string;
}

export interface SuppliedComponent {
  id: string;
  name: string;
  category: string;
  price: number;
  leadTime: string;
  moq: number;
  stock: number;
  alternativeAvailable: boolean;
  lifecycle: string;
}

export interface Contract {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  value: number | null;
  paymentTerms: string | null;
  categories: string[];
  blockchainVerified: boolean;
  renewalReminder: boolean;
  specialTerms: string;
}

export interface CommunicationHistoryItem {
  id: number;
  date: string;
  type: string;
  subject: string;
  contact: string;
  summary: string;
  status: string;
}

export interface OrderHistoryDataItem {
  month: string;
  value: number;
}

export interface ComponentMixDataItem {
  name: string;
  value: number;
  color: string;
}

export interface PriceTrendDataItem {
  month: string;
  price: number;
}

export interface PaymentMethodDataItem {
  name: string;
  value: number;
  color: string;
}

export interface UpcomingEvent {
  title: string;
  date: string;
  type: string;
}

// Sample data - Key suppliers
export const suppliers: Supplier[] = [
  { 
    id: 1, 
    name: 'Taiwan Semiconductor', 
    logo: 'TS',
    location: 'Taipei, Taiwan',
    spendPercentage: 28,
    annualSpend: 2350000,
    onTimeDelivery: 94.3,
    categories: ['Microcontrollers', 'Memory ICs'],
    verificationStatus: 'Verified',
    contactName: 'Li Wei Chen',
    contactEmail: 'l.chen@taiwansemi.com',
    contactPhone: '+886 2 1234 5678',
    performance: 92,
    pendingOrders: 3,
    activeContracts: 2,
    paymentTerms: 'Net 45',
    shellTokenEnabled: true,
    qualityScore: 96.2,
    responseTime: '4 hours',
    leadTimeAvg: 15,
    lastOrder: '2025-02-15',
    riskScore: 'Low',
    yearsSince: 7,
    timezone: 'GMT+8'
  },
  { 
    id: 2, 
    name: 'Shenzhen Electronics', 
    logo: 'SE',
    location: 'Shenzhen, China',
    spendPercentage: 22,
    annualSpend: 1850000,
    onTimeDelivery: 91.7,
    categories: ['Passive Components', 'Connectors'],
    verificationStatus: 'Verified',
    contactName: 'Zhang Wei',
    contactEmail: 'zhang.wei@shenzhenelec.com',
    contactPhone: '+86 755 8765 4321',
    performance: 88,
    pendingOrders: 5,
    activeContracts: 1,
    paymentTerms: 'Net 30',
    shellTokenEnabled: true,
    qualityScore: 92.8,
    responseTime: '8 hours',
    leadTimeAvg: 12,
    lastOrder: '2025-02-20',
    riskScore: 'Low',
    yearsSince: 5,
    timezone: 'GMT+8'
  },
  { 
    id: 3, 
    name: 'Korea Chip Manufacturing', 
    logo: 'KC',
    location: 'Seoul, South Korea',
    spendPercentage: 18,
    annualSpend: 1510000,
    onTimeDelivery: 96.2,
    categories: ['RF Components', 'Power ICs'],
    verificationStatus: 'Pending',
    contactName: 'Kim Min-jun',
    contactEmail: 'minjun.kim@koreachip.co.kr',
    contactPhone: '+82 2 9876 5432',
    performance: 90,
    pendingOrders: 2,
    activeContracts: 1,
    paymentTerms: 'Net 30',
    shellTokenEnabled: false,
    qualityScore: 94.5,
    responseTime: '6 hours',
    leadTimeAvg: 14,
    lastOrder: '2025-02-18',
    riskScore: 'Medium',
    yearsSince: 4,
    timezone: 'GMT+9'
  },
  { 
    id: 4, 
    name: 'Tokyo Components', 
    logo: 'TC',
    location: 'Tokyo, Japan',
    spendPercentage: 12,
    annualSpend: 1010000,
    onTimeDelivery: 98.1,
    categories: ['Specialized ICs', 'Sensors'],
    verificationStatus: 'Verified',
    contactName: 'Tanaka Hiroshi',
    contactEmail: 'h.tanaka@tokyocomponents.jp',
    contactPhone: '+81 3 1234 5678',
    performance: 95,
    pendingOrders: 1,
    activeContracts: 1,
    paymentTerms: 'Net 60',
    shellTokenEnabled: true,
    qualityScore: 97.3,
    responseTime: '3 hours',
    leadTimeAvg: 18,
    lastOrder: '2025-02-10',
    riskScore: 'Low',
    yearsSince: 6,
    timezone: 'GMT+9'
  },
  { 
    id: 5, 
    name: 'Malaysia Circuit Systems', 
    logo: 'MC',
    location: 'Penang, Malaysia',
    spendPercentage: 8,
    annualSpend: 672000,
    onTimeDelivery: 89.5,
    categories: ['PCBs', 'Assemblies'],
    verificationStatus: 'Partially Verified',
    contactName: 'Ahmad Razak',
    contactEmail: 'a.razak@malaysiacs.com',
    contactPhone: '+60 4 987 6543',
    performance: 82,
    pendingOrders: 2,
    activeContracts: 1,
    paymentTerms: 'Net 30',
    shellTokenEnabled: false,
    qualityScore: 88.7,
    responseTime: '12 hours',
    leadTimeAvg: 21,
    lastOrder: '2025-02-05',
    riskScore: 'Medium',
    yearsSince: 3,
    timezone: 'GMT+8'
  }
];

// Performance history data
export const performanceData: PerformanceDataItem[] = [
  { month: 'Sep', quality: 92, delivery: 88, pricing: 85, response: 90 },
  { month: 'Oct', quality: 93, delivery: 90, pricing: 86, response: 91 },
  { month: 'Nov', quality: 91, delivery: 92, pricing: 88, response: 92 },
  { month: 'Dec', quality: 94, delivery: 91, pricing: 85, response: 93 },
  { month: 'Jan', quality: 93, delivery: 93, pricing: 87, response: 94 },
  { month: 'Feb', quality: 96, delivery: 94, pricing: 88, response: 95 }
];

// Lead time trends
export const leadTimeData: LeadTimeDataItem[] = [
  { month: 'Sep', current: 18, industry: 21 },
  { month: 'Oct', current: 17, industry: 20 },
  { month: 'Nov', current: 16, industry: 21 },
  { month: 'Dec', current: 16, industry: 22 },
  { month: 'Jan', current: 15, industry: 20 },
  { month: 'Feb', current: 15, industry: 19 }
];

// Quality metrics
export const qualityData: QualityDataItem[] = [
  { name: 'Quality', supplier: 96, industry: 85 },
  { name: 'Documentation', supplier: 94, industry: 82 },
  { name: 'Compliance', supplier: 98, industry: 88 },
  { name: 'Packaging', supplier: 95, industry: 86 },
  { name: 'Consistency', supplier: 92, industry: 80 },
];

// Active orders
export const activeOrders: ActiveOrder[] = [
  { 
    id: 'PO-4852', 
    date: '2025-02-15', 
    items: 'AX7240 Microcontrollers, CX400 Capacitors', 
    quantity: '5,000 units, 10,000 units', 
    amount: 84250, 
    status: 'In Production',
    delivery: '2025-03-05',
    paymentStatus: 'Deposit Paid'
  },
  { 
    id: 'PO-4855', 
    date: '2025-02-18', 
    items: 'RF Amplifier ICs, Power Controllers', 
    quantity: '2,000 units, 1,500 units', 
    amount: 42800, 
    status: 'Preparing Shipment',
    delivery: '2025-03-01',
    paymentStatus: 'Pending Payment'
  },
  { 
    id: 'PO-4860', 
    date: '2025-02-22', 
    items: 'DDR4 Memory Modules, Flash Storage', 
    quantity: '3,000 units, 2,000 units', 
    amount: 68500, 
    status: 'Confirmed',
    delivery: '2025-03-15',
    paymentStatus: 'Not Paid'
  }
];

// Components supplied
export const suppliedComponents: SuppliedComponent[] = [
  { 
    id: 'MC-AX7240-T', 
    name: 'AX7240 Microcontrollers', 
    category: 'Microcontrollers', 
    price: 22.50, 
    leadTime: '15 days',
    moq: 500,
    stock: 4850,
    alternativeAvailable: true,
    lifecycle: 'Active'
  },
  { 
    id: 'MEM-DR4-8G', 
    name: 'DDR4 8GB Memory Modules', 
    category: 'Memory ICs', 
    price: 18.75, 
    leadTime: '14 days',
    moq: 200,
    stock: 1850,
    alternativeAvailable: true,
    lifecycle: 'Active'
  },
  { 
    id: 'STO-FL-128G', 
    name: '128GB Flash Storage', 
    category: 'Memory ICs', 
    price: 12.80, 
    leadTime: '10 days',
    moq: 100,
    stock: 2250,
    alternativeAvailable: true,
    lifecycle: 'Active'
  },
  { 
    id: 'IC-MCU-T240', 
    name: 'T240 Core Processors', 
    category: 'Microcontrollers', 
    price: 32.60, 
    leadTime: '18 days',
    moq: 100,
    stock: 850,
    alternativeAvailable: false,
    lifecycle: 'Active'
  },
  { 
    id: 'MEM-DR3-4G', 
    name: 'DDR3 4GB Memory Modules', 
    category: 'Memory ICs', 
    price: 9.25, 
    leadTime: '7 days',
    moq: 200,
    stock: 650,
    alternativeAvailable: true,
    lifecycle: 'Declining'
  }
];

// Contracts data
export const contractsData: Contract[] = [
  {
    id: 'CTR-TS-2024-01',
    type: 'Supply Agreement',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    status: 'Active',
    value: 2000000,
    paymentTerms: 'Net 45',
    categories: ['Microcontrollers', 'Memory ICs'],
    blockchainVerified: true,
    renewalReminder: true,
    specialTerms: 'Volume discounts applied for orders >$50,000'
  },
  {
    id: 'CTR-TS-2024-02',
    type: 'Quality Assurance Agreement',
    startDate: '2025-01-01',
    endDate: '2026-12-31',
    status: 'Active',
    value: null,
    paymentTerms: null,
    categories: ['All Categories'],
    blockchainVerified: true,
    renewalReminder: false,
    specialTerms: 'Includes quarterly quality audits and performance reviews'
  }
];

// Communication history
export const communicationHistory: CommunicationHistoryItem[] = [
  {
    id: 1,
    date: '2025-02-25',
    type: 'Email',
    subject: 'PO-4852 Confirmation',
    contact: 'Li Wei Chen',
    summary: 'Confirmed receipt of PO-4852. Production scheduled to begin on Feb 28.',
    status: 'Resolved'
  },
  {
    id: 2,
    date: '2025-02-20',
    type: 'Meeting',
    subject: 'Quarterly Business Review',
    contact: 'Li Wei Chen, Jessica Huang',
    summary: 'Discussed performance metrics, upcoming products, and supply forecasts for Q2 2025.',
    status: 'Completed'
  },
  {
    id: 3,
    date: '2025-02-15',
    type: 'Phone',
    subject: 'Lead Time Update',
    contact: 'Jessica Huang',
    summary: 'Notification of 2-day reduction in lead times for all microcontroller products.',
    status: 'Implemented'
  },
  {
    id: 4,
    date: '2025-02-10',
    type: 'Email',
    subject: 'Shell Token Payment Setup',
    contact: 'Li Wei Chen, Finance Team',
    summary: 'Finalized setup for Shell token payments. First transaction scheduled for next PO.',
    status: 'Completed'
  },
  {
    id: 5,
    date: '2025-02-05',
    type: 'Support Ticket',
    subject: 'Quality Issue with Batch TS-MC-458',
    contact: 'Quality Team',
    summary: 'Reported minor cosmetic defects in recent microcontroller batch. Supplier offered replacement.',
    status: 'Resolved'
  }
];

// Order history data for charts
export const orderHistoryData: OrderHistoryDataItem[] = [
  { month: 'Sep', value: 42000 },
  { month: 'Oct', value: 58000 },
  { month: 'Nov', value: 67000 },
  { month: 'Dec', value: 89000 },
  { month: 'Jan', value: 68000 },
  { month: 'Feb', value: 72000 },
];

// Component mix data for pie chart
export const componentMixData: ComponentMixDataItem[] = [
  { name: 'Microcontrollers', value: 45, color: '#90caf9' },
  { name: 'Memory ICs', value: 30, color: '#ce93d8' },
  { name: 'Passive Components', value: 15, color: '#66bb6a' },
  { name: 'Others', value: 10, color: '#bdbdbd' },
];

// Price trend data for component insights
export const priceTrendData: PriceTrendDataItem[] = [
  { month: 'Sep', price: 21.80 },
  { month: 'Oct', price: 22.10 },
  { month: 'Nov', price: 22.30 },
  { month: 'Dec', price: 22.50 },
  { month: 'Jan', price: 22.40 },
  { month: 'Feb', price: 22.50 },
];

// Payment methods data for pie chart
export const paymentMethodsData: PaymentMethodDataItem[] = [
  { name: 'Shell Token', value: 65, color: '#66bb6a' },
  { name: 'Traditional', value: 35, color: '#bdbdbd' },
];

// Upcoming events data
export const upcomingEvents: UpcomingEvent[] = [
  {
    title: 'Quarterly Business Review',
    date: 'Mar 15, 2025',
    type: 'meeting',
  },
  {
    title: 'Order PO-4852 Delivery',
    date: 'Mar 5, 2025',
    type: 'delivery',
  },
  {
    title: 'Contract CTR-TS-2024-01 Review',
    date: 'Apr 1, 2025',
    type: 'contract',
  },
];

// Dark theme configuration
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    success: {
      main: '#66bb6a',
    },
    warning: {
      main: '#ffa726',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#29b6f6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});
