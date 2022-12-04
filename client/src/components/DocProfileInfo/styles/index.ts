import { SxProps, Theme } from '@mui/material';
import { red } from '@mui/material/colors';

export const collapsedAccordionStyle:SxProps<Theme> = {
  backgroundColor: '#D9D9D9',
  padding: 2,
  borderRadius: '9px',
  marginBottom: '0.5rem',
  transition: 'all .3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.01)',
  },
  boxShadow: 3,
  boxSizing: 'border-box',
};

export const expandedAccordionStyle: SxProps<Theme> = {
  backgroundColor: 'white',
  p: 2,
  m: '.5rem',
  borderRadius: '9px',
  border: '.5px solid #FFD35A',
};

export const saveEditButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
  ml: 2,
};

export const editButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
};

export const cancelButtonStyle: SxProps<Theme> = {
  color: 'black',
  borderRadius: '9px',
  p: '0.5rem',
  ml: 2,
};

export const editAccordionStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  pt: 2,
};

export const editTextFieldStyle: SxProps<Theme> = {
  width: '100%',
  backgroundColor: 'white',
  borderRadius: '5px',
};

export const formControlStyle: SxProps<Theme> = { m: 1, minWidth: 120, width: '20rem' };

export const tableContainerStyle: SxProps<Theme> = {
  width: '85%',
  height: 'max-content',
  borderRadius: '9px',
};

export const deleteButtonStyle: SxProps<Theme> = {
  color: red[600],
  cursor: 'pointer',
};

export const serviceTextFieldStyle: SxProps<Theme> = {
  width: '50%',
  backgroundColor: 'white',
  mr: '0.5rem',
};

export const priceTextFieldStyle: SxProps<Theme> = { backgroundColor: 'white' };
