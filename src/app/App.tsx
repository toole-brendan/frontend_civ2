import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { store } from '../store';
import MainLayout from '../components/layout/MainLayout';
import AppRoutes from './routes';
import { ThemeProvider } from '../theme/ThemeContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <MainLayout>
          <AppRoutes />
        </MainLayout>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
