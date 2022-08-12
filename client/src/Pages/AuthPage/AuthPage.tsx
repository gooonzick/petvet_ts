import { Box, Tab, Tabs } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import TabPanel from '../../components/TabPanel/TabPanel';
import {
  SigninRequest, SignupRequest, useSignInMutation, useSignUpMutation,
} from '../../redux/api/auth.api';
import { setCredentials } from '../../redux/slices/userSlice';

const mainBoxSx = {
  width: '60vh',
  minHeight: '40vh',
  maxHeight: 'max-content',
  margin: '10vh auto',
  padding: '1rem',
  borderRadius: '10px',
  boxShadow: '8px 8px 10px rgba(0,0,0,0.3)',
};

function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState < SignupRequest & SigninRequest >({
    phone: '',
    userGroupId: 1,
    email: '',
    password: '',
    username: '',
  });

  const [signIn] = useSignInMutation();
  const [signUp] = useSignUpMutation();

  const signUpHandler = async ():Promise<void> => {
    try {
      const user = await signUp(formData).unwrap();
      dispatch(setCredentials(user));
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const signInHandler = async (): Promise<void> => {
    try {
      const user = await signIn(formData).unwrap();
      dispatch(setCredentials(user));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData(
      (prev: SigninRequest & SignupRequest) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const tabChangeHandler = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={mainBoxSx}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={tabChangeHandler}>
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <LogInForm form={formData} inputHandler={inputHandler} logInHandler={signInHandler} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SignUpForm form={formData} inputHandler={inputHandler} signUpHandler={signUpHandler} />
      </TabPanel>
    </Box>
  );
}

export default AuthPage;
