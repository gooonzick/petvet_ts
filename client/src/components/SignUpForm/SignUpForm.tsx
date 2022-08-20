import { Box, Button, TextField } from '@mui/material';
import { ChangeEventHandler, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SigninRequest, SignupRequest } from '../../models/models';
import { useSignUpMutation } from '../../redux/api/auth.api';
import { showError } from '../../redux/slices/errorSlice';
import { setCredentials } from '../../redux/slices/userSlice';

function SignUpForm(props: {
  form: SigninRequest & SignupRequest,
  inputHandler: ChangeEventHandler<HTMLInputElement>,
}) {
  const { form, inputHandler } = props;
  const [signUp, { isError, isLoading, error }] = useSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpHandler = async ():Promise<void> => {
    try {
      const user = await signUp(form).unwrap();
      dispatch(setCredentials(user));
      localStorage.setItem('user', JSON.stringify(user.user));
      sessionStorage.setItem('token', user.token);
      navigate('/profile');
    } catch (e) {
      if (e instanceof Error) {
        dispatch(showError(e.message));
      }
    }
  };

  useEffect(() => {
    if (isError && error && 'status' in error) {
      dispatch(showError(error.data.message));
    }
  }, [isError]);

  return (
    <Box>
      <TextField
        sx={{ width: '100%' }}
        variant="standard"
        label="Имя"
        margin="normal"
        type="text"
        name="username"
        value={form.username}
        onChange={inputHandler}
      />
      <TextField
        sx={{ width: '100%' }}
        variant="standard"
        label="Email"
        margin="normal"
        type="email"
        name="email"
        value={form.email}
        onChange={inputHandler}
      />
      <TextField
        sx={{ width: '100%' }}
        variant="standard"
        label="Телефон"
        margin="normal"
        type="text"
        name="phone"
        value={form.phone}
        onChange={inputHandler}
      />
      <TextField
        sx={{ width: '100%' }}
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
        onClick={() => {
          signUpHandler();
        }}
      >
        Зарегестрироваться
      </Button>
    </Box>
  );
}

export default SignUpForm;
