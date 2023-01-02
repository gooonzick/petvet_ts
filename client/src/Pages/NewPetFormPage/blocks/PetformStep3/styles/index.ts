import { SxProps, Theme } from '@mui/material';
import { CSSProperties } from 'react';

export const parentBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  boxSizing: 'border-box',
  gap: '1rem',
  width: { xs: '95%', sm: '90%', md: '750px' },
  margin: 'auto',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
  padding: '2rem 2rem 2rem 2rem',
  minHeight: '60vh',
};

export const tytleStyle: SxProps<Theme> = { fontWeight: 'bold' };

export const textFieldStyle: SxProps<Theme> = { width: '100%' };

export const vacFormStyle: CSSProperties = { width: '80%', margin: '2rem auto' };
