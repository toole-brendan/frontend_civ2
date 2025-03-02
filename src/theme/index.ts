import { Theme as MuiTheme, createTheme as muiCreateTheme, ThemeOptions, alpha } from '@mui/material/styles';
import { colors, darkColors, lightColors, getColors, ColorPalette } from './colors';
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
      borderRadius: 4, // Reduced to match new design requirements
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
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 4, // Reduced to match new design requirements
            fontWeight: fontWeights.medium,
            padding: '8px 16px',
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: mode === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
              transform: 'translateY(-1px)',
            },
          },
          outlined: {
            borderColor: themeColors.border.light,
            '&:hover': {
              borderColor: themeColors.border.dark,
              backgroundColor: themeColors.action.hover,
            },
          },
          text: {
            '&:hover': {
              backgroundColor: alpha(themeColors.primary.main, 0.05),
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: themeColors.background.paper,
            borderRadius: 4, // Reduced to match new design requirements
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          },
          elevation1: {
            boxShadow: mode === 'dark' 
              ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
              : '0 4px 6px rgba(0, 0, 0, 0.05)',
          },
          elevation2: {
            boxShadow: mode === 'dark' 
              ? '0 6px 10px rgba(0, 0, 0, 0.35)' 
              : '0 6px 10px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.background.paper,
            borderRadius: 4, // Reduced to match new design requirements
            border: mode === 'dark' 
              ? `1px solid ${themeColors.cardBorder}` 
              : 'none',
            boxShadow: mode === 'dark' 
              ? 'none' 
              : themeColors.shadow.light,
            transition: 'border-color 0.2s ease-in-out, background-color 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              borderColor: mode === 'dark' ? themeColors.border.dark : 'none',
              boxShadow: mode === 'dark' 
                ? `0 5px 10px rgba(0, 0, 0, 0.3)` 
                : themeColors.shadow.medium,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' 
              ? 'rgba(18, 18, 18, 0.9)' 
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
            borderColor: themeColors.divider,
            transition: 'border-color 0.3s ease',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${themeColors.border.light}`,
            padding: '12px 16px',
            transition: 'border-color 0.3s ease, background-color 0.3s ease',
            fontSize: '0.875rem',
          },
          head: {
            fontWeight: fontWeights.medium,
            backgroundColor: themeColors.tableHeader,
            color: themeColors.text.primary,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(even)': {
              backgroundColor: mode === 'dark' 
                ? alpha(themeColors.background.light, 0.05) 
                : themeColors.tableRowAlt, // Use specific alternating row color
            },
            '&:hover': {
              backgroundColor: themeColors.tableRowHover,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            height: 24,
            borderRadius: 4, // Reduced to match new design requirements
            fontSize: '0.75rem',
            fontWeight: fontWeights.medium,
            transition: 'background-color 0.3s ease',
          },
          filled: {
            backgroundColor: mode === 'dark' 
              ? alpha(themeColors.background.light, 0.5) 
              : alpha(themeColors.background.dark, 0.1),
          },
          outlined: {
            borderWidth: 1,
          },
          label: {
            padding: '0 8px',
          },
          icon: {
            fontSize: '0.85rem',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderRadius: 4, // Reduced to match new design requirements
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            height: 4,
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)',
            // Pulse animation for loading states in dark mode
            ...(mode === 'dark' && {
              '& .MuiLinearProgress-bar': {
                animation: 'pulse 1.5s ease-in-out infinite',
              },
              '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.7 },
                '100%': { opacity: 1 },
              },
            }),
          },
          colorPrimary: {
            backgroundColor: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.08)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: mode === 'dark' 
                ? themeColors.primary.main // Brighter blue in dark mode
                : themeColors.primary.main,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            // Adding left border styles for notifications
            borderLeft: '4px solid transparent',
            boxShadow: mode === 'dark' ? 'none' : themeColors.shadow.light,
          },
          standardSuccess: {
            backgroundColor: mode === 'dark' 
              ? alpha(themeColors.status.success, 0.15)
              : '#FFFFFF',
            color: mode === 'dark' ? themeColors.status.success : '#0f766e',
            borderLeftColor: themeColors.status.success,
            // Subtle glow in dark mode
            ...(mode === 'dark' && {
              boxShadow: `0 0 15px ${alpha(themeColors.status.success, 0.2)}`
            }),
          },
          standardWarning: {
            backgroundColor: mode === 'dark' 
              ? alpha(themeColors.status.warning, 0.15)
              : '#FFFFFF',
            color: mode === 'dark' ? themeColors.status.warning : '#b45309',
            borderLeftColor: themeColors.status.warning,
            ...(mode === 'dark' && {
              boxShadow: `0 0 15px ${alpha(themeColors.status.warning, 0.2)}`
            }),
          },
          standardError: {
            backgroundColor: mode === 'dark' 
              ? alpha(themeColors.status.error, 0.15)
              : '#FFFFFF',
            color: mode === 'dark' ? themeColors.status.error : '#b91c1c',
            borderLeftColor: themeColors.status.error,
            ...(mode === 'dark' && {
              boxShadow: `0 0 15px ${alpha(themeColors.status.error, 0.2)}`
            }),
          },
          standardInfo: {
            backgroundColor: mode === 'dark' 
              ? alpha(themeColors.status.info, 0.15)
              : '#FFFFFF',
            color: mode === 'dark' ? themeColors.status.info : '#0369a1',
            borderLeftColor: themeColors.status.info,
            ...(mode === 'dark' && {
              boxShadow: `0 0 15px ${alpha(themeColors.status.info, 0.2)}`
            }),
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '& fieldset': {
                borderColor: themeColors.border.light,
                transition: 'border-color 0.2s ease-in-out',
              },
              '&:hover fieldset': {
                borderColor: themeColors.border.dark,
              },
              '&.Mui-focused fieldset': {
                borderColor: themeColors.primary.main,
                boxShadow: mode === 'dark' 
                  ? `0 0 0 3px ${alpha(themeColors.primary.main, 0.15)}`
                  : `0 0 0 3px ${alpha(themeColors.primary.main, 0.1)}`,
              },
            },
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          root: {
            '& .MuiBadge-badge': {
              fontWeight: fontWeights.medium,
              fontSize: '0.7rem',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            minHeight: 40,
          },
          indicator: {
            height: 3,
            borderRadius: '3px 3px 0 0',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: fontWeights.medium,
            minHeight: 40,
            fontSize: '0.875rem',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.85)'
              : 'rgba(0, 0, 0, 0.75)',
            borderRadius: 6,
            padding: '6px 12px',
            fontSize: '0.75rem',
          },
        },
      },
      // Add custom styles for blockchain elements
      MuiContainer: {
        styleOverrides: {
          root: {
            // This allows us to inject custom styling via className matching
            '& .verification-badge': {
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: mode === 'dark' 
                ? alpha(themeColors.verificationBadge, 0.15)
                : alpha(themeColors.verificationBadge, 0.1),
              color: themeColors.verificationBadge,
              borderRadius: 12,
              padding: '2px 8px',
              fontSize: '0.75rem',
              fontWeight: fontWeights.medium,
              ...(mode === 'dark' && {
                boxShadow: `0 0 8px ${alpha(themeColors.verificationBadge, 0.3)}`,
              }),
              '& svg': {
                marginRight: 4,
                color: themeColors.verificationBadge,
                ...(mode === 'dark' && {
                  filter: 'drop-shadow(0 0 2px rgba(41, 182, 246, 0.5))',
                }),
              },
            },
            '& .transaction-hash': {
              fontFamily: fontFamilies.mono,
              backgroundColor: mode === 'dark'
                ? alpha(themeColors.background.light, 0.5)
                : alpha(themeColors.background.dark, 0.05),
              color: mode === 'dark'
                ? alpha(themeColors.text.primary, 0.9)
                : themeColors.text.primary,
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: '0.8125rem',
              ...(mode === 'dark' && {
                boxShadow: `0 0 10px ${alpha(themeColors.primary.main, 0.1)}`,
              }),
            },
            '& .empty-state': {
              textAlign: 'center',
              padding: '32px 16px',
              color: themeColors.text.secondary,
              '& svg': {
                color: mode === 'dark'
                  ? alpha(themeColors.text.secondary, 0.7)
                  : alpha(themeColors.text.secondary, 0.5),
                fontSize: '3rem',
                marginBottom: 16,
                ...(mode === 'dark' && {
                  filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.1))',
                }),
              },
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
