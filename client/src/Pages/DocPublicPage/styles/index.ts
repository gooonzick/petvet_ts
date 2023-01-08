import { SxProps, Theme } from '@mui/material';

export const mainBoxStyle: SxProps<Theme> = {
  width: { md: '70%' },
  height: '100vh',
  padding: { xs: '1rem', sm: '1rem' },
  position: 'relative',
  boxSizing: 'border-box',
};

export const wordCardWraperStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'column', md: 'row' },
  alignItems: { xs: 'start', sm: 'start', md: 'center' },
  marginTop: '0.7rem',
};

export const wordCardListStyle: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
};

export const titleStyle: SxProps<Theme> = {
  marginRight: '0.6rem',
};

export const descriptionStyle: SxProps<Theme> = {
  marginTop: '3rem',
  minHeight: '15%',
  width: { xs: '100%', sm: '100%', md: '100%' },
  backgroundColor: 'white',
  padding: '1rem',
  boxShadow: '4px 4px 8px rgba(0,0,0,0.2)',
  borderRadius: '8px',
  boxSizing: 'border-box',
};

export const buttonBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: { xs: 'center', sm: 'center', md: 'start' },
  justifyContent: { xs: 'center', sm: 'center', md: 'start' },
  flexDirection: { xs: 'row', sm: 'row', md: 'column' },
  width: { xs: '100%', sm: '100%', md: 'max-content' },
  gap: '0.5rem',
  position: 'fixed',
  top: { md: '80px' },
  bottom: { xs: '30px', sm: '30px', md: '' },
  right: { xs: '0', sm: '0', md: '30px' },
};

export const buttonBoxWrapperStyle: SxProps<Theme> = { height: '15%' };

export const customWrodCard: SxProps<Theme> = { margin: { xs: '8px 8px 0 0', sm: '8 8px 0 0', md: '0 8px 0 0' } };
