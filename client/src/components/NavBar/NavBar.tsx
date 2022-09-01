import { AccountCircle } from '@mui/icons-material';
import {
  AppBar, Button, Container, Toolbar, Typography,
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from '../../redux/slices/userSlice';
import { RootState } from '../../redux/store';

function NavBar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const logOutHandler = useCallback(() => {
    dispatch(signOut());
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  }, []);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar disableGutters sx={{ padding: '0 1rem' }}>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'currentcolor' }}>
          <Typography
            variant="h6"
            noWrap
          >
            LOGO
          </Typography>
        </NavLink>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <NavLink to="/vets" style={{ textDecoration: 'none', color: 'currentcolor' }}>
            <Button sx={{ my: 2, color: 'black', display: 'block' }}>
              Ветеринары
            </Button>
          </NavLink>
        </Box>

        <Box sx={{ flexGrow: 0, display: 'flex' }}>
          {user?.name ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user.img} alt={user.name} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => {
                  navigate('/profile');
                  handleClose();
                }}
                >
                  Профиль

                </MenuItem>
                <MenuItem onClick={() => {
                  logOutHandler();
                  handleClose();
                }}
                >
                  Выйти

                </MenuItem>
              </Menu>
            </>
          ) : (
            <NavLink to="/auth" style={{ textDecoration: 'none' }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Авторизация
              </Button>
            </NavLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
