export type PartnerType = 'SUPPLIER' | 'CUSTOMER' | 'DISTRIBUTOR' | 'LOGISTICS' | 'OTHER';

export type RelationshipStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'ON_HOLD';

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Contact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface Document {
  id: string;
  name: string;
  type: 'CONTRACT' | 'CERTIFICATE' | 'INVOICE' | 'OTHER';
  url: string;
  uploadDate: string;
  expiryDate?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'PURCHASE' | 'SALE' | 'RETURN' | 'PAYMENT';
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  description: string;
  relatedOrderId?: string;
}

export interface PartnerMetrics {
  totalOrders: number;
  totalRevenue: number;
  lastOrderDate?: string;
  averageOrderValue?: number;
  returnRate?: number;
}

export interface PartnerFilters {
  search: string;
  type: string;
  status: string;
  country: string;
  tags: string[];
  certifications: string[];
  isFairTrade?: boolean;
  isOrganic?: boolean;
}

export interface PerformanceMetrics {
  id: string;
  partnerId: string;
  partnerName: string;
  onTimeDeliveryRate: number;
  qualityRating: number;
  responseTime: number;
  orderFulfillmentRate: number;
  avgLeadTime: number;
  lastEvaluationDate: string;
}

export interface Partner {
  id: string;
  name: string;
  type: string;
  status: string;
  country: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  email: string;
  phone: string;
  contactName: string;
  contactTitle?: string;
  companyRegistration?: string;
  taxId?: string;
  website?: string;
  notes?: string;
  logoUrl?: string;
  isVerified: boolean;
  rating: number;
  partnerSince: string;
  paymentTerms?: string;
  creditLimit?: number;
  tags?: string[];
  certifications?: string[];
  isFairTrade?: boolean;
  isOrganic?: boolean;
  metrics?: PartnerMetrics;
  customFields?: Record<string, any>;
  blockchainVerified?: boolean;
  dateAdded?: string;
  originCountries?: string[];
  contacts: Contact[];
  documents: Document[];
  billingAddress: Address;
  shippingAddress?: Address;
}

export interface PartnerSummary {
  totalPartners: number;
  activePartners: number;
  newPartners: number;
  topPartners: Array<{
    id: string;
    name: string;
    revenue: number;
    orders: number;
  }>;
  partnersByType: Record<string, number>;
  partnersByCountry: Record<string, number>;
}

export type PartnerTab = 'ALL' | 'SUPPLIERS' | 'CUSTOMERS' | 'DISTRIBUTORS' | 'OTHER';

export interface PartnerFormData extends Omit<Partner, 'id' | 'metrics'> {
  id?: string;
} 