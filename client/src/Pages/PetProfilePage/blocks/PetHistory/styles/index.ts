import { SxProps, Theme } from '@mui/material';

export const parentBoxStyle: SxProps<Theme> = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  maxWidth: { xs: '100%', sm: '100%', md: '40rem' },
  height: 'max-content',
  display: 'flex',
  flexFlow: 'column',
  padding: '1.5rem 1.5rem 3.5rem 1.5rem',
  boxSizing: 'border-box',
  alignItems: { xs: 'center', sm: 'center', md: 'start' },
};

export const floatinButtonStyle: SxProps<Theme> = {
  position: { xs: 'fixed', sm: 'fixed', md: 'fixed' },
  bottom: { xs: '1rem', sm: '1rem', md: '1rem' },
  right: { xs: '1rem', sm: '1rem' },
  left: { md: '1rem' },
};

export const styleCards: SxProps<Theme> = {
  backgroundColor: '#d9d9d9',
  width: '100%',
  height: 'max-content',
  borderRadius: '19px',
  marginBottom: '1rem',
  display: 'flex',
  flexFlow: 'column',
  padding: '1rem 1.5rem 1rem 1.5rem',
  boxShadow: 3,
};

export const modalBodyContainer: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: { xs: '80%', sm: '500px', md: '500px' },
  height: 'max-content',
  maxHeight: '600px',
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  padding: '1rem',
};
