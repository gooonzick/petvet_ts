import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {
  Box, Tab, Tabs,
} from '@mui/material';

import ErrorModal from '@/components/ErrorModal/ErrorModal';
import LogInForm from '@/components/LogInForm';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import TabPanel from '@/components/TabPanel/TabPanel';

import { SigninRequest, SignupRequest } from '@/models/models';

import { mainBox } from './styles';

import { userNameSelector } from '@/redux/selectors/userSelector';
import type { RootState } from '@/redux/types';

type Props = {
  userName: string | undefined
};

const mapStateToProps = (state: RootState) => {
  const userName = userNameSelector(state);

  return {
    userName,
  };
};

function AuthPage({ userName }: Props) {
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

  if (userName) return <Navigate to="/profile" />;

  return (
    <Box sx={mainBox}>
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

export default connect(mapStateToProps)(AuthPage);
