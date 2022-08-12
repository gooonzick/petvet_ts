import { Box, Tab, Tabs } from '@mui/material';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import LogInForm from '../../components/LogInForm/LogInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import TabPanel from '../../components/TabPanel/TabPanel';
import { AuthForm } from '../../models/auth.model';

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
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState<AuthForm>({
    email: '',
    password: '',
    username: '',
  });

  const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData(
      (prev: AuthForm) => ({
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
        <LogInForm form={formData} inputHandler={inputHandler} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SignUpForm form={formData} inputHandler={inputHandler} />
      </TabPanel>
    </Box>
  );
}

export default AuthPage;
