import { SxProps, Theme } from '@mui/material';

export const mainBox: SxProps<Theme> = {
  // width: { xs: '80%', sm: '80%', md: '40vw' },
  minHeight: '40vh',
  maxHeight: 'max-content',
  padding: '2rem',
};

export const tabPanelStyle: SxProps<Theme> = { borderBottom: 1, borderColor: 'divider' };

export const dateSlotButtonStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
