import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Badge,
  styled,
  useTheme,
  Divider,
  Button,
  Avatar,
  LinearProgress,
  Tooltip
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
import VerifiedIcon from '@mui/icons-material/Verified';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Order } from '../types';

// Styled components
const PipelineContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
}));

const PipelineScroller = styled(Box)({
  display: 'flex',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    height: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
});

const StageColumn = styled(Paper)(({ theme }) => ({
  minWidth: 280,
  height: '100%',
  margin: theme.spacing(0, 1),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  '&:first-of-type': {
    marginLeft: 0,
  },
  '&:last-of-type': {
    marginRight: 0,
  },
}));

const StageHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StageContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  flexGrow: 1,
  overflowY: 'auto',
  minHeight: 300,
  maxHeight: 500,
  '&::-webkit-scrollbar': {
    width: 6,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 3,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  },
}));

const OrderCard = styled(Card)<{
  priority: 'high' | 'medium' | 'low';
  isDragging?: boolean;
}>(({ theme, priority, isDragging }) => ({
  marginBottom: theme.spacing(1),
  cursor: 'grab',
  position: 'relative',
  borderLeft: `4px solid ${
    priority === 'high'
      ? theme.palette.error.main
      : priority === 'medium'
      ? theme.palette.warning.main
      : theme.palette.success.main
  }`,
  boxShadow: isDragging
    ? theme.shadows[10]
    : theme.shadows[1],
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '0 16px 16px 0',
    borderColor: `transparent ${
      priority === 'high'
        ? theme.palette.error.light
        : priority === 'medium'
        ? theme.palette.warning.light
        : theme.palette.success.light
    } transparent transparent`,
    opacity: 0.7,
  },
}));

const StageFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StageBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: 10,
    minWidth: 20,
    height: 20,
    padding: '0 6px',
  },
}));

const ProgressIndicator = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

// Define order pipeline stages
const pipelineStages = [
  { id: 'draft', name: 'Draft/Quote', color: '#78909C' },
  { id: 'pending', name: 'Pending Approval', color: '#FF9800' },
  { id: 'approved', name: 'Approved', color: '#4CAF50' },
  { id: 'production', name: 'In Production', color: '#3F51B5' },
  { id: 'ready', name: 'Ready for Shipment', color: '#9C27B0' },
  { id: 'transit', name: 'In Transit', color: '#00BCD4' },
  { id: 'delivered', name: 'Delivered', color: '#8BC34A' },
  { id: 'completed', name: 'Completed', color: '#2E7D32' },
];

// Types
interface OrderPipelineProps {
  orders: Order[];
  onOrderClick: (orderId: string) => void;
  onOrderMove: (orderId: string, fromStage: string, toStage: string) => void;
}

interface OrdersByStage {
  [key: string]: {
    orders: Order[];
    totalValue: number;
    completionPercentage: number;
  };
}

const OrderPipeline: React.FC<OrderPipelineProps> = ({ 
  orders, 
  onOrderClick, 
  onOrderMove 
}) => {
  const theme = useTheme();
  // State for dragging
  const [draggedOrder, setDraggedOrder] = useState<string | null>(null);

  // Group orders by stage
  const ordersByStage: OrdersByStage = pipelineStages.reduce((acc, stage) => {
    const stageOrders = orders.filter(order => {
      switch (stage.id) {
        case 'draft':
          return order.status === 'draft';
        case 'pending':
          return order.status === 'pending';
        case 'approved':
          return order.status === 'approved';
        case 'production':
          return order.status === 'processing';
        case 'ready':
          return order.status === 'approved' && order.items.every(item => item.status === 'allocated');
        case 'transit':
          return order.status === 'shipped';
        case 'delivered':
          return order.status === 'delivered' && order.paymentStatus !== 'paid';
        case 'completed':
          return order.status === 'delivered' && order.paymentStatus === 'paid';
        default:
          return false;
      }
    });

    const totalValue = stageOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Calculate completion based on stage position
    const stageIndex = pipelineStages.findIndex(s => s.id === stage.id);
    const completionPercentage = ((stageIndex + 1) / pipelineStages.length) * 100;

    return {
      ...acc,
      [stage.id]: {
        orders: stageOrders,
        totalValue,
        completionPercentage
      }
    };
  }, {} as OrdersByStage);

  // Get priority for order (simulated logic)
  const getOrderPriority = (order: Order): 'high' | 'medium' | 'low' => {
    if (order.status === 'approved' && Date.now() > new Date(order.dateCreated).getTime() + 7 * 24 * 60 * 60 * 1000) {
      return 'high';
    }
    if (order.totalAmount > 1000) {
      return 'medium';
    }
    return 'low';
  };

  // Drag & Drop handlers
  const handleDragStart = (orderId: string) => {
    setDraggedOrder(orderId);
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    if (!draggedOrder) return;

    // Find which stage the order is coming from
    const fromStageId = Object.keys(ordersByStage).find(stageId => 
      ordersByStage[stageId].orders.some(order => order.id === draggedOrder)
    );

    if (fromStageId && fromStageId !== targetStageId) {
      onOrderMove(draggedOrder, fromStageId, targetStageId);
    }

    setDraggedOrder(null);
  };

  return (
    <PipelineContainer>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Order Pipeline</Typography>
        <Button variant="outlined" size="small" startIcon={<FilterListIcon />}>
          Filter
        </Button>
      </Box>

      <PipelineScroller>
        {pipelineStages.map((stage) => (
          <StageColumn 
            key={stage.id}
            onDragOver={(e) => handleDragOver(e, stage.id)}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <StageHeader>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StageBadge 
                  badgeContent={ordersByStage[stage.id]?.orders.length || 0}
                  color="primary"
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    {stage.name}
                  </Typography>
                </StageBadge>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                  ${ordersByStage[stage.id]?.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 }) || 0}
                </Typography>
              </Box>
            </StageHeader>

            <StageContent>
              {ordersByStage[stage.id]?.orders.map((order) => (
                <OrderCard
                  key={order.id}
                  priority={getOrderPriority(order)}
                  isDragging={draggedOrder === order.id}
                  draggable
                  onDragStart={() => handleDragStart(order.id)}
                  onClick={() => onOrderClick(order.id)}
                >
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {order.orderNumber}
                      </Typography>
                      {order.blockchainVerified && (
                        <Tooltip title="Blockchain Verified">
                          <VerifiedIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                        </Tooltip>
                      )}
                    </Box>

                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {order.type === 'purchase' ? 'Supplier' : 'Customer'}:
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {order.type === 'purchase' ? order.supplier : order.customer}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" fontWeight="bold">
                        ${order.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </Typography>
                      <Chip 
                        label={order.paymentStatus} 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.65rem',
                          bgcolor: order.paymentStatus === 'paid' 
                            ? theme.palette.success.light 
                            : order.paymentStatus === 'partial' 
                              ? theme.palette.warning.light 
                              : theme.palette.error.light,
                          color: order.paymentStatus === 'paid' 
                            ? theme.palette.success.dark 
                            : order.paymentStatus === 'partial' 
                              ? theme.palette.warning.dark 
                              : theme.palette.error.dark,
                        }} 
                      />
                    </Box>

                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                      <LocalShippingIcon sx={{ fontSize: 14, mr: 0.5, color: theme.palette.text.secondary }} />
                      <Typography variant="caption" color="text.secondary">
                        {order.expectedDelivery 
                          ? new Date(order.expectedDelivery).toLocaleDateString() 
                          : 'No date set'}
                      </Typography>
                    </Box>

                    <ProgressIndicator>
                      <LinearProgress 
                        variant="determinate" 
                        value={ordersByStage[stage.id].completionPercentage} 
                        sx={{ 
                          flexGrow: 1,
                          height: 4,
                          borderRadius: 2,
                          bgcolor: theme.palette.action.hover,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: stage.color
                          }
                        }} 
                      />
                      <Typography variant="caption" color="text.secondary">
                        {Math.round(ordersByStage[stage.id].completionPercentage)}%
                      </Typography>
                    </ProgressIndicator>
                  </CardContent>
                </OrderCard>
              ))}
              
              {ordersByStage[stage.id]?.orders.length === 0 && (
                <Box sx={{ 
                  height: 100, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  borderRadius: 1,
                  border: `1px dashed ${theme.palette.divider}`,
                  m: 1
                }}>
                  <Typography variant="body2" color="text.secondary">
                    No orders in this stage
                  </Typography>
                </Box>
              )}
            </StageContent>

            <StageFooter>
              <Box sx={{ 
                width: '100%', 
                height: 4, 
                bgcolor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <Box sx={{ 
                  width: `${ordersByStage[stage.id].completionPercentage}%`, 
                  height: '100%', 
                  bgcolor: stage.color
                }} />
              </Box>
            </StageFooter>
          </StageColumn>
        ))}
      </PipelineScroller>
    </PipelineContainer>
  );
};

export default OrderPipeline; 