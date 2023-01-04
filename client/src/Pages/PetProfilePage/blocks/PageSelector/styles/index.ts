import { SxProps, Theme } from '@mui/material';

export const buttonsWraperStyle: SxProps<Theme> = {
  position: { xs: '', sm: '', md: 'absolute' },
  right: '10px',
  top: '15px',
  display: 'flex',
  flexDirection: { xs: 'row', sm: 'row', md: 'column' },
  justifyContent: { xs: 'center', sm: 'center' },
  width: { xs: '100%', sm: '100%', md: '120px' },
  gap: '3px',
  marginBottom: { xs: '0.5rem', sm: '0.5rem', md: 'column' },
};

export const btnStyles: SxProps<Theme> = {
  boxShadow: 2,
  color: 'black',
  borderRadius: '6px',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  backgroundColor: 'white',
};

export const activeBtn: SxProps<Theme> = {
  ...btnStyles,
  backgroundColor: (theme) => theme.palette.primary.main,
};
