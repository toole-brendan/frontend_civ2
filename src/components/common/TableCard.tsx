import React from 'react';
import {
  SxProps,
  Theme,
  Typography
} from '@mui/material';
import DataTable, { DataTableProps } from './DataTable';
import {
  StyledCard,
  GradientCard,
  OutlinedCard,
  AccentCardPrimary,
  AccentCardSecondary,
  AccentCardSuccess,
  AccentCardError,
  AccentCardWarning,
  AccentCardInfo,
  StyledCardToolbar,
  StyledCardContent,
  StyledCardFooter,
  StyledCardTitle,
  StyledCardSubtitle,
  CardHeaderContainer
} from '../ui/styled/cards';

/**
 * Props for the TableCard component
 */
export interface TableCardProps<T = any> extends Omit<DataTableProps<T>, 'sx'> {
  /**
   * Title displayed in the card header
   */
  title: string;
  
  /**
   * Optional subtitle displayed below the title
   */
  subtitle?: string;
  
  /**
   * Custom actions to display in the toolbar
   */
  toolbarActions?: React.ReactNode;
  
  /**
   * Card appearance variant
   * @default 'default'
   */
  cardVariant?: 'default' | 'gradient' | 'outlined' | 'accent';
  
  /**
   * Accent color for 'accent' card variant
   */
  accentColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  
  /**
   * Card elevation (0-24)
   * @default 0
   */
  elevation?: number;
  
  /**
   * Additional styles for the Card component
   */
  sx?: SxProps<Theme>;
  
  /**
   * Optional footer content
   */
  footer?: React.ReactNode;
}

/**
 * TableCard component combines a DataTable with a standardized card layout,
 * including a toolbar, consistent styling, and optional footer.
 * This version uses styled components for better maintainability.
 */
export const TableCard = <T extends Record<string, any>>({
  title,
  subtitle,
  toolbarActions,
  cardVariant = 'default',
  accentColor = 'primary',
  elevation = 0,
  footer,
  sx,
  ...tableProps
}: TableCardProps<T>) => {
  // Choose the appropriate card component based on the variant
  const CardComponent = React.useMemo(() => {
    switch(cardVariant) {
      case 'gradient':
        return GradientCard;
      case 'outlined':
        return OutlinedCard;
      case 'accent':
        switch(accentColor) {
          case 'secondary':
            return AccentCardSecondary;
          case 'success':
            return AccentCardSuccess;
          case 'error':
            return AccentCardError;
          case 'warning':
            return AccentCardWarning;
          case 'info':
            return AccentCardInfo;
          default:
            return AccentCardPrimary;
        }
      default:
        return StyledCard;
    }
  }, [cardVariant, accentColor]);

  return (
    <CardComponent elevation={elevation} sx={sx}>
      <StyledCardToolbar>
        <CardHeaderContainer>
          <Typography variant="h6" component="h2" sx={{ fontSize: '1rem', fontWeight: 500 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </CardHeaderContainer>
        
        {toolbarActions}
      </StyledCardToolbar>
      
      <StyledCardContent>
        <DataTable {...tableProps} sx={{ flex: 1 }} />
      </StyledCardContent>
      
      {footer && (
        <StyledCardFooter>
          {footer}
        </StyledCardFooter>
      )}
    </CardComponent>
  );
};

export default TableCard;
