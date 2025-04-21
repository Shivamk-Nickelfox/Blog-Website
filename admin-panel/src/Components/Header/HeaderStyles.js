import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  borderBottom: '1px solid #e0e0e0',
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: 'black',
  fontSize: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

export const NavLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

export const UserSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'center',
  },
}));

export const AvatarBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: theme.spacing(3),
}));
