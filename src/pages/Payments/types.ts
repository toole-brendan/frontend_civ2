// Payment status types
export type PaymentStatus = 'Draft' | 'Scheduled' | 'Pending Approval' | 'Processing' | 'Completed';

// Payment method types
export type PaymentMethod = 'Traditional Wire' | 'Shell Token' | 'USDC';

// Payment urgency types
export type PaymentUrgency = 'critical' | 'high' | 'medium' | 'low';

// Smart contract status types
export type SmartContractStatus = 'Active' | 'Pending' | 'Completed' | 'Terminated';

// Supplier onboarding status types
export type SupplierOnboardingStatus = 'Not Started' | 'In Progress' | 'Completed';

// Currency trend types
export type CurrencyTrend = 'up' | 'down' | 'stable';

// Payment table filter state
export interface PaymentFilterState {
  status: PaymentStatus[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  suppliers: string[];
  amountRange: {
    min: number | null;
    max: number | null;
  };
  paymentMethods: PaymentMethod[];
  urgency: PaymentUrgency[];
}

// Payment action types
export type PaymentAction = 
  | 'pay'
  | 'edit'
  | 'view'
  | 'cancel'
  | 'approve'
  | 'reject'
  | 'schedule'
  | 'download';

// Payment notification types
export interface PaymentNotification {
  id: string;
  type: 'payment_due' | 'payment_processed' | 'payment_failed' | 'payment_approved' | 'payment_rejected';
  message: string;
  timestamp: string;
  read: boolean;
  paymentId?: string;
}

// Payment history entry types
export interface PaymentHistoryEntry {
  id: string;
  paymentId: string;
  action: string;
  performedBy: string;
  timestamp: string;
  details: string;
}

// Smart contract payment terms
export interface SmartContractPaymentTerms {
  id: string;
  name: string;
  conditions: string[];
  triggers: string[];
  penalties: string[];
  signatures: {
    buyer: boolean;
    seller: boolean;
  };
}

// Payment optimization recommendation
export interface PaymentOptimizationRecommendation {
  paymentId: string;
  recommendationType: 'early_payment' | 'method_change' | 'consolidation' | 'scheduling';
  description: string;
  potentialSavings: number;
  implementationSteps: string[];
}

// Currency conversion calculation
export interface CurrencyConversionCalculation {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  traditionalRate: number;
  traditionalFee: number;
  blockchainRate: number;
  blockchainFee: number;
  savings: number;
}

// Payment analytics period
export type AnalyticsPeriod = '3mo' | '6mo' | '12mo' | 'YTD';

// Payment analytics data point
export interface PaymentAnalyticsDataPoint {
  date: string;
  traditionalVolume: number;
  shellTokenVolume: number;
  usdcVolume: number;
  totalVolume: number;
  savings: number;
}

// Payment method comparison metrics
export interface PaymentMethodComparisonMetrics {
  method: PaymentMethod;
  averageFee: number;
  averageProcessingTime: string;
  reconciliationEffort: string;
  currencyConversionCost: number;
  securityRating: number;
  complianceRating: number;
}

// Blockchain transaction verification
export interface BlockchainVerification {
  transactionHash: string;
  confirmations: {
    current: number;
    required: number;
  };
  estimatedCompletionTime: string;
  network: string;
  blockExplorerUrl: string;
  verificationSignatures: {
    signer: string;
    timestamp: string;
    valid: boolean;
  }[];
}

// Payment compliance check
export interface PaymentComplianceCheck {
  paymentId: string;
  ofacStatus: 'Verified' | 'Pending' | 'Flagged';
  amlStatus: 'Verified' | 'Pending' | 'Flagged';
  requiredDocuments: {
    name: string;
    status: 'Provided' | 'Missing' | 'Expired';
  }[];
  taxWithholding: {
    required: boolean;
    percentage: number;
    amount: number;
  };
  regulatoryReporting: {
    required: boolean;
    status: 'Completed' | 'Pending' | 'Not Started';
  };
} 