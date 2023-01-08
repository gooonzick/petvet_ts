import { SxProps, Theme } from '@mui/material';

export const cardContainer: SxProps<Theme> = {
  backgroundColor: (theme) => theme.palette.primary.main,
  width: 'max-content',
  padding: '5px',
  borderRadius: '4px',
  margin: '0 5px 5px 0',
  alignItems: 'center',
  display: 'flex',
};

export const title: SxProps<Theme> = { display: 'inline-block' };

export const clearIcon: SxProps<Theme> = { cursor: 'pointer' };
