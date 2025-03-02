import { Theme as MuiTheme, createTheme as muiCreateTheme, ThemeOptions, alpha } from '@mui/material/styles';
import { colors, darkColors, lightColors, getColors, ColorPalette } from './colors';
import { fontFamilies, fontWeights, typography } from './typography';
import { getComponentOverrides } from './components';

declare module '@mui/material/styles' {
  interface Theme {
    semantic: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      border: {
        primary: string;
        secondary: string;
      };
      status: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
    };
  }
}

/**
 * Creates a theme based on the specified mode (light or dark)
 * Uses the modular component overrides system for better maintainability
 */
export const createTheme = (mode: 'light' | 'dark' = 'dark') => {
  const themeColors = getColors(mode);
  
  // Create the base theme with palette, typography, and shape
  const baseTheme = muiCreateTheme({
    palette: {
      mode,
      background: {
        default: themeColors.background.default,
        paper: themeColors.background.paper,
      },
      text: {
        primary: themeColors.text.primary,
        secondary: themeColors.text.secondary,
      },
      primary: {
        main: themeColors.primary.main,
        light: themeColors.primary.light,
        dark: themeColors.primary.dark,
        contrastText: themeColors.primary.contrastText,
      },
      secondary: {
        main: themeColors.secondary.main,
        light: themeColors.secondary.light,
        dark: themeColors.secondary.dark,
        contrastText: themeColors.secondary.contrastText,
      },
      success: {
        main: themeColors.status.success,
        light: alpha(themeColors.status.success, 0.8),
        dark: mode === 'dark' ? '#4caf50' : '#0ca678',
      },
      warning: {
        main: themeColors.status.warning,
        light: alpha(themeColors.status.warning, 0.8),
        dark: mode === 'dark' ? '#e65100' : '#d97706',
      },
      error: {
        main: themeColors.status.error,
        light: alpha(themeColors.status.error, 0.8),
        dark: mode === 'dark' ? '#d32f2f' : '#dc2626',
      },
      info: {
        main: themeColors.status.info,
        light: alpha(themeColors.status.info, 0.8),
        dark: mode === 'dark' ? '#0288d1' : '#0284c7',
      },
      divider: themeColors.divider,
      action: themeColors.action,
    },
    shape: {
      borderRadius: 4,
    },
    typography: {
      fontFamily: fontFamilies.primary,
      ...typography,
    },
  });
  
  // Apply component overrides using the modular system
  return muiCreateTheme(baseTheme, {
    components: {
      // Get all component-specific overrides from the modular system
      ...getComponentOverrides(baseTheme),
      
      // Global styles remain in this file
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: themeColors.background.default,
            color: themeColors.text.primary,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
          '@global': {
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '*::-webkit-scrollbar-track': {
              background: mode === 'dark' ? '#121212' : '#f1f1f1',
            },
            '*::-webkit-scrollbar-thumb': {
              background: mode === 'dark' ? '#333333' : '#c1c1c1',
              borderRadius: 4,
            },
          },
        },
      },
    },
  });
};

// For backward compatibility
export const BaseTheme = createTheme('dark');

export type Theme = MuiTheme & {
  semantic: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    border: {
      primary: string;
      secondary: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  };
};

export type { ColorPalette } from './colors';
export * from './colors';
export * from './typography';
