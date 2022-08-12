import { Box, Button, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { AuthForm } from '../../models/auth.model';

function SignUpForm(props: {form: AuthForm, inputHandler: ChangeEventHandler<HTMLInputElement>}) {
  const { form, inputHandler } = props;
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
      >
        Зарегестрироваться
      </Button>
    </Box>
  );
}

export default SignUpForm;
