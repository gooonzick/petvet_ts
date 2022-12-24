import { SxProps, Theme } from '@mui/material';

export const parentBoxStyle: SxProps<Theme> = {
  backgroundColor: 'paper',
  width: { xs: '100%', sm: '100%', md: '70%' },
  maxWidth: { xs: '100%', sm: '100%', md: '40rem' },
  height: 'max-content',
  borderRadius: '19px',
  display: 'flex',
  flexFlow: 'column',
  padding: '1.5rem 1.5rem 3.5rem 1.5rem',
  boxShadow: 4,
  boxSizing: 'border-box',
  alignItems: { xs: 'center', sm: 'center', md: 'start' },
};
export const gridContainerStyle: SxProps<Theme> = {
  backgroundColor: 'white',
};
export const avatarBoxStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'start',
  height: 'fit-content',
  gap: 2,
  flexDirection: {
    xs: 'column', sm: 'column', md: 'row',
  },
  marginBottom: {
    xs: '1rem', sm: '1rem', md: '0',
  },
};
export const avatarStyle: SxProps<Theme> = {
  width: '10rem',
  height: '10rem',
  m: 2,
};
export const typographyStyle: SxProps<Theme> = {
  fontWeight: 'bold',
};
export const wordCardParentStyle: SxProps<Theme> = {
  display: 'flex', flexWrap: 'wrap',
};
