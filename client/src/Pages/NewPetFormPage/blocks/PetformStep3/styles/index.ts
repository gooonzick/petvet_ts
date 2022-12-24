import { SxProps, Theme } from '@mui/material';
import { CSSProperties } from 'react';

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

export const tytleStyle: SxProps<Theme> = { fontWeight: 'bold' };

export const textFieldStyle: SxProps<Theme> = { width: '100%' };

export const vacFormStyle: CSSProperties = { width: '80%', margin: '2rem auto' };
