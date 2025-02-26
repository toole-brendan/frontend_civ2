import React from 'react';
import { Box } from '@mui/material';

interface SparklineProps {
  data: number[];
  color: string;
  height: number;
  width?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({ 
  data, 
  color, 
  height = 40, 
  width = '100%' 
}) => {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const normalizedData = data.map(value => 1 - ((value - min) / (range || 1)));
  
  const points = normalizedData.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = value * height;
    return `${x},${y}`;
  }).join(' ');

  const lastPoint = normalizedData[normalizedData.length - 1] * height;
  const firstPoint = normalizedData[0] * height;

  return (
    <Box sx={{ height, width, position: 'relative' }}>
      <svg width="100%" height={height} preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="100%"
          cy={lastPoint}
          r="2"
          fill={color}
        />
        <circle
          cx="0%"
          cy={firstPoint}
          r="2"
          fill={color}
        />
        <linearGradient id={`sparkline-gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <polygon
          points={`0,${firstPoint} ${points} 100,${lastPoint} 100,${height} 0,${height}`}
          fill={`url(#sparkline-gradient-${color.replace('#', '')})`}
        />
      </svg>
    </Box>
  );
};

export default Sparkline; 