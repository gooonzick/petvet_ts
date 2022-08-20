import { Box, Tab, Tabs } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import TabPanel from '../../components/TabPanel/TabPanel';
import { SigninRequest, SignupRequest } from '../../models/models';
import { RootState } from '../../redux/store';

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
  const user = useSelector((state: RootState) => state.auth.user);
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState < SignupRequest & SigninRequest >({
    phone: '',
    userGroupId: 1,
    email: '',
    password: '',
    username: '',
  });

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

  if (user?.name) return <Navigate to="/profile" />;

  return (
    <Box sx={mainBoxSx}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={tabChangeHandler}>
          <Tab label="Вход" />
          <Tab label="Регистрация" />
        </Tabs>
      </Box>
      <TabPanel value={tabIndex} index={0}>
        <LogInForm form={formData} inputHandler={inputHandler} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SignUpForm form={formData} inputHandler={inputHandler} />
      </TabPanel>
      <ErrorModal />
    </Box>
  );
}

export default AuthPage;
