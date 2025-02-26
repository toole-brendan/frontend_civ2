import { ReactNode } from 'react';

export interface TransferItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  serialNumber?: string;
  digitalTwinId?: string;
  thumbnail?: string;
  currentCustodian?: string;
}

export interface Location {
  id: string;
  name: string;
  location: string;
  rank?: string;
}

export interface Transfer {
  id: string;
  type: TransferType;
  from: Location;
  to: Location;
  items: TransferItem[];
  totalValue: number;
  dateInitiated: string;
  expectedArrival: string;
  status: TransferStatus;
  statusUpdateTime: string;
  blockchainTxId?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  notes?: string;
  documents?: Document[];
  smartContract?: SmartContract | null;
  verifications?: Verification[];
  timeline?: TimelineEvent[];
  isCritical?: boolean;
  criticalReason?: string;
  attachedFiles?: AttachedFile[];
}

export type TransferType = 
  | 'INBOUND'
  | 'OUTBOUND'
  | 'INTERNAL';

export type TransferStatus = 
  | 'SCHEDULED'
  | 'IN_PREPARATION'
  | 'IN_TRANSIT'
  | 'IN_CUSTOMS'
  | 'QUALITY_CHECK'
  | 'AWAITING_APPROVAL'
  | 'COMPLETED'
  | 'REJECTED';

export interface Document {
  id: string;
  name: string;
  url: string;
}

export interface SmartContract {
  id: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  paymentTerms: string;
  paymentMethod: 'SHELL' | 'USDC' | 'TRADITIONAL';
  paymentAmount: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  triggerCondition: 'VERIFIED_RECEIPT' | 'CUSTOMS_CLEARANCE' | 'QUALITY_CHECK_PASSED';
}

export interface Verification {
  step: 'CREATION' | 'SHIPPING' | 'CUSTOMS_SUBMISSION' | 'CUSTOMS_CLEARANCE' | 'QUALITY_CHECK' | 'RECEIPT';
  verified: boolean;
  verifier: string;
  timestamp: string;
}

export interface TimelineEvent {
  event: string;
  timestamp: string;
  actor: string;
  location?: string;
  notes?: string;
}

export interface AttachedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface TransferMetrics {
  inbound: { count: number; value: number };
  outbound: { count: number; value: number };
  inCustoms: number;
  awaitingQC: number;
  successRate: number;
  successRateChange: number;
  avgTransitTime: number;
  totalActive: number;
  totalValueInTransit: number;
  pendingApprovals: number;
  critical: number;
  pending: number;
  completedToday: number;
  awaitingApproval: number;
}

export interface TransferFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: TransferStatus[];
  type?: TransferType[];
  priority?: ('HIGH' | 'MEDIUM' | 'LOW')[];
  searchTerm?: string;
  valueRange?: {
    min: number;
    max: number;
  };
  location?: string;
  hasSmartContract?: boolean;
}

export interface QRScanResult {
  itemId: string;
  serialNumber: string;
  success: boolean;
  error?: string;
}

export interface CriticalTransfer {
  id: string;
  description: string;
  reason: string;
  suggestedAction: string;
  escalationContact: string;
}

export interface SuggestedTransfer {
  id: string;
  description: string;
  currentStock: number | { location: string; quantity: number }[];
  recommendedTransfer: number;
  sourceFacility: string;
  destinationFacility: string;
  estimatedCost: number;
  benefit: string;
}

export interface CompletedTransfer {
  id: string;
  from: string;
  to: string;
  completionDate: string;
  value: number;
  verificationStatus: 'VERIFIED' | 'UNVERIFIED';
  timeToComplete: number;
  exceptions: string;
}

// Tab configuration type
export interface TransferTab {
  id: string;
  label: string;
  icon?: ReactNode;
  component: ReactNode;
} 