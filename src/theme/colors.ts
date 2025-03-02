// Core color palette for both light and dark themes
export const darkColors = {
  background: {
    default: '#121212', // Main app background
    paper: '#1E1E1E',   // Card and surface background
    dark: '#1A1A2E',    // Darker elements like headers
    light: '#2D2D2D',   // Lighter surfaces for contrast
  },
  text: {
    primary: '#E5E7EB',
    secondary: '#9CA3AF',
    tertiary: '#6B7280',
    disabled: '#6B7280',
    hint: '#6B7280',
  },
  primary: {
    main: '#90CAF9',      // Vibrant blue for primary actions
    light: '#B6E0FF',
    dark: '#5D99C6',
    contrastText: '#121212',
  },
  secondary: {
    main: '#70EFDE',      // Mint green for financial indicators and Shell token
    light: '#A5F5EA',
    dark: '#4BBCAD',
    contrastText: '#121212',
  },
  border: {
    light: '#2D2D2D',
    dark: '#3D3D3D',
  },
  status: {
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#FF5252',
    info: '#29B6F6',
  },
  action: {
    active: '#E5E7EB',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
  },
  // Additional semantic colors
  divider: '#2D2D2D',
  shadow: {
    light: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    medium: '0px 8px 15px rgba(0, 0, 0, 0.4)',
  },
  tableHeader: '#1A1A2E',
  tableRowHover: '#2D2D2D',
  tableRowAlt: '#1E1E1E',
  cardBorder: '#2D2D2D',
  verificationBadge: '#29B6F6',
} as const;

export const lightColors = {
  background: {
    default: '#FFFFFF', // Main app background
    paper: '#FFFFFF',   // Card and surface background
    dark: '#EFF6FF',    // Darker elements like headers (v. light blue)
    light: '#F3F4F6',   // Lighter surfaces for contrast - Updated to match specs
  },
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    disabled: '#9CA3AF',
    hint: '#9CA3AF',
  },
  primary: {
    main: '#2563EB',      // Trustworthy blue for main actions
    light: '#3B82F6',
    dark: '#1D4ED8',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#0D9488',      // Teal-green for financial indicators
    light: '#14B8A6',
    dark: '#0F766E',
    contrastText: '#FFFFFF',
  },
  border: {
    light: '#E5E7EB',
    dark: '#D1D5DB',
  },
  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#0EA5E9',
  },
  action: {
    active: '#1F2937',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
  },
  // Additional semantic colors
  divider: '#E5E7EB',
  shadow: {
    light: '0px 4px 6px rgba(0, 0, 0, 0.05)',
    medium: '0px 8px 15px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: '#EFF6FF',
  tableRowHover: '#F0F9FF',
  tableRowAlt: '#F9FAFB',
  cardBorder: '#E5E7EB',
  verificationBadge: '#2563EB',
} as const;

// For backward compatibility
export const colors = darkColors;

export type ColorPalette = typeof darkColors;

// Function to get colors based on mode
export const getColors = (mode: 'light' | 'dark') => {
  return mode === 'light' ? lightColors : darkColors;
};
