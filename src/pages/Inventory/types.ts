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

export interface InventoryMetrics {
  totalItems: number;
  itemsInStock: number;
  itemsReserved: number;
  itemsShipped: number;
  itemsUnderMaintenance: number;
  totalValue: number;
}

export interface InventoryFilters {
  search: string;
  status: string;
  category: string;
  location: string;
  warehouse: string;
  supplier: string;
  priceRange: {
    min: number;
    max: number;
  };
}

export interface SavedFilter {
  id: string;
  name: string;
  filters: InventoryFilters;
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