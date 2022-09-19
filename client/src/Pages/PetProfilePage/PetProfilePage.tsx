import { useParams } from 'react-router-dom';
import {
  Box, SxProps, Theme,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useGetOnePetQuery } from '../../redux/api/pet.api';
import Loader from '../../components/Loader/Loader';
import PetProfile from '../../components/PetProfile/PetProfile';
import PageSelector from '../../components/PetProfile/PageSelector';
import HistoryVisits from '../../components/PetProfile/PetHistory';

const pageWraperBoxStyle: SxProps<Theme> = {
  padding: '1rem',
  position: 'relative',
};

function PetProfilePage() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  // const user = useSelector((state: RootState) => state.auth.user);
  const { data: pet, isLoading, isError } = useGetOnePetQuery(Number(id));

  const clickHandler = useCallback((pageId:number) => {
    setPage(pageId);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Box sx={pageWraperBoxStyle}>
      <PageSelector page={page} clickHandler={clickHandler} />
      {page === 1 && pet && <PetProfile pet={pet} />}
      {page === 2 && pet && <HistoryVisits pet={pet} />}
    </Box>
  );
}

export default PetProfilePage;
