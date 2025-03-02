import React, { ReactElement } from 'react';
import { Box, useTheme, SxProps, Theme, CircularProgress, Tooltip } from '@mui/material';
import StatusChip, { StatusType } from '../StatusChip';

export interface StatusCellProps {
  /**
   * The status text to display
   */
  label: string;
  
  /**
   * The type of status which determines the color
   */
  status: StatusType;
  
  /**
   * Optional icon to display before the status text.
   * Must be a React element, not just any React node.
   */
  icon?: ReactElement;
  
  /**
   * Visual variant of the chip
   * @default 'subtle'
   */
  variant?: 'filled' | 'outlined' | 'subtle';
  
  /**
   * Size of the chip
   * @default 'small'
   */
  size?: 'small' | 'medium';
  
  /**
   * Optional styles to apply to the component
   */
  sx?: SxProps<Theme>;
  
  /**
   * Optional click handler
   */
  onClick?: () => void;
  
  /**
   * Whether the status is in a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Optional tooltip text to display on hover
   */
  tooltip?: string;
}

/**
 * StatusCell component wraps StatusChip with additional table cell specific
 * functionality like loading state and icon support.
 */
export const StatusCell: React.FC<StatusCellProps> = ({
  label,
  status,
  icon,
  variant = 'subtle',
  size = 'small',
  sx,
  onClick,
  loading = false,
  tooltip
}) => {
  const theme = useTheme();
  
  // Show loading indicator when in loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CircularProgress size={16} sx={{ mr: 1 }} />
        <StatusChip
          label="Loading..."
          status="info"
          variant={variant}
          size={size}
          sx={sx}
        />
      </Box>
    );
  }
  
  // Get status color consistently
  const getStatusFromText = (text: string): StatusType => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('critical') || lowerText.includes('error') || lowerText.includes('failed')) {
      return 'error';
    }
    if (lowerText.includes('warn') || lowerText.includes('low') || lowerText.includes('pending')) {
      return 'warning';
    }
    if (lowerText.includes('success') || lowerText.includes('healthy') || lowerText.includes('verified')) {
      return 'success';
    }
    if (lowerText.includes('info') || lowerText.includes('normal')) {
      return 'info';
    }
    
    return status || 'default';
  };
  
  // Determine status type based on text and passed status
  const statusType = status || getStatusFromText(label);
  
  // Render the StatusChip, conditionally wrapped in a Tooltip if tooltip prop is provided
  const statusChip = (
    <StatusChip
      label={label}
      status={statusType}
      variant={variant}
      size={size}
      {...(icon ? { icon } : {})}
      onClick={onClick}
      sx={sx}
    />
  );

  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {statusChip}
    </Tooltip>
  ) : statusChip;
};

export default StatusCell;
