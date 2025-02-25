import React from 'react';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  styled,
  Rating,
  IconButton,
  Tooltip,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Partner } from '../types';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const PartnerAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  backgroundColor: theme.palette.primary.main,
  marginRight: theme.spacing(2),
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& svg': {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

interface PartnerCardProps {
  partner: Partner;
  onClick: (partner: Partner) => void;
  onMenuClick: (event: React.MouseEvent<HTMLElement>, partner: Partner) => void;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner, onClick, onMenuClick }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
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

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onMenuClick(event, partner);
  };

  return (
    <StyledCard elevation={2}>
      <CardActionArea onClick={() => onClick(partner)}>
        <CardContent>
          {/* Header with Avatar and Basic Info */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex' }}>
              {partner.logoUrl ? (
                <PartnerAvatar src={partner.logoUrl} alt={partner.name} />
              ) : (
                <PartnerAvatar>{getInitials(partner.name)}</PartnerAvatar>
              )}
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h6" component="div">
                    {partner.name}
                  </Typography>
                  {partner.isVerified && (
                    <Tooltip title="Verified Partner">
                      <VerifiedIcon color="primary" sx={{ ml: 0.5, fontSize: '1rem' }} />
                    </Tooltip>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Chip 
                    label={partner.type} 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                    sx={{ mr: 1 }}
                  />
                  <Chip 
                    label={partner.status} 
                    size="small" 
                    color={getStatusColor(partner.status) as any} 
                    variant="outlined"
                  />
                </Box>
                <Rating 
                  value={partner.rating} 
                  precision={0.5} 
                  size="small" 
                  readOnly 
                />
              </Box>
            </Box>
            <Tooltip title="Partner Options">
              <IconButton
                aria-label="partner options"
                onClick={handleMenuClick}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ mb: 1.5 }} />

          {/* Contact Information */}
          <Box sx={{ mb: 1.5 }}>
            <InfoRow>
              <PersonIcon fontSize="small" />
              <Typography variant="body2">
                {partner.contactName}
              </Typography>
            </InfoRow>
            <InfoRow>
              <EmailIcon fontSize="small" />
              <Typography variant="body2" noWrap>
                {partner.email}
              </Typography>
            </InfoRow>
            <InfoRow>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">
                {partner.phone}
              </Typography>
            </InfoRow>
            <InfoRow>
              <BusinessIcon fontSize="small" />
              <Typography variant="body2" noWrap>
                {partner.companyRegistration || 'No registration info'}
              </Typography>
            </InfoRow>
            <InfoRow>
              <PlaceIcon fontSize="small" />
              <Typography variant="body2" noWrap>
                {partner.country}
              </Typography>
            </InfoRow>
          </Box>

          {/* Tags and Certifications */}
          <TagsContainer>
            {partner.certifications?.slice(0, 2).map((cert) => (
              <Chip 
                key={cert} 
                label={cert} 
                size="small" 
                color="success"
                variant="outlined"
              />
            ))}
            {partner.tags?.slice(0, 2).map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                size="small" 
                color="secondary"
                variant="outlined"
              />
            ))}
            {((partner.certifications?.length || 0) + (partner.tags?.length || 0)) > 4 && (
              <Chip 
                label={`+${((partner.certifications?.length || 0) + (partner.tags?.length || 0)) - 4} more`} 
                size="small" 
                variant="outlined"
              />
            )}
          </TagsContainer>

          {/* Partner Metrics */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Orders
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {partner.metrics?.totalOrders || 0}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Revenue
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                ${partner.metrics?.totalRevenue?.toLocaleString() || 0}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary">
                Since
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {new Date(partner.partnerSince).getFullYear()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default PartnerCard; 