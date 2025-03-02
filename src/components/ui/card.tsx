import React from 'react';
import { createTheme as createMuiTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// Theme creator function
export const createTheme = (options: any = {}) => {
  const { mode = 'dark', ...rest } = options;
  
  return createMuiTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#111827' : '#f9fafb',
        paper: mode === 'dark' ? '#1f2937' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f9fafb' : '#111827',
        secondary: mode === 'dark' ? '#9ca3af' : '#6b7280',
      },
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        contrastText: '#ffffff',
      },
    },
    ...rest,
  });
};

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ReturnType<typeof createTheme>;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  theme = createTheme() 
}) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

// Card component
export interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`bg-gray-800 border border-gray-700 rounded-lg shadow-lg ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

// CardHeader component
export interface CardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`p-6 border-b border-gray-700 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

// CardTitle component
export interface CardTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <h3 
      className={`text-xl font-semibold text-white ${className}`} 
      {...props}
    >
      {children}
    </h3>
  );
};

// CardContent component
export interface CardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ 
  className = '', 
  children, 
  ...props 
}) => {
  return (
    <div 
      className={`p-6 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
