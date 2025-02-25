// Analytics Types for Coffee Business

// Main metric summaries
export interface BusinessMetrics {
  totalRevenue: number;
  lastMonthRevenue: number;
  totalCost: number;
  grossProfit: number;
  profitMargin: number;
  totalOrders: number;
  averageOrderValue: number;
  returnRate: number;
  totalCustomers: number;
  newCustomers: number;
  repeatRate: number;
}

// Time period options for data filtering
export type TimePeriod = 
  | 'today'
  | 'yesterday'
  | 'last7Days'
  | 'last30Days'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisQuarter'
  | 'lastQuarter'
  | 'thisYear'
  | 'lastYear'
  | 'custom';

// Comparison types for trends
export type ComparisonType =
  | 'previousPeriod'
  | 'samePeroidLastYear'
  | 'custom';

// Coffee-specific sales metrics
export interface SalesAnalytics {
  period: string;
  sales: number;
  costs: number;
  profit: number;
  ordersCount: number;
  averageOrderValue: number;
}

// Supply chain analytics
export interface SupplyChainAnalytics {
  averageLeadTime: number;
  inventoryTurnover: number;
  stockoutRate: number;
  suppliersPerformance: SupplierPerformance[];
  inventoryAgingByProduct: InventoryAging[];
  orderFulfillmentRate: number;
  warehousingCosts: number;
  shippingCosts: number;
  inventoryLevels: TrendPoint[];
  receivingEfficiency: number;
}

// Quality metrics for coffee
export interface QualityAnalytics {
  averageCuppingScore: number;
  defectRate: number;
  qualityByOrigin: OriginQuality[];
  qualityTrends: TrendPoint[];
  returnRate: number;
  customerSatisfaction: number;
  qualityIssuesByType: QualityIssue[];
  certificationCompliance: CertificationCompliance[];
}

// Financial analytics
export interface FinancialAnalytics {
  revenueByMonth: TrendPoint[];
  costByMonth: TrendPoint[];
  profitByMonth: TrendPoint[];
  marginByProduct: ProductMargin[];
  marginByOrigin: OriginMargin[];
  costBreakdown: CostBreakdown[];
  cashFlow: TrendPoint[];
  paymentTermsPerformance: PaymentPerformance[];
  accountsReceivable: number;
  accountsPayable: number;
}

// Sustainability metrics
export interface SustainabilityAnalytics {
  carbonFootprint: number;
  waterUsage: number;
  certifiedProductPercentage: number;
  sustainabilityByOrigin: OriginSustainability[];
  fairTradePremiumPaid: number;
  communityInvestment: number;
  sustainabilityInitiatives: SustainabilityInitiative[];
  carbonFootprintTrend: TrendPoint[];
  sustainabilityScoreByProduct: ProductSustainability[];
}

// Supporting types
export interface ProductSales {
  productId: string;
  productName: string;
  quantity: number;
  value: number;
  percentageOfTotal: number;
}

export interface OriginSales {
  origin: string;
  quantity: number;
  value: number;
  percentageOfTotal: number;
}

export interface RoastLevelSales {
  roastLevel: 'LIGHT' | 'MEDIUM' | 'DARK' | 'SPECIALTY';
  quantity: number;
  value: number;
  percentageOfTotal: number;
}

export interface CustomerTypeSales {
  customerType: 'CAFE' | 'ROASTER' | 'DISTRIBUTOR' | 'RETAILER' | 'DIRECT';
  quantity: number;
  value: number;
  percentageOfTotal: number;
}

export interface RegionSales {
  region: string;
  quantity: number;
  value: number;
  percentageOfTotal: number;
}

export interface TrendPoint {
  date: string;
  value: number;
  comparisonValue?: number;
}

export interface SupplierPerformance {
  supplierId: string;
  supplierName: string;
  onTimeDeliveryRate: number;
  qualityRate: number;
  responseTime: number;
  costPerformance: number;
  overallScore: number;
}

export interface InventoryAging {
  productId: string;
  productName: string;
  totalQuantity: number;
  fresh: number; // 0-30 days
  medium: number; // 30-60 days
  aging: number; // 60-90 days
  old: number; // 90+ days
}

export interface OriginQuality {
  origin: string;
  averageCuppingScore: number;
  defectRate: number;
  consistencyScore: number;
}

export interface QualityIssue {
  issueType: string;
  frequency: number;
  percentageOfTotal: number;
}

export interface CertificationCompliance {
  certification: string;
  complianceRate: number;
  issuesCount: number;
}

export interface ProductMargin {
  productId: string;
  productName: string;
  revenue: number;
  cost: number;
  margin: number;
  marginPercentage: number;
}

export interface OriginMargin {
  origin: string;
  revenue: number;
  cost: number;
  margin: number;
  marginPercentage: number;
}

export interface CostBreakdown {
  category: string;
  value: number;
  percentageOfTotal: number;
}

export interface PaymentPerformance {
  customerOrSupplier: string;
  type: 'CUSTOMER' | 'SUPPLIER';
  onTimePaymentRate: number;
  averageDaysLate: number;
  outstandingAmount: number;
}

export interface OriginSustainability {
  origin: string;
  sustainabilityScore: number;
  certificationCoverage: number;
  communityInitiatives: number;
  environmentalImpact: number;
}

export interface SustainabilityInitiative {
  id: string;
  name: string;
  type: string;
  impact: number;
  costInvestment: number;
  startDate: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface ProductSustainability {
  productId: string;
  productName: string;
  sustainabilityScore: number;
  certifications: string[];
  carbonFootprint: number;
  waterUsage: number;
}

// Dashboard filter options
export interface AnalyticsFilters {
  timePeriod: TimePeriod;
  comparison: ComparisonType;
  products: string[];
  origins: string[];
  customers: string[];
  suppliers: string[];
  certifications: string[];
  dateRange: DateRangeType;
}

// Report configuration for saved reports
export interface ReportConfig {
  id: string;
  name: string;
  description: string;
  dashboardConfig: {
    widgets: WidgetConfig[];
    filters: AnalyticsFilters;
  };
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

// Widget configuration for report customization
export interface WidgetConfig {
  id: string;
  type: 'chart' | 'metric' | 'table' | 'map';
  title: string;
  dataKey: string; // References what data should be displayed
  size: 'small' | 'medium' | 'large';
  position: {
    x: number;
    y: number;
  };
  chartType?: 'line' | 'bar' | 'pie' | 'radar' | 'scatter';
  options?: Record<string, any>; // Additional configuration
}

export interface DateRangeType {
  startDate: Date | null;
  endDate: Date | null;
}

export interface ProductAnalytics {
  id: string;
  name: string;
  imageUrl?: string;
  origin: string;
  category: string;
  sales: number;
  revenue: number;
  profit: number;
  profitMargin: number;
  inventory: number;
  trend: number;
  rating: number;
}

export interface CustomerAnalytics {
  id: string;
  name: string;
  type: string;
  location: string;
  totalSpend: number;
  orderCount: number;
  averageOrderValue: number;
  lastOrderDate: string;
  trend: number;
}

export interface SupplierAnalytics {
  id: string;
  name: string;
  type: string;
  location: string;
  totalSpend: number;
  deliveryCount: number;
  onTimeDeliveryRate: number;
  qualityRating: number;
  lastDeliveryDate: string;
}

export interface InventoryAnalytics {
  id: string;
  name: string;
  category: string;
  stockLevel: number;
  stockValue: number;
  reorderPoint: number;
  turnoverRate: number;
  daysToExpiry: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Discontinued';
}

export interface SavedReport {
  id: string;
  name: string;
  description: string;
  filters: AnalyticsFilters;
  createdAt: string;
  lastModified: string;
  isScheduled: boolean;
  scheduleFrequency?: string;
  recipients?: string[];
}

export interface AnalyticsChartSeries {
  name: string;
  dataKey: string;
  color: string;
}

export interface TrendIndicator {
  value: number;
  label: string;
  isPercentage?: boolean;
  isPositiveBetter?: boolean;
} 