import { connect } from 'react-redux';

import { Box } from '@mui/material';

import {
  DocCategories, DocExperience, DocPriceList, DocProfiles,
} from '@/components/DocProfileInfo';
import UserInfo from '@/components/UserInfo/UserInfo';

import { Doctor } from '@/models/models';

import { boxWrapperStyle, parentBoxStyle } from './syles';
import { userSelector } from '@/redux/selectors/userSelector';
import type { RootState } from '@/redux/types';

type Props = {
  doc: Doctor;
};

const mapStateToProps = (state: RootState) => {
  const doc = userSelector(state) as Doctor;

  return {
    doc,
  };
};

function DocProfilePage({ doc }: Props) {
  return (
    <Box sx={parentBoxStyle}>
      <UserInfo editable user={doc} />
      <Box sx={boxWrapperStyle}>
        <DocExperience text={doc.docInfo?.experience} />
        <DocCategories categories={doc.categories} />
        <DocProfiles profiles={doc.profiles} />
        <DocPriceList priceList={doc.priceList} />
      </Box>
    </Box>
  );
}

export default connect(mapStateToProps)(DocProfilePage);
