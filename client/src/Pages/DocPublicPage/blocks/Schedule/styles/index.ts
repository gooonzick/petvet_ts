import { SxProps, Theme } from '@mui/material';

export const mainBoxStyle: SxProps<Theme> = {
  width: '70%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid rgba(0,0,0,0.4)',
  boxShadow: 24,
  p: 4,
  borderRadius: '19px',
  animation: 'open 0.2s ease-in-out',
  '@keyframes open': {
    '0%': {
      opacity: 0,
      transform: 'sacleY(0) translate(-50%, -50%)',
    },
    '100%': {
      opacity: 1,
      transform: 'sacleY(1) translate(-50%, -50%)',
    },
  },
};
