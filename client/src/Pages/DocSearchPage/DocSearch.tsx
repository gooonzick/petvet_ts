import { Box, SxProps, TextField } from '@mui/material';
import { useState } from 'react';
import DocFilterPanel from '../../components/DocFilterPanel/DocFilterPanel';
import DoctorCardList from '../../components/DoctorCardList/DoctorCardList';
import Loader from '../../components/Loader/Loader';
import SearchInput from '../../components/SearchInput/SearchInput';
import useFilterDoc from '../../hooks/useFilterDoc';
import { useGetAllDocsQuery } from '../../redux/api/doc.api';

const parentBoxStyle: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
};

const docListBoxStyle: SxProps = {
  width: { xs: '100%', sm: '100%', md: '70%' },
  alignSelf: 'end',
  display: { xs: 'block', sm: 'block', md: 'flex' },
};

const wraperBoxStyle: SxProps = {
  display: { xs: 'block', sm: 'block', md: 'flex' },
};

const filterBoxStyle: SxProps = {
  width: { xs: '100%', sm: '100%', md: '28%' },
  mr: { xs: 0, sm: 0, md: '2%' },
};

function DocSearchPage() {
  const {
    userName, userNameD, profileName, categoryName, inputHandlers,
  } = useFilterDoc({
    userNameFilter: '',
    categoryFilter: '',
    profileFilter: '',
  });

  const { data, isLoading } = useGetAllDocsQuery({
    userName: userNameD, profileName, categoryName,
  });

  if (isLoading) return <Loader />;

  return (
    <Box sx={parentBoxStyle}>
      <SearchInput docName={userName} inputHandler={inputHandlers.setDocName} />
      <Box sx={wraperBoxStyle}>
        <Box sx={filterBoxStyle}>
          <DocFilterPanel />
        </Box>
        <Box sx={docListBoxStyle}>
          {data && <DoctorCardList docs={data} />}
        </Box>
      </Box>
    </Box>
  );
}

export default DocSearchPage;
