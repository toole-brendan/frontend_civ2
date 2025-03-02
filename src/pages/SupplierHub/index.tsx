import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Divider,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Button,
  Chip,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  InputAdornment,
  Avatar,
  Tabs,
  Tab,
  ListItemIcon,
  ListItemText,
  SelectChangeEvent,
  List,
  ListItem,
  LinearProgress,
  useTheme
} from '@mui/material';
import { PageHeader } from '@/components/common';
import KpiStatsCard from '@/components/common/KpiStatsCard';

// Import recharts components
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend
} from 'recharts';

// Import components and data
import { 
  suppliers, 
  performanceData, 
  leadTimeData, 
  qualityData, 
  activeOrders, 
  suppliedComponents, 
  upcomingEvents 
} from './SupplierData';

import { 
  TabPanel, 
  SupplierProfileCard, 
  PerformanceScoreCard, 
  QuickActionsCard, 
  UpcomingEventsCard, 
  ContactCard, 
  PerformanceChart, 
  LeadTimeChart, 
  QualityRadarChart, 
  OrderHistoryChart, 
  PerformanceBreakdown, 
  ReviewCard, 
  ComponentQualityMetrics, 
  BusinessDetailsSection, 
  FinancialDetailsSection 
} from './SupplierComponents';

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VerifiedIcon from '@mui/icons-material/Verified';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import RefreshIcon from '@mui/icons-material/Refresh';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const SupplierHub: React.FC = () => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [selectedSupplier, setSelectedSupplier] = useState(suppliers[0]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleSupplierChange = (event: SelectChangeEvent<number>) => {
    const supplierId = event.target.value as number;
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Header Section */}
        <PageHeader
          title="Supplier Hub"
          actions={
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" startIcon={<MessageIcon />}>
                Contact
              </Button>
              <Button variant="outlined" startIcon={<AssessmentIcon />}>
                Reports
              </Button>
              <Button variant="contained" color="primary" startIcon={<AddIcon />}>
                New Order
              </Button>
              <IconButton size="small" onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add New Supplier</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <DescriptionIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Create Contract</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <PaymentIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Process Payment</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <SecurityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Verification Settings</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
          }
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Manage your supplier relationships, track performance, and optimize your supply chain
            </Typography>
            
            <FormControl variant="outlined" sx={{ minWidth: 300, mt: 2 }}>
              <InputLabel id="supplier-select-label">Active Supplier</InputLabel>
              <Select
                labelId="supplier-select-label"
                id="supplier-select"
                value={selectedSupplier.id}
                onChange={handleSupplierChange}
                label="Active Supplier"
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.id} value={supplier.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 1, width: 24, height: 24, fontSize: '0.75rem' }}>
                        {supplier.logo}
                      </Avatar>
                      {supplier.name}
                      {supplier.verificationStatus === 'Verified' && (
                        <VerifiedIcon color="primary" fontSize="small" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </PageHeader>
          
          {/* Supplier Profile Card */}
          <SupplierProfileCard supplier={selectedSupplier} />
          
          {/* Tabs Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={selectedTab} 
              onChange={handleTabChange} 
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Overview" icon={<BusinessIcon />} iconPosition="start" />
              <Tab label="Performance" icon={<InsertChartIcon />} iconPosition="start" />
              <Tab label="Orders" icon={<ShoppingCartIcon />} iconPosition="start" />
              <Tab label="Components" icon={<CategoryIcon />} iconPosition="start" />
              <Tab label="Contracts" icon={<DescriptionIcon />} iconPosition="start" />
              <Tab label="Communication" icon={<MessageIcon />} iconPosition="start" />
              <Tab label="Verification" icon={<VerifiedIcon />} iconPosition="start" />
            </Tabs>
          </Box>
          
          {/* Overview Tab Panel */}
          <TabPanel value={selectedTab} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ height: '100%', mb: { xs: 3, md: 0 } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6">Supplier Summary</Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <BusinessDetailsSection supplier={selectedSupplier} />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <FinancialDetailsSection supplier={selectedSupplier} />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Primary Contacts
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <ContactCard 
                              name={selectedSupplier.contactName} 
                              position="Account Manager" 
                              avatarLetter={selectedSupplier.contactName.charAt(0)}
                              bgColor="primary.main"
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={6} md={4}>
                            <ContactCard 
                              name="Jessica Huang" 
                              position="Technical Support" 
                              avatarLetter="J"
                              bgColor="info.main"
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={6} md={4}>
                            <ContactCard 
                              name="David Chang" 
                              position="Finance Manager" 
                              avatarLetter="D"
                              bgColor="secondary.main"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  {/* Performance Score Card */}
                  <PerformanceScoreCard supplier={selectedSupplier} />
                  
                  {/* Quick Actions Card */}
                  <QuickActionsCard />
                  
                  {/* Upcoming Events Card */}
                  <UpcomingEventsCard events={upcomingEvents} />
                </Stack>
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Performance Tab Panel */}
          <TabPanel value={selectedTab} index={1}>
            <Grid container spacing={3}>
              {/* Performance Metrics Cards */}
              <Grid item xs={12} lg={8}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                      <Typography variant="h6">Performance History</Typography>
                      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                        <InputLabel id="period-select-label">Period</InputLabel>
                        <Select
                          labelId="period-select-label"
                          id="period-select"
                          value="6months"
                          label="Period"
                        >
                          <MenuItem value="3months">3 Months</MenuItem>
                          <MenuItem value="6months">6 Months</MenuItem>
                          <MenuItem value="1year">1 Year</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <PerformanceChart data={performanceData} />
                  </CardContent>
                </Card>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Lead Time Trend
                        </Typography>
                        <LeadTimeChart data={leadTimeData} />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Quality Metrics
                        </Typography>
                        <QualityRadarChart data={qualityData} supplierName={selectedSupplier.name} />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs={12} lg={4}>
                {/* Performance Breakdown */}
                <PerformanceBreakdown supplier={selectedSupplier} />
                
                {/* Quarterly Review Card */}
                <ReviewCard />
              </Grid>
            </Grid>
          </TabPanel>
          
          {/* Orders Tab Panel */}
          <TabPanel value={selectedTab} index={2}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Active Orders</Typography>
                  <Box>
                    <Button 
                      variant="contained" 
                      startIcon={<AddIcon />}
                      sx={{ mr: 1 }}
                    >
                      Create Order
                    </Button>
                    <IconButton size="small">
                      <RefreshIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <TableContainer>
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>Order #</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Items</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Est. Delivery</TableCell>
                        <TableCell>Payment</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {activeOrders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell component="th" scope="row">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                              {order.items}
                            </Typography>
                          </TableCell>
                          <TableCell>${order.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Chip 
                              size="small" 
                              label={order.status} 
                              color={
                                order.status === 'Confirmed' ? 'default' :
                                order.status === 'In Production' ? 'primary' :
                                order.status === 'Preparing Shipment' ? 'info' :
                                order.status === 'Shipped' ? 'success' :
                                'warning'
                              }
                            />
                          </TableCell>
                          <TableCell>{order.delivery}</TableCell>
                          <TableCell>
                            <Chip 
                              size="small" 
                              label={order.paymentStatus} 
                              color={
                                order.paymentStatus === 'Paid' ? 'success' :
                                order.paymentStatus === 'Deposit Paid' ? 'info' :
                                order.paymentStatus === 'Pending Payment' ? 'warning' :
                                'error'
                              }
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small">
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </TabPanel>
          
          {/* Components Tab Panel */}
          <TabPanel value={selectedTab} index={3}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6">Supplied Components</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      placeholder="Search components..."
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mr: 1, width: 250 }}
                    />
                    <Button 
                      variant="outlined" 
                      startIcon={<FilterListIcon />}
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Filter
                    </Button>
                    <IconButton size="small">
                      <SortIcon />
                    </IconButton>
                  </Box>
                </Box>
                
                <TableContainer>
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>Part Number</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell>Lead Time</TableCell>
                        <TableCell align="right">MOQ</TableCell>
                        <TableCell>Current Stock</TableCell>
                        <TableCell>Lifecycle</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {suppliedComponents.map((component) => (
                        <TableRow key={component.id} hover>
                          <TableCell>{component.id}</TableCell>
                          <TableCell>{component.name}</TableCell>
                          <TableCell>{component.category}</TableCell>
                          <TableCell align="right">${component.price.toFixed(2)}</TableCell>
                          <TableCell>{component.leadTime}</TableCell>
                          <TableCell align="right">{component.moq.toLocaleString()}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ width: 60, mr: 1 }}>
                                <LinearProgress 
                                  variant="determinate" 
                                  value={Math.min((component.stock / (component.moq * 10)) * 100, 100)} 
                                  sx={{ height: 6, borderRadius: 1 }} 
                                  color={
                                    component.stock < component.moq ? 'error' :
                                    component.stock < component.moq * 3 ? 'warning' : 'success'
                                  }
                                />
                              </Box>
                              <Typography variant="body2">
                                {component.stock.toLocaleString()}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="small" 
                              label={component.lifecycle} 
                              color={
                                component.lifecycle === 'Active' ? 'success' :
                                component.lifecycle === 'Declining' ? 'warning' : 'error'
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <IconButton size="small" color="primary" sx={{ mr: 0.5 }}>
                                <ShoppingCartIcon fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="primary">
                                <MoreVertIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            
            <ComponentQualityMetrics />
          </TabPanel>
          
          {/* Other tab panels would go here */}
          <TabPanel value={selectedTab} index={4}>
            <Typography variant="h6" sx={{ p: 3 }}>Contracts Panel (To be implemented)</Typography>
          </TabPanel>
          
          <TabPanel value={selectedTab} index={5}>
            <Typography variant="h6" sx={{ p: 3 }}>Communication Panel (To be implemented)</Typography>
          </TabPanel>
          
          <TabPanel value={selectedTab} index={6}>
            <Typography variant="h6" sx={{ p: 3 }}>Verification Panel (To be implemented)</Typography>
          </TabPanel>
        </Box>
      </Box>
  );
};

export default SupplierHub;
