import React from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  SxProps, 
  Theme, 
  Tooltip,
  Badge,
  alpha
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShieldIcon from '@mui/icons-material/Shield';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export type VerificationStatus = 'verified' | 'pending' | 'failed' | 'unverified';

export interface VerifiedCellProps {
  /**
   * Verification status
   */
  status: VerificationStatus;
  
  /**
   * Text to display alongside the verification icon
   */
  text?: string;
  
  /**
   * Whether to only show the icon
   * @default false
   */
  iconOnly?: boolean;
  
  /**
   * Optional tooltip text to display on hover
   */
  tooltip?: string;
  
  /**
   * Optional additional information about the verification
   */
  verificationDetails?: {
    timestamp?: string;
    authority?: string;
    blockNumber?: number | string;
    transactionHash?: string;
  };
  
  /**
   * Size of the verification badge
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * Custom styles to apply to the component
   */
  sx?: SxProps<Theme>;
  
  /**
   * Optional click handler for the verification badge
   */
  onClick?: () => void;
}

/**
 * VerifiedCell displays blockchain verification status with appropriate 
 * iconography and styling.
 */
export const VerifiedCell: React.FC<VerifiedCellProps> = ({
  status,
  text,
  iconOnly = false,
  tooltip,
  verificationDetails,
  size = 'medium',
  sx,
  onClick
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';
  
  // Get appropriate icon and color based on verification status
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: <VerifiedIcon fontSize={getIconSize()} />,
          color: theme.palette.primary.main,
          label: text || 'Verified',
          tooltipText: tooltip || 'Blockchain Verified'
        };
      case 'pending':
        return {
          icon: <HourglassEmptyIcon fontSize={getIconSize()} />,
          color: theme.palette.warning.main,
          label: text || 'Pending Verification',
          tooltipText: tooltip || 'Verification in Progress'
        };
      case 'failed':
        return {
          icon: <ErrorOutlineIcon fontSize={getIconSize()} />,
          color: theme.palette.error.main,
          label: text || 'Verification Failed',
          tooltipText: tooltip || 'Verification Failed'
        };
      case 'unverified':
        return {
          icon: <ShieldIcon fontSize={getIconSize()} />,
          color: theme.palette.mode === 'dark' ? '#555555' : '#e0e0e0',
          label: text || 'Unverified',
          tooltipText: tooltip || 'Not Blockchain Verified'
        };
    }
  };
  
  // Get icon size based on size prop
  const getIconSize = (): 'small' | 'medium' | 'inherit' => {
    switch (size) {
      case 'small':
        return 'small';
      case 'large':
        return 'medium';
      default:
        return 'small';
    }
  };
  
  // Get text size based on size prop
  const getTextSize = (): string => {
    switch (size) {
      case 'small':
        return '0.75rem';
      case 'large':
        return '0.925rem';
      default:
        return '0.8125rem';
    }
  };
  
  // Get badge size based on size prop
  const getBadgeSize = (): number => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 32;
      default:
        return 24;
    }
  };
  
  const statusConfig = getStatusConfig();
  
  // Format verification details for the tooltip
  const getDetailsTooltip = () => {
    if (!verificationDetails) return statusConfig.tooltipText;
    
    const details = [];
    if (verificationDetails.timestamp) details.push(`Time: ${verificationDetails.timestamp}`);
    if (verificationDetails.authority) details.push(`Authority: ${verificationDetails.authority}`);
    if (verificationDetails.blockNumber) details.push(`Block: ${verificationDetails.blockNumber}`);
    if (verificationDetails.transactionHash) details.push(`TX: ${verificationDetails.transactionHash}`);
    
    return `${statusConfig.tooltipText}\n${details.join('\n')}`;
  };
  
  // Create the badge element
  const getBadge = () => (
    <Badge
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: status === 'verified' 
            ? alpha(statusConfig.color, isLightMode ? 0.1 : 0.2)
            : 'transparent',
          color: statusConfig.color,
          width: getBadgeSize(),
          height: getBadgeSize(),
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(status === 'verified' && isLightMode && {
            border: `1px solid ${alpha(statusConfig.color, 0.5)}`,
          }),
          ...(status === 'verified' && theme.palette.mode === 'dark' && {
            boxShadow: `0 0 8px ${alpha(statusConfig.color, 0.5)}`,
          }),
          transition: 'all 0.2s ease',
          cursor: onClick ? 'pointer' : 'default',
        },
        ...sx
      }}
      badgeContent={statusConfig.icon}
      onClick={onClick}
    >
      {!iconOnly && (
        <Typography 
          variant="body2"
          sx={{ 
            ml: 3.5,
            color: status === 'unverified' ? 'text.secondary' : 'inherit',
            fontSize: getTextSize(),
          }}
        >
          {statusConfig.label}
        </Typography>
      )}
    </Badge>
  );
  
  return (
    <Tooltip 
      title={getDetailsTooltip()} 
      arrow
      placement="top"
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
        {getBadge()}
      </Box>
    </Tooltip>
  );
};

export default VerifiedCell;
