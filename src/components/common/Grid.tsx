import React from 'react';
import {
  Grid as MuiGrid,
  GridProps as MuiGridProps,
  styled,
  Theme,
  alpha,
  useTheme,
} from '@mui/material';

export interface GridProps extends MuiGridProps {
  /**
   * Removes the spacing/gutters between grid items
   * @default false
   */
  noGutter?: boolean;
  
  /**
   * Makes all child grid items have equal height
   * @default false
   */
  equalHeight?: boolean;
  
  /**
   * Applies a glass-like effect to grid item children
   * @default false
   */
  glassEffect?: boolean;
  
  /**
   * Removes borders from grid item children when used with glassEffect
   * @default false
   */
  noBorder?: boolean;
  
  /**
   * Applies a card-like appearance to grid item children
   * @default false
   */
  cardStyle?: boolean;
  
  /**
   * Adds a slight hover effect to grid item children
   * @default false
   */
  hoverEffect?: boolean;
}

interface StyledGridProps extends GridProps {
  theme?: Theme;
}

const StyledGrid = styled(MuiGrid, {
  shouldForwardProp: (prop: string) => 
    !['noGutter', 'equalHeight', 'glassEffect', 'noBorder', 'cardStyle', 'hoverEffect'].includes(prop),
})<StyledGridProps>(({ 
  theme, 
  noGutter, 
  equalHeight, 
  glassEffect, 
  noBorder, 
  cardStyle, 
  hoverEffect 
}) => {
  const isDark = theme.palette.mode === 'dark';
  
  const styles = {
    // Remove negative margins if noGutter is true
    ...(noGutter && {
      margin: 0,
      width: '100%',
      '& > .MuiGrid-item': {
        padding: 0,
      },
    }),
    
    // Make all children equal height
    ...(equalHeight && {
      '& > .MuiGrid-item': {
        display: 'flex',
        '& > *': {
          width: '100%',
        },
      },
    }),
    
    // Glass effect styling - updated for our design system
    ...(glassEffect && {
      '& > .MuiGrid-item': {
        '& > *': {
          backgroundColor: isDark 
            ? alpha(theme.palette.background.paper, 0.6)
            : alpha('#FFFFFF', 0.7),
          backdropFilter: 'blur(12px)',
          border: noBorder 
            ? 'none' 
            : `1px solid ${
                isDark 
                  ? alpha(theme.palette.common.white, 0.1) 
                  : alpha(theme.palette.common.black, 0.05)
              }`,
          borderRadius: theme.shape.borderRadius,
          transition: theme.transitions.create(
            ['background-color', 'transform', 'box-shadow'],
            {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeInOut,
            }
          ),
          ...(hoverEffect && {
            '&:hover': {
              backgroundColor: isDark 
                ? alpha(theme.palette.background.paper, 0.8)
                : alpha('#FFFFFF', 0.9),
              transform: 'translateY(-4px)',
              boxShadow: isDark 
                ? '0 8px 16px rgba(0, 0, 0, 0.5)'
                : '0 8px 16px rgba(0, 0, 0, 0.1)',
            },
          }),
        },
      },
    }),
    
    // Card styling
    ...(cardStyle && !glassEffect && {
      '& > .MuiGrid-item': {
        '& > *': {
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          border: isDark 
            ? `1px solid ${theme.palette.divider}` 
            : 'none',
          boxShadow: isDark 
            ? 'none' 
            : theme.shadows[1],
          transition: theme.transitions.create(
            ['box-shadow', 'transform'],
            {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }
          ),
          ...(hoverEffect && {
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: isDark 
                ? `0 5px 10px rgba(0, 0, 0, 0.5)` 
                : theme.shadows[4]
            },
          }),
        },
      },
    }),
    
    // Just hover effect without card or glass styling
    ...(!cardStyle && !glassEffect && hoverEffect && {
      '& > .MuiGrid-item': {
        '& > *': {
          transition: theme.transitions.create(
            ['transform', 'box-shadow'],
            {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeInOut,
            }
          ),
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isDark 
              ? '0 8px 16px rgba(0, 0, 0, 0.5)'
              : '0 8px 16px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    }),
  };

  return styles;
});

/**
 * Enhanced Grid component that extends Material-UI Grid with additional styling options.
 * Provides consistent layout and design across the application.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    container, 
    item, 
    spacing = 2, 
    glassEffect = false, 
    noBorder = false,
    cardStyle = false,
    hoverEffect = false,
    ...rest 
  }, ref) => {
    const theme = useTheme();
    
    return (
      <StyledGrid
        ref={ref}
        container={container}
        item={item}
        spacing={container ? spacing : undefined}
        glassEffect={glassEffect}
        noBorder={noBorder}
        cardStyle={cardStyle}
        hoverEffect={hoverEffect}
        theme={theme}
        {...rest}
      />
    );
  }
);

Grid.displayName = 'Grid';
