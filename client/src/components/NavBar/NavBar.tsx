import {
  AppBar, Button, Container, Toolbar, Typography,
  Box,
} from '@mui/material';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';

function NavBar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = useCallback(() => {
    dispatch(signOut());
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  }, []);
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
            {user?.name ? (
              <Button onClick={() => logOutHandler()} sx={{ my: 2, color: 'white', display: 'block' }}>
                Выйти
              </Button>
            ) : (
              <NavLink to="/auth" style={{ textDecoration: 'none' }}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  Авторизация
                </Button>
              </NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
