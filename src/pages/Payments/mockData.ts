import { format, addDays, subDays } from 'date-fns';

// Types for payment data
export interface Payment {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  amount: number;
  dueDate: string;
  status: 'Draft' | 'Scheduled' | 'Pending Approval' | 'Processing' | 'Completed';
  paymentMethod: 'Traditional Wire' | 'Shell Token' | 'USDC';
  feeAmount: number;
  savingsAmount: number;
  creationDate: string;
  blockchainConfirmations?: {
    current: number;
    required: number;
  };
  linkedOrderNumber: string;
  products: string[];
  urgency: 'critical' | 'high' | 'medium' | 'low';
}

export interface PaymentStatusSummary {
  dueToday: {
    amount: number;
    recipient: string;
    invoice: string;
    potentialSavings: number;
  };
  dueThisWeek: {
    amount: number;
    count: number;
    recipients: string[];
  };
  processing: {
    amount: number;
    count: number;
    estimatedCompletion: string;
    confirmations: {
      current: number;
      required: number;
    };
  };
  recentlyCompleted: {
    amount: number;
    count: number;
    period: string;
    feeSavings: number;
  };
}

export interface PaymentMethodComparison {
  traditional: {
    fees: {
      percentage: number;
      ytdAmount: number;
    };
    processingTime: string;
    reconciliation: string;
    currencyConversion: number;
  };
  blockchain: {
    fees: {
      percentage: number;
      ytdAmount: number;
    };
    processingTime: string;
    reconciliation: string;
    currencyConversion: number;
  };
  savings: {
    ytdTotal: number;
    timeSavings: number;
    projectedAnnual: number;
  };
}

export interface PaymentTrend {
  month: string;
  traditionalVolume: number;
  shellTokenVolume: number;
  totalVolume: number;
  savings: number;
}

export interface SupplierPaymentTerm {
  supplierId: string;
  supplierName: string;
  preferredMethod: 'Traditional Wire' | 'Shell Token' | 'USDC';
  terms: string;
  earlyPaymentDiscount: {
    available: boolean;
    percentage: number;
    dayThreshold: number;
  };
  volumeDiscounts: {
    threshold: number;
    percentage: number;
  }[];
  currency: string;
  exchangeRate: number;
}

export interface SmartContractTemplate {
  id: string;
  name: string;
  description: string;
  useCase: string;
  terms: string[];
}

export interface CashFlowProjection {
  period: string;
  outgoing: number;
  incoming: number;
  netPosition: number;
}

export interface CurrencyRate {
  currency: string;
  code: string;
  rate: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export interface SupplierPaymentPerformance {
  supplierId: string;
  supplierName: string;
  avgDaysToPay: number;
  shellTokenAdoption: number;
  feeSavings: number;
  disputeFrequency: number;
  invoiceAccuracy: number;
  onboardingStatus: 'Not Started' | 'In Progress' | 'Completed';
}

// Mock data
export const mockPayments: Payment[] = [
  {
    id: '1',
    invoiceNumber: 'TCB-2842',
    supplierName: 'Shenzhen Electronics Ltd',
    amount: 78500,
    dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    status: 'Pending Approval',
    paymentMethod: 'Traditional Wire',
    feeAmount: 2355,
    savingsAmount: 2355,
    creationDate: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    linkedOrderNumber: 'PO-4852',
    products: ['AX7240 Microcontrollers', 'CX400 Capacitors'],
    urgency: 'critical'
  },
  {
    id: '2',
    invoiceNumber: 'TCB-2844',
    supplierName: 'Korea Chip Manufacturing',
    amount: 42800,
    dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'),
    status: 'Scheduled',
    paymentMethod: 'Shell Token',
    feeAmount: 85.6,
    savingsAmount: 1198.4,
    creationDate: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    blockchainConfirmations: {
      current: 0,
      required: 12
    },
    linkedOrderNumber: 'PO-4855',
    products: ['RF Amplifier ICs', 'Power Controllers'],
    urgency: 'high'
  },
  {
    id: '3',
    invoiceNumber: 'TCB-2839',
    supplierName: 'Tokyo Components',
    amount: 42600,
    dueDate: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    status: 'Completed',
    paymentMethod: 'Shell Token',
    feeAmount: 85.2,
    savingsAmount: 1192.8,
    creationDate: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    blockchainConfirmations: {
      current: 16,
      required: 12
    },
    linkedOrderNumber: 'PO-4850',
    products: ['Memory Modules', 'Display Controllers'],
    urgency: 'low'
  },
  {
    id: '4',
    invoiceNumber: 'TCB-2845',
    supplierName: 'Malaysia Circuit',
    amount: 33650,
    dueDate: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
    status: 'Pending Approval',
    paymentMethod: 'Traditional Wire',
    feeAmount: 1009.5,
    savingsAmount: 1009.5,
    creationDate: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    linkedOrderNumber: 'PO-4857',
    products: ['PCB Assemblies', 'Connector Arrays'],
    urgency: 'medium'
  },
  {
    id: '5',
    invoiceNumber: 'TCB-2841',
    supplierName: 'Taiwan Semiconductor',
    amount: 54200,
    dueDate: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    status: 'Processing',
    paymentMethod: 'Shell Token',
    feeAmount: 108.4,
    savingsAmount: 1517.6,
    creationDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    blockchainConfirmations: {
      current: 8,
      required: 12
    },
    linkedOrderNumber: 'PO-4849',
    products: ['Custom ASICs', 'Logic Controllers'],
    urgency: 'low'
  },
  {
    id: '6',
    invoiceNumber: 'TCB-2838',
    supplierName: 'Singapore Tech Solutions',
    amount: 28750,
    dueDate: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    status: 'Completed',
    paymentMethod: 'Shell Token',
    feeAmount: 57.5,
    savingsAmount: 805,
    creationDate: format(subDays(new Date(), 20), 'yyyy-MM-dd'),
    blockchainConfirmations: {
      current: 16,
      required: 12
    },
    linkedOrderNumber: 'PO-4845',
    products: ['Sensor Arrays', 'Bluetooth Modules'],
    urgency: 'low'
  },
  {
    id: '7',
    invoiceNumber: 'TCB-2846',
    supplierName: 'Hong Kong Electronics',
    amount: 66200,
    dueDate: format(addDays(new Date(), 10), 'yyyy-MM-dd'),
    status: 'Draft',
    paymentMethod: 'Traditional Wire',
    feeAmount: 1986,
    savingsAmount: 1986,
    creationDate: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    linkedOrderNumber: 'PO-4860',
    products: ['Power Supplies', 'Cooling Systems'],
    urgency: 'medium'
  },
  {
    id: '8',
    invoiceNumber: 'TCB-2840',
    supplierName: 'Vietnam Manufacturing',
    amount: 27000,
    dueDate: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
    status: 'Completed',
    paymentMethod: 'USDC',
    feeAmount: 54,
    savingsAmount: 756,
    creationDate: format(subDays(new Date(), 12), 'yyyy-MM-dd'),
    blockchainConfirmations: {
      current: 16,
      required: 12
    },
    linkedOrderNumber: 'PO-4848',
    products: ['Cable Assemblies', 'Connectors'],
    urgency: 'low'
  }
];

export const mockPaymentStatusSummary: PaymentStatusSummary = {
  dueToday: {
    amount: 78500,
    recipient: 'Shenzhen Electronics Ltd',
    invoice: 'TCB-2842',
    potentialSavings: 2355
  },
  dueThisWeek: {
    amount: 142650,
    count: 3,
    recipients: ['Korea Chip Manufacturing', 'Tokyo Components', 'Malaysia Circuit']
  },
  processing: {
    amount: 54200,
    count: 2,
    estimatedCompletion: '25 minutes',
    confirmations: {
      current: 8,
      required: 12
    }
  },
  recentlyCompleted: {
    amount: 98350,
    count: 4,
    period: 'Last 7 days',
    feeSavings: 2950
  }
};

export const mockPaymentMethodComparison: PaymentMethodComparison = {
  traditional: {
    fees: {
      percentage: 3.0,
      ytdAmount: 24850
    },
    processingTime: '2-4 business days',
    reconciliation: 'Manual reconciliation required',
    currencyConversion: 1.5
  },
  blockchain: {
    fees: {
      percentage: 0.2,
      ytdAmount: 1650
    },
    processingTime: '25-40 minutes',
    reconciliation: 'Automatic reconciliation with blockchain',
    currencyConversion: 0.3
  },
  savings: {
    ytdTotal: 24850,
    timeSavings: 298,
    projectedAnnual: 58200
  }
};

export const mockPaymentTrends: PaymentTrend[] = [
  { month: 'Sep', traditionalVolume: 380000, shellTokenVolume: 30000, totalVolume: 410000, savings: 2100 },
  { month: 'Oct', traditionalVolume: 360000, shellTokenVolume: 70000, totalVolume: 430000, savings: 2800 },
  { month: 'Nov', traditionalVolume: 320000, shellTokenVolume: 120000, totalVolume: 440000, savings: 3600 },
  { month: 'Dec', traditionalVolume: 280000, shellTokenVolume: 180000, totalVolume: 460000, savings: 5400 },
  { month: 'Jan', traditionalVolume: 240000, shellTokenVolume: 250000, totalVolume: 490000, savings: 7500 },
  { month: 'Feb', traditionalVolume: 200000, shellTokenVolume: 320000, totalVolume: 520000, savings: 9600 }
];

export const mockSupplierPaymentTerms: SupplierPaymentTerm[] = [
  {
    supplierId: '1',
    supplierName: 'Shenzhen Electronics Ltd',
    preferredMethod: 'Traditional Wire',
    terms: 'Net 30',
    earlyPaymentDiscount: {
      available: true,
      percentage: 2.0,
      dayThreshold: 10
    },
    volumeDiscounts: [
      { threshold: 100000, percentage: 1.5 },
      { threshold: 250000, percentage: 2.5 }
    ],
    currency: 'CNY',
    exchangeRate: 7.18
  },
  {
    supplierId: '2',
    supplierName: 'Korea Chip Manufacturing',
    preferredMethod: 'Shell Token',
    terms: 'Net 45',
    earlyPaymentDiscount: {
      available: true,
      percentage: 1.5,
      dayThreshold: 15
    },
    volumeDiscounts: [
      { threshold: 50000, percentage: 1.0 },
      { threshold: 150000, percentage: 2.0 }
    ],
    currency: 'KRW',
    exchangeRate: 1350.25
  },
  {
    supplierId: '3',
    supplierName: 'Tokyo Components',
    preferredMethod: 'Shell Token',
    terms: 'Net 30',
    earlyPaymentDiscount: {
      available: false,
      percentage: 0,
      dayThreshold: 0
    },
    volumeDiscounts: [
      { threshold: 100000, percentage: 1.0 }
    ],
    currency: 'JPY',
    exchangeRate: 151.75
  }
];

export const mockSmartContractTemplates: SmartContractTemplate[] = [
  {
    id: '1',
    name: 'Standard Component Purchase',
    description: 'Basic payment contract for standard component orders',
    useCase: 'Regular supplier payments with standard terms',
    terms: [
      'Payment released upon delivery confirmation',
      'Net 30 payment terms',
      'Automatic verification of delivery receipt',
      'USD-denominated payment in Shell tokens'
    ]
  },
  {
    id: '2',
    name: 'Quality-Contingent Payment',
    description: 'Payment released after quality control verification',
    useCase: 'High-precision components requiring QC verification',
    terms: [
      'Initial 50% payment on shipment',
      'Remaining 50% released after QC approval',
      'Automatic quality verification integration',
      '14-day inspection period',
      'Defect threshold < 0.5%'
    ]
  },
  {
    id: '3',
    name: 'Milestone-Based Payment',
    description: 'Payments tied to project milestones',
    useCase: 'Custom component development projects',
    terms: [
      '25% payment on contract signing',
      '25% on prototype approval',
      '25% on pre-production sample approval',
      '25% on final delivery',
      'Milestone verification through digital signatures'
    ]
  }
];

export const mockCashFlowProjections: CashFlowProjection[] = [
  { period: '30 Days', outgoing: 254800, incoming: 310500, netPosition: 55700 },
  { period: '60 Days', outgoing: 425600, incoming: 485200, netPosition: 59600 },
  { period: '90 Days', outgoing: 612400, incoming: 680300, netPosition: 67900 }
];

export const mockCurrencyRates: CurrencyRate[] = [
  { currency: 'Chinese Yuan', code: 'CNY', rate: 7.18, trend: 'up', change: 0.05 },
  { currency: 'Korean Won', code: 'KRW', rate: 1350.25, trend: 'down', change: -2.15 },
  { currency: 'Japanese Yen', code: 'JPY', rate: 151.75, trend: 'up', change: 0.45 },
  { currency: 'Taiwan Dollar', code: 'TWD', rate: 31.82, trend: 'stable', change: 0.02 },
  { currency: 'Malaysian Ringgit', code: 'MYR', rate: 4.72, trend: 'down', change: -0.08 }
];

export const mockSupplierPaymentPerformance: SupplierPaymentPerformance[] = [
  {
    supplierId: '1',
    supplierName: 'Shenzhen Electronics Ltd',
    avgDaysToPay: 28,
    shellTokenAdoption: 15,
    feeSavings: 4250,
    disputeFrequency: 2,
    invoiceAccuracy: 98,
    onboardingStatus: 'In Progress'
  },
  {
    supplierId: '2',
    supplierName: 'Korea Chip Manufacturing',
    avgDaysToPay: 32,
    shellTokenAdoption: 85,
    feeSavings: 8750,
    disputeFrequency: 0,
    invoiceAccuracy: 99.5,
    onboardingStatus: 'Completed'
  },
  {
    supplierId: '3',
    supplierName: 'Tokyo Components',
    avgDaysToPay: 25,
    shellTokenAdoption: 90,
    feeSavings: 6820,
    disputeFrequency: 1,
    invoiceAccuracy: 99.2,
    onboardingStatus: 'Completed'
  }
];

// Mock user data for TechComponents International
export const mockUser = {
  name: 'Michael Chen',
  role: 'Finance Manager',
  company: 'TechComponents International',
  avatar: '',
  pendingApprovals: 3,
  ytdSavings: 42500
}; 