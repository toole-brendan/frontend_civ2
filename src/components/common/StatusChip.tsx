import React from 'react';
import { Chip, ChipProps, useTheme, alpha } from '@mui/material';
import { fontWeights } from '../../theme/typography';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary' | 'secondary';

// Define our own Chip variant types that include our custom 'subtle' variant
type ChipVariantType = 'filled' | 'outlined' | 'subtle';

interface StatusChipProps extends Omit<ChipProps, 'color' | 'variant'> {
  /**
   * The status type that determines the color
   * @default 'default'
   */
  status: StatusType;
  
  /**
   * Text to display in the chip
   */
  label: string;
  
  /**
   * Visual variant of the chip
   * @default 'filled'
   */
  variant?: ChipVariantType;
  
  /**
   * Size of the chip
   * @default 'small'
   */
  size?: 'small' | 'medium';
}

/**
 * StatusChip component provides consistent status indicators across the application.
 * It uses standardized colors and styling based on the status type.
 */
const StatusChip: React.FC<StatusChipProps> = ({
  status = 'default',
  label,
  variant = 'filled',
  size = 'small',
  ...props
}) => {
  const theme = useTheme();
  
  // Get the appropriate color based on status
  const getStatusColor = (statusType: StatusType) => {
    switch (statusType) {
      case 'success':
        return theme.palette.success.main;
      case 'warning':
        return theme.palette.warning.main;
      case 'error':
        return theme.palette.error.main;
      case 'info':
        return theme.palette.info.main;
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      default:
        return theme.palette.mode === 'dark' ? '#555555' : '#e0e0e0';
    }
  };
  
  // Determine background and text colors based on variant
  const getChipStyles = () => {
    const statusColor = getStatusColor(status);
    
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${statusColor}`,
          color: statusColor,
        };
      case 'subtle':
        return {
          backgroundColor: alpha(statusColor, theme.palette.mode === 'dark' ? 0.15 : 0.1),
          border: 'none',
          color: theme.palette.mode === 'dark' ? statusColor : (
            status === 'default' ? theme.palette.text.primary : statusColor
          ),
        };
      default: // filled
        return {
          backgroundColor: statusColor,
          border: 'none',
          color: '#ffffff',
          '& .MuiChip-deleteIcon': {
            color: '#ffffff',
          }
        };
    }
  };
  
  return (
    <Chip
      label={label}
      size={size}
      {...props}
      sx={{
        fontWeight: fontWeights.medium,
        height: size === 'small' ? 24 : 32,
        ...getChipStyles(),
        ...(props.sx || {})
      }}
    />
  );
};

export default StatusChip;
