// Define TypeScript interfaces
export interface ShipmentItem {
  name: string;
  quantity: number;
}

export interface Shipment {
  id: string;
  referenceNumber: string;
  type: 'inbound' | 'outbound' | 'internal';
  origin: string;
  destination: string;
  items: ShipmentItem[];
  totalItems: number;
  value: number;
  status: string;
  statusText: string;
  createdDate: string;
  estimatedDelivery: string;
  actualDelivery: string | null;
  carrier: string;
  trackingNumber: string;
  blockchainVerified: boolean;
  confirmations: number;
  priority: 'high' | 'medium' | 'low';
  alerts: number;
  progress: number;
  smartContract: string;
  lastUpdated: string;
  documents: string[];
  notes: string;
  assignedTo: string;
}

// Sample data for shipments
export const shipmentData: Shipment[] = [
  {
    id: 'TECI-9542',
    referenceNumber: 'PO-4852',
    type: 'inbound',
    origin: 'Taiwan Semiconductor',
    destination: 'Austin Warehouse',
    items: [
      { name: 'AX7240 Microcontrollers', quantity: 5000 },
      { name: 'CX400 Capacitors', quantity: 10000 }
    ],
    totalItems: 2,
    value: 84250,
    status: 'in-customs',
    statusText: 'In Customs',
    createdDate: '2025-02-20',
    estimatedDelivery: '2025-02-28',
    actualDelivery: null,
    carrier: 'Global Express Logistics',
    trackingNumber: 'GEL7891234560',
    blockchainVerified: true,
    confirmations: 12,
    priority: 'high',
    alerts: 2,
    progress: 60,
    smartContract: '0x7f9e...3b21',
    lastUpdated: '2025-02-26 09:14:22',
    documents: ['commercial_invoice', 'packing_list', 'customs_form'],
    notes: 'Customs clearance delay due to missing documentation. Commercial invoice discrepancy.',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'TECI-9538',
    referenceNumber: 'PO-4847',
    type: 'inbound',
    origin: 'Shenzhen Electronics',
    destination: 'Guadalajara Facility',
    items: [
      { name: 'PCB Connector Arrays', quantity: 2500 }
    ],
    totalItems: 1,
    value: 18750,
    status: 'in-transit',
    statusText: 'In Transit',
    createdDate: '2025-02-22',
    estimatedDelivery: '2025-03-02',
    actualDelivery: null,
    carrier: 'Pan-American Freight',
    trackingNumber: 'PAF8567129034',
    blockchainVerified: true,
    confirmations: 14,
    priority: 'medium',
    alerts: 0,
    progress: 45,
    smartContract: '0x8d2e...5f19',
    lastUpdated: '2025-02-26 14:22:45',
    documents: ['commercial_invoice', 'packing_list', 'certificate_of_origin'],
    notes: 'Shipment cleared export customs, currently in transit',
    assignedTo: 'David Park'
  },
  {
    id: 'TECI-9535',
    referenceNumber: 'SO-3245',
    type: 'outbound',
    origin: 'Austin Warehouse',
    destination: 'MediTech Devices',
    items: [
      { name: 'Power Controllers', quantity: 1200 }
    ],
    totalItems: 1,
    value: 42600,
    status: 'preparing',
    statusText: 'Preparing Shipment',
    createdDate: '2025-02-24',
    estimatedDelivery: '2025-02-29',
    actualDelivery: null,
    carrier: 'Express Parcel Services',
    trackingNumber: 'Pending',
    blockchainVerified: true,
    confirmations: 8,
    priority: 'high',
    alerts: 0,
    progress: 20,
    smartContract: '0x8b5f...2e19',
    lastUpdated: '2025-02-26 11:45:33',
    documents: ['proforma_invoice', 'packing_list'],
    notes: 'Awaiting QC verification before shipment',
    assignedTo: 'Maria Rodriguez'
  },
  {
    id: 'TECI-9533',
    referenceNumber: 'SO-3242',
    type: 'outbound',
    origin: 'San Jose Warehouse',
    destination: 'Robotics Solutions',
    items: [
      { name: 'RF Amplifier ICs', quantity: 850 },
      { name: 'Motion Control Boards', quantity: 125 }
    ],
    totalItems: 2,
    value: 67850,
    status: 'delivered',
    statusText: 'Delivered',
    createdDate: '2025-02-15',
    estimatedDelivery: '2025-02-25',
    actualDelivery: '2025-02-24',
    carrier: 'Premium Tech Logistics',
    trackingNumber: 'PTL7856923401',
    blockchainVerified: true,
    confirmations: 16,
    priority: 'medium',
    alerts: 0,
    progress: 100,
    smartContract: '0x3c7a...9d45',
    lastUpdated: '2025-02-24 14:22:10',
    documents: ['invoice', 'packing_list', 'proof_of_delivery'],
    notes: 'Delivered one day ahead of schedule',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'TECI-9530',
    referenceNumber: 'TR-0892',
    type: 'internal',
    origin: 'Austin Warehouse',
    destination: 'San Jose Warehouse',
    items: [
      { name: 'MX9250 Memory Controllers', quantity: 200 }
    ],
    totalItems: 1,
    value: 25000,
    status: 'completed',
    statusText: 'Completed',
    createdDate: '2025-02-18',
    estimatedDelivery: '2025-02-22',
    actualDelivery: '2025-02-21',
    carrier: 'Internal Fleet',
    trackingNumber: 'IF-2025-0234',
    blockchainVerified: true,
    confirmations: 15,
    priority: 'high',
    alerts: 0,
    progress: 100,
    smartContract: '0x5b3d...7c12',
    lastUpdated: '2025-02-21 16:30:45',
    documents: ['transfer_request', 'inventory_adjustment'],
    notes: 'Critical transfer to support Robotics Solutions order',
    assignedTo: 'David Park'
  },
  {
    id: 'TECI-9528',
    referenceNumber: 'PO-4830',
    type: 'inbound',
    origin: 'Korea Chip Manufacturing',
    destination: 'San Jose Warehouse',
    items: [
      { name: 'RF Amplifier ICs', quantity: 1500 },
      { name: 'Power Management ICs', quantity: 3000 }
    ],
    totalItems: 2,
    value: 105200,
    status: 'delayed',
    statusText: 'Delayed',
    createdDate: '2025-02-12',
    estimatedDelivery: '2025-02-24',
    actualDelivery: null,
    carrier: 'Trans-Pacific Shipping',
    trackingNumber: 'TPS9034567812',
    blockchainVerified: true,
    confirmations: 11,
    priority: 'high',
    alerts: 1,
    progress: 70,
    smartContract: '0x2f8b...4e67',
    lastUpdated: '2025-02-25 08:35:12',
    documents: ['commercial_invoice', 'packing_list', 'certificate_of_origin', 'delay_notification'],
    notes: 'Port congestion causing 7-day delay. Revised ETA: Mar 03',
    assignedTo: 'Sarah Johnson'
  },
  {
    id: 'TECI-9525',
    referenceNumber: 'SO-3235',
    type: 'outbound',
    origin: 'Guadalajara Facility',
    destination: 'TechnoVision Inc.',
    items: [
      { name: 'Display Modules', quantity: 350 },
      { name: 'Control Boards', quantity: 350 },
      { name: 'Power Supply Units', quantity: 350 }
    ],
    totalItems: 3,
    value: 112000,
    status: 'in-transit',
    statusText: 'In Transit',
    createdDate: '2025-02-20',
    estimatedDelivery: '2025-03-01',
    actualDelivery: null,
    carrier: 'United Freight Express',
    trackingNumber: 'UFE5678923410',
    blockchainVerified: true,
    confirmations: 13,
    priority: 'medium',
    alerts: 0,
    progress: 55,
    smartContract: '0x9c4d...2a78',
    lastUpdated: '2025-02-25 19:12:40',
    documents: ['invoice', 'packing_list', 'export_declaration'],
    notes: 'Cleared Mexican customs, currently in transit to US',
    assignedTo: 'Maria Rodriguez'
  },
  {
    id: 'TECI-9520',
    referenceNumber: 'TR-0885',
    type: 'internal',
    origin: 'Guadalajara Facility',
    destination: 'Austin Warehouse',
    items: [
      { name: 'Assembled PCB Units', quantity: 500 }
    ],
    totalItems: 1,
    value: 35000,
    status: 'in-transit',
    statusText: 'In Transit',
    createdDate: '2025-02-23',
    estimatedDelivery: '2025-02-27',
    actualDelivery: null,
    carrier: 'Internal Fleet',
    trackingNumber: 'IF-2025-0245',
    blockchainVerified: true,
    confirmations: 10,
    priority: 'low',
    alerts: 0,
    progress: 40,
    smartContract: '0x7d2c...8f34',
    lastUpdated: '2025-02-25 11:22:30',
    documents: ['transfer_request', 'cross_border_documentation'],
    notes: 'Routine transfer of assembled units back to primary distribution center',
    assignedTo: 'Thomas Chen'
  }
];

// Stats counters for different tabs
export const shipmentStats: {
  all: number;
  inbound: number;
  outbound: number; 
  internal: number;
  critical: number;
} = {
  all: shipmentData.length,
  inbound: shipmentData.filter(item => item.type === 'inbound').length,
  outbound: shipmentData.filter(item => item.type === 'outbound').length,
  internal: shipmentData.filter(item => item.type === 'internal').length,
  critical: shipmentData.filter(item => item.priority === 'high').length
};

// Status distribution for the donut chart
export const statusDistribution: Array<{
  status: string;
  count: number;
  color: string;
}> = [
  { status: 'In Transit', count: 3, color: '#29b6f6' },
  { status: 'In Customs', count: 1, color: '#ffa726' },
  { status: 'Preparing', count: 1, color: '#ce93d8' },
  { status: 'Delayed', count: 1, color: '#f44336' },
  { status: 'Delivered', count: 1, color: '#66bb6a' },
  { status: 'Completed', count: 1, color: '#66bb6a' }
];
