import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  CircularProgress,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Badge
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PublicIcon from '@mui/icons-material/Public';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CategoryIcon from '@mui/icons-material/Category';
import HistoryIcon from '@mui/icons-material/History';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ShieldIcon from '@mui/icons-material/Shield';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Supplier } from '../types';

interface SupplierRiskManagementProps {
  suppliers: Supplier[];
  onSupplierSelect: (supplierId: string) => void;
}

const SupplierRiskManagement: React.FC<SupplierRiskManagementProps> = ({
  suppliers,
  onSupplierSelect
}) => {
  const theme = useTheme();
  const [selectedRiskType, setSelectedRiskType] = useState<string | null>(null);
  
  // Filter suppliers to get high-risk ones
  const highRiskSuppliers = suppliers.filter(s => 
    s.riskAssessment.geopoliticalRisk === 'HIGH' || 
    s.riskAssessment.financialStability === 'CONCERNING'
  );

  // Helper functions
  const getFinancialStabilityColor = (status: string) => {
    switch (status) {
      case 'STRONG':
        return theme.palette.success.main;
      case 'STABLE':
        return theme.palette.info.main;
      case 'CONCERNING':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getGeopoliticalRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return theme.palette.success.main;
      case 'MEDIUM':
        return theme.palette.warning.main;
      case 'HIGH':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getResilienceScoreColor = (score: number) => {
    if (score >= 80) return theme.palette.success.main;
    if (score >= 60) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getImpactLevelColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return theme.palette.success.main;
      case 'MEDIUM':
        return theme.palette.warning.main;
      case 'HIGH':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getReadinessLevelColor = (level: string) => {
    switch (level) {
      case 'READY':
        return theme.palette.success.main;
      case 'IN_DEVELOPMENT':
        return theme.palette.warning.main;
      case 'NOT_STARTED':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Handle risk type selection
  const handleRiskTypeClick = (riskType: string) => {
    setSelectedRiskType(selectedRiskType === riskType ? null : riskType);
  };

  const renderRiskCards = () => {
    const riskTypes = [
      {
        id: 'geographic',
        title: 'Geographic Risk',
        icon: <PublicIcon />,
        count: suppliers.filter(s => s.riskAssessment.geographicRisk > 70).length,
        description: 'Suppliers operating in high-risk geographical regions',
      },
      {
        id: 'financial',
        title: 'Financial Stability',
        icon: <AccountBalanceIcon />,
        count: suppliers.filter(s => s.riskAssessment.financialStability === 'CONCERNING').length,
        description: 'Suppliers with concerning financial stability',
      },
      {
        id: 'singleSource',
        title: 'Single Source Risk',
        icon: <CategoryIcon />,
        count: suppliers.filter(s => s.riskAssessment.singleSourceComponents > 3).length,
        description: 'Components with single supplier dependencies',
      },
      {
        id: 'disruption',
        title: 'Disruption History',
        icon: <HistoryIcon />,
        count: suppliers.filter(s => s.riskAssessment.disruptionHistory.length > 0).length,
        description: 'Suppliers with past disruption incidents',
      },
      {
        id: 'geopolitical',
        title: 'Geopolitical Risk',
        icon: <PriorityHighIcon />,
        count: suppliers.filter(s => s.riskAssessment.geopoliticalRisk === 'HIGH').length,
        description: 'Suppliers exposed to high geopolitical risk',
      },
      {
        id: 'alternative',
        title: 'Alternative Suppliers',
        icon: <CompareArrowsIcon />,
        count: suppliers.filter(s => 
          s.riskAssessment.alternativeSuppliers.some(alt => alt.readinessLevel === 'NOT_STARTED')
        ).length,
        description: 'Categories without ready alternative suppliers',
      },
    ];

    return (
      <Grid container spacing={2}>
        {riskTypes.map((risk) => (
          <Grid item xs={12} sm={6} md={4} key={risk.id}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                cursor: 'pointer',
                border: `1px solid ${theme.palette.divider}`,
                borderLeft: `4px solid ${
                  selectedRiskType === risk.id 
                    ? theme.palette.primary.main 
                    : risk.count > 0 
                      ? theme.palette.warning.main 
                      : theme.palette.success.main
                }`,
                '&:hover': {
                  boxShadow: theme.shadows[2],
                },
              }}
              onClick={() => handleRiskTypeClick(risk.id)}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      bgcolor: 'rgba(0,0,0,0.04)',
                      borderRadius: 1,
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5,
                      color: risk.count > 0 ? theme.palette.warning.main : theme.palette.success.main,
                    }}
                  >
                    {risk.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {risk.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {risk.description}
                    </Typography>
                  </Box>
                </Box>
                <Badge
                  color={risk.count > 0 ? "warning" : "success"}
                  badgeContent={risk.count}
                  max={99}
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.9rem', height: 22, minWidth: 22 } }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderHighRiskSuppliers = () => {
    return (
      <Card
        variant="outlined"
        sx={{ mt: 3 }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            High Risk Suppliers
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            These suppliers require immediate attention due to high risk factors
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Risk Factors</TableCell>
                  <TableCell>Geo Risk</TableCell>
                  <TableCell>Financial</TableCell>
                  <TableCell>Geo-Political</TableCell>
                  <TableCell>Resilience</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {highRiskSuppliers.map((supplier) => (
                  <TableRow key={supplier.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={supplier.logo}
                          alt={supplier.name}
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            borderRadius: '50%',
                            mr: 1,
                            border: `1px solid ${theme.palette.divider}`
                          }}
                        />
                        {supplier.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {supplier.riskAssessment.financialStability === 'CONCERNING' && (
                          <Tooltip title="Financial Stability Concerns">
                            <Chip 
                              icon={<AccountBalanceIcon />} 
                              label="Financial" 
                              size="small" 
                              color="warning"
                              sx={{ height: 24 }}
                            />
                          </Tooltip>
                        )}
                        {supplier.riskAssessment.geopoliticalRisk === 'HIGH' && (
                          <Tooltip title="High Geopolitical Risk">
                            <Chip 
                              icon={<PublicIcon />} 
                              label="Geopolitical" 
                              size="small" 
                              color="error"
                              sx={{ height: 24 }}
                            />
                          </Tooltip>
                        )}
                        {supplier.riskAssessment.singleSourceComponents > 2 && (
                          <Tooltip title="Single Source Components">
                            <Chip 
                              icon={<CategoryIcon />} 
                              label="Single Source" 
                              size="small" 
                              color="warning"
                              sx={{ height: 24 }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${supplier.riskAssessment.geographicRisk}/100`} 
                        size="small"
                        sx={{ 
                          bgcolor: 
                            supplier.riskAssessment.geographicRisk > 70 
                              ? 'error.light' 
                              : supplier.riskAssessment.geographicRisk > 50 
                                ? 'warning.light' 
                                : 'success.light',
                          color: 
                            supplier.riskAssessment.geographicRisk > 70
                              ? 'error.dark'
                              : supplier.riskAssessment.geographicRisk > 50
                                ? 'warning.dark'
                                : 'success.dark'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={supplier.riskAssessment.financialStability}
                        size="small"
                        sx={{ 
                          bgcolor: `${getFinancialStabilityColor(supplier.riskAssessment.financialStability)}25`,
                          color: getFinancialStabilityColor(supplier.riskAssessment.financialStability),
                          borderColor: getFinancialStabilityColor(supplier.riskAssessment.financialStability)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={supplier.riskAssessment.geopoliticalRisk}
                        size="small"
                        sx={{ 
                          bgcolor: `${getGeopoliticalRiskColor(supplier.riskAssessment.geopoliticalRisk)}25`,
                          color: getGeopoliticalRiskColor(supplier.riskAssessment.geopoliticalRisk),
                          borderColor: getGeopoliticalRiskColor(supplier.riskAssessment.geopoliticalRisk)
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress
                          variant="determinate"
                          value={supplier.riskAssessment.resilienceScore}
                          size={24}
                          thickness={4}
                          sx={{
                            color: getResilienceScoreColor(supplier.riskAssessment.resilienceScore),
                            mr: 1
                          }}
                        />
                        <Typography variant="body2">
                          {supplier.riskAssessment.resilienceScore}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => onSupplierSelect(supplier.id)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {highRiskSuppliers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <CheckCircleOutlineIcon sx={{ color: 'success.main', fontSize: 40, mb: 1 }} />
                      <Typography>No high-risk suppliers detected</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  };

  // Renders risk details based on selected risk type
  const renderRiskDetails = () => {
    if (!selectedRiskType) return null;

    const riskTypeMap: { [key: string]: { title: string; description: string } } = {
      geographic: {
        title: 'Geographic Risk Analysis',
        description: 'Analysis of suppliers by geographic region and associated risks.'
      },
      financial: {
        title: 'Financial Stability Assessment',
        description: 'Evaluation of suppliers\' financial health and stability.'
      },
      singleSource: {
        title: 'Single Source Risk',
        description: 'Components with only one supplier, creating potential supply chain vulnerabilities.'
      },
      disruption: {
        title: 'Disruption History',
        description: 'Past supply disruptions and their impact on operations.'
      },
      geopolitical: {
        title: 'Geopolitical Risk Exposure',
        description: 'Exposure to international trade risks, sanctions, and political instability.'
      },
      alternative: {
        title: 'Alternative Supplier Readiness',
        description: 'Status of backup suppliers for critical components.'
      }
    };

    return (
      <Card variant="outlined" sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {riskTypeMap[selectedRiskType].title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {riskTypeMap[selectedRiskType].description}
          </Typography>
          <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Detailed risk analysis would be displayed here based on the selected risk type. 
              This would include charts, tables, and metrics specific to {riskTypeMap[selectedRiskType].title.toLowerCase()}.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="medium">
          Supplier Risk Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor and manage supply chain risk factors across your supplier network
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Risk Overview
        </Typography>
        {renderRiskCards()}
      </Box>

      {renderHighRiskSuppliers()}
      {renderRiskDetails()}

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ShieldIcon />}
          sx={{ mr: 2 }}
        >
          Generate Risk Report
        </Button>
        <Button
          variant="contained"
          color="primary"
        >
          Create Mitigation Plan
        </Button>
      </Box>
    </Box>
  );
};

export default SupplierRiskManagement; 