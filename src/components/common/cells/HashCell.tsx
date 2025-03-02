import React from 'react';
import { Typography, useTheme, alpha, Box, Tooltip, SxProps, Theme } from '@mui/material';
import { fontFamilies } from '../../../theme/typography';

export interface HashCellProps {
  /**
   * The hash value to display
   */
  value: string;
  
  /**
   * Optional truncation length. If provided, the hash will be truncated
   * with ellipsis in the middle (e.g., '0x1234...5678')
   */
  truncate?: number;
  
  /**
   * Optional tooltip text to display on hover
   */
  tooltip?: string;
  
  /**
   * Optional icon to display before the hash
   */
  icon?: React.ReactNode;
  
  /**
   * Optional styles to apply to the component
   */
  sx?: SxProps<Theme>;
  
  /**
   * Optional click handler
   */
  onClick?: () => void;
  
  /**
   * Optional copy-to-clipboard functionality
   * @default false
   */
  copyable?: boolean;
  
  /**
   * Size variant
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * HashCell component displays blockchain hashes or other code-like data
 * with consistent styling and optional truncation.
 */
export const HashCell: React.FC<HashCellProps> = ({
  value,
  truncate,
  tooltip,
  icon,
  sx,
  onClick,
  copyable = false,
  size = 'medium'
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';
  
  // Function to truncate the hash if needed
  const formatHash = (hash: string): string => {
    if (!truncate || hash.length <= truncate) {
      return hash;
    }
    
    const firstPart = hash.slice(0, truncate / 2);
    const lastPart = hash.slice(-(truncate / 2));
    return `${firstPart}...${lastPart}`;
  };

  // Get font size based on size prop
  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '0.75rem';
      case 'large':
        return '0.9375rem';
      default:
        return '0.8125rem';
    }
  };
  
  // Get padding based on size prop
  const getPadding = () => {
    switch (size) {
      case 'small':
        return '2px 6px';
      case 'large':
        return '6px 12px';
      default:
        return '4px 8px';
    }
  };
  
  const displayedHash = formatHash(value);
  const hashElement = (
    <Typography 
      variant="body2" 
      sx={{ 
        fontFamily: fontFamilies.mono,
        bgcolor: isLightMode 
          ? 'rgba(237, 242, 247, 0.8)' 
          : 'rgba(39, 39, 42, 0.5)',
        px: 1,
        py: 0.5,
        borderRadius: 1,
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: getFontSize(),
        padding: getPadding(),
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        '&:hover': onClick ? {
          bgcolor: isLightMode 
            ? 'rgba(224, 231, 243, 0.9)' 
            : 'rgba(45, 55, 72, 0.6)',
        } : {},
        ...sx
      }}
      onClick={onClick}
    >
      {icon && (
        <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
          {icon}
        </Box>
      )}
      {displayedHash}
    </Typography>
  );
  
  // If tooltip is provided, wrap the hash element in a Tooltip
  if (tooltip) {
    return (
      <Tooltip title={tooltip || value} arrow>
        {hashElement}
      </Tooltip>
    );
  }
  
  return hashElement;
};

export default HashCell;
