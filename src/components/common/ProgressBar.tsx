import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  alpha,
  useTheme
} from '@mui/material';

export interface ProgressBarProps {
  /**
   * The progress value (0-100)
   */
  value: number;
  
  /**
   * Optional label to display above the progress bar
   */
  label?: React.ReactNode;
  
  /**
   * Optional sublabel to display on the right side above the progress bar
   */
  sublabel?: React.ReactNode;
  
  /**
   * Color of the progress bar
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | string;
  
  /**
   * Height of the progress bar in pixels
   * @default 4
   */
  height?: number;
  
  /**
   * Whether to show the percentage value
   * @default false
   */
  showPercentage?: boolean;
  
  /**
   * Whether the background should be transparent instead of using alpha
   * @default false
   */
  transparentBackground?: boolean;
  
  /**
   * Additional styling for the container
   */
  sx?: React.CSSProperties;
}

/**
 * ProgressBar component displays a linear progress indicator with optional labels
 * and consistent styling across the application.
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  sublabel,
  color = 'primary',
  height = 4,
  showPercentage = false,
  transparentBackground = false,
  sx
}) => {
  const theme = useTheme();
  
  // Determine the color to use
  const getColorValue = () => {
    if (typeof color === 'string') {
      if (color === 'primary') return theme.palette.primary.main;
      if (color === 'secondary') return theme.palette.secondary.main;
      if (color === 'success') return theme.palette.success.main;
      if (color === 'error') return theme.palette.error.main;
      if (color === 'warning') return theme.palette.warning.main;
      if (color === 'info') return theme.palette.info.main;
      return color; // If it's a custom color string (like '#ff0000')
    }
    return theme.palette.primary.main; // Default fallback
  };
  
  const colorValue = getColorValue();
  
  return (
    <Box sx={{ width: '100%', ...sx }}>
      {(label || sublabel || showPercentage) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          {label && (
            <Typography variant="body2">
              {label}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {showPercentage && (
              <Typography variant="body2" color="text.secondary">
                {Math.round(value)}%
              </Typography>
            )}
            
            {sublabel && (
              <Typography variant="body2" color="text.secondary">
                {sublabel}
              </Typography>
            )}
          </Box>
        </Box>
      )}
      
      <LinearProgress 
        variant="determinate" 
        value={value > 100 ? 100 : value < 0 ? 0 : value} 
        sx={{ 
          height,
          borderRadius: height / 2,
          bgcolor: transparentBackground ? 'transparent' : alpha(colorValue, 0.2),
          '& .MuiLinearProgress-bar': { 
            bgcolor: colorValue,
            borderRadius: height / 2
          } 
        }} 
      />
    </Box>
  );
};

export default ProgressBar;
