import { SxProps, Theme } from '@mui/material';

export const container: SxProps<Theme> = {
  marginTop: '1rem',
};

export const datePickersContainer: SxProps<Theme> = {
  display: 'flex',
  gap: '0.4rem',
  width: '100%',
};

export const timePickerContainer: SxProps<Theme> = { marginTop: '0.5rem' };

export const timeSlotsContainer: SxProps<Theme> = { marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap' };

export const weekdayToggleContainer: SxProps<Theme> = { marginTop: '1rem' };

export const buttonsContainer: SxProps<Theme> = { margin: '1rem auto 0 auto', textAlign: 'end' };

export const calcButton: SxProps<Theme> = { marginLeft: '1rem' };
