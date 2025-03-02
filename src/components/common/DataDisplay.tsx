import React from 'react';
import { Box, Typography, Divider, SxProps, Theme, alpha, useTheme } from '@mui/material';
import { fontFamilies } from '../../theme/typography';

// Valid palette color options
export type PaletteColorOption = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';

// Helper function to safely get color from theme palette or use direct color value
const getItemColor = (color: PaletteColorOption | string, theme: Theme): string => {
  // First check if it's one of our known palette colors
  if (color === 'primary') return theme.palette.primary.main;
  if (color === 'secondary') return theme.palette.secondary.main;
  if (color === 'success') return theme.palette.success.main;
  if (color === 'error') return theme.palette.error.main;
  if (color === 'warning') return theme.palette.warning.main;
  if (color === 'info') return theme.palette.info.main;
  
  // Otherwise, return the color value directly
  return color;
};

export interface DataItem {
  /**
   * Label for the data item
   */
  label: string;
  
  /**
   * Value to display
   */
  value: React.ReactNode;
  
  /**
   * Optional icon to display next to the label
   */
  icon?: React.ReactNode;
  
  /**
   * Optional color for the value
   * Can be a theme palette color or a direct CSS color value
   */
  color?: PaletteColorOption | string;
  
  /**
   * Whether to display the value in a monospace font
   * Useful for displaying code, IDs, or financial values
   */
  monospace?: boolean;
}

export interface DataDisplayProps {
  /**
   * Array of data items to display
   */
  data: DataItem[];
  
  /**
   * Display direction
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical';
  
  /**
   * Show dividers between items
   * @default true for vertical, false for horizontal
   */
  dividers?: boolean;
  
  /**
   * Spacing between items
   * @default 2
   */
  spacing?: number;
  
  /**
   * Size of the data display
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Additional custom styles
   */
  sx?: SxProps<Theme>;
  
  /**
   * Compact mode reduces padding and font sizes
   * @default false
   */
  compact?: boolean;
  
  /**
   * Title for the data display
   */
  title?: string;
}

/**
 * DataDisplay component for consistently showing labeled data across the application.
 * Useful for displaying specifications, details, or properties.
 */
const DataDisplay: React.FC<DataDisplayProps> = ({
  data,
  direction = 'vertical',
  dividers,
  spacing = 2,
  size = 'medium',
  sx = {},
  compact = false,
  title,
}) => {
  const theme = useTheme();
  const isVertical = direction === 'vertical';
  
  // Use provided dividers prop or default based on direction
  const showDividers = dividers ?? isVertical;
  
  // Get appropriate typography variants based on size
  const getLabelVariant = () => {
    if (compact) return 'caption';
    switch (size) {
      case 'small': return 'caption';
      case 'large': return 'subtitle2';
      default: return 'body2';
    }
  };
  
  const getValueVariant = () => {
    if (compact) return 'body2';
    switch (size) {
      case 'small': return 'body2';
      case 'large': return 'h6';
      default: return 'body1';
    }
  };
  
  const titleVariant = size === 'large' ? 'h6' : 'subtitle2';
  
  return (
    <Box sx={{ ...sx }}>
      {title && (
        <>
          <Typography 
            variant={titleVariant} 
            sx={{ 
              mb: 1,
              fontWeight: 'medium',
            }}
          >
            {title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
        </>
      )}
      
      {isVertical ? (
        // Vertical layout
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
          {data.map((item, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                {item.icon && (
                  <Box 
                    component="span" 
                    sx={{ 
                      mr: 0.75, 
                      color: 'text.secondary',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {item.icon}
                  </Box>
                )}
                <Typography 
                  variant={getLabelVariant()} 
                  color="text.secondary"
                  sx={{ fontWeight: 'medium' }}
                >
                  {item.label}
                </Typography>
              </Box>
              <Typography 
                variant={getValueVariant()} 
                sx={{ 
                  fontFamily: item.monospace ? fontFamilies.mono : 'inherit',
                  color: item.color 
                    ? getItemColor(item.color, theme)
                    : 'text.primary',
                  letterSpacing: item.monospace ? '-0.02em' : 'inherit',
                }}
              >
                {item.value}
              </Typography>
              {showDividers && index < data.length - 1 && (
                <Divider sx={{ mt: spacing }} />
              )}
            </Box>
          ))}
        </Box>
      ) : (
        // Horizontal layout
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            gap: showDividers ? 0 : spacing,
          }}
        >
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Box 
                sx={{ 
                  minWidth: compact ? 120 : 150,
                  flex: '1 1 auto',
                  p: compact ? 1 : 1.5,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  {item.icon && (
                    <Box 
                      component="span" 
                      sx={{ 
                        mr: 0.75, 
                        color: 'text.secondary',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {item.icon}
                    </Box>
                  )}
                  <Typography 
                    variant={getLabelVariant()} 
                    color="text.secondary"
                    sx={{ fontWeight: 'medium' }}
                  >
                    {item.label}
                  </Typography>
                </Box>
                <Typography 
                  variant={getValueVariant()} 
                  sx={{ 
                    fontFamily: item.monospace ? fontFamilies.mono : 'inherit',
                    color: item.color 
                      ? getItemColor(item.color, theme)
                      : 'text.primary',
                    letterSpacing: item.monospace ? '-0.02em' : 'inherit',
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
              {showDividers && index < data.length - 1 && (
                <Divider 
                  orientation="vertical" 
                  flexItem
                  sx={{ mx: 0 }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DataDisplay;
