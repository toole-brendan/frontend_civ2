export interface WalletBalance {
  usdcBalance: number;
  pendingTransactions: number;
  availableBalance: number;
  totalTransactionVolume: number;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'receipt' | 'refund' | 'transfer';
  status: 'pending' | 'confirmed' | 'failed' | 'cancelled';
  amount: number;
  timestamp: string;
  counterparty: string;
  counterpartyType: 'customer' | 'supplier' | 'internal';
  relatedOrderId?: string;
  blockchainTxHash?: string;
  notes?: string;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
}

export interface SmartContract {
  id: string;
  name: string;
  type: 'payment' | 'escrow' | 'delivery' | 'custom';
  status: 'draft' | 'active' | 'executed' | 'cancelled' | 'expired';
  createdDate: string;
  updatedDate: string;
  expiryDate?: string;
  triggerConditions: string[];
  associatedParties: string[];
  totalValue: number;
  blockchainAddress: string;
  relatedOrderIds?: string[];
}

export interface TransactionFilters {
  search: string;
  type: string;
  status: string;
  counterpartyType: string;
  counterparty: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  minAmount: number | null;
  maxAmount: number | null;
}

export interface SmartContractFilters {
  search: string;
  type: string;
  status: string;
  party: string;
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

export interface WalletMetrics {
  totalBalance: number;
  pendingAmount: number;
  transactionsToday: number;
  activeSmartContracts: number;
} 