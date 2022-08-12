import {
  AppBar, Button, Container, Toolbar, Typography,
  Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/" style={{ textDecoration: 'none', color: 'currentcolor' }}>
            <Typography
              variant="h6"
              noWrap
            >
              LOGO
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              Topics
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <NavLink to="/auth" style={{ textDecoration: 'none' }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Авторизация
              </Button>
            </NavLink>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
