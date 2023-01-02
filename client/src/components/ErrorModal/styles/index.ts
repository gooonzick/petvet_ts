import { SxProps, Theme } from '@mui/material';

export const boxStyle: SxProps<Theme> = {
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

export const headerStyle: SxProps<Theme> = {
  margin: 'auto', width: 'max-content', fontWeight: 'bold',
};
