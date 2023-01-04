import { SxProps, Theme } from '@mui/material';

export const modalStyle: SxProps<Theme> = {
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '400px',
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: 2,
  boxShadow: 24,
  padding: 4,
};

export const textFieldStyle: SxProps<Theme> = { marginBottom: '6px' };
