import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Tabs,
  Tab,
  Button,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
  alpha
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import InventoryIcon from '@mui/icons-material/Inventory';
import HistoryIcon from '@mui/icons-material/History';
import VerifiedIcon from '@mui/icons-material/Verified';
import WarningIcon from '@mui/icons-material/Warning';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import LinkIcon from '@mui/icons-material/Link';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { TechComponentsInventoryItem } from '../types';
import { 
  mockInventoryHistory, 
  mockComponentUsage, 
  mockRelatedComponents, 
  mockQualityData, 
  mockBlockchainRecords 
} from '../mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`item-tabpanel-${index}`}
      aria-labelledby={`item-tab-${index}`}
      {...other}
      style={{ height: 'calc(100% - 49px)', overflow: 'auto' }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface ItemDetailsDrawerProps {
  item: TechComponentsInventoryItem;
  onClose: () => void;
}

export const ItemDetailsDrawer: React.FC<ItemDetailsDrawerProps> = ({
  item,
  onClose
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStockLevelColor = (current: number, min: number) => {
    const ratio = current / min;
    if (ratio < 0.5) return theme.palette.error.main;
    if (ratio < 1) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getStockPercentage = (current: number, min: number, max: number) => {
    if (current <= min) return Math.max(Math.round((current / min) * 50), 5);
    const range = max - min;
    const excess = current - min;
    return Math.min(50 + Math.round((excess / range) * 50), 100);
  };

  const getLifecycleStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return theme.palette.info.main;
      case 'active':
        return theme.palette.success.main;
      case 'mature':
        return theme.palette.success.dark;
      case 'declining':
        return theme.palette.warning.main;
      case 'end-of-life':
        return theme.palette.error.light;
      case 'obsolete':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const stockColor = getStockLevelColor(item.currentStock, item.minLevel);
  const stockPercentage = getStockPercentage(item.currentStock, item.minLevel, item.maxLevel);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6">Component Details</Typography>
        <IconButton onClick={onClose} edge="end">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Item Header */}
      <Box sx={{ 
        p: 3, 
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>{item.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'monospace', mr: 1 }}>
                {item.sku}
              </Typography>
              {item.blockchainVerified && (
                <Tooltip title="Blockchain Verified">
                  <VerifiedIcon color="success" fontSize="small" />
                </Tooltip>
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Chip 
                label={item.category} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={item.subcategory} 
                size="small" 
                variant="outlined" 
              />
              <Chip 
                label={`Lead Time: ${item.leadTime} days`} 
                size="small" 
                variant="outlined" 
                icon={<TimelineIcon fontSize="small" />}
              />
              <Chip 
                label={item.lifecycleStatus} 
                size="small"
                sx={{ 
                  backgroundColor: alpha(getLifecycleStatusColor(item.lifecycleStatus), 0.1),
                  color: getLifecycleStatusColor(item.lifecycleStatus),
                  textTransform: 'capitalize'
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%', 
              justifyContent: 'space-between' 
            }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>Current Stock</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" sx={{ mr: 1 }}>
                    {item.currentStock.toLocaleString()}
                  </Typography>
                  {item.currentStock < item.reorderPoint && (
                    <Tooltip title="Below reorder point">
                      <WarningIcon color="error" />
                    </Tooltip>
                  )}
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={stockPercentage}
                  sx={{ 
                    height: 8, 
                    borderRadius: 1,
                    mb: 1,
                    backgroundColor: `${stockColor}20`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: stockColor
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">
                    Min: {item.minLevel.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Max: {item.maxLevel.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Value</Typography>
                <Typography variant="h6">${item.totalValue.toLocaleString()}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Unit Cost: ${item.unitCost.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ 
        display: 'flex', 
        gap: 1, 
        p: 1, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper
      }}>
        <Button 
          startIcon={<EditIcon />} 
          variant="outlined" 
          size="small"
        >
          Edit
        </Button>
        <Button 
          startIcon={<ShoppingCartIcon />} 
          variant="outlined" 
          size="small"
          color="primary"
        >
          Order
        </Button>
        <Button 
          startIcon={<SwapHorizIcon />} 
          variant="outlined" 
          size="small"
          color="secondary"
        >
          Transfer
        </Button>
        <Button 
          startIcon={<QrCodeIcon />} 
          variant="outlined" 
          size="small"
        >
          QR Code
        </Button>
        {item.datasheet && (
          <Button 
            startIcon={<DownloadIcon />} 
            variant="outlined" 
            size="small"
            component="a"
            href={item.datasheet}
            target="_blank"
          >
            Datasheet
          </Button>
        )}
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" />
          <Tab label="Locations" />
          <Tab label="History" />
          <Tab label="Usage" />
          <Tab label="Related" />
          <Tab label="Quality" />
          <Tab label="Blockchain" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Category</Typography>
                  <Typography variant="body1">{item.category}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Subcategory</Typography>
                  <Typography variant="body1">{item.subcategory}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Supplier</Typography>
                  <Typography variant="body1">{item.supplier}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Lead Time</Typography>
                  <Typography variant="body1">{item.leadTime} days</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Last Received</Typography>
                  <Typography variant="body1">{formatDate(item.lastReceived)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Last Shipped</Typography>
                  <Typography variant="body1">{formatDate(item.lastShipped)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Lifecycle Status</Typography>
                  <Chip 
                    label={item.lifecycleStatus} 
                    size="small"
                    sx={{ 
                      backgroundColor: alpha(getLifecycleStatusColor(item.lifecycleStatus), 0.1),
                      color: getLifecycleStatusColor(item.lifecycleStatus),
                      textTransform: 'capitalize'
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Health Score</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.healthScore}
                      sx={{ 
                        width: 100, 
                        height: 8, 
                        borderRadius: 1,
                        mr: 1,
                        backgroundColor: alpha(theme.palette.success.main, 0.2),
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.success.main
                        }
                      }}
                    />
                    <Typography variant="body2">
                      {item.healthScore}/100
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>Compliance</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>RoHS</Typography>
                  <Chip 
                    label={item.complianceStatus.rohs ? "Compliant" : "Non-Compliant"} 
                    color={item.complianceStatus.rohs ? "success" : "error"}
                    size="small"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>REACH</Typography>
                  <Chip 
                    label={item.complianceStatus.reach ? "Compliant" : "Non-Compliant"} 
                    color={item.complianceStatus.reach ? "success" : "error"}
                    size="small"
                  />
                </Box>
              </Box>
              
              <Typography variant="subtitle1" gutterBottom>Blockchain Verification</Typography>
              <Divider sx={{ mb: 2 }} />
              {item.blockchainVerified ? (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <VerifiedIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant="body1">Verified on Blockchain</Typography>
                  </Box>
                  {item.blockchainHash && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontFamily: 'monospace', 
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        p: 1,
                        borderRadius: 1,
                        overflowX: 'auto'
                      }}
                    >
                      {item.blockchainHash}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Not verified on blockchain
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Warehouse Locations</Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Warehouse</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">% of Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.locations.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {location.warehouseId.charAt(0).toUpperCase() + location.warehouseId.slice(1)}
                    </TableCell>
                    <TableCell align="right">{location.quantity.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      {Math.round((location.quantity / item.currentStock) * 100)}%
                    </TableCell>
                    <TableCell>
                      <Button 
                        startIcon={<SwapHorizIcon />} 
                        size="small"
                        variant="text"
                      >
                        Transfer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Transaction History</Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell>Reference</TableCell>
                  <TableCell>Performed By</TableCell>
                  <TableCell>Verification</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockInventoryHistory.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} 
                        size="small"
                        color={
                          transaction.type === 'received' ? 'success' :
                          transaction.type === 'shipped' ? 'error' :
                          transaction.type === 'adjusted' ? 'warning' :
                          'default'
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ 
                      color: transaction.quantity > 0 ? theme.palette.success.main : theme.palette.error.main 
                    }}>
                      {transaction.quantity > 0 ? '+' : ''}{transaction.quantity}
                    </TableCell>
                    <TableCell>{transaction.reference}</TableCell>
                    <TableCell>{transaction.performedBy}</TableCell>
                    <TableCell>
                      {transaction.verificationHash && (
                        <Tooltip title={transaction.verificationHash}>
                          <VerifiedIcon color="success" fontSize="small" />
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Component Usage</Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Quantity Used</TableCell>
                  <TableCell>Last Used</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockComponentUsage.map((usage, index) => (
                  <TableRow key={index}>
                    <TableCell>{usage.productId}</TableCell>
                    <TableCell>{usage.productName}</TableCell>
                    <TableCell align="right">{usage.quantityUsed}</TableCell>
                    <TableCell>{formatDate(usage.lastUsed)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Related Components</Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>SKU</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Current Stock</TableCell>
                  <TableCell align="right">Correlation</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockRelatedComponents.map((component, index) => (
                  <TableRow key={index}>
                    <TableCell>{component.sku}</TableCell>
                    <TableCell>{component.name}</TableCell>
                    <TableCell>{component.category}</TableCell>
                    <TableCell align="right">{component.currentStock.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <LinearProgress
                        variant="determinate"
                        value={component.usageCorrelation * 100}
                        sx={{ 
                          width: 100, 
                          height: 8, 
                          borderRadius: 1,
                          backgroundColor: alpha(theme.palette.primary.main, 0.2),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.palette.primary.main
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="small"
                        variant="text"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>Quality Metrics</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Failure Rate</Typography>
                  <Typography variant="body1">{(mockQualityData.failureRate * 100).toFixed(2)}%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Return Rate</Typography>
                  <Typography variant="body1">{(mockQualityData.returnRate * 100).toFixed(2)}%</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Last Inspection</Typography>
                  <Typography variant="body1">{formatDate(mockQualityData.lastInspectionDate)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">Inspection Result</Typography>
                  <Chip 
                    label={mockQualityData.inspectionResult.charAt(0).toUpperCase() + mockQualityData.inspectionResult.slice(1)} 
                    size="small"
                    color={
                      mockQualityData.inspectionResult === 'passed' ? 'success' :
                      mockQualityData.inspectionResult === 'failed' ? 'error' :
                      'warning'
                    }
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">Notes</Typography>
                <Typography variant="body2">{mockQualityData.notes}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="subtitle1" gutterBottom>Quality Trends</Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 200,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 1
              }}>
                <Typography variant="body2" color="text.secondary">
                  Quality trend chart would be displayed here
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Blockchain Records</Typography>
          <Divider sx={{ mb: 2 }} />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell>Hash</TableCell>
                  <TableCell align="right">Verifications</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockBlockchainRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(record.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip 
                        label={record.type.charAt(0).toUpperCase() + record.type.slice(1)} 
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">{record.quantity}</TableCell>
                    <TableCell>
                      <Tooltip title={record.hash}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontFamily: 'monospace',
                            maxWidth: 150,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {record.hash}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">{record.verifications}</TableCell>
                    <TableCell>
                      {record.verified ? (
                        <Chip 
                          label="Verified" 
                          size="small"
                          color="success"
                          icon={<VerifiedIcon />}
                        />
                      ) : (
                        <Chip 
                          label="Pending" 
                          size="small"
                          color="warning"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default ItemDetailsDrawer; 