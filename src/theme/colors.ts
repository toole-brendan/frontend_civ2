// Core color palette for both light and dark themes
export const darkColors = {
  background: {
    default: '#121212', // Main app background
    paper: '#1E1E1E',   // Card and surface background
    dark: '#0A0A0A',    // Darker elements like headers
    light: '#2C2C2C',   // Lighter surfaces for contrast
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    disabled: '#757575',
    hint: '#9E9E9E',
  },
  primary: {
    main: '#2196F3',      // Bright blue for primary actions
    light: '#64B5F6',
    dark: '#1976D2',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#424242',      // Subtle gray for secondary elements
    light: '#616161',
    dark: '#212121',
    contrastText: '#FFFFFF',
  },
  border: {
    light: 'rgba(255, 255, 255, 0.12)',
    dark: 'rgba(255, 255, 255, 0.23)',
  },
  status: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    info: '#2196F3',
  },
  action: {
    active: '#FFFFFF',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

export const lightColors = {
  background: {
    default: '#F5F5F5', // Main app background
    paper: '#FFFFFF',   // Card and surface background
    dark: '#E0E0E0',    // Darker elements like headers
    light: '#F9F9F9',   // Lighter surfaces for contrast
  },
  text: {
    primary: '#212121',
    secondary: '#424242',
    disabled: '#9E9E9E',
    hint: '#757575',
  },
  primary: {
    main: '#1976D2',      // Slightly darker blue for better contrast on light
    light: '#42A5F5',
    dark: '#0D47A1',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#9E9E9E',      // Medium gray for secondary elements
    light: '#BDBDBD',
    dark: '#757575',
    contrastText: '#000000',
  },
  border: {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(0, 0, 0, 0.23)',
  },
  status: {
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',
  },
  action: {
    active: '#000000',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
} as const;

// For backward compatibility
export const colors = darkColors;

export type ColorPalette = typeof darkColors;

// Function to get colors based on mode
export const getColors = (mode: 'light' | 'dark') => {
  return mode === 'light' ? lightColors : darkColors;
}; 