# Theme System Documentation

This directory contains the theming system for the application. The theme is built on top of Material UI's theming capabilities with additional customizations and organization for better maintainability.

## Directory Structure

```
src/theme/
├── index.ts                 # Main theme entry point and configuration
├── colors.ts                # Color palette definitions
├── typography.ts            # Typography scale and settings
├── types.ts                 # TypeScript type definitions
├── ThemeContext.tsx         # Theme context provider for theme switching
└── components/              # Component-specific theme overrides
    ├── index.ts             # Combines all component overrides
    ├── buttons.ts           # Button component overrides
    ├── cards.ts             # Card component overrides
    └── tables.ts            # Table component overrides
```

## How the Theme Works

The theme system has been reorganized to follow a modular approach:

1. **Base Theme Configuration**: `index.ts` defines the base theme with palette, typography, and shape settings.
2. **Component Overrides**: Component-specific styling is modularized in the `components/` directory.
3. **Composition**: The `components/index.ts` file combines all component overrides into a single object.

## Using the Theme

### In Styled Components

```tsx
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const CustomButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
}));
```

### In Inline Styles (sx prop)

```tsx
<Box
  sx={{
    bgcolor: (theme) => theme.palette.background.paper,
    p: (theme) => theme.spacing(2),
    borderRadius: (theme) => theme.shape.borderRadius,
  }}
>
  Content
</Box>
```

## Extending the Theme

### Adding New Component Overrides

1. Create a new file in the `components/` directory (e.g., `dialogs.ts`):

```typescript
import { Theme } from '@mui/material/styles';

export const getDialogOverrides = (theme: Theme) => {
  const isDark = theme.palette.mode === 'dark';
  
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: theme.palette.background.paper,
          borderRadius: 8,
          boxShadow: isDark 
            ? '0 8px 32px rgba(0, 0, 0, 0.5)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
    // Add more dialog-related component overrides here
  };
};
```

2. Import and add it to `components/index.ts`:

```typescript
import { Theme } from '@mui/material/styles';
import { getCardOverrides } from './cards';
import { getTableOverrides } from './tables';
import { getButtonOverrides } from './buttons';
import { getDialogOverrides } from './dialogs'; // Add this import

export const getComponentOverrides = (theme: Theme) => {
  return {
    ...getCardOverrides(theme),
    ...getTableOverrides(theme),
    ...getButtonOverrides(theme),
    ...getDialogOverrides(theme), // Add the new overrides
  };
};
```

### Extending Color Palette or Typography

To add new colors or typography variants, modify the appropriate files:

#### Adding Colors (`colors.ts`):

```typescript
export const darkColors = {
  // Existing colors...
  
  // Add new custom colors
  tertiary: {
    main: '#9C27B0',
    light: '#BA68C8',
    dark: '#7B1FA2',
    contrastText: '#FFFFFF',
  },
};

export const lightColors = {
  // Existing colors...
  
  // Add matching light mode colors
  tertiary: {
    main: '#6A1B9A',
    light: '#9C27B0',
    dark: '#4A148C',
    contrastText: '#FFFFFF',
  },
};
```

#### Adding Typography Variants (`typography.ts`):

```typescript
export const typography = {
  // Existing typography...
  
  // Add new variant
  largeHeading: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.bold,
    fontSize: '3rem',
    lineHeight: 1.2,
    letterSpacing: '-0.03em',
  },
};
```

## Theme Switching

The application supports both light and dark themes through the `ThemeContext.tsx` provider. You can access and modify the current theme mode in components:

```tsx
import { useTheme } from '@mui/material/styles';
import { useThemeToggle } from '../theme/ThemeContext';

const MyComponent = () => {
  const theme = useTheme();
  const { toggleTheme, mode } = useThemeToggle();
  
  return (
    <div>
      <p>Current mode: {mode}</p>
      <button onClick={toggleTheme}>
        Switch to {mode === 'light' ? 'dark' : 'light'} mode
      </button>
    </div>
  );
};
```

## Custom Styling Principles

1. **Consistent spacing**: Use `theme.spacing()` for all spacing values
2. **Color usage**: Use palette colors with alpha modifiers for variations
3. **Borders and shadows**: Adjust based on theme mode for best visual results
4. **Transitions**: Include transitions for interactive elements
5. **Responsive design**: Consider different screen sizes in component designs
