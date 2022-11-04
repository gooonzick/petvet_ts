/* eslint-disable import/prefer-default-export */
import { SxProps, Theme } from '@mui/material';

export const parentBoxStyle: SxProps<Theme> = {
  height: 'max-content',
  padding: '1rem',
  boxShadow: '4px 4px 8px rgba(0,0,0,0.4)',
  borderRadius: '10px',
  marginBottom: '0.7rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '1rem',
  transition: 'all .4s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};
