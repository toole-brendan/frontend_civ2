import { Theme as MuiTheme, createTheme as muiCreateTheme, ThemeOptions } from '@mui/material/styles';
import { colors, darkColors, lightColors, getColors } from './colors';
import { fontFamilies, fontWeights, typography } from './typography';

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

// Create theme based on mode
export const createTheme = (mode: 'light' | 'dark' = 'dark') => {
  const themeColors = getColors(mode);
  
  return muiCreateTheme({
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
      action: themeColors.action,
    },
    shape: {
      borderRadius: 0,
    },
    typography: {
      fontFamily: fontFamilies.primary,
      ...typography,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: themeColors.background.default,
            color: themeColors.text.primary,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 0,
            fontWeight: fontWeights.medium,
            padding: '8px 16px',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          outlined: {
            borderColor: themeColors.border.light,
            '&:hover': {
              borderColor: themeColors.border.dark,
              backgroundColor: themeColors.action.hover,
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: themeColors.background.paper,
            borderRadius: 0,
            transition: 'background-color 0.3s ease',
          },
          elevation1: {
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.background.paper,
            borderRadius: 0,
            border: `1px solid ${themeColors.border.light}`,
            transition: 'border-color 0.2s ease-in-out, background-color 0.3s ease',
            '&:hover': {
              borderColor: themeColors.border.dark,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.9)' 
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${themeColors.border.light}`,
            boxShadow: 'none',
            transition: 'background-color 0.3s ease',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: mode === 'dark'
                ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
                : 'linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0) 100%)',
              pointerEvents: 'none',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: themeColors.background.paper,
            borderRight: `1px solid ${themeColors.border.light}`,
            transition: 'background-color 0.3s ease',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: themeColors.border.light,
            transition: 'border-color 0.3s ease',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${themeColors.border.light}`,
            padding: '16px',
            transition: 'border-color 0.3s ease, background-color 0.3s ease',
          },
          head: {
            fontWeight: fontWeights.medium,
            backgroundColor: themeColors.background.dark,
            color: themeColors.text.primary,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            height: 24,
            borderRadius: 0,
            fontSize: '0.75rem',
            transition: 'background-color 0.3s ease',
          },
          filled: {
            backgroundColor: themeColors.background.light,
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