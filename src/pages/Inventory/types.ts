// TechComponents International Inventory Types

export interface TechComponentsInventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  supplier: string;
  locations: {
    warehouseId: string;
    quantity: number;
  }[];
  currentStock: number;
  minLevel: number;
  maxLevel: number;
  reorderPoint: number;
  unitCost: number;
  totalValue: number;
  lastReceived: string;
  lastShipped: string;
  leadTime: number;
  lifecycleStatus: 'new' | 'active' | 'mature' | 'declining' | 'end-of-life' | 'obsolete';
  blockchainVerified: boolean;
  blockchainHash?: string;
  qrCode?: string;
  image?: string;
  datasheet?: string;
  complianceStatus: {
    rohs: boolean;
    reach: boolean;
  };
  healthScore: number; // 0-100 score based on turnover, quality, demand
}

export interface InventoryCategory {
  id: string;
  name: string;
  skuCount: number;
  totalValue: number;
  stockHealth: 'good' | 'warning' | 'critical';
  lowStockCount: number;
  icon: string;
}

export interface InventoryMetrics {
  totalSKUs: number;
  totalValue: number;
  turnoverRate: number;
  averageDaysOnHand: number;
  slowMovingItems: number;
  excessInventoryValue: number;
  stockoutEvents: number;
}

export interface InventoryWarehouse {
  id: string;
  name: string;
  location: string;
  itemCount: number;
  totalValue: number;
}

export interface InventoryFilters {
  search: string;
  sku: string;
  description: string;
  suppliers: string[];
  categories: string[];
  subcategories: string[];
  locations: string[];
  stockLevelRange: {
    min: number;
    max: number;
  };
  receivedDateRange: {
    start: string | null;
    end: string | null;
  };
  lifecycleStatus: string[];
  blockchainVerified: boolean | null;
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: InventoryFilters;
  createdBy: string;
  createdAt: string;
}

export interface InventoryHistory {
  date: string;
  quantity: number;
  type: 'received' | 'shipped' | 'adjusted' | 'transferred';
  reference: string;
  performedBy: string;
  verificationHash?: string;
}

export interface ComponentUsage {
  productId: string;
  productName: string;
  quantityUsed: number;
  lastUsed: string;
}

export interface RelatedComponent {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  usageCorrelation: number; // 0-1 correlation score
}

export interface QualityData {
  failureRate: number;
  returnRate: number;
  lastInspectionDate: string;
  inspectionResult: 'passed' | 'failed' | 'warning';
  notes: string;
}

export interface BlockchainRecord {
  hash: string;
  timestamp: string;
  type: 'receipt' | 'transfer' | 'adjustment' | 'audit';
  quantity: number;
  previousHash: string;
  verifications: number;
  verified: boolean;
}

export interface InventoryRecommendation {
  id: string;
  type: 'rebalance' | 'reorder' | 'excess' | 'alternative';
  item: {
    id: string;
    sku: string;
    name: string;
  };
  description: string;
  impact: string;
  potentialSavings?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  suggestedAction: string;
}

export interface TechComponentsInventoryData {
  items: TechComponentsInventoryItem[];
  categories: InventoryCategory[];
  metrics: InventoryMetrics;
  warehouses: InventoryWarehouse[];
  recommendations: InventoryRecommendation[];
  savedFilters: SavedFilter[];
}

// Keep original types for backward compatibility
export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  serialNumber: string;
  status: 'in_stock' | 'reserved' | 'shipped' | 'maintenance';
  location: string;
  assignedTo: string | null;
  warehouse: string;
  category: string;
  lastUpdated: string;
  quantity: number;
  price: number;
  supplier: string;
}

export interface WarehouseStructure {
  id: string;
  name: string;
  level: 'warehouse' | 'section' | 'aisle' | 'shelf';
  children?: WarehouseStructure[];
}

export interface ItemDetails extends InventoryItem {
  maintenanceHistory: MaintenanceRecord[];
  transactionHistory: TransactionHistory[];
  documents: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  digitalTwinData: {
    blockchainId: string;
    lastVerified: string;
    transactionHash: string;
  };
}

export interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  performedBy: string;
  cost: number;
  nextDueDate?: string;
}

export interface TransactionHistory {
  id: string;
  date: string;
  type: 'received' | 'shipped' | 'returned' | 'adjusted';
  quantity: number;
  performedBy: string;
  relatedOrderId?: string;
} 