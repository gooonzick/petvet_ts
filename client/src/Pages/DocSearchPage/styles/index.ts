import { SxProps } from '@mui/material';

export const parentBoxStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
};

export const docListBoxStyle: SxProps = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  alignSelf: 'end',
  display: { xs: 'block', sm: 'block', md: 'flex' },
};

export const wraperBoxStyle: SxProps = {
  display: { xs: 'block', sm: 'block', md: 'flex' },
};

export const filterBoxStyle: SxProps = {
  width: { xs: '100%', sm: '100%', md: '28%' },
  mr: { xs: 0, sm: 0, md: '2%' },
};
