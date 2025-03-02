import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Stack,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Divider,
  Tooltip,
  Paper,
  Rating,
  CircularProgress,
  alpha
} from '@mui/material';

// Icons
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningIcon from '@mui/icons-material/Warning';
import SavingsIcon from '@mui/icons-material/Savings';
import DescriptionIcon from '@mui/icons-material/Description';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HistoryIcon from '@mui/icons-material/History';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Chart components
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// Import interfaces from data file
import { Supplier, PerformanceDataItem, LeadTimeDataItem, QualityDataItem, ComponentMixDataItem, UpcomingEvent } from './SupplierData';

// Tab panel props interface
interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}

// Tab panel component
export const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`supplier-tabpanel-${index}`}
      aria-labelledby={`supplier-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Supplier profile card props interface
interface SupplierProfileCardProps {
  supplier: Supplier;
}

// Supplier profile card component
export const SupplierProfileCard: React.FC<SupplierProfileCardProps> = ({ supplier }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Avatar 
                sx={{ 
                  width: 60, 
                  height: 60, 
                  mr: 2, 
                  bgcolor: 'primary.main',
                  fontSize: '1.5rem'
                }}
              >
                {supplier.logo}
              </Avatar>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h5" fontWeight="500">
                    {supplier.name}
                  </Typography>
                  {supplier.verificationStatus === 'Verified' && (
                    <Tooltip title="Blockchain Verified">
                      <VerifiedIcon color="primary" sx={{ ml: 1 }} />
                    </Tooltip>
                  )}
                  {supplier.verificationStatus === 'Pending' && (
                    <Tooltip title="Verification Pending">
                      <Chip
                        size="small"
                        label="Verification Pending"
                        color="warning"
                        sx={{ ml: 1, height: 24 }}
                      />
                    </Tooltip>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {supplier.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 1 }}>
                  <Chip 
                    size="small" 
                    icon={<CategoryIcon fontSize="small" />}
                    label={supplier.categories.join(', ')} 
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    size="small" 
                    icon={<AccessTimeIcon fontSize="small" />}
                    label={`${supplier.yearsSince} years`} 
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="500" color="primary.main">
                    ${(supplier.annualSpend / 1000000).toFixed(2)}M
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Annual Spend
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="500" color="primary.main">
                    {supplier.spendPercentage}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    of Total Spend
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="500" color="primary.main">
                    {supplier.performance}/100
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Performance Score
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="500" color="primary.main">
                    {supplier.onTimeDelivery}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    On-Time Delivery
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button 
                size="small" 
                startIcon={<EmailIcon />} 
                variant="outlined"
                sx={{ mr: 1 }}
              >
                {supplier.contactEmail}
              </Button>
              <Button 
                size="small" 
                startIcon={<PhoneIcon />} 
                variant="outlined"
              >
                {supplier.contactPhone}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Performance score card props interface
interface PerformanceScoreCardProps {
  supplier: Supplier;
}

// Performance score card component
export const PerformanceScoreCard: React.FC<PerformanceScoreCardProps> = ({ supplier }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Overall Performance
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2 }}>
          <Box
            sx={{
              position: 'relative',
              display: 'inline-flex',
            }}
          >
            <CircularProgress
              variant="determinate"
              value={supplier.performance}
              size={120}
              thickness={5}
              sx={{ 
                color: supplier.performance >= 90 ? 'success.main' :
                       supplier.performance >= 80 ? 'primary.main' :
                       supplier.performance >= 70 ? 'warning.main' : 'error.main'
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {supplier.performance}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Quality
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={supplier.qualityScore} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 1, 
                      flexGrow: 1,
                      mr: 1
                    }} 
                  />
                  <Typography variant="body2" fontWeight="medium">
                    {supplier.qualityScore}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Response Time
                </Typography>
                <Typography variant="body2">
                  {supplier.responseTime}
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={6}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  On-Time Delivery
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={supplier.onTimeDelivery} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 1, 
                      flexGrow: 1,
                      mr: 1
                    }} 
                  />
                  <Typography variant="body2" fontWeight="medium">
                    {supplier.onTimeDelivery}
                  </Typography>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Risk Assessment
                </Typography>
                <Chip 
                  size="small" 
                  label={supplier.riskScore} 
                  color={
                    supplier.riskScore === 'Low' ? 'success' : 
                    supplier.riskScore === 'Medium' ? 'warning' : 'error'
                  }
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

// Quick actions card component
export const QuickActionsCard: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<ShoppingCartIcon />}
              sx={{ justifyContent: 'flex-start', mb: 1 }}
            >
              New Order
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<AttachMoneyIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Make Payment
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<DescriptionIcon />}
              sx={{ justifyContent: 'flex-start', mb: 1 }}
            >
              Contracts
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              startIcon={<MessageIcon />}
              sx={{ justifyContent: 'flex-start' }}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Upcoming events card props interface
interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
}

// Upcoming events card component
export const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({ events }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          Upcoming Events
        </Typography>
        <List disablePadding>
          {events.map((event, index) => (
            <ListItem disablePadding sx={{ mb: index < events.length - 1 ? 2 : 0 }} key={event.title}>
              <ListItemIcon sx={{ 
                color: event.type === 'meeting' ? 'primary.main' : 
                       event.type === 'delivery' ? 'success.main' : 'warning.main', 
                minWidth: 36 
              }}>
                {event.type === 'meeting' ? <CalendarTodayIcon fontSize="small" /> :
                 event.type === 'delivery' ? <ShoppingCartIcon fontSize="small" /> :
                 <DescriptionIcon fontSize="small" />}
              </ListItemIcon>
              <ListItemText 
                primary={event.title} 
                secondary={event.date} 
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// Contact card props interface
interface ContactCardProps {
  name: string;
  position: string;
  avatarLetter: string;
  bgColor: string;
}

// Contact card component
export const ContactCard: React.FC<ContactCardProps> = ({ name, position, avatarLetter, bgColor }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: bgColor }}>
            {avatarLetter}
          </Avatar>
          <Typography variant="subtitle2">
            {name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {position}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <IconButton size="small" color="primary">
            <EmailIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <PhoneIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <MessageIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

// Performance chart props interface
interface PerformanceChartProps {
  data: PerformanceDataItem[];
}

// Performance chart component
export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="month" tick={{ fill: '#aaa' }} />
        <YAxis tick={{ fill: '#aaa' }} domain={[70, 100]} />
        <RechartsTooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(22, 22, 22, 0.9)', 
            borderColor: 'rgba(80, 80, 80, 0.9)',
            borderRadius: 8,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
          }} 
        />
        <Legend wrapperStyle={{ paddingTop: 10 }} />
        <Line type="monotone" dataKey="quality" name="Quality" stroke="#66bb6a" strokeWidth={2} />
        <Line type="monotone" dataKey="delivery" name="Delivery" stroke="#29b6f6" strokeWidth={2} />
        <Line type="monotone" dataKey="pricing" name="Pricing" stroke="#ffa726" strokeWidth={2} />
        <Line type="monotone" dataKey="response" name="Response" stroke="#ce93d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Lead time chart props interface
interface LeadTimeChartProps {
  data: LeadTimeDataItem[];
}

// Lead time chart component
export const LeadTimeChart: React.FC<LeadTimeChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="month" tick={{ fill: '#aaa' }} />
        <YAxis tick={{ fill: '#aaa' }} />
        <RechartsTooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(22, 22, 22, 0.9)', 
            borderColor: 'rgba(80, 80, 80, 0.9)',
            borderRadius: 8,
          }} 
        />
        <Legend wrapperStyle={{ paddingTop: 10 }} />
        <Line type="monotone" dataKey="current" name="Current Lead Time" stroke="#90caf9" strokeWidth={2} />
        <Line type="monotone" dataKey="industry" name="Industry Avg" stroke="#bdbdbd" strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Quality radar chart props interface
interface QualityRadarChartProps {
  data: QualityDataItem[];
  supplierName: string;
}

// Quality radar chart component
export const QualityRadarChart: React.FC<QualityRadarChartProps> = ({ data, supplierName }) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart outerRadius={90} data={data}>
        <PolarGrid gridType="polygon" />
        <PolarAngleAxis dataKey="name" tick={{ fill: '#aaa' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#aaa' }} />
        <Radar name={supplierName} dataKey="supplier" stroke="#66bb6a" fill="#66bb6a" fillOpacity={0.6} />
        <Radar name="Industry Avg" dataKey="industry" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
        <Legend wrapperStyle={{ paddingTop: 10 }} />
        <RechartsTooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(22, 22, 22, 0.9)', 
            borderColor: 'rgba(80, 80, 80, 0.9)',
            borderRadius: 8,
          }} 
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

// Order history chart props interface
interface OrderHistoryChartProps {
  data: { month: string; value: number }[];
}

// Order history chart component
export const OrderHistoryChart: React.FC<OrderHistoryChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
        <XAxis dataKey="month" tick={{ fill: '#aaa' }} />
        <YAxis tick={{ fill: '#aaa' }} />
        <RechartsTooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(22, 22, 22, 0.9)', 
            borderColor: 'rgba(80, 80, 80, 0.9)',
            borderRadius: 8,
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Order Value']}
        />
        <Bar dataKey="value" fill="#90caf9" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Component mix pie chart props interface
interface ComponentMixPieChartProps {
  data: ComponentMixDataItem[];
}

// Component mix pie chart component
export const ComponentMixPieChart: React.FC<ComponentMixPieChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <RechartsTooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(22, 22, 22, 0.9)', 
            borderColor: 'rgba(80, 80, 80, 0.9)',
            borderRadius: 8,
          }}
          formatter={(value: number) => [`${value}%`, 'Component Mix']}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Performance breakdown section props interface
interface PerformanceBreakdownProps {
  supplier: Supplier;
}

// Performance breakdown section component
export const PerformanceBreakdown: React.FC<PerformanceBreakdownProps> = ({ supplier }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Performance Breakdown
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Quality Rating
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={supplier.qualityScore} 
                sx={{ height: 8, borderRadius: 1 }} 
                color="success"
              />
            </Box>
            <Typography variant="body2" fontWeight="medium">
              {supplier.qualityScore}/100
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              Defect Rate: 0.4%
            </Typography>
            <Typography variant="caption" color="success.main">
              <ArrowUpwardIcon sx={{ fontSize: 12, verticalAlign: 'middle' }} /> 2.1% vs last quarter
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Delivery Performance
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={supplier.onTimeDelivery} 
                sx={{ height: 8, borderRadius: 1 }} 
                color="primary"
              />
            </Box>
            <Typography variant="body2" fontWeight="medium">
              {supplier.onTimeDelivery}%
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              Average Delay: 1.2 days
            </Typography>
            <Typography variant="caption" color="success.main">
              <ArrowUpwardIcon sx={{ fontSize: 12, verticalAlign: 'middle' }} /> 1.5% vs last quarter
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Cost Competitiveness
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={88} 
                sx={{ height: 8, borderRadius: 1 }} 
                color="warning"
              />
            </Box>
            <Typography variant="body2" fontWeight="medium">
              88/100
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              Price Variance: +3.2%
            </Typography>
            <Typography variant="caption" color="error.main">
              <ArrowDownwardIcon sx={{ fontSize: 12, verticalAlign: 'middle' }} /> 1.0% vs last quarter
            </Typography>
          </Box>
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Responsiveness
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <LinearProgress 
                variant="determinate" 
                value={95} 
                sx={{ height: 8, borderRadius: 1 }} 
                color="secondary"
              />
            </Box>
            <Typography variant="body2" fontWeight="medium">
              95/100
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary">
              Response Time: {supplier.responseTime}
            </Typography>
            <Typography variant="caption" color="success.main">
              <ArrowUpwardIcon sx={{ fontSize: 12, verticalAlign: 'middle' }} /> 3.2% vs last quarter
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// Review card component
export const ReviewCard: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quarterly Performance Review
        </Typography>
        <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.default', mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2">Q1 2025 Results</Typography>
            <Chip size="small" label="Latest" color="primary" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={4.5} precision={0.5} readOnly size="small" sx={{ mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Outstanding
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Improved delivery times by 2 days. Quality metrics consistently above 95%.
          </Typography>
        </Box>
        
        <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.default' }}>
          <Typography variant="subtitle2" gutterBottom>
            Improvement Opportunities
          </Typography>
          <List dense disablePadding>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FavoriteIcon color="error" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2">Price competitiveness for memory products</Typography>
                } 
              />
            </ListItem>
            <ListItem disablePadding sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 24 }}>
                <FavoriteIcon color="warning" fontSize="small" />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Typography variant="body2">Documentation completeness for new products</Typography>
                } 
              />
            </ListItem>
          </List>
        </Box>
        
        <Button 
          fullWidth 
          variant="outlined" 
          sx={{ mt: 2 }}
        >
          View Complete Review History
        </Button>
      </CardContent>
    </Card>
  );
};

// Component quality metrics
export const ComponentQualityMetrics: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quality Metrics
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Defect Rate
            </Typography>
            <Typography variant="body2" color="success.main">
              0.4%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={4} 
            sx={{ height: 6, borderRadius: 1 }} 
            color="success"
          />
          <Typography variant="caption" color="text.secondary">
            Industry average: 1.2%
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Documentation Completeness
            </Typography>
            <Typography variant="body2" color="primary.main">
              92%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={92} 
            sx={{ height: 6, borderRadius: 1 }} 
            color="primary"
          />
          <Typography variant="caption" color="text.secondary">
            Industry average: 85%
          </Typography>
        </Box>
        
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Compliance Certification
            </Typography>
            <Typography variant="body2" color="success.main">
              100%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={100} 
            sx={{ height: 6, borderRadius: 1 }} 
            color="success"
          />
          <Typography variant="caption" color="text.secondary">
            All components meet required certifications
          </Typography>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Recent Quality Issues
        </Typography>
        <Box sx={{ p: 2, borderRadius: 1, bgcolor: 'background.default' }}>
          <Typography variant="body2" gutterBottom>
            <span style={{ fontWeight: 500 }}>Batch TS-MC-458:</span> Minor cosmetic defects
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Feb 5, 2025 - Resolved with replacement
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Lifecycle management card component
export const LifecycleManagementCard: React.FC = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Component Lifecycle Management
        </Typography>
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemIcon sx={{ minWidth: 36, color: 'success.main' }}>
              <CheckCircleIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Active Components" 
              secondary={
                <Typography variant="body2" color="text.secondary">
                  42 components (85%) are in active lifecycle phase
                </Typography>
              } 
            />
          </ListItem>
          
          <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemIcon sx={{ minWidth: 36, color: 'warning.main' }}>
              <WarningIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Declining Components" 
              secondary={
                <Typography variant="body2" color="text.secondary">
                  5 components (10%) entering end-of-life phase
                </Typography>
              } 
            />
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
              <ErrorOutlineIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Critical Alerts" 
              secondary={
                <Typography variant="body2" color="text.secondary">
                  DDR3 Memory modules being phased out by Q4 2025
                </Typography>
              } 
            />
          </ListItem>
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="subtitle2" gutterBottom>
          Recommended Actions
        </Typography>
        <Button 
          fullWidth 
          variant="outlined" 
          color="warning" 
          sx={{ mb: 1 }}
        >
          Review DDR3 to DDR4 Transition Plan
        </Button>
        <Button 
          fullWidth 
          variant="outlined" 
          color="primary"
        >
          Explore Alternative Components
        </Button>
      </CardContent>
    </Card>
  );
};

// Shell token savings component
export const ShellTokenSavings: React.FC = () => {
  return (
    <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Total Savings (YTD)
          </Typography>
          <Typography variant="h6" fontWeight="medium" color="success.main">
            $12,450
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Based on 12 Shell Token transactions
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <PieChart width={100} height={100}>
            <Pie
              data={[
                { name: 'Shell Token', value: 65, color: '#66bb6a' },
                { name: 'Traditional', value: 35, color: '#bdbdbd' },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={25}
              outerRadius={40}
              dataKey="value"
            >
              {[0, 1].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#66bb6a' : '#bdbdbd'} />
              ))}
            </Pie>
          </PieChart>
        </Grid>
      </Grid>
    </Box>
  );
};

// Business details section component
interface BusinessDetailsSectionProps {
  supplier: Supplier;
}

export const BusinessDetailsSection: React.FC<BusinessDetailsSectionProps> = ({ supplier }) => {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Business Details
      </Typography>
      <List disablePadding>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <BusinessIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Primary Categories" 
            secondary={supplier.categories.join(', ')} 
          />
        </ListItem>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LocationOnIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Headquarters" 
            secondary={supplier.location} 
          />
        </ListItem>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Business Hours" 
            secondary={`9:00 AM - 6:00 PM (${supplier.timezone})`} 
          />
        </ListItem>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <AccessTimeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Average Lead Time" 
            secondary={`${supplier.leadTimeAvg} days`} 
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Relationship Since" 
            secondary={`${2025 - supplier.yearsSince}`} 
          />
        </ListItem>
      </List>
    </Box>
  );
};

// Financial details section component
interface FinancialDetailsSectionProps {
  supplier: Supplier;
}

export const FinancialDetailsSection: React.FC<FinancialDetailsSectionProps> = ({ supplier }) => {
  return (
    <Box>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Financial & Contracts
      </Typography>
      <List disablePadding>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <AttachMoneyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Annual Spend" 
            secondary={`$${supplier.annualSpend.toLocaleString()}`} 
          />
        </ListItem>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <ReceiptIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Payment Terms" 
            secondary={supplier.paymentTerms} 
          />
        </ListItem>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Active Contracts" 
            secondary={supplier.activeContracts} 
          />
        </ListItem>
        <ListItem disablePadding sx={{ pb: 1 }}>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Pending Orders" 
            secondary={supplier.pendingOrders} 
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SavingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText 
            primary="Shell Token Enabled" 
            secondary={supplier.shellTokenEnabled ? 'Yes' : 'No'} 
          />
        </ListItem>
      </List>
    </Box>
  );
};
