import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import DocFilterPanel from '@/components/DocFilterPanel';
import DoctorCardList from '@/components/DoctorCard/DoctorCardList';
import Loader from '@/components/Loader/Loader';
import SearchInput from '@/components/SearchInput/SearchInput';

import { useGetAllDocsQuery } from '@/redux/api/doc.api';

import useFilterDoc from '@/hooks/useFilterDoc';

import * as styles from './styles';

function DocSearchPage() {
  const {
    userName, userNameD, profileId, categoryId, inputHandlers,
  } = useFilterDoc({
    userNameFilter: '',
    categoryFilter: '',
    profileFilter: '',
  });

  const navigate = useNavigate();

  const navigateToDoc = useCallback((id: number) => {
    navigate(`/vets/${id}`);
  }, []);

  const { data, isLoading } = useGetAllDocsQuery({
    userName: userNameD, profileId, categoryId,
  });

  if (isLoading) return <Loader />;

  return (
    <Box sx={styles.parentBoxStyle}>
      <SearchInput docName={userName} inputHandler={inputHandlers.setDocName} />
      <Box sx={styles.wraperBoxStyle}>
        <Box sx={styles.filterBoxStyle}>
          <DocFilterPanel
            categoryFilter={categoryId}
            profileFilter={profileId}
            changeHandlers={inputHandlers}
          />
        </Box>
        <Box sx={styles.docListBoxStyle}>
          {data && <DoctorCardList docs={data} onClick={navigateToDoc} />}
        </Box>
      </Box>
    </Box>
  );
}

export default DocSearchPage;
