import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
  SelectChangeEvent,
} from '@mui/material';
import {
  AccountBalance as SupplierIcon,
  Business as WarehouseIcon,
  Store as CustomerIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const ChartContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
}));

const FlowContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 4),
  position: 'relative',
}));

const NodeColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  zIndex: 2,
  width: '30%',
}));

const Node = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'success' | 'warning' | 'error' }>(({ theme, status }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  boxShadow: theme.shadows[1],
  border: `1px solid ${
    status === 'success'
      ? theme.palette.success.main
      : status === 'warning'
      ? theme.palette.warning.main
      : theme.palette.error.main
  }`,
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[3],
  },
}));

const FlowLine = styled(Box, {
  shouldForwardProp: (prop) => !['status', 'animate'].includes(prop as string),
})<{ 
  status: 'success' | 'warning' | 'error'; 
  animate?: boolean;
}>(({ theme, status, animate }) => ({
  position: 'absolute',
  height: '2px',
  background: `linear-gradient(to right, ${
    status === 'success'
      ? theme.palette.success.main
      : status === 'warning'
      ? theme.palette.warning.main
      : theme.palette.error.main
  }, ${
    status === 'success'
      ? theme.palette.success.main
      : status === 'warning'
      ? theme.palette.warning.main
      : theme.palette.error.main
  })`,
  transformOrigin: 'left center',
  '&::after': animate ? {
    content: '""',
    position: 'absolute',
    top: '-3px',
    left: animate ? '0%' : '100%',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 
      status === 'success'
        ? theme.palette.success.main
        : status === 'warning'
        ? theme.palette.warning.main
        : theme.palette.error.main,
    animation: 'flowAnimation 3s infinite linear',
  } : {},
  '@keyframes flowAnimation': {
    '0%': {
      left: '0%',
    },
    '100%': {
      left: '100%',
    },
  },
}));

const StatusIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'success' | 'warning' | 'error' }>(({ theme, status }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color:
    status === 'success'
      ? theme.palette.success.main
      : status === 'warning'
      ? theme.palette.warning.main
      : theme.palette.error.main,
  fontSize: '0.75rem',
  fontWeight: 500,
}));

// Node types and interfaces
type NodeType = 'supplier' | 'warehouse' | 'customer';
type NodeStatus = 'success' | 'warning' | 'error';

interface SupplyNode {
  id: string;
  name: string;
  type: NodeType;
  status: NodeStatus;
  details?: {
    items?: number;
    value?: number;
    eta?: string;
  };
}

interface FlowConnection {
  from: string;
  to: string;
  status: NodeStatus;
  active: boolean;
  position?: [number, number, number, number]; // [left%, top%, width%, rotation]
}

interface SupplyChainVisualizationProps {
  suppliers: SupplyNode[];
  warehouses: SupplyNode[];
  customers: SupplyNode[];
  connections: FlowConnection[];
  onNodeClick: (node: SupplyNode) => void;
}

export const SupplyChainVisualization: React.FC<SupplyChainVisualizationProps> = ({
  suppliers,
  warehouses,
  customers,
  connections,
  onNodeClick,
}) => {
  // State for view toggle and time period
  const [viewMode, setViewMode] = useState<'physical' | 'financial'>('physical');
  const [timePeriod, setTimePeriod] = useState<string>('week');
  
  // Handle view mode change
  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'physical' | 'financial' | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };
  
  // Handle time period change
  const handleTimePeriodChange = (event: SelectChangeEvent) => {
    setTimePeriod(event.target.value);
  };
  
  // Get icon based on node type
  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'supplier':
        return <SupplierIcon />;
      case 'warehouse':
        return <WarehouseIcon />;
      case 'customer':
        return <CustomerIcon />;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: NodeStatus) => {
    switch (status) {
      case 'success':
        return <SuccessIcon fontSize="small" />;
      case 'warning':
        return <WarningIcon fontSize="small" />;
      case 'error':
        return <ErrorIcon fontSize="small" />;
    }
  };
  
  // Render node
  const renderNode = (node: SupplyNode) => (
    <Node 
      key={node.id} 
      status={node.status}
      onClick={() => onNodeClick(node)}
    >
      {getNodeIcon(node.type)}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" fontWeight={500}>
          {node.name}
        </Typography>
        {node.details && (
          <Typography variant="caption" color="text.secondary">
            {node.details.items && `${node.details.items} items`}
            {node.details.value && ` • $${node.details.value.toLocaleString()}`}
            {node.details.eta && ` • ETA: ${node.details.eta}`}
          </Typography>
        )}
      </Box>
      <StatusIndicator status={node.status}>
        {getStatusIcon(node.status)}
      </StatusIndicator>
    </Node>
  );
  
  // Default positions for flow lines
  const defaultPositions: Record<string, [number, number, number, number]> = {
    'supplier-warehouse-1': [30, 20, 40, 0],
    'supplier-warehouse-2': [30, 40, 40, 0],
    'supplier-warehouse-3': [30, 60, 40, 0],
    'warehouse-customer-1': [70, 30, 30, 0],
    'warehouse-customer-2': [70, 50, 30, 0],
  };

  return (
    <StyledPaper>
      <ChartHeader>
        <Typography variant="h6">Supply Chain Flow</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="time-period-label">Time Period</InputLabel>
            <Select
              labelId="time-period-label"
              value={timePeriod}
              label="Time Period"
              onChange={handleTimePeriodChange}
            >
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
            </Select>
          </FormControl>
          
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            size="small"
          >
            <ToggleButton value="physical">
              Physical
            </ToggleButton>
            <ToggleButton value="financial">
              Financial
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </ChartHeader>
      
      <ChartContent>
        <FlowContainer>
          {/* Supplier Column */}
          <NodeColumn>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 1 }}
            >
              Suppliers
            </Typography>
            {suppliers.map(renderNode)}
          </NodeColumn>
          
          {/* Warehouse Column */}
          <NodeColumn>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 1 }}
            >
              Warehouses
            </Typography>
            {warehouses.map(renderNode)}
          </NodeColumn>
          
          {/* Customer Column */}
          <NodeColumn>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ textAlign: 'center', mb: 1 }}
            >
              Customers
            </Typography>
            {customers.map(renderNode)}
          </NodeColumn>
          
          {/* Flow Lines */}
          {connections.map((connection, index) => {
            const pos = connection.position || defaultPositions[`supplier-warehouse-${index + 1}`] || [30, 30, 40, 0];
            return (
              <FlowLine
                key={`${connection.from}-${connection.to}`}
                status={connection.status}
                animate={connection.active}
                sx={{
                  left: `${pos[0]}%`,
                  top: `${pos[1]}%`,
                  width: `${pos[2]}%`,
                  transform: `rotate(${pos[3]}deg)`,
                }}
              />
            );
          })}
        </FlowContainer>
      </ChartContent>
    </StyledPaper>
  );
};

export default SupplyChainVisualization; 