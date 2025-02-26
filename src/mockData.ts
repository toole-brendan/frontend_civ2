import { ScanResult, ScanTechnology } from './pages/Scanner/types';

// Mock scan history data
export const mockScanHistory: ScanResult[] = [
  {
    id: 'scan-001',
    timestamp: '2023-09-15T10:30:00Z',
    productId: 'COMP-A7X-001',
    batchNumber: 'BATCH-2023-09-15-001',
    status: 'VERIFIED',
    scannedBy: 'John Doe',
    location: 'Warehouse A',
    scanTechnology: 'QR_CODE',
    details: {
      productName: 'Industrial Component XYZ',
      manufacturer: 'TechComponents International',
      manufacturingDate: '2023-05-15',
      expiryDate: '2025-05-15',
      certifications: ['ISO9001', 'CE'],
    },
  },
  {
    id: 'scan-002',
    timestamp: '2023-09-14T14:45:00Z',
    productId: 'COMP-B3Y-002',
    batchNumber: 'BATCH-2023-09-14-002',
    status: 'VERIFIED',
    scannedBy: 'Jane Smith',
    location: 'Warehouse B',
    scanTechnology: 'BARCODE',
    details: {
      productName: 'Precision Sensor Array',
      manufacturer: 'TechComponents International',
      manufacturingDate: '2023-04-10',
      expiryDate: '2026-04-10',
      certifications: ['ISO9001', 'UL'],
    },
  },
  {
    id: 'scan-003',
    timestamp: '2023-09-13T09:15:00Z',
    productId: 'COMP-C2Z-003',
    batchNumber: 'BATCH-2023-09-13-003',
    status: 'UNVERIFIED',
    scannedBy: 'Robert Johnson',
    location: 'Warehouse A',
    scanTechnology: 'RFID',
    details: {
      productName: 'Control Module V2',
      manufacturer: 'TechComponents International',
      manufacturingDate: '2023-03-22',
      expiryDate: '2025-03-22',
      certifications: ['ISO9001', 'CE', 'RoHS'],
    },
  },
];

// Mock scan metrics
export const mockScanMetrics = {
  totalScansToday: 42,
  successfulScans: 38,
  failedScans: 4,
  productsScanned: 28,
  locationChanges: 12,
  inventoryUpdates: 15,
  scansByTechnology: {
    'QR_CODE': 25,
    'BARCODE': 10,
    'RFID': 5,
    'MANUAL': 2
  },
  externalSystemSyncs: 30
}; 