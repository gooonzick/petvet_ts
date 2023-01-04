import { SxProps, Theme } from '@mui/material';

export const outterCardContainer: SxProps<Theme> = {
  width: { xs: '100%', sm: '200px', md: '200px' },
  textAlign: 'center',
};

export const innerCardContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'row', sm: 'column', md: 'column' },
  alignItems: 'center',
  justifyContent: { xs: 'flex-start', sm: 'center', md: 'center' },
  gap: { xs: '16px', sm: '16px' },
  width: 'inherit',
  textAlign: 'center',
  padding: '1rem',
};

export const avatar: SxProps<Theme> = {
  width: '10rem',
  height: '10rem',
  marginBottom: '1rem',
};
