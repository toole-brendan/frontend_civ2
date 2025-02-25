export type ScanMode = 'INVENTORY' | 'TRANSFER' | 'RECEIPT' | 'SHIPPING' | 'VERIFICATION';

export interface ProductDetails {
  id: string;
  name: string;
  sku: string;
  batchNumber: string;
  origin: string;
  roastLevel: 'LIGHT' | 'MEDIUM' | 'DARK' | 'SPECIALTY';
  processMethod: 'WASHED' | 'NATURAL' | 'HONEY' | 'ANAEROBIC';
  category: 'GREEN' | 'ROASTED' | 'PACKAGED';
  location: string;
  warehouse: string;
  quantityAvailable: number;
  unit: 'KG' | 'LB' | 'BAG';
  unitPrice: number;
  status: 'IN_STOCK' | 'RESERVED' | 'SHIPPED' | 'IN_TRANSIT';
  harvestDate?: string;
  expiryDate?: string;
  certifications: string[];
}

export interface ScanResult {
  id: string;
  productId: string;
  scannedAt: string;
  scannedBy: string;
  scanMode: ScanMode;
  location: string;
  productDetails: ProductDetails;
  blockchainVerified: boolean;
  blockchainTxHash?: string;
  relatedOrderId?: string;
  relatedTransferId?: string;
  notes?: string;
}

export interface ScanHistory {
  id: string;
  productId: string;
  timestamp: string;
  action: ScanMode;
  location: string;
  performedBy: string;
  result: 'SUCCESS' | 'FAILURE';
  notes?: string;
}

export interface QRCodeData {
  type: 'PRODUCT' | 'TRANSFER' | 'ORDER' | 'LOCATION';
  id: string;
  metadata: Record<string, any>;
  version: string;
  timestamp: string;
  signature?: string;
}

export interface ScannerSettings {
  useFrontCamera: boolean;
  autoVerifyBlockchain: boolean;
  scanSound: boolean;
  vibrate: boolean;
  autoNavigateOnScan: boolean;
  defaultScanMode: ScanMode;
}

export interface ScannerFilters {
  startDate: string | null;
  endDate: string | null;
  scanMode: string;
  location: string;
  productCategory: string;
  status: string;
}

export interface ScanMetrics {
  totalScansToday: number;
  successfulScans: number;
  failedScans: number;
  productsScanned: number;
  locationChanges: number;
  inventoryUpdates: number;
} 