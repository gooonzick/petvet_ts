import { ChangeEventHandler, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Box, Button, CircularProgress, TextField,
} from '@mui/material';

import { useSignInMutation } from '@/redux/api/auth.api';

import { showError } from '@/redux/slices/errorSlice';
import { setCredentials } from '@/redux/slices/userSlice';

import { SigninRequest, SignupRequest } from '@/models/models';

import * as styles from './styles';

type Props = {
  form: SigninRequest & SignupRequest,
  inputHandler: ChangeEventHandler<HTMLInputElement>,
};

function LogInForm(props: Props) {
  const { form, inputHandler } = props;
  const [signIn, { isError, isLoading, error }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInHandler = useCallback(async (): Promise<void> => {
    try {
      const user = await signIn(form).unwrap();
      dispatch(setCredentials(user));
      localStorage.setItem('user', JSON.stringify(user.user));
      sessionStorage.setItem('token', JSON.stringify(user.token));
      navigate('/profile');
    } catch (e) {
      if (e instanceof Error) {
        dispatch(showError(e.message));
      }
    }
  }, [form]);

  useEffect(() => {
    if (isError && error && 'status' in error) {
      dispatch(showError(error.data.message));
    }
  }, [isError]);

  return (
    <Box sx={styles.formContainer}>
      <TextField
        fullWidth
        variant="standard"
        label="Email"
        margin="normal"
        type="email"
        name="email"
        value={form.email}
        onChange={inputHandler}
      />
      <TextField
        fullWidth
        variant="standard"
        label="Пароль"
        margin="normal"
        type="password"
        name="password"
        value={form.password}
        onChange={inputHandler}
      />
      <Button
        sx={{ alignSelf: 'self-start', marginTop: '0.5rem' }}
        variant="contained"
        onClick={signInHandler}
        disabled={isLoading}
      >
        {isLoading ? <CircularProgress /> : 'Войти'}
      </Button>
    </Box>
  );
}

export default LogInForm;
