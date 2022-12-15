import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import { useGetOnePetQuery } from '../../redux/api/pet.api';

import Loader from '@/components/Loader/Loader';
import PetProfile from '@/components/PetProfile/PetProfile';
import PageSelector from '@/components/PetProfile/PageSelector';
import HistoryVisits from '@/components/PetProfile/PetHistory';

import { pageWraperBoxStyle } from './styles';

function PetProfilePage() {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const { data: pet, isLoading } = useGetOnePetQuery(Number(id));

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
