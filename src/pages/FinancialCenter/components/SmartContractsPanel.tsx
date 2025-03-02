import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material';

// Icons
import AddIcon from '@mui/icons-material/Add';
import LoopIcon from '@mui/icons-material/Loop';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// Types
interface SmartContract {
  id: string;
  name: string;
  type: string;
  parties: string;
  value: number;
  status: string;
  statusColor: string;
  expiryDate: string;
  verifications: number;
}

// Props
export interface SmartContractsPanelProps {
  contracts: SmartContract[];
}

const SmartContractsPanel: React.FC<SmartContractsPanelProps> = ({
  contracts
}) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6">Blockchain Smart Contracts</Typography>
            <Typography variant="body2" color="text.secondary">Manage and track all supplier agreements</Typography>
          </Box>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ mr: 1 }}
            >
              New Contract
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<LoopIcon />}
            >
              Refresh
            </Button>
          </Box>
        </Box>
        
        {/* Smart Contracts Table */}
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <TableCell>Contract ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Parties</TableCell>
                <TableCell align="right">Value</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Verifications</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <DescriptionIcon sx={{ mr: 1, color: 'primary.main', fontSize: 16 }} />
                      <Typography variant="body2">{contract.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {contract.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={contract.type} 
                      size="small"
                      sx={{
                        bgcolor: 
                          contract.type.includes('Supply') ? 'info.dark' + '22' : 
                          contract.type.includes('Payment') ? 'success.dark' + '22' : 
                          'primary.dark' + '22',
                        color: 
                          contract.type.includes('Supply') ? 'info.main' : 
                          contract.type.includes('Payment') ? 'success.main' : 
                          'primary.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {contract.parties}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" fontWeight="medium">
                      ${contract.value.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={contract.status} 
                      size="small"
                      sx={{
                        bgcolor: `${contract.statusColor}.dark` + '22',
                        color: `${contract.statusColor}.main`,
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{contract.expiryDate.split('-')[2]}/{contract.expiryDate.split('-')[1]}/{contract.expiryDate.split('-')[0].substring(2)}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={`${contract.verifications} nodes`} 
                      size="small"
                      icon={<VerifiedUserIcon />}
                      sx={{
                        bgcolor: 'success.dark' + '22',
                        color: 'success.main',
                        fontWeight: 'medium'
                      }} 
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default SmartContractsPanel;
