import { SxProps, Theme } from '@mui/material';

export const toggleDayButton: SxProps<Theme> = {
  '&.MuiToggleButtonGroup-grouped': {
    borderRadius: '50% !important',
    mx: 1,
    height: '3rem',
    width: '3rem',
    border: '1px solid #FFD35A !important',
  },
  '&.Mui-selected': {
    backgroundColor: '#FFD35A',
  },
};

export const toggleDayButtonGroup: SxProps<Theme> = {
  width: '100%',
  justifyContent: 'center',
};
