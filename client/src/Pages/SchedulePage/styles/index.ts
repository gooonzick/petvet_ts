import { SxProps, Theme } from '@mui/material';

export const mainBox: SxProps<Theme> = {
  width: { xs: '80%', sm: '80%', md: '40vw' },
  minHeight: '40vh',
  maxHeight: 'max-content',
  margin: '10vh auto',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.3)',
};

export const tabPanelStyle: SxProps<Theme> = { borderBottom: 1, borderColor: 'divider' };
