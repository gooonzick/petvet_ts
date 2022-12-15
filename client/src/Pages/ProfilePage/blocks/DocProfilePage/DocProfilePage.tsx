import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

import {
  DocExperience, DocCategories, DocPriceList, DocProfiles,
} from '@/components/DocProfileInfo';
import UserInfo from '@/components/UserInfo/UserInfo';
import { Doctor } from '@/models/models';

import { RootState } from '@/redux/types';
import { boxWrapperStyle, parentBoxStyle } from './syles';

function DocProfilePage() {
  const user = useSelector((store: RootState) => store.auth.user) as Doctor;

  return (
    <Box sx={parentBoxStyle}>
      <UserInfo editable user={user} />
      <Box sx={boxWrapperStyle}>
        <DocExperience text={user.docInfo?.experience} />
        <DocCategories categories={user.categories} />
        <DocProfiles profiles={user.profiles} />
        <DocPriceList priceList={user.priceList} />
      </Box>
    </Box>
  );
}

export default DocProfilePage;
