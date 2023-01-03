import { SxProps, Theme } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const mainBox: SxProps<Theme> = {
  width: { xs: '80%', sm: '80%', md: '500px' },
  height: 'max-content',
  margin: '10vh auto',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.3)',
};
