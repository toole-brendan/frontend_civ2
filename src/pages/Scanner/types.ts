export type ScanMode = 'INVENTORY' | 'TRANSFER' | 'RECEIPT' | 'SHIPPING' | 'VERIFICATION';

export type ScanTechnology = 'QR_CODE' | 'BARCODE' | 'RFID' | 'MANUAL';

export interface ProductDetails {
  id: string;
  name: string;
  sku: string;
  batchNumber: string;
  manufacturer: string;
  category: 'SEMICONDUCTOR' | 'PASSIVE_COMPONENT' | 'CONNECTOR' | 'INTEGRATED_CIRCUIT' | 'SPECIALIZED_CHIP' | 'OTHER';
  componentType: string;
  specifications: Record<string, string>;
  location: string;
  warehouse: string;
  quantityAvailable: number;
  unit: 'UNITS' | 'REELS' | 'TRAYS' | 'BOXES';
  unitPrice: number;
  status: 'IN_STOCK' | 'RESERVED' | 'SHIPPED' | 'IN_TRANSIT' | 'QUALITY_HOLD';
  manufacturingDate?: string;
  expiryDate?: string;
  certifications: string[];
  customsStatus?: 'CLEARED' | 'PENDING' | 'HELD' | 'NOT_APPLICABLE';
  hazardousMaterial: boolean;
}

export interface ScanResult {
  id: string;
  timestamp: string;
  productId: string;
  batchNumber: string;
  status: 'VERIFIED' | 'UNVERIFIED' | 'FAILED';
  scannedBy: string;
  location: string;
  scanTechnology: ScanTechnology;
  details: {
    productName: string;
    manufacturer: string;
    manufacturingDate: string;
    expiryDate: string;
    certifications: string[];
  };
  scannedAt?: string;
  scanMode?: ScanMode;
  productDetails?: ProductDetails;
  blockchainVerified?: boolean;
  blockchainTxHash?: string;
  relatedOrderId?: string;
  relatedTransferId?: string;
  notes?: string;
  erpSystemId?: string;
  wmsReference?: string;
}

export interface ScanHistory {
  id: string;
  productId: string;
  timestamp: string;
  action: ScanMode;
  scanTechnology: ScanTechnology;
  location: string;
  performedBy: string;
  result: 'SUCCESS' | 'FAILURE';
  notes?: string;
  systemIntegration?: string;
}

export interface QRCodeData {
  type: 'PRODUCT' | 'TRANSFER' | 'ORDER' | 'LOCATION';
  id: string;
  metadata: Record<string, any>;
  version: string;
  timestamp: string;
  signature?: string;
}

export interface BarcodeData {
  type: 'UPC' | 'EAN' | 'CODE128' | 'CODE39' | 'ITF';
  value: string;
  productId?: string;
  batchNumber?: string;
  serialNumber?: string;
}

export interface RFIDData {
  tagId: string;
  productId: string;
  batchNumber?: string;
  securityLevel: 'STANDARD' | 'ENHANCED' | 'HIGH';
  writeProtected: boolean;
  lastUpdated: string;
}

export interface ScannerSettings {
  useFrontCamera: boolean;
  autoVerifyBlockchain: boolean;
  scanSound: boolean;
  vibrate: boolean;
  autoNavigateOnScan: boolean;
  defaultScanMode: ScanMode;
  defaultScanTechnology: ScanTechnology;
  enabledScanTechnologies: ScanTechnology[];
  erpIntegration: boolean;
  wmsIntegration: boolean;
  autoSyncWithExternalSystems: boolean;
}

export interface ScannerFilters {
  startDate: string | null;
  endDate: string | null;
  scanMode: string;
  scanTechnology: string;
  location: string;
  productCategory: string;
  status: string;
  systemIntegration: string;
}

export interface ScanMetrics {
  totalScansToday: number;
  successfulScans: number;
  failedScans: number;
  productsScanned: number;
  locationChanges: number;
  inventoryUpdates: number;
  scansByTechnology: Record<ScanTechnology, number>;
  externalSystemSyncs: number;
} 