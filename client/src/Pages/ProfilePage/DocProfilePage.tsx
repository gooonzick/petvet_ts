import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DocCategories from '../../components/DocProfileInfo/DocCategories';
import DocExperience from '../../components/DocProfileInfo/DocExperience';
import UserInfo from '../../components/UserInfo/UserInfo';
import { Doctor } from '../../models/models';

import { RootState } from '../../redux/store';

function DocProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as Doctor;
  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: '2rem 3rem' }}>
      <UserInfo editable user={user} />
      <DocExperience text={user.docInfo.experience} />
      <DocCategories categories={user.categories} />
    </Box>
  );
}

export default DocProfilePage;
