import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Divider, 
  TextField,
  Button,
  InputAdornment,
  Slider,
  useTheme
} from '@mui/material';
import { 
  TrendingUp, 
  Clock, 
  FileCheck, 
  DollarSign,
  Calculator,
  Coins
} from 'lucide-react';
import { PaymentMethodComparison as PaymentMethodComparisonType } from '../mockData';

interface PaymentMethodComparisonProps {
  comparisonData: PaymentMethodComparisonType;
}

const PaymentMethodComparison: React.FC<PaymentMethodComparisonProps> = ({
  comparisonData
}) => {
  const theme = useTheme();
  const [calculatorAmount, setCalculatorAmount] = useState<number>(50000);
  const [calculatorDays, setCalculatorDays] = useState<number>(30);
  
  // Calculate savings based on user input
  const traditionalFee = calculatorAmount * (comparisonData.traditional.fees.percentage / 100);
  const blockchainFee = calculatorAmount * (comparisonData.blockchain.fees.percentage / 100);
  const potentialSavings = traditionalFee - blockchainFee;
  const timeSavings = calculatorDays > 2 ? calculatorDays - 1 : calculatorDays - 0.5;
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Payment Method Comparison
      </Typography>
      
      <Grid container spacing={3}>
        {/* Traditional Payments Side */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: theme.palette.text.primary }}>
              Traditional Payments
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DollarSign size={20} color={theme.palette.error.main} />
                <Typography variant="subtitle2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
                  Wire transfer fees
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.traditional.fees.percentage}% average (${comparisonData.traditional.fees.ytdAmount.toLocaleString()} YTD)
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Clock size={20} color={theme.palette.warning.main} />
                <Typography variant="subtitle2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
                  Processing time
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.traditional.processingTime}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FileCheck size={20} color={theme.palette.info.main} />
                <Typography variant="subtitle2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
                  Reconciliation
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.traditional.reconciliation}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp size={20} color={theme.palette.error.main} />
                <Typography variant="subtitle2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
                  Currency conversion costs
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.traditional.currencyConversion}% average
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Center Comparison */}
        <Grid item xs={12} md={2}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              px: 2
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: theme.palette.primary.main,
                color: 'white',
                mb: 2
              }}
            >
              <Coins size={40} />
            </Box>
            
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, color: theme.palette.primary.main }}>
              Total savings
            </Typography>
            
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: theme.palette.success.main }}>
              ${comparisonData.savings.ytdTotal.toLocaleString()}
            </Typography>
            
            <Divider sx={{ width: '100%', my: 2 }} />
            
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              Time savings
            </Typography>
            
            <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
              {comparisonData.savings.timeSavings} business days
            </Typography>
            
            <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              Projected annual
            </Typography>
            
            <Typography variant="h6" fontWeight="medium" sx={{ color: theme.palette.success.main }}>
              ${comparisonData.savings.projectedAnnual.toLocaleString()}
            </Typography>
          </Box>
        </Grid>
        
        {/* Shell Token Payments Side */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              bgcolor: theme.palette.primary.main,
              color: 'white',
              position: 'relative'
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Shell Token Payments
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <DollarSign size={20} color="rgba(255, 255, 255, 0.9)" />
                <Typography variant="subtitle2" sx={{ ml: 1, opacity: 0.9 }}>
                  Transaction fees
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.blockchain.fees.percentage}% average (${comparisonData.blockchain.fees.ytdAmount.toLocaleString()} YTD)
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Clock size={20} color="rgba(255, 255, 255, 0.9)" />
                <Typography variant="subtitle2" sx={{ ml: 1, opacity: 0.9 }}>
                  Processing time
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.blockchain.processingTime}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <FileCheck size={20} color="rgba(255, 255, 255, 0.9)" />
                <Typography variant="subtitle2" sx={{ ml: 1, opacity: 0.9 }}>
                  Reconciliation
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.blockchain.reconciliation}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp size={20} color="rgba(255, 255, 255, 0.9)" />
                <Typography variant="subtitle2" sx={{ ml: 1, opacity: 0.9 }}>
                  Currency conversion costs
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight="medium" sx={{ ml: 4 }}>
                {comparisonData.blockchain.currencyConversion}% average
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        {/* Savings Calculator */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mt: 2,
              borderRadius: 2,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: theme.palette.background.paper
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Calculator size={24} color={theme.palette.primary.main} />
              <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
                Payment Savings Calculator
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                    Payment Amount
                  </Typography>
                  <TextField
                    fullWidth
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    variant="outlined"
                    size="small"
                  />
                  <Slider
                    value={calculatorAmount}
                    onChange={(_, value) => setCalculatorAmount(value as number)}
                    min={1000}
                    max={500000}
                    step={1000}
                    sx={{ mt: 2 }}
                  />
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                    Payment Terms (Days)
                  </Typography>
                  <TextField
                    fullWidth
                    value={calculatorDays}
                    onChange={(e) => setCalculatorDays(Number(e.target.value))}
                    variant="outlined"
                    size="small"
                  />
                  <Slider
                    value={calculatorDays}
                    onChange={(_, value) => setCalculatorDays(value as number)}
                    min={1}
                    max={90}
                    step={1}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: 2,
                    bgcolor: theme.palette.success.light,
                    color: theme.palette.success.contrastText,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 3 }}>
                    Estimated Savings with Shell Tokens
                  </Typography>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ color: theme.palette.success.contrastText, opacity: 0.8 }}>
                        Traditional Fee:
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        ${traditionalFee.toLocaleString()}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: theme.palette.success.contrastText, opacity: 0.8 }}>
                        Shell Token Fee:
                      </Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        ${blockchainFee.toLocaleString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="body2" sx={{ color: theme.palette.success.contrastText, opacity: 0.8 }}>
                        Fee Savings:
                      </Typography>
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, color: theme.palette.success.dark }}>
                        ${potentialSavings.toLocaleString()}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: theme.palette.success.contrastText, opacity: 0.8 }}>
                        Time Savings:
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {timeSavings.toFixed(1)} days
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 3,
                      bgcolor: theme.palette.success.dark,
                      color: 'white',
                      '&:hover': {
                        bgcolor: theme.palette.success.main,
                      }
                    }}
                  >
                    Apply to Next Payment
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PaymentMethodComparison; 