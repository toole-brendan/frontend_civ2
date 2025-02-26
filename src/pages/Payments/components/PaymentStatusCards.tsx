import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import { 
  Clock, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  FileText
} from 'lucide-react';
import { PaymentStatusSummary } from '../mockData';

interface PaymentStatusCardsProps {
  statusSummary: PaymentStatusSummary;
  onPayNow: () => void;
  onReviewSchedule: () => void;
  onViewReceipts: () => void;
}

const PaymentStatusCards: React.FC<PaymentStatusCardsProps> = ({
  statusSummary,
  onPayNow,
  onReviewSchedule,
  onViewReceipts
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Due Today Card */}
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(to right bottom, ${theme.palette.error.light}, ${theme.palette.error.main})`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <AlertTriangle size={24} opacity={0.8} />
          </Box>
          
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1, opacity: 0.9 }}>
            DUE TODAY
          </Typography>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            ${statusSummary.dueToday.amount.toLocaleString()}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Recipient: {statusSummary.dueToday.recipient}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Invoice: {statusSummary.dueToday.invoice}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Chip 
              label="Shell tokens recommended" 
              size="small"
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 'medium',
                mb: 1
              }} 
            />
            <Typography variant="body2" fontWeight="medium" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Potential savings: ${statusSummary.dueToday.potentialSavings.toLocaleString()}
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<CreditCard size={16} />}
            onClick={onPayNow}
            sx={{ 
              mt: 'auto',
              bgcolor: 'white',
              color: theme.palette.error.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              fontWeight: 'bold'
            }}
          >
            Pay Now
          </Button>
        </Paper>
      </Grid>

      {/* Due This Week Card */}
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(to right bottom, ${theme.palette.warning.light}, ${theme.palette.warning.main})`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <Calendar size={24} opacity={0.8} />
          </Box>
          
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1, opacity: 0.9 }}>
            DUE THIS WEEK
          </Typography>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            ${statusSummary.dueThisWeek.amount.toLocaleString()}
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
            {statusSummary.dueThisWeek.count} payments
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>
              Recipients:
            </Typography>
            {statusSummary.dueThisWeek.recipients.map((recipient, index) => (
              <Typography key={index} variant="body2" sx={{ opacity: 0.9, fontWeight: 'medium' }}>
                • {recipient}
              </Typography>
            ))}
          </Box>
          
          <Button 
            variant="contained" 
            fullWidth
            endIcon={<ArrowRight size={16} />}
            onClick={onReviewSchedule}
            sx={{ 
              mt: 'auto',
              bgcolor: 'white',
              color: theme.palette.warning.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              fontWeight: 'bold'
            }}
          >
            Review Schedule
          </Button>
        </Paper>
      </Grid>

      {/* Processing Card */}
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(to right bottom, ${theme.palette.info.light}, ${theme.palette.info.main})`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <Clock size={24} opacity={0.8} />
          </Box>
          
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1, opacity: 0.9 }}>
            PROCESSING
          </Typography>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            ${statusSummary.processing.amount.toLocaleString()}
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
            {statusSummary.processing.count} payments
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              Blockchain verification in progress
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              Estimated completion: {statusSummary.processing.estimatedCompletion}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ opacity: 0.9, mr: 1 }}>
                Confirmation count:
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {statusSummary.processing.confirmations.current}/{statusSummary.processing.confirmations.required} required
              </Typography>
            </Box>
            
            <LinearProgress 
              variant="determinate" 
              value={(statusSummary.processing.confirmations.current / statusSummary.processing.confirmations.required) * 100} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'white'
                }
              }}
            />
          </Box>
        </Paper>
      </Grid>

      {/* Recently Completed Card */}
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            background: `linear-gradient(to right bottom, ${theme.palette.success.light}, ${theme.palette.success.main})`,
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
            <CheckCircle size={24} opacity={0.8} />
          </Box>
          
          <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 1, opacity: 0.9 }}>
            RECENTLY COMPLETED
          </Typography>
          
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            ${statusSummary.recentlyCompleted.amount.toLocaleString()}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {statusSummary.recentlyCompleted.count} payments
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Completed: {statusSummary.recentlyCompleted.period}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="medium" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Fee savings: ${statusSummary.recentlyCompleted.feeSavings.toLocaleString()}
            </Typography>
          </Box>
          
          <Button 
            variant="contained" 
            fullWidth
            startIcon={<FileText size={16} />}
            onClick={onViewReceipts}
            sx={{ 
              mt: 'auto',
              bgcolor: 'white',
              color: theme.palette.success.main,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              },
              fontWeight: 'bold'
            }}
          >
            View Receipts
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PaymentStatusCards; 