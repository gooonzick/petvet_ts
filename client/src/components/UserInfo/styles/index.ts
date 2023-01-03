import { SxProps, Theme } from '@mui/material';

export const parentBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  flexDirection: { xs: 'column', sm: 'row', md: 'row' },
  justifyContent: { xs: 'center', sm: 'start', md: 'start' },
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: '4px 4px 8px rgba(0,0,0,0.2)',
  borderRadius: '8px',
  padding: { xs: '0.5rem', sm: '0.5rem', md: '2rem' },
};

export const avatarStyle: SxProps<Theme> = {
  height: '8rem',
  width: '8rem',
};
