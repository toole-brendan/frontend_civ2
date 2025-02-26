import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  LinearProgress,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { QualityMetrics, QualityIncident } from '../types';

// Extend the QualityMetrics interface to include additional properties
interface ExtendedQualityMetrics extends QualityMetrics {
  averageFailureRate: number;
  failureRateTrend: string;
  rmaTrend: string;
  mtbfTrend: string;
  industryMtbfAverage: number;
  componentCategories: {
    name: string;
    acceptanceRate: number;
    defectRate: number;
    trend: string;
  }[];
}

interface ComponentQualityTrackingProps {
  qualityMetrics: ExtendedQualityMetrics | null;
  onViewIncident: (incidentId: string) => void;
  onViewAllMetrics: () => void;
}

const ComponentQualityTracking: React.FC<ComponentQualityTrackingProps> = ({
  qualityMetrics,
  onViewIncident,
  onViewAllMetrics
}) => {
  const theme = useTheme();

  if (!qualityMetrics) {
    return (
      <Paper elevation={0} sx={{ p: 3, height: '100%', border: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body1" color="text.secondary" align="center">
          No quality metrics available
        </Typography>
      </Paper>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'IMPROVING':
        return <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.success.main }} />;
      case 'WORSENING':
        return <TrendingDownIcon fontSize="small" sx={{ color: theme.palette.error.main }} />;
      case 'STABLE':
      default:
        return <TrendingFlatIcon fontSize="small" sx={{ color: theme.palette.info.main }} />;
    }
  };

  const getQualityStatusColor = (rate: number, type: 'failure' | 'acceptance') => {
    if (type === 'failure') {
      if (rate < 0.5) return theme.palette.success.main;
      if (rate < 1.5) return theme.palette.warning.main;
      return theme.palette.error.main;
    } else {
      if (rate >= 99) return theme.palette.success.main;
      if (rate >= 95) return theme.palette.warning.main;
      return theme.palette.error.main;
    }
  };

  const getIncidentLevelColor = (status: string) => {
    switch (status) {
      case 'RESOLVED':
      case 'CLOSED':
        return {
          bg: theme.palette.success.light,
          color: theme.palette.success.dark,
          icon: <CheckCircleOutlineIcon fontSize="small" />
        };
      case 'OPEN':
        return {
          bg: theme.palette.error.light,
          color: theme.palette.error.dark,
          icon: <WarningAmberIcon fontSize="small" />
        };
      case 'IN_PROGRESS':
        return {
          bg: theme.palette.warning.light,
          color: theme.palette.warning.dark,
          icon: <InfoOutlinedIcon fontSize="small" />
        };
      default:
        return {
          bg: theme.palette.grey[200],
          color: theme.palette.grey[700],
          icon: <InfoOutlinedIcon fontSize="small" />
        };
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Component Quality Metrics
      </Typography>

      {/* Overall quality indicators */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: theme.palette.background.default,
              height: '100%',
            }}
          >
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              Failure Rate
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="bold">
                {qualityMetrics.averageFailureRate.toFixed(2)}%
              </Typography>
              {getTrendIcon(qualityMetrics.failureRateTrend)}
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(qualityMetrics.averageFailureRate * 33.3, 100)} // Scale to make 3% = 100%
              sx={{
                height: 4,
                borderRadius: 2,
                mt: 1,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getQualityStatusColor(qualityMetrics.averageFailureRate, 'failure'),
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: theme.palette.background.default,
              height: '100%',
            }}
          >
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              RMA Rate
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="bold">
                {qualityMetrics.rmaRate.toFixed(2)}%
              </Typography>
              {getTrendIcon(qualityMetrics.rmaTrend)}
            </Box>
            <LinearProgress
              variant="determinate"
              value={Math.min(qualityMetrics.rmaRate * 50, 100)} // Scale to make 2% = 100%
              sx={{
                height: 4,
                borderRadius: 2,
                mt: 1,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getQualityStatusColor(qualityMetrics.rmaRate, 'failure'),
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: theme.palette.background.default,
              height: '100%',
            }}
          >
            <Typography variant="body2" fontWeight="medium" sx={{ mb: 1 }}>
              MTBF
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" fontWeight="bold">
                {qualityMetrics.mtbf ? Number(qualityMetrics.mtbf).toLocaleString() : 'N/A'} hrs
              </Typography>
              {getTrendIcon(qualityMetrics.mtbfTrend)}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Industry avg: {Number(qualityMetrics.industryMtbfAverage).toLocaleString()} hrs
              </Typography>
              <Chip
                label={qualityMetrics.mtbf && qualityMetrics.mtbf >= qualityMetrics.industryMtbfAverage ? "Above Average" : "Below Average"}
                size="small"
                sx={{
                  ml: 1,
                  height: 16,
                  fontSize: '0.625rem',
                  backgroundColor: qualityMetrics.mtbf && qualityMetrics.mtbf >= qualityMetrics.industryMtbfAverage 
                    ? theme.palette.success.light 
                    : theme.palette.warning.light,
                  color: qualityMetrics.mtbf && qualityMetrics.mtbf >= qualityMetrics.industryMtbfAverage 
                    ? theme.palette.success.dark 
                    : theme.palette.warning.dark,
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Component-specific quality table */}
      <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
        Component-Specific Quality
      </Typography>
      
      <TableContainer component={Paper} variant="outlined" sx={{ mb: 3, maxHeight: 200 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Component Category</TableCell>
              <TableCell align="right">Acceptance Rate</TableCell>
              <TableCell align="right">Defect Rate</TableCell>
              <TableCell align="right">Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qualityMetrics.componentCategories.map((category) => (
              <TableRow key={category.name}>
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: getQualityStatusColor(category.acceptanceRate, 'acceptance'),
                      fontWeight: 'medium'
                    }}
                  >
                    {category.acceptanceRate.toFixed(1)}%
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: getQualityStatusColor(category.defectRate, 'failure'),
                      fontWeight: 'medium'
                    }}
                  >
                    {category.defectRate.toFixed(2)}%
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {getTrendIcon(category.trend)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recent quality incidents */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle1" fontWeight="medium">
          Recent Quality Incidents
        </Typography>
        <Chip
          label={`${qualityMetrics.qualityIncidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED').length} Open`}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.625rem',
            backgroundColor: qualityMetrics.qualityIncidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED').length > 0
              ? theme.palette.warning.light
              : theme.palette.success.light,
            color: qualityMetrics.qualityIncidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'CLOSED').length > 0
              ? theme.palette.warning.dark
              : theme.palette.success.dark,
          }}
        />
      </Box>
      
      <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 180 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Component</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qualityMetrics.qualityIncidents.map((incident) => {
              const { bg, color, icon } = getIncidentLevelColor(incident.status);
              return (
                <TableRow key={incident.id}>
                  <TableCell>
                    {new Date(incident.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{incident.category}</TableCell>
                  <TableCell>
                    <Tooltip title={incident.description}>
                      <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                        {incident.description.substring(0, 30)}...
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      icon={icon}
                      label={incident.status}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.625rem',
                        backgroundColor: bg,
                        color: color,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      onClick={() => onViewIncident(incident.id)}
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ComponentQualityTracking; 