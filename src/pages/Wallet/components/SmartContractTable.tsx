import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  styled,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Visibility as ViewIcon,
  ContentCopy as DuplicateIcon,
  Code as CodeIcon,
  Check as ExecuteIcon,
  Cancel as CancelIcon,
  Refresh as UpdateIcon,
  OpenInNew as ExternalLinkIcon,
  Link as LinkIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';
import { SmartContract } from '../types';

// Styled components
const ContractRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  cursor: 'pointer',
}));

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  fontWeight: 500,
  backgroundColor:
    status === 'active'
      ? theme.palette.success.light
      : status === 'draft'
      ? theme.palette.info.light
      : status === 'executed'
      ? theme.palette.primary.light
      : status === 'cancelled'
      ? theme.palette.error.light
      : theme.palette.warning.light, // expired
  color:
    status === 'active'
      ? theme.palette.success.dark
      : status === 'draft'
      ? theme.palette.info.dark
      : status === 'executed'
      ? theme.palette.primary.dark
      : status === 'cancelled'
      ? theme.palette.error.dark
      : theme.palette.warning.dark, // expired
}));

const TypeChip = styled(Chip)<{ type: string }>(({ theme, type }) => ({
  fontWeight: 500,
  backgroundColor:
    type === 'payment'
      ? theme.palette.primary.light
      : type === 'escrow'
      ? theme.palette.secondary.light
      : type === 'delivery'
      ? theme.palette.info.light
      : theme.palette.grey[300], // custom
  color:
    type === 'payment'
      ? theme.palette.primary.dark
      : type === 'escrow'
      ? theme.palette.secondary.dark
      : type === 'delivery'
      ? theme.palette.info.dark
      : theme.palette.grey[800], // custom
}));

interface SmartContractTableProps {
  contracts: SmartContract[];
  isLoading: boolean;
  onViewContract: (contract: SmartContract) => void;
  onExecuteContract: (contract: SmartContract) => void;
  onCancelContract: (contract: SmartContract) => void;
  onDuplicateContract: (contract: SmartContract) => void;
  onUpdateContract: (contract: SmartContract) => void;
}

export const SmartContractTable: React.FC<SmartContractTableProps> = ({
  contracts,
  isLoading,
  onViewContract,
  onExecuteContract,
  onCancelContract,
  onDuplicateContract,
  onUpdateContract,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [actionMenuAnchorEl, setActionMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContract, setSelectedContract] = useState<SmartContract | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenActionMenu = (event: React.MouseEvent<HTMLElement>, contract: SmartContract) => {
    event.stopPropagation();
    setActionMenuAnchorEl(event.currentTarget);
    setSelectedContract(contract);
  };

  const handleCloseActionMenu = () => {
    setActionMenuAnchorEl(null);
  };

  const handleViewContract = () => {
    if (selectedContract) {
      onViewContract(selectedContract);
      handleCloseActionMenu();
    }
  };

  const handleExecuteContract = () => {
    if (selectedContract) {
      onExecuteContract(selectedContract);
      handleCloseActionMenu();
    }
  };

  const handleCancelContract = () => {
    if (selectedContract) {
      onCancelContract(selectedContract);
      handleCloseActionMenu();
    }
  };

  const handleDuplicateContract = () => {
    if (selectedContract) {
      onDuplicateContract(selectedContract);
      handleCloseActionMenu();
    }
  };

  const handleUpdateContract = () => {
    if (selectedContract) {
      onUpdateContract(selectedContract);
      handleCloseActionMenu();
    }
  };

  const handleViewOnExplorer = () => {
    if (selectedContract) {
      window.open(
        `https://explorer.example.com/contract/${selectedContract.blockchainAddress}`,
        '_blank'
      );
      handleCloseActionMenu();
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <LinkIcon fontSize="small" />;
      case 'escrow':
        return <DocumentIcon fontSize="small" />;
      case 'delivery':
        return <LinkIcon fontSize="small" />;
      case 'custom':
        return <CodeIcon fontSize="small" />;
      default:
        return <CodeIcon fontSize="small" />;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatAddress = (address: string) => {
    if (address.length <= 13) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <Paper elevation={0} variant="outlined">
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Smart Contracts</Typography>
      </Box>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Parties</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Loading contracts...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : contracts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No smart contracts found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              contracts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contract) => (
                  <ContractRow
                    key={contract.id}
                    onClick={() => onViewContract(contract)}
                  >
                    <TableCell>
                      <Typography variant="body2">{contract.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <TypeChip
                        size="small"
                        icon={getTypeIcon(contract.type)}
                        label={getTypeLabel(contract.type)}
                        type={contract.type}
                      />
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        size="small"
                        label={contract.status}
                        status={contract.status}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{formatDate(contract.createdDate)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {contract.associatedParties.length} parties
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>${contract.totalValue.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={contract.blockchainAddress}>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                          {formatAddress(contract.blockchainAddress)}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(event) => handleOpenActionMenu(event, contract)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </TableCell>
                  </ContractRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contracts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      <Menu
        anchorEl={actionMenuAnchorEl}
        open={Boolean(actionMenuAnchorEl)}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleViewContract}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        
        {selectedContract?.status === 'draft' && (
          <MenuItem onClick={handleUpdateContract}>
            <ListItemIcon>
              <UpdateIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Update Contract</ListItemText>
          </MenuItem>
        )}
        
        {selectedContract?.status === 'active' && (
          <MenuItem onClick={handleExecuteContract}>
            <ListItemIcon>
              <ExecuteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Execute Contract</ListItemText>
          </MenuItem>
        )}
        
        {['draft', 'active'].includes(selectedContract?.status || '') && (
          <MenuItem onClick={handleCancelContract}>
            <ListItemIcon>
              <CancelIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cancel Contract</ListItemText>
          </MenuItem>
        )}
        
        <MenuItem onClick={handleDuplicateContract}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        
        <MenuItem onClick={handleViewOnExplorer}>
          <ListItemIcon>
            <ExternalLinkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View on Blockchain Explorer</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default SmartContractTable; 