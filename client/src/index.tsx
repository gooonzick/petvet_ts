import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './App';
import './index.css';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
const theme = createTheme({
  palette: {
    primary: { main: '#FFD35A' },
    secondary: { main: '#2568FB' },
    warning: { main: '#D9D9D9' },
  },
});
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>,
);
