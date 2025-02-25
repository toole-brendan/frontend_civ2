import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  styled,
  Tabs,
  Tab,
  Chip,
  Divider,
  Grid,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import VerifiedIcon from '@mui/icons-material/Verified';
import DescriptionIcon from '@mui/icons-material/Description';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { Partner, Contact, Document, Transaction } from '../types';

const DetailPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: 0,
  border: `1px solid ${theme.palette.divider}`,
}));

const DetailItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

const DetailValue = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`partner-tabpanel-${index}`}
      aria-labelledby={`partner-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

interface PartnerDetailsProps {
  partner: Partner;
  onClose: () => void;
  onEdit: (partner: Partner) => void;
}

const PartnerDetails: React.FC<PartnerDetailsProps> = ({
  partner,
  onClose,
  onEdit,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'error';
      case 'PENDING':
        return 'warning';
      case 'ON_HOLD':
        return 'info';
      default:
        return 'default';
    }
  };

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'SUPPLIER':
        return 'primary';
      case 'CUSTOMER':
        return 'secondary';
      case 'DISTRIBUTOR':
        return 'info';
      case 'LOGISTICS':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Mock data for examples
  const mockTransactions: Transaction[] = [
    {
      id: 'TX001',
      date: '2023-09-15',
      type: 'PURCHASE',
      amount: 12500.00,
      status: 'COMPLETED',
      description: 'Purchase of Ethiopian Yirgacheffe - 2500 kg',
      relatedOrderId: 'ORD-2023-092',
    },
    {
      id: 'TX002',
      date: '2023-08-22',
      type: 'PURCHASE',
      amount: 9750.00,
      status: 'COMPLETED',
      description: 'Purchase of Colombian Supremo - 1500 kg',
      relatedOrderId: 'ORD-2023-087',
    },
    {
      id: 'TX003',
      date: '2023-07-10',
      type: 'PAYMENT',
      amount: 22250.00,
      status: 'COMPLETED',
      description: 'Payment for outstanding invoices',
    },
  ];

  return (
    <Box>
      {/* Header with actions */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Partner Details
        </Typography>
        <Box>
          <Button 
            startIcon={<EditIcon />} 
            variant="outlined" 
            onClick={() => onEdit(partner)}
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button 
            startIcon={<CloseIcon />} 
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>

      {/* Partner summary */}
      <DetailPaper>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
          <Avatar
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: `${getPartnerTypeColor(partner.type)}.main`,
              mr: 3,
              fontSize: '2rem',
            }}
          >
            {partner.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h4" fontWeight="bold">
                {partner.name}
              </Typography>
              {partner.blockchainVerified && (
                <VerifiedIcon 
                  color="primary" 
                  sx={{ ml: 1 }} 
                  titleAccess="Blockchain Verified"
                />
              )}
            </Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <Chip 
                label={partner.type}
                color={getPartnerTypeColor(partner.type) as any}
                sx={{ mr: 1 }}
              />
              <Chip 
                label={partner.status}
                color={getStatusColor(partner.status) as any}
              />
            </Box>
            <Typography color="text.secondary">
              Partner since {formatDate(partner.dateAdded)}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <DetailItem>
              <DetailLabel>Website</DetailLabel>
              <DetailValue>
                {partner.website ? (
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    {partner.website}
                  </a>
                ) : (
                  'N/A'
                )}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Tax ID</DetailLabel>
              <DetailValue>{partner.taxId || 'N/A'}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Payment Terms</DetailLabel>
              <DetailValue>{partner.paymentTerms || 'N/A'}</DetailValue>
            </DetailItem>
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailItem>
              <DetailLabel>Origin Countries</DetailLabel>
              <Box>
                {partner.originCountries && partner.originCountries.length > 0 ? (
                  partner.originCountries.map((country, index) => (
                    <StyledChip key={index} label={country} size="small" />
                  ))
                ) : (
                  <Typography variant="body2">N/A</Typography>
                )}
              </Box>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Certifications</DetailLabel>
              <Box>
                {partner.certifications && partner.certifications.length > 0 ? (
                  partner.certifications.map((cert, index) => (
                    <StyledChip key={index} label={cert} size="small" color="primary" variant="outlined" />
                  ))
                ) : (
                  <Typography variant="body2">N/A</Typography>
                )}
              </Box>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Tags</DetailLabel>
              <Box>
                {partner.tags && partner.tags.length > 0 ? (
                  partner.tags.map((tag, index) => (
                    <StyledChip key={index} label={tag} size="small" color="default" variant="outlined" />
                  ))
                ) : (
                  <Typography variant="body2">N/A</Typography>
                )}
              </Box>
            </DetailItem>
          </Grid>
        </Grid>
      </DetailPaper>

      {/* Tabs for detailed information */}
      <Paper sx={{ borderRadius: 0 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Contacts" icon={<PeopleIcon />} />
          <Tab label="Addresses" icon={<BusinessIcon />} />
          <Tab label="Documents" icon={<DescriptionIcon />} />
          <Tab label="Transactions" icon={<ReceiptIcon />} />
        </Tabs>

        {/* Contacts Tab */}
        <TabPanel value={tabValue} index={0}>
          <List sx={{ width: '100%' }}>
            {partner.contacts.map((contact) => (
              <ListItem 
                key={contact.id}
                sx={{ 
                  mb: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 0,
                }}
              >
                <ListItemAvatar>
                  <Avatar>{contact.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {contact.name}
                      </Typography>
                      {contact.isPrimary && (
                        <Chip 
                          label="Primary" 
                          size="small" 
                          color="primary" 
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        {contact.position}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">
                            {contact.email}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                          <Typography variant="body2">
                            {contact.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Addresses Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DetailPaper>
                <Typography variant="h6" gutterBottom>
                  Billing Address
                </Typography>
                <DetailItem>
                  <DetailValue>
                    {partner.billingAddress.street}
                  </DetailValue>
                  <DetailValue>
                    {partner.billingAddress.city}, {partner.billingAddress.state} {partner.billingAddress.postalCode}
                  </DetailValue>
                  <DetailValue>
                    {partner.billingAddress.country}
                  </DetailValue>
                </DetailItem>
              </DetailPaper>
            </Grid>
            
            {partner.shippingAddress && (
              <Grid item xs={12} md={6}>
                <DetailPaper>
                  <Typography variant="h6" gutterBottom>
                    Shipping Address
                  </Typography>
                  <DetailItem>
                    <DetailValue>
                      {partner.shippingAddress.street}
                    </DetailValue>
                    <DetailValue>
                      {partner.shippingAddress.city}, {partner.shippingAddress.state} {partner.shippingAddress.postalCode}
                    </DetailValue>
                    <DetailValue>
                      {partner.shippingAddress.country}
                    </DetailValue>
                  </DetailItem>
                </DetailPaper>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        {/* Documents Tab */}
        <TabPanel value={tabValue} index={2}>
          <List sx={{ width: '100%' }}>
            {partner.documents.map((doc) => (
              <ListItem 
                key={doc.id}
                sx={{ 
                  mb: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 0,
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {doc.name}
                      </Typography>
                      <Chip 
                        label={doc.type} 
                        size="small" 
                        color="default" 
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="span">
                        Uploaded: {formatDate(doc.uploadDate)}
                      </Typography>
                      {doc.expiryDate && (
                        <Typography 
                          variant="body2" 
                          component="div"
                          color={new Date(doc.expiryDate) < new Date() ? 'error' : 'inherit'}
                        >
                          Expires: {formatDate(doc.expiryDate)}
                        </Typography>
                      )}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end">
                    <DownloadIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>

        {/* Transactions Tab */}
        <TabPanel value={tabValue} index={3}>
          <List sx={{ width: '100%' }}>
            {mockTransactions.map((tx) => (
              <ListItem 
                key={tx.id}
                sx={{ 
                  mb: 2,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 0,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: tx.type === 'PAYMENT' ? 'success.main' : 'primary.main' }}>
                    <ReceiptIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {tx.id} - {tx.type}
                      </Typography>
                      <Chip 
                        label={tx.status} 
                        size="small" 
                        color={tx.status === 'COMPLETED' ? 'success' : 'warning'} 
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" component="div">
                        {tx.description}
                      </Typography>
                      <Box sx={{ display: 'flex', mt: 1, gap: 2 }}>
                        <Typography variant="body2" component="span">
                          Date: {formatDate(tx.date)}
                        </Typography>
                        {tx.relatedOrderId && (
                          <Typography variant="body2" component="span">
                            Order: {tx.relatedOrderId}
                          </Typography>
                        )}
                      </Box>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {formatCurrency(tx.amount)}
                  </Typography>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PartnerDetails; 