import { SxProps, Theme } from '@mui/material';

export const parentBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: '1rem',
  width: '80%',
  margin: 'auto',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0, 0, 0, 0.5)',
  padding: '2rem 2rem 0 2rem',
  minHeight: '60vh',
};

export const sexAndWeightInputStyle: SxProps<Theme> = { width: { xs: '100%', sm: '100%', md: '48%' } };

export const sexAndWeightWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'column', md: 'row' },
  justifyContent: 'space-between',
};
