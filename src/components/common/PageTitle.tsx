import { Typography, styled, TypographyProps } from '@mui/material';

// Create a styled component that properly passes through all Typography props
const PageTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
}));

export default PageTitle;
