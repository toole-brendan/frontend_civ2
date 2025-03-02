import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface CardHeaderProps {
  /**
   * The title text for the card header
   */
  title: string;
  
  /**
   * Optional subtitle text or ReactNode to display below the title
   */
  subtitle?: string | React.ReactNode;
  
  /**
   * Optional actions to display on the right side of the header (buttons, icons, etc.)
   */
  action?: React.ReactNode;
  
  /**
   * Controls if the header has a bottom border
   * @default true
   */
  divider?: boolean;
  
  /**
   * Additional CSS styles to apply to the root component
   */
  sx?: React.CSSProperties;
}

/**
 * CardHeader component that provides consistent styling for card headers across the application.
 * This standardized component ensures visual consistency in all cards throughout the app.
 */
const CardHeader: React.FC<CardHeaderProps> = ({ 
  title, 
  subtitle, 
  action,
  divider = true,
  sx = {}
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start', 
      mb: 2,
      pb: divider ? 1.5 : 0,
      borderBottom: divider ? `1px solid ${theme.palette.divider}` : 'none',
      ...sx
    }}>
      <Box>
        <Typography variant="h6" sx={{ mb: subtitle ? 0.5 : 0 }}>
          {title}
        </Typography>
        {subtitle && (
          typeof subtitle === 'string' ? (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          ) : (
            subtitle
          )
        )}
      </Box>
      {action && (
        <Box sx={{ ml: 2 }}>
          {action}
        </Box>
      )}
    </Box>
  );
};

export default CardHeader;
