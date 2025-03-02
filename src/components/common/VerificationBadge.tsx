import React from 'react';
import {
  Chip,
  Tooltip,
  Box,
  Typography,
  alpha,
  useTheme
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export interface VerificationBadgeProps {
  /**
   * Verification status
   */
  status: 'verified' | 'pending' | 'unverified' | 'failed';

  /**
   * Number of verifications (for blockchain verification)
   * @default 0
   */
  verifications?: number;
  
  /**
   * Whether to display the number of verifications
   * @default false 
   */
  showCount?: boolean;
  
  /**
   * Size of the badge
   * @default 'small'
   */
  size?: 'small' | 'medium';
  
  /**
   * Optional transaction hash to display in tooltip
   */
  txHash?: string;
  
  /**
   * Optional additional information to display in tooltip
   */
  tooltipInfo?: string;
  
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * VerificationBadge component displays blockchain verification status
 * in a consistent format across the application.
 */
export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  status,
  verifications = 0,
  showCount = false,
  size = 'small',
  txHash,
  tooltipInfo,
  onClick
}) => {
  const theme = useTheme();
  
  // Determine color and icon based on status
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: <VerifiedUserIcon fontSize="small" />,
          color: theme.palette.success.main,
          backgroundColor: alpha(theme.palette.success.main, 0.15),
          label: showCount ? `${verifications} verifications` : 'Verified'
        };
      case 'pending':
        return {
          icon: <HelpOutlineIcon fontSize="small" />,
          color: theme.palette.info.main,
          backgroundColor: alpha(theme.palette.info.main, 0.15),
          label: 'Pending verification'
        };
      case 'failed':
        return {
          icon: <ErrorOutlineIcon fontSize="small" />,
          color: theme.palette.error.main,
          backgroundColor: alpha(theme.palette.error.main, 0.15),
          label: 'Verification failed'
        };
      case 'unverified':
      default:
        return {
          icon: <HelpOutlineIcon fontSize="small" />,
          color: theme.palette.text.secondary,
          backgroundColor: alpha(theme.palette.text.secondary, 0.1),
          label: 'Not verified'
        };
    }
  };
  
  const { icon, color, backgroundColor, label } = getStatusConfig();
  
  // Create tooltip content
  const tooltipContent = (
    <Box sx={{ maxWidth: 300, p: 0.5 }}>
      <Typography variant="subtitle2">
        {status === 'verified' ? 'Blockchain Verified' : status === 'pending' ? 'Verification Pending' : status === 'failed' ? 'Verification Failed' : 'Not Verified'}
      </Typography>
      
      {verifications > 0 && (
        <Typography variant="body2">
          Verified by {verifications} node{verifications !== 1 ? 's' : ''}
        </Typography>
      )}
      
      {txHash && (
        <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5, wordBreak: 'break-all' }}>
          TX: {txHash}
        </Typography>
      )}
      
      {tooltipInfo && (
        <Typography variant="body2" sx={{ mt: 0.5 }}>
          {tooltipInfo}
        </Typography>
      )}
    </Box>
  );
  
  return (
    <Tooltip title={tooltipContent} arrow>
      <Chip
        icon={icon}
        label={label}
        size={size}
        onClick={onClick}
        sx={{
          bgcolor: backgroundColor,
          color: color,
          fontWeight: 'medium',
          '& .MuiChip-icon': {
            color: color
          }
        }}
      />
    </Tooltip>
  );
};

export default VerificationBadge;
