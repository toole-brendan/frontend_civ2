import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  useTheme
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingIcon from '@mui/icons-material/Pending';
import { BlockchainRecord } from '../mockData';

interface BlockchainRecordsTableProps {
  records: BlockchainRecord[];
}

export const BlockchainRecordsTable: React.FC<BlockchainRecordsTableProps> = ({
  records
}) => {
  const theme = useTheme();
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (hash: string) => {
    const currentIndex = expandedRows.indexOf(hash);
    const newExpanded = [...expandedRows];

    if (currentIndex === -1) {
      newExpanded.push(hash);
    } else {
      newExpanded.splice(currentIndex, 1);
    }

    setExpandedRows(newExpanded);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'inventory-receipt':
        return 'Inventory Receipt';
      case 'smart-contract-payment':
        return 'Smart Contract Payment';
      case 'transfer-authorization':
        return 'Transfer Authorization';
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Blockchain Records</Typography>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell width="40px" />
                <TableCell>Transaction Hash</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Parties</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((record) => {
                const isExpanded = expandedRows.indexOf(record.hash) !== -1;
                
                return (
                  <React.Fragment key={record.hash}>
                    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => toggleRow(record.hash)}
                        >
                          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
                        {truncateHash(record.hash)}
                      </TableCell>
                      <TableCell>{getTypeLabel(record.type)}</TableCell>
                      <TableCell>{record.items}</TableCell>
                      <TableCell>{record.parties}</TableCell>
                      <TableCell>{formatTimestamp(record.timestamp)}</TableCell>
                      <TableCell>
                        <Chip
                          icon={record.status === 'confirmed' ? <VerifiedIcon /> : <PendingIcon />}
                          label={record.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          size="small"
                          color={record.status === 'confirmed' ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 2 }}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                              Details
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', gap: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Validations:
                                </Typography>
                                <Typography variant="body2">
                                  {record.validations} confirmations
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', gap: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Full Hash:
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                  {record.hash}
                                </Typography>
                              </Box>
                              {record.financialImpact && (
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                  <Typography variant="body2" color="text.secondary">
                                    Financial Impact:
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    color={record.financialImpact.includes('saved') ? 'success.main' : 'text.primary'}
                                    sx={{ fontWeight: 'medium' }}
                                  >
                                    {record.financialImpact}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default BlockchainRecordsTable; 