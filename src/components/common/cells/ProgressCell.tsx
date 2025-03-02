import React from 'react';
import {
  Box,
  LinearProgress,
  Typography,
  useTheme,
  SxProps,
  Theme,
  Tooltip
} from '@mui/material';

export interface ProgressCellProps {
  /**
   * Current value to display
   */
  value: number;
  
  /**
   * Maximum value (100% reference)
   * @default 100
   */
  maxValue?: number;
  
  /**
   * Minimum value (0% reference, typically 0)
   * @default 0
   */
  minValue?: number;
  
  /**
   * Threshold below which progress shows warning color
   */
  warningThreshold?: number;
  
  /**
   * Threshold below which progress shows error color
   */
  criticalThreshold?: number;
  
  /**
   * Whether to show the value as text
   * @default true
   */
  showValue?: boolean;
  
  /**
   * Whether to show the max value
   * @default false
   */
  showMaxValue?: boolean;
  
  /**
   * Format function for the displayed value
   */
  valueFormatter?: (value: number) => string;
  
  /**
   * Label to display below the progress bar
   */
  label?: string;
  
  /**
   * Height of the progress bar
   * @default 6
   */
  barHeight?: number;
  
  /**
   * Color of the progress bar
   * If not provided, color is determined by thresholds
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  
  /**
   * Optional styles to apply to the component
   */
  sx?: SxProps<Theme>;
  
  /**
   * Optional tooltip to show on hover
   */
  tooltip?: string;
}

/**
 * ProgressCell displays a numerical value as a progress bar with optional
 * thresholds for color-coding (e.g., warning/error levels).
 */
export const ProgressCell: React.FC<ProgressCellProps> = ({
  value,
  maxValue = 100,
  minValue = 0,
  warningThreshold,
  criticalThreshold,
  showValue = true,
  showMaxValue = false,
  valueFormatter,
  label,
  barHeight = 6,
  color,
  sx,
  tooltip
}) => {
  const theme = useTheme();
  
  // Calculate percentage for progress bar
  const calculatePercentage = (): number => {
    // Ensure the value is within bounds
    const clampedValue = Math.max(minValue, Math.min(value, maxValue));
    const range = maxValue - minValue;
    
    // Avoid division by zero
    if (range <= 0) return 0;
    
    return ((clampedValue - minValue) / range) * 100;
  };
  
  // Determine color based on thresholds and value
  const determineColor = (): 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
    // If color is explicitly set, use it
    if (color) return color;
    
    // If critical threshold is defined and value is below it
    if (criticalThreshold !== undefined && value <= criticalThreshold) {
      return 'error';
    }
    
    // If warning threshold is defined and value is below it
    if (warningThreshold !== undefined && value <= warningThreshold) {
      return 'warning';
    }
    
    // Default case - healthy
    return 'success';
  };
  
  // Format the displayed value
  const formatValue = (val: number): string => {
    if (valueFormatter) {
      return valueFormatter(val);
    }
    
    // Default formatting with comma separators
    return val.toLocaleString();
  };
  
  const progressPercentage = calculatePercentage();
  const progressColor = determineColor();
  
  const progressDisplay = (
    <Box sx={{ width: '100%', ...sx }}>
      {showValue && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mb: 0.5,
            fontSize: theme.typography.caption.fontSize
          }}
        >
          <Typography variant="caption">
            {formatValue(value)}
          </Typography>
          
          {showMaxValue && (
            <Typography variant="caption" color="text.secondary">
              {formatValue(maxValue)}
            </Typography>
          )}
        </Box>
      )}
      
      <LinearProgress 
        variant="determinate" 
        value={progressPercentage} 
        color={progressColor}
        sx={{ 
          height: barHeight, 
          borderRadius: 1,
          mb: label ? 0.5 : 0
        }} 
      />
      
      {label && (
        <Typography 
          variant="caption" 
          color="text.secondary"
          sx={{ display: 'block', mt: 0.5 }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
  
  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      {progressDisplay}
    </Tooltip>
  ) : progressDisplay;
};

export default ProgressCell;
