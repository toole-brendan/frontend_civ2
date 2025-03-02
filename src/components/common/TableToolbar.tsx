import React, { useState } from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  useTheme,
  alpha,
  InputBase,
  Box,
  Paper,
  SxProps,
  Theme
} from '@mui/material';

// Icons
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * Props for the TableToolbar component
 */
export interface TableToolbarProps {
  /**
   * The title displayed in the toolbar
   */
  title: string;
  
  /**
   * Optional subtitle displayed below the title
   */
  subtitle?: string;
  
  /**
   * Whether to show search functionality
   * @default false
   */
  enableSearch?: boolean;
  
  /**
   * Whether to show filter functionality
   * @default false
   */
  enableFilter?: boolean;
  
  /**
   * Whether to show refresh functionality
   * @default false
   */
  enableRefresh?: boolean;
  
  /**
   * Additional action buttons to display
   */
  additionalActions?: React.ReactNode;
  
  /**
   * Called when the search query changes
   */
  onSearch?: (query: string) => void;
  
  /**
   * Called when the filter button is clicked
   */
  onFilter?: () => void;
  
  /**
   * Called when the refresh button is clicked
   */
  onRefresh?: () => void;
  
  /**
   * Custom styles to apply to the toolbar
   */
  sx?: SxProps<Theme>;
  
  /**
   * Placeholder text for the search input
   * @default "Search..."
   */
  searchPlaceholder?: string;
  
  /**
   * Whether the table is currently loading data
   * @default false
   */
  loading?: boolean;
  
  /**
   * Text for the filter button
   * @default "Filter"
   */
  filterButtonText?: string;
  
  /**
   * Optional right content to display in the toolbar
   */
  rightContent?: React.ReactNode;
}

/**
 * TableToolbar provides a consistent toolbar for tables with common actions
 * like search, filter, and refresh.
 */
export const TableToolbar: React.FC<TableToolbarProps> = ({
  title,
  subtitle,
  enableSearch = false,
  enableFilter = false,
  enableRefresh = false,
  additionalActions,
  onSearch,
  onFilter,
  onRefresh,
  sx,
  searchPlaceholder = "Search...",
  loading = false,
  filterButtonText = "Filter",
  rightContent
}) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    if (onSearch) {
      onSearch(newQuery);
    }
  };
  
  // Handle clearing search
  const handleClearSearch = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };
  
  // Get toolbar background color based on theme
  const getToolbarBgColor = () => 
    isLightMode 
      ? 'rgba(237, 242, 247, 0.5)' 
      : 'rgba(39, 39, 42, 0.5)';
  
  return (
    <Toolbar
      sx={{
        px: { sm: 2 },
        py: 2,
        bgcolor: getToolbarBgColor(),
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
        gap: 1,
        ...sx
      }}
    >
      <Box sx={{ flex: '1 1 auto', mr: 2 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      
      {enableSearch && (
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: 'auto' },
            order: { xs: 3, sm: 0 },
            my: { xs: 1, sm: 0 },
            px: 2,
            py: 0.5,
            borderRadius: 2,
            bgcolor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
              bgcolor: alpha(theme.palette.common.white, 0.25),
            },
            border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
          }}
        >
          <SearchIcon color="action" sx={{ mr: 1 }} />
          <InputBase
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              flex: 1,
              '& .MuiInputBase-input': {
                py: 1,
              },
            }}
          />
          {searchQuery && (
            <IconButton size="small" onClick={handleClearSearch}>
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Paper>
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {enableFilter && (
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<FilterListIcon />} 
            onClick={onFilter}
          >
            {filterButtonText}
          </Button>
        )}
        
        {enableRefresh && (
          <Tooltip title="Refresh">
            <IconButton onClick={onRefresh} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        )}
        
        {additionalActions}
      </Box>
      
      {rightContent && (
        <Box sx={{ ml: 'auto' }}>
          {rightContent}
        </Box>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
