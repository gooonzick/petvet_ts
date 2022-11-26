/* eslint-disable import/prefer-default-export */
import { SxProps, Theme } from '@mui/material';

export const contentWrapper: SxProps<Theme> = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  maxHeight: '600px',
  overflow: 'scroll',
};
