// Export all common components from a single file for easier imports

export { default as CardHeader } from './CardHeader';
export { default as StatusChip } from './StatusChip';
export { Grid } from './Grid';
export { default as DataDisplay } from './DataDisplay';
export { DashboardCard } from './DashboardCard';
export { default as PageHeader } from './PageHeader';
export { default as PageTitle } from './PageTitle';

// Table components
export { default as DataTable } from './DataTable';
export { default as TableCard } from './TableCard';
export { default as TableToolbar } from './TableToolbar';

// Cell components
export * from './cells';

// Newly added common components
export { default as KpiStatsCard } from './KpiStatsCard';
export { default as ProgressBar } from './ProgressBar';
export { default as VerificationBadge } from './VerificationBadge';

// Export types for TypeScript support
export type { KpiStatsCardProps } from './KpiStatsCard';
export type { ProgressBarProps } from './ProgressBar';
export type { VerificationBadgeProps } from './VerificationBadge';
