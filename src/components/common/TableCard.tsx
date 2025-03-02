import React from 'react';
import {
  Card,
  CardContent,
  Toolbar,
  Typography,
  useTheme,
  SxProps,
  Theme,
  alpha
} from '@mui/material';
import DataTable, { DataTableProps } from './DataTable';

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
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';
  
  // Get card style based on variant
  const getCardStyle = () => {
    switch (cardVariant) {
      case 'gradient':
        return {
          background: 
            `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${
              theme.palette.mode === 'dark' 
                ? alpha(theme.palette.primary.main, 0.1)
                : alpha(theme.palette.primary.main, 0.05)
            } 100%)`,
        };
      case 'outlined':
        return {
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
        };
      case 'accent':
        return {
          borderTop: `3px solid ${theme.palette[accentColor].main}`,
        };
      default:
        return {};
    }
  };
  
  // Get toolbar background color based on theme
  const getToolbarBgColor = () => 
    isLightMode 
      ? 'rgba(237, 242, 247, 0.5)' 
      : 'rgba(39, 39, 42, 0.5)';

  return (
    <Card
      elevation={elevation}
      sx={{
        borderRadius: 2,
        border: isLightMode ? 'none' : `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
          transform: elevation > 0 ? 'translateY(-4px)' : 'none',
          boxShadow: elevation > 0 ? 
            `0 8px 24px ${
              theme.palette.mode === 'dark' 
                ? 'rgba(0,0,0,0.4)' 
                : 'rgba(0,0,0,0.1)'
            }` : undefined,
        },
        ...getCardStyle(),
        ...sx
      }}
    >
      <Toolbar
        sx={{
          px: { sm: 2 },
          py: 2,
          bgcolor: getToolbarBgColor(),
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <div style={{ flex: '1 1 100%' }}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </div>
        
        {toolbarActions}
      </Toolbar>
      
      <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <DataTable {...tableProps} sx={{ flex: 1 }} />
      </CardContent>
      
      {footer && (
        <div
          style={{
            padding: theme.spacing(2),
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.8),
          }}
        >
          {footer}
        </div>
      )}
    </Card>
  );
};

export default TableCard;
