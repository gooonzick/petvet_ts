import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: { main: '#FFD35A' },
    secondary: { main: '#2568FB' },
    warning: { main: '#D9D9D9' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
