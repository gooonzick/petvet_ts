import { Box, Button, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';
import {
  SigninRequest, SignupRequest,
} from '../../redux/api/auth.api';

function LogInForm(props: {
  form: SigninRequest & SignupRequest,
  inputHandler: ChangeEventHandler<HTMLInputElement>,
  logInHandler: () => Promise<void>,
}) {
  const { form, inputHandler, logInHandler } = props;

  return (
    <Box sx={{ width: '100%' }}>
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
          logInHandler();
        }}
      >
        Войти
      </Button>
    </Box>
  );
}

export default LogInForm;
