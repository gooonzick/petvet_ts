import { SxProps, Theme } from '@mui/material';

export const boxParentStyle: SxProps<Theme> = {
  marginTop: '2rem',
  display: { xs: 'flex', sm: 'block', md: 'block' },
  flexDirection: { xs: 'column' },
  alignItems: { xs: 'center' },
  width: '100%',
};

export const petListBoxStyle: SxProps<Theme> = {
  marginTop: '2rem',
  display: 'flex',
  width: '100%',
  flexDirection: { xs: 'column', sm: 'row', md: 'row' },
  gap: '1rem',
};

export const addPetButton: SxProps<Theme> = {
  height: '60px',
  width: '60px',
  alignSelf: 'center',
  backgroundColor: (theme) => theme.palette.primary.main,
};
