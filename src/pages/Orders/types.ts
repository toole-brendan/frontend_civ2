export interface Order {
  id: string;
  orderNumber: string;
  type: 'purchase' | 'sales' | 'return';
  status: 'draft' | 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer?: string;
  supplier?: string;
  dateCreated: string;
  dateUpdated: string;
  expectedDelivery?: string;
  totalAmount: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  items: OrderItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
  notes?: string;
  assignedTo?: string;
  relatedDocuments?: RelatedDocument[];
  blockchainVerified: boolean;
  smartContractId?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  tax: number;
  total: number;
  totalPrice?: number;
  status?: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email?: string;
}

export interface RelatedDocument {
  id: string;
  type: 'invoice' | 'packing_slip' | 'contract' | 'quote' | 'other';
  name: string;
  url: string;
  dateCreated: string;
}

export interface OrderFilters {
  search: string;
  type: string;
  status: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  customer: string;
  supplier: string;
  paymentStatus: string;
  minAmount: number | null;
  maxAmount: number | null;
}

export interface OrderMetrics {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  totalSalesValue: number;
  averageOrderValue: number;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  date: Date;
  amount: number;
  method: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  notes?: string;
} 