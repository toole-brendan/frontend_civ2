import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Box,
  useTheme,
  alpha,
  LinearProgress,
  SxProps,
  Theme
} from '@mui/material';

/**
 * Column definition for DataTable
 */
export interface DataTableColumn<T = any> {
  /**
   * Unique identifier for the column
   */
  id: string;
  
  /**
   * Display label for the column header
   */
  label: string;
  
  /**
   * Alignment of the column content
   * @default 'left'
   */
  align?: 'left' | 'right' | 'center';
  
  /**
   * Minimum width of the column
   */
  minWidth?: number;
  
  /**
   * Fixed width of the column
   */
  width?: number;
  
  /**
   * Whether the column can be sorted
   * @default false
   */
  sortable?: boolean;
  
  /**
   * Custom render function for the cell content
   */
  renderCell?: (row: T, index: number) => React.ReactNode;
  
  /**
   * Field in the data row to display (if renderCell is not provided)
   */
  field?: keyof T;
}

/**
 * Props for the DataTable component
 */
export interface DataTableProps<T = any> {
  /**
   * Array of column definitions
   */
  columns: DataTableColumn<T>[];
  
  /**
   * Data rows to display
   */
  data: T[];
  
  /**
   * Field in the data row to use as unique identifier
   * @default 'id'
   */
  rowIdField?: keyof T;
  
  /**
   * Whether to show the pagination controls
   * @default true
   */
  enablePagination?: boolean;
  
  /**
   * Default number of rows per page
   * @default 10
   */
  defaultRowsPerPage?: number;
  
  /**
   * Options for rows per page
   * @default [5, 10, 25]
   */
  rowsPerPageOptions?: number[];
  
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: 'default' | 'alternate';
  
  /**
   * Whether to show a loading indicator
   * @default false
   */
  loading?: boolean;
  
  /**
   * Whether the table has striped rows
   * @default true
   */
  striped?: boolean;
  
  /**
   * Whether to highlight rows on hover
   * @default true
   */
  hover?: boolean;
  
  /**
   * Custom styles for the table container
   */
  sx?: SxProps<Theme>;
  
  /**
   * Function called when a row is clicked
   */
  onRowClick?: (row: T, index: number) => void;
  
  /**
   * Custom empty state component
   */
  emptyState?: React.ReactNode;
  
  /**
   * Maximum height of the table
   */
  maxHeight?: number | string;
}

/**
 * DataTable is a flexible table component that supports pagination, sorting,
 * and custom cell rendering with theming support for light and dark modes.
 */
export const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  rowIdField = 'id' as keyof T,
  enablePagination = true,
  defaultRowsPerPage = 10,
  rowsPerPageOptions = [5, 10, 25],
  variant = 'default',
  loading = false,
  striped = true,
  hover = true,
  sx,
  onRowClick,
  emptyState,
  maxHeight
}: DataTableProps<T>) => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === 'light';
  
  // Pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Get the appropriate alternating row background color based on theme
  const getAlternateRowBgColor = () => 
    isLightMode 
      ? alpha(theme.palette.background.paper, 0.4)  
      : alpha(theme.palette.background.default, 0.2);
  
  // Get header background color based on theme and variant
  const getHeaderBgColor = () => 
    isLightMode 
      ? 'rgba(247, 250, 252, 0.8)' 
      : 'rgba(26, 26, 30, 0.8)';
  
  // Render the table rows with pagination applied
  const renderRows = () => {
    // Apply pagination if enabled
    const rowsToRender = enablePagination
      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : data;
    
    if (rowsToRender.length === 0 && emptyState) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            {emptyState}
          </TableCell>
        </TableRow>
      );
    }
    
    return rowsToRender.map((row, rowIndex) => (
      <TableRow
        key={String(row[rowIdField] || rowIndex)}
        hover={hover}
        onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
        sx={{
          cursor: onRowClick ? 'pointer' : 'default',
          '&:last-child td, &:last-child th': { border: 0 },
          ...(striped && {
            '&:nth-of-type(even)': {
              bgcolor: variant === 'alternate' ? getAlternateRowBgColor() : 'inherit',
            },
          }),
        }}
      >
        {columns.map((column) => (
          <TableCell 
            key={column.id} 
            align={column.align || 'left'}
            width={column.width}
            sx={{ 
              minWidth: column.minWidth,
            }}
          >
            {column.renderCell 
              ? column.renderCell(row, rowIndex)
              : column.field 
                ? row[column.field] 
                : null}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <Box sx={{ width: '100%', ...sx }}>
      {loading && (
        <LinearProgress 
          sx={{ 
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }} 
        />
      )}
      
      <TableContainer sx={{ maxHeight }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow sx={{ bgcolor: getHeaderBgColor() }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  width={column.width}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: 'medium',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderRows()}
          </TableBody>
        </Table>
      </TableContainer>
      
      {enablePagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

export default DataTable;
