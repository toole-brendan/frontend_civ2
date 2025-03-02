import React from 'react';
import { Box, Card, SxProps, Theme, IconButton, Tooltip, alpha } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from './CardHeader';

// Use primary color from theme
export interface DashboardCardProps {
  /**
   * The title text for the card
   */
  title: string;
  
  /**
   * Optional subtitle to display below the title
   */
  subtitle?: string | React.ReactNode;
  
  /**
   * Content to display in the card body
   */
  content?: React.ReactNode;
  
  /**
   * Alternative to content prop, can be used for more complex content
   */
  children?: React.ReactNode;
  
  /**
   * Custom icon for the action button (defaults to MoreVertIcon)
   */
  actionIcon?: React.ReactNode;
  
  /**
   * Additional styles to apply to the Card component
   */
  sx?: SxProps<Theme>;
  
  /**
   * Card appearance variant
   * @default 'default'
   */
  variant?: 'default' | 'gradient' | 'outlined' | 'accent' | 'filled';
  
  /**
   * Accent color for 'accent' variant (uses theme palette colors)
   */
  accentColor?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  
  /**
   * Card elevation (0-24)
   * @default 0
   */
  elevation?: number;
  
  /**
   * Function called when action icon is clicked
   */
  onActionClick?: () => void;
  
  /**
   * Optional footer content to display at the bottom of the card
   */
  footer?: React.ReactNode;
  
  /**
   * Optional padding for the card content
   * @default 2
   */
  contentPadding?: number | string;
  
  /**
   * Optional background color for the filled variant
   * @default theme.palette.primary.main
   */
  backgroundColor?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  subtitle,
  content, 
  children, 
  actionIcon, 
  sx, 
  variant = 'default',
  accentColor = 'primary',
  elevation = 0,
  onActionClick,
  footer,
  contentPadding = 2,
  backgroundColor
}) => {
  // Define variant-specific styles 
  const getCardStyle = (theme: Theme) => {
    switch(variant) {
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
      case 'filled':
        return {
          backgroundColor: backgroundColor || theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '& .MuiCardHeader-title': {
            color: theme.palette.primary.contrastText,
          },
          '& .MuiCardHeader-subheader': {
            color: alpha(theme.palette.primary.contrastText, 0.7),
          },
          '& .MuiIconButton-root': {
            color: alpha(theme.palette.primary.contrastText, 0.7),
          },
        };
      default:
        return {};
    }
  };

  // Prepare optional action button for the card header
  const headerAction = onActionClick || actionIcon ? (
    <Tooltip title="More options">
      <IconButton 
        size="small" 
        onClick={onActionClick}
      >
        {actionIcon || <MoreVertIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  ) : undefined;

  return (
    <Card 
      elevation={elevation}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
          transform: elevation > 0 ? 'translateY(-4px)' : 'none',
          boxShadow: (theme) => elevation > 0 ? 
            `0 8px 24px ${
              theme.palette.mode === 'dark' 
                ? 'rgba(0,0,0,0.4)' 
                : 'rgba(0,0,0,0.1)'
            }` : undefined,
        },
        overflow: 'hidden',
        ...((theme) => getCardStyle(theme)),
        ...sx 
      }}
    >
      <CardHeader 
        title={title}
        subtitle={subtitle}
        action={headerAction}
      />
      
      <Box 
        sx={{ 
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          p: contentPadding,
          position: 'relative',
        }}
      >
        {content || children}
      </Box>
      
      {footer && (
        <Box 
          sx={(theme) => ({ 
            p: 2, 
            borderTop: 1, 
            borderColor: variant === 'filled' 
              ? alpha(theme.palette.primary.contrastText, 0.1) 
              : theme.palette.divider,
            bgcolor: variant === 'filled' 
              ? alpha(theme.palette.primary.dark, 0.2)  
              : theme.palette.mode === 'dark' 
                ? alpha(theme.palette.background.paper, 0.6)
                : alpha(theme.palette.background.paper, 0.8),
            color: variant === 'filled' 
              ? alpha(theme.palette.primary.contrastText, 0.7) 
              : 'inherit',
          })}
        >
          {footer}
        </Box>
      )}
    </Card>
  );
};

export default DashboardCard;
