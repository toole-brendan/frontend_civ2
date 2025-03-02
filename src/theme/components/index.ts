import { Theme } from '@mui/material/styles';
import { getCardOverrides } from './cards';
import { getTableOverrides } from './tables';
import { getButtonOverrides } from './buttons';

/**
 * Combines all component-specific theme overrides into a single object
 * This allows us to keep theme overrides organized by component type
 * while still having a single point of entry for the theme
 */
export const getComponentOverrides = (theme: Theme) => {
  return {
    ...getCardOverrides(theme),
    ...getTableOverrides(theme),
    ...getButtonOverrides(theme),
    // Additional component overrides can be imported and spread here
  };
};
