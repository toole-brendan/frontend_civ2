import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  InputAdornment, 
  TextField, 
  Stack, 
  Divider,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface SupplierHeaderProps {
  onAddSupplier: () => void;
  onSupplierAssessment: () => void;
  onGenerateReport: () => void;
  onExportData: () => void;
  onSearch: (query: string) => void;
}

const SupplierHeader: React.FC<SupplierHeaderProps> = ({
  onAddSupplier,
  onSupplierAssessment,
  onGenerateReport,
  onExportData,
  onSearch,
}) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Box 
      sx={{ 
        mb: 3, 
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Title and Stats Row */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Supplier Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5 }}>
            15 Active Suppliers | $8.4M Annual Spend
          </Typography>
        </Box>
        <form onSubmit={handleSearchSubmit}>
          <TextField
            size="small"
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small">
                    <TuneIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </form>
      </Box>

      {/* Actions Row */}
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button 
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddSupplier}
            sx={{ 
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              }
            }}
          >
            Add New Supplier
          </Button>
          <Button 
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={onSupplierAssessment}
          >
            Supplier Assessment
          </Button>
          <Button 
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={onGenerateReport}
          >
            Generate Report
          </Button>
          <Button 
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={onExportData}
          >
            Export Data
          </Button>
        </Stack>
        <Tooltip title="Learn more about supplier management">
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default SupplierHeader; 