import { memo, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  AppBar, Avatar,
  Box,
  Button, IconButton,
  Menu,
  MenuItem,
  Toolbar, Typography,
} from '@mui/material';

import { signOut } from '@/redux/slices/userSlice';

import { userGroupSelector, userImageSelector, userNameSelector } from '@/redux/selectors/userSelector';
import type { AppDispatch, RootState } from '@/redux/types';

type Props = {
  userName: string | undefined;
  userGroup: number | undefined;
  userImage: string | undefined;
  dispatch: AppDispatch;
};

const mapStateToProps = (state: RootState) => {
  const userName = userNameSelector(state);
  const userGroup = userGroupSelector(state);
  const userImage = userImageSelector(state);

  return { userName, userGroup, userImage };
};

function NavBar({
  userName, userGroup, userImage, dispatch,
}:Props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const logOutHandler = useCallback(() => {
    dispatch(signOut());
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  }, [dispatch, navigate]);

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
          <img src="./logo.png" alt="logo" width="50px" height="50px" />
        </NavLink>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          {userGroup === 2 && (
            <NavLink to="/vets" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                Ветеринары
              </Button>
            </NavLink>
          )}
          {userGroup === 1 && (
            <NavLink to="/schedule" style={{ textDecoration: 'none', color: 'currentcolor' }}>
              <Button sx={{ my: 2, color: 'black', display: 'block' }}>
                Приемы
              </Button>
            </NavLink>
          )}
        </Box>

        <Box sx={{ flexGrow: 0, display: 'flex' }}>
          {userName ? (
            <>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={userImage} alt={userName} />
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
                  handleClose();
                  navigate('/profile');
                }}
                >
                  Профиль
                </MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  logOutHandler();
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

export default connect(mapStateToProps)(memo(NavBar));
