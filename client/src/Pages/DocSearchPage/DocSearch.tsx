import { Box } from '@mui/material';
import DocFilterPanel from '@/components/DocFilterPanel';
import DoctorCardList from '@/components/DoctorCardList/DoctorCardList';
import Loader from '@/components/Loader/Loader';
import SearchInput from '@/components/SearchInput/SearchInput';
import useFilterDoc from '@/hooks/useFilterDoc';
import { useGetAllDocsQuery } from '@/redux/api/doc.api';
import {
  docListBoxStyle, filterBoxStyle, parentBoxStyle, wraperBoxStyle,
} from './styles';

function DocSearchPage() {
  const {
    userName, userNameD, profileId, categoryId, inputHandlers,
  } = useFilterDoc({
    userNameFilter: '',
    categoryFilter: '',
    profileFilter: '',
  });

  const { data, isLoading } = useGetAllDocsQuery({
    userName: userNameD, profileId, categoryId,
  });

  if (isLoading) return <Loader />;

  return (
    <Box sx={parentBoxStyle}>
      <SearchInput docName={userName} inputHandler={inputHandlers.setDocName} />
      <Box sx={wraperBoxStyle}>
        <Box sx={filterBoxStyle}>
          <DocFilterPanel
            categoryFilter={categoryId}
            profileFilter={profileId}
            changeHandlers={inputHandlers}
          />
        </Box>
        <Box sx={docListBoxStyle}>
          {data && <DoctorCardList docs={data} />}
        </Box>
      </Box>
    </Box>
  );
}

export default DocSearchPage;
