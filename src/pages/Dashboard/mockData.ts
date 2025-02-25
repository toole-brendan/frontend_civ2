import { Alert, AlertType } from './components/CriticalAlertsCard';

// Define the types locally since they're not exported from the components
export interface TransitTimeData {
  route: string;
  avgTime: number;
  target: number;
}

export interface InventoryLevelData {
  date: string;
  coffee: number;
  equipment: number;
  packaging: number;
  min: number;
  max: number;
}

export interface PaymentResolutionData {
  name: string;
  value: number;
  color: string;
}

export interface TransferVolumeData {
  week: string;
  inbound: number;
  outbound: number;
  internal: number;
  total: number;
}

export interface PropertyStats {
  totalItems: number;
  serviceableItems: number;
  maintenanceNeeded: number;
  pendingReceipts: number;
  criticalItems: {
    count: number;
    items: Array<{
      id: string;
      name: string;
      status: string;
      shortage: number;
      priority: 'high' | 'medium' | 'low';
    }>;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
}

export interface Activity {
  id: string;
  type: 'inventory' | 'transaction' | 'order' | 'transfer' | 'user' | 'system';
  message: string;
  timestamp: string;
  user?: string;
  userAvatar?: string;
  itemId?: string;
}

// Supply Chain Visualization types
export type NodeType = 'supplier' | 'warehouse' | 'customer';
export type NodeStatus = 'success' | 'warning' | 'error';

export interface SupplyNode {
  id: string;
  name: string;
  type: NodeType;
  status: NodeStatus;
  details?: {
    items?: number;
    value?: number;
    eta?: string;
  };
}

export interface FlowConnection {
  from: string;
  to: string;
  status: NodeStatus;
  active: boolean;
  position?: [number, number, number, number]; // [left%, top%, width%, rotation]
}

// Pending Approvals types
export interface ApprovalItem {
  id: string;
  itemName: string;
  quantity: number;
  source: string;
  destination: string;
  value: number;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

// Quick Transfer types
export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
}

export interface TransferRecipient {
  id: string;
  name: string;
  type: string;
}

export interface RecentTransfer {
  id: string;
  itemName: string;
  quantity: number;
  recipient: string;
  timestamp: string;
}

export interface DashboardData {
  propertyStats: PropertyStats;
  notifications: Notification[];
  recentActivities: Activity[];
  criticalAlerts: Alert[];
  transitTimeData: TransitTimeData[];
  inventoryLevelData: InventoryLevelData[];
  paymentResolutionData: PaymentResolutionData[];
  transferVolumeData: TransferVolumeData[];
  supplyChain: {
    suppliers: SupplyNode[];
    warehouses: SupplyNode[];
    customers: SupplyNode[];
    connections: FlowConnection[];
  };
  pendingApprovals: ApprovalItem[];
  quickTransfer: {
    items: InventoryItem[];
    recipients: TransferRecipient[];
    recentTransfers: RecentTransfer[];
  };
}

export const mockDashboardData: DashboardData = {
  propertyStats: {
    totalItems: 2647,
    serviceableItems: 2342,
    maintenanceNeeded: 173,
    pendingReceipts: 132,
    criticalItems: {
      count: 8,
      items: [
        {
          id: '1',
          name: 'Colombian Coffee Beans',
          status: 'Low Stock',
          shortage: 50,
          priority: 'high',
        },
        {
          id: '2',
          name: 'Ethiopian Yirgacheffe',
          status: 'Back Ordered',
          shortage: 25,
          priority: 'medium',
        },
        {
          id: '3',
          name: 'Kenya AA Beans',
          status: 'Low Stock',
          shortage: 15,
          priority: 'medium',
        },
        {
          id: '4',
          name: 'Sumatra Mandheling',
          status: 'Out of Stock',
          shortage: 30,
          priority: 'high',
        },
      ],
    },
  },
  notifications: [
    {
      id: '1',
      type: 'warning',
      message: 'Low inventory alert: Ethiopian Yirgacheffe (15 kg remaining)',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      read: false,
      actionRequired: true,
    },
    {
      id: '2',
      type: 'info',
      message: 'New order received from Café Aroma (#ORD-2023-05212)',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      read: false,
    },
    {
      id: '3',
      type: 'success',
      message: 'Payment received from Mountain Beans Co. ($2,450.00)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      read: true,
    },
    {
      id: '4',
      type: 'error',
      message: 'Shipment delayed: Order #ORD-2023-05198',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      read: false,
      actionRequired: true,
    },
    {
      id: '5',
      type: 'info',
      message: 'New quality certification received for Colombian Coffee Beans',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      read: true,
    },
  ],
  recentActivities: [
    {
      id: '1',
      type: 'inventory',
      message: 'Added 200 kg of Colombian Coffee Beans to inventory',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: 'John Smith',
      userAvatar: '/assets/images/avatars/1.jpg',
      itemId: 'INV-001',
    },
    {
      id: '2',
      type: 'transaction',
      message: 'Processed payment from Café Delights ($1,250.00)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      user: 'Maria Rodriguez',
      userAvatar: '/assets/images/avatars/2.jpg',
    },
    {
      id: '3',
      type: 'order',
      message: 'Fulfilled order #ORD-2023-05210 for Mountain Coffee Co.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      user: 'Alex Johnson',
      userAvatar: '/assets/images/avatars/3.jpg',
      itemId: 'ORD-2023-05210',
    },
    {
      id: '4',
      type: 'transfer',
      message: 'Transferred 50 kg of Ethiopia Yirgacheffe to Warehouse B',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      user: 'Sam Williams',
      userAvatar: '/assets/images/avatars/4.jpg',
      itemId: 'TRF-2023-00325',
    },
    {
      id: '5',
      type: 'system',
      message: 'System maintenance completed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ],
  criticalAlerts: [
    {
      id: '1',
      type: 'inventory',
      message: 'Critical inventory shortage: Kenya AA Beans (5 kg remaining)',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      details: 'Current stock will last approximately 2 days based on current consumption rate. Please reorder immediately.',
    },
    {
      id: '2',
      type: 'shipment',
      message: 'Delayed shipment: Order #ORD-2023-05198 for Café Express',
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      details: 'Shipment has been delayed by 2 days due to logistical issues. Customer has been notified.',
    },
    {
      id: '3',
      type: 'contract',
      message: 'Contract expiring soon: Green Bean Supplier Agreement (5 days)',
      timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
      details: 'The current supplier agreement with Colombia Direct Trade will expire in 5 days. Please review and renew to avoid supply chain disruption.',
    },
  ],
  transitTimeData: [
    { route: 'Colombia to Warehouse A', avgTime: 12, target: 10 },
    { route: 'Ethiopia to Warehouse A', avgTime: 18, target: 15 },
    { route: 'Warehouse A to Café Partners', avgTime: 2, target: 3 },
    { route: 'Warehouse B to Retail Points', avgTime: 1.5, target: 2 },
  ],
  inventoryLevelData: [
    { date: 'Jan', coffee: 500, equipment: 120, packaging: 300, min: 200, max: 600 },
    { date: 'Feb', coffee: 450, equipment: 115, packaging: 280, min: 200, max: 600 },
    { date: 'Mar', coffee: 480, equipment: 130, packaging: 310, min: 200, max: 600 },
    { date: 'Apr', coffee: 520, equipment: 135, packaging: 320, min: 200, max: 600 },
    { date: 'May', coffee: 580, equipment: 140, packaging: 350, min: 200, max: 600 },
    { date: 'Jun', coffee: 620, equipment: 150, packaging: 370, min: 200, max: 600 },
  ],
  paymentResolutionData: [
    { name: 'Paid on Time', value: 78, color: '#4CAF50' },
    { name: 'Paid Late', value: 17, color: '#FFC107' },
    { name: 'Disputed', value: 3, color: '#F44336' },
    { name: 'Pending', value: 2, color: '#2196F3' },
  ],
  transferVolumeData: [
    { week: 'Week 1', inbound: 450, outbound: 380, internal: 120, total: 950 },
    { week: 'Week 2', inbound: 520, outbound: 420, internal: 150, total: 1090 },
    { week: 'Week 3', inbound: 480, outbound: 460, internal: 130, total: 1070 },
    { week: 'Week 4', inbound: 510, outbound: 490, internal: 110, total: 1110 },
  ],
  supplyChain: {
    suppliers: [
      { id: 'sup1', name: 'Colombia Direct Trade', type: 'supplier', status: 'success', details: { items: 120, value: 45000 } },
      { id: 'sup2', name: 'Ethiopia Cooperative', type: 'supplier', status: 'warning', details: { items: 80, value: 32000 } },
      { id: 'sup3', name: 'Kenya Highlands Farms', type: 'supplier', status: 'success', details: { items: 65, value: 28000 } },
    ],
    warehouses: [
      { id: 'wh1', name: 'Warehouse A', type: 'warehouse', status: 'success', details: { items: 450, value: 180000 } },
      { id: 'wh2', name: 'Warehouse B', type: 'warehouse', status: 'warning', details: { items: 320, value: 125000 } },
    ],
    customers: [
      { id: 'cust1', name: 'Café Partners Network', type: 'customer', status: 'success', details: { items: 35, value: 18000 } },
      { id: 'cust2', name: 'Retail Distribution', type: 'customer', status: 'success', details: { items: 42, value: 21000 } },
      { id: 'cust3', name: 'Online Store Fulfillment', type: 'customer', status: 'error', details: { items: 15, value: 7500 } },
    ],
    connections: [
      { from: 'sup1', to: 'wh1', status: 'success', active: true, position: [20, 30, 30, 45] },
      { from: 'sup2', to: 'wh1', status: 'warning', active: true, position: [20, 40, 30, 35] },
      { from: 'sup3', to: 'wh2', status: 'success', active: true, position: [20, 50, 30, 25] },
      { from: 'wh1', to: 'cust1', status: 'success', active: true, position: [60, 30, 30, -45] },
      { from: 'wh1', to: 'cust2', status: 'success', active: true, position: [60, 40, 30, -35] },
      { from: 'wh2', to: 'cust3', status: 'error', active: true, position: [60, 50, 30, -25] },
    ],
  },
  pendingApprovals: [
    { 
      id: 'apr1', 
      itemName: 'Colombian Coffee Beans', 
      quantity: 500, 
      source: 'Colombia Direct Trade', 
      destination: 'Warehouse A', 
      value: 8500, 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      priority: 'high'
    },
    { 
      id: 'apr2', 
      itemName: 'Packaging Materials', 
      quantity: 2000, 
      source: 'Eco Packaging Inc', 
      destination: 'Warehouse B', 
      value: 3200, 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
      priority: 'medium'
    },
    { 
      id: 'apr3', 
      itemName: 'Espresso Machines', 
      quantity: 10, 
      source: 'Equipment Supplier', 
      destination: 'Warehouse A', 
      value: 12000, 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      priority: 'low'
    },
    { 
      id: 'apr4', 
      itemName: 'Kenya AA Beans', 
      quantity: 300, 
      source: 'Kenya Highlands Farms', 
      destination: 'Warehouse A', 
      value: 6500, 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 60).toISOString(),
      priority: 'high'
    },
  ],
  quickTransfer: {
    items: [
      { id: 'item1', name: 'Colombian Coffee Beans', stock: 450 },
      { id: 'item2', name: 'Ethiopian Yirgacheffe', stock: 280 },
      { id: 'item3', name: 'Kenya AA Beans', stock: 320 },
      { id: 'item4', name: 'Sumatra Mandheling', stock: 175 },
      { id: 'item5', name: 'Brazil Santos', stock: 520 },
    ],
    recipients: [
      { id: 'rec1', name: 'Warehouse A', type: 'internal' },
      { id: 'rec2', name: 'Warehouse B', type: 'internal' },
      { id: 'rec3', name: 'Café Partners Network', type: 'customer' },
      { id: 'rec4', name: 'Mountain Beans Co.', type: 'customer' },
      { id: 'rec5', name: 'Retail Distribution', type: 'customer' },
    ],
    recentTransfers: [
      { 
        id: 'trf1', 
        itemName: 'Kenya AA Beans', 
        quantity: 50, 
        recipient: 'Warehouse B', 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() 
      },
      { 
        id: 'trf2', 
        itemName: 'Colombian Coffee Beans', 
        quantity: 100, 
        recipient: 'Café Partners Network', 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() 
      },
      { 
        id: 'trf3', 
        itemName: 'Ethiopian Yirgacheffe', 
        quantity: 75, 
        recipient: 'Mountain Beans Co.', 
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() 
      },
    ]
  }
}; 