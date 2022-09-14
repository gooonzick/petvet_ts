import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import DocCategories from '../../components/DocProfileInfo/DocCategories';
import DocExperience from '../../components/DocProfileInfo/DocExperience';
import UserInfo from '../../components/UserInfo/UserInfo';
import { Doctor } from '../../models/models';

import { RootState } from '../../redux/store';
import DocProfiles from '../../components/DocProfileInfo/DocProfiles';
import DocPriceList from '../../components/DocProfileInfo/DocPriceList';

function DocProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as Doctor;

  return (
    <Box sx={{ padding: '2rem 3rem' }}>
      <UserInfo editable user={user} />
      <Box sx={{ marginTop: '2rem' }}>
        <DocExperience text={user.docInfo?.experience} />
        <DocCategories categories={user.categories} />
        <DocProfiles profiles={user.profiles} />
        <DocPriceList priceList={user.priceList} />
      </Box>
    </Box>
  );
}

export default DocProfilePage;
